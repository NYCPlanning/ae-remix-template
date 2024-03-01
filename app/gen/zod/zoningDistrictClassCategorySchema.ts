import { z } from "zod";

export const zoningDistrictClassCategorySchema = z
  .enum([`Residential`, `Commercial`, `Manufacturing`])
  .describe(`The type of zoning district.`);
