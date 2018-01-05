import React from "react";
import styled from "styled-components";

const TodoStyle = styled.div`
  border: 2px solid white;
  height: 100%;
  width: auto;
  color: white;
  background-color: purple;
  font-size: 24px;
  text-align: center;
`;

const Todo = () => {
  return <TodoStyle>this is a todo</TodoStyle>;
};

export default Todo;
