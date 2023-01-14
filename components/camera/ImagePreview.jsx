import { Image, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@rneui/themed';

const ImagePreview = ({
  tempImage,
  setTempImage,
  setPredication,
  predication,
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        position: 'relative',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.naturalComplement,
      }}>
      <Image
        source={{
          uri: tempImage,
        }}
        style={{ width: '90%', height: '70%' }}
      />
      {predication && (
        <View
          style={{
            bottom: Dimensions.get('window').height * 0.04,
            left: 0,
            right: 0,
            width: '100%',
            height: 50,
            backgroundColor: '#2020207e',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}>
          <Text style={{ color: 'white', fontWeight: '600', fontSize: 18 }}>
            {predication}
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-evenly',
          width: '100%',
          padding: 10,
        }}>
        <TouchableOpacity>
          <Icon name="check" size={50} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPredication('');
            setTempImage(null);
          }}>
          <Icon name="times" size={50} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePreview;
