import actionTypes from "../actions/types";

const initialState = {
  isFetching: false
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PODCASTS_START:
    case actionTypes.FETCH_EPISODES_START:
      return {
        ...state,
        isFetching: true,
      }

    case actionTypes.FETCH_PODCASTS_SUCCESS:
    case actionTypes.FETCH_PODCASTS_ERROR:
    case actionTypes.FETCH_EPISODES_SUCCESS:
    case actionTypes.FETCH_EPISODES_ERROR:
      return {
        ...state,
        isFetching: false
      }
  }

  return state;
}
