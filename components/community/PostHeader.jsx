import { useTheme } from '@rneui/themed';
import { View, Text } from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from '@rneui/themed';

const PostHeader = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: '90%',
        alignSelf: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '40%',
          paddingHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text>20</Text>
          <Text>10</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <MCI name="arrow-up-bold" size={20} color={theme.colors.secondary} />

          <MCI
            style={{
              transform: [{ rotate: '180deg' }],
            }}
            name="arrow-up-bold"
            size={20}
            color={theme.colors.secondary}
          />
        </View>
      </View>
      <View
        style={{
          width: '50%',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          // borderWidth: 1,
        }}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/564x/0d/04/da/0d04da2a259734f34f359324161ab0cd.jpg',
          }}
          style={{
            width: '100%',
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: theme.colors.secondary,
            }}>
            Ahmed
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PostHeader;
