import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, getUnresolvedBugs, resolveBug } from "../store/bugs";

const BugsList = () => {
  // this returns dipacth function of the redux store
  const dispatch = useDispatch();
  const bugs = useSelector(getUnresolvedBugs);

  // this is where we write code to perform side effects like caling api's
  // use the code you would've wrote in componentDidMount here
  // useEffect optionally takes 2 arguments. The 2nd is an array of dependencies
  useEffect(() => {
    dispatch(loadBugs());
  }, []); //passing an empty array so we only call this function once when component is mounted.

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          {bug.description}
          <button onClick={() => dispatch(resolveBug(bug.id))}>Resolve</button>
        </li>
      ))}
    </ul>
  );
};

export default BugsList;
