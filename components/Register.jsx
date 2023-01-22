import React, { useState } from 'react';
import { View } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { Input, Icon, useTheme, Text, Button } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextButton from './shared/TextButton';
import { register } from '../api/user';
import useUserStore from '../store/userStore';

const Register = ({ toggleActive, setShowModal }) => {
  const { setUser: setUserInStore } = useUserStore();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState([]);
  const { theme } = useTheme();

  const mutation = useMutation({
    mutationFn: () => register(user),
    onSuccess: async ({ data }) => {
      try {
        await AsyncStorage.setItem('@token', data.token);
        setShowModal(false);
        setUserInStore({ token: data.token, ...data.user });
      } catch (e) {
        console.log(e);
      }
    },
    onError: error => {
      console.log(error);
    },
  });

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
    if (!user.firstName || !user.lastName) {
      isFormValid = false;
      setIsError([...isError, 'name']);
    }
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
          flexDirection: 'row',
          width: '90%',
          alignSelf: 'center',
        }}>
        <Input
          placeholder="First Name"
          onChangeText={text => onChange(text, 'firstName')}
          value={user.firstName}
          errorMessage={isError.includes('name') ? 'Please enter a name' : null}
          containerStyle={{
            width: '50%',
          }}
          errorStyle={{ color: 'red' }}
          inputContainerStyle={theme.inputContainerPrimary}
          inputStyle={theme.textBlack}
        />
        <Input
          placeholder="Last Name"
          onChangeText={text => onChange(text, 'lastName')}
          value={user.lastName}
          errorMessage={isError.includes('name') ? 'Please enter a name' : null}
          containerStyle={{
            width: '50%',
          }}
          errorStyle={{ color: 'red' }}
          inputContainerStyle={theme.inputContainerPrimary}
          inputStyle={theme.textBlack}
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
          containerStyle={theme.inputContainerWrapper}
          inputContainerStyle={theme.inputContainerPrimary}
          inputStyle={theme.textBlack}
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
          containerStyle={theme.inputContainerWrapper}
          inputContainerStyle={theme.inputContainerPrimary}
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
          containerStyle={theme.inputContainerWrapper}
          inputContainerStyle={theme.inputContainerPrimary}
          secureTextEntry={!showPassword}
          value={user.confirmPassword}
          onChangeText={text => onChange(text, 'confirmPassword')}
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
