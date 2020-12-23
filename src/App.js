import React, { Component } from 'react';
import http from './services/httpService';
import config from './config.json';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: 'Hello Aung', body: 'Hi everyone!' };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = 'Updated post';
    await http.put(`${config.apiEndpoint}/${post.id}`, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = [...this.state.posts];
    const posts = originalPosts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`${config.apiEndpoint}/${post.id}`);
    } catch (error) {
      if (error.response && error.response.status === 404)
        alert('This post has already been deleted.');

      this.setState({ posts: originalPosts });
    }
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
