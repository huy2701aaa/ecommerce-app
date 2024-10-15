import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { TCart, TProduct, TPropsCart } from "@/common/type";

export const useCartStore = defineStore("cartStore", () => {
  const cartList = ref<TCart[]>(
    JSON.parse(localStorage.getItem("cart") as string) || []
  );

  const total = computed(() => {
    return cartList.value.reduce((currentValue, nextValue) => {
      return (
        currentValue +
        parseFloat(nextValue.product.newPrice) * nextValue.quantity
      );
    }, 0);
  });

  const addCart = (payload: TProduct, quantity: number) => {
    const index = cartList.value.findIndex(
      (item) => item.product.id === payload.id
    );

    if (index === -1) {
      cartList.value.push({ product: payload, quantity });
    } else {
      cartList.value = [
        ...cartList.value.slice(0, index),
        {
          ...cartList.value[index],
          quantity: cartList.value[index].quantity + quantity,
        },
        ...cartList.value.slice(index + 1),
      ];
    }

    localStorage.setItem("cart", JSON.stringify(cartList.value));
  };

  const decrementCart = (productId: number) => {
    const index = cartList.value.findIndex(
      (item) => item.product.id === productId
    );

    if (index !== -1) {
      if (cartList.value[index].quantity === 1) {
        cartList.value = [
          ...cartList.value.slice(0, index),
          ...cartList.value.slice(index + 1),
        ];
      } else {
        cartList.value = [
          ...cartList.value.slice(0, index),
          {
            ...cartList.value[index],
            quantity: cartList.value[index].quantity - 1,
          },
          ...cartList.value.slice(index + 1),
        ];
      }
    }

    localStorage.setItem("cart", JSON.stringify(cartList.value));
  };

  const removeCart = (id: number) => {
    cartList.value = cartList.value.filter((item) => item.product.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartList.value));
  };

  const clearCart = () => {
    cartList.value = []
  }

  const updatePropsCart = (id: number, payload: TPropsCart) => {

    const index = cartList.value.findIndex((item) => item.product.id === id);

    cartList.value = [
      ...cartList.value.slice(0, index),
      {
        ...cartList.value[index],
        product: {
          ...cartList.value[index].product,
          color: payload.color as string,
          size: payload.size as string,
        },
      },
      ...cartList.value.slice(index + 1),
    ];

    localStorage.setItem("cart", JSON.stringify(cartList.value));
  };

  return {
    cartList,
    total,
    addCart,
    removeCart,
    decrementCart,
    updatePropsCart,
    clearCart
  };
});
