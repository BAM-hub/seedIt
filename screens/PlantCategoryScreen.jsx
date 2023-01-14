import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import { useTheme } from '@rneui/themed';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRef, useState, useEffect } from 'react';
import { FlingGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/flingGesture';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { Image } from '@rneui/themed';

const PlantCategoryScreen = ({ route, navigation }) => {
  const { category, plantData } = route.params;
  const [top, setTop] = useState(300 - 20);
  const yPostion = useRef(new Animated.Value(300 - 20)).current;
  const { theme } = useTheme();
  useEffect(() => {
    Animated.spring(yPostion, {
      toValue: top,
      useNativeDriver: true,
    }).start();
  });
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
      <SharedElement
        id="general.bg"
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height - 60,
          backgroundColor: 'transparent',
          borderRadius: 20,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height - 60,
            backgroundColor: 'white',
            transform: [{ translateY: yPostion }],
            borderRadius: 20,
          }}>
          <FlingGestureHandler
            direction={Directions.UP}
            onHandlerStateChange={ev => {
              if (ev.nativeEvent.state === State.END) {
                setTop(0);
              }
            }}>
            <FlingGestureHandler
              direction={Directions.DOWN}
              onHandlerStateChange={ev => {
                if (ev.nativeEvent.state === State.END) {
                  setTop(300 - 20);
                }
              }}>
              <View
                style={{
                  height: 20,
                  width: '90%',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#d3d3d3',
                }}>
                <View
                  style={{
                    width: 40,
                    height: 5,
                    backgroundColor: '#d3d3d3',
                    borderRadius: 5,
                    alignSelf: 'center',
                  }}
                />
              </View>
            </FlingGestureHandler>
          </FlingGestureHandler>
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
          <ScrollView
            style={{
              height: 20,
              marginBottom: 20,
              width: '90%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.secondary,
                alignSelf: 'center',
                letterSpacing: 1,
                lineHeight: 20,
                overflow: 'hidden',
              }}>
              {plantData[0].trim()}
            </Text>
          </ScrollView>
          <View style={{ height: 59 }} />
        </Animated.View>
      </SharedElement>
    </View>
  );
};

const mightUse = () => (
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
    <MCI name="flower" size={30} color={theme.colors.white} />\
  </View>
);

export default PlantCategoryScreen;
