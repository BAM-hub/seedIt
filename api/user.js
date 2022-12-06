import client from './client';

export const register = async ({ firstName, lastName, email, password }) => {
  const res = await client.post(
    '/users/CreateUser',
    JSON.stringify({
      name: firstName + ' ' + lastName,
      email,
      password,
    }),
  );
  return res.data;
};

//login
export const login = async (email, password) => {
  const res = await client.post(
    '/users/Login',
    JSON.stringify({
      email,
      password,
    }),
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
