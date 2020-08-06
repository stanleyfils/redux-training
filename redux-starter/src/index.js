// import store
// dispatch actions from actions.js functions
import store from "./store";
import { bugAdded, bugRemoved } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("store changed!", store.getState());
});

// Action 1
// dispatch the action along with it's payload as a parameter
store.dispatch(bugAdded("Bug 1"));

// unsubscribe();
// check console to see how it changes. After Action 1 runs, the unsubscribe function is invoked before action 2 runs.

// Action 2
store.dispatch(bugRemoved("1"));

console.log(store.getState());
