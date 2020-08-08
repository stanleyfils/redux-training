// import createStore
// import reducer from reducer.js
// create your store and export it

import { createStore } from "redux";
import reducer from "./reducer";
import { devToolsEnhancer } from "redux-devtools-extension";

// original syntax
// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// new syntax to use now that redux dev tools extension npm packge is installed
const store = createStore(reducer, devToolsEnhancer({ trace: true }));

export default store;
