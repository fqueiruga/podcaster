import keyBy from "lodash.keyby";

import actionTypes from "../actions/types";

const initialState = {
  podcasts: {},
  podcastIds: []
};

export default function podcasts(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_PODCASTS_SUCCESS:
      return {
        podcasts: keyBy(action.podcasts, "id"),
        podcastIds: action.podcasts.map(p => p.id)
      };
  }

  return state;
}
