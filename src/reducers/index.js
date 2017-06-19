import { combineReducers } from "redux";

import podcasts from "./podcasts";
import episodes from "./episodes";
import ui from "./ui";

export default combineReducers({ podcasts, episodes, ui });
