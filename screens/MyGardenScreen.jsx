import { View, Text, Dimensions, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import useProfileStore from '../store/profileStore';
import { Image, useTheme, ListItem } from '@rneui/themed';
import useUserStore from '../store/userStore';
import NoPlantsCard from '../components/profile/plants/NoPlantsCard';
import PlantCards from '../components/profile/plants/PlantCards';
import useCloseCamera from '../hooks/useCloseCamera';

const { width, height } = Dimensions.get('window');
const SPACE = 15;

const MyGardenScreen = ({ navigation }) => {
  const { profile } = useProfileStore();
  const { user } = useUserStore();
  const { theme } = useTheme();
  useCloseCamera(navigation);

  const plants = [
    {
      id: 1,
      plantType: 'Succulent',
      matureSize: 'up to 1 foot',
      commonName: 'Aloe Vera',
      botanicalName: 'Aloe Vera',
      family: 'Liliaceae',
      size: 'Small',
      soilType: 'Loamy',
      siolPH: '6.5-7.5',
      hardinessZones: '10-11',
      nativeArea: 'Africa',
      image: 'https://picsum.photos/200',
      matureSize: 'up to 1 foot',
      matureSize: 'up to 1 foot',
      bloomTime: 'Spring',
      flowerColor: 'Red',
      toxicity: 'Non-Toxic',
    },
    {
      id: 2,
      plantType: 'annual',
      matureSize: 'up to 1 foot',
      commonName: 'aloe',
      botanicalName: 'aloe',
      family: 'Liliaceae',
      size: 'Small',
      soilType: 'Loamy',
      siolPH: '6.5-7.5',
      hardinessZones: '10-11',
      nativeArea: 'Africa',
      image: 'https://picsum.photos/300',
      matureSize: 'up to 1 foot',
      bloomTime: 'Spring',
      flowerColor: 'Red',
      toxicity: 'Non-Toxic',
    },
  ];
  const [activePlant, setActivePlant] = useState(plants[0]);

  return (
    <ScrollView>
      <Gap />
      <ProfileBanner />
      <Gap />
      <PlantSummary plant={activePlant} />
      <Gap />
      {plants ? (
        <PlantCards plants={plants} setActivePlant={setActivePlant} />
      ) : (
        <NoPlantsCard />
      )}
      <Gap />
      <PlantData plant={activePlant} />
      <Gap />
    </ScrollView>
  );
};

const Gap = () => (
  <View
    style={{
      width: '100%',
      height: 20,
    }}
  />
);

const ProfileBanner = () => {
  const { profile } = useProfileStore();
  const { user } = useUserStore();
  const { theme } = useTheme();
  return (
    <View
      style={{
        // flex: 0.2,
        flexDirection: 'row',
        padding: SPACE,
        backgroundColor: theme.colors.white,
        width: '90%',
        alignSelf: 'center',
        marginTop: SPACE,
        borderRadius: 10,
        shadowColor: theme.colors.primary,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      }}>
      <Image
        source={{ uri: profile.profilePicThumbnail }}
        style={{
          width: width / 8,
          height: width / 8,
          resizeMode: 'cover',
          borderRadius: width / 16,
        }}
      />
      <View
        style={{
          paddingHorizontal: SPACE,
          justifyContent: 'space-evenly',
        }}>
        <Text
          style={{
            fontSize: SPACE,
            color: theme.colors.primary,
          }}>
          {profile.profileUserName}
        </Text>
        <Text
          style={{
            fontSize: SPACE / 1.5,
            color: theme.colors.secondary,
          }}>
          Joind: {new Date(user.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

const PlantSummary = ({ plant }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
      }}>
      <Image
        source={{ uri: plant.image }}
        style={{
          width: width / 1.8,
          height: width / 1.8,
          resizeMode: 'cover',
          borderRadius: 10,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          alignSelf: 'center',
        }}
      />
      <View
        style={{
          backgroundColor: theme.colors.white,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 10,
          padding: SPACE,
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
            fontSize: 20,
            color: theme.colors.primary,
            textAlign: 'center',
          }}>
          {plant.commonName}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: theme.colors.secondary,
            textAlign: 'center',
          }}>
          {plant.botanicalName}
        </Text>
      </View>
    </View>
  );
};

const PlantData = ({ plant }) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
      }}>
      <ListItem.Accordion
        content={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>Plant Data</Text>
          </View>
        }
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: 10,
          alignItems: 'center',
        }}
        isExpanded={isExpanded}
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}>
        {Object.keys(plant).map((key, index) => (
          <DataRow
            key={`${key}_${index}`}
            label={key}
            value={plant[key]}
            index={index}
          />
        ))}
      </ListItem.Accordion>
    </View>
  );
};

const DataRow = ({ label, value, index }) => {
  const formatedLabel = label
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();

  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: SPACE / 2,
        borderRadius: 10,
        marginVertical: SPACE / 2,
        backgroundColor:
          index % 2 === 0 ? theme.colors.white : theme.colors.naturalComplement,
      }}>
      <View
        style={{
          width: '50%',
          paddingHorizontal: SPACE,
        }}>
        <Text
          style={{
            padding: SPACE / 2,
            fontSize: SPACE,
            color: theme.colors.primary,
          }}>
          {formatedLabel}
        </Text>
      </View>
      <View
        style={{
          width: '50%',
          paddingHorizontal: SPACE,
        }}>
        <Text
          style={{
            padding: SPACE / 2,
            fontSize: SPACE,
            color: theme.colors.primary,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default MyGardenScreen;
