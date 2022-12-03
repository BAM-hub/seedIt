import { useQueryClient, useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginWithToken } from '../api/user';

export default useGetAuthToken = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['userAuth'],
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
    onSuccess: async ({ token }) => {
      if (token) {
        await AsyncStorage.setItem('@token', token);
      }
    },
    onError: _ => {
      queryClient.clear();
    },
  });

  return { data, isLoading, isError };
};