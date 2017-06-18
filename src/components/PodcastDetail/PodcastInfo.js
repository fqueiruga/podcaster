import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./PodcastInfo.css";

class PodcastInfo extends Component {
  renderDescription() {
    const { description } = this.props.podcast;
    if (!description) {
      return null;
    }
    return (
      <div className="PodcastInfo__Description">
        <strong>Description:</strong>
        <p>{description}}</p>
      </div>
    );
  }

  render() {
    const { id, imageThumb, title, author } = this.props.podcast;
    const podcastDetailPath = `/podcast/${id}`;

    return (
      <article className="card PodcastInfo">
        <div className="card-block PodcastInfo__ImageContainer">
          <Link to={podcastDetailPath}>
            <img src={imageThumb} alt="" className="PodcastInfo__Image" />
          </Link>
        </div>

        <Link to={podcastDetailPath}>
          <header className="card-block PodcastInfo__Header">
            <h4 className="card-title PodcastInfo__Title">{title}</h4>
            <h6 className="card-subtitle PodcastInfo__Author">by {author}</h6>
          </header>
        </Link>

        {this.renderDescription()}
      </article>
    );
  }
}

PodcastInfo.propTypes = {
  podcast: PropTypes.object.isRequired
};

export default PodcastInfo;
