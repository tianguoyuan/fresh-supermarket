<script setup lang="ts" name="/">
import dashboard1 from '~/assets/images/dashboard/1.png'
import dashboard2 from '~/assets/images/dashboard/2.png'
import dashboard3 from '~/assets/images/dashboard/3.png'
import { setScreenBannerStorage } from '~/utils/storage'

const bannerList = ref([
  {
    img: dashboard1,
    title: '个性推荐',
    desc: '海量信息 一触即达',
  },
  {
    img: dashboard2,
    title: '学术&求职',
    desc: '成就平步青云',
  },
  {
    img: dashboard3,
    title: '加入社区',
    desc: '遇见众生众象',
  },
])
const router = useRouter()
function goHome() {
  router.replace('/home')
  setScreenBannerStorage(true)
}
</script>

<template>
  <van-swipe class="h-screen" indicator-color="#5F2AFF" :loop="false">
    <van-swipe-item v-for="(item, index) in bannerList" :key="item.title" class="relative flex flex-col">
      <div v-if="index === bannerList.length - 1" class="skip-btn absolute right-10 top-10 rounded-2xl px-2 text-xs" @click="goHome">
        跳过
      </div>
      <div class="pl-12 pt-18">
        <div class="relative text-4xl font-bold">
          <span>{{ item.title }}</span>

          <span class="absolute top-0 pl-3 text-18 color-[#5F2AFF]">”</span>
        </div>
        <div class="text-sm">
          {{ item.desc }}
        </div>
      </div>

      <div class="mb-6 mt-12 flex-1 overflow-hidden px-6">
        <img class="m-auto" :src="item.img" alt="" draggable="false">
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped>
.skip-btn {
  background-color: rgba(0, 0, 0, 0.5);
  color: rgba(255, 255, 255, 0.7);
}
</style>

<route lang="yaml">
  meta:
    layout: false
    title: 开屏广告
</route>
