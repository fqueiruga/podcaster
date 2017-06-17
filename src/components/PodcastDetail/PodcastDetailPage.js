import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import RssParser from "rss-parser";

import PodcastInfo from "./PodcastInfo";
import EpisodesList from "./EpisodesList";
import EpisodeDetail from "./EpisodeDetail";
import feedUrl from "../../devData/podcastFeed.rss";
import "./PodcastDetailPage.css";

/**
 * Reads a RSS feed from a URL. Wraps the call to the RSSParser library in a Promise
 * 
 * @param {string} url The RSS feed URL
 * @returns {Promise} Resolved with the parsed RSS feed
 */
function parseRssFeed(url) {
  return new Promise((resolve, reject) => {
    RssParser.parseURL(url, (err, parsed) => {
      if (err) reject(err);
      resolve(parsed);
    });
  });
}

/**
 * Normalizes a parsed podcast rss feed, transforming it to the format expected by the app
 * 
 * The episode IDs are encoded to be able to put them in the URL
 * 
 * @param {object} parsedFeed The parsed RSS feed
 */
function normalizePodcastFeed(parsedFeed) {
  const { title, description, itunes, entries } = parsedFeed.feed;
  const episodes = entries.map(entry => ({
    id: encodeURIComponent(entry.guid),
    title: entry.title,
    description: entry.content,
    date: new Date(Date.parse(entry.pubDate)), // transforms the date to a JS object
    duration: entry.itunes.duration,
    url: entry.enclosure.url,
    type: entry.enclosure.type
  }));

  return {
    title,
    description,
    imageUrl: itunes.image,
    author: itunes.author,
    episodes
  };
}

/**
 * Container for the podcast details views
 */
class PodcastDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast: null
    };
  }

  componentDidMount() {
    parseRssFeed(feedUrl)
      .then(parsedFeed =>
        this.setState({ podcast: normalizePodcastFeed(parsedFeed) })
      )
      .catch(err =>
        console.error("Failed to read or parse the podcast feed", err)
      );
  }

  render() {
    const { podcast } = this.state;

    if (!podcast) {
      return null;
    }

    return (
      <div className="PodcastDetailPage">
        <aside className="PodcastDetailPage__Sidebar">
          <PodcastInfo podcast={podcast} />
        </aside>

        <section className="PodcastDetailPage__Content">
          <Switch>
            <Route
              exact
              path="/podcast/:id"
              render={({ match }) => (
                <EpisodesList
                  podcastId={match.params.id}
                  episodes={podcast.episodes}
                />
              )}
            />

            <Route
              path="/podcast/:podcastId/episode/:episodeId"
              render={({ match }) => (
                <EpisodeDetail
                  episodeId={decodeURI(match.params.episodeId)}
                  episodes={podcast.episodes}
                />
              )}
            />
          </Switch>
        </section>
      </div>
    );
  }
}

export default PodcastDetailPage;
