import { NavigationContainer } from '@react-navigation/native';
import Explore from '../screens/Explore';
import PlantCategoryScreen from '../screens/PlantCategoryScreen';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();

const ProfileNavigation = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="explore">
        <Stack.Screen name="explore" component={Explore} />
        <Stack.Screen
          name="plantCategory"
          component={PlantCategoryScreen}
          sharedElements={(route, otherRoute, showing) => {
            const { category } = route.params;
            return [
              {
                id: `item.${category.name}.photo`,
              },
              {
                id: `item.${category.name}.text`,
              },
              {
                id: 'general.bg',
              },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProfileNavigation;
