import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@rneui/themed';
import usePlantsStore from '../../store/plantsStore';
import { SharedElement } from 'react-navigation-shared-element';

const PlantsCatigories = ({ navigation }) => {
  const { plantsCategories } = usePlantsStore();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const { theme } = useTheme();
  const getWikiData = async plantName => {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${plantName}&prop=extracts&format=json&exintro=1`,
    );

    const data = await response.json();
    const regex = /(<([^>]+)>)/gi;
    console.log(data.query.pages);
    const formatedData = Object.keys(data.query.pages).map(key => {
      return data.query.pages[key].extract.replace(regex, '');
    });

    navigation.navigate('plantCategory', {
      category: plantName,
      plantData: formatedData,
    });
    return formatedData;
  };

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
              <SharedElement
                style={{
                  width: Dimensions.get('screen').width - 40,
                  height: 300,
                  overflow: 'hidden',
                  alignItems: 'center',
                  borderRadius: 20,
                }}
                id={`item.${item.name}.photo`}>
                <View
                  style={{
                    width: Dimensions.get('screen').width - 40,
                    height: 300,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderRadius: 20,
                    position: 'absolute',
                  }}>
                  <View
                    style={{
                      width: Dimensions.get('screen').width - 40,
                      height: 300,
                      backgroundColor: 'white',
                      borderRadius: 20,
                      position: 'absolute',
                    }}>
                    <Animated.Image
                      source={item.image}
                      style={{
                        width: Dimensions.get('screen').width - 40,
                        height: 300,
                        resizeMode: 'cover',
                        transform: [{ translateX }],
                        position: 'absolute',
                      }}
                    />
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
                        onPress={async () => {
                          // bug here please use react query instead
                          const formatedData = await getWikiData(item.name);
                          navigation.navigate('plantCategory', {
                            category: item,
                            plantData: formatedData,
                          });
                        }}
                        activeOpacity={0.8}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold',
                            padding: 20,
                            position: 'absolute',
                            bottom: 20,
                            alignSelf: 'center',
                          }}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </SharedElement>
            </View>
          );
        }}
      />
    </View>
  );
};

export default PlantsCatigories;
