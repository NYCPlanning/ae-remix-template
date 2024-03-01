import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import Index from "./route";

describe("Index", () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: Index,
    },
  ]);

  it("should render", async () => {
    const { container } = render(<RemixStub />);
    await waitFor(() => screen.getByText(/Hello world/));
    container.querySelector("#deckgl-wrapper");
  });
});
