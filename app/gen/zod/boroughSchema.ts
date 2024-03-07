import { z } from "zod";

export const boroughSchema = z.object({
  id: z
    .string()
    .regex(new RegExp("\\b[1-9]\\b"))
    .describe(
      `A single character numeric string containing the common number used to refer to the borough. Possible values are 1-5.`,
    ),
  title: z.string().describe(`The full name of the borough.`),
  abbr: z
    .string()
    .min(2)
    .max(2)
    .describe(`The two character abbreviation for the borough.`),
});
