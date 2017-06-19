import { fetchTop100Podcasts, fetchPodcastFeed } from "../api";
import { normalizePodcastList, normalizeEpisodes } from "../utils/normalizers";

import actionTypes from "./types";

export const fetchPodcasts = () => {
  return dispatch => {
    dispatch(fetchRequestStatus(actionTypes.FETCH_PODCASTS_START));
    fetchTop100Podcasts()
      .then(data => {
        const normalizedPodcasts = normalizePodcastList(data);
        dispatch(fetchPodcastsSuccess(normalizedPodcasts));
      })
      .catch(error => {
        console.error("Failed to load the podcast list: ", error);
        dispatch(fetchRequestStatus(actionTypes.FETCH_PODCASTS_ERROR));
      });
  };
};

export const fetchEpisodes = (podcastId) => {
  return dispatch => {
    dispatch(fetchRequestStatus(actionTypes.FETCH_EPISODES_START));
    fetchPodcastFeed(podcastId)
      .then(parsedFeed => {
        const normalizedEpisodes = normalizeEpisodes(parsedFeed);
        dispatch(fetchEpisodesSuccess(normalizedEpisodes));
      })
      .catch(err => {
        console.error("Failed to read or parse the podcast feed", err);
        dispatch(fetchRequestStatus(actionTypes.FETCH_EPISODES_ERROR));
      });
  };
};

const fetchPodcastsSuccess = podcasts => ({
  type: actionTypes.FETCH_PODCASTS_SUCCESS,
  podcasts: podcasts
});

const fetchEpisodesSuccess = episodes => ({
  type: actionTypes.FETCH_EPISODES_SUCCESS,
  episodes: episodes
});

const fetchRequestStatus = actionType => ({
  type: actionType
});
