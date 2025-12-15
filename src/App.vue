<script setup lang="ts">
import { useUserStore } from './stores/user.store'

const userStore = useUserStore()
console.log(userStore.getUserData)

const toggleUserData = () => {
  userStore.setUserData({
    ...userStore.getUserData,
    email: Math.random().toString(36).substring(7) + '@gmail.com',
  })
}
</script>

<template>
  <MainGrid>
    <CustomHeader />
    <CustomAside />
    <CustomMain>
      <RouterView />
      {{ userStore.getUserData.email }}
      <button @click="toggleUserData">Toggle Email</button>
    </CustomMain>
  </MainGrid>
</template>

<style lang="scss" scoped></style>
