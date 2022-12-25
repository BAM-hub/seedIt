import axios from 'axios';

const client = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  err => {
    const { status } = err.response;
    console.log({ status });
    if (status === 401) {
      throw new Error('Unauthorized');
    }
    if (status === 500) {
      throw new Error('Server Error');
    }
    if (status === 401) {
      throw new Error('Not Found');
    }
  },
);

export default client;
