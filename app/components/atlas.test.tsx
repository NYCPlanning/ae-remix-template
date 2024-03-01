import { render } from "@testing-library/react";
import { Atlas } from "./atlas";

describe("Atlas", () => {
  it("should render", () => {
    const { container } = render(<Atlas />);
    expect(container.querySelector("#deckgl-wrapper")).toBeInTheDocument();
  });
});
