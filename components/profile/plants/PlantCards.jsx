import { View, Text, ScrollView, ImageBackground } from 'react-native';
import PlantCardWrapper from './PlantsCardWrapper';
import { useTheme } from '@rneui/themed';

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

export default PlantCards;
