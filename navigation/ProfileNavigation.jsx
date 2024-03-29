import CreateProfile from '../screens/CreateProfile';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from '../screens/Camera';
import ResultScreen from '../screens/ResultScreen';
import useCloseCamera from '../hooks/useCloseCamera';

const Stack = createStackNavigator();

const ProfileNavigation = ({ navigation }) => {
  useCloseCamera(navigation);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Profile">
        <Stack.Screen name="createProfile" component={CreateProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileNavigation;
