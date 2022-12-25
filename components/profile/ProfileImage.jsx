import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Image, useTheme, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../assets/avatar.png';
import LottieAnimation from 'lottie-react-native';
import { useMutation } from '@tanstack/react-query';
import { uploadProfileImage } from '../../api/profile';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ProfileImage = ({ setShowModal, tempImage, parent, readyToUpload }) => {
  const { theme } = useTheme();
  const {
    data: { userId },
  } = useGetAuthToken();
  const uploadImageMutation = useMutation({
    mutationKey: ['uploadImage'],
    mutationFn: () =>
      uploadProfileImage({
        image: tempImage,
        id: userId,
      }),
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleUploadImage = () => {
    console.log('uploading');
    uploadImageMutation.mutate();
  };

  return (
    <View
      style={{
        height: SCREEN_HEIGHT / 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          position: 'relative',
          borderRadius: 200,
          shadowColor: theme.colors.primary,
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,
        }}>
        <Image
          containerStyle={{
            borderRadius: 200,
            alignSelf: 'center',
            position: 'relative',
            marginHorizontal: 'auto',
            width: SCREEN_WIDTH / 1.5,
            height: SCREEN_WIDTH / 1.5,
          }}
          style={{
            borderRadius: 200,
            width: SCREEN_WIDTH / 1.5,
            height: SCREEN_WIDTH / 1.5,
          }}
          loadingIndicatorSource={LoadingAimantion}
          source={tempImage ? { uri: tempImage } : Avatar}
        />

        {uploadImageMutation.isLoading && <LoadingAimantion />}
        {parent === 'createProfile' && (
          <Button
            containerStyle={{
              borderRadius: 35,
              position: 'absolute',
              bottom: 0,
              right: -20,
              borderRadius: 100,
              flexDirection: 'row',
              alignItems: 'center',
              color: theme.colors.black,
              zIndex: 1200,
            }}
            buttonStyle={{
              borderRadius: 100,
              backgroundColor: theme.colors.white,
              padding: 5,
            }}
            titleStyle={{
              color: 'black',
            }}
            onPress={() => {
              setShowModal(true);
            }}>
            <Icon
              name="circle-edit-outline"
              size={25}
              color={theme.colors.black}
            />
            <Text>Upload</Text>
            {readyToUpload && (
              <AbsoluteWrapper backgroundColor={theme.colors.white}>
                <Button
                  containerStyle={{
                    width: '100%',
                  }}
                  buttonStyle={{
                    width: '100%',
                    backgroundColor: theme.colors.secondary,
                  }}
                  title="Confirm"
                  onPress={handleUploadImage}
                />
              </AbsoluteWrapper>
            )}
          </Button>
        )}
      </View>
    </View>
  );
};

const LoadingAimantion = () => (
  <AbsoluteWrapper>
    <LottieAnimation
      style={{
        width: 200,
      }}
      autoSize
      autoPlay
      loop
      source={require('../../assets/animations/uploading.json')}
    />
  </AbsoluteWrapper>
);

const AbsoluteWrapper = ({ children, backgroundColor }) => (
  <View
    style={{
      width: SCREEN_WIDTH / 1.5,
      height: SCREEN_WIDTH / 1.5,
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 200,
      backgroundColor: backgroundColor ? backgroundColor : '#5a5a5a7f',
    }}>
    {children}
  </View>
);

export default ProfileImage;
