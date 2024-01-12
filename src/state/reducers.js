import { combineReducers } from "redux";
import types from "./types";

const initialState = {
  cards: [],
  numOfCards: 0,
  gridsDropdown: false,
  disabled: false,
  choiceOne: null,
  choiceTwo: null,
  shuffle: true,
  isCongratulationsModalVisible: false,
  timer: {
    startTime: null,
    currentTimeInSeconds: 0,
    isTimerRunning: false,
    timerInterval: 0,
  },
  numOfCardTurns: 0,
};

const cardsReducer = (state = initialState.cards, action) => {
  switch (action.type) {
    case types.SET_CARDS:
      return action.payload;

    default:
      return state;
  }
};

const numOfCardsReducer = (state = initialState.numOfCards, action) => {
  switch (action.type) {
    case types.SET_NUMBER_OF_CARDS:
      return action.payload;

    default:
      return state;
  }
};

const showGridsDropdownReducer = (
  state = initialState.gridsDropdown,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_GRIDS_DROPDOWN:
      return !state;

    default:
      return state;
  }
};

const disabledReducer = (state = initialState.disabled, action) => {
  switch (action.type) {
    case types.DISABLED_CARDS:
      return !state;

    default:
      return state;
  }
};

const choiceOneReducer = (state = initialState.choiceOne, action) => {
  switch (action.type) {
    case types.FIRST_CLICKED_CARD:
      return action.payload;

    default:
      return state;
  }
};

const choiceTwoReducer = (state = initialState.choiceTwo, action) => {
  switch (action.type) {
    case types.SECOND_CLICKED_CARD:
      return action.payload;

    default:
      return state;
  }
};

const shuffleReducer = (state = initialState.shuffle, action) => {
  switch (action.type) {
    case types.SHUFFLE_CARDS:
      return action.payload;

    default:
      return state;
  }
};

const congratulationsReducer = (
  state = initialState.isCongratulationsModalVisible,
  action
) => {
  return action.type === types.SHOW_CONGRATULATIONS_MODAL
    ? true
    : action.type === types.HIDE_CONGRATULATIONS_MODAL
    ? false
    : state;
};

const timerReducer = (state = initialState.timer, action) => {
  switch (action.type) {
    case types.START_TIMER:
      return { ...state, startTime: Date.now(), isTimerRunning: true };

    case types.STOP_TIMER:
      return { ...state, isTimerRunning: false };

    case types.RESET_TIMER:
      return {
        ...state,
        startTime: 0,
        currentTimeInSeconds: 0,
        isTimerRunning: false,
      };

    case types.UPDATE_TIMER:
      return { ...state, currentTimeInSeconds: action.payload };

    case types.SET_TIMER_INTERVAL:
      return { ...state, timerInterval: action.payload };

    default:
      return state;
  }
};

const cardTurnsReducers = (state = initialState.numOfCardTurns, action) => {
  switch (action.type) {
    case types.NUMBER_OF_CARD_TURNS:
      return state + 1;

    case types.RESET_NUMBER_OF_CARD_TURNS:
      return 0;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cards: cardsReducer,
  numOfCards: numOfCardsReducer,
  gridsDropdown: showGridsDropdownReducer,
  disabled: disabledReducer,
  choiceOne: choiceOneReducer,
  choiceTwo: choiceTwoReducer,
  shuffle: shuffleReducer,
  congratulations: congratulationsReducer,
  timer: timerReducer,
  numOfCardTurns: cardTurnsReducers,
});

export default rootReducer;
