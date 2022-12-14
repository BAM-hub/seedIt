import { View, Text, Dimensions } from 'react-native';
import ProfileImage from '../components/profile/ProfileImage';
import { useTheme, Button } from '@rneui/themed';
import useGetAuthToken from '../hooks/useGetAuthToken';
import useProfileStore from '../store/profileStore';
import NoPlantsCard from '../components/profile/plants/NoPlantsCard';
import PlantCards from '../components/profile/plants/PlantCards';

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
        height: '100%',
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
        height: Dimensions.get('window').height / 6,
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

export default Profile;
