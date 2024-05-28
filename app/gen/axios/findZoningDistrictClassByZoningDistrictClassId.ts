import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindZoningDistrictClassByZoningDistrictClassIdQueryResponse,
  FindZoningDistrictClassByZoningDistrictClassIdPathParams,
} from "../types/FindZoningDistrictClassByZoningDistrictClassId";

/**
 * @summary Class schema for the specified class
 * @link /zoning-district-classes/:id */
export async function findZoningDistrictClassByZoningDistrictClassId(
  id: FindZoningDistrictClassByZoningDistrictClassIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindZoningDistrictClassByZoningDistrictClassIdQueryResponse>["data"]
> {
  const res =
    await client<FindZoningDistrictClassByZoningDistrictClassIdQueryResponse>({
      method: "get",
      url: `/zoning-district-classes/${id}`,
      ...options,
    });
  return res.data;
}
