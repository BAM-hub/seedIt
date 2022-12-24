import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image, useTheme, Input, Button } from '@rneui/themed';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { uploadProfileImage } from '../api/profile';
import InputPlaceholder from '../components/shared/InputPlaceHolder';
import ImageModal from '../components/shared/ImageModal';
import Avatar from '../assets/avatar.png';
import useCreateProfile from '../hooks/useCreateProfile';
import LottieAnimation from 'lottie-react-native';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const CreateProfile = ({ navigation }) => {
  const { data } = useQuery(['userProfile']);
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [tempImage, setTempImage] = useState(null);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(
    data
      ? data
      : {
          profileUserName: '',
          address: '',
          bio: '',
        },
  );

  const createProfileMutation = useCreateProfile(profile);
  console.log('profile', profile);
  const uploadImageMutation = useMutation({
    mutationKey: ['uploadImage'],
    mutationFn: () => uploadProfileImage(),
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleSubmit = () => {
    if (profile.profileUserName === '')
      return setError('Please enter your profile name');
    createProfileMutation.mutate();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
      <ProfileImage
        setShowModal={setShowModal}
        tempImage={tempImage}
        navigation={navigation}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.colors.textLightBlack,
          }}>
          Create Profile
        </Text>
        <Text style={{ fontSize: 15, color: 'grey' }}>Add your details</Text>
      </View>
      <ProfileInput profile={profile} setProfile={setProfile} error={error} />
      <Button
        title="Create Profile"
        containerStyle={{
          alignSelf: 'center',
          paddingHorizontal: 15,
          borderRadius: 30,
        }}
        buttonStyle={{
          padding: 15,
          paddingHorizontal: 30,
          backgroundColor: theme.colors.primary,
          borderRadius: 30,
        }}
        onPressIn={() => handleSubmit()}
      />
      <ImageModal
        showModal={showModal}
        setShowModal={setShowModal}
        setTempImage={setTempImage}
      />
      {/* <SnackBar /> */}
    </View>
  );
};

const ProfileImage = ({ setShowModal, tempImage, navigation }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        height: SCREEN_HEIGHT / 3,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 10, left: 10 }}>
        <Icon name="arrow-left" size={30} color={theme.colors.black} />
      </TouchableOpacity>
      <View>
        <View
          style={{
            position: 'relative',
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
            source={tempImage ? { uri: tempImage } : Avatar}
          />
          <View
            style={{
              width: SCREEN_WIDTH / 1.5,
              height: SCREEN_WIDTH / 1.5,
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 200,
              backgroundColor: '#5a5a5a7f',
            }}>
            <LottieAnimation
              style={{
                width: 200,
              }}
              autoSize
              autoPlay
              loop
              source={require('../assets/animations/uploading.json')}
            />
          </View>
        </View>
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
        </Button>
      </View>
    </View>
  );
};

const ProfileInput = ({ profile, setProfile, error }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginTop: 20,
        paddingHorizontal: 10,
      }}>
      <Input
        style={{
          padding: 15,
        }}
        onChangeText={text => setProfile({ ...profile, profileUserName: text })}
        value={profile.profileUserName}
        leftIcon={() => <InputPlaceholder text="Name:" />}
        inputContainerStyle={[
          theme.inputContainerStylePrimary,
          {
            borderColor: error ? 'red' : theme.colors.primary,
          },
        ]}
        errorMessage={error ? error : null}
        errorStyle={{ color: 'red', fontSize: 13, marginLeft: 15 }}
      />
      <Input
        style={{
          padding: 15,
        }}
        leftIcon={() => <InputPlaceholder text="Address:" />}
        inputContainerStyle={theme.inputContainerStylePrimary}
        onChangeText={text => setProfile({ ...profile, address: text })}
        value={profile.address}
      />
      <Input
        style={{
          padding: 15,
        }}
        leftIcon={() => <InputPlaceholder text="Bio:" />}
        inputContainerStyle={theme.inputContainerStylePrimary}
        onChangeText={text => setProfile({ ...profile, bio: text })}
        value={profile.bio}
      />
    </View>
  );
};

export default CreateProfile;
