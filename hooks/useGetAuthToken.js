import { useQueryClient, useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginWithToken } from '../api/user';
import useProfileStore from '../store/profileStore';
import useUserStore from '../store/userStore';

export default useGetAuthToken = () => {
  const { setProfile } = useProfileStore();
  const { setUser, resetUser } = useUserStore();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        if (token) return await loginWithToken(token);

        return {
          token: null,
        };
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: async ({ token, user }) => {
      if (!token) return;
      try {
        await AsyncStorage.setItem('@token', token);
        queryClient.setQueryData(['user'], { token, user });
        setUser({ token, ...user });

        setProfile(user.profile);
      } catch (error) {
        console.log(error);
      }
    },
    onError: async _ => {
      console.log('error');
      try {
        await AsyncStorage.removeItem('@token');
        resetUser();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { data, isLoading, isError };
};
