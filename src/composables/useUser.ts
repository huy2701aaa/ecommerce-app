import type { TError, TLogin, TRegister, TResult, TUser, TUserInfo } from "@/common/type";
import { useUserStore } from "@/stores/user";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import { isArray } from "element-plus/es/utils/types.mjs";

export const useUser = () => {
  const userStore = useUserStore();

  const getSingleUser = async (id: number) => {
    try {
      const response = await request.get(`/user/${id}`);

      const { data } = response.data as TResult;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getUsers = async () => {
    try {
      const response = await request.get("/user");

      const { data } = response.data as TResult;

      userStore.setUserList(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const updateUser = async (payload: TUser, id: number) => {
    try {
      const response = await request.put(`/user/${id}`, payload);

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const updateUserInfo = async (payload: TUserInfo, isShowMsg = true) => {
    try {
      const response = await request.put(`/user`, payload);

      const { message } = response.data as TResult;

      if (isShowMsg) ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await request.delete(`/user/${id}`);

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const createUser = async (payload: TUser) => {
    try {
      const response = await request.post("/user", payload);

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const register = async (payload: TRegister) => {
    try {
      const response = await request.post("/auth/register", payload);

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        if (isArray(message)) {
          ElMessage.error(message[0]);

          return false
        }

        ElMessage.error(message);

        return false;
      }

      ElMessage.error("Có lỗi xảy ra !");

      return false;
    }
  };

  const login = async (payload: TLogin) => {
    try {
      const response = await request.post("/auth/login", payload);

      const { message, data } = response.data as TResult;

      localStorage.setItem("user", JSON.stringify(data));

      userStore.setUser(data);

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        if (isArray(message)) {
          ElMessage.error(message[0])

          return false;
        }

        ElMessage.error(message);

        return false;
      }

      ElMessage.error("Có lỗi xảy ra !");

      return false;
    }
  };

  const forgetPass = async (email: string) => {
    try {
      const response = await request.post("/auth/forget-pass", { email });

      const { message } = response.data as TResult;

      ElMessage.success(message);

      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        if (isArray(message)) {
          ElMessage.error(message[0]);

          return false;
        }

        ElMessage.error(message);

        return false;
      }

      ElMessage.error("Có lỗi xảy ra !");

      return false;
    }
  };

  return {
    getSingleUser,
    getUsers,
    updateUser,
    createUser,
    deleteUser,
    updateUserInfo,
    register,
    login,
    forgetPass
  };
};
