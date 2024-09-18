<script setup lang="ts" name="/personal/">
const userStore = useUserStore()
const isLogin = computed(() => userStore.isLogin)
</script>

<template>
  <div>
    <div v-if="isLogin" class="bg-[#40AE36]">
      <div class="p-4">
        <div>
          <img src="" alt="">
        </div>
        <div>
          <div />
          <div />
        </div>
      </div>
    </div>
    <div v-else class="pb-10">
      <NoLogin />
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 个人
    showTabBar: true
</route>
