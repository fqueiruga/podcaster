import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MDSpinner from "react-md-spinner";

import "./Header.css";

class Header extends Component {
  render() {
    const fetchingIndicator = this.props.isFetching
      ? <span><MDSpinner singleColor="#0275d8" size="24" /></span>
      : null;

    return (
      <header className="Header">
        <div className="Header__TitleContainer">
          <Link to="/">
            <h1 className="Header__Title">Podcaster</h1>
          </Link>
        </div>

        {fetchingIndicator}
      </header>
    );
  }
}

Header.propTypes = {
  isFetching: PropTypes.bool.isRequired
};

export default Header;
