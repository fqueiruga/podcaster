import podcastsReducer from "./podcasts";
import actionTypes from "../actions/types";

const buildTestPodcast = id => ({
  id,
  title: `podcast-${id}`,
  author: "Me",
  description: "My description",
  imageThumb: `http://podcasts.example.com/${id}.jpg`
});

describe("podcastsReducer", () => {
  it("should have an initial state", () => {
    const action = { type: "NOOP" };
    const state = podcastsReducer(undefined, action);
    expect(state.podcastIds).toEqual([]);
    expect(state.podcasts).toEqual({});
  });

  describe("fetch start", () => {
    it("should have the fetching status", () => {
      const prevState = {
        isFetching: false,
        podcasts: {},
        podcastIds: []
      };
      const action = {
        type: actionTypes.FETCH_PODCASTS_START
      };
      const state = podcastsReducer(prevState, action);
      expect(state.isFetching).toBeTruthy();
    });
  });

  describe("fetch success", () => {
    const podcast1 = buildTestPodcast("1");
    const podcast2 = buildTestPodcast("2");
    const action = {
      type: actionTypes.FETCH_PODCASTS_SUCCESS,
      podcasts: [podcast1, podcast2]
    };

    it("should add the podcasts in a map", () => {
      const state = podcastsReducer(undefined, action);
      expect(state.podcasts["1"]).toEqual(podcast1);
      expect(state.podcasts["2"]).toEqual(podcast2);
    });

    it("should store the podcastIds in the same order as they come", () => {
      const state = podcastsReducer(undefined, action);
      expect(state.podcastIds).toEqual(["1", "2"]);
    });

    it("should not have the fetching status", () => {
      const state = podcastsReducer(undefined, action);
      expect(state.isFetching).toBeFalsy();
    });
  });

  describe("fetch error", () => {
    it("should not have the fetching status", () => {
      const prevState = {
        isFetching: true,
        podcasts: {},
        podcastIds: []
      };
      const action = {
        type: actionTypes.FETCH_PODCASTS_ERROR
      };
      const state = podcastsReducer(prevState, action);
      expect(state.isFetching).toBeFalsy();
    });
  });
});
