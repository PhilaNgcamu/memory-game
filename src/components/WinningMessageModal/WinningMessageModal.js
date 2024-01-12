import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../WinningMessageModal/WinningMessageModal.css";
import useShuffleCards from "../custom-hook/useShuffleCards";
import {
  hideCongratulationsModal,
  resetNumberOfCardTurns,
} from "../../state/actions";
import { resetTimer, stopTimer } from "../../state/TimerThunk/timer";
import { timeTaken } from "../../utils/formatTime";
import GridOptions from "./GridOptions";

const WinningMessageModal = () => {
  const isShuffling = useSelector((state) => state.shuffle);
  const timer = useSelector((state) => state.timer);
  const numOfCardTurns = useSelector((state) => state.numOfCardTurns);
  const dispatch = useDispatch();

  const handleCloseModal = useCallback(() => {
    dispatch(hideCongratulationsModal());
    dispatch(stopTimer());
    dispatch(resetTimer());
    dispatch(resetNumberOfCardTurns());
  }, [dispatch]);

  const shuffleCards = useShuffleCards();

  const handlePlayAgainButton = useCallback(() => {
    shuffleCards();
    handleCloseModal();
  }, [handleCloseModal, shuffleCards]);

  useEffect(() => {
    if (isShuffling) {
      handlePlayAgainButton();
    }
  }, [isShuffling, handlePlayAgainButton]);

  const minutes = Math.floor(timer.currentTimeInSeconds / 60);
  const seconds = timer.currentTimeInSeconds % 60;

  const formattedTime = timeTaken(
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0")
  );

  return (
    <div className="modal" data-testid="modalID">
      <div className="modalContent">
        <h2>Congratulations</h2>
        <p>
          You have completed the Memory Game in {formattedTime} with{" "}
          {numOfCardTurns} turns
        </p>
        <p>Select a new game below or play again</p>
        <GridOptions showCurrentGrid={false} />
        <button className="play-again-button" onClick={handlePlayAgainButton}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinningMessageModal;
