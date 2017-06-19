import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Imports bootstrap css before loading any component
import '../node_modules/bootstrap/dist/css/bootstrap.css';

// Setup for common css classes and maybe bootstrap overrides
import "./index.css";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import reducer from './reducers';

// Initialize the redux store
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
