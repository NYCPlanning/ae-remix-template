import { z } from "zod";
import { taxLotSchema } from "./taxLotSchema";
import { errorSchema } from "./errorSchema";

export const findTaxLotByBblPathParamsSchema = z.object({
  bbl: z
    .string()
    .regex(new RegExp("^([0-9]{10})$"))
    .describe(
      `The ten character code compromised of a one character borough, five character block, and four character lot codes.`,
    ),
});

/**
 * @description A tax lot object
 */
export const findTaxLotByBbl200Schema = z.lazy(() => taxLotSchema);
export const findTaxLotByBbl400Schema = z.lazy(() => errorSchema);
export const findTaxLotByBbl404Schema = z.lazy(() => errorSchema);
export const findTaxLotByBbl500Schema = z.lazy(() => errorSchema);

/**
 * @description A tax lot object
 */
export const findTaxLotByBblQueryResponseSchema = z.lazy(() => taxLotSchema);
