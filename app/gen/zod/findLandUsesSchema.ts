import { z } from "zod";
import { landUseSchema } from "./landUseSchema";
import { errorSchema } from "./errorSchema";

/**
 * @description An object containing all land uses.
 */
export const findLandUses200Schema = z.object({
  landUses: z.array(z.lazy(() => landUseSchema)),
});
export const findLandUses400Schema = z.lazy(() => errorSchema);
export const findLandUses500Schema = z.lazy(() => errorSchema);

/**
 * @description An object containing all land uses.
 */
export const findLandUsesQueryResponseSchema = z.object({
  landUses: z.array(z.lazy(() => landUseSchema)),
});
