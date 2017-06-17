import React, { Component } from "react";
import PropTypes from "prop-types";

import "./PodcastSearch.css";

class PodcastSearch extends Component {
  render() {
    return (
      <div className="PodcastSearch">
        <span className="badge badge-primary PodcastSearch__Count">
          {this.props.count}
        </span>

        <input
          type="text"
          className="PodcastSearch__SearchBar"
          placeholder="Filter Podcasts"
        />
      </div>
    );
  }
}

PodcastSearch.propTypes = {
  count: PropTypes.number.isRequired
};

export default PodcastSearch;
