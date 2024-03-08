import { Button } from "@nycplanning/streetscape";
import { useContext } from "react";
import { atlasContext } from "../stores/atlas.context";

export function PointModeBtn() {
  const {
    state: { mode },
    actionsDispatch: { updateMode },
  } = useContext(atlasContext);

  return (
    <Button
      onClick={() => updateMode("createPoint")}
      position="absolute"
      top="10px"
      right="100px"
      zIndex="2"
      variant={mode === "createPoint" ? "primary" : "secondary"}
      size="sm"
    >
      Create Point
    </Button>
  );
}
