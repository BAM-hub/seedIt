import create from 'zustand';

const usePostsStore = create(set => ({
  post: {
    id: null,
    title: null,
    content: null,
    image: null,
    createdAt: null,
    upVote: 0,
    downVote: 0,
    postActions: [],
    comment: [],
    author: {
      id: null,
      name: null,
      email: null,
      profile: {
        id: 1,
        profileUserName: null,
        profilePicThumbnail: null,
      },
    },
  },
  posts: [],
  setPosts: posts => {
    set({ posts });
  },
  setPost: post => {
    set({ post });
  },
  resetPosts: () => {
    set({ posts: [] });
  },
}));

export default usePostsStore;
