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
      next: 0
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let nextId = +JSON.parse(localStorage.getItem("next")) || 0;
    this.setState({ todos, nextId });
  }

  handleAdd(newTodo) {
    let newId = this.state.nextId + 1;
    this.setState(
      {
        todos: [
          {
            ...newTodo,
            id: newId
          },
          ...this.state.todos
        ],
        nextId: newId
      },
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
        localStorage.setItem("nextId", JSON.stringify(this.state.nextId));
      }
    );
  }

  handleEdit(id, editedTodo) {
    let newTodos = this.state.todos.map(todo => {
      if (id === todo.id) {
        todo = Object.assign({}, todo, editedTodo, {
          isShowingEditForm: false
        });
      }
      return todo;
    });
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

  toggle(id, key) {
    let newTodos = this.state.todos.map(todo => {
      if (id === todo.id) {
        todo = Object.assign({}, todo, { [key]: !todo[key] });
      }
      return todo;
    });
    this.setState({ todos: newTodos }, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    });
  }

  render() {
    const todos = this.state.todos.map(todo => (
      <Todo
        key={todo.id}
        id={todo.id}
        title={todo.title}
        description={todo.description}
        handleDelete={() => this.handleDelete(todo.id)}
        handleEdit={newProp => this.handleEdit(todo.id, newProp)}
        toggleComplete={this.toggle.bind(this, todo.id, "isComplete")}
        isComplete={todo.isComplete}
        toggleEditForm={this.toggle.bind(this, todo.id, "isShowingEditForm")}
        isShowingEditForm={this.isShowingEditForm}
      />
    ));

    const getSingleComponent = routeProps => {
      const id = +routeProps.match.params.id;
      const todo = todos.find(todo => {
        return id === todo.props.id;
      });
      return <ListStyle>{todo}</ListStyle>;
    };

    return (
      <div>
        <Switch>
          <Route path="/todos" render={() => <ListStyle>{todos}</ListStyle>} />
          <Route
            path="/todos/new"
            render={props => (
              <TodoForm handleSubmit={this.handleAdd} {...props} />
            )}
          />
          <Route path="/todos/:id" render={getSingleComponent} />
          <Redirect to="/todos" />
        </Switch>
      </div>
    );
  }
}

export default TodoList;
