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
    onSuccess: async ({ token, userId }) => {
      if (!token) return;
      try {
        await AsyncStorage.setItem('@token', token);
        queryClient.setQueryData(['userAuth'], { token, userId });
      } catch (error) {
        console.log(error);
      }
    },
    onError: async _ => {
      console.log('error');
      try {
        await AsyncStorage.removeItem('@token');
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { data, isLoading, isError };
};
