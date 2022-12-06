import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@rneui/themed';

const InputPlaceholder = ({ text }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        marginLeft: 15,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.colors.secondary,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default InputPlaceholder;
