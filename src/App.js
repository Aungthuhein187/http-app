import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const config = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { data } = await axios.get(config);
    this.setState({ posts: data });
  }

  handleAdd = () => {
    console.log('Post added.');
  };

  handleUpdate = (post) => {
    console.log('Post updated.', post);
  };

  handleDelete = (post) => {
    console.log('Post deleted.', post);
  };

  render() {
    const { posts } = this.state;

    return (
      <div className="container">
        <button className="btn btn-primary btn-add" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
