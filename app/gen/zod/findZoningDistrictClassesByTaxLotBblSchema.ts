import { z } from "zod";
import { zoningDistrictClassSchema } from "./zoningDistrictClassSchema";
import { errorSchema } from "./errorSchema";

export const findZoningDistrictClassesByTaxLotBblPathParamsSchema = z.object({
  bbl: z
    .string()
    .regex(new RegExp("^([0-9]{10})$"))
    .describe(
      `The ten character code compromised of a one character borough, five character block, and four character lot codes.`,
    ),
});

/**
 * @description An object containing zoning district class schemas.
 */
export const findZoningDistrictClassesByTaxLotBbl200Schema = z.object({
  zoningDistrictClasses: z.array(z.lazy(() => zoningDistrictClassSchema)),
});
export const findZoningDistrictClassesByTaxLotBbl400Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictClassesByTaxLotBbl404Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictClassesByTaxLotBbl500Schema = z.lazy(
  () => errorSchema,
);

/**
 * @description An object containing zoning district class schemas.
 */
export const findZoningDistrictClassesByTaxLotBblQueryResponseSchema = z.object(
  { zoningDistrictClasses: z.array(z.lazy(() => zoningDistrictClassSchema)) },
);
