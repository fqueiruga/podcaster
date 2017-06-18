import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Imports bootstrap css before loading any component
import '../node_modules/bootstrap/dist/css/bootstrap.css';

// Setup for common css classes and maybe bootstrap overrides
import "./index.css";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
