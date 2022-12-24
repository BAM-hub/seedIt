import AsyncStorage from '@react-native-async-storage/async-storage';
import client from './client';

export const createProfile = async profile => {
  const token = await AsyncStorage.getItem('@token');
  const res = await client.post('/profile/CreateProfile', profile, {
    headers: {
      'x-auth-token': token,
    },
  });
  return res;
};

export const uploadProfileImage = async (image, id) => {
  const formData = new FormData();
  formData.append('image', image);
  const token = await AsyncStorage.getItem('@token');
  const res = await client.post(`/profile/UploadProfileImage/${id}`, formData, {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'multipart/form-data',
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
