import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CameraScreen from '../screens/Camera';
import ResultScreen from '../screens/ResultScreen';
import MyGardenScreen from '../screens/MyGardenScreen';
import useCloseCamera from '../hooks/useCloseCamera';

const Stack = createStackNavigator();

const MyGardenNavigation = ({ navigation }) => {
  useCloseCamera(navigation);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="myGarden">
        <Stack.Screen name="myGarden" component={MyGardenScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyGardenNavigation;
