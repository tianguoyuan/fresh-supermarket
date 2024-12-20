<script setup lang="ts" name="/shopping/paymentResult">
import { showDialog } from 'vant'

const router = useRouter()
const route = useRoute()

let listData: { label: string, value: string }[] = []
try {
  listData = JSON.parse(decodeURIComponent(route.query.listData as string || '[]'))
}
// eslint-disable-next-line unused-imports/no-unused-vars
catch (error) {
  listData = []

  showDialog({ message: '页面参数错误', theme: 'round-button' }).then(() => {
    router.replace('/home')
  })
}
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed :clickable="false" title="确认订单">
      <template #left>
        <RouterLink to="/home" replace>
          <van-icon name="wap-home-o" color="#0B1526" size="20" />
        </RouterLink>
      </template>
    </van-nav-bar>

    <div class="mx-3">
      <div class="flex items-center justify-center">
        <SvgIcon icon-class="radio-checked" size="60" class="mt-13" />
      </div>
      <div class="mt-3 text-center line-height-21px">
        付款成功
      </div>

      <div class="mt-7 rounded-8px bg-white p-3 line-height-5">
        <div v-for="(v, i) in listData" :key="i" class="flex justify-between border-b border-#ececec py-3 last:border-b-0 first:pt-0 last:pb-0">
          <span class="color-#999">{{ v.label }}</span>
          <span>{{ v.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
  meta:
    title: 付款结果
</route>
