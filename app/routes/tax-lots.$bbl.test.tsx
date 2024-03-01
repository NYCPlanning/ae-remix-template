import { createRemixStub } from "@remix-run/testing";
import TaxLotBbl, { loader } from "./tax-lots.$bbl";
import { render, screen, waitFor } from "@testing-library/react";

describe("TaxLotBbl", () => {
  const RemixStub = createRemixStub([
    {
      path: "/tax-lots/:bbl",
      Component: TaxLotBbl,
      loader,
    },
  ]);

  it("should return a tax lot", async () => {
    render(<RemixStub initialEntries={["/tax-lots/1008250052"]} />);
    await waitFor(() => screen.getByText(/Tax Lot/));
    screen.debug();
  });
});
