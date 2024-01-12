import { useDispatch, useSelector } from "react-redux";
import { setNumberOfCards } from "../../state/actions";

const GridOptions = () => {
  const dispatch = useDispatch();
  const numOfCards = useSelector((state) => state.numOfCards);

  const handleSetNumberOfCards = (numOfCards) => {
    dispatch(setNumberOfCards(numOfCards));
  };

  return (
    <div className="grid-options">
      {numOfCards !== 4 && (
        <button className="grid-link" onClick={() => handleSetNumberOfCards(4)}>
          2x2 Grid
        </button>
      )}
      {numOfCards !== 6 && (
        <button className="grid-link" onClick={() => handleSetNumberOfCards(6)}>
          3x2 Grid
        </button>
      )}
      {numOfCards !== 12 && (
        <button
          className="grid-link"
          onClick={() => handleSetNumberOfCards(12)}
        >
          4x3 Grid
        </button>
      )}
    </div>
  );
};

export default GridOptions;
