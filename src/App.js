import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = { posts: [] };
  render() {
    return (
      <div className="container">
        <button className="btn btn-primary">Add</button>
      </div>
    );
  }
}

export default App;
