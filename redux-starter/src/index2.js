// use this index2.js file by togglng
// index2.js is on webpack port 5000, not 9000

// change to from "./store when using redux dev tools because only store supports enhancers"
import store from "./store";
import * as actions from "./actions";

store.subscribe(() => {
  console.log("Store changed!");
});

store.dispatch(actions.bugAdded("Bug 1"));
store.dispatch(actions.bugAdded("Bug 2"));
store.dispatch(actions.bugAdded("Bug 3"));
store.dispatch(actions.bugResolved(1));

console.log(store.getState());
