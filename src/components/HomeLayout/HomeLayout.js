import { useDispatch } from "react-redux";
import "./HomeLayout.css";
import { setNumberOfCards } from "../../state/actions";
import HomeGridOptions from "./HomeGridOptions";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const handleSetNumberOfCards = (numOfCards) => {
    dispatch(setNumberOfCards(numOfCards));
  };

  return (
    <div className="home-container">
      <h1>Memory Game</h1>
      <p>Select a grid size below to start playing the Memory Game</p>
      <div data-testid="gridSizeOptionsID" className="grid-size-options">
        <HomeGridOptions
          data-testid="2x2 Grid"
          numOfColumns={2}
          numOfRows={2}
          onClick={() => handleSetNumberOfCards(4)}
        />
        <HomeGridOptions
          data-testid="3x2 Grid"
          numOfColumns={3}
          numOfRows={2}
          onClick={() => handleSetNumberOfCards(6)}
        />
        <HomeGridOptions
          data-testid="4x3 Grid"
          numOfColumns={4}
          numOfRows={3}
          onClick={() => handleSetNumberOfCards(12)}
        />
      </div>
    </div>
  );
};

export default HomeLayout;
