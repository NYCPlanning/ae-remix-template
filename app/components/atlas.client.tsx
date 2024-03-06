import { DeckGL } from "@deck.gl/react/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";
import distance from "@turf/distance";
import bearing from "@turf/bearing";
import destination from "@turf/destination";

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
    {
      type: "Feature",
      id: 1,
      properties: {
        dragging: false,
      },
      geometry: {
        coordinates: [
          [-73.98038660347248, 40.76238347934131],
          [-73.97745796154409, 40.76137135452032],
        ],
        type: "LineString",
      },
    },
  ],
};

export type Geo = {
  type: string;
  id: number;
  properties: { dragging: boolean };
  geometry: { coordinates: number[][][]; type: string };
};

export function Atlas() {
  const [isDragging, setIsDragging] = useState(false);
  const [startDragCoordinate, setStartDragCoordinate] =
    useState<null | Array<number>>(null);
  const [startDragFeature, setStartDragFeature] = useState<null | Geo>(null);
  const [drawData, setDrawData] = useState(INITIAL_DRAW_DATA);

  const drawLayer = new GeoJsonLayer({
    data: drawData,
    pickable: true,
    getFillColor: ({ properties }) => {
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
    updateTriggers: {
      getFillColor: drawData,
    },
  });
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={isDragging ? false : true}
      style={{ height: "100vh", width: "100vw" }}
      layers={[drawLayer]}
      getCursor={({ isDragging, isHovering }) => {
        if (isDragging) return "grabbing";
        if (isHovering) return "pointer";
        return "grab";
      }}
    >
      <Map
        id="atlas"
        mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
      ></Map>
    </DeckGL>
  );
}
