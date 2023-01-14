import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Icon, useTheme, Text, Button } from '@rneui/themed';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import TextButton from './shared/TextButton';
import { login } from '../api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import useUserStore from '../store/userStore';
import useProfileStore from '../store/profileStore';

const Login = ({ toggleActive, setShowModal }) => {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setUser } = useUserStore();
  const { setProfile } = useProfileStore();

  const loginMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: () => login(email, password),
    onSuccess: async ({ data }) => {
      await AsyncStorage.setItem('@token', data.token);
      setShowModal(false);
      queryClient.setQueryData(['user'], data.user);
      setUser({
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          token: data.token,
          createdAt: data.user.createdAt,
        },
      });
      setProfile(data.user.profile);
    },
    onError: error => {
      console.log(error, 'query catch');
      // replace alert with a ui element to show error
      Alert.alert('Error', 'Invalid email or password');
    },
  });

  const handelSubmit = () => {
    loginMutation.mutate();
  };
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
        onPress={handelSubmit}
      />
    </View>
  );
};

export default Login;
