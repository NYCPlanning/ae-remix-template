import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type { FindBoroughsQueryResponse } from "../types/FindBoroughs";

/**
 * @summary List boroughs
 * @link /boroughs */
export async function findBoroughs(
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindBoroughsQueryResponse>["data"]> {
  const res = await client<FindBoroughsQueryResponse>({
    method: "get",
    url: `/boroughs`,
    ...options,
  });
  return res.data;
}
