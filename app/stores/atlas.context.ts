import { createContext } from "react";
import { AtlasActions } from "./atlas.actions";
import { featureCollection } from "@turf/helpers";
import { FeatureCollection } from "geojson";
export type AtlasMode =
  | "createPoint"
  | "createLineString"
  | "createPolygon"
  | "select";

export type AtlasState = {
  selectedTaxLotId: string | null;
  highlightedTaxLotIds: Array<string>;
  mode: AtlasMode;
  shapeFeatureCollection: FeatureCollection;
  bufferFeatureCollection: FeatureCollection;
  penFeatureCollection: FeatureCollection;
};

export const initialAtlasState: AtlasState = {
  selectedTaxLotId: null,
  highlightedTaxLotIds: [],
  mode: "select",
  shapeFeatureCollection: featureCollection([]) as FeatureCollection,
  bufferFeatureCollection: featureCollection([]) as FeatureCollection,
  penFeatureCollection: featureCollection([]) as FeatureCollection,
};

export const atlasContext = createContext<{
  state: AtlasState;
  actionsDispatch: AtlasActions;
}>({
  state: initialAtlasState,
  actionsDispatch: {} as any,
});
