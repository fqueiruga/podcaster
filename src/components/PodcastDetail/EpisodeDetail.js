import React, { Component } from "react";

import "./EpisodeDetail.css";

class EpisodeDetail extends Component {
  render() {
    const episode = this.props.episodes[this.props.episodeId];

    // Show nothing if there is no such episode
    if (!episode) {
      return null;
    }

    const description = episode ? { __html: episode.description } : null;

    return (
      <div className="EpisodeDetail">
        <div className="card EpisodeDetail__Container">
          <h3 className="EpisodesDetail__Title">{episode.title}</h3>

          <p
            className="EpisodeDetail__Description"
            dangerouslySetInnerHTML={description}
          />

          <audio controls className="EpisodeDetail__Player">
            <source src={episode.url} type={episode.type} />
          </audio>
        </div>
      </div>
    );
  }
}

export default EpisodeDetail;
