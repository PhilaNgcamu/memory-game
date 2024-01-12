import { useDispatch, useSelector } from "react-redux";
import { firstClickedCard, secondClickedCard } from "../../state/actions";
import calculateGridSize from "../../utils/calculateGridSize";
import Card from "../Card/SingleCard";
import "./Grid.css";

const Grid = ({ cards, disabled, choiceOne, choiceTwo, isShuffling }) => {
  const numOfCards = useSelector((state) => state.numOfCards);
  const dispatch = useDispatch();
  const { rows, columns } = calculateGridSize(numOfCards);

  const handleChoice = (card) => {
    if (card.matched || card.flipped || disabled) {
      return;
    }
    if (!choiceOne) {
      dispatch(firstClickedCard(card));
    } else if (!choiceTwo && choiceOne !== card) {
      dispatch(secondClickedCard(card));
    }
  };

  return (
    <div
      data-testid="gridID"
      className={`card-grid grid-${rows}x${columns} ${
        isShuffling ? "shuffling" : ""
      }`}
    >
      {cards.map((card, idx) => (
        <Card
          key={idx}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Grid;
