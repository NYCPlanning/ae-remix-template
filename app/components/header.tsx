import { Box, Button } from "@nycplanning/streetscape";
import { Link } from "@remix-run/react";

export function Header() {
  return (
    <Box
      bg="gray.700"
      w="100%"
      p={4}
      color="white"
      position="absolute"
      zIndex={2}
    >
      <Button variant="secondary" size="sm">
        <Link to="tax-lots">Tax Lots</Link>
      </Button>
    </Box>
  );
}
