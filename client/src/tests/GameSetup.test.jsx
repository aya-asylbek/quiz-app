import { render, screen } from "@testing-library/react";
import GameSetup from "../components/GameSetup";

test("renders GameSetup component", () => {
  render(<GameSetup />);
  expect(screen.getByText(/Trivia Game/i)).toBeInTheDocument();
});
