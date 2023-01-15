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
          uri: 'https://images-ext-1.discordapp.net/external/NDtoomhKU8DS1AJ4UHjnTB-uJC786Lt7-WlXBpxxYCA/%3Fw%3D1200/https/www.familyhandyman.com/wp-content/uploads/2020/05/Black-Spot-Diplocarpon-rosae-GettyImages-1097545284.jpg?width=606&height=606',
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
