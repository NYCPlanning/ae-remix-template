import { z } from "zod";
import { zoningDistrictClassSchema } from "./zoningDistrictClassSchema";
import { errorSchema } from "./errorSchema";

export const findZoningDistrictClassByZoningDistrictClassIdPathParamsSchema =
  z.object({ id: z.string().regex(new RegExp("^[A-z][0-9]+$")) });

/**
 * @description A class schema for a zoning district
 */
export const findZoningDistrictClassByZoningDistrictClassId200Schema = z.lazy(
  () => zoningDistrictClassSchema,
);
export const findZoningDistrictClassByZoningDistrictClassId400Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictClassByZoningDistrictClassId404Schema = z.lazy(
  () => errorSchema,
);
export const findZoningDistrictClassByZoningDistrictClassId500Schema = z.lazy(
  () => errorSchema,
);

/**
 * @description A class schema for a zoning district
 */
export const findZoningDistrictClassByZoningDistrictClassIdQueryResponseSchema =
  z.lazy(() => zoningDistrictClassSchema);
