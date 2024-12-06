<script setup lang="ts" name="/personal/">
import { CountTo } from 'vue3-count-to'
import { personalIntegral } from '~/api/personal'
// import { showDialog } from 'vant'
import { myServer1, myServer2, myServer3, myServer4, myServer5, order1, order2, order3, order4, order5 } from '~/assets/images'
import { openQQHref, phoneMask } from '~/utils'
// import { clearAllStorage } from '~/utils/storage'
import ListCard from './components/ListCard.vue'

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

// 我的服务
const myServerList = [
  { img: myServer1, name: '收货地址' },
  { img: myServer2, name: '足迹' },
  { img: myServer3, name: '我的收藏' },
  { img: myServer4, name: '服务中心' },
  { img: myServer5, name: '在线客服' },
]

// 积分列表
const priceList = ref<API.PersonalIntegralRes['integralList']>([])

init()
async function init() {
  const { integralList = [] } = await personalIntegral({ userId: userInfo.value.id })
  priceList.value = integralList
}

// function outLogin() {
//   showDialog({
//     message: '是否要退出登录？',
//     showCancelButton: true,
//     width: '100%',
//   }).then(() => {
//     userStore.userLoginOut()
//     clearAllStorage()
//   })
// }
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
          <van-icon name="setting-o" class="mr-2 color-white" />
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
      <ListCard :list-data="orderList" right-title="全部订单" title="我的订单" :icon-height="20" />

      <div class="h-3" />

      <ListCard :list-data="myServerList" title="我的服务" :icon-height="25" />

      <!-- <div class="m-4 block py-3 text-center bg-primary btn" @click="outLogin">
        退出登录
      </div> -->
      <RecommendForYou :hide-add="true" />
    </div>
  </div>
</template>

<style scoped>

</style>

<route lang="yaml">
  meta:
    title: 个人
    showTabBar: true
</route>
