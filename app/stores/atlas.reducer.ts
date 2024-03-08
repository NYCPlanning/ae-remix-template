import { AtlasAction, AtlasActionType } from "./atlas.actions";
import { AtlasState } from "./atlas.context";
import { produce } from "immer";
import { point, lineString } from "@turf/helpers";
import { getCoords } from "@turf/invariant";
import { Feature, Geometry, LineString, Point, Position } from "geojson";

export function atlasReducer(state: AtlasState, action: AtlasAction) {
  switch (action.type) {
    case AtlasActionType.UpdateMode: {
      return produce(state, (draft) => {
        const nextMode = action.payload;
        const currentMode = draft.mode;
        // Clear the pen when switching modes
        draft.penFeatureCollection.features = [];
        draft.mode = currentMode === nextMode ? "select" : nextMode;
      });
    }
    case AtlasActionType.ClickOnMap: {
      return produce(state, (draft) => {
        const mouseCoordinate = action.payload;
        if (draft.mode === "createPoint") {
          const pt = point(mouseCoordinate) as Feature<Point, null>;
          if (draft.shapeFeatureCollection)
            draft.shapeFeatureCollection.features.push(pt);
          draft.mode = "select";
          return;
        }
        if (draft.mode === "createLineString") {
          const draftShape = draft.penFeatureCollection.features[0];
          // Pen feature collections have two features when drawing.
          // The first feature is a draft of the shape. Clicking on the map updates the draft.
          // The second feature is the temporary line before the next point is selected. Moving the mouse updates the pen

          // When there are no features yet, the draft needs to be created with a single point
          if (draftShape === undefined) {
            const pt = point(action.payload) as Feature<Point, null>;
            draft.penFeatureCollection.features[0] = pt;

            return;
          }
          // When the draft geometry is a point, it needs to be turned into line string
          if (draftShape.geometry.type === "Point") {
            const ls = lineString([
              draftShape.geometry.coordinates,
              mouseCoordinate,
            ]) as Feature<LineString, null>;
            draft.penFeatureCollection.features[0] = ls;
          }

          const penShape = draft.penFeatureCollection.features[1];
          if (penShape === undefined) return;
          // Mark the mouse coordinate as the next permanent point in the pen lineString
          if (penShape.geometry.type === "LineString") {
            const lsCoords = getCoords(penShape.geometry);
            lsCoords.push(mouseCoordinate);
            const ls = lineString(lsCoords) as Feature<LineString, null>;
            draft.penFeatureCollection.features[1] = ls;

            return;
          }
        }
      });
    }
    case AtlasActionType.HoverOverMap: {
      return produce(state, (draft) => {
        if (draft.mode !== "createLineString") return;

        const draftShape = draft.penFeatureCollection.features[0];
        const penShape = draft.penFeatureCollection.features[1];
        const mouseCoordinate = action.payload;
        if (draftShape === undefined) {
          // If there is no shape, then we cannot create a pen from it
          return;
        }
        if (penShape === undefined) {
          // If there is no pen yet but there is a draft shape, we must create the pen
          let penShapeFirstCoordinate: Position = [];
          if (draftShape.geometry.type === "Point") {
            penShapeFirstCoordinate = draftShape.geometry.coordinates;
          } else if (draftShape.geometry.type === "LineString") {
            penShapeFirstCoordinate =
              draftShape.geometry.coordinates[
                draftShape.geometry.coordinates.length - 1
              ];
          } else {
            throw new Error("Invalid draft shape");
          }

          const ls = lineString([
            penShapeFirstCoordinate,
            mouseCoordinate,
          ]) as Feature<LineString, null>;
          draft.penFeatureCollection.features[1] = ls;

          return;
        }
        // We now have defined draft and pen shapes
        // replace the last coordinate of the pen shape with the current mouse position
        if (penShape.geometry.type === "LineString") {
          const lsCoords = getCoords(penShape.geometry);
          lsCoords[lsCoords.length - 1] = mouseCoordinate;

          const ls = lineString(lsCoords) as Feature<LineString, null>;
          draft.penFeatureCollection.features[1] = ls;

          return;
        }
      });
    }
    default:
      return state;
  }
}
