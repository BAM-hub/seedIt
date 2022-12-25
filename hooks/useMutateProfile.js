import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfile, updateProfile } from '../api/profile';

export default useMutateProfile = (profile, user, type, callback) => {
  const queryClient = useQueryClient();
  const { token, userId } = user;
  if (type === 'create') {
    const createProfileMutation = useMutation({
      mutationKey: ['createProfile'],
      mutationFn: () =>
        createProfile({
          profile,
          token,
          userId,
        }),
      onSuccess: data => {
        queryClient.setQueryData(['userProfile'], data.data);
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
          userId,
        }),
      onSuccess: data => {
        queryClient.setQueryData(['userProfile'], data.data);
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
