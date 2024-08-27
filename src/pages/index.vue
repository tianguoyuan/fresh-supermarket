<script setup lang="ts">
import dashboard1 from '~/assets/images/dashboard/1.png'
import dashboard2 from '~/assets/images/dashboard/2.png'
import dashboard3 from '~/assets/images/dashboard/3.png'

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
</script>

<template>
  <van-swipe class="h-screen" indicator-color="#5F2AFF" :loop="false">
    <van-swipe-item v-for="(item, index) in bannerList" :key="item.title" class="relative">
      <div v-if="index === bannerList.length - 1" class="absolute right-10 top-10 border rounded-2xl px-2 text-xs text-dark color-gray">
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

      <div class="mt-12 h-100 overflow-hidden px-6">
        <img :src="item.img" alt="">
      </div>
    </van-swipe-item>
  </van-swipe>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    layout: dashboard
</route>
