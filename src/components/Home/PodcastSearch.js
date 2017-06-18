import React, { Component } from "react";
import PropTypes from "prop-types";

import "./PodcastSearch.css";

class PodcastSearch extends Component {
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    this.props.onSearchChange(e.target.value);
  }

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
          value={this.props.filter}
          onChange={this.handleSearchChange}
        />
      </div>
    );
  }
}

PodcastSearch.propTypes = {
  count: PropTypes.number.isRequired,
  filter: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
};

export default PodcastSearch;
