import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';

const PlantCategoryScreen = ({ route }) => {
  const { category } = route.params;
  console.log({ category });
  return (
    <View>
      <SharedElement id={`item.${category.name}.photo`}>
        <Animated.Image
          source={category.image}
          style={{
            width: Dimensions.get('screen').width,
            height: 300,
            resizeMode: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      </SharedElement>
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', '#000000cd']}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: 300,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <SharedElement id={`item.${category.name}.text`}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 20,
              alignSelf: 'center',
              position: 'absolute',
              bottom: 20,
            }}>
            {category.name}
          </Text>
        </SharedElement>
      </LinearGradient>
      <SharedElement id="general.bg">
        <View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height,
            backgroundColor: 'white',
            zIndex: 100,
            transform: [{ translateY: 300 - 20 }],
            borderRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              padding: 20,
              alignSelf: 'center',
            }}>
            PlantCategoryScreen
          </Text>
        </View>
      </SharedElement>
    </View>
  );
};

PlantCategoryScreen.sharedElements = (route, otherRoute, showing) => {
  const { category } = route.params;
  return [
    { id: `item.${category.name}.photo` },
    { id: `item.${category.name}.text` },
    { id: 'general.bg' },
  ];
};

export default PlantCategoryScreen;
