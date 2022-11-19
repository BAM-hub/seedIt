import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  LayoutAnimation,
  NativeModules,
} from 'react-native';
import { Button } from '@rneui/base';
import { useTheme } from '@rneui/themed';

import background from '../assets/background.jpeg';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const Auth = () => {
  const [margin, setMargin] = useState('300%');
  const [active, setActive] = useState();
  const { theme } = useTheme();
  const toggleActive = target => {
    setActive(target);
    LayoutAnimation.configureNext({
      duration: 500,
      create: { type: 'linear', property: 'opacity' },
      update: { type: 'spring', springDamping: 0.4 },
      delete: { type: 'linear', property: 'opacity' },
    });
    setMargin('0%');
  };

  return (
    <View
      style={{
        height: Dimensions.get('window').height,
      }}>
      <ImageBackground
        source={background}
        style={{ ...styles.image, position: 'relative' }}>
        {active ? (
          active === 'login' ? (
            <View
              style={{
                ...styles.container,
                marginTop: margin,
                position: 'absolute',
                bottom: 0,
              }}>
              <Login toggleActive={toggleActive} />
            </View>
          ) : (
            <View
              style={{
                ...styles.container,
                marginTop: margin,
                position: 'absolute',
                bottom: 0,
              }}>
              <Register toggleActive={toggleActive} />
            </View>
          )
        ) : (
          <View style={styles.buttonContainer}>
            <Button
              title="Login"
              containerStyle={{
                width: 150,
                borderRadius: 50,
              }}
              buttonStyle={{
                backgroundColor: theme.colors.primary,
                padding: 15,
              }}
              onPress={() => toggleActive('login')}
            />
            <Button
              title="Register"
              containerStyle={{
                width: 150,
                borderRadius: 50,
              }}
              buttonStyle={{
                backgroundColor: theme.colors.primary,
                padding: 15,
              }}
              onPress={() => toggleActive('register')}
            />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '70%',
    // marginTop: '40%',
    borderRadius: 50,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
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
