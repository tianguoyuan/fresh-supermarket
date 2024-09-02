<script setup lang="ts">
import banner1 from '~/assets/images/home/banner1.png'
import banner2 from '~/assets/images/home/banner2.png'
import banner3 from '~/assets/images/home/banner3.png'
import banner4 from '~/assets/images/home/banner4.png'

const bannerList = [
  banner1,
  banner2,
  banner3,
  banner4,
]

function init() {

}

defineExpose({
  init,
})
</script>

<template>
  <div>
    <van-swipe class="m-4 h-30" :autoplay="5000" indicator-color="white" lazy-render>
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item" alt="" class="w-full" :draggable="false">
      </van-swipe-item>
    </van-swipe>

    <input type="text">
  </div>
</template>

<style scoped>

</style>
