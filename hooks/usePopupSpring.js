import { useLayoutEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

export default usePopUpSpring = showModal => {
  const offset = useSharedValue(20 * 255);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(offset.value, {
            damping: 40,
            stiffness: 100,
          }),
        },
      ],
    };
  }, [offset]);

  useLayoutEffect(() => {
    setTimeout(() => {
      offset.value = 0;
    }, 200);
    return () => {
      offset.value = 500;
    };
  }, [showModal]);

  return animatedStyles;
};
