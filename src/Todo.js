import React, { Component } from 'react';
import axios from 'axios';

class Todo extends Component{
  constructor(props){
    super(props);
      this.state={
        todoList: [],
        inputTodo: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.add = this.add.bind(this);
    }

    componentDidMount(){
      axios.get('http://localhost:3001/api/todos')
        .then((response) => {
          this.setState({todoList: response.data.todos});
        })
    }

    handleChange(event) {
        this.setState({inputTodo: event.target.value});
      }

 add() {
   axios.post('http://localhost:3001/api/todos', {"text": this.state.inputTodo})
    .then((response) => {
      this.setState((prevState, props) => ({
        todoList: [...this.state.todoList, response.data]
      }));
    })
}

    render() {
      const todos = this.state.todoList
        .map((todo) => <li>{todo.text}<input type="checkbox"/></li>);

    return (
      <div>
          <button onClick={this.add}>Add Todo</button><input value={this.state.inputTodo} onChange={this.handleChange} placeholder='new todo'/>
          <ul>{todos}</ul>
      </div>
    );
  }
}

export default Todo;
