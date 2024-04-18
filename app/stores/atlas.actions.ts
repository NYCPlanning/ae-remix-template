import { Feature, Position } from "geojson";
import { Dispatch } from "react";
import { AtlasMode } from "./atlas.context";
import { Geometry } from "@turf/helpers";

export enum KeyType {
  Enter = "Enter",
}

export enum AtlasActionType {
  UpdateSelectedTaxLotId = "UpdateSelectTaxLotId",
  ReplaceHighlightedTaxLotIds = "ReplaceHighlightedTaxLotIds",
  ReplaceBuffer = "ReplaceBuffer",
  UpdateBufferRadius = "UpdateBufferRadius",
  DeleteBuffer = "DeleteBuffer",
  UpdateMode = "UpdateMode",
  HoverOverMap = "HoverOverMap",
  ClickOnMap = "ClickOnMap",
  EnterKeyDownOnWindow = "EnterKeyDownOnWindow",
}

export type AtlasAction =
  | {
      type: AtlasActionType.UpdateSelectedTaxLotId;
      payload: string | null;
    }
  | {
      type: AtlasActionType.ReplaceHighlightedTaxLotIds;
      payload: Array<string>;
    }
  | {
      type: AtlasActionType.ReplaceBuffer;
      payload: [Feature, number];
    }
  | {
      type: AtlasActionType.UpdateBufferRadius;
      payload: number;
    }
  | {
      type: AtlasActionType.DeleteBuffer;
    }
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
  updateSelectedTaxLotId: (payload: null | string) => void;
  replaceHighlightedTaxLotIds: (payload: Array<string>) => void;
  replaceBuffer: (payload: [Feature, number]) => void;
  deleteBuffer: () => void;
  updateMode: (payload: AtlasMode) => void;
  clickOnMap: (payload: Position) => void;
  hoverOverMap: (payload: Position) => void;
  EnterKeyDownOnWindow: (payload: KeyboardEvent) => void;
};

export const atlasActions = (dispatch: Dispatch<AtlasAction>): AtlasActions => {
  return {
    updateSelectedTaxLotId: (payload) =>
      dispatch({
        type: AtlasActionType.UpdateSelectedTaxLotId,
        payload,
      }),
    replaceHighlightedTaxLotIds: (payload) =>
      dispatch({
        type: AtlasActionType.ReplaceHighlightedTaxLotIds,
        payload,
      }),
    replaceBuffer: (payload) =>
      dispatch({
        type: AtlasActionType.ReplaceBuffer,
        payload,
      }),
    deleteBuffer: () =>
      dispatch({
        type: AtlasActionType.DeleteBuffer,
      }),
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
