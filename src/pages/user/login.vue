<script setup lang="ts" name="/user/login">
import { parseRedirectPath } from '~/utils'

const { query } = useRoute()
const router = useRouter()
const userStore = useUserStore()

function handleClick() {
  userStore.changeToken('ok-token')
  const redirectPath = query.redirectPath ? parseRedirectPath(query.redirectPath as string) : ''
  router.replace(redirectPath || '/')
}
</script>

<template>
  <div>
    <p>login page</p>

    <div class="btn" @click="handleClick">
      登录
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 用户登录
</route>
