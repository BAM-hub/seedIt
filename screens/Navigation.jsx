import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CameraComponent from '../components/CameraComponent';
import Auth from './Auth';
// import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <View style={{ height: '100%', backgroundColor: 'red' }}>
        <Tab.Navigator
          initialRouteName="explore"
          activeColor="#f0edf6"
          inactiveColor="#3e2465"
          //   barStyle={{ height: 100, backgroundColor: 'red', borderWidth: 1 }}
        >
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
            component={Auth}
            options={{
              tabBarLabel: 'explore',
              tabBarIcon: () => <Icon name="home" size={25} color="white" />,
            }}
          />
          <Tab.Screen name="Auth" component={Auth} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default Navigation;
