import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { Modal, Portal, Provider } from 'react-native-paper';
import useGetAuthToken from '../hooks/useGetAuthToken';
import AuthModal from '../components/shared/AuthModal';
import useGetPosts from '../hooks/useGetPosts';
import PlantsCatigories from '../components/plants/PlantsCatigories';
import { SharedElement } from 'react-navigation-shared-element';
import Post from '../components/community/Post';
import useUserStore from '../store/userStore';
import { Image } from '@rneui/themed';
import useProfileStore from '../store/profileStore';
import useSearch from '../hooks/useSearch';

const Explore = ({ navigation }) => {
  useGetPosts();
  const { data, isLoading, isError } = useGetAuthToken();
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  // const [search, setSearch] = useState('');
  const { profile } = useProfileStore();
  const { setSearch, searchPlants } = useSearch();
  const handleSearch = () => {
    searchPlants.mutate();
    navigation.navigate('Search');
  };
  useEffect(() => {
    if (!data) {
      setShowAuthModal(true);
    }
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        position: 'relative',
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <Input
          containerStyle={{
            width: '80%',
            backgroundColor: 'white',
            height: 50,
            borderRadius: 10,
          }}
          inputContainerStyle={{
            width: '100%',
            backgroundColor: 'white',
            borderBottomWidth: 0,
            height: '100%',
          }}
          onChangeText={text => setSearch(text)}
          leftIcon={() => (
            <TouchableOpacity onPress={handleSearch}>
              <Icon name="md-search" size={30} color="black" />
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#cccccc',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {profile?.profilePicThumbnail ? (
              <Image
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 200,
                }}
                source={{ uri: profile?.profilePicThumbnail }}
              />
            ) : (
              <AntdIcon name="user" size={30} color="black" />
            )}
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View
          style={{
            marginTop: 20,
          }}>
          <PlantsCatigories navigation={navigation} />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            margin: 20,
            color: theme.colors.primary,
            alignSelf: 'center',
          }}>
          Community
        </Text>
        <Post />
        <Post />
        <Post />
      </ScrollView>
      <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />

      <ProfileModal
        setShowAuthModal={setShowAuthModal}
        showModal={showModal}
        setShowModal={setShowModal}
        navigation={navigation}
      />

      <SharedElement id="general.bg">
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            backgroundColor: 'white',
            transform: [{ translateY: Dimensions.get('screen').height }],
            borderRadius: 20,
          }}
        />
      </SharedElement>
    </View>
  );
};

const ProfileModal = ({
  showModal,
  setShowModal,
  setShowAuthModal,
  navigation,
}) => {
  const { user } = useUserStore();
  const { profile } = useProfileStore();
  const { theme } = useTheme();

  return (
    <Provider>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={{
            width: '90%',
            // height: '100%',
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 20,
            // marginTop: 70,
            marginHorizontal: 20,
            position: 'absolute',
            top: 50,
          }}>
          {user.token ? (
            <>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 20,
                  borderBottomWidth: 0.5,
                  borderBottomColor: theme.colors.accent,
                }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    // backgroundColor: 'grey',

                    borderRadius: 150,
                  }}>
                  {profile?.profilePicThumbnail ? (
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                      }}
                      source={{ uri: profile.profilePicThumbnail }}
                    />
                  ) : (
                    <View
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: '#d3d3d3',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 250,
                      }}>
                      <AntdIcon name="user" size={50} color="black" />
                    </View>
                  )}
                </View>
                <View
                  style={{
                    width: '90%',
                    alignItems: 'flex-start',
                    padding: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {profile?.profileUserName ?? user.name}
                  </Text>
                  <Text style={{ color: 'grey' }}>{user.email}</Text>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 20,
                  marginTop: 10,
                }}>
                <Text
                  style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
                  Manage Your Profile
                </Text>
                <TouchableOpacity onPress={() => navigation.push('Profile')}>
                  <AntdIcon name="right" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'lightgrey',
                  padding: 9,
                }}>
                login or register to continue
              </Text>
              <Button
                containerStyle={{
                  width: '50%',
                  borderRadius: 25,
                  backgroundColor: 'black',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  setShowModal(false);
                  setShowAuthModal(true);
                }}>
                Authenticate
              </Button>
            </View>
          )}
        </Modal>
      </Portal>
    </Provider>
  );
};
export default Explore;
