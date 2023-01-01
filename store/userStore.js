import create from 'zustand';

const useUserStore = create(set => ({
  user: {
    id: null,
    name: null,
    email: null,
    token: null,
    createdAt: null,
  },
  setUser: user => set({ user }),
  resetuser: () =>
    set({
      user: {
        id: null,
        name: null,
        email: null,
        token: null,
        createdAt: null,
      },
    }),
}));

export default useUserStore;
