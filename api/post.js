import client from './client';

export const getPosts = async () => {
  const res = await client.get('/post');
  return res.data;
};
