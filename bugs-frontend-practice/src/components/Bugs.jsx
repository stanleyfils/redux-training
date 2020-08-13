import React, { Component } from "react";
import { loadBugs, resolveBug, getUnresolvedBugs } from "../store/bugs";
import { connect } from "react-redux";

class Bugs extends Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  render() {
    return (
      <ul>
        {this.props.bugs.map((bug) => (
          <li key={bug.id}>
            {bug.description}
            <button onClick={() => this.props.resolveBug(bug.id)}>
              Resolve
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

// connect allows us to subscribe and unsubscribe from the store
// the connect function takes 2 function arguments
// 1st: what part of the store is this fn interested in? => bugs: state.entities.bugs.list
// mapStateToProps takes the state of the store and returns the part of the store that we are interested in. The properties of this object will end up as props to the component.
// The 2nd argument in your connect fn is for dispatching actions needed
const mapStateToProps = (state) => ({
  //parens needed or else it's a code block
  bugs: getUnresolvedBugs(state),
});

// the properties of this object, should be the props of our component
// loadBugs should be a fn and when we call it, it should dispatch the loadBugs bf.
const mapDispatchToProps = (dispatch) => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: (id) => dispatch(resolveBug(id)),
});

// higher order function that takes a fn or returns a fn or both
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
//the Bugs component is a dummy component that takes care of subscribing and unsubscribing from the store
// container component that wraps a presenation or dummy component (Bugs) under the hood.
