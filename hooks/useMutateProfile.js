import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfile, updateProfile } from '../api/profile';
import useProfileStore from '../store/profileStore';
import useUserStore from '../store/userStore';

export default useMutateProfile = (profile, type, callback) => {
  const queryClient = useQueryClient();
  const { token, id } = useUserStore(state => state.user);
  const { setProfile } = useProfileStore();
  if (type === 'create') {
    const createProfileMutation = useMutation({
      mutationKey: ['createProfile'],
      mutationFn: () =>
        createProfile({
          profile,
          token,
          userId: id,
        }),
      onSuccess: ({ data }) => {
        setProfile(data);
        callback();
      },
      onError: () => {
        console.log('error');
      },
    });
    return {
      mutateProfile: createProfileMutation.mutate,
      isLoading: createProfileMutation.isLoading,
      isError: createProfileMutation.isError,
    };
  }
  if (type === 'update') {
    const updateProfileMutation = useMutation({
      mutationKey: ['updateProfile'],
      mutationFn: () =>
        updateProfile({
          profile,
          token,
          userId: id,
        }),
      onSuccess: ({ data }) => {
        setProfile(data);
        callback();
      },
      onError: () => {
        console.log('error');
      },
    });
    return {
      mutateProfile: updateProfileMutation.mutate,
      isLoading: updateProfileMutation.isLoading,
      isError: updateProfileMutation.isError,
    };
  }
};
