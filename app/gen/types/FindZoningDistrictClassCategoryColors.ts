import type { ZoningDistrictClassCategoryColor } from "./ZoningDistrictClassCategoryColor";
import type { Error } from "./Error";

/**
 * @description An object containing all zoning district category colors.
 */
export type FindZoningDistrictClassCategoryColors200 = {
  /**
   * @type array
   */
  zoningDistrictClassCategoryColors: ZoningDistrictClassCategoryColor[];
};

export type FindZoningDistrictClassCategoryColors400 = Error;

export type FindZoningDistrictClassCategoryColors500 = Error;

/**
 * @description An object containing all zoning district category colors.
 */
export type FindZoningDistrictClassCategoryColorsQueryResponse = {
  /**
   * @type array
   */
  zoningDistrictClassCategoryColors: ZoningDistrictClassCategoryColor[];
};
export type FindZoningDistrictClassCategoryColorsQuery = {
  Response: FindZoningDistrictClassCategoryColorsQueryResponse;
  Errors:
    | FindZoningDistrictClassCategoryColors400
    | FindZoningDistrictClassCategoryColors500;
};