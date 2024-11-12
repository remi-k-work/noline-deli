// testing library
import { render, screen } from "@testing-library/react";

// components
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  it("renders a heading", () => {
    render(<NotFound />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).not.toBeInTheDocument();
  });
});
