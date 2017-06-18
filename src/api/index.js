import RssParser from "rss-parser";

const PODCAST_LIST_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

const podcastLookupUrl = podcastId =>
  `https://itunes.apple.com/lookup?id=${podcastId}`;

/**
 * The XML format needs to be specified on feeds from feedburner
 * @see {@link https://stackoverflow.com/questions/4687042/getting-raw-xml-data-from-a-feedburner-rss-feed} 
 */
const proxiedFeedUrl = feedUrl =>
  `https://crossorigin.me/${feedUrl}?format=xml`;

/**
 * Reads a RSS feed from a string. Wraps the call to the RSSParser library in a Promise
 * 
 * @param {string} url The RSS feed URL
 * @returns {Promise} Resolved with the parsed RSS feed
 */
function parseRssFeed(feed) {
  return new Promise((resolve, reject) => {
    RssParser.parseString(feed, (err, parsed) => {
      if (err) reject(err);
      resolve(parsed);
    });
  });
}

/**
 * Orchestrates calls to retrieve the feed information of a podcast
 * 
 * @param {string} podcastId
 * @return {Promise} The promise that will be resolved with the parsed feed
 */
export function fetchPodcastFeed(podcastId) {
  return fetch(podcastLookupUrl(podcastId))
    .then(res => res.json())
    .then(data => {
      const results = data.results;
      if (!results || !results[0].feedUrl) {
        throw new Error("Cannot follow rss feed: feedUrl not found");
      }
      return fetch(proxiedFeedUrl(results[0].feedUrl), { mode: "cors" });
    })
    .then(res => res.text())
    .then(data => parseRssFeed(data));
}

/**
 * Retrieves the top 100 podcasts in the iTunes store
 * 
 * @return {Promise} The promise that will be resolved with the parsed podcast list
 */
export function fetchTop100Podcasts() {
  return fetch(PODCAST_LIST_URL).then(res => res.json());
}
