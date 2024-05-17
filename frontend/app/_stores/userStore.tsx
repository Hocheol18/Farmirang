// Next js는 내장된 상태 관리 솔루션을 제공하지 않아 Zustand를 사용하기로 함
// 가벼운 상태 관리 라이브러리로 유저정보 저장만 필요한 프로젝트에 적합하다고 판단

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserStore = {
  accessToken: string;
  refreshToken: string;
  memberId: string;
  profileImg: string;
  role: string;
  deviceId: string;
};

type UserInfoState = {
  userInfo: UserStore;
};

type UserInfoActions = {
  resetAuth: () => void;
  saveAuth: (userInfo: UserStore) => void;
  updateToken: (accessToken: string, refreshToken: string) => void;
  updateImg: (profileImg: string) => void;
};

const defaultState: UserStore = {
  accessToken: "",
  refreshToken: "",
  memberId: "",
  profileImg: "",
  role: "",
  deviceId: "",
};

export const useUserStore = create<UserInfoState & UserInfoActions>()(
  persist(
    (set) => ({
      userInfo: defaultState,

      resetAuth: () => {
        set({ userInfo: defaultState });
      },

      saveAuth: (newUserInfo: UserStore) => {
        set((state) => ({ userInfo: { ...state.userInfo, ...newUserInfo } }));
      },

      updateToken: (newAccessToken: string, newRefreshToken: string) => {
        set((state) => ({
          userInfo: {
            ...state.userInfo,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        }));
      },

      updateImg: (profileImg: string) => {
        set((state) => ({
          userInfo: { ...state.userInfo, profileImg },
        }));
      },
    }),
    {
      name: "userInfo",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
