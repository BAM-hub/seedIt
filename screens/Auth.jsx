import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import {
  Box,
  Button,
  Flex,
  TextInput,
  Text,
} from '@react-native-material/core';
import { Dimensions, StyleSheet, ImageBackground } from 'react-native';
import background from '../assets/background.jpg';

import { COLOR_PRIMARY } from '../constants';

const Auth = () => {
  const [active, setActive] = useState(null);
  return (
    <Flex center style={{ height: Dimensions.get('window').height }}>
      <ImageBackground source={background} style={styles.image}>
        {active !== null ? (
          active === 'login' ? (
            <Login />
          ) : (
            <Register />
          )
        ) : (
          <Flex center style={styles.buttonContainer}>
            <Box>
              <Button
                style={styles.button}
                color={COLOR_PRIMARY}
                titleStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                title="Login"
              />
            </Box>
            <Box>
              <Button
                style={styles.button}
                color={COLOR_PRIMARY}
                titleStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                title="Register"
              />
            </Box>
          </Flex>
        )}
      </ImageBackground>
    </Flex>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: Dimensions.get('window').height / 4,
    justifyContent: 'space-evenly',
    marginTop: Dimensions.get('window').height / 2,
  },
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
    width: 150,
  },
});

export default Auth;
