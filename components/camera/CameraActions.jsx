import { View, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashOf from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@rneui/themed';
import useProfileStore from '../../store/profileStore';

const CameraActions = ({
  setFlash,
  flash,
  takePhoto,
  setTempImage,
  handleSubmmit,
}) => {
  const { theme } = useTheme();
  const { setUploadingImage } = useProfileStore();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        padding: 10,
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#0000007e',
      }}>
      <TouchableOpacity onPress={() => setFlash(flash === 'on' ? 'off' : 'on')}>
        <View
          style={{
            width: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {flash === 'on' ? (
            <Icon name="flash" size={30} color={theme.colors.white} />
          ) : (
            <FlashOf name="flash-off" size={30} color={theme.colors.white} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={takePhoto}
        style={{
          width: 100,
          height: 100,
          right: 'auto',
          borderColor: theme.colors.accent,
          borderWidth: 1,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: theme.colors.secondary,
            width: '80%',
            height: '80%',
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="camera" size={50} color={theme.colors.primary} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          launchImageLibrary({}, data => {
            if (!data.didCancel) {
              setTempImage(data.assets[0].uri);
              setUploadingImage(data.assets[0]);
              handleSubmmit(data.assets[0].uri);
            }
          })
        }>
        <Icon name="photo" size={30} color={theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default CameraActions;
