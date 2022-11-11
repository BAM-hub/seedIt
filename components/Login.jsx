import React, { useState } from 'react';
import { View } from 'react-native';
// import { useMutation } from 'react-query';
import { Input, Icon, useTheme, Text, Button } from '@rneui/themed';

import TextButton from './shared/TextButton';

const Login = ({ toggleActive }) => {
  // const Login = useMutation();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <View
      style={{
        height: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 0.2,
        }}>
        <Text
          h1={true}
          h1Style={{ color: theme.colors.primary, fontWeight: '300' }}>
          Or{' '}
        </Text>
        <TextButton
          props={{
            title: '- Register',
            color: theme.colors.primary,
            textColor: theme.colors.primary,
            callback: () => toggleActive('register'),
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flex: 0.8,
        }}>
        <Input
          placeholder="Email*"
          errorMessage={isError ? 'Email is required' : ''}
          containerStyle={{ width: '100%', alignItems: 'center' }}
          inputContainerStyle={{
            width: 300,
            backgroundColor: 'white',
            borderBottomColor: theme.colors.accent,
            borderBottomWidth: 2,
          }}
          errorStyle={{ color: 'red' }}
          value={email}
          onChangeText={setEmail}
        />

        <Input
          placeholder="Password*"
          errorStyle={{ color: 'red' }}
          errorMessage={
            isError
              ? 'PASSWORD MUST BE AT LEAST 6 CHARACTERS WITH 1 UOPERCASE, 1 LOWERCASE, 1 NUMBER, AND 1 SPECIAL CHARACTER'
              : ''
          }
          containerStyle={{ width: '100%', alignItems: 'center' }}
          inputContainerStyle={{
            width: 300,
            backgroundColor: 'white',
            borderBottomColor: theme.colors.accent,
            borderBottomWidth: 2,
          }}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          rightIcon={
            <>
              {!showPassword ? (
                <Icon
                  name="eye"
                  type="feather"
                  size={19}
                  color="black"
                  onPress={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Icon
                  name="eye-off"
                  type="feather"
                  size={19}
                  color="black"
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            </>
          }
        />
      </View>
      <Button
        title="Login"
        containerStyle={{
          width: '100%',
          alignItems: 'center',
          flex: 0.2,
        }}
        buttonStyle={{
          backgroundColor: theme.colors.primary,
          padding: 15,
          width: 150,
          borderRadius: 50,
        }}
      />
    </View>
  );
};

export default Login;
