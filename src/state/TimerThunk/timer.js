import types from "../types";

export const startTimer = () => (dispatch, getState) => {
  dispatch({ type: types.START_TIMER });
  const timerInterval = setInterval(() => {
    const { isTimerRunning, currentTimeInSeconds } = getState().timer;
    if (isTimerRunning) {
      dispatch(updateTimer(currentTimeInSeconds + 1));
    }
  }, 1000);

  dispatch({ type: types.SET_TIMER_INTERVAL, payload: timerInterval });
};

export const stopTimer = () => (dispatch, getState) => {
  dispatch({ type: types.STOP_TIMER });
  const { timerInterval } = getState().timer;
  clearInterval(timerInterval);
};

export const resetTimer = () => ({ type: types.RESET_TIMER });

export const updateTimer = (newTimeInSeconds) => ({
  type: types.UPDATE_TIMER,
  payload: newTimeInSeconds,
});
