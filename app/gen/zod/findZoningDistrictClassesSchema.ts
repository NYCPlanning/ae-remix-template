import { z } from "zod";
import { zoningDistrictClassSchema } from "./zoningDistrictClassSchema";
import { errorSchema } from "./errorSchema";

/**
 * @description An object containing all zoning district class schemas.
 */
export const findZoningDistrictClasses200Schema = z.object({
  zoningDistrictClasses: z.array(z.lazy(() => zoningDistrictClassSchema)),
});
export const findZoningDistrictClasses400Schema = z.lazy(() => errorSchema);
export const findZoningDistrictClasses500Schema = z.lazy(() => errorSchema);

/**
 * @description An object containing all zoning district class schemas.
 */
export const findZoningDistrictClassesQueryResponseSchema = z.object({
  zoningDistrictClasses: z.array(z.lazy(() => zoningDistrictClassSchema)),
});
