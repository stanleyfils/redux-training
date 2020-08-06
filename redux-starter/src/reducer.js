import * as actions from "./actionTypes";
// set initial state. In this case, it's an empty array []

// set intial id to 0
let lastId = 0;

// using if/else conditional in this example.
// function reducer(state = [], action) {
//   if (action.type === "bugAdded")
//     return [
//       ...state,
//       {
//         id: ++lastId,
//         description: action.payload.description,
//         resolved: false,
//       },
//     ];
//   else if (action.type === "bugRemoved")
//     return state.filter((bug) => bug.id !== action.payload.id);

//   return state;
// }

// using switch statement conditional in this example.
export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
    default:
      return state;
  }
}

// reducers are pure functions
// if called multiple times with the same arguments, you will always get the same result
// everything you need should be passed as arguments
