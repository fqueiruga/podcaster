import keyBy from "lodash.keyby";

import actionTypes from "../actions/types";

const initialState = {
  isFetching: false,
  episodes: {},
  episodeIds: []
};

export default function podcasts(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_EPISODES_START:
      return {
        ...initialState,
        isFetching: true
      };

    case actionTypes.FETCH_EPISODES_SUCCESS:
      return {
        isFetching: false,
        episodes: keyBy(action.episodes, "id"),
        episodeIds: action.episodes.map(e => e.id)
      };

    case actionTypes.FETCH_EPISODES_ERROR:
      return {
        ...state,
        isFetching: false
      };
  }

  return state;
}
