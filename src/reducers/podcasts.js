import keyBy from "lodash.keyby";

import actionTypes from "../actions/types";

const initialState = {
  isFetching: false,
  podcasts: {},
  podcastIds: []
};

export default function podcasts(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PODCASTS_START:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.FETCH_PODCASTS_SUCCESS:
      return {
        isFetching: false,
        podcasts: keyBy(action.podcasts, "id"),
        podcastIds: action.podcasts.map(p => p.id)
      };

    case actionTypes.FETCH_PODCASTS_ERROR:
      return {
        ...state,
        isFetching: false
      };
  }

  return state;
}
