import { faker } from "@faker-js/faker";
import { createTaxLotBasicPage } from "./createTaxLotBasicPage";
import { createError } from "./createError";
import type {
  FindTaxLots200,
  FindTaxLots400,
  FindTaxLots500,
  FindTaxLotsQueryParams,
  FindTaxLotsQueryResponse,
} from "../types/FindTaxLots";

export function createFindTaxLotsQueryParams(
  override: NonNullable<Partial<FindTaxLotsQueryParams>> = {},
): NonNullable<FindTaxLotsQueryParams> {
  return {
    ...{
      limit: faker.number.float({ min: 1, max: 100 }),
      offset: faker.number.float({ min: 0 }),
      geometry: faker.helpers.arrayElement<any>([
        `Point`,
        `LineString`,
        `Polygon`,
      ]),
      lons: faker.helpers.arrayElements([faker.number.float({})]) as any,
      lats: faker.helpers.arrayElements([faker.number.float({})]) as any,
      buffer: faker.number.float({}),
    },
    ...override,
  };
}
/**
 * @description An object containing a list of tax lots and pagination metadata. An optional spatial filter will return all tax lots that intersect the spatial feature and its optional buffer. When applying a spatial filter, tax lots are ordered by their closeness to the spatial feature.
 */

export function createFindTaxLots200(
  override?: NonNullable<Partial<FindTaxLots200>>,
): NonNullable<FindTaxLots200> {
  return createTaxLotBasicPage(override);
}

export function createFindTaxLots400(
  override?: NonNullable<Partial<FindTaxLots400>>,
): NonNullable<FindTaxLots400> {
  return createError(override);
}

export function createFindTaxLots500(
  override?: NonNullable<Partial<FindTaxLots500>>,
): NonNullable<FindTaxLots500> {
  return createError(override);
}
/**
 * @description An object containing a list of tax lots and pagination metadata. An optional spatial filter will return all tax lots that intersect the spatial feature and its optional buffer. When applying a spatial filter, tax lots are ordered by their closeness to the spatial feature.
 */

export function createFindTaxLotsQueryResponse(
  override?: NonNullable<Partial<FindTaxLotsQueryResponse>>,
): NonNullable<FindTaxLotsQueryResponse> {
  return createTaxLotBasicPage(override);
}