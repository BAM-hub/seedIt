import { useTheme } from '@rneui/themed';
import { View } from 'react-native';

const RowWrapper = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 10,
      }}>
      {children}
    </View>
  );
};

export default RowWrapper;
