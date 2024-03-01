import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindZoningDistrictClassesByTaxLotBblQueryResponse,
  FindZoningDistrictClassesByTaxLotBblPathParams,
} from "../types/FindZoningDistrictClassesByTaxLotBbl";

/**
 * @summary Class schemas for all zoning districts that spatially intersect the tax lot
 * @link /tax-lots/:bbl/zoning-districts/classes */
export async function findZoningDistrictClassesByTaxLotBbl(
  bbl: FindZoningDistrictClassesByTaxLotBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindZoningDistrictClassesByTaxLotBblQueryResponse>["data"]
> {
  const res = await client<FindZoningDistrictClassesByTaxLotBblQueryResponse>({
    method: "get",
    url: `/tax-lots/${bbl}/zoning-districts/classes`,
    ...options,
  });
  return res.data;
}
