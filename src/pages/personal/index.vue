<script setup lang="ts" name="/personal/">
import { type ActionSheetAction, showToast } from 'vant'
import { CountTo } from 'vue3-count-to'
import { personalIntegral } from '~/api/personal'
// import { showDialog } from 'vant'
import { myServer1, myServer2, myServer3, myServer4, myServer5, order1, order2, order3, order4, order5 } from '~/assets/images'
import { openQQHref, phoneMask } from '~/utils'
import { clearAllStorage } from '~/utils/storage'
// import { clearAllStorage } from '~/utils/storage'
import ListCard from './components/ListCard.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

// 订单功能
const orderList = [
  { img: order1, name: '待付款', active: true },
  { img: order2, name: '待发货' },
  { img: order3, name: '待收货' },
  { img: order4, name: '待评价' },
  { img: order5, name: '退款/售后' },
]
function onOrderListRightClick() {
  router.push('/personal/myOrder')
}
function onOrderListClick(i: number) {
  router.push(`/personal/myOrder?activeIndex=${i}`)
}

// 我的服务
const myServerList = [
  { img: myServer1, name: '收货地址', path: `/shopping/address?back=${encodeURIComponent(route.fullPath)}` },
  { img: myServer2, name: '足迹' },
  { img: myServer3, name: '我的收藏' },
  { img: myServer4, name: '服务中心' },
  { img: myServer5, name: '在线客服' },
]
function onServerListClick(i: number) {
  const item = myServerList[i]
  if (!item)
    return
  if (item.path) {
    router.push(item.path)
  }
  else {
    showToast({ message: '正在开发中...' })
  }
}

// 积分列表
const priceList = ref<API.PersonalIntegralRes['integralList']>([])

init()
async function init() {
  const { integralList = [] } = await personalIntegral({ userId: userInfo.value.id })
  priceList.value = integralList
}

// 设置
const settingShow = ref(false)
const settingActions: ActionSheetAction[] = [{ name: '退出登录' }]
function openSetting() {
  settingShow.value = true
}
function onSelectSetting(action: ActionSheetAction = {}) {
  if (action.name === '退出登录') {
    showDialog({
      message: '是否要退出登录？',
      showCancelButton: true,
      width: '100%',
      theme: 'round-button',
    }).then(() => {
      settingShow.value = false
      userStore.userLoginOut()
      clearAllStorage()
    })
  }
}
</script>

<template>
  <div>
    <!-- 用户信息 -->
    <div class="rounded-b-10 bg-primary">
      <div class="flex justify-between p-4">
        <div class="flex items-center">
          <div class="h-14 w-14 overflow-hidden rounded-full">
            <van-image :src="userInfo.img" alt="" class="h-full w-full" />
          </div>
          <div class="pl-4">
            <div class="text-4 color-white">
              {{ userInfo.name }}
            </div>
            <div class="mt-1 text-3 color-white">
              {{ phoneMask(userInfo.phone) }}
            </div>
          </div>
        </div>

        <div class="text-5">
          <van-icon name="setting-o" class="mr-2 color-white" @click="openSetting" />
          <van-icon name="phone-o" class="color-white" @click="openQQHref()" />
        </div>
      </div>

      <!-- 我的积分 -->
      <div class="mt-1 flex pb-26 color-white">
        <div v-for="(item, index) in priceList" :key="index" class="flex-1 text-center">
          <p class="text-[18px] line-height-6">
            <CountTo :start-val="0" :end-val="item.value" :duration="3000" />
          </p>
          <p class="text-3 line-height-17px">
            {{ item.label }}
          </p>
        </div>
      </div>
    </div>

    <!-- 我的订单 -->
    <div class="mt--21">
      <ListCard
        :list-data="orderList" right-title="全部订单" title="我的订单" :icon-height="20"
        @on-right-click="onOrderListRightClick"
        @on-handle-click="onOrderListClick"
      />

      <div class="h-3" />

      <ListCard :list-data="myServerList" title="我的服务" :icon-height="25" />
      <RecommendForYou :hide-add="true" @on-handle-click="onServerListClick" />
    </div>

    <van-action-sheet
      v-model:show="settingShow" :actions="settingActions" cancel-text="取消"
      @cancel="settingShow = false" @select="onSelectSetting"
    />
  </div>
</template>

<style scoped></style>

<route lang="yaml">
  meta:
    title: 个人
    showTabBar: true
</route>
