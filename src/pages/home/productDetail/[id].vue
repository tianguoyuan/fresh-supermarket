<script setup lang="ts" name="/home/productDetail/[id]">
import { storeToRefs } from 'pinia'
import { findCommonRecommendListFindOne } from '~/api/common'
import { openQQHref } from '~/utils'

const route = useRoute()
const shoppingStore = useShoppingStore()
const { shoppingList } = storeToRefs(shoppingStore)
const { addShoppingList } = shoppingStore

const router = useRouter()
function back() {
  if (route.query.back) {
    router.replace(decodeURIComponent(route.query.back as string))
  }
  else {
    router.back()
  }
}

const refreshing = ref(false)
const { id = '' } = (route.params || {}) as { id?: string }
const data = ref<API.FindCommonRecommendListFindOneRes>()
await init()
async function init() {
  data.value = await findCommonRecommendListFindOne(id)
  refreshing.value = false
}

// 规格信息
const distributionMode = ref([
  { label: '产地', value: '安徽' },
  { label: '规格', value: '180g/份' },
  { label: '保质期', value: '30天' },
  { label: '储存方式', value: '冷藏' },
])

// 收藏
const isCollect = ref(false)
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed :clickable="false" title="商品详情">
      <template #left>
        <van-icon name="arrow-left" color="#0B1526" @click="back" />
      </template>

      <template #right>
        <div class="flex items-center">
          <ShareSheet />
          <RouterLink :to="`/shopping?back=${encodeURIComponent(route.fullPath)}`" class="relative pl-3 line-height-0">
            <SvgIcon icon-class="shopping" color="#666" />
            <div v-if="shoppingList.length" class="absolute right--2.5 top-0 h-2 w-2 rounded-full bg-red" />
          </RouterLink>
        </div>
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="init">
      <div>
        <van-swipe height="240" autoplay="3000">
          <van-swipe-item v-for="item in data?.coverList" :key="item">
            <van-image :src="item" lazy-load fit="cover" class="h-full w-full" />
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">
              {{ active + 1 }}/{{ total }}
            </div>
          </template>
        </van-swipe>
      </div>

      <!-- 价钱介绍 -->
      <div class="m-3 rounded-2 bg-white p-3">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-[10px] color-#F55726">￥</span>
            <span class="text-4 color-#F55726">{{ data?.price }}</span>
            <span class="ml-2px text-3 color-#999">/箱</span>
          </div>
          <div class="text-9px color-#999">
            <span v-for="item in data?.tagList" :key="item" class="pl-2px">
              <span class="ml-1 border border-#ccc rounded-1 px-2px">{{ item }}</span>
            </span>
          </div>
        </div>
        <div class="line-clamp-2 mt-1 text-18px line-height-6">
          {{ data?.title }}
        </div>
        <div class="mt-2 flex items-center text-3 color-#666">
          <span class="rounded-1 bg-#40AE36 px-1 py-2px color-white">产地量贩</span>
          <span class="pl-1">基地优选</span>
          <span class="pl-1">售后无忧</span>
        </div>
      </div>

      <!-- 配送优惠 -->
      <div v-if="data?.isOneDay && data?.isBargainPrice" class="m-3 rounded-2 bg-white p-3 line-height-4">
        <div v-if="data.isOneDay" class="flex text-3">
          <div class="w-10 flex-shrink-0 color-#999">
            配送
          </div>
          <div>
            上架24H发货，第三方物流配送，免运费
          </div>
        </div>
        <div v-if="data.isBargainPrice" class="flex text-3">
          <div class="w-10 flex-shrink-0 color-#999">
            服务
          </div>
          <div>
            品质保证，生鲜不支持7天无理由退货
          </div>
        </div>
        <div v-if="data.isBargainPrice" class="flex text-3">
          <div class="w-10 flex-shrink-0 color-#999">
            优惠
          </div>
          <div class="line-height-4">
            特价商品每人限购2份
          </div>
        </div>
      </div>

      <!-- 规格信息 -->
      <div class="m-3 rounded-2 bg-white p-3">
        <div class="text-14px">
          规格信息
        </div>
        <div class="mt-3 overflow-hidden border border-#ececec rounded-1">
          <div
            v-for="item in distributionMode" :key="item.label"
            class="h-7 flex border-t border-#ececec line-height-7 first:border-t-0"
          >
            <div class="w-21 border-r border-#ececec bg-#f8f9fa px-3 color-#666">
              {{ item.label }}
            </div>
            <div class="ml-4">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>

      <div class="h-16" />
      <div class="fixed bottom-0 left-0 right-0 flex items-center bg-white pl-3">
        <div class="flex text-3">
          <div class="flex flex-col items-center" @click="isCollect = !isCollect">
            <SvgIcon :icon-class="isCollect ? 'collect-full' : 'collect'" />
            <span class="mt-1">收藏</span>
          </div>
          <div
            class="ml-3 flex flex-col items-center"
            @click="openQQHref"
          >
            <SvgIcon icon-class="customerService" />
            <span class="mt-1">客服</span>
          </div>
        </div>
        <div class="m-3 flex flex-1 items-center justify-center rounded-full py-3 color-white bg-primary" @click="data && addShoppingList(data, true)">
          加入购物车
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 8px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border-radius: 999px;
}
</style>

<route lang="yaml">
  meta:
    title: 商品详情
</route>
