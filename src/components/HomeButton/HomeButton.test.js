import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import HomeButton from "./HomeButton";
import store from "../../state/store";

let homeButtonComponent;

describe("HomeButton Component", () => {
  beforeEach(() => {
    homeButtonComponent = (
      <Provider store={store}>
        <HomeButton />
      </Provider>
    );
  });

  it("should toggle the grid dropdown when hovering over the home button", () => {
    render(homeButtonComponent);

    const homeButton = screen.getByTestId("homeButtonID");

    fireEvent.mouseEnter(homeButton);

    const gridDropdown = screen.getByTestId("gridDropdownID");
    expect(gridDropdown).toBeVisible();

    fireEvent.mouseLeave(homeButton);

    expect(gridDropdown).not.toBeVisible();
  });

  it("should display the correct grid size options in the dropdown", () => {
    render(homeButtonComponent);

    const homeButton = screen.getByTestId("homeButtonID");

    fireEvent.mouseEnter(homeButton);

    const twoByTwoGrid = screen.getByText("2x2 Grid");
    const threeByTwoGrid = screen.getByText("3x2 Grid");
    const fourByThreeGrid = screen.getByText("4x3 Grid");

    expect(twoByTwoGrid).toBeVisible();
    expect(threeByTwoGrid).toBeVisible();
    expect(fourByThreeGrid).toBeVisible();

    fireEvent.mouseLeave(homeButton);

    expect(twoByTwoGrid).not.toBeVisible();
    expect(threeByTwoGrid).not.toBeVisible();
    expect(fourByThreeGrid).not.toBeVisible();
  });

  it("should update to a selected grid layout if the button is clicked with the updated the number of cards", () => {
    render(homeButtonComponent);

    const homeButton = screen.getByTestId("homeButtonID");

    fireEvent.mouseEnter(homeButton);

    const gridLink = screen.getByText("2x2 Grid");

    fireEvent.click(gridLink);

    expect(store.getState().numOfCards).toBe(4);
  });
});
