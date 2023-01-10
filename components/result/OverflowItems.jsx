import { View, Text, StyleSheet, Animated } from 'react-native';
import EVI from 'react-native-vector-icons/EvilIcons';

const OVERFLOW_HEIGHT = 80;
const SPACING = 10;

const OverflowItems = ({ res, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });

  return (
    <View style={styles.overflowContainer}>
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}>
        {res?.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.botanicalName}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EVI
                    name="location"
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  {item.nativeArea}
                </Text>
                <Text style={[styles.date]}>{item.bloomTime}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: '#000',
  },
  location: {
    fontSize: 16,
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#000',
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden',
  },
});

export default OverflowItems;
