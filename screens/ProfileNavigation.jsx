import CreateProfile from './CreateProfile';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Profile">
        <Stack.Screen name="createProfile" component={CreateProfile} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileNavigation;
