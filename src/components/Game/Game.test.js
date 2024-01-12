import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import Game from "./Game";

let gameComponent;

describe("Game Component", () => {
  beforeEach(() => {
    gameComponent = (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  });

  it("should show the title, the home button and the 'New Game' button", () => {
    render(gameComponent);

    const memoryGameTitle = screen.getByRole("heading", {
      name: "Memory Game",
    });
    const homeButton = screen.getByTestId("homeButtonID");
    const newGameButton = screen.getByRole("button", { name: "New Game" });

    expect(memoryGameTitle).toBeVisible();
    expect(homeButton).toBeVisible();
    expect(newGameButton).toBeVisible();
  });
});
