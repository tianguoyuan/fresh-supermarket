<script setup lang="ts">
const userStore = useUserStore()
</script>

<template>
  <div>
    index
    <div>{{ userStore.token }}</div>

    <div class="btn" @click="userStore.changeToken(`${userStore.token}.....`)">
      change
    </div>
  </div>
</template>

<style scoped>

</style>
