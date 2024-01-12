import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  firstClickedCard,
  secondClickedCard,
  reshuffleCards,
  setCards,
} from "../../state/actions";
import shuffleImages from "../../utils/shuffleImages";

export default function useShuffleCards() {
  const dispatch = useDispatch();
  const numOfCards = useSelector((state) => state.numOfCards);

  return useCallback(() => {
    dispatch(reshuffleCards(true));
    dispatch(firstClickedCard(null));
    dispatch(secondClickedCard(null));
    setTimeout(() => {
      dispatch(reshuffleCards(false));
    }, 200);
    setTimeout(() => {
      dispatch(setCards(shuffleImages(numOfCards)));
    }, 100);
  }, [dispatch, numOfCards]);
}
