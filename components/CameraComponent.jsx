import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import FlashOf from 'react-native-vector-icons/dist/Ionicons';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTheme, Skeleton } from '@rneui/themed';
// import { Stack } from '@rneui/base';
// needed data location { latlong, elevation} and time {date, time} and weather {temp, humidity, cloud cover, pressure, weather condition, soil type}

import { useIsFocused } from '@react-navigation/native';

import { uploadImage } from '../api/photo';
import { useMutation } from 'react-query';

const CameraComponent = () => {
  const isFocused = useIsFocused();
  const devices = useCameraDevices();
  let device = devices.back;
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [flash, setFlash] = useState('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [isFoucusing, setIsFoucusing] = useState(null);
  const [predication, setPredication] = useState(null);

  const camera = useRef(null);

  useEffect(() => {
    console.log('isFocused', isFocused);
    if (isFocused) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isFocused]);

  useEffect(() => {
    getCamerPermission();
  }, [getCamerPermission]);

  useEffect(() => {
    if (isFoucusing) {
      setTimeout(() => {
        setIsFoucusing(false);
      }, 500);
    }
  }, [isFoucusing]);

  const mutation = useMutation(async photo => await uploadImage(photo), {
    onSuccess: res => {
      console.log('data', res);
      setPredication(res.predication);
    },
    onError: err => {
      console.log('error', err);
    },
  });

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
    // await uploadImage(photo);
    mutation.mutate(photo.path);
    // await getPrediction();
  };
  const handleFocus = async e => {
    if (!device.supportsFocus) return;
    setIsFoucusing({
      x: e.nativeEvent.pageX,
      y: e.nativeEvent.pageY,
    });
    try {
      await camera.current.focus({
        x: e.nativeEvent.locationX,
        y: e.nativeEvent.locationY,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  if (device == null) {
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
  }
  if (tempImage) {
    return (
      <View
        style={{
          position: 'relative',
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
        {predication && (
          <View
            style={{
              bottom: Dimensions.get('window').height * 0.04,
              left: 0,
              right: 0,
              width: '100%',
              height: 50,
              backgroundColor: '#2020207e',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
              {predication}
            </Text>
          </View>
        )}
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
          <TouchableOpacity
            onPress={() => {
              setPredication('');
              setTempImage(null);
            }}>
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
        onTouchEndCapture={handleFocus}
        // format="png"
        isActive={isActive}
      />
      {isFoucusing && (
        <View
          style={{
            position: 'absolute',
            border: '1px solid white',
            borderWidth: 1,
            borderColor: 'white',
            width: 76,
            height: 76,
            borderRadius: 38,
            left: isFoucusing.x - 38,
            top: isFoucusing.y - 38,
          }}></View>
      )}
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
              if (!data.didCancel) {
                setTempImage(data.assets[0].uri);
                mutation.mutate(data.assets[0].uri);
              }
            })
          }>
          <Icon name="photo" size={30} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraComponent;
