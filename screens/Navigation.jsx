import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraComponent from '../components/CameraComponent';
import { useMutation } from 'react-query';
import Auth from './Auth';
import Explore from './Explore';
// import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@rneui/themed';
import { loginWithToken } from '../api/user';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { theme } = useTheme();
  const [auth, setAuth] = useState(true);

  const autoLogin = useMutation({
    mutationFn: async token => await loginWithToken(token),
    onSuccess: async data => {
      console.log('success', data);
      if (data) {
        await AsyncStorage.setItem('@token', data.token);
      }
    },
    onError: _ => {
      setAuth(false);
    },
  });
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      // console.log(token);
      if (token) autoLogin.mutate(token);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (!auth) return <Auth />;

  return (
    <NavigationContainer>
      <View style={{ height: '100%', backgroundColor: 'red' }}>
        <Tab.Navigator
          initialRouteName="explore"
          activeColor={theme.colors.accent}
          inactiveColor={theme.colors.secondary}
          barStyle={{ backgroundColor: theme.colors.primary }}>
          <Tab.Screen
            name="camera"
            component={CameraComponent}
            options={{
              tabBarLabel: 'camera',
              tabBarIcon: () => <Icon name="camerao" size={25} color="white" />,
            }}
          />
          <Tab.Screen
            name="explore"
            component={Explore}
            options={{
              tabBarLabel: 'explore',
              tabBarIcon: () => <Icon name="home" size={25} color="white" />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Auth}
            options={{
              tabBarLabel: 'profile',
              tabBarIcon: () => <Icon name="user" size={25} color="white" />,
            }}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default Navigation;
