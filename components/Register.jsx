import React from 'react';
import {
  Box,
  Button,
  Flex,
  TextInput,
  Text,
} from '@react-native-material/core';
import { Dimensions, StyleSheet } from 'react-native';
import { COLOR_PRIMARY } from '../constants';
import { useMutation } from 'react-query';

const Register = () => {
  // const register = useMutation();
  return (
    <Flex center style={{ height: Dimensions.get('window').height }}>
      <Flex inline center>
        <Text variant="h4">Or </Text>
        <Button
          compact={true}
          title="- Login"
          variant="text"
          color={COLOR_PRIMARY}
        />
      </Flex>

      <Box>
        <TextInput
          color={COLOR_PRIMARY}
          variant="outlined"
          label="email*"
          helperText="Enter your email"
          style={styles.input}
        />
      </Box>
      <Box>
        <TextInput
          color={COLOR_PRIMARY}
          variant="outlined"
          label="password*"
          helperText="must be at least 8 characters"
          style={styles.input}
          secureTextEntry={true}
        />
      </Box>
      <Box>
        <Button color={COLOR_PRIMARY} variant="outlined" title="Outlined" />
      </Box>
    </Flex>
  );
};

export default Register;

const styles = StyleSheet.create({
  input: {
    margin: 16,
    width: Dimensions.get('window').width / 1.2,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  button: {
    blurRadius: 10,
  },
});
