import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import PodcastDetail from './PodcastDetail';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container App">
        <Header />

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/podcast/:id" component={PodcastDetail} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
