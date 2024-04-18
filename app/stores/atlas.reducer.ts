import { AtlasAction, AtlasActionType } from "./atlas.actions";
import { AtlasState } from "./atlas.context";
import { produce } from "immer";
import { point, lineString, multiPoint } from "@turf/helpers";
import { Feature, LineString, Point, MultiPoint } from "geojson";
import distance from "@turf/distance";
import buffer from "@turf/buffer";

export function atlasReducer(state: AtlasState, action: AtlasAction) {
  switch (action.type) {
    case AtlasActionType.ReplaceHighlightedTaxLotIds: {
      return produce(state, (draft) => {
        draft.highlightedTaxLotIds = action.payload;
      });
    }
    case AtlasActionType.ReplaceBuffer: {
      return produce(state, (draft) => {
        const [feature, radiusFeet] = action.payload;
        const radiusYards = radiusFeet / 2.7;
        const featureBuffer = buffer(feature, radiusYards, { units: "yards" });
        draft.bufferFeatureCollection.features = [featureBuffer as Feature];
      });
    }
    case AtlasActionType.DeleteBuffer: {
      return produce(state, (draft) => {
        draft.bufferFeatureCollection.features = [];
      });
    }
    case AtlasActionType.UpdateSelectedTaxLotId: {
      return produce(state, (draft) => {
        const payloadTaxLotId = action.payload;
        if (payloadTaxLotId === state.selectedTaxLotId) {
          draft.selectedTaxLotId = null;
        } else {
          draft.selectedTaxLotId = payloadTaxLotId;
        }
      });
    }
    case AtlasActionType.UpdateMode: {
      return produce(state, (draft) => {
        const nextMode = action.payload;
        const currentMode = state.mode;
        // Clear the pen when switching modes
        draft.penFeatureCollection.features = [];
        draft.mode = currentMode === nextMode ? "select" : nextMode;
      });
    }
    case AtlasActionType.ClickOnMap: {
      return produce(state, (draft) => {
        const mouseCoordinate = action.payload;
        const currentMode = state.mode;
        if (currentMode === "createPoint") {
          const pt = point(mouseCoordinate) as Feature<Point, null>;
          draft.shapeFeatureCollection.features.push(pt);
          draft.mode = "select";
          return;
        }
        if (currentMode === "createLineString") {
          // Pen feature collections have two features when drawing.
          // The first feature is a crude version of the shape, stored as a multiPoint. Clicking on the map updates the draft.
          // The second feature is the pen - the temporary line - before the next point is selected. Moving the mouse updates the pen
          const crudeShape = draft.penFeatureCollection.features[0];

          if (crudeShape === undefined) {
            const mpt = multiPoint([action.payload]) as Feature<
              MultiPoint,
              null
            >;
            draft.penFeatureCollection.features[0] = mpt;

            return;
          } else if (crudeShape.geometry.type === "MultiPoint") {
            const lastCoord =
              crudeShape.geometry.coordinates[
                crudeShape.geometry.coordinates.length - 1
              ];
            const distanceClickAndLastCoord = distance(
              lastCoord,
              mouseCoordinate,
              { units: "yards" },
            );
            if (distanceClickAndLastCoord < 10) {
              // Cannot have a lineString with only one unique point
              if (crudeShape.geometry.coordinates.length === 1) return;
              // End if there is at least 1 unique point already
              const ls = lineString(crudeShape.geometry.coordinates) as Feature<
                LineString,
                null
              >;
              draft.shapeFeatureCollection.features.push(ls);
              draft.penFeatureCollection.features = [];
              draft.mode = "select";
              return;
            }
            // TODO: LineString support ending on keyboard enter

            // Only allow up to five points
            if (crudeShape.geometry.coordinates.length <= 4) {
              crudeShape.geometry.coordinates.push(mouseCoordinate);
            }

            // Check the length again. If it is 5, save the shape
            if (crudeShape.geometry.coordinates.length === 5) {
              const ls = lineString(crudeShape.geometry.coordinates) as Feature<
                LineString,
                null
              >;
              draft.shapeFeatureCollection.features.push(ls);
              draft.penFeatureCollection.features = [];
              draft.mode = "select";
            } else if (crudeShape.geometry.coordinates.length > 5) {
              throw new Error("Two many points in LineString");
            }
          }
        }
      });
    }
    case AtlasActionType.HoverOverMap: {
      return produce(state, (draft) => {
        if (state.mode !== "createLineString") return;

        const crudeShape = draft.penFeatureCollection.features[0];
        const mouseCoordinate = action.payload;
        if (crudeShape === undefined) {
          // If there is no shape, then we cannot create a pen from it
          return;
        }

        // The pen consists of the points from the crude shape and a point from the mouse position
        if (crudeShape.geometry.type === "MultiPoint") {
          const penShape = draft.penFeatureCollection.features[1];
          const penCoordinates = [
            ...crudeShape.geometry.coordinates,
            mouseCoordinate,
          ];
          if (penShape === undefined) {
            const ls = lineString(penCoordinates) as Feature<LineString>;
            draft.penFeatureCollection.features[1] = ls;
          } else if (penShape.geometry.type === "LineString") {
            penShape.geometry.coordinates = penCoordinates;
          }
        }
      });
    }
    case AtlasActionType.EnterKeyDownOnWindow: {
      return produce(state, (draft) => {
        const currentMode = state.mode;
        if (currentMode === "select") return;
        if (currentMode === "createPoint") {
          action.payload.preventDefault();
          draft.penFeatureCollection.features = [];
          draft.mode = "select";
          return;
        }
        if (currentMode === "createLineString") {
          action.payload.preventDefault();
          const crudeShape = draft.penFeatureCollection.features[0];
          if (
            crudeShape?.geometry.type === "MultiPoint" &&
            crudeShape.geometry.coordinates.length >= 2
          ) {
            const ls = lineString(crudeShape.geometry.coordinates) as Feature<
              LineString,
              null
            >;
            draft.shapeFeatureCollection.features.push(ls);
          }
          draft.penFeatureCollection.features = [];
          draft.mode = "select";
          return;
        }
      });
    }
    default:
      return state;
  }
}
