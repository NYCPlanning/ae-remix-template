import { positionSchema } from "./positionSchema";
import { z } from "zod";

export const multiPolygonSchema = z
  .object({
    type: z.enum([`MultiPolygon`]),
    coordinates: z
      .array(z.array(z.array(z.lazy(() => positionSchema))))
      .describe(`Array of polygon coordinate arrays.`),
  })
  .describe(`A geojson implementation of a MultiPolygon Simple Feature`);
