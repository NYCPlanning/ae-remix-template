import { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";
import {
  TerraDraw,
  TerraDrawMapLibreGLAdapter,
  TerraDrawPointMode,
} from "terra-draw";

export function Draw() {
  const { atlas } = useMap();
  useEffect(() => {
    if (atlas === undefined) return;
    const draw = new TerraDraw({
      adapter: new TerraDrawMapLibreGLAdapter({ map: atlas.getMap() }),
      modes: [new TerraDrawPointMode()],
    });
    draw.start();

    draw.setMode("point");
    const snapshot = draw.getSnapshot();
    console.debug("snapshot", snapshot);
  }, [atlas]);
  return <div>Hi</div>;
}
