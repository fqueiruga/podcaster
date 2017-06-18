import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import PodcastInfo from "./PodcastInfo";
import EpisodesList from "./EpisodesList";
import EpisodeDetail from "./EpisodeDetail";
import { fetchPodcastFeed } from "../../api";
import { normalizeEpisodes } from "../../utils/normalizers";
import "./PodcastDetailPage.css";

/**
 * Container for the podcast details views
 */
class PodcastDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: []
    };
  }

  componentDidMount() {
    fetchPodcastFeed(this.props.podcastId)
      .then(parsedFeed =>
        this.setState({ episodes: normalizeEpisodes(parsedFeed) })
      )
      .catch(err =>
        console.error("Failed to read or parse the podcast feed", err)
      );
  }

  render() {
    const podcast = this.props.podcasts[this.props.podcastId];
    
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
                  episodes={this.state.episodes}
                />
              )}
            />

            <Route
              path="/podcast/:podcastId/episode/:episodeId"
              render={({ match }) => (
                <EpisodeDetail
                  episodeId={decodeURI(match.params.episodeId)}
                  episodes={this.state.episodes}
                />
              )}
            />
          </Switch>
        </section>
      </div>
    );
  }
}

PodcastDetailPage.propTypes = {
  podcastId: PropTypes.string.isRequired,
  podcasts: PropTypes.object.isRequired
};

export default PodcastDetailPage;
