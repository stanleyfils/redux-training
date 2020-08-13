// API call made using axios
// Using async and await instead of .then and .catch
import axios from "axios";
import * as actions from "../api";

// const action = {
//   type: "apiCallBegan",
//   payload: {
//     url: "/bugs",
//     method: "get",
//     data: {},
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed"
//   }
// };

const api = ({ dispatch }) => (next) => async (action) => {
  // call API
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action); // you have to pass this action as well. Comment out to see what happens in redux dev tools

  try {
    const response = await axios.request({
      baseURL: "http://localhost:9001/api", // in a real app, this would be stored in a configuration file
      url,
      method,
      data,
    });
    // General onSuccess dispatch
    dispatch(actions.apiCallSuccess(response.data));
    // This is for a specific action requests
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data }); //must destructure store in API function in order to access dispatch here. Replace store with ({ dispatch }). dispatch and getState are always available.
  } catch (error) {
    // add a general error action here
    dispatch(actions.apiCallFailed(error.message)); //adding ,message makes this serializable
    // This is for specific action requests
    if (onError) dispatch({ type: onError, payload: error });
  }
};

export default api;
