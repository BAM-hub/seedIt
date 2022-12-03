import React from 'react';
import { Modal, Portal, Provider } from 'react-native-paper';
import Auth from '../../screens/Auth';

const AuthModal = ({ showModal, setShowModal }) => (
  <Provider>
    <Portal>
      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        style={{
          marginTop: 0,
        }}>
        <Auth setShowModal={setShowModal} />
      </Modal>
    </Portal>
  </Provider>
);

export default AuthModal;
