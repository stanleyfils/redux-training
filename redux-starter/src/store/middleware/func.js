//  Using Thunk => thunk is built into redux toolkit
// create your currying function
// apply an if/else conditional. If action is a function, call action by returning, else move onto the next middlewarefunction or the reducer.
const func = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") action(dispatch, getState);
  else next(action);
};

export default func;

// use object destructuring since you need to acces your store from your action creator. => store becomes (dispatch, getState)

// this middleware allows us to make asyncronous API calls.
