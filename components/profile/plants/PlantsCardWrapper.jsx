import { View, Dimensions } from 'react-native';
import { useTheme } from '@rneui/themed';

const PlantCardWrapper = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        height: Dimensions.get('window').height / 5,
        width: '95%',
        alignSelf: 'flex-end',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        paddingVertical: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: theme.colors.primary,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      }}>
      {children}
    </View>
  );
};

export default PlantCardWrapper;
