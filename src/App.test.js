import { fireEvent, render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./state/store";
import { images } from "./utils/images";
import shuffleImages from "./utils/shuffleImages";
import {
  resetNumberOfCardTurns,
  reshuffleCards,
  setCards,
} from "./state/actions";
import { resetTimer, startTimer, stopTimer } from "./state/TimerThunk/timer";

let appComponent, grid, shuffledImages, imagesArr, timer;

describe("App Component", () => {
  beforeEach(() => {
    appComponent = (
      <Provider store={store}>
        <App />
      </Provider>
    );
    shuffledImages = shuffleImages(12);
    imagesArr = [...images];
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should change to a selected grid layout if its button is clicked from the home screen", () => {
    render(appComponent);

    const fourByThreeGrid = screen.getByText("4x3 Grid");
    fireEvent.click(fourByThreeGrid);

    grid = screen.getByTestId("gridID");
    expect(grid).toHaveClass("card-grid grid-4x3");
  });

  it("should start the timer if a card is clicked", () => {
    render(appComponent);

    act(() => {
      store.dispatch(setCards(imagesArr));
      store.dispatch(reshuffleCards(false));
    });

    const card = screen.getAllByTestId("cardID")[0];

    fireEvent.click(card);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    timer = screen.getByTestId("timerID");
    expect(timer).toHaveTextContent("00:05");
  });

  it("should flip two similar cards when they are clicked", () => {
    render(appComponent);

    act(() => {
      store.dispatch(setCards(imagesArr));
      store.dispatch(reshuffleCards(false));
    });

    const [ronaldoCardOne, ronaldoCardTwo] = screen
      .getAllByTestId("cardID")
      .slice(0, 2);

    expect(ronaldoCardOne).not.toHaveClass("card flipped");
    fireEvent.click(ronaldoCardOne);
    expect(ronaldoCardOne).toHaveClass("card flipped");

    expect(ronaldoCardTwo).not.toHaveClass("card flipped");
    fireEvent.click(ronaldoCardTwo);
    expect(ronaldoCardTwo).toHaveClass("card flipped");
  });

  it("should match two similar cards", () => {
    render(appComponent);

    const matchedCards = store.getState().cards.slice(0, 2);
    expect(
      matchedCards.every((ronaldoCard) => ronaldoCard.matched)
    ).toBeTruthy();
  });

  it("should not match two different cards if they are clicked", () => {
    render(appComponent);

    act(() => {
      store.dispatch(setCards(imagesArr));
      store.dispatch(reshuffleCards(false));
    });

    const [ronaldoCard, , messiCard] = screen.getAllByTestId("cardID");

    fireEvent.click(ronaldoCard);
    fireEvent.click(messiCard);

    expect(store.getState().choiceOne.matched).toBeFalsy();
    expect(store.getState().choiceTwo.matched).toBeFalsy();
  });

  it("should check if the number of card turns increment if each card is clicked", async () => {
    render(appComponent);

    act(() => {
      store.dispatch(setCards(shuffledImages));
      store.dispatch(reshuffleCards(false));
      store.dispatch(resetNumberOfCardTurns());
    });

    const [cardOne, cardTwo] = screen.getAllByTestId("cardID");

    const cardTurns = screen.getByTestId("cardTurnsID");

    fireEvent.click(cardOne);
    expect(cardTurns).toHaveTextContent("Turns: 1");

    fireEvent.click(cardTwo);
    expect(cardTurns).toHaveTextContent("Turns: 2");

    expect(store.getState().numOfCardTurns).toBe(2);
  });

  it("should restart the game if the 'New Game' button is clicked to reshuffle cards", () => {
    render(appComponent);

    act(() => {
      store.dispatch(setCards(shuffledImages));
      store.dispatch(reshuffleCards(false));
      store.dispatch(resetNumberOfCardTurns());
    });

    const card = screen.getAllByTestId("cardID")[0];
    fireEvent.click(card);

    const newGameButton = screen.getByText("New Game");
    fireEvent.click(newGameButton);

    expect(store.getState().shuffle).toBeTruthy();
  });

  it("should complete the game by showing the winning message with the number of card turns and the time taken", () => {
    render(appComponent);

    act(() => {
      store.dispatch(setCards(imagesArr));
      store.dispatch(reshuffleCards(false));
      store.dispatch(resetTimer());
      store.dispatch(stopTimer());
    });

    const allCards = screen.getAllByTestId("cardID");
    allCards.forEach((card) => {
      fireEvent.click(card);
    });

    act(() => {
      store.dispatch(startTimer());
      jest.advanceTimersByTime(32000);
    });

    const winningMessage = screen.getByText(
      "You have completed the Memory Game in 32 seconds with 12 turns"
    );

    expect(winningMessage).toBeVisible();
  });
});
