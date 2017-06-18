import React, { Component } from "react";
import PropTypes from "prop-types";

import PodcastSearch from "./PodcastSearch";
import PodcastList from "./PodcastList";
import "./HomePage.css";

/**
 * This component represents the home page that contains the podcast list.
 */
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchFilter: ''
    };

    this.setSearchFilter = this.setSearchFilter.bind(this);
  }

  /**
   * Updates the search filter 
   * 
   * @param {string} searchFilter 
   */
  setSearchFilter(searchFilter) {
    this.setState({ searchFilter });
  }

  /**
   * Filters the podcast list matching those whose title or author fields contain the 
   * search string
   *  
   * @return {Array.<string>} The filtered list of IDs
   */
  filterPodcastIds() {
    const { searchFilter } = this.state;
    const { podcasts, podcastIds} = this.props;

    return podcastIds
      .map(id => podcasts[id])
      .filter(podcast => {
        if (searchFilter === null || searchFilter === "") return true;
        const lowercaseFilter = searchFilter.toLowerCase();
        return (
          podcast.title.toLowerCase().includes(lowercaseFilter) ||
          podcast.author.toLowerCase().includes(lowercaseFilter)
        );
      })
      .map(podcast => podcast.id);
  }

  render() {
    const podcastIds = this.filterPodcastIds();

    return (
      <div className="HomePage">
        <PodcastSearch
          count={podcastIds.length}
          filter={this.state.searchFilter}
          onSearchChange={this.setSearchFilter}
        />

        <PodcastList podcastIds={podcastIds} podcasts={this.props.podcasts} />
      </div>
    );
  }
}

HomePage.propTypes = {
  podcasts: PropTypes.object.isRequired,
  podcastIds: PropTypes.arrayOf(Number).isRequired,
};

export default HomePage;
