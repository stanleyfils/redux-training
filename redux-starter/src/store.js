// import createStore
// import reducer from reducer.js
// create your store and export it

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
