import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatDate, formatDuration } from "../../utils/formatters";
import "./EpisodesList.css";

class EpisodesList extends Component {
  renderEpisodeRow(episode) {
    const { podcastId } = this.props;

    return (
      <tr key={episode.id}>
        <td>
          <Link to={`/podcast/${podcastId}/episode/${encodeURI(episode.id)}`}>
            {episode.title}
          </Link>
        </td>
        <td>{formatDate(episode.date)}</td>
        <td className="text-right">{formatDuration(episode.duration)}</td>
      </tr>
    );
  }

  render() {
    const { episodes } = this.props;

    return (
      <div className="EpisodesList">
        <div className="card EpisodesList__Count">
          <h3>Episodes: {episodes.length}</h3>
        </div>

        <div className="card EpisodesList__TableContainer">
          <table className="table table-striped EpisodesList__Table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>

            <tbody>
              {episodes.map(episode => this.renderEpisodeRow(episode))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

EpisodesList.propTypes = {
  podcastId: PropTypes.string.isRequired,
  episodes: PropTypes.arrayOf(Object).isRequired
};

export default EpisodesList;
