import { View, Text } from 'react-native';
import { Modal, Portal, Provider } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import { Button, useTheme } from '@rneui/themed';

const ProfileOverview = ({ showModal, setShowModal, setShowAuthModal }) => {
  const { data: profile } = useQuery(['userProfile']);
  if (!profile)
    return (
      <ModalWrapper showModal={showModal} setShowModal={setShowModal}>
        <NoProfile
          setShowAuthModal={setShowAuthModal}
          setShowModal={setShowModal}
        />
      </ModalWrapper>
    );

  return (
    <ModalWrapper showModal={showModal} setShowModal={setShowModal}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            backgroundColor: 'grey',
            borderRadius: 50,
          }}>
          {/* <Image */}
        </View>
        <View
          style={{
            width: '90%',
            alignItems: 'flex-start',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
            }}>
            BAM 99
          </Text>
          <Text style={{ color: 'grey' }}>bsharamin12@gmail.com</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
        }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
          Manage Your Profile
        </Text>
      </View>
    </ModalWrapper>
  );
};

const NoProfile = ({ setShowAuthModal, setShowModal }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 16,
      }}>
      <View
        style={{
          padding: 16,
          width: '95%',
          borderBottomColor: '#d3d3d3',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
          }}>
          Please Login or register to show profile{' '}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 20,
        }}>
        <Button
          containerStyle={{
            alignSelf: 'center',
            paddingHorizontal: 15,
            borderRadius: 30,
          }}
          buttonStyle={{
            padding: 15,
            paddingHorizontal: 30,
            backgroundColor: theme.colors.primary,
            borderRadius: 30,
          }}
          onPressIn={() => {
            setShowModal(false);
            setShowAuthModal(true);
          }}>
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
            }}>
            -Login
          </Text>
        </Button>
      </View>
    </View>
  );
};

const ModalWrapper = ({ children, showModal, setShowModal }) => (
  <Provider>
    <Portal>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        contentContainerStyle={{
          width: '90%',
          // height: '100%',
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 20,
          // marginTop: 70,
          marginHorizontal: 20,
          position: 'absolute',
          top: 50,
        }}>
        {children}
      </Modal>
    </Portal>
  </Provider>
);

export default ProfileOverview;
