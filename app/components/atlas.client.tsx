import { DeckGL } from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useReducer, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import distance from "@turf/distance";
import bearing from "@turf/bearing";
import destination from "@turf/destination";
import { useNavigate } from "@remix-run/react";
import { atlasContext, initialAtlasState } from "../stores/atlas.context";
import { atlasReducer } from "../stores/atlas.reducer";
import { atlasActions } from "../stores/atlas.actions";
import { PointModeBtn } from "./pointModeBtn";
import { LinStringModeBtn } from "./lineStringModeBtn";
import { KeyboardListener } from "./keyboardListener";

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

export type Geo = {
  type: string;
  id: number;
  properties: { dragging: boolean };
  geometry: { coordinates: any; type: string };
};

export function Atlas() {
  const [atlasState, atlasDispatch] = useReducer(
    atlasReducer,
    initialAtlasState,
  );
  const atlasActionsDispatch = atlasActions(atlasDispatch);

  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startDragCoordinate, setStartDragCoordinate] =
    useState<null | Array<number>>(null);
  const [startDragFeature, setStartDragFeature] = useState<null | Geo>(null);
  const [drawData, setDrawData] = useState<any>(INITIAL_DRAW_DATA);
  const { shapeFeatureCollection, penFeatureCollection } = atlasState;

  const drawLayer = new GeoJsonLayer({
    data: shapeFeatureCollection,
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
    data: penFeatureCollection,
    getLineWidth: () => 10,
  });

  return (
    <atlasContext.Provider
      value={{ state: atlasState, actionsDispatch: atlasActionsDispatch }}
    >
      <KeyboardListener />
      <PointModeBtn />
      <LinStringModeBtn />
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={isDragging ? false : true}
        style={{ height: "100vh", width: "100vw" }}
        layers={[drawLayer, penLayer]}
        getCursor={({ isDragging, isHovering }) => {
          if (isDragging) return "grabbing";
          if (isHovering) return "pointer";
          return "grab";
        }}
        onClick={({ coordinate }) => {
          if (coordinate) atlasActionsDispatch.clickOnMap(coordinate);
        }}
        onHover={({ coordinate }) => {
          if (coordinate) atlasActionsDispatch.hoverOverMap(coordinate);
        }}
      >
        <Map
          id="atlas"
          mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
        ></Map>
      </DeckGL>
    </atlasContext.Provider>
  );
}
