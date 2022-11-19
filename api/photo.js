import axios from 'axios';

const client = axios.create({
  baseURL: 'http://10.0.2.2:8000',
});

export const uploadImage = async image => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: `file://${image.path}`,
      name: 'photo.jpg',
      filename: 'imageName.jpg',
      type: 'image/jpg',
    });

    formData.append('contetntType', 'image/jpg');
    // console.log(formData);
    const res = await client.post('/Upload_Image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPrediction = async () => {
  try {
    const res = await client.get('/predict');

    console.log('res', res.data);
  } catch (error) {
    console.log(error);
  }
};
