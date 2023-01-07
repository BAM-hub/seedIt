import { useTheme } from '@rneui/themed';
import { View, Text } from 'react-native';

const PostTitle = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        width: '90%',
        borderBottomWidth: 1.5,
        alignSelf: 'center',
        borderColor: theme.colors.secondary,
      }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: theme.colors.primary,
          alignSelf: 'center',
          marginVertical: 9,
          width: '80%',
        }}>
        first post
      </Text>
      <Text
        style={{
          width: '20%',
          fontSize: 12,
          color: theme.colors.secondary,
          textAlign: 'right',
        }}>
        11PM
      </Text>
    </View>
  );
};

export default PostTitle;
