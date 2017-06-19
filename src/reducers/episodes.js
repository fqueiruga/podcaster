import keyBy from "lodash.keyby";

import actionTypes from "../actions/types";

const initialState = {
  episodes: {},
  episodeIds: []
};

export default function podcasts(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_EPISODES_SUCCESS:
      return {
        episodes: keyBy(action.episodes, 'id'),
        episodeIds: action.episodes.map(e => e.id)
      }
    case actionTypes.FETCH_EPISODES_START:
      return initialState;
  }

  return state;
}
