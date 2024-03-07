import { Dispatch } from "react";

export enum AtlasActionType {
  Generic = "generic",
  Specific = "Specific",
}

export type AtlasAction =
  | {
      type: AtlasActionType.Generic;
      payload: string;
    }
  | {
      type: AtlasActionType.Specific;
      payload: string;
    };

export const atlasActions = (dispatch: Dispatch<AtlasAction>) => {
  return {
    updateGeneric: (payload: string) =>
      dispatch({
        type: AtlasActionType.Generic,
        payload,
      }),
    updateSpecific: (payload: string) =>
      dispatch({
        type: AtlasActionType.Specific,
        payload,
      }),
  };
};
