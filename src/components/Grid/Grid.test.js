import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Grid from "./Grid";
import shuffleImages from "../../utils/shuffleImages";
import store from "../../state/store";

let gridComponent;

describe("Grid Component", () => {
  beforeEach(() => {
    gridComponent = (
      <Provider store={store}>
        <Grid
          key={1}
          cards={shuffleImages(12)}
          disabled={false}
          choiceOne={null}
          choiceTwo={null}
        />
      </Provider>
    );
  });

  it("should render 12 cards", () => {
    render(gridComponent);

    const cards = screen.getAllByTestId("cardID");

    expect(cards.length).toBe(12);
    cards.forEach((card) => {
      expect(card).toBeVisible();
    });
  });
});
