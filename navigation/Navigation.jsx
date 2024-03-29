import { View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import MI from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@rneui/themed';
import ProfileNavigation from './ProfileNavigation';
import CommunityNavigation from './CommunityNavigation';
import MyGardenScreen from '../screens/MyGardenScreen';
import ExploreNavigation from './ExploreNavigation';
import MyGardenNavigation from './MyGardenNavigation';

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
            name="Community"
            component={CommunityNavigation}
            options={{
              tabBarLabel: 'community',
              tabBarIcon: () => <MI name="explore" size={25} color="white" />,
            }}
          />
          <Tab.Screen
            name="explore"
            component={ExploreNavigation}
            options={{
              tabBarLabel: 'explore',
              tabBarIcon: () => <Icon name="home" size={25} color="white" />,
            }}
          />
          <Tab.Screen
            name="myGarden"
            component={MyGardenNavigation}
            options={{
              tabBarLabel: 'my garden',
              tabBarIcon: () => (
                <MCI name="palm-tree" size={25} color="white" />
              ),
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
