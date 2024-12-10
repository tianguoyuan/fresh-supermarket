<script setup lang="ts" name="/shopping/settleAccount">
import { shoppingFindDefaultAddress } from '~/api/shopping'

const router = useRouter()
function selectAddress() {
  router.push('/shopping/address')
}
const userStore = useUserStore()
const defaultAddress = ref <API.ShoppingFindDefaultAddressRes['defaultAddress'] | null>(null)
init()
async function init() {
  const result = await shoppingFindDefaultAddress({ userId: userStore.userInfo.id })
  defaultAddress.value = result.defaultAddress || {}
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

    <div class="h-10" />
  </div>
</template>

<style scoped lang="scss"></style>

<route lang="yaml">
  meta:
    title: 确认订单
</route>
