import { ref } from "vue";
import { defineStore } from "pinia";
import type { TProduct, TProductParams } from "@/common/type";

export const useProductStore = defineStore("productStore", () => {
  const productList = ref<TProduct[]>([]);
  const productSellTheMost = ref<TProduct>({
    name: "",
    image: "",
    oldPrice: "",
    newPrice: "",
    stock: 0,
    sold: 0,
    description: "",
    color: "",
    size: "",
    categoryId: null,
  });

  const filter = ref<TProductParams>({});
  const singleProduct = ref<TProduct>({
    name: "",
    image: "",
    oldPrice: "",
    newPrice: "",
    stock: 0,
    sold: 0,
    description: "",
    color: "",
    size: "",
    categoryId: null,
  });

  const setProductList = (payload: TProduct[]) => {
    productList.value = payload;
  };

  const setSingleProduct = (payload: TProduct) => {
    singleProduct.value = payload;
  };

  const setProductSellTheMost = (payload: TProduct) => {
    productSellTheMost.value = payload;
  };

  const setFilter = (payload: TProductParams) => {
    filter.value = payload;
  };

  return {
    productList,
    setProductList,
    singleProduct,
    setSingleProduct,
    filter,
    setFilter,
    productSellTheMost,
    setProductSellTheMost
  };
});
