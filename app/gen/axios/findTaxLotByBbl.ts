import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindTaxLotByBblQueryResponse,
  FindTaxLotByBblPathParams,
} from "../types/FindTaxLotByBbl";

/**
 * @summary Non-spatial details for a specific tax lot
 * @link /tax-lots/:bbl */
export async function findTaxLotByBbl(
  bbl: FindTaxLotByBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindTaxLotByBblQueryResponse>["data"]> {
  const res = await client<FindTaxLotByBblQueryResponse>({
    method: "get",
    url: `/tax-lots/${bbl}`,
    ...options,
  });
  return res.data;
}
