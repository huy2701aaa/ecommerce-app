import { ref } from "vue";
import { defineStore } from "pinia";
import type { TUser } from "@/common/type";

export const useUserStore = defineStore("userStore", () => {
  const userList = ref<TUser[]>([]);

  const user = ref<TUser | null>(JSON.parse(localStorage.getItem("user") as string) as TUser || null);

  const setUserList = (payload: TUser[]) => {
    userList.value = payload;
  };

  const setUser = (payload: TUser | null) => {
    user.value = payload;
  };

  return {
    userList,
    setUserList,
    user,
    setUser,
  };
});
