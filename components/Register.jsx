import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  TextInput,
  Text,
} from '@react-native-material/core';
import { Dimensions, StyleSheet } from 'react-native';
import {
  COLOR_PRIMARY,
  COLOR_ACCENT,
  COLOR_COMPLEMENTARY,
  MOCK_SERVER_URL,
} from '../config';
import { useMutation, useQueryClient } from 'react-query';
import reactNativeAxios from 'react-native-axios';

const Register = ({ toggleActive }) => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mutation = useMutation(() => {
    return queryClient.fetchQuery('register', () => {
      return reactNativeAxios.post(`${MOCK_SERVER_URL}/User`, {
        email,
        password,
      });
    });
  });

  if (mutation.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (mutation.isError) {
    return <Text>Error</Text>;
  }
  if (mutation.isSuccess) {
    return <Text>Success</Text>;
  }

  return (
    <Flex center style={{ height: Dimensions.get('window').height }}>
      <Flex inline center>
        <Text variant="h4">Or </Text>
        <Button
          compact={true}
          title="- Login"
          variant="text"
          color={COLOR_COMPLEMENTARY}
          onPress={() => toggleActive('login')}
        />
      </Flex>

      <Box>
        <TextInput
          color={COLOR_PRIMARY}
          variant="outlined"
          label="email*"
          helperText="Enter your email"
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
        />
      </Box>
      <Box>
        <Button
          color={COLOR_COMPLEMENTARY}
          title="Register"
          onPress={() => {
            mutation.mutate();
          }}
        />
      </Box>
    </Flex>
  );
};

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

export default Register;
