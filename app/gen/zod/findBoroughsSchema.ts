import { z } from "zod";
import { boroughSchema } from "./boroughSchema";
import { errorSchema } from "./errorSchema";

/**
 * @description An object containing all boroughs.
 */
export const findBoroughs200Schema = z.object({
  boroughs: z.array(z.lazy(() => boroughSchema)),
});
export const findBoroughs400Schema = z.lazy(() => errorSchema);
export const findBoroughs500Schema = z.lazy(() => errorSchema);

/**
 * @description An object containing all boroughs.
 */
export const findBoroughsQueryResponseSchema = z.object({
  boroughs: z.array(z.lazy(() => boroughSchema)),
});
