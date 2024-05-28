import { useContext, useEffect } from "react";
import { KeyType } from "../stores/atlas.actions";
import { atlasContext } from "../stores/atlas.context";

// TODO: ensure event listener updates as needed
export function KeyboardListener() {
  const {
    actionsDispatch: { EnterKeyDownOnWindow },
  } = useContext(atlasContext);
  const listener = (event: KeyboardEvent) => {
    if (event.key === KeyType.Enter) EnterKeyDownOnWindow(event);
  };

  useEffect(() => {
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  return <></>;
}
