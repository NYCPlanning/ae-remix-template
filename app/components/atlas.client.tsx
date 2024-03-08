import { DeckGL } from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Tile3DLayer } from "@deck.gl/geo-layers/typed";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import distance from "@turf/distance";
import bearing from "@turf/bearing";
import destination from "@turf/destination";
import { useNavigate } from "@remix-run/react";

const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};
const INITIAL_DRAW_DATA = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: 0,
      properties: {
        dragging: false,
      },
      geometry: {
        coordinates: [
          [
            [-73.98186634855769, 40.75982093171143],
            [-73.98186634855769, 40.75671691375928],
            [-73.97845887924282, 40.75671691375928],
            [-73.97845887924282, 40.75982093171143],
            [-73.98186634855769, 40.75982093171143],
          ],
        ],
        type: "Polygon",
      },
    },
  ],
};

const INITIAL_PEN_DATA = {
  type: "FeatureCollection",
  features: [],
};

const GOOGLE_3D_TILES = "https://tile.googleapis.com/v1/3dtiles/root.json";
const GOOGLE_API_KEY = "";

export type Geo = {
  type: string;
  id: number;
  properties: { dragging: boolean };
  geometry: { coordinates: any; type: string };
};

export function Atlas() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startDragCoordinate, setStartDragCoordinate] =
    useState<null | Array<number>>(null);
  const [startDragFeature, setStartDragFeature] = useState<null | Geo>(null);
  const [drawData, setDrawData] = useState<any>(INITIAL_DRAW_DATA);
  const [penData, setPenData] = useState<any>(INITIAL_PEN_DATA);
  const [isAddingFeature, setIsAddingFeature] = useState(false);

  const tile3dLayer = new Tile3DLayer({
    id: "google-3d-tiles",
    data: GOOGLE_3D_TILES,
    visible: true,
    loadOptions: {
      fetch: {
        headers: {
          "X-GOOG-API-KEY": GOOGLE_API_KEY,
        },
      },
    },
  });

  const drawLayer = new GeoJsonLayer({
    data: drawData,
    pickable: true,
    getPointColor: () => [100, 80, 255],
    getPointRadius: () => 10,
    getLineWidth: () => 2,
    getFillColor: ({ properties }: any) => {
      // console.log("fill color properties", properties);
      return properties?.dragging ? [120, 180, 180, 30] : [120, 180, 180, 90];
    },
    onDragStart: ({ object, coordinate }) => {
      const nextDrawData = cloneDeep(drawData);
      const nextFeature = cloneDeep(object);
      nextFeature.properties.dragging = true;
      nextDrawData.features[nextFeature.id] = nextFeature;
      setStartDragCoordinate(coordinate || null);
      setStartDragFeature(nextFeature);
      setDrawData(nextDrawData);
      setIsDragging(true);
    },
    onDrag: ({ coordinate }) => {
      if (
        startDragFeature !== null &&
        startDragCoordinate !== null &&
        coordinate !== undefined
      ) {
        const nextFeature = cloneDeep(startDragFeature);
        const distanceFromStart = distance(startDragCoordinate, coordinate);
        const bearingFromStart = bearing(startDragCoordinate, coordinate);
        if (startDragFeature.geometry.type === "Polygon") {
          const nextCoordinates = startDragFeature.geometry.coordinates[0].map(
            (startCoordinate: Array<number>) => {
              const destinationCoordinate = destination(
                startCoordinate,
                distanceFromStart,
                bearingFromStart,
              );
              if (destinationCoordinate.geometry === null)
                throw new Error("geometry is null");
              return destinationCoordinate.geometry.coordinates;
            },
          );
          nextFeature.geometry.coordinates = [nextCoordinates];
          const nextDrawData = cloneDeep(drawData);
          nextDrawData.features[nextFeature.id] = nextFeature;
          setDrawData(nextDrawData);
        }
      }
    },
    onDragEnd: () => {
      if (startDragFeature !== null) {
        const nextDrawData = cloneDeep(drawData);
        const nextFeature = cloneDeep(
          nextDrawData.features[startDragFeature.id],
        );
        nextFeature.properties.dragging = false;
        nextDrawData.features[startDragFeature.id] = nextFeature;
        setStartDragCoordinate(null);
        setStartDragFeature(null);
        setDrawData(nextDrawData);
        setIsDragging(false);
      }
    },
    onClick: ({ object }) => {
      // console.debug("data", object);
      const {
        geometry: { type, coordinates },
      } = object as {
        geometry: { type: "Polygon"; coordinates: Array<Array<Array<number>>> };
      };
      // console.debug("type", type);
      // console.debug("coordinates", coordinates);
      const lons = coordinates[0].map((position) => position[0]).join();
      const lats = coordinates[0].map((position) => position[1]).join();
      const path = `tax-lots?geometry=${type}&lats=${lats}&lons=${lons}`;
      // console.warn("path", path);
      navigate(path);
      return true;
    },
    updateTriggers: {
      getFillColor: drawData,
    },
  });

  const penLayer = new GeoJsonLayer({
    data: penData,
    getLineWidth: () => 10,
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={isDragging ? false : true}
      style={{ height: "100vh", width: "100vw" }}
      layers={[drawLayer, penLayer, tile3dLayer]}
      getCursor={({ isDragging, isHovering }) => {
        if (isDragging) return "grabbing";
        if (isHovering) return "pointer";
        return "grab";
      }}
      onClick={({ coordinate }) => {
        const nextPenData = cloneDeep(penData);
        if (!isAddingFeature) {
          // When first starting to add a first, append a new feature to the geometry collection
          setIsAddingFeature(true);
          if (coordinate) {
            const nextFeature = {
              type: "Feature",
              id: nextPenData.features.length,
              properties: {
                dragging: false,
                adding: true,
              },
              geometry: {
                type: "Point",
                coordinates: coordinate,
              },
            };
            nextPenData.features[0] = nextFeature;
            setPenData(nextPenData);
          }
        } else {
          // After a new feature is adding, start editing it by adding points
          const feature = nextPenData.features[0];
          if (coordinate && feature.geometry.type === "Point") {
            const featureCoordinate = feature.geometry.coordinates;
            const clickedAndFeatureCoordinateDistance = distance(
              coordinate,
              featureCoordinate,
              { units: "yards" },
            );

            if (clickedAndFeatureCoordinateDistance < 10) {
              const nextDrawData = cloneDeep(drawData);
              setIsAddingFeature(false);
              nextDrawData.features.push(penData.features[0]);
              setDrawData(nextDrawData);
              nextPenData.features = [];
              setPenData(nextPenData);
              return;
            } else {
              const nextFeature = {
                type: "Feature",
                id: nextPenData.features.length,
                properties: {
                  dragging: false,
                  adding: true,
                },
                geometry: {
                  type: "LineString",
                  coordinates: [featureCoordinate, coordinate],
                },
              };
              nextPenData.features[0] = nextFeature;
              setPenData(nextPenData);
            }
          }
          if (coordinate && feature.geometry.type === "LineString") {
            const lastCoordinate =
              feature.geometry.coordinates[
                feature.geometry.coordinates.length - 1
              ];
            const clickedAndLastCoordinateDistance = distance(
              coordinate,
              lastCoordinate,
              { units: "yards" },
            );
            if (clickedAndLastCoordinateDistance < 10) {
              const nextDrawData = cloneDeep(drawData);
              nextDrawData.features.push(penData.features[0]);
              setDrawData(nextDrawData);
              nextPenData.features = [];
              setPenData(nextPenData);
              setIsAddingFeature(false);
              return;
            }
            if (feature.geometry.coordinates.length >= 2) {
              // console.debug("we have at least three coordinates");
              const firstCoordinate = feature.geometry.coordinates[0];
              const clickedAndFirstCoordinateDistance = distance(
                coordinate,
                firstCoordinate,
                { units: "yards" },
              );
              if (clickedAndFirstCoordinateDistance < 10) {
                // console.debug("we are closed in on the first point");
                const nextFeature = cloneDeep(feature);
                const nextDrawData = cloneDeep(drawData);
                nextFeature.geometry.type = "Polygon";
                nextFeature.id = nextDrawData.features.length;
                const nextCoordinates = cloneDeep(
                  nextFeature.geometry.coordinates,
                );
                nextCoordinates.push(firstCoordinate);
                nextFeature.geometry.coordinates = [nextCoordinates];
                nextDrawData.features.push(nextFeature);
                console.log("nextDrawData", nextDrawData);
                setDrawData(nextDrawData);
                nextPenData.features = [];
                setPenData(nextPenData);
                setIsAddingFeature(false);
                return;
              }
            }
            const nextFeature = cloneDeep(feature);
            nextFeature.geometry.coordinates.push(coordinate);
            nextPenData.features[0] = nextFeature;
            setPenData(nextPenData);
          }
        }
      }}
      onHover={({ coordinate }) => {
        if (isAddingFeature) {
          // Check whether the pen exists on the pen layer
          const nextPenData = cloneDeep(penData);
          const addingFeatureGeometry = nextPenData.features[0].geometry;
          const addingFeatureCoordinate =
            addingFeatureGeometry.type === "Point"
              ? addingFeatureGeometry.coordinates
              : addingFeatureGeometry.coordinates[
                  addingFeatureGeometry.coordinates.length - 1
                ];
          if (nextPenData.features.length < 1) return;
          if (nextPenData.features.length < 2) {
            const penFeature = {
              type: "Feature",
              id: 1,
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: [addingFeatureCoordinate, coordinate],
              },
            };
            nextPenData.features.push(penFeature);
            setPenData(nextPenData);
          } else {
            const penFeature = nextPenData.features[1];
            const nextPenFeature = cloneDeep(penFeature);

            nextPenFeature.geometry.coordinates[0] = addingFeatureCoordinate;
            nextPenFeature.geometry.coordinates[1] = coordinate;
            // console.debug("next Pen Feature", nextPenFeature);
            nextPenData.features[1] = nextPenFeature;
            setPenData(nextPenData);
          }
        }
      }}
    >
      {/*<Map
        id="atlas"
        mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
    ></Map> */}
    </DeckGL>
  );
}
