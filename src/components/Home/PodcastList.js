import React, { Component } from "react";
import PropTypes from "prop-types";

import PodcastListItem from "./PodcastListItem";
import "./PodcastList.css";

/**
 * Shows a list of podcasts 
 */
class PodcastList extends Component {
  render() {
    const { podcastIds, podcasts } = this.props;
    const podcastsList = podcastIds.map(id => podcasts[id]);

    return (
      <ul className="PodcastList">
        {podcastsList.map(podcast => (
          <PodcastListItem
            key={podcast.id}
            id={podcast.id}
            title={podcast.title}
            author={podcast.author}
            imageThumb={podcast.imageThumb}
          />
        ))}
      </ul>
    );
  }
}

PodcastList.propTypes = {
  podcastIds: PropTypes.array.isRequired,
  podcasts: PropTypes.object.isRequired,
};

export default PodcastList;
