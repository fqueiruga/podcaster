import React, { Component } from "react";
import PropTypes from "prop-types";

import PodcastSearch from "./PodcastSearch";
import PodcastList from "./PodcastList";
import "./HomePage.css";

/**
 * This component represents the home page that contains the podcast list.
 * 
 * It receives from its parent the router history object.
 */
class HomePage extends Component {
  navigateToPodcast(podcastId) {
    this.props.history.push(`/podcast/${podcastId}`);
  }

  render() {
    const podcastIds = Object.keys(this.props.podcasts);

    return (
      <div className="HomePage">
        <PodcastSearch count={podcastIds.length} />
        <PodcastList
          podcastIds={podcastIds}
          podcasts={this.props.podcasts}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  podcasts: PropTypes.object.isRequired,
};

export default HomePage;
