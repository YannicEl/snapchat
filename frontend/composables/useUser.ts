import { User } from '~~/types/User';

const userStore = useStorage<User>('user', null);

export const useUser = () => {
  return userStore;
};
