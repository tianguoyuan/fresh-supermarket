<script setup lang="ts" name="/personal/myOrder">
const route = useRoute()
const { activeIndex = '-1' } = route.query as { activeIndex: string }

const active = ref(+activeIndex + 1)
const tabList = [
  { name: '全部' },
  { name: '待付款' },
  { name: '待发货' },
  { name: '待收货' },
  { name: '待评价' },
  { name: '退款/售后' },
]
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed :clickable="false" title="我的订单">
      <template #left>
        <RouterLink :to="route.query.back ? decodeURIComponent(route.query.back as string) : '/personal'" replace>
          <van-icon name="arrow-left" color="#0B1526" />
        </RouterLink>
      </template>
    </van-nav-bar>

    <van-tabs v-model:active="active" sticky offset-top="47">
      <van-tab v-for="(v, i) in tabList" :key="i" :title="v.name">
        <div class="mt-20% flex flex-col items-center">
          <SvgIcon height="122" width="103" icon-class="emptyListData" />
          <div class="mt-10 text-4 color-#999">
            抱歉，没有找到订单哦
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
  meta:
    title: 我的订单
</route>
