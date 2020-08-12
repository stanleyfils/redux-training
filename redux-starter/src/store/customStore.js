// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// HOW TO IMPLEMENT A PRIVATE PROPERTY IN JAVASCRIPT

// Declare the variable "let state;" but don't expose the variable in the object that is returned in the main function.

// Instead, create a getState() function. We refer to this function as a retriever because with this function we can retrieve the value of the "let state;" variable. Remember, functions inside of functions have access to declared variables.

// Then, you expose this getState() function in the object that is returned from the main function. It will return the state that you establish in the index.js file

// Basic Example 1:
// function createStore() {
//   let state;

//   function getState() {
//     return state;
//   }

//   return {
//     getState,
//   };
// }

// export default createStore();
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// HOW TO DISPATCH ACTIONS

// import your reducer
import reducer from "./reducer";

// the createStore function of redux expects a reference to the reducer function so add the reducer paramter to the createStore function
function createStore(reducer) {
  let state;
  // declare an array of listeners
  let listeners = [];

  // declare a function that takes listener as a parameter.
  // this listener is a function that you can call, but you don't want to call it immediately because when we subscribe to the store, the function doesn't get called immediately. It should be called later on when the state of the store gets changed.
  // when we subscribe, we're going to push this new listener to our array of listeners. You can have multiple UI components subscribing to our store as listeners.
  function subscribe(listener) {
    listeners.push(listener);
  }

  // create a dispatch() function that takes an action object as an argument
  // In that function, call your reducer to get the new state. Set your state equal to your reducer function that takes the original state and action as parameters. The reducer will take those arguments and return the new state.
  function dispatch(action) {
    state = reducer(state, action);

    // notify your subscribers or listeners
    for (let i = 0; i < listeners.length; i++) listeners[i]();
  }

  function getState() {
    return state;
  }

  // add your subscribe function, dispatch function, and getState function to your store object that is returned
  return {
    subscribe,
    dispatch,
    getState,
  };
}

// export your createStore function with the reducer as a paramater
// you will need to first need to import the reducer from the reducer module.
export default createStore(reducer);
