import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindZoningDistrictClassesQueryResponse } from "../types/FindZoningDistrictClasses";

/**
 * @summary Class schemas for all zoning districts
 * @link /zoning-district-classes */
export async function findZoningDistrictClasses(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindZoningDistrictClassesQueryResponse>["data"]> {
  const res = await client<FindZoningDistrictClassesQueryResponse>({
    method: "get",
    url: `/zoning-district-classes`,
    ...options,
  });
  return res.data;
}
