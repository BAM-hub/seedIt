import create from 'zustand';

const useCameraStore = create(set => ({
  isCameraOpen: false,
  isCloseCamera: false,
  closeCamera: close => set({ isCloseCamera: close }),
  setIsCameraOpen: isOpen => set({ isCameraOpen: isOpen }),
}));

export default useCameraStore;
