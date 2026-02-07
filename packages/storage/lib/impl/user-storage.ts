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
  lastLogin: number | null;
}

const storage = createStorage<UserStateType>(
  "user-storage-key",
  {
    isLoggedIn: false,
    user: null,
    accessToken: null,
    lastLogin: null,
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
      lastLogin: Date.now(),
    });
  },
  logout: async () => {
    await storage.set({
      isLoggedIn: false,
      user: null,
      accessToken: null,
      lastLogin: null,
    });
  },
};

export { userStorage, type UserInfo, type UserStateType, type UserStorageType };
