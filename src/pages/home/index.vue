<script setup lang="ts" name="/home/">
import { Swiper, SwiperSlide } from 'swiper/vue'
import Navbar from './components/Navbar.vue'
import Recommended from './Recommended.vue'
import Follow from './Follow.vue'
import Nearby from './Nearby.vue'

const tagIndex = ref(1)
const swiperInstance = ref<null | InstanceType<typeof Swiper>>(null)
const isPageArr = ref<number[]>([tagIndex.value])

function setTagIndex(index: number, setSwiper = false) {
  if (!isPageArr.value.includes(index)) {
    isPageArr.value.push(index)
  }
  tagIndex.value = index
  if (setSwiper) {
    (swiperInstance.value as any)?.slideTo(index)
  }
}

function onSwiper(v: any) {
  swiperInstance.value = v
}
</script>

<template>
  <div>
    <Navbar :tag-index="tagIndex" @set-tag-index="setTagIndex" />

    <Swiper
      :slides-per-view="1"
      :initial-slide="tagIndex"
      :allow-touch-move="false"
      @swiper="onSwiper"
    >
      <SwiperSlide><Follow v-if="isPageArr.includes(0)" class="h-full" /></SwiperSlide>
      <SwiperSlide><Recommended class="h-full" /></SwiperSlide>
      <SwiperSlide><Nearby v-if="isPageArr.includes(2)" class="h-full" /></SwiperSlide>
    </Swiper>
  </div>
</template>

<route lang="yaml">
  meta:
    title: 推荐
    showTabBar: true
</route>
