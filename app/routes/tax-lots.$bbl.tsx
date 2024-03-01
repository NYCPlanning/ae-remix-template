import { Box, Heading, Text } from "@nycplanning/streetscape";
import { LoaderFunctionArgs } from "@remix-run/node";
import {
  TaxLot,
  findTaxLotByBbl,
  findTaxLotByBblPathParamsSchema,
} from "../gen";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { bbl } = findTaxLotByBblPathParamsSchema.parse(params);
  const fakerData = await findTaxLotByBbl(bbl, {
    baseURL: "http://localhost:3000/api",
  });
  console.debug("faker data", fakerData);
  return fakerData;
};

export default function TaxLotBbl() {
  const taxLot = useLoaderData<TaxLot>();
  console.debug("rendered tax lot", taxLot);

  return (
    <Box position="absolute" top={100} right={100} zIndex={2} bg="gray.50">
      <Heading>Tax Lot: {taxLot.bbl}</Heading>
      <Text>Description: {taxLot.landUse.description}</Text>
      <Text>{taxLot.address}</Text>
      <Text>{taxLot.borough.title}</Text>
    </Box>
  );
}
