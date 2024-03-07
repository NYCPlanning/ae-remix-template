import { zoningDistrictClassCategorySchema } from "./zoningDistrictClassCategorySchema";
import { z } from "zod";

export const zoningDistrictClassSchema = z.object({
  id: z
    .string()
    .regex(new RegExp("^[A-Z][0-9]+$"))
    .describe(`The code associated with the Zoning class.`),
  category: z.lazy(() => zoningDistrictClassCategorySchema),
  description: z.string().describe(`Zoning class descriptions.`),
  url: z
    .string()
    .describe(`Planning website page that explains the Zoning District`),
  color: z
    .string()
    .regex(new RegExp("^#([A-Fa-f0-9]{8})$"))
    .describe(`Zoning classes from layer groups.`),
});
