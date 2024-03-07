import { AtlasAction, AtlasActionType } from "./atlas.actions";
import { AtlasState } from "./atlas.context";

export function atlasReducer(state: AtlasState, action: AtlasAction) {
  switch (action.type) {
    case AtlasActionType.Generic: {
      console.log("generic action", action.payload);
      return {
        ...state,
      };
    }
    case AtlasActionType.Specific: {
      console.log("specific action");
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
