import { createStorage, StorageEnum } from "../base/index.js";

interface UserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface UserStateType {
  isLoggedIn: boolean;
  user: UserInfo | null;
  accessToken: string | null;
}

const storage = createStorage<UserStateType>(
  "user-storage-key",
  {
    isLoggedIn: false,
    user: null,
    accessToken: null,
  },
  {
    storageEnum: StorageEnum.Local,
    liveUpdate: true,
  },
);

type UserStorageType = typeof storage & {
  login: (user: UserInfo, accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
};

const userStorage: UserStorageType = {
  ...storage,
  login: async (user: UserInfo, accessToken: string) => {
    await storage.set({
      isLoggedIn: true,
      user,
      accessToken,
    });
  },
  logout: async () => {
    await storage.set({
      isLoggedIn: false,
      user: null,
      accessToken: null,
    });
  },
};

export { userStorage, type UserInfo, type UserStateType, type UserStorageType };
