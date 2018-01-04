import React, { Component } from "react";
import { Route } from "react-router-dom";
import Todo from "./Todo";
import styled from "styled-components";

const ListStyle = styled.div`
  border: 1px solid purple;
  height: 100%;
  width: 33%;
  color: white;
  background-color: orange;
  font-size: 24px;
`;

class TodoList extends Component {
  render() {
    return (
      <div>
        <p>hello from the list</p>
        <ListStyle>
          <Todo />
        </ListStyle>
      </div>
    );
  }
}

export default TodoList;
