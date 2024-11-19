<script setup lang="ts" name="/home/">
import { storeToRefs } from 'pinia'
import { findHomeBanner, findHomeFoodKindBanner, findHomeGreatDealList, findHomeList, findHomeTagList, findSearchDefaultMsg } from '~/api/home'

// 购物车store
const shoppingStore = useShoppingStore()
const { addShoppingList } = shoppingStore

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

// 超划算列表
const greatDealData = await findHomeGreatDealList({ pageNum: 1, pageSize: 3, order: 'asc' })

// 列表标签
const { tagList } = await findHomeTagList()
const tagIndex = ref<string>(tagList[0]?.id)
const list = ref<API.FindHomeListRes['list']>([])

watch(tagIndex, async (v) => {
  const homeListResult = await findHomeList({ pageNum: 1, pageSize: 10, order: 'asc', tagId: v })
  list.value = homeListResult.list
}, {
  immediate: true,
})
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
          <div v-for="item in foodKindList" :key="item.id" class="w-22% flex shrink-0 flex-col overflow-hidden px-1">
            <div class="flex justify-center">
              <van-image
                :src="item.cover"
                height="54px"
                width="54px"
                lazy-load
                class="m-auto overflow-hidden rounded-full"
              />
            </div>
            <p class="text-truncate pt-2 text-center text-3 color-[#666]">
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>

      <!-- 超划算 -->
      <div class="mt-3 rounded-2 bg-white p-3 pb-0">
        <div class="flex justify-between">
          <div class="flex items-end">
            <span class="text-4">{{ greatDealData.title }}</span>
            <span class="ml-1 rounded-2px bg-#EC9F09 px-2px py-2px text-9px color-white">{{ greatDealData.desc }}</span>
          </div>
          <div class="text-3 color-primary">
            查看全部
          </div>
        </div>
        <div class="grid grid-cols-3 mt-10px">
          <CardItem v-for="item in greatDealData.list.slice(0, 3)" :key="item.id" :item="item" single @add="addShoppingList(item, true)" />
        </div>
      </div>

      <!-- 列表标签 -->
      <div class="mt-5 flex">
        <div v-for="(item, index) in tagList" :key="item.id" class="relative flex-1 flex-shrink-0 items-center text-center" @click="tagIndex = item.id">
          <div class="text-4 line-height-5" :class="[tagIndex === item.id ? 'color-#40AE36' : 'color-#333']">
            {{ item.title }}
          </div>
          <div>
            <span class="py-2px text-3 line-height-4" :class="[tagIndex === item.id ? 'rounded-full bg-primary px-6px color-white' : 'color-#999 ']">
              {{ item.desc }}
            </span>
          </div>
          <div v-if="index !== tagList.length - 1" class="absolute bottom-0 right-0 top-0 m-auto h-18px w-1px bg-#ececec" />
        </div>
      </div>
      <!-- 列表 -->
      <div class="mt-4">
        <Card :list="list" />
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
