import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import styled from "styled-components";

const ListStyle = styled.div`
  border: 1px solid purple;
  height: 100%;
  width: 50%;
  color: white;
  background-color: orange;
  font-size: 24px;
`;

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      latestId: 0
    };
  }
  componentDidMount() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let latestId = +JSON.parse(localStorage.getItem("latestId")) || 0;
    this.setState({ todos, latestId });
  }

  handleAdd(newTodo) {
    let newId = this.state.latestId + 1;
    this.setState(
      {
        todos: [
          {
            ...newTodo,
            id: newId
          },
          ...this.state.todos
        ],
        latestId: newId
      },
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
        localStorage.setItem("latestId", JSON.stringify(this.state.latestId));
      }
    );
  }

  handleDelete(id) {
    let newTodos = this.state.todos.filter(todo => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodos }),
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
      };
  }

  render() {
    return (
      <ListStyle>
        <p>hello from the list</p>

        <Todo />
        <Todo />
        <Todo />
        <Todo />
      </ListStyle>
    );
  }
}

export default TodoList;
