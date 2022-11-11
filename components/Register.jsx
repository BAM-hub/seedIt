import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { MOCK_SERVER_URL } from '../config';
import { useMutation, useQueryClient } from 'react-query';
import reactNativeAxios from 'react-native-axios';
import { Input, Icon, useTheme, Text, Button } from '@rneui/themed';

import TextButton from './shared/TextButton';

const Register = ({ toggleActive }) => {
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  // https://bauseeditapi20221111223258.azurewebsites.net/api/Account
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await fetch(`http://10.0.2.2:8000/`)
          .then(response => response.json())
          .then(data => {
            console.log('data', data);
          });
        // return await reactNativeAxios({
        //   method: 'get',
        //   // headers: {
        //   //   'Content-Type': 'application/json',
        //   // },
        //   url: 'https://10.0.2.2:44318/api/Account',
        //   // data: JSON.stringify({
        //   //   email: 'ameedA2@gmail.com',
        //   //   password_user: '123456789',
        //   //   username: 'AmeedA2',
        //   //   fullName: 'Ameed Tamimi',
        //   //   roleName: 'Admin',
        //   //   profilePicture: 'abc.png',
        //   //   address: 'Amman',
        //   // }),
        // })
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err));
      } catch (error) {
        console.log({ error: error });
      }
    },
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
          errorMessage={isError ? 'ENTER A VALID Email' : ''}
          containerStyle={{ width: '100%', alignItems: 'center' }}
          inputContainerStyle={{
            width: 300,
            backgroundColor: 'white',
            borderBottomColor: theme.colors.accent,
            borderBottomWidth: 2,
          }}
          inputStyle={{ color: 'black' }}
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

        <Input
          placeholder="Confirm Password*"
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
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
        onPress={() => mutation.mutate()}
      />
    </View>
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
