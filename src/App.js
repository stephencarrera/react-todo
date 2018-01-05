import React from "react";
import TodoList from "./TodoList";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkStyle = styled.div`
  color: white;
  font-size: 20px;
  padding: 10px 20px 10px 20px;
  text-decoration: none;
  width: 200px;
`;

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>Todo App with router and styled-components</h2>
      <LinkStyle>
        <Link to="todos/new">Add</Link>
      </LinkStyle>
      <LinkStyle>
        <Link to="todos">Show</Link>
      </LinkStyle>
    </div>
    <TodoList />
  </div>
);

export default App;
