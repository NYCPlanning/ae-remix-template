import { MVTLayer } from "@deck.gl/geo-layers";
import { Feature, Geometry } from "geojson";
import { AtlasState } from "../stores/atlas.context";
import { AtlasActions } from "~/stores/atlas.actions";

export function useTaxLotLayer(
  atlasState: AtlasState,
  atlasActions: AtlasActions,
) {
  const { updateSelectedTaxLotId } = atlasActions;
  const { selectedTaxLotId, highlightedTaxLotIds, mode } = atlasState;
  return new MVTLayer({
    id: "tax_lot_fill",
    data: `${import.meta.env.VITE_TILE_BUCKET}/tax_lot/{z}/{x}/{y}.pbf`,
    pickable: mode === "select",
    updateTriggers: {
      getFillColor: [selectedTaxLotId, highlightedTaxLotIds],
    },
    getLineColor: () => [43, 108, 176, 255],
    getFillColor: (
      feature: Feature<
        Geometry,
        { borough: string; block: string; lot: string }
      >,
    ) => {
      const { borough, block, lot } = feature.properties;
      const featureBbl = `${borough}${block}${lot}`;
      if (featureBbl === selectedTaxLotId) return [255, 100, 192, 200];

      if (highlightedTaxLotIds.includes(featureBbl))
        return [100, 255, 192, 200];

      return [192, 192, 192, 100];
    },
    onClick: (data) => {
      const feature = data.object as Feature<
        Geometry,
        { borough: string; block: string; lot: string }
      >;
      const { borough, block, lot } = feature.properties;
      updateSelectedTaxLotId(`${borough}${block}${lot}`);
    },
  });
}
