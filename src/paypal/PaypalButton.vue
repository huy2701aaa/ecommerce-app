<script setup lang="ts">
import { ref, onMounted } from "vue";

// Define types for PayPal-related objects (if not globally available)
declare global {
  interface Window {
    paypal: any;
  }
}

// Define the ref with the correct type
const paypalButtonContainer = ref<HTMLElement | null>(null);

// Define props with proper typing
interface Props {
  total: number;
}

const props = defineProps<Props>();

// Define emit event types
interface SuccessPayload {
  address: string;
  name: string;
}

const emit = defineEmits<(e: "success", payload: SuccessPayload) => void>();

// onMounted lifecycle hook to render PayPal buttons
onMounted(() => {
  if (window.paypal) {
    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: (props.total / 25425).toFixed(2), // Ensure value is a string with 2 decimal places
                },
              },
            ],
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            emit("success", {
              address: details.payer.address.country_code,
              name: details.payer.name.given_name,
            });
          });
        },
      })
      .render(paypalButtonContainer.value!); // Add the non-null assertion
  } else {
    console.error("PayPal SDK is not loaded!");
  }
});
</script>

<template>
  <div ref="paypalButtonContainer"></div>
</template>