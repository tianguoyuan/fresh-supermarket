<script setup lang="ts">
import Banner from './components/Banner.vue'
import ListTag from './components/ListTag.vue'

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
  <div class="m-3">
    <Banner :banner-list="bannerList" />

    <ListTag />
  </div>
</template>

<style scoped>

</style>
