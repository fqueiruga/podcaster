import React, { Component } from "react";
import PropTypes from "prop-types";

import PodcastListItem from './PodcastListItem';
import "./PodcastList.css";

/**
 * Shows a list of podcasts 
 */
class PodcastList extends Component {
  render() {
    return (
      <ul className="PodcastList">
        {this.props.podcasts.map(podcast => (
          <PodcastListItem
            key={podcast.id}
            id={podcast.id}
            title={podcast.title}
            author={podcast.author}
            imageThumb={podcast.imageThumb}
            onClick={this.props.onPodcastClick}
          />
        ))}
      </ul>
    );
  }
}

PodcastList.propTypes = {
  podcasts: PropTypes.array.isRequired,
  onPodcastClick: PropTypes.func.isRequired,
};

export default PodcastList;
