<script setup lang="ts">
// const updateOfPaymentStatus = () => {
//   const getParameters = new URLSearchParams(window.location.search);
//   const sessionId = getParameters.get('session_id');
//   const paymentId = getParameters.get('payment_id');
//   const userEventId = getParameters.get('user_event_id');

//   if (sessionId && paymentId && userEventId) {
//     api.events.updatePaymentStatus({
//       sessionId,
//       paymentId,
//       userEventId,
//       store,
//     });
//   }
// };

// updateOfPaymentStatus();
</script>

<template>
  <UIContainer type="main-box">
    <h1 class="heading heading--l">Thank you. The payment was successful.</h1>
  </UIContainer>
</template>

<style lang="scss" scoped></style>
