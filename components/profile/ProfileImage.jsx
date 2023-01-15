import { View, Text, Dimensions } from 'react-native';
import { Image, useTheme, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../assets/avatar.png';
import LottieAnimation from 'lottie-react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProfileImage } from '../../api/profile';
import useProfileStore from '../../store/profileStore';
import useUserStore from '../../store/userStore';
import { useEffect } from 'react';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ProfileImage = ({ setShowModal, parent, navigation }) => {
  const { theme } = useTheme();
  const { profile, uploadingImage, updateProfileImage, resetUploadingImage } =
    useProfileStore();
  const {
    user: { id },
  } = useUserStore();

  const { localImage, localImageURI, readyToUpload } = uploadingImage;

  const uploadImageMutation = useMutation({
    mutationKey: ['uploadImage'],
    mutationFn: () =>
      uploadProfileImage({
        image: localImage,
        id: id,
      }),
    onSuccess: ({ data }) => {
      updateProfileImage(data);
      navigation.goBack();
    },
    onError: () => {},
  });

  const handleUploadImage = () => {
    uploadImageMutation.mutate();
  };

  useEffect(() => {
    return () => {
      resetUploadingImage();
    };
  }, []);

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
            width: SCREEN_WIDTH / 1.8,
            height: SCREEN_WIDTH / 1.8,
          }}
          style={{
            borderRadius: 200,
            width: SCREEN_WIDTH / 1.8,
            height: SCREEN_WIDTH / 1.8,
          }}
          loadingIndicatorSource={LoadingAimantion}
          source={
            localImageURI
              ? { uri: localImageURI }
              : profile?.profilePic
              ? { uri: profile?.profilePic }
              : Avatar
          }
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
      width: SCREEN_WIDTH / 1.8,
      height: SCREEN_WIDTH / 1.8,
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
