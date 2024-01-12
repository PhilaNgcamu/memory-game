import types from "./types";

export const setCards = (cards) => ({
  type: types.SET_CARDS,
  payload: cards,
});

export const setNumberOfCards = (numOfCards) => ({
  type: types.SET_NUMBER_OF_CARDS,
  payload: numOfCards,
});

export const toggleGridsDropdown = () => ({
  type: types.TOGGLE_GRIDS_DROPDOWN,
});

export const disableCards = () => ({
  type: types.DISABLED_CARDS,
});

export const firstClickedCard = (choice) => ({
  type: types.FIRST_CLICKED_CARD,
  payload: choice,
});

export const secondClickedCard = (choice) => ({
  type: types.SECOND_CLICKED_CARD,
  payload: choice,
});

export const reshuffleCards = (isShuffling) => ({
  type: types.SHUFFLE_CARDS,
  payload: isShuffling,
});

export const showCongratulationsModal = () => ({
  type: types.SHOW_CONGRATULATIONS_MODAL,
});

export const hideCongratulationsModal = () => ({
  type: types.HIDE_CONGRATULATIONS_MODAL,
});

export const incrementNumberOfCardTurns = () => ({
  type: types.NUMBER_OF_CARD_TURNS,
});

export const resetNumberOfCardTurns = () => ({
  type: types.RESET_NUMBER_OF_CARD_TURNS,
});
