import { DeckGL } from "@deck.gl/react";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useReducer } from "react";
import { Outlet } from "@remix-run/react";
import { atlasContext, initialAtlasState } from "../stores/atlas.context";
import { atlasReducer } from "../stores/atlas.reducer";
import { atlasActions } from "../stores/atlas.actions";
import { PointModeBtn } from "./pointModeBtn";
import { LinStringModeBtn } from "./lineStringModeBtn";
import { KeyboardListener } from "./keyboardListener";
import { useTaxLotLayer } from "../layers/tax-lot.client";
import { usePenLayer } from "../layers/pen.client";
import { useDrawLayer } from "../layers/draw.client";
import { useBufferLayer } from "../layers/buffer.client";
import { DrawController } from "./drawController.client";

const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
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
  const taxLotLayer = useTaxLotLayer(atlasState, atlasActionsDispatch);
  const penLayer = usePenLayer(atlasState);
  const drawLayer = useDrawLayer(atlasState);
  const bufferLayer = useBufferLayer(atlasState);

  return (
    <atlasContext.Provider
      value={{ state: atlasState, actionsDispatch: atlasActionsDispatch }}
    >
      <Outlet />
      <KeyboardListener />
      <DrawController />
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        style={{ height: "100vh", width: "100vw" }}
        layers={[taxLotLayer, drawLayer, bufferLayer, penLayer]}
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
