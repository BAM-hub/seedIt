import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import PlantCardWrapper from './PlantsCardWrapper';
import { useTheme } from '@rneui/themed';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const PlantCards = ({ plants, setActivePlant }) => {
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
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            width: 100,
            margin: 10,
            backgroundColor: theme.colors.secondary,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MCI name="plus" size={40} color={theme.colors.white} />
          <Text style={{ color: theme.colors.white }}> Add a plant</Text>
        </TouchableOpacity>
        {plants.map((plant, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: 100,
              margin: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              alignItems: 'center',
              overflow: 'hidden',
            }}
            activeOpacity={0.5}
            onPress={() => setActivePlant(plant)}>
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
                  {plant.commonName}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </PlantCardWrapper>
  );
};

export default PlantCards;
