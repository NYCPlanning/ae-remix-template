import { Box, Heading, List, ListItem, Text } from "@nycplanning/streetscape";
import { useLoaderData } from "@remix-run/react";
import {
  TaxLotBasicPage,
  findTaxLotsQueryParamsSchema,
  findTaxLots,
} from "../gen";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const limitRaw = searchParams.get("limit");
  const offsetRaw = searchParams.get("offset");
  const geometryRaw = searchParams.get("geometry");
  const latsRaw = searchParams.get("lats");
  const lonsRaw = searchParams.get("lons");
  const bufferRaw = searchParams.get("buffer");
  const limit = limitRaw !== null ? parseFloat(limitRaw) : undefined;
  const offset = offsetRaw !== null ? parseFloat(offsetRaw) : undefined;
  const geometry = geometryRaw !== null ? geometryRaw : undefined;
  const lons =
    lonsRaw !== null
      ? lonsRaw.split(",").map((lon) => parseFloat(lon))
      : undefined;
  const lats =
    latsRaw !== null
      ? latsRaw.split(",").map((lat) => parseFloat(lat))
      : undefined;
  const buffer = bufferRaw !== null ? bufferRaw : undefined;

  const safeParams = findTaxLotsQueryParamsSchema.parse({
    limit,
    offset,
    geometry,
    lons,
    lats,
    buffer,
  });

  return await findTaxLots(safeParams, {
    baseURL: "http://localhost:3000/api",
  });
};

export default function TaxLotsRoute() {
  const response = useLoaderData<TaxLotBasicPage>();
  return (
    <Box
      position="absolute"
      top="100px"
      right="100px"
      zIndex="2"
      backgroundColor="gray.50"
      padding="20px"
      maxHeight="500px"
      overflow="scroll"
    >
      <List>
        {response.taxLots.map((taxLot) => (
          <ListItem key={taxLot.bbl}>
            <Heading as="h2">{taxLot.bbl}</Heading>
            <Text>{taxLot.address}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
