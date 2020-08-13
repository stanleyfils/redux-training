// use this index2.js file by togglng
// index2.js is on webpack port 5000, not 9000

// change to from "./store when using redux dev tools because only store supports enhancers"
import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
  loadBugs,
  addBug,
  resolveBug,
  assignBugToUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
// import {loadBugs} from "./store/bugs";

const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!");
});

// Actions
// dispatch the action along with it's payload as a parameter

// unsubscribe();
// check console to see how it changes. After Action 1 runs, the unsubscribe function is invoked before action 2 runs.

// store.dispatch(userAdded({ name: "User 1" }));
// store.dispatch(userAdded({ name: "User 2" }));
// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));
// removed actions.bugAdded and actions.bugResolved are no longer importing all actions from bugs.js (import * as actions)

// const bugs = getBugsByUser(1)(store.getState());
// console.log(bugs);

// const unresolvedBugs = getUnresolvedBugs(store.getState());
// const x = getUnresolvedBugs(store.getState());
// const y = getUnresolvedBugs(store.getState());

// console.log(store.getState());

// console.log(x === y);
// x === y is true because of memoization

// Why would you want to dispatch a function?
// store.dispatch((dispatch, getState) => {
// to call an API endpoint
// when calling an API, you're dealing with promises
// when the promise is resolved => dispatch() action
// dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
// console.log(getState());
// if the promise is rejected => dispacth() an action that indicates an error
// you now can have logic. You can give your store the ability to dispatch function by writing a middleware fucntion
// });

// Exercise
// store.dispatch({
//   type: "error",
//   payload: { message: "An error occurred." },
// });

// create dispatch action using commented out action function from api.js
// remove data that isn't required
// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// });

// UI Layer
// store.dispatch(addBug({ description: "a" }));

store.dispatch(loadBugs());

// setTimeout(() => store.dispatch(resolveBug(1)), 2000);
setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

// setTimeout(() => store.dispatch(loadBugs()), 2000); //add this to test caching

// use an action creator instead of the above code. It's easier and safer
// no longer needed because we created the UI layer loadBugs
// store.dispatch(
//   actions.apiCallBegan({
//     url: "/bugs",
//     onSuccess: "bugs/bugsReceived",
//   })
// );
