import { DeckGL } from "@deck.gl/react/typed";
import { MapProvider, Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Draw } from "./draw.client";

const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

export function Atlas() {
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      style={{ height: "100vh", width: "100vw" }}
    >
      <MapProvider>
        <Map
          id="atlas"
          mapStyle={"https://tiles.planninglabs.nyc/styles/positron/style.json"}
        >
          <Draw />
        </Map>
      </MapProvider>
    </DeckGL>
  );
}
