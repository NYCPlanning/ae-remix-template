import { Heading, List, ListItem, Text } from "@nycplanning/streetscape";
import { useLoaderData } from "@remix-run/react";
import { TaxLotBasicPage } from "../../gen";
import { useContext } from "react";
import { atlasContext } from "../../stores/atlas.context";

export function TaxLotList() {
  const { taxLots } = useLoaderData<TaxLotBasicPage>();
  const {
    state: { selectedTaxLotId },
    actionsDispatch: { updateSelectedTaxLotId },
  } = useContext(atlasContext);
  return (
    <List maxHeight="500px" overflow="scroll">
      {taxLots.map((taxLot) => (
        <ListItem
          key={taxLot.bbl}
          onClick={() => updateSelectedTaxLotId(taxLot.bbl)}
          backgroundColor={selectedTaxLotId === taxLot.bbl ? "pink" : "none"}
        >
          <Heading as="h2">{taxLot.bbl}</Heading>
          <Text>{taxLot.address}</Text>
        </ListItem>
      ))}
    </List>
  );
}
