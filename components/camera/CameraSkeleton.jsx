import { View } from 'react-native';
import { Skeleton } from '@rneui/themed';
import { useTheme } from '@rneui/themed';

const CameraSkeleton = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.white,
      }}>
      <View
        style={{
          height: '70%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Skeleton
          animation="wave"
          style={{ backgroundColor: 'grey' }}
          width={300}
          height={300}
          circle
        />
      </View>
      <View
        style={{
          height: '30%',
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingBottom: 20,
          justifyContent: 'space-evenly',
        }}>
        <Skeleton
          animation="none"
          style={{ backgroundColor: 'grey' }}
          width={40}
          height={40}
        />
        <Skeleton
          animation="none"
          style={{ backgroundColor: 'grey' }}
          width={80}
          height={80}
          circle
        />
        <Skeleton
          animation="none"
          style={{ backgroundColor: 'grey' }}
          width={40}
          height={40}
        />
      </View>
    </View>
  );
};

export default CameraSkeleton;
