import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './client';

export const createProfile = async ({ profile, token, userId }) => {
  const res = await client.post(
    'Account/createProfile',
    { ...profile, userId },
    {
      headers: {
        'x-auth-token': token,
        'x-auth-id': userId,
        'content-type': 'application/json',
      },
    },
  );
  return res;
};

export const updateProfile = async ({ profile, token, userId }) => {
  console.log({ profile, token, userId });
  const res = await client.put(`/Account/updateProfile`, profile, {
    headers: {
      'x-auth-token': token,
      'x-auth-id': userId,
    },
  });
  console.log('res', res.data);
  return res;
};

export const uploadProfileImage = async ({ image, id }) => {
  const formData = new FormData();
  formData.append('image', {
    uri: image?.uri || `file://${image.path}`,
    type:
      image.type ||
      `image/${image.path.split('.').pop()}` ||
      `image/${image.uri.split('.').pop()}`,
    name:
      image.fileName ||
      image.uri?.split('/').pop() ||
      image.path?.split('/').pop(),
  });
  console.log('formData', formData._parts);
  const token = await AsyncStorage.getItem('@token');
  // console.log('token', id);
  const res = await client.put(`/Account/Upload/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  });
  // const data = await res.json();
  // console.log('res', res.data);
  return res.data;
};

export const getProfile = async id => {
  const token = await AsyncStorage.getItem('@token');
  const res = await client.get(`/profile/getProfile/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  return res.data;
};
