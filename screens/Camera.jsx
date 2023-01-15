import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';
import { uploadImage } from '../api/photo';
import { useMutation } from '@tanstack/react-query';
import useGetAuthToken from '../hooks/useGetAuthToken';
import AuthModal from '../components/shared/AuthModal';
import ImagePreview from '../components/camera/ImagePreview';
import CameraActions from '../components/camera/CameraActions';
import CameraSkeleton from '../components/camera/CameraSkeleton';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import useCameraStore from '../store/useCameraStore';
// needed data location { latlong, elevation} and time {date, time} and weather {temp, humidity, cloud cover, pressure, weather condition, soil type}

const CameraScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const devices = useCameraDevices();
  let device = devices.back;
  const [isActive, setIsActive] = useState(false);
  const [flash, setFlash] = useState('off');
  const [isCapturing, setIsCapturing] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [isFoucusing, setIsFoucusing] = useState(null);
  const [predication, setPredication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const camera = useRef(null);
  const { data } = useGetAuthToken();
  const { isCloseCamera, setIsCameraOpen, closeCamera } = useCameraStore();

  useEffect(() => {
    if (isCloseCamera) {
      closeCamera(false);
      navigation?.goBack();
    }
  }, [isCloseCamera]);

  useEffect(() => {
    console.log('devices', devices);
    if (data.token) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
  }, [data]);

  useEffect(() => {
    console.log('isFocused', isFocused);
    if (isFocused) {
      setIsActive(true);
      setIsCameraOpen(true);
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
      setPredication(res.predication);
      if (res.predication !== 'Somthing went wrong')
        navigation.navigate('Result', { res: res });
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
  const handleSubmmit = photo => {
    switch (route.params.parent) {
      case 'createProfile':
        break;
      case 'createPost':
        break;
      case 'profile':
      case 'MyGarden':
        mutation.mutate(photo.path);
        break;
    }
  };
  const takePhoto = async () => {
    if (isCapturing) return;
    setIsCapturing(true);
    // console.log('camera.current', camera.current.takePhoto);
    const photo = await camera.current.takePhoto({
      flash: flash,
      quality: 1,
    });
    setIsCapturing(false);

    setTempImage(`file://${photo.path}`);

    handleSubmmit(photo);
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

  if (device == null) return <CameraSkeleton />;
  if (tempImage)
    return (
      <ImagePreview
        tempImage={tempImage}
        setTempImage={setTempImage}
        setPredication={setPredication}
        predication={predication}
      />
    );

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 10,
          borderRadius: 50,
        }}
        onPress={() => navigation.goBack()}>
        <MCI name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
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
      <CameraActions
        takePhoto={takePhoto}
        setFlash={setFlash}
        flash={flash}
        setTempImage={setTempImage}
        mutation={mutation}
      />
      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

export default CameraScreen;
