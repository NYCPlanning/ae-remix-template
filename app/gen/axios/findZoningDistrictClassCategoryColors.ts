import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindZoningDistrictClassCategoryColorsQueryResponse } from "../types/FindZoningDistrictClassCategoryColors";

/**
 * @summary List of color and class category
 * @link /zoning-district-classes/category-colors */
export async function findZoningDistrictClassCategoryColors(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindZoningDistrictClassCategoryColorsQueryResponse>["data"]
> {
  const res = await client<FindZoningDistrictClassCategoryColorsQueryResponse>({
    method: "get",
    url: `/zoning-district-classes/category-colors`,
    ...options,
  });
  return res.data;
}
