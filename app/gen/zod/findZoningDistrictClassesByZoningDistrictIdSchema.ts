import { z } from "zod";
import { zoningDistrictClassSchema } from "./zoningDistrictClassSchema";
import { errorSchema } from "./errorSchema";

export const findZoningDistrictClassesByZoningDistrictIdPathParamsSchema =
  z.object({ id: z.string().uuid() });

/**
 * @description An object of class schemas for the zoning district.
 */
export const findZoningDistrictClassesByZoningDistrictId200Schema = z.object({
  zoningDistrictClasses: z.array(z.lazy(() => zoningDistrictClassSchema)),
});
export const findZoningDistrictClassesByZoningDistrictId400Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictClassesByZoningDistrictId404Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictClassesByZoningDistrictId500Schema = z.lazy(
  () => errorSchema,
);

/**
 * @description An object of class schemas for the zoning district.
 */
export const findZoningDistrictClassesByZoningDistrictIdQueryResponseSchema =
  z.object({
    zoningDistrictClasses: z.array(z.lazy(() => zoningDistrictClassSchema)),
  });
