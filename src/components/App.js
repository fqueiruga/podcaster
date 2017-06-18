import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import keyBy from "lodash.keyby";

import Header from "./Header";
import Home from "./Home";
import PodcastDetail from "./PodcastDetail";
import { fetchTop100Podcasts } from "../api";
import { normalizePodcastList } from "../utils/normalizers";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcasts: {},
      podcastIds: []
    };
  }

  componentDidMount() {
    // Load the podcast list when the component mounts for the first time
    fetchTop100Podcasts().then(data => {
      const normalizedPodcasts = normalizePodcastList(data);
      this.setState({
        podcastIds: normalizedPodcasts.map(podcast => podcast.id),
        podcasts: keyBy(normalizedPodcasts, "id")
      });
    });
  }

  render() {
    return (
      <div className="container App">
        <Header />

        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  podcasts={this.state.podcasts}
                  podcastIds={this.state.podcastIds}
                />
              )}
            />
            <Route
              path="/podcast/:id"
              render={({ match }) => (
                <PodcastDetail
                  podcasts={this.state.podcasts}
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

export default App;
