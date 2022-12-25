import { View, Text } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme, Button } from '@rneui/themed';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { launchImageLibrary } from 'react-native-image-picker';
import usePopUpSpring from '../../hooks/usePopupSpring';

const ImageModal = ({ setShowModal, showModal, setTempImage, callback }) => {
  const animatedStyles = usePopUpSpring(showModal);

  const { theme } = useTheme();
  return (
    <Provider>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Animated.View
            style={[
              {
                backgroundColor: theme.colors.white,
                height: 120,
                bottom: 20,
                width: Dimensions.get('screen').width / 1.2,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                borderRadius: 20,
              },
              animatedStyles,
            ]}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                containerStyle={{
                  color: theme.colors.black,
                  flexDirection: 'row',
                }}
                buttonStyle={{
                  backgroundColor: theme.colors.white,
                }}
                titleStyle={{
                  color: 'black',
                }}>
                <Icon name="camera" size={45} color={theme.colors.black} />
              </Button>
              <Text
                style={{
                  color: theme.colors.black,
                  fontSize: 20,
                }}>
                Camera
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Button
                containerStyle={{
                  color: theme.colors.black,
                  flexDirection: 'row',
                }}
                buttonStyle={{
                  backgroundColor: theme.colors.white,
                }}
                titleStyle={{
                  color: 'black',
                }}
                onPressIn={() =>
                  launchImageLibrary({}, data => {
                    if (!data.didCancel) {
                      setTempImage(data.assets[0].uri);
                      setShowModal(false);
                      callback();
                    }
                  })
                }>
                <Icon name="photo" size={45} color={theme.colors.black} />
              </Button>
              <Text
                style={{
                  color: theme.colors.black,
                  fontSize: 20,
                }}>
                Gallary
              </Text>
            </View>
          </Animated.View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default ImageModal;
