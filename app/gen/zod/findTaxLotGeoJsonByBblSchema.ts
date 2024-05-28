import { z } from "zod";
import { taxLotGeoJsonSchema } from "./taxLotGeoJsonSchema";
import { errorSchema } from "./errorSchema";

export const findTaxLotGeoJsonByBblPathParamsSchema = z.object({
  bbl: z
    .string()
    .regex(new RegExp("^([0-9]{10})$"))
    .describe(
      `The ten character code compromised of a one character borough, five character block, and four character lot codes.`,
    ),
});

/**
 * @description A tax lot geojson object
 */
export const findTaxLotGeoJsonByBbl200Schema = z.lazy(
  () => taxLotGeoJsonSchema,
);
export const findTaxLotGeoJsonByBbl400Schema = z.lazy(() => errorSchema);
export const findTaxLotGeoJsonByBbl404Schema = z.lazy(() => errorSchema);
export const findTaxLotGeoJsonByBbl500Schema = z.lazy(() => errorSchema);

/**
 * @description A tax lot geojson object
 */
export const findTaxLotGeoJsonByBblQueryResponseSchema = z.lazy(
  () => taxLotGeoJsonSchema,
);
