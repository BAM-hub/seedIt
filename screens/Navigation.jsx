import { View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Explore from './Explore';
import CameraScreen from './Camera';
// import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@rneui/themed';
import ProfileNavigation from './ProfileNavigation';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <View style={{ height: '100%' }}>
        <Tab.Navigator
          initialRouteName="explore"
          activeColor={theme.colors.accent}
          inactiveColor={theme.colors.secondary}
          barStyle={{ backgroundColor: theme.colors.primary }}>
          <Tab.Screen
            name="camera"
            component={CameraScreen}
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
            component={ProfileNavigation}
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
