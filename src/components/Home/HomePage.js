import React, { Component } from "react";
import PropTypes from "prop-types";

import PodcastSearch from "./PodcastSearch";
import PodcastList from "./PodcastList";
import rawPodcastList from "../../devData/podcastList.json";

const normalizePodcastList = rawPodcastData =>
  rawPodcastData.feed.entry.map(podcast => {
    return {
      id: podcast.id.attributes["im:id"],
      title: podcast["im:name"].label,
      author: podcast["im:artist"].label,
      imageThumb: podcast["im:image"][2].label
    };
  });

const podcasts = normalizePodcastList(rawPodcastList);

/**
 * This component represents the home page that contains the podcast list.
 * 
 * It receives from its parent the router history object.
 */
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.navigateToPodcast = this.navigateToPodcast.bind(this);
  }

  navigateToPodcast(podcastId) {
    this.props.history.push(`/podcast/${podcastId}`);
  }

  render() {
    return (
      <div className="HomePage">
        <PodcastSearch count={podcasts.length} />
        <PodcastList
          podcasts={podcasts}
          onPodcastClick={this.navigateToPodcast}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

export default HomePage;
