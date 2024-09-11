<script setup lang="ts">
import FollowUserLike from './components/FollowUserLike.vue'
import { followUserLike } from '~/api/follow'

const userStore = useUserStore()
const isLogin = computed(() => userStore.token)

const followUserLikeList = ref<API.FollowUserLikeRes['list']>([])
const followUserLikeTotal = ref<API.FollowUserLikeRes['total']>(0)
async function init() {
  if (!isLogin.value) {
    const result = await followUserLike({ pageNum: 1, pageSize: 3 })
    followUserLikeList.value = result.list
    followUserLikeTotal.value = result.total
  }
}
defineExpose({
  init,
})
</script>

<template>
  <div class="p-3">
    <div v-if="isLogin">
      登录了
    </div>

    <div v-else>
      <NoLogin />
      <FollowUserLike class="mt-25" :list-data="followUserLikeList" />
    </div>
  </div>
</template>
