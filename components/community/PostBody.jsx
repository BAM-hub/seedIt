import { useTheme } from '@rneui/themed';
import { View, Image } from 'react-native';

const PostBody = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '100%',
      }}>
      <Image
        source={{
          uri: 'https://i.pinimg.com/564x/0d/04/da/0d04da2a259734f34f359324161ab0cd.jpg',
        }}
        style={{
          width: '90%',
          height: 200,
          marginHorizontal: '5%',
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default PostBody;
