<script setup lang="ts" name="/home/">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import Navbar from './components/Navbar.vue'
import Recommended from './Recommended.vue'
import Follow from './Follow.vue'
import Nearby from './Nearby.vue'

const tagIndex = ref(1)
const swiperInstance = ref<null | InstanceType<typeof Swiper>>(null)

function setTagIndex(index: number, setSwiper = false) {
  tagIndex.value = index
  if (setSwiper) {
    (swiperInstance.value as any)?.slideTo(index)
  }
}

function onSwiper(v: any) {
  swiperInstance.value = v
}

const loading = ref(false)
function onRefresh() {
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div>
    <Navbar :tag-index="tagIndex" @set-tag-index="setTagIndex" />

    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <Swiper
        :slides-per-view="1"
        :initial-slide="tagIndex"
        class="h-container"
        :allow-touch-move="false"
        @swiper="onSwiper"
      >
        <SwiperSlide><Follow /></SwiperSlide>
        <SwiperSlide><Recommended /></SwiperSlide>
        <SwiperSlide><Nearby /></SwiperSlide>
      </Swiper>
    </van-pull-refresh>
  </div>
</template>

<route lang="yaml">
  meta:
    title: 推荐
    showTabBar: true
</route>
