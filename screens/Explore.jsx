import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Chip, Image, Input, useTheme } from '@rneui/themed';
import Icon from 'react-native-vector-icons/Ionicons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import { Modal, Portal, Provider } from 'react-native-paper';
import useGetAuthToken from '../hooks/useGetAuthToken';
import AuthModal from '../components/shared/AuthModal';
import useGetPosts from '../hooks/useGetPosts';
import PlantsCatigories from '../components/plants/PlantsCatigories';
import { SharedElement } from 'react-navigation-shared-element';

const Explore = ({ navigation }) => {
  useGetPosts();
  const { data, isLoading, isError } = useGetAuthToken();
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      image:
        'https://i.pinimg.com/736x/47/8e/d1/478ed1fb9342c571505643a0e622c4ec.jpg',
      title: 'Getting Started',
      userName: 'John Doe',
      userImage: 'https://i.pravatar.cc/150?img=1',
      tags: ['Nature', 'Learning', 'Getting Started'],
      liked: false,
    },
    {
      id: 2,
      image:
        'https://i.pinimg.com/736x/47/8e/d1/478ed1fb9342c571505643a0e622c4ec.jpg',
      title: 'Getting Started',
      userName: 'John Doe',
      userImage: 'https://i.pravatar.cc/150?img=1',
      tags: ['Nature', 'Learning', 'Getting Started'],
      liked: true,
    },
    {
      id: 3,
      image: '',
      title: 'Getting Started',
      userName: 'John Doe',
      userImage: '',
      tags: ['Nature', 'Learning', 'Getting Started'],
      liked: true,
    },
  ]);
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
          leftIcon={() => <Icon name="md-search" size={30} color="black" />}
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
            <AntdIcon name="user" size={30} color="black" />
            {/* <Image */}
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <PlantsCatigories navigation={navigation} />
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
        {posts.map(post => (
          <View
            key={post.id}
            style={{
              marginTop: 20,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              backgroundColor: 'white',
              width: '90%',
              // alignSelf: 'flex-end',
              alignSelf: 'center',
              // marginRight: -20,
              borderRadius: 10,
              padding: 15,
              flexDirection: 'row',
              height: 250,
            }}>
            <View
              style={{
                height: '100%',
                justifyContent: 'space-around',
                width: '40%',
              }}>
              {post.liked ? (
                <TouchableOpacity>
                  <AntdIcon
                    name="heart"
                    size={30}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <AntdIcon
                    name="hearto"
                    size={30}
                    color={theme.colors.primary}
                  />
                </TouchableOpacity>
              )}

              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                }}>
                {post.title}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#cccccc',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {post.userImage ? (
                    <Image
                      source={{ uri: post.userImage }}
                      style={{ width: 40, height: 40, borderRadius: 50 }}
                    />
                  ) : (
                    <AntdIcon name="user" size={30} color="black" />
                  )}
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: theme.colors.primary,
                    marginLeft: 5,
                  }}>
                  {post.userName}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: 200,
                height: 200,
                // backgroundColor: 'red',
                alignItems: 'flex-end',
                // marginRight: -20,
              }}>
              {post.image ? (
                <Image
                  source={{
                    uri: `${post.image}`,
                  }}
                  containerStyle={{
                    width: 200,
                    height: 200,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  PlaceholderContent={<Text>Loading...</Text>}
                />
              ) : (
                <View
                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'grey',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: theme.colors.primary,
                      alignSelf: 'center',
                    }}>
                    No IMAGE
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <AuthModal showModal={showAuthModal} setShowModal={setShowAuthModal} />

      <ProfileModal showModal={showModal} setShowModal={setShowModal} />

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

const ProfileModal = ({ showModal, setShowModal }) => (
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
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
          }}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'grey',
              borderRadius: 50,
            }}>
            {/* <Image */}
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
              BAM 99
            </Text>
            <Text style={{ color: 'grey' }}>bsharamin12@gmail.com</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
          }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
            Manage Your Profile
          </Text>
        </View>
      </Modal>
    </Portal>
  </Provider>
);

export default Explore;
