// this middleware is used to log all actions that are dispatched
// use currying -> a technique used to convert a function with multiple paramters into a multiple functions each with a single parameter.
// SNA = store, next, action
const logger = (param) => (store) => (next) => (action) => {
  console.log("Logging", param);
  next(action);
  //   next must be called because it is our reducer. This action won't be processed without it.
};

// store
// next is a reference to the next middleware function if this is the only middleware function we have, next would be the reducer that will handle this action.
// action is action that was dispatched

export default logger;
