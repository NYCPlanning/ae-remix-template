export const operations = {
  findBoroughs: { path: "/boroughs", method: "get" },
  findLandUses: { path: "/land-uses", method: "get" },
  findTaxLots: { path: "/tax-lots", method: "get" },
  findTaxLotByBbl: { path: "/tax-lots/:bbl", method: "get" },
  findTaxLotGeoJsonByBbl: { path: "/tax-lots/:bbl/geojson", method: "get" },
  findZoningDistrictsByTaxLotBbl: {
    path: "/tax-lots/:bbl/zoning-districts",
    method: "get",
  },
  findZoningDistrictClassesByTaxLotBbl: {
    path: "/tax-lots/:bbl/zoning-districts/classes",
    method: "get",
  },
  findZoningDistrictByZoningDistrictId: {
    path: "/zoning-districts/:id",
    method: "get",
  },
  findZoningDistrictClassesByZoningDistrictId: {
    path: "/zoning-districts/:id/classes",
    method: "get",
  },
  findZoningDistrictClasses: {
    path: "/zoning-district-classes",
    method: "get",
  },
  findZoningDistrictClassCategoryColors: {
    path: "/zoning-district-classes/category-colors",
    method: "get",
  },
  findZoningDistrictClassByZoningDistrictClassId: {
    path: "/zoning-district-classes/:id",
    method: "get",
  },
} as const;
