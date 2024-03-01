import { createRemixStub } from "@remix-run/testing";
import { render, screen, waitFor } from "@testing-library/react";
import Document from "./root";

describe("Document", () => {
  const RemixStub = createRemixStub([
    {
      path: "/",
      Component: Document,
    },
  ]);

  it("should render", async () => {
    const { container } = render(<RemixStub />);
    await waitFor(() => screen.getByText(/Hello world/));
    container.querySelector("#deckgl-wrapper");
  });
});
