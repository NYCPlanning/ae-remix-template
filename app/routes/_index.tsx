import { Box, Button } from "@nycplanning/streetscape";
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { ClientOnly } from "remix-utils/client-only";

const INITIAL_VIEW_STATE = {
  longitude: -74.0008,
  latitude: 40.7018,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

export default function Index() {
  return (
    <>
      <Box
        bg="gray.700"
        w="100%"
        p={4}
        color="white"
        position="absolute"
        zIndex={2}
      >
        <Button variant="secondary" size="sm">
          Hello world!
        </Button>
      </Box>
      <ClientOnly fallback={<h2>Loading map...</h2>}>
        {() => (
          <DeckGL
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            style={{ height: "100vh", width: "100vw" }}
          >
            <Map
              mapStyle={
                "https://tiles.planninglabs.nyc/styles/positron/style.json"
              }
            ></Map>
          </DeckGL>
        )}
      </ClientOnly>
    </>
  );
}
