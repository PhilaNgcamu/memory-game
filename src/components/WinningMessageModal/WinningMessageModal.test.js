import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import WinningMessageModal from "./WinningMessageModal";

let winningMessageModalComponent;

describe("WinningMessageModal Component", () => {
  beforeEach(() => {
    winningMessageModalComponent = (
      <Provider store={store}>
        <WinningMessageModal />
      </Provider>
    );
  });

  it("should show the winning title with it's subtext and the 'Play Again' button", () => {
    render(winningMessageModalComponent);

    const winningTitle = screen.getByText("Congratulations");
    const subtext = screen.getByText("Select a new game below or play again");
    const playAgainButton = screen.getByText("Play Again");

    expect(winningTitle).toBeVisible();
    expect(subtext).toBeVisible();
    expect(playAgainButton).toBeVisible();
  });

  it("should show the three grid options to choose from", () => {
    render(winningMessageModalComponent);

    const twoByTwoLink = screen.getByText("2x2 Grid");
    const threeByTwoLink = screen.getByText("3x2 Grid");
    const fourByThreeLink = screen.getByText("4x3 Grid");

    expect(twoByTwoLink).toBeVisible();
    expect(threeByTwoLink).toBeVisible();
    expect(fourByThreeLink).toBeVisible();
  });
});
