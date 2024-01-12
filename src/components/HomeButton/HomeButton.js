import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./HomeButton.css";

import useShuffleCards from "../custom-hook/useShuffleCards";
import { resetTimer, stopTimer } from "../../state/TimerThunk/timer";
import {
  resetNumberOfCardTurns,
  setCards,
  setNumberOfCards,
  toggleGridsDropdown,
} from "../../state/actions";

const MainButton = () => {
  const dispatch = useDispatch();

  const handleHomeButtonClick = () => {
    dispatch(setNumberOfCards(0));
    dispatch(toggleGridsDropdown(false));
    dispatch(setCards([""]));
  };

  return (
    <div
      data-testid="homeButtonID"
      onClick={handleHomeButtonClick}
      style={{ cursor: "pointer" }}
    >
      <FontAwesomeIcon style={{ color: "white" }} icon={faHome} />
    </div>
  );
};

const GridDropdown = ({ handleSetNumberOfCards }) => {
  return (
    <div data-testid="gridDropdownID" className="grid-dropdown">
      <div className="grid-link" onClick={() => handleSetNumberOfCards(4)}>
        2x2 Grid
      </div>
      <div className="grid-link" onClick={() => handleSetNumberOfCards(6)}>
        3x2 Grid
      </div>
      <div className="grid-link" onClick={() => handleSetNumberOfCards(12)}>
        4x3 Grid
      </div>
    </div>
  );
};

const HomeButton = () => {
  const dispatch = useDispatch();
  const enableGridsDropdown = useSelector((state) => state.gridsDropdown);

  const shuffleCards = useShuffleCards();

  const handleSetNumberOfCards = (numOfCards) => {
    dispatch(resetTimer());
    dispatch(stopTimer());
    dispatch(resetNumberOfCardTurns());
    dispatch(setNumberOfCards(numOfCards));
    shuffleCards();
  };

  const toggleGrids = () => {
    dispatch(toggleGridsDropdown(!enableGridsDropdown));
  };

  return (
    <div className="home-button-container">
      <div
        className="home-button"
        onMouseEnter={toggleGrids}
        onMouseLeave={toggleGrids}
      >
        <MainButton />
        {enableGridsDropdown && (
          <GridDropdown handleSetNumberOfCards={handleSetNumberOfCards} />
        )}
      </div>
    </div>
  );
};

export default HomeButton;
