// import createStore
// import reducer from reducer.js
// create your store and export it

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
import api from "./middleware/api";

// original syntax
// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// new syntax to use now that redux dev tools extension npm packge is installed

// because we installed redux toolkit, we no longer need to manually import redux dev tools extension. import {configureStore} from "@redux-toolkit" and you're all set. Just update the function to an anonymous function.
// old syntax:
// export default function configureStore() {
//   const store = createStore(reducer, devToolsEnhancer({ trace: true }));

//   return store;
// }

// new syntax:
export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(),
      logger({ destination: "console" }),
      toast,
      api,
    ],
  });
}

// in development mode we log our middleware using the console, but if we want to log in production, we have to parameterize this middleware function because we need to log using a logging service.
// middleware: [logger({destination: "console"})]
