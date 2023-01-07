import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { useTheme } from '@rneui/themed';
import usePlantsStore from '../../store/plantsStore';
import { SharedElement } from 'react-navigation-shared-element';

const PlantsCatigories = ({ navigation }) => {
  const { plantsCategories } = usePlantsStore();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  // const getWikiData = async () => {
  //   const response = await fetch(
  //     `https://en.wikipedia.org/w/api.php?action=query&titles=${plantsCategories[0].name}&prop=extracts&format=json&exintro=1`,
  //   );

  //   const data = await response.json();
  //   const regex = /(<([^>]+)>)/gi;
  //   console.log(data.query.pages);
  //   const formatedData = Object.keys(data.query.pages).map(key => {
  //     return data.query.pages[key].extract.replace(regex, '');
  //   });

  //   console.log({ formatedData });
  // };

  // useEffect(() => {
  //   getWikiData();
  // }, []);

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingVertical: 20,
        width: '100%',
        borderRadius: 20,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.colors.primary,
          paddingHorizontal: 20,
          marginBottom: 10,
          alignSelf: 'center',
        }}>
        Explore Plants
      </Text>
      <Animated.FlatList
        data={plantsCategories}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => {
          const width = Dimensions.get('screen').width;
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-width * 0.7, 0, width * 0.7],
          });
          return (
            <View
              style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 250,
                  height: 300,
                  overflow: 'hidden',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { backgroundColor: 'white' },
                  ]}
                />
                <SharedElement
                  style={{
                    width: 250 * 1.4,
                    height: 300,
                  }}
                  id={`item.${item.name}.photo`}>
                  <Animated.Image
                    source={item.image}
                    style={{
                      width: 250 * 1.4,
                      height: 300,
                      resizeMode: 'cover',
                      transform: [{ translateX }],
                      position: 'absolute',
                    }}
                  />
                </SharedElement>
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('plantCategory', {
                        category: item,
                      });
                    }}
                    activeOpacity={0.8}>
                    <SharedElement id={`item.${item.name}.text`}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                          padding: 20,
                          position: 'absolute',
                          bottom: 0,
                          alignSelf: 'center',
                        }}>
                        {item.name}
                      </Text>
                    </SharedElement>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

PlantsCatigories.sharedElements = (route, otherRoute, showing) => {
  const { plantsCategories } = usePlantsStore();
  return [
    ...plantsCategories.map(item => `item.${item.name}.photo`),
    ...plantsCategories.map(item => `item.${item.name}.text`),
  ];
};

export default PlantsCatigories;
