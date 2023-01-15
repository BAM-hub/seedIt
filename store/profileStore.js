import create from 'zustand';

const useProfileStore = create(set => ({
  profile: {
    id: 1,
    profilePicThumbnail: null,
    profilePic: null,
    bio: null,
    profileUserName: null,
    address: null,
  },
  uploadingImage: {
    localImageURI: null,
    localImage: null,
    readyToUpload: false,
  },
  setProfile: profile => {
    console.log('zustand profile', profile);
    set({ profile });
  },
  updateProfileImage: ({ profile }) => {
    set({ profile });
  },
  setUploadingImage: image => {
    console.log('zustand image', image);
    set({
      uploadingImage: {
        localImage: image,
        localImageURI: image.uri,
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
}));

export default useProfileStore;
