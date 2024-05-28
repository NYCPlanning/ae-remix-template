import { Box, Button, Heading } from "@nycplanning/streetscape";
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
      <Link to="/">
        <Heading as="h1">NYC Dept of City Planning</Heading>
        <Heading as="h2">Built Environment Explorer</Heading>
      </Link>
    </Box>
  );
}
