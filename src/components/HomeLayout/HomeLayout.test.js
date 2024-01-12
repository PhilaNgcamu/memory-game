import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../state/store";
import HomeLayout from "./HomeLayout";

describe("HomeLayout Component", () => {
  let homeLayoutComponent, gridOptions;

  beforeEach(() => {
    homeLayoutComponent = (
      <Provider store={store}>
        <HomeLayout />
      </Provider>
    );
    gridOptions = [
      { testId: "2x2 Grid", textContent: "4 Cards" },
      { testId: "3x2 Grid", textContent: "6 Cards" },
      { testId: "4x3 Grid", textContent: "12 Cards" },
    ];
  });

  it("should show the title and its subtext", () => {
    render(homeLayoutComponent);

    const memoryGameTitle = screen.getByText("Memory Game");
    const subtext = screen.getByText(
      "Select a grid size below to start playing the Memory Game"
    );

    expect(memoryGameTitle).toBeVisible();
    expect(subtext).toBeVisible();
  });

  it("should show three grid size options to choose from", () => {
    render(homeLayoutComponent);

    gridOptions.forEach(({ testId }) => {
      const gridOption = screen.getByTestId(testId);
      expect(gridOption).toBeVisible();
    });
  });

  it("should show the number of cards in each grid size option", () => {
    render(homeLayoutComponent);

    gridOptions.forEach(({ testId, textContent }) => {
      const gridOption = screen.getByTestId(testId);
      expect(gridOption).toHaveTextContent(textContent);
    });
  });
});
