import create from 'zustand';

const useProfileStore = create(set => ({
  profile: {
    id: 1,
    profilePicThumbnail: null,
    profilePic: null,
    bio: null,
    profileUserName: null,
    address: null,
    plants: [],
  },
  uploadingImage: {
    localImageURI: null,
    localImage: null,
    readyToUpload: false,
  },
  setProfile: profile => {
    set({ profile });
  },
  updateProfileImage: profile => {
    set({ profile });
  },
  setUploadingImage: image => {
    set({
      uploadingImage: {
        localImage: image || {
          uri: `file://${image.path}`,
          path: image.path || image.uri,
          type: image.path.split('.').pop() || image.uri.split('.').pop(),
          fileName: image.path.split('/').pop() || image.uri.split('/').pop(),
        },
        localImageURI: image.uri || `file://${image.path}`,
        readyToUpload: true,
      },
    });
  },
  resetUploadingImage: () => {
    set({
      uploadingImage: {
        localImageURI: null,
        localImage: null,
        readyToUpload: false,
      },
    });
  },
  resetProfile: () => {
    set({
      profile: {
        id: null,
        profilePicThumbnail: null,
        profilePic: null,
        bio: null,
        profileUserName: null,
        address: null,
      },
    });
  },
  setReadyToUpload: readyToUpload => {
    set({
      uploadingImage: {
        readyToUpload: readyToUpload,
      },
    });
  },

  addPlantToProfile: plant => {
    set(state => ({
      profile: {
        ...state.profile,
        plants: [...state?.profile?.plants, plant],
      },
    }));
  },
}));

export default useProfileStore;
