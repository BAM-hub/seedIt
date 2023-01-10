import { useEffect, useRef, useState } from 'react';
import { Button } from '@rneui/themed';
import { View, Animated, ScrollView, Dimensions } from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import PlantData from '../plants/PlantData';

const { height } = Dimensions.get('screen');

const BottomSheet = ({ res, index }) => {
  const yPosition = useRef(new Animated.Value(0)).current;
  const [top, setTop] = useState(height - height / 5);
  useEffect(() => {
    Animated.spring(yPosition, {
      toValue: top,
      useNativeDriver: true,
    }).start();
  });
  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          setTop(0);
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            setTop(height - height / 5);
          }
        }}>
        <Animated.View
          style={[
            {
              height: height - 120,
              backgroundColor: '#ffffff',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              borderRadius: 20,
              borderWidth: 0.5,
              borderColor: '#d3d3d3',
            },
            { transform: [{ translateY: yPosition }] },
          ]}>
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
          <ScrollView>
            <PlantData plant={res[index]} />
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Button>Add to my Plants</Button>
            </View>
          </ScrollView>
        </Animated.View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};
export default BottomSheet;
