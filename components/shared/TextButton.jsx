import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const TextButton = ({ props: { title, color, textColor, callback } }) => {
  return (
    <TouchableOpacity
      onPress={callback}
      style={{ ...styles.input, borderColor: color }}>
      <Text style={{ ...styles.text, color: textColor }}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 100,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default TextButton;
