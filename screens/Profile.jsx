import { View, Text } from 'react-native';
import React from 'react';
import ProfileImage from '../components/profile/ProfileImage';
import { useQuery } from '@tanstack/react-query';
import { useTheme, Button } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';

const Profile = ({ navigation }) => {
  const { theme } = useTheme();
  const { data } = useQuery(['userProfile']);
  const plants = [
    {
      name: 'Plant 1',
      image: 'https://picsum.photos/200',
    },
    {
      name: 'Plant 2',
      image: 'https://picsum.photos/200',
    },
    {
      name: 'Plant 3',
      image: 'https://picsum.photos/200',
    },
    {
      name: 'Plant 4',
      image: 'https://picsum.photos/200',
    },
    {
      name: 'Plant 5',
      image: 'https://picsum.photos/200',
    },
  ];
  console.log('data', data);
  // no gaback here
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
      <ProfileImage
        navigation={navigation}
        setShowModal={false}
        imageURI={data.profilePic}
      />
      <ProfileDetails data={data} />
      <PlantCards plants={plants} />
      <Button
        onPress={() => navigation.navigate('createProfile')}
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
        title="Edit Profile"
      />
    </View>
  );
};

const ProfileDetails = ({ data }) => {
  console.log('this', data);
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: '#fff',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
        padding: 10,
        paddingVertical: 20,
        flex: 0.3,
        justifyContent: 'space-evenly',
        shadowColor: theme.colors.primary,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      }}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}>
        {data?.profileUserName}
      </Text>
      <Text
        style={{
          fontSize: 20,
          // fontWeight: 'light',
          color: theme.colors.natural,
        }}>
        {data?.address}
      </Text>
      <Text
        style={{
          fontSize: 15,
          // fontWeight: 'light',
          color: theme.colors.natural,
        }}>
        {data?.bio}
      </Text>
    </View>
  );
};

const PlantCards = ({ plants }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 0.4,
        width: '95%',
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        paddingVertical: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: theme.colors.primary,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      }}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.colors.primary,
        }}>
        Plants
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {plants.map((plant, index) => (
          <View
            key={index}
            style={{
              width: 100,
              margin: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              overflow: 'hidden',
            }}>
            <ImageBackground
              key={index}
              source={{ uri: plant.image }}
              style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                objectFit: 'cover',
              }}>
              <View
                style={{
                  backgroundColor: '#00000071',
                  width: '100%',
                  height: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  bottom: 0,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {plant.name}
                </Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
export default Profile;
