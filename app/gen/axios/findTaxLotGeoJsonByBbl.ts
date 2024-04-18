import client from "@kubb/swagger-client/client";
import type { ResponseConfig } from "@kubb/swagger-client/client";
import type {
  FindTaxLotGeoJsonByBblQueryResponse,
  FindTaxLotGeoJsonByBblPathParams,
} from "../types/FindTaxLotGeoJsonByBbl";

/**
 * @summary GeoJSON for a specific tax lot
 * @link /tax-lots/:bbl/geojson */
export async function findTaxLotGeoJsonByBbl(
  bbl: FindTaxLotGeoJsonByBblPathParams["bbl"],
  options: Partial<Parameters<typeof client>[0]> = {},
): Promise<ResponseConfig<FindTaxLotGeoJsonByBblQueryResponse>["data"]> {
  const res = await client<FindTaxLotGeoJsonByBblQueryResponse>({
    method: "get",
    url: `/tax-lots/${bbl}/geojson`,
    ...options,
  });
  return res.data;
}
