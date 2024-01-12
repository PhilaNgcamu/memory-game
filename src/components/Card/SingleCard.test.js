import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Card from "./SingleCard";
import store from "../../state/store";
import { images } from "../../utils/images";

let cardComponent;

describe("Card Component", () => {
  beforeEach(() => {
    cardComponent = (
      <Provider store={store}>
        <Card
          card={images[0]}
          handleChoice={jest.fn}
          flipped={false}
          disabled={false}
        />
      </Provider>
    );
  });

  it("should check if the card and its image is rendered", () => {
    render(cardComponent);

    const card = screen.getByTestId("cardID");
    const image = screen.getByAltText("ronaldo");

    expect(image).toBeVisible();
    expect(card).toBeVisible();
  });
});
