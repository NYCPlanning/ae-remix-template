import { Box, Button, Flex } from "@nycplanning/streetscape";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import {
  TaxLotBasicPage,
  findTaxLotsQueryParamsSchema,
  findTaxLots,
} from "../../gen";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useContext, useEffect } from "react";
import { atlasContext } from "../../stores/atlas.context";
import { TaxLotList } from "./list";
import { OffsetBtn } from "../../components/offsetBtn";
import { lineString, point } from "@turf/helpers";
import { Feature, LineString, Point, Position } from "geojson";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get parameters from url
  const { searchParams } = new URL(request.url);
  const limitRaw = searchParams.get("limit");
  const offsetRaw = searchParams.get("offset");
  const geometryRaw = searchParams.get("geometry");
  const latsRaw = searchParams.get("lats");
  const lonsRaw = searchParams.get("lons");
  const bufferRaw = searchParams.get("buffer");

  // Parse parameters into their expected form
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
  const buffer = bufferRaw !== null ? parseFloat(bufferRaw) : undefined;

  // Enforce parameters structure
  const safeParams = findTaxLotsQueryParamsSchema.parse({
    limit,
    offset,
    geometry,
    lons,
    lats,
    buffer,
  });

  // Request intersecting tax lots
  return await findTaxLots(safeParams, {
    baseURL: `${import.meta.env.VITE_ZONING_API_URL}/api`,
  });
};

export default function TaxLotsRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { taxLots, limit, offset, total } = useLoaderData<TaxLotBasicPage>();
  const {
    actionsDispatch: {
      replaceHighlightedTaxLotIds,
      replaceBuffer,
      deleteBuffer,
    },
  } = useContext(atlasContext);

  useEffect(() => {
    const taxLotIds = taxLots.map((taxLot) => taxLot.bbl);
    replaceHighlightedTaxLotIds(taxLotIds);
  }, [taxLots]);

  return (
    <Box
      position="absolute"
      top="100px"
      right="100px"
      zIndex="2"
      backgroundColor="gray.50"
      padding="20px"
    >
      <TaxLotList />
      <Box>
        Limit: {limit}
        Offset: {offset}
        Total: {total}
        <Flex>
          <OffsetBtn current={limit} target={20} />
          <OffsetBtn current={limit} target={50} />
          <OffsetBtn current={limit} target={100} />
        </Flex>
        <Flex>
          <Button
            isDisabled={offset <= 0}
            onClick={() =>
              setSearchParams((draft) => {
                draft.set("offset", `${Math.max(0, offset - limit)}`);
                return draft;
              })
            }
          >
            Previous Page
          </Button>
          <Button
            isDisabled={total < limit}
            onClick={() =>
              setSearchParams((draft) => {
                draft.set("offset", `${offset + limit}`);
                return draft;
              })
            }
          >
            Next Page
          </Button>
        </Flex>
        <Flex>
          <Button
            onClick={() => {
              setSearchParams((draft) => {
                draft.delete("buffer");
                return draft;
              });
              deleteBuffer();
            }}
          >
            None
          </Button>
          <Button
            onClick={() => {
              setSearchParams((draft) => {
                draft.set("buffer", `${100}`);
                return draft;
              });

              const geometryType = searchParams.get("geometry");
              const latsRaw = searchParams.get("lats");
              const lonsRaw = searchParams.get("lons");
              if (geometryType === null || lonsRaw === null || latsRaw === null)
                return;
              const lons = lonsRaw.split(",").map((lon) => parseFloat(lon));
              const lats = latsRaw.split(",").map((lat) => parseFloat(lat));
              if (geometryType === "Point") {
                const coords = [lons[0], lats[0]];
                const pt = point(coords) as Feature<Point, null>;
                replaceBuffer([pt, 100]);
              } else if (geometryType === "LineString") {
                const coords: Array<Position> = [];
                const coordsCount = lons.length;
                for (let i = 0; i < coordsCount; i++) {
                  const position = [lons[i], lats[i]];
                  coords.push(position);
                }
                const ls = lineString(coords) as Feature<LineString, null>;
                replaceBuffer([ls, 100]);
              }
            }}
          >
            100ft
          </Button>
          <Button
            onClick={() => {
              setSearchParams((draft) => {
                draft.set("buffer", `${600}`);
                return draft;
              });

              const geometryType = searchParams.get("geometry");
              const latsRaw = searchParams.get("lats");
              const lonsRaw = searchParams.get("lons");
              if (geometryType === null || lonsRaw === null || latsRaw === null)
                return;
              const lons = lonsRaw.split(",").map((lon) => parseFloat(lon));
              const lats = latsRaw.split(",").map((lat) => parseFloat(lat));
              if (geometryType === "Point") {
                const coords = [lons[0], lats[0]];
                const pt = point(coords) as Feature<Point, null>;
                replaceBuffer([pt, 600]);
              } else if (geometryType === "LineString") {
                const coords: Array<Position> = [];
                const coordsCount = lons.length;
                for (let i = 0; i < coordsCount; i++) {
                  const position = [lons[i], lats[i]];
                  coords.push(position);
                }
                const ls = lineString(coords) as Feature<LineString, null>;
                replaceBuffer([ls, 600]);
              }
            }}
          >
            600ft
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
