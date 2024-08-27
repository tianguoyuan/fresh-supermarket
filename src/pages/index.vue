<script setup lang="ts">
import { login } from '~/api'

const userStore = useUserStore()
const { t } = useI18n()
</script>

<template>
  <div>
    index
    <div>{{ userStore.token }}</div>

    <button class="btn" @click="userStore.changeToken(`${userStore.token}.....`)">
      change
    </button>
    <VanButton type="success" size="small" @click="login({ username: '11', password: '22' })">
      主要按钮
    </VanButton>

    {{ t("name") }}
  </div>
</template>

<style scoped>

</style>
