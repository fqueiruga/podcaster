import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionCreators from "../../actions";
import PodcastInfo from "./PodcastInfo";
import EpisodesList from "./EpisodesList";
import EpisodeDetail from "./EpisodeDetail";
import "./PodcastDetailPage.css";

/**
 * Container for the podcast details views
 */
class PodcastDetailPage extends Component {
  componentDidMount() {
    this.props.fetchEpisodes(this.props.podcastId);
  }

  render() {
    const { podcasts, podcastId, episodes, episodeIds } = this.props;
    const podcast = podcasts[podcastId];

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
                  episodes={episodes}
                  episodeIds={episodeIds}
                />
              )}
            />

            <Route
              path="/podcast/:podcastId/episode/:episodeId"
              render={({ match }) => (
                <EpisodeDetail
                  episodeId={decodeURI(match.params.episodeId)}
                  episodes={episodes}
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
  podcasts: PropTypes.object.isRequired,
  episodes: PropTypes.object,
  episodeIds: PropTypes.arrayOf(Object)
};

const mapStateToProps = state => ({
  episodes: state.episodes.episodes,
  episodeIds: state.episodes.episodeIds
});
const mapDispatchToPorps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToPorps)(PodcastDetailPage)
);
