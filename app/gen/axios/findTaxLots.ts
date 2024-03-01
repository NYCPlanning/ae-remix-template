import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindTaxLotsQueryResponse,
  FindTaxLotsQueryParams,
} from "../types/FindTaxLots";

/**
 * @summary Non-spatial details for tax lots
 * @link /tax-lots */
export async function findTaxLots(
  params?: FindTaxLotsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindTaxLotsQueryResponse>["data"]> {
  const res = await client<FindTaxLotsQueryResponse>({
    method: "get",
    url: `/tax-lots`,
    params,
    ...options,
  });
  return res.data;
}
