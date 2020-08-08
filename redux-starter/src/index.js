// index.js file running on webpack port 9000
// import store
// dispatch actions from actions.js functions
import store from "./store";
console.log(store);
import { bugAdded, bugRemoved, bugResolved } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("store changed!", store.getState());
});

// Action 1
// dispatch the action along with it's payload as a parameter
store.dispatch(bugAdded("Bug 1"));

// unsubscribe();
// check console to see how it changes. After Action 1 runs, the unsubscribe function is invoked before action 2 runs.

// Action 2
store.dispatch(bugResolved(1));

// Action 3
store.dispatch(bugRemoved(1));

// console should print 1. bugAdded, 2. BugResolved, and 3. bugRemoved
console.log(store.getState());
