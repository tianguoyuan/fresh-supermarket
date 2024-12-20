<script setup lang="ts" name="/shopping/settleAccount">
import { storeToRefs } from 'pinia'
import { shoppingFindDefaultAddress, shoppingGetCoupon } from '~/api/shopping'
import { ConfigEnum } from '~/enums/ConfigEnum'
import { generateRandomIntegerString } from '~/utils'
import { subtract } from '~/utils/math'
import Coupon from './components/Coupon.vue'
import ShoppingAddress from './components/ShoppingAddress.vue'

const router = useRouter()
function selectAddress() {
  router.push('/shopping/address')
}
const userStore = useUserStore()
const defaultAddress = ref <API.ShoppingFindDefaultAddressRes['defaultAddress'] | null>(null)

const shoppingStore = useShoppingStore()
const { checkedList, priceSum, checkedListNum } = storeToRefs(shoppingStore)
const { removeCheckedList } = shoppingStore
// 优惠券金额
const pickerValue = ref<number[]>([0])
const columns = ref<{ text: number, value: number }[]>([])

// 最后支付金额
const priceSumResult = computed(() => subtract(priceSum.value, pickerValue.value[0]))

// 支付方式
interface IPaymentMethod {
  iconClass: string
  label: string
  active: boolean
}
const paymentMethod = ref<IPaymentMethod[]>([
  { iconClass: 'wechat', label: '微信支付', active: false },
  { iconClass: 'alipay', label: '支付宝支付', active: true },
])
const paymentMethodActiveLabel = computed(() => paymentMethod.value.find(v => v.active)?.label || '')
function changePaymentMethodActive(v: IPaymentMethod) {
  paymentMethod.value.forEach(item => item.active = false)
  v.active = true
}

// 订单备注
const orderRemark = ref('')

// 订单编号
const orderId = ref('')
init()
async function init() {
  const result = await shoppingFindDefaultAddress({ userId: userStore.userInfo.id })
  defaultAddress.value = result.defaultAddress || {}

  const { couponList = [] } = await shoppingGetCoupon()
  columns.value = couponList.map(v => ({ text: v, value: v })).sort((a, b) => a.value - b.value)
}

// 弹窗
const anchors = ConfigEnum.floatingPanelAnchors
const height = ref(anchors[0])
const showEditDialog = ref(false)

function onPaySubmit() {
  // const params = {
  //   paymentMethod: paymentMethodActiveLabel.value,
  //   pickerValue: pickerValue.value[0] || 0,
  //   orderRemark: orderRemark.value,
  // }

  const arr = [
    { label: '接收方', value: '生鲜' },
    { label: '订单编号', value: orderId.value },
    { label: '支付方式', value: paymentMethodActiveLabel.value },
    { label: '付款金额', value: priceSumResult.value },
  ]
  const queryString = encodeURIComponent(JSON.stringify(arr))

  showEditDialog.value = false
  // 删除付款商品
  removeCheckedList()

  router.replace(`/shopping/paymentResult?listData=${queryString}`)
}

function submit() {
  orderId.value = generateRandomIntegerString(13)
  showEditDialog.value = true
}
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed :clickable="false" title="确认订单">
      <template #left>
        <RouterLink to="/shopping">
          <van-icon name="arrow-left" color="#0B1526" />
        </RouterLink>
      </template>
    </van-nav-bar>
    <div v-if="defaultAddress" class="m-3">
      <AddressItem :item="defaultAddress" @handle-click="selectAddress" />
    </div>

    <!-- 地址 -->
    <div class="m-3 rounded-8px bg-white p-3">
      <ShoppingAddress v-for="v in checkedList" :key="v.id" :item="v" />
    </div>

    <!-- 优惠券 -->
    <div class="m-3">
      <Coupon v-model:picker-value="pickerValue" :columns="columns" />
    </div>

    <!-- 支付方式 -->
    <div class="m-3 rounded-8px bg-white p-3">
      <div v-for="v in paymentMethod" :key="v.iconClass" class="flex items-center justify-between pt-3 first:pt-0" @click="changePaymentMethodActive(v)">
        <div class="flex items-center">
          <SvgIcon :icon-class="v.iconClass" size="20" />
          <span class="ml-1">{{ v.label }}</span>
        </div>
        <div>
          <SvgIcon :icon-class="v.active ? 'radio-checked' : 'radio'" />
        </div>
      </div>
    </div>

    <!-- 订单备注 -->
    <div class="m-3 overflow-hidden rounded-8px bg-white">
      <div>
        <van-field
          v-model="orderRemark"
          rows="1"
          autosize
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          show-word-limit
          maxlength="300"
          clearable
        />
      </div>
    </div>

    <!-- 底部提交按钮 -->
    <div class="pb-ios h-16 content-box" />
    <div class="fixed bottom-0 left-0 right-0 b-t b-#ececec bg-white px-3 py-4">
      <div class="pb-ios flex flex-justify-end">
        <div class="flex items-center">
          <div>共{{ checkedListNum }}件, </div>
          <div class="pl-1">
            合计:
          </div>
          <div class="pl-1 color-#F55726">
            <span class="text-3">￥</span>
            <span>{{ priceSumResult }}</span>
          </div>
          <div class="ml-3 rounded-full px-4 py-2 color-white bg-primary" @click="submit">
            提交订单
          </div>
        </div>
      </div>
    </div>

    <!-- 确认付款 -->
    <van-floating-panel v-show="showEditDialog" v-model:height="height" :anchors="anchors">
      <van-overlay :show="showEditDialog" teleport="body" />
      <div class="px-8">
        <div class="relative">
          <div class="text-center text-4">
            确认付款
          </div>
          <SvgIcon icon-class="close" class="absolute bottom-0 right-0 top-0 m-auto" size="14" @click="showEditDialog = false" />
        </div>
        <div class="mt-5 text-center">
          <span>￥</span>
          <span class="text-7 line-height-7">{{ priceSumResult }}</span>
        </div>

        <div class="mt-11 flex justify-between">
          <span class="color-#999">订单编号</span>
          <span>{{ orderId }}</span>
        </div>
        <div class="mt-7 flex justify-between">
          <span class="color-#999">付款方式</span>
          <span>{{ paymentMethodActiveLabel }}</span>
        </div>

        <div class="mt-13 rounded-full text-center color-#fff line-height-11 bg-primary" @click="onPaySubmit">
          立即付款
        </div>
      </div>
    </van-floating-panel>
  </div>
</template>

<style scoped lang="scss">
</style>

<route lang="yaml">
  meta:
    title: 确认订单
</route>
