import { combineReducers } from "redux";

import podcasts from "./podcasts";
import episodes from "./episodes";

export default combineReducers({ podcasts, episodes });
