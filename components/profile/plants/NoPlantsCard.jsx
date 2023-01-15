import { View, Text } from 'react-native';
import { useTheme, Button } from '@rneui/themed';
import LottieAnimation from 'lottie-react-native';
import PlantCardWrapper from './PlantsCardWrapper';

const NoPlantsCard = ({ navigation }) => {
  const { theme } = useTheme();
  return (
    <PlantCardWrapper>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <LottieAnimation
          source={require('../../../assets/animations/seeding.json')}
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
              }}
              onPressIn={() =>
                navigation.navigate('Camera', {
                  parent: 'profile',
                })
              }>
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

export default NoPlantsCard;
