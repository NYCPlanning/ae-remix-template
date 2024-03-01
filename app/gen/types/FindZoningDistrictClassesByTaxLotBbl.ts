import type { ZoningDistrictClass } from "./ZoningDistrictClass";
import type { Error } from "./Error";

export type FindZoningDistrictClassesByTaxLotBblPathParams = {
  /**
   * @description The ten character code compromised of a one character borough, five character block, and four character lot codes.
   * @type string
   * @example 1000477501
   */
  bbl: string;
};

/**
 * @description An object containing zoning district class schemas.
 */
export type FindZoningDistrictClassesByTaxLotBbl200 = {
  /**
   * @type array
   */
  zoningDistrictClasses: ZoningDistrictClass[];
};

export type FindZoningDistrictClassesByTaxLotBbl400 = Error;

export type FindZoningDistrictClassesByTaxLotBbl404 = Error;

export type FindZoningDistrictClassesByTaxLotBbl500 = Error;

/**
 * @description An object containing zoning district class schemas.
 */
export type FindZoningDistrictClassesByTaxLotBblQueryResponse = {
  /**
   * @type array
   */
  zoningDistrictClasses: ZoningDistrictClass[];
};
export type FindZoningDistrictClassesByTaxLotBblQuery = {
  Response: FindZoningDistrictClassesByTaxLotBblQueryResponse;
  PathParams: FindZoningDistrictClassesByTaxLotBblPathParams;
  Errors:
    | FindZoningDistrictClassesByTaxLotBbl400
    | FindZoningDistrictClassesByTaxLotBbl404
    | FindZoningDistrictClassesByTaxLotBbl500;
};
