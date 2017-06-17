import React, { Component } from "react";
import PropTypes from "prop-types";

import "./PodcastListItem.css";

/**
 * Component that shows basic information of a podcast in a card with an image overlayed on top. 
 */
class PodcastListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    const { title, author, imageThumb } = this.props;

    return (
      <li className="PodcastListItem" onClick={this.handleClick}>
        <img src={imageThumb} alt="" className="PodcastListItem__Image" />
        <div className="card PodcastListItem__Card">
          <div className="card-block PodcastListItem__Content">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">Author: {author}</p>
          </div>
        </div>
      </li>
    );
  }
}

PodcastListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  imageThumb: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default PodcastListItem;
