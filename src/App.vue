<script setup lang="ts">
import { useUserStore } from './stores/user.store'

const userStore = useUserStore()
console.log(userStore.getUserData)

const toggleUserData = () => {
  userStore.setUserData({
    ...userStore.getUserData,
    email: Math.random().toString(36).substring(7) + '@gmail.com',
  })
  console.log(userStore.getUserData)
}
</script>

<template>
  <LayoutMainGrid>
    <LayoutHeader />
    <LayoutAside />
    <LayoutMain>
      <RouterView />
      {{ userStore.getUserData.email }}
      <button @click="toggleUserData">Toggle Email</button>
    </LayoutMain>
  </LayoutMainGrid>
</template>

<style lang="scss" scoped></style>
