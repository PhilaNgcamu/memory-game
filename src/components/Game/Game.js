import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import "./Game.css";
import {
  setCards,
  disableCards,
  firstClickedCard,
  secondClickedCard,
  showCongratulationsModal,
  incrementNumberOfCardTurns,
  resetNumberOfCardTurns,
} from "../../state/actions";
import {
  resetTimer,
  startTimer,
  stopTimer,
} from "../../state/TimerThunk/timer";
import Grid from "../Grid/Grid";
import WinningMessageModal from "../WinningMessageModal/WinningMessageModal";
import formatTime from "../../utils/formatTime";
import HomeButton from "../HomeButton/HomeButton";
import useShuffleCards from "../custom-hook/useShuffleCards";

const Game = () => {
  const cards = useSelector((state) => state.cards);
  const disabled = useSelector((state) => state.disabled);
  const choiceOne = useSelector((state) => state.choiceOne);
  const choiceTwo = useSelector((state) => state.choiceTwo);
  const isShuffling = useSelector((state) => state.shuffle);
  const isCongratulationsModalVisible = useSelector(
    (state) => state.congratulations
  );
  const timer = useSelector((state) => state.timer);
  const currentTimeInSeconds = useSelector(
    (state) => state.timer.currentTimeInSeconds
  );
  const numOfCardTurns = useSelector((state) => state.numOfCardTurns);

  const shuffleCards = useShuffleCards();
  const dispatch = useDispatch();

  useEffect(() => {
    shuffleCards();
    dispatch(resetTimer());
  }, [shuffleCards, dispatch]);

  const resetTurn = useCallback(() => {
    dispatch(firstClickedCard(null));
    dispatch(secondClickedCard(null));
    dispatch(disableCards());
  }, [dispatch]);

  useEffect(() => {
    if (choiceOne || choiceTwo) {
      dispatch(incrementNumberOfCardTurns());
    }
  }, [choiceOne, choiceTwo, dispatch]);

  useEffect(() => {
    if (choiceOne && !timer.isTimerRunning) {
      dispatch(startTimer());
    }
  }, [choiceOne, timer.isTimerRunning, dispatch]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      dispatch(disableCards());

      if (choiceOne.src === choiceTwo.src) {
        dispatch(
          setCards(
            cards.map((card) => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            })
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo, cards, dispatch, resetTurn]);

  useEffect(() => {
    const isGameFinished = cards.every((card) => card.matched);
    if (isGameFinished && !isShuffling) {
      dispatch(stopTimer());
      setTimeout(() => {
        dispatch(showCongratulationsModal());
      }, 500);
    }
  }, [cards, isShuffling, dispatch]);

  const handleNewGameClick = () => {
    dispatch(stopTimer());
    dispatch(resetTimer());
    dispatch(resetNumberOfCardTurns());
    shuffleCards();
  };

  return (
    <div className="Game" data-testid="gameID">
      <div className="Game" data-testid="gameID">
        <div data-testid="timerID" className="timer">
          <i className="fa fa-clock-o" /> {formatTime(currentTimeInSeconds)}
        </div>
        <HomeButton />
        <div data-testid="cardTurnsID" className="cardTurns">
          Turns: {numOfCardTurns}
        </div>
        <h1>Memory Game</h1>
        <button
          data-testid="newGameID"
          onClick={handleNewGameClick}
          disabled={isShuffling}
        >
          New Game
        </button>
        <Grid
          cards={cards}
          disabled={disabled || isShuffling}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          isShuffling={isShuffling}
        />
        {isCongratulationsModalVisible && <WinningMessageModal />}
      </div>
    </div>
  );
};

export default Game;
