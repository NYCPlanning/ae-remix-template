import { Position } from "geojson";
import { Dispatch } from "react";
import { AtlasMode } from "./atlas.context";

export enum KeyType {
  Enter = "Enter",
}

export enum AtlasActionType {
  UpdateMode = "UpdateMode",
  HoverOverMap = "HoverOverMap",
  ClickOnMap = "ClickOnMap",
  EnterKeyDownOnWindow = "EnterKeyDownOnWindow",
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
    }
  | {
      type: AtlasActionType.EnterKeyDownOnWindow;
      payload: KeyboardEvent;
    };

export type AtlasActions = {
  updateMode: (payload: AtlasMode) => void;
  clickOnMap: (payload: Position) => void;
  hoverOverMap: (payload: Position) => void;
  EnterKeyDownOnWindow: (payload: KeyboardEvent) => void;
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
    EnterKeyDownOnWindow: (payload) =>
      dispatch({ type: AtlasActionType.EnterKeyDownOnWindow, payload }),
  };
};
