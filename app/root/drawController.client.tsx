import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from "@nycplanning/streetscape";
import { PointModeBtn } from "./pointModeBtn";
import { LinStringModeBtn } from "./lineStringModeBtn";

export function DrawController() {
  return (
    <Accordion
      position="absolute"
      top="100px"
      left="50px"
      width="200px"
      zIndex="2"
      backgroundColor="gray.50"
      allowToggle
    >
      <AccordionItem>
        <Heading as="h3">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Draw tools
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionPanel>
          <Flex flexDirection="column">
            <PointModeBtn />
            <LinStringModeBtn />
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
