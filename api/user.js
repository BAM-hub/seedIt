import axios from 'axios';

const client = axios.create({
  baseURL: 'http://10.0.2.2:8000/api',
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  err => {
    const { status } = err.response;
    if (status === 401) {
      throw new Error('Unauthorized');
    }
  },
);

export const register = async ({ firstName, lastName, email, password }) => {
  const res = await client.post(
    '/users/CreateUser',
    JSON.stringify({
      name: firstName + ' ' + lastName,
      email,
      password,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return res;
};

//login with token
export const loginWithToken = async token => {
  const res = await client.get('/users', {
    headers: {
      'x-auth-token': token,
    },
  });
  return res.data;
};
