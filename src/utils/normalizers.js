import { formatDuration } from "./formatters";

/**
 * Normalizes a parsed podcast rss feed, transforming it to the format expected by the app
 * 
 * The episode IDs are encoded to be able to put them in the URL
 * 
 * @param {object} parsedFeed The parsed RSS feed
 */
export function normalizeEpisodes(parsedFeed) {
  // Reject episodes without data
  return parsedFeed.feed.entries
    .filter(entry => entry.enclosure !== undefined)
    .map(entry => ({
      id: encodeURIComponent(entry.guid),
      title: entry.title,
      description: entry.content,
      date: new Date(Date.parse(entry.pubDate)), // transforms the date to a JS object
      duration: formatDuration(entry.itunes.duration),
      url: entry.enclosure.url,
      type: entry.enclosure.type
    }));
}

/**
 * Transforms a list of podcasts as they come from the iTunes API to an object containing the
 * podcasts keyed by their ID.
 * 
 * The podcasts are transformed to the expected format.
 *  
 * @param {Object} podcastData 
 * @return {Map.<string, Object>}
 */
export function normalizePodcastList(podcastData) {
  return podcastData.feed.entry.map(podcast => {
    const normalized = {
      id: podcast.id.attributes["im:id"],
      title: podcast["im:name"].label,
      author: podcast["im:artist"].label,
      imageThumb: podcast["im:image"][2].label
    };
    if (podcast.summary && podcast.summary.label) {
      normalized.description = podcast.summary.label;
    }
    return normalized;
  });
}
