import { Position } from "geojson";
import { Dispatch } from "react";
import { AtlasMode } from "./atlas.context";

export enum AtlasActionType {
  UpdateMode = "UpdateMode",
  HoverOverMap = "HoverOverMap",
  ClickOnMap = "ClickOnMap",
}

export type AtlasAction =
  | {
      type: AtlasActionType.ClickOnMap;
      payload: Position;
    }
  | {
      type: AtlasActionType.UpdateMode;
      payload: AtlasMode;
    }
  | {
      type: AtlasActionType.HoverOverMap;
      payload: Position;
    };

export type AtlasActions = {
  updateMode: (payload: AtlasMode) => void;
  clickOnMap: (payload: Position) => void;
  hoverOverMap: (payload: Position) => void;
};

export const atlasActions = (dispatch: Dispatch<AtlasAction>): AtlasActions => {
  return {
    updateMode: (payload) =>
      dispatch({
        type: AtlasActionType.UpdateMode,
        payload,
      }),
    clickOnMap: (payload) =>
      dispatch({
        type: AtlasActionType.ClickOnMap,
        payload,
      }),
    hoverOverMap: (payload) =>
      dispatch({
        type: AtlasActionType.HoverOverMap,
        payload,
      }),
  };
};
