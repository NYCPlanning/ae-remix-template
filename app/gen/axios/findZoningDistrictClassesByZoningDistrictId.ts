import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindZoningDistrictClassesByZoningDistrictIdQueryResponse,
  FindZoningDistrictClassesByZoningDistrictIdPathParams,
} from "../types/FindZoningDistrictClassesByZoningDistrictId";

/**
 * @summary Class schemas for the specified zoning district
 * @link /zoning-districts/:id/classes */
export async function findZoningDistrictClassesByZoningDistrictId(
  id: FindZoningDistrictClassesByZoningDistrictIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindZoningDistrictClassesByZoningDistrictIdQueryResponse>["data"]
> {
  const res =
    await client<FindZoningDistrictClassesByZoningDistrictIdQueryResponse>({
      method: "get",
      url: `/zoning-districts/${id}/classes`,
      ...options,
    });
  return res.data;
}
