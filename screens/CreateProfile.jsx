import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image, useTheme, Input, Button } from '@rneui/themed';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createProfile } from '../api/profile';
import { uploadProfileImage } from '../api/profile';
import InputPlaceholder from '../components/shared/InputPlaceHolder';
import ImageModal from '../components/shared/ImageModal';
import Avatar from '../assets/avatar.png';
import { useEffect } from 'react';

const CreateProfile = ({ navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [tempImage, setTempImage] = useState(null);
  const createProfileMutation = useMutation({
    mutationKey: ['createProfile'],
    mutationFn: () =>
      createProfile({
        profileUserName: 'name',
        address: 'address',
        bio: 'i am a bio',
        token: queryClient.getQueryData(['userAuth']).token,
        userId: queryClient.getQueryData(['userAuth']).userId,
      }),
    onSuccess: data => {
      navigation.goBack();
      queryClient.setQueryData(['userProfile'], data.data);
    },
    onError: () => {
      console.log('error');
    },
  });

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
    console.log('submit');
    createProfileMutation.mutate();
  };
  useEffect(() => {
    console.log(tempImage);
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          height: Dimensions.get('screen').height / 3,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', top: 10, left: 10 }}>
          <Icon name="arrow-left" size={30} color={theme.colors.black} />
        </TouchableOpacity>
        <View>
          <Image
            containerStyle={{
              borderRadius: 200,
              alignSelf: 'center',
              marginHorizontal: 'auto',
              width: Dimensions.get('screen').width / 1.5,
              height: Dimensions.get('screen').width / 1.5,
            }}
            style={{
              borderRadius: 200,
              width: Dimensions.get('screen').width / 1.5,
              height: Dimensions.get('screen').width / 1.5,
            }}
            source={tempImage ? { uri: tempImage } : Avatar}
          />
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
            onPress={() => setShowModal(true)}>
            <Icon
              name="circle-edit-outline"
              size={25}
              color={theme.colors.black}
            />{' '}
            Upload
          </Button>
        </View>
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
          Create Profile
        </Text>
        <Text style={{ fontSize: 15, color: 'grey' }}>Add your details</Text>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 10,
        }}>
        <Input
          style={{
            padding: 15,
          }}
          leftIcon={() => <InputPlaceholder text="Name:" />}
          inputContainerStyle={theme.inputContainerStylePrimary}
        />
        <Input
          style={{
            padding: 15,
          }}
          leftIcon={() => <InputPlaceholder text="Address:" />}
          inputContainerStyle={theme.inputContainerStylePrimary}
        />
        <Input
          style={{
            padding: 15,
          }}
          leftIcon={() => <InputPlaceholder text="Bio:" />}
          inputContainerStyle={theme.inputContainerStylePrimary}
        />
      </View>
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
    </View>
  );
};

export default CreateProfile;
