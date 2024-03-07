import { Button } from "@nycplanning/streetscape";
import { useContext } from "react";
import { atlasContext } from "../stores/atlas.context";

export function EditModeBtn() {
  const {
    actionsDispatch: { updateGeneric },
  } = useContext(atlasContext);
  return (
    <Button
      onClick={() => updateGeneric("change to edit")}
      position="absolute"
      top="10px"
      right="100px"
      zIndex="2"
    >
      Edit
    </Button>
  );
}
