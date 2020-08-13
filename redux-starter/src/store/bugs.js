// DUCK PATTERN FILE STRUCTURING
// All files merged into one relevant file

import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment";
import { pullAt } from "lodash";

// REDUCER
// set initial state. In this case, it's an empty array []
// set intial id to 0
// let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false, // this adds a loading spinner while we wait for api calls
    lastFetch: null, // timestamp of the last time we called the server to get the list of bugs. Useful if you're implementing caching
  },
  reducers: {
    // actions => action handlers
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    // the name of this action is actually bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now(); // logs current time as a timestamp
    },

    bugAssignedToUser: (bugs, action) => {
      // use object destructuring to extrct bugId and userId from action.payload
      // create bugId and userId payload properties
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    // command -> event
    // addBug -> bugAdded
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload); // with this, we no longer need to generate id's on the client side so we can remove lastId variable.
    },

    // command -> event
    // resolveBug -> bugResolved
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});
// console.log(slice);

const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";

// remember: () = fn(dispatch, getState)
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  // console.log(lastFetch);

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;
  // in a real file, 10 minutes should be storedin config file.

  dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type, //or slice.actions.bugsReceived.type ifyou dont like to extract
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

// put and patch are used for upating data
// put = update entire resource
// patch = update 1 or more properties
export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id, // = /bugs/1
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId, // = /bugs/1
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// add selector functions here:
// a selector is a function that takes a state and returns a computed state.
// // Line 39 is heavy selector syntax. Use memoization to pull unchanged state data from the cache.
// export const getUnresolvedBugs = (state) =>
//   state.entities.bugs.filter((bug) => !bug.resolved);

// Memoization version
// bugs => get unresolved bugs from the cache
// selector for getting all unresolved bugs
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.filter((bug) => !bugs.resolved)
);

// selector for getting bugs that are assigned to a user
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
