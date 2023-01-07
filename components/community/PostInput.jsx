import { useTheme } from '@rneui/themed';
import { View, TextInput, TouchableOpacity } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const PostInput = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: theme.colors.secondary,
        marginBottom: 10,
      }}>
      <TextInput
        style={{
          width: '90%',
        }}
        placeholder="comment..."
      />
      <TouchableOpacity activeOpacity={0.5}>
        <MCI name="send" size={20} color={theme.colors.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default PostInput;
