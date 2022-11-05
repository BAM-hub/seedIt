import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import {
  Box,
  Button,
  Flex,
  TextInput,
  Text,
} from '@react-native-material/core';
import {
  Dimensions,
  StyleSheet,
  ImageBackground,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
import background from '../assets/background.jpg';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

import { COLOR_PRIMARY } from '../config';

const Auth = () => {
  const [margin, setMargin] = useState('300%');
  const [active, setActive] = useState();

  const toggleActive = target => {
    setActive(target);
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: 'linear', property: 'opacity' },
      update: { type: 'spring', springDamping: 0.4 },
      delete: { type: 'linear', property: 'opacity' },
    });
    setMargin('40%');
  };

  return (
    <Flex center style={{ height: Dimensions.get('window').height }}>
      <ImageBackground source={background} style={styles.image}>
        {active ? (
          active === 'login' ? (
            <Flex center style={{ ...styles.container, marginTop: margin }}>
              <Login toggleActive={toggleActive} />
            </Flex>
          ) : (
            <Flex center style={{ ...styles.container, marginTop: margin }}>
              <Register toggleActive={toggleActive} />
            </Flex>
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
                onPress={() => toggleActive('Register')}
              />
            </Box>
          </Flex>
        )}
      </ImageBackground>
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    // marginTop: '40%',
    backgroundColor: '#CFFFB3',
    borderRadius: 50,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 20,
  },
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
