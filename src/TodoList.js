import React, { Component } from "react";
import { Route } from "react-router-dom";
import Todo from "./Todo";

class TodoList extends Component {
  render() {
    return (
      <div>
        <p>hello from the list</p>
        <Todo />
      </div>
    );
  }
}

export default TodoList;
