import { z } from "zod";
import { taxLotBasicPageSchema } from "./taxLotBasicPageSchema";
import { errorSchema } from "./errorSchema";

export const findTaxLotsQueryParamsSchema = z
  .object({
    limit: z
      .number()
      .min(1)
      .max(100)
      .describe(
        `The maximum number of results to be returned in each response. The default value is 20. It must be between 1 and 100, inclusive.`,
      )
      .optional(),
    offset: z
      .number()
      .min(0)
      .describe(
        `The position in the full list to begin returning results. Default offset is 0. If the offset is beyond the end of the list, no results will be returned.`,
      )
      .optional(),
  })
  .optional();

/**
 * @description An object containing a list of tax lots and pagination metadata
 */
export const findTaxLots200Schema = z.lazy(() => taxLotBasicPageSchema);
export const findTaxLots400Schema = z.lazy(() => errorSchema);
export const findTaxLots500Schema = z.lazy(() => errorSchema);

/**
 * @description An object containing a list of tax lots and pagination metadata
 */
export const findTaxLotsQueryResponseSchema = z.lazy(
  () => taxLotBasicPageSchema,
);
