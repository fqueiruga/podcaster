import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionCreators from "../actions";
import Header from "./Header";
import Home from "./Home";
import PodcastDetail from "./PodcastDetail";
import "./App.css";

class App extends Component {
  componentDidMount() {
    // Load the podcast list when the component mounts for the first time
    this.props.fetchPodcasts();
  }

  render() {
    const { isFetching, podcasts, podcastIds } = this.props;

    return (
      <div className="container App">
        <Header isFetching={isFetching} />

        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home podcasts={podcasts} podcastIds={podcastIds} />
              )}
            />
            <Route
              path="/podcast/:id"
              render={({ match }) => (
                <PodcastDetail
                  podcasts={podcasts}
                  podcastId={match.params.id}
                />
              )}
            />
          </Switch>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  podcasts: PropTypes.object.isRequired,
  podcastIds: PropTypes.arrayOf(Object).isRequired,
  fetchPodcasts: PropTypes.func.isRequired
};

// The app will consider to be fetching if any resource is being loaded
const mapStateToProps = state => ({
  isFetching: state.podcasts.isFetching || state.episodes.isFetching,
  podcasts: state.podcasts.podcasts,
  podcastIds: state.podcasts.podcastIds
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

// Needs to wrap the connected component with withRouter or the component will
// not be updated when the redux store changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
