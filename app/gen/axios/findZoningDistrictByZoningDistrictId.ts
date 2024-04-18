import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindZoningDistrictByZoningDistrictIdQueryResponse,
  FindZoningDistrictByZoningDistrictIdPathParams,
} from "../types/FindZoningDistrictByZoningDistrictId";

/**
 * @summary Non-spatial details for a specific zoning district
 * @link /zoning-districts/:id */
export async function findZoningDistrictByZoningDistrictId(
  id: FindZoningDistrictByZoningDistrictIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindZoningDistrictByZoningDistrictIdQueryResponse>["data"]
> {
  const res = await client<FindZoningDistrictByZoningDistrictIdQueryResponse>({
    method: "get",
    url: `/zoning-districts/${id}`,
    ...options,
  });
  return res.data;
}
