import React, { Component } from "react";

import "./EpisodeDetail.css";

class EpisodeDetail extends Component {
  render() {
    const { episodeId, episodes } = this.props;
    const episode = episodes.find(episode => episode.id === episodeId);
    const description = { __html: episode.description };

    return (
      <div className="EpisodeDetail">
        <div className="card EpisodeDetail__Container">
          <h3 className="EpisodesDetail__Title">{episode.title}</h3>

          <p className="EpisodeDetail__Description" dangerouslySetInnerHTML={description} />

          <audio controls className="EpisodeDetail__Player">
            <source src={episode.url} type={episode.type} />
          </audio>
        </div>

      </div>
    );
  }
}

export default EpisodeDetail;
