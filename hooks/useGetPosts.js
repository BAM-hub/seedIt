import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/post';
import usePostsStore from '../store/postsStore';

export default useGetPosts = () => {
  const { setPosts } = usePostsStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    onSuccess: data => {
      setPosts(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  return { data, isLoading, isError };
};
