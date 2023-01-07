import { View } from 'react-native';
import { useTheme } from '@rneui/themed';

const PostWrapper = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 50,
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

export default PostWrapper;
