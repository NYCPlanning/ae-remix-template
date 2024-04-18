import { GeoJsonLayer } from "@deck.gl/layers";
import { AtlasState } from "../stores/atlas.context";

export function usePenLayer(atlasState: AtlasState) {
  const { penFeatureCollection } = atlasState;
  return new GeoJsonLayer({
    data: penFeatureCollection,
    getLineWidth: () => 10,
  });
}
