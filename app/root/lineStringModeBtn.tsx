import { Button } from "@nycplanning/streetscape";
import { useContext } from "react";
import { atlasContext } from "../stores/atlas.context";

export function LinStringModeBtn() {
  const {
    state: { mode },
    actionsDispatch: { updateMode },
  } = useContext(atlasContext);
  return (
    <Button
      onClick={() => updateMode("createLineString")}
      variant={mode === "createLineString" ? "primary" : "secondary"}
      size="sm"
    >
      Create LineString
    </Button>
  );
}
