<script setup lang="ts">
import { parseRedirectPath } from '~/utils'

const { query } = useRoute('/redirect')
const router = useRouter()

function handleClick() {
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
