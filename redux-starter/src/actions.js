// if you ever need to change your actions structure, there is only one place you need to update. That is why action cretors are useful.

import * as actions from "./actionTypes";

// export function bugAdded(description) {
//   return {
//     type: actions.BUG_ADDED,
//     payload: {
//       description: "Bug1",
//     },
//   };
// }

export const bugAdded = (description) => ({
  type: actions.BUG_ADDED,
  payload: {
    description: "Bug1",
  },
});

export const bugRemoved = (id) => ({
  type: actions.BUG_REMOVED,
  payload: {
    id: 1,
  },
});
