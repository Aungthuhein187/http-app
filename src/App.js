import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const config = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { data: posts } = await axios.get(config);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: 'Hello Aung', body: 'Hi everyone!' };
    const { data: post } = await axios.post(config, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = 'Updated post';
    await axios.put(`${config}/${post.id}`, post);

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const posts = [...this.state.posts];
    const result = posts.filter((p) => p.id !== post.id);
    this.setState({ posts: result });

    try {
      await axios.delete(`${config}/${post.id}`);
    } catch (error) {
      alert('Something wrong');
      this.setState({ posts });
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
