import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatDate } from "../../utils/formatters";
import "./EpisodesList.css";

const EpisodeRow = ({ podcastId, id, title, date, duration }) => {
  return (
    <tr>
      <td>
        <Link to={`/podcast/${podcastId}/episode/${id}`}>{title}</Link>
      </td>
      <td>{formatDate(date)}</td>
      <td>{duration}</td>
    </tr>
  );
};

class EpisodesList extends Component {
  render() {
    const { episodeIds } = this.props;
    // Show nothing if there are no episodes
    if (!episodeIds || !(episodeIds.length > 0)) {
      return null;
    }

    const episodes = episodeIds.map(id => this.props.episodes[id]);

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
              {episodes.map(episode => (
                <EpisodeRow
                  key={episode.id}
                  podcastId={this.props.podcastId}
                  id={episode.id}
                  title={episode.title}
                  date={episode.date}
                  duration={episode.duration}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

EpisodesList.propTypes = {
  podcastId: PropTypes.string.isRequired,
  episodes: PropTypes.object,
  episodeIds: PropTypes.arrayOf(Number)
};

export default EpisodesList;
