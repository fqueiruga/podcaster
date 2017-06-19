import uiReducer from "./ui";
import actionTypes from "../actions/types";

describe("uiReducer", () => {
  it("should have an initial state", () => {
    const state = uiReducer(undefined, { type: "NOOP" });
    expect(state.isFetching).toBeFalsy();
  });

  describe("isFetching", () => {
    it("should be true when starting to fetch podcasts", () => {
      const prevState = { isFetching: false };
      const action = { type: actionTypes.FETCH_PODCASTS_START };
      const state = uiReducer(prevState, action);
      expect(state.isFetching).toBeTruthy();
    });

    it("should be false when failing to fetch podcasts", () => {
      const prevState = { isFetching: true };
      const action = { type: actionTypes.FETCH_PODCASTS_ERROR };
      const state = uiReducer(prevState, action);
      expect(state.isFetching).toBeFalsy();
    });

    it("should be false when succeeding to fetch podcasts", () => {
      const prevState = { isFetching: true };
      const action = { type: actionTypes.FETCH_PODCASTS_SUCCESS };
      const state = uiReducer(prevState, action);
      expect(state.isFetching).toBeFalsy();
    });

    it("should be true when starting to fetch episodes", () => {
      const prevState = { isFetching: false };
      const action = { type: actionTypes.FETCH_EPISODES_START };
      const state = uiReducer(prevState, action);
      expect(state.isFetching).toBeTruthy();
    });

    it("should be false when failing to fetch episodes", () => {
      const prevState = { isFetching: true };
      const action = { type: actionTypes.FETCH_EPISODES_ERROR };
      const state = uiReducer(prevState, action);
      expect(state.isFetching).toBeFalsy();
    });

    it("should be false when succeeding to fetch episodes", () => {
      const prevState = { isFetching: true };
      const action = { type: actionTypes.FETCH_EPISODES_SUCCESS };
      const state = uiReducer(prevState, action);
      expect(state.isFetching).toBeFalsy();
    });
  });
});
