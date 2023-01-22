import client from './client';

export const register = async ({ firstName, lastName, email, password }) => {
  const res = await client.post('/Account', {
    name: firstName + ' ' + lastName,
    email,
    password,
  });
  return res;
};

//login
export const login = async (email, password) => {
  const res = await client.post(
    '/Account/login',
    JSON.stringify({
      email,
      password,
    }),
  );
  return res;
};

//login with token
export const loginWithToken = async token => {
  console.log('token', token);
  const res = await client.post(
    '/Auth/refresh-token',
    {},
    {
      headers: {
        'x-auth-token': `${token}`,
      },
    },
  );
  console.log('res', res.data);

  return res.data;
};
