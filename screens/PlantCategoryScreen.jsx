import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import { useTheme } from '@rneui/themed';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const PlantCategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.secondary,
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          zIndex: 100,
        }}
        onPress={() => navigation.goBack()}>
        <MCI name="arrow-left" size={30} color="white" />
      </TouchableOpacity>
      <SharedElement
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          alignSelf: 'center',
        }}
        id={`item.${category.name}.photo`}>
        <Animated.View
          style={{
            width: Dimensions.get('screen').width - 40,
            borderRadius: 20,
            height: 300,
            resizeMode: 'cover',
            overflow: 'hidden',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: Dimensions.get('screen').width - 40,
              borderRadius: 20,
              height: 300,
              backgroundColor: 'white',
              borderRadius: 20,
              position: 'absolute',
            }}>
            <Animated.Image
              source={category.image}
              style={{
                width: Dimensions.get('screen').width - 40,
                height: 300,
                resizeMode: 'cover',
                position: 'absolute',
              }}
            />
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
              <TouchableOpacity>
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
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </Animated.View>
      </SharedElement>
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
              color: theme.colors.primary,
            }}>
            Family Summary
          </Text>
          <View
            animation="fadeInUp"
            delay={2000}
            style={{
              backgroundColor: theme.colors.primary,
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MCI name="flower" size={30} color={theme.colors.white} />
          </View>
        </View>
      </SharedElement>
    </View>
  );
};

export default PlantCategoryScreen;
