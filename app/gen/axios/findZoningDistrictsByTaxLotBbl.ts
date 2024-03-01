import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindZoningDistrictsByTaxLotBblQueryResponse,
  FindZoningDistrictsByTaxLotBblPathParams,
} from "../types/FindZoningDistrictsByTaxLotBbl";

/**
 * @summary Non-spatial details for zoning districts that spatially intersect a tax lot.
 * @link /tax-lots/:bbl/zoning-districts */
export async function findZoningDistrictsByTaxLotBbl(
  bbl: FindZoningDistrictsByTaxLotBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<
  ResponseConfig<FindZoningDistrictsByTaxLotBblQueryResponse>["data"]
> {
  const res = await client<FindZoningDistrictsByTaxLotBblQueryResponse>({
    method: "get",
    url: `/tax-lots/${bbl}/zoning-districts`,
    ...options,
  });
  return res.data;
}
