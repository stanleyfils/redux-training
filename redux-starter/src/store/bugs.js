// DUCK PATTERN FILE STRUCTURING
// All files merged into one relevant file

import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

// REDUCER
// set initial state. In this case, it's an empty array []
// set intial id to 0
let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false, // this adds a loading spinner while we wait for api calls
    lastFetch: null, // timestamp of the last time we called the server to get the list of bugs. Useful if you're implementing caching
  },
  reducers: {
    // actions => action handlers
    // the name of this action is actually bugs/bugsReceived
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
    },

    bugAssignedToUser: (bugs, action) => {
      // use object destructuring to extrct bugId and userId from action.payload
      // create bugId and userId payload properties
      const { bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        name: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});
// console.log(slice);

export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs";

export const loadBugs = () =>
  apiCallBegan({
    url,
    onSuccess: bugsReceived.type, //or slice.actions.bugsReceived.type ifyou dont like to extract
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
