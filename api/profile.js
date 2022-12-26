import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './client';

export const createProfile = async ({ profile, token, userId }) => {
  const res = await client.post('/profile/CreateProfile', profile, {
    headers: {
      'x-auth-token': token,
      'x-auth-id': userId,
    },
  });
  return res;
};

export const updateProfile = async ({ profile, token, userId }) => {
  console.log({ profile, token, userId });
  const res = await client.put(
    `/profile/UpdateProfile/${profile.id}`,
    profile,
    {
      headers: {
        'x-auth-token': token,
        'x-auth-id': userId,
      },
    },
  );
  return res;
};

export const uploadProfileImage = async ({ image, id }) => {
  const formData = new FormData();
  formData.append('image', {
    uri: image.uri,
    type: image.type,
    name: image.fileName || image.uri.split('/').pop(),
  });

  const token = await AsyncStorage.getItem('@token');
  const res = await client.post(`/profile/UploadProfileImage/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  });
  return res;
};

export const getProfile = async id => {
  const token = await AsyncStorage.getItem('@token');
  const res = await client.get(`/profile/getProfile/${id}`, {
    headers: {
      'x-auth-token': token,
    },
  });
  console.log({ res });
  return res.data;
};
