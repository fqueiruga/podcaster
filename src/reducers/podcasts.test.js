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

  it("should add the podcasts in a map", () => {
    const podcast1 = buildTestPodcast("1");
    const podcast2 = buildTestPodcast("2");
    const action = {
      type: actionTypes.FETCH_PODCASTS_SUCCESS,
      podcasts: [podcast1, podcast2]
    };
    const state = podcastsReducer(undefined, action);
    expect(state.podcasts["1"]).toEqual(podcast1);
    expect(state.podcasts["2"]).toEqual(podcast2);
  });

  it("should store the podcastIds in the same order as they come", () => {
    const podcast1 = buildTestPodcast("1");
    const podcast2 = buildTestPodcast("2");
    const action = {
      type: actionTypes.FETCH_PODCASTS_SUCCESS,
      podcasts: [podcast1, podcast2]
    };
    const state = podcastsReducer(undefined, action);
    expect(state.podcastIds).toEqual(["1", "2"]);
  });
});
