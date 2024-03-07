import { FeatureCollection } from "geojson";
import { createContext } from "react";

export type AtlasMode = "view" | "edit";

export type AtlasState = {
  mode: AtlasMode;
  shapeFeatures: FeatureCollection;
};

export const initialAtlasState: AtlasState = {
  mode: "view",
  shapeFeatures: {
    type: "FeatureCollection",
    features: [],
  },
};

export const atlasContext = createContext({
  state: initialAtlasState,
  actionsDispatch: {} as any,
});
