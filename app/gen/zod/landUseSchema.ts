import { z } from "zod";

export const landUseSchema = z.object({
  id: z
    .string()
    .min(2)
    .max(2)
    .describe(
      `The two character code to represent the land use. Possible values are 01-11.`,
    ),
  description: z.string().describe(`The description of the land use.`),
  color: z
    .string()
    .regex(new RegExp("^#([A-Fa-f0-9]{8})$"))
    .describe(`Hex-style color code to represent the land use.`),
});
