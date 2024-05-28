import { GeoJsonLayer } from "@deck.gl/layers";
import { useNavigate } from "@remix-run/react";
import { Feature } from "geojson";
import { AtlasState } from "../stores/atlas.context";

export function useDrawLayer(atlasState: AtlasState) {
  const navigate = useNavigate();
  const { shapeFeatureCollection } = atlasState;

  return new GeoJsonLayer({
    data: shapeFeatureCollection,
    pickable: true,
    getPointColor: () => [100, 80, 255],
    getPointRadius: () => 10,
    getLineWidth: () => 2,
    getFillColor: ({ properties }: any) => {
      return properties?.dragging ? [120, 180, 180, 30] : [120, 180, 180, 90];
    },
    onClick: (data) => {
      const feature = data.object as Feature;
      let lons: string | null = null;
      let lats: string | null = null;
      if (feature.geometry.type === "Point") {
        const [lon, lat] = feature.geometry.coordinates;
        lats = `${lat}`;
        lons = `${lon}`;
      } else if (feature.geometry.type === "LineString") {
        lons = feature.geometry.coordinates
          .map((position) => position[0])
          .join();
        lats = feature.geometry.coordinates
          .map((position) => position[1])
          .join();
      } else if (feature.geometry.type === "Polygon") {
        lons = feature.geometry.coordinates[0]
          .map((position) => position[0])
          .join();
        lats = feature.geometry.coordinates[0]
          .map((position) => position[1])
          .join();
      }
      if (lons !== null && lats !== null) {
        const path = `tax-lots?geometry=${feature.geometry.type}&lats=${lats}&lons=${lons}`;
        navigate(path);
        return true;
      }
    },
  });
}
