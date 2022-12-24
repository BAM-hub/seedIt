import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfile } from '../api/profile';

export default useCreateProfile = profile => {
  const queryClient = useQueryClient();
  const createProfileMutation = useMutation({
    mutationKey: ['createProfile'],
    mutationFn: () =>
      createProfile({
        ...profile,
        token: queryClient.getQueryData(['userAuth']).token,
        userId: queryClient.getQueryData(['userAuth']).userId,
      }),
    onSuccess: data => {
      navigation.goBack();
      queryClient.setQueryData(['userProfile'], data.data);
    },
    onError: () => {
      console.log('error');
    },
  });
  return createProfileMutation;
};
