import { z } from "zod";
import { zoningDistrictSchema } from "./zoningDistrictSchema";
import { errorSchema } from "./errorSchema";

export const findZoningDistrictByZoningDistrictIdPathParamsSchema = z.object({
  id: z.string().uuid(),
});

/**
 * @description A zoning district object
 */
export const findZoningDistrictByZoningDistrictId200Schema = z.lazy(
  () => zoningDistrictSchema,
);
export const findZoningDistrictByZoningDistrictId400Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictByZoningDistrictId404Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictByZoningDistrictId500Schema = z.lazy(
  () => errorSchema,
);

/**
 * @description A zoning district object
 */
export const findZoningDistrictByZoningDistrictIdQueryResponseSchema = z.lazy(
  () => zoningDistrictSchema,
);
