import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Image } from '@rneui/themed';
import {
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from '../components/result/BottomSheet';
import OverflowItems from '../components/result/OverflowItems';

const { width } = Dimensions.get('screen');

const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const ResultScreen = ({ route, navigation }) => {
  const { res } = route.params;
  console.log(res);
  const scrollXIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  const setActiveIndex = useCallback(activeIndex => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  return (
    <SafeAreaView
      style={{
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => navigation.goBack()}>
        <MCI name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <OverflowItems res={res} scrollXAnimated={scrollXAnimated} />
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (index === res.length - 1) return;

            setActiveIndex(index + 1);
          }
        }}>
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={ev => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) return;

              setActiveIndex(index - 1);
            }
          }}>
          <FlatList
            data={res}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: res.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: (-ITEM_WIDTH / 2) * 0.8,
                    transform: [{ translateX }, { scale }],
                    opacity,
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: ITEM_WIDTH * 0.8,
                      height: ITEM_HEIGHT * 0.8,
                    }}
                  />
                </Animated.View>
              );
            }}
          />
        </FlingGestureHandler>
      </FlingGestureHandler>
      <BottomSheet res={res} index={index} />
    </SafeAreaView>
  );
};

export default ResultScreen;
