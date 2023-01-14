import { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme, Input, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import InputPlaceholder from '../components/shared/InputPlaceHolder';
import ImageModal from '../components/shared/ImageModal';
import ProfileImage from '../components/profile/ProfileImage';
import SnackBar from '../components/shared/SnackBar';
import useMutateProfile from '../hooks/useMutateProfile';
import LottieAnimation from 'lottie-react-native';
import useProfileStore from '../store/profileStore';

const CreateProfile = ({ navigation }) => {
  const { profile: cahcedProfile } = useProfileStore();
  const { theme } = useTheme();
  const [readyToUpload, setReadyToUpload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(cahcedProfile);
  const [error, setError] = useState(null);

  const { mutateProfile, isLoading } = useMutateProfile(
    profile,
    cahcedProfile?.profileUserName ? 'update' : 'create',
    () => navigation.goBack(),
  );

  const handleSubmit = () => {
    if (profile?.profileUserName === '')
      return setError('Please enter your profile name');
    mutateProfile();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ position: 'absolute', top: 10, left: 10 }}>
        <Icon name="arrow-left" size={30} color={theme.colors.black} />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 30,
        }}>
        <ProfileImage
          setShowModal={setShowModal}
          parent="createProfile"
          readyToUpload={readyToUpload}
          navigation={navigation}
        />
      </View>

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
          {profile?.id ? 'Update Profile' : 'Create Profile'}
        </Text>
        <Text style={{ fontSize: 15, color: 'grey' }}>Add your details</Text>
      </View>
      <ProfileInput profile={profile} setProfile={setProfile} error={error} />
      <Button
        title={profile?.id ? 'Update Profile' : 'Create Profile'}
        containerStyle={{
          alignSelf: 'center',
          paddingHorizontal: 15,
          borderRadius: 30,
          marginBottom: 40,
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
        navigation={navigation}
        parent="createProfile"
        callback={() => setReadyToUpload(true)}
      />
      {isLoading && <LoadingOverlay />}
      {/* <SnackBar /> */}
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
        value={profile?.profileUserName}
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
        value={profile?.address}
      />
      <Input
        style={{
          padding: 15,
        }}
        leftIcon={() => <InputPlaceholder text="Bio:" />}
        inputContainerStyle={theme.inputContainerStylePrimary}
        onChangeText={text => setProfile({ ...profile, bio: text })}
        value={profile?.bio}
      />
    </View>
  );
};

const LoadingOverlay = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: Dimensions.get('window').height,
      backgroundColor: '#ffffff7c',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        position: 'absolute',
        top: 0,
        height: '70%',
      }}>
      <LottieAnimation
        source={require('../assets/animations/DecorePlant.json')}
        autoPlay
        loop
        style={{
          height: '100%',
          width: '100%',
        }}
        speed={1.5}
      />
    </View>
  </View>
);

export default CreateProfile;
