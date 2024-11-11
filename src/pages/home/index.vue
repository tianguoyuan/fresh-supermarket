<script setup lang="ts" name="home">
function logout() {
  const token = useLocalStorage('token', '')
  token.value = ''
}
</script>

<template>
  <div>
    home
    <div class="btn" @click="logout">
      logout
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>

<route lang="yaml">
  meta:
    title: 首页
    showTabBar: true
</route>
