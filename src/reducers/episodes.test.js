import episodesReducer from "./episodes";
import actionTypes from "../actions/types";

const buildTestEpisode = id => ({
  id,
  title: `podcast-${id}`,
  description: "my description",
  date: new Date(),
  duration: "08:12",
  url: `http://podcasts.example.com/${id}.mpeg`,
  type: "audio/mpeg"
});

describe("episodesReducer", () => {
  it("should have an initial state", () => {
    const action = { type: "NOOP" };
    const state = episodesReducer(undefined, action);
    expect(state.episodeIds).toEqual([]);
    expect(state.episodes).toEqual({});
  });

  it("should add the episodes in a map", () => {
    const episode1 = buildTestEpisode("1");
    const episode2 = buildTestEpisode("2");
    const action = {
      type: actionTypes.FETCH_EPISODES_SUCCESS,
      episodes: [episode1, episode2]
    };
    const state = episodesReducer(undefined, action);
    expect(state.episodes["1"]).toEqual(episode1);
    expect(state.episodes["2"]).toEqual(episode2);
  });

  it("should store the podcastIds in the same order as they come", () => {
    const episode1 = buildTestEpisode("1");
    const episode2 = buildTestEpisode("2");
    const action = {
      type: actionTypes.FETCH_EPISODES_SUCCESS,
      episodes: [episode1, episode2]
    };
    const state = episodesReducer(undefined, action);
    expect(state.episodeIds).toEqual(["1", "2"]);
  });

  it('should remove old episodes when load starts', () => {
    const prevState = {
      episodes: {
        old: buildTestEpisode("old")
      },
      episodeIds: ["old"]
    };
    const action = {
      type: actionTypes.FETCH_EPISODES_START
    }
    const state = episodesReducer(prevState, action);

    expect(state.episodes).toEqual({});
    expect(state.episodeIds).toEqual([]);
  });
});
