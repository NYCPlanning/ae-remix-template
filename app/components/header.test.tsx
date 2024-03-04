import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("should render", () => {
    render(<Header />);
    expect(screen.getByText(/Hello world/)).toBeInTheDocument();
  });
});
