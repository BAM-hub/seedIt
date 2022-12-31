import { getProfile } from '../api/profile';
import { useQueryClient, useQuery } from '@tanstack/react-query';

export default useGetProfile = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['userAuth']);
  if (!user.userId)
    return {
      data: {
        profilePic: null,
        profileUserName: null,
        profileBio: null,
        plants: null,
      },
      isLoading: false,
      isError: false,
    };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(user.userId),
  });
  return { data, isLoading, isError };
};
