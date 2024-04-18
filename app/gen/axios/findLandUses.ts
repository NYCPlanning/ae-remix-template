import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindLandUsesQueryResponse } from "../types/FindLandUses";

/**
 * @summary List land uses
 * @link /land-uses */
export async function findLandUses(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindLandUsesQueryResponse>["data"]> {
  const res = await client<FindLandUsesQueryResponse>({
    method: "get",
    url: `/land-uses`,
    ...options,
  });
  return res.data;
}
