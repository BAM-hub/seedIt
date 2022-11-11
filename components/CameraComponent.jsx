import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FlashOf from 'react-native-vector-icons/dist/Ionicons';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme, Skeleton } from '@rneui/themed';
// import { Stack } from '@rneui/base';
// needed data location { latlong, elevation} and time {date, time} and weather {temp, humidity, cloud cover, pressure, weather condition, soil type}

const CameraComponent = () => {
  const [flash, setFlash] = useState('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const { theme } = useTheme();
  const devices = useCameraDevices();
  const device = devices.back;
  const [tempImage, setTempImage] = useState(null);

  const camera = useRef(null);

  useEffect(() => {
    getCamerPermission();
  }, [getCamerPermission]);

  const getCamerPermission = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    console.log('cameraPermission', cameraPermission);
    if (cameraPermission !== 'authorized')
      var permission = await Camera.requestCameraPermission();
    // if (permission !== 'authorized') return; //redirect here in the futuer
  };

  const takePhoto = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    const photo = await camera.current.takePhoto({
      flash: flash,
      quality: 1,
    });
    setTempImage(`file://${photo.path}`);
    setIsCapturing(false);
    const formData = new FormData();
    formData.append('image', {
      uri: `file://${photo.path}`,
      name: 'photo.png',
      filename: 'imageName.png',
      type: 'image/png',
    });
    formData.append('contetntType', 'image/png');
    await fetch('http://10.0.2.2:8000/Upload_Image', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        console.log('formData', formData);
      });
    await fetch('http://10.0.2.2:8000/predict')
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
      })
      .catch(err => console.log(err));
  };

  const handleFocus = async e => {
    console.log('e', 'focusing');
    await camera.current.focus({
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
    });
  };
  if (!device)
    return (
      <View
        style={{
          alignItems: 'center',
          // justifyContent: 'space-between',
          backgroundColor: theme.colors.white,
        }}>
        <View
          style={{
            height: '70%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Skeleton animation="none" width={300} height={300} circle />
        </View>
        <View
          style={{
            height: '30%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-end',
            paddingBottom: 20,
            justifyContent: 'space-evenly',
          }}>
          <Skeleton animation="none" width={40} height={40} />
          <Skeleton animation="none" width={80} height={80} circle />
          <Skeleton animation="none" width={40} height={40} />
        </View>
      </View>
    );

  if (tempImage) {
    return (
      <View
        style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.naturalComplement,
        }}>
        <Image
          source={{
            uri: tempImage,
          }}
          style={{ width: '90%', height: '70%' }}
        />
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
            width: '100%',
            padding: 10,
          }}>
          <TouchableOpacity>
            <Icon name="check" size={50} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTempImage(null)}>
            <Icon name="times" size={50} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={{ position: 'relative' }}>
      <Camera
        style={{ Dimensions: '100%', height: '100%' }}
        ref={camera}
        photo={true}
        device={device}
        isActive={true}
        // onPress={e => handleFocus(e)}
        format="png"
      />
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          alignItems: 'center',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          onPress={() => setFlash(flash === 'on' ? 'off' : 'on')}>
          <View
            style={{
              width: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {flash === 'on' ? (
              <Icon name="flash" size={30} color={theme.colors.white} />
            ) : (
              <FlashOf name="flash-off" size={30} color={theme.colors.white} />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takePhoto}
          style={{
            width: 100,
            height: 100,
            right: 'auto',
            borderColor: theme.colors.accent,
            borderWidth: 1,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: theme.colors.secondary,
              width: '80%',
              height: '80%',
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="camera" size={50} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            launchImageLibrary({}, data => {
              if (!data.didCancel) setTempImage(data.assets[0].uri);
            })
          }>
          <Icon name="photo" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraComponent;
