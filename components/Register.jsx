import React, { useState } from 'react';
import { View } from 'react-native';
import { MOCK_SERVER_URL } from '../config';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Icon, useTheme, Text, Button } from '@rneui/themed';

import TextButton from './shared/TextButton';
import { register } from '../api/auth';

const Register = ({ toggleActive }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState([]);
  const { theme } = useTheme();

  const queryClient = useQueryClient();
  const mutation = useMutation(() => register(user));

  const onChange = (text, name) => {
    const errors = isError.filter(err => err !== name);
    if (errors) setIsError(errors);
    setUser({
      ...user,
      [name]: text,
    });
  };

  const validateForm = () => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{6,30}$/;

    let isFormValid = true;

    if (!emailPattern.test(user.email)) {
      isFormValid = false;
      setIsError(preveState => [...preveState, 'email']);
    }
    if (!passwordPattern.test(user.password)) {
      isFormValid = false;
      setIsError(preveState => [...preveState, 'password']);
    }
    if (user.password !== user.confirmPassword || !user.confirmPassword) {
      isFormValid = false;
      setIsError(preveState => [...preveState, 'confirmPassword']);
    }
    return isFormValid;
  };

  const handelSubmit = () => {
    if (!validateForm()) return;
    mutation.mutate();
  };

  if (mutation.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (mutation.isError) {
    return <Text>Error</Text>;
  }
  if (mutation.isSuccess) {
    console.log(mutation.data);
    return <Text>Success</Text>;
  }

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
            title: '- Login',
            color: theme.colors.primary,
            textColor: theme.colors.primary,
            callback: () => toggleActive('login'),
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
          errorStyle={{ color: 'red' }}
          errorMessage={isError.includes('email') ? 'ENTER A VALID EMAIL' : ''}
          containerStyle={{ width: '100%', alignItems: 'center' }}
          inputContainerStyle={{
            width: 300,
            backgroundColor: 'white',
            borderBottomColor: theme.colors.accent,
            borderBottomWidth: 2,
          }}
          inputStyle={{ color: 'black' }}
          value={user.email}
          onChangeText={text => onChange(text, 'email')}
        />

        <Input
          placeholder="Password*"
          errorStyle={{ color: 'red' }}
          errorMessage={
            isError.includes('password')
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
          value={user.password}
          onChangeText={text => onChange(text, 'password')}
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

        <Input
          placeholder="Confirm Password*"
          errorStyle={{ color: 'red' }}
          errorMessage={
            isError.includes('confirmPassword')
              ? 'This Field must match the password field'
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
          value={user.confirmPassword}
          onChangeText={text => onChange(text, 'confirmPassword')}
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
        title="Register"
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
        onPress={handelSubmit}
      />
    </View>
  );
};

export default Register;
