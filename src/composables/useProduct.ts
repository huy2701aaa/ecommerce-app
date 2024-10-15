import type { TError, TProduct, TResult } from "@/common/type";
import { useProductStore } from "@/stores/product";
import { request } from "@/utils/request";
import { AxiosError } from "axios";
import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";

export const useProduct = () => {
  const productStore = useProductStore();

  const { filter } = storeToRefs(useProductStore());

  const getSingleProduct = async (id: number) => {
    try {
      const response = await request.get(`/product/${id}`);

      const { data } = response.data as TResult;

      productStore.setSingleProduct(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getProductSellTheMost = async () => {
    try {
      const response = await request.get(`/product/sell-the-most`);

      const { data } = response.data as TResult;

      console.log(data)

      productStore.setSingleProduct(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getProductByCategory = async (id: number) => {
    try {
      const response = await request.get(`/product/category/${id}`);

      const { data } = response.data as TResult;

      productStore.setProductList(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const getProducts = async () => {
    try {
      if (!filter.value.size) delete filter.value.size;
      if (!filter.value.color) delete filter.value.color;
      if (!filter.value.price) delete filter.value.price;
      if (!filter.value.categoryId) delete filter.value.categoryId;
      if (!filter.value.q) delete filter.value.q;

      const params = { ...filter.value };

      const response = await request.get("/product", {
        params,
      });

      const { data } = response.data as TResult;

      productStore.setProductList(data);

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data as TError;

        return ElMessage.error(message);
      }

      ElMessage.error("Có lỗi xảy ra !");
    }
  };

  const updateProduct = async (payload: TProduct, id: number) => {
    try {
      const response = await request.put(`/product/${id}`, payload);

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

  const deleteProduct = async (id: number) => {
    try {
      const response = await request.delete(`/product/${id}`);

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

  const createProduct = async (payload: TProduct) => {
    try {
      const response = await request.post("/product", payload);

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

  return {
    getSingleProduct,
    getProducts,
    updateProduct,
    createProduct,
    deleteProduct,
    getProductByCategory,
    getProductSellTheMost
  };
};
