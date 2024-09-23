<script setup lang="ts">
import Banner from './components/Banner.vue'
import ListTag from './components/ListTag.vue'
import { recommendedBannerList } from '~/api/recommended'

function init() {

}

defineExpose({
  init,
})

const result = await recommendedBannerList()
const bannerList = result.list.map(item => item.img)
</script>

<template>
  <div class="p-3">
    <Banner :banner-list="bannerList" />

    <ListTag />
  </div>
</template>

<style scoped>

</style>
