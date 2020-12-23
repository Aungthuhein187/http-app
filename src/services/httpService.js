import axios from 'axios';

const obj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log('Logging error', error);
    alert('An unexpected error occured');
  }

  return Promise.reject(error);
});

export default obj;
