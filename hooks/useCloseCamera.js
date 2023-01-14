import { useEffect } from 'react';
import useCameraStore from '../store/useCameraStore';

export default useCloseCamera = navigation => {
  const { isCameraOpen, setIsCameraOpen, closeCamera } = useCameraStore();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      console.log('focus');
      if (isCameraOpen) {
        setIsCameraOpen(false);
        closeCamera(true);
      }
    });

    return unsubscribe;
  }, [navigation]);
};
