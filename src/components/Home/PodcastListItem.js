import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

import "./PodcastListItem.css";

/**
 * Component that shows basic information of a podcast in a card with an image overlayed on top. 
 */
class PodcastListItem extends Component {
  render() {
    const { id, title, author, imageThumb } = this.props;

    return (
      <li className="PodcastListItem">
        <Link to={`/podcast/${id}`}>
          <img src={imageThumb} alt="" className="PodcastListItem__Image" />
          <div className="card PodcastListItem__Card">
            <div className="card-block PodcastListItem__Content">
              <h4 className="card-title">{title}</h4>
              <p className="card-text">Author: {author}</p>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}

PodcastListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imageThumb: PropTypes.string.isRequired,
};

export default PodcastListItem;
