import { GeoJsonLayer } from "@deck.gl/layers";
import { AtlasState } from "~/stores/atlas.context";

export function useBufferLayer(atlasState: AtlasState) {
  const { bufferFeatureCollection } = atlasState;
  return new GeoJsonLayer({
    data: bufferFeatureCollection,
    getFillColor: () => [100, 120, 255, 30],
  });
}
