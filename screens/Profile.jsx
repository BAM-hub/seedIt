import { View, Text } from 'react-native';
import ProfileImage from '../components/profile/ProfileImage';
import { useQuery } from '@tanstack/react-query';
import { useTheme, Button } from '@rneui/themed';
import { ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';
import LottieAnimation from 'lottie-react-native';
import useGetProfile from '../hooks/useGetProfile';
import useGetAuthToken from '../hooks/useGetAuthToken';
import useProfileStore from '../store/profileStore';

const Profile = ({ navigation }) => {
  const { theme } = useTheme();
  const profile = useProfileStore(state => state.profile);
  console.log('profile', profile);
  const { data: user } = useGetAuthToken();
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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
      <ProfileImage navigation={navigation} setShowModal={false} />
      <ProfileDetails data={profile} />
      {profile?.plants ? (
        <PlantCards plants={profile?.plants} />
      ) : (
        <NoPlantsCard />
      )}

      {user?.token && (
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
      )}
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
        {data?.profileUserName ?? 'No Name'}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: theme.colors.natural,
        }}>
        {data?.address ?? 'No Address'}
      </Text>
      <Text
        style={{
          fontSize: 15,
          color: theme.colors.natural,
        }}>
        {data?.bio ?? 'No Bio'}
      </Text>
    </View>
  );
};

const NoPlantsCard = () => {
  const { theme } = useTheme();
  return (
    <PlantCardWrapper>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <LottieAnimation
          source={require('../assets/animations/seeding.json')}
          autoPlay
          loop
          style={{
            height: '100%',
            alignSelf: 'flex-start',
          }}
        />
        <View
          style={{
            paddingHorizontal: 15,
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              width: '80%',
              height: '60%',
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.primary,
                fontWeight: 'bold',
              }}>
              No Plants to show
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.natural,
              }}>
              Add plants to your profile to show them here
            </Text>
          </View>

          <View
            style={{
              height: '40%',
              justifyContent: 'flex-end',
            }}>
            <Button
              containerStyle={{
                alignSelf: 'flex-start',
                paddingHorizontal: 7.5,
                borderRadius: 15,
              }}
              buttonStyle={{
                padding: 7.5,
                paddingHorizontal: 15,
                backgroundColor: theme.colors.primary,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontWeight: 'bold',
                }}>
                Add Plants
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </PlantCardWrapper>
  );
};

const PlantCards = ({ plants }) => {
  const { theme } = useTheme();

  return (
    <PlantCardWrapper>
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
    </PlantCardWrapper>
  );
};

const PlantCardWrapper = ({ children }) => {
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
      {children}
    </View>
  );
};

export default Profile;
