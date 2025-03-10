import { render, screen } from "@testing-library/react";
import GamePlay from "../components/GamePlay";

test("renders GamePlay component", () => {
  render(<GamePlay />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
