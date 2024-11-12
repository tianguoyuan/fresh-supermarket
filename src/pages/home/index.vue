<script setup lang="ts" name="/home/">
import { storeToRefs } from 'pinia'
import { findHomeBanner, findHomeFoodKindBanner, findSearchDefaultMsg } from '~/api/home'

// 定位
const appStore = useAppStore()
const { positionCity } = storeToRefs(appStore)

// 搜索
const { searchDefault = '请输入搜索关键词' } = await findSearchDefaultMsg()
const searchPlaceholder = ref(searchDefault)

// banner
const { banner = [] } = await findHomeBanner()
const bannerList = ref(banner)

// 食品分类
const { foodKindBanner = [] } = await findHomeFoodKindBanner()
const foodKindList = ref(foodKindBanner)
</script>

<template>
  <div class="home">
    <van-nav-bar placeholder fixed :clickable="false">
      <!-- 定位 -->
      <template #left>
        <SvgIcon icon-class="position" size="24" />
        <span class="px-1 color-white">{{ positionCity }}</span>
        <SvgIcon icon-class="lowerTriangle" size="8" />
      </template>

      <template #right>
        <SvgIcon icon-class="sweep" size="24" class="mr-2" />
        <SvgIcon icon-class="message" size="24" />
      </template>
    </van-nav-bar>

    <div class="px-3">
      <!-- 搜索框 -->
      <RouterLink to="/home/search" class="block">
        <van-search
          readonly
          clearable
          :placeholder="searchPlaceholder"
        />
      </RouterLink>

      <!-- banner -->
      <van-swipe class="mt-3 h-[120px]" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.id">
          <van-image
            :src="item.cover"
            height="100%"
            width="100%"
            lazy-load
          />
        </van-swipe-item>
      </van-swipe>

      <!-- 食品分类 -->
      <div class="overflow-x-scroll">
        <div class="mt-5 flex">
          <div v-for="item in foodKindList" :key="item.id" class="w-22% shrink-0 flex-col overflow-hidden px-1">
            <div class="flex justify-center">
              <van-image
                :src="item.cover"
                height="54px"
                width="54px"
                lazy-load
                class="m-auto overflow-hidden rounded-full"
              />
            </div>
            <p class="mt-2 text-truncate text-center text-3 color-[#666]">
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  :deep(.van-nav-bar) {
    background-color: #40ae36 !important;
  }
  :deep(.van-search) {
    margin-top: 12px;
    padding: 0;
    background: #edeff2;
    border-radius: 999px;
    overflow: hidden;
    height: 40px;
    .van-search__content {
      background-color: inherit;
    }
  }
}
</style>

<route lang="yaml">
  meta:
    title: 首页
    showTabBar: true
</route>
