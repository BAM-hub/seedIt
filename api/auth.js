import axios from 'axios';

const client = axios.create({
  baseURL: 'https://bauseeditapi20221111223258.azurewebsites.net/api',
});

export const register = async ({ email, password }) => {
  try {
    const res = await client.post(
      '/Account',
      JSON.stringify({
        email,
        password_user: password,
      }),
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
