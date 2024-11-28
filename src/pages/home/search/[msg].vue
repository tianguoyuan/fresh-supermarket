<script lang="ts" setup name="/home/search/[msg]">
import { storeToRefs } from 'pinia'
import { findCommonRecommendList } from '~/api/common'
import { findSearchDefaultMsg } from '~/api/home'

const shoppingStore = useShoppingStore()
const { shoppingList } = storeToRefs(shoppingStore)
const { addShoppingList } = shoppingStore

const route = useRoute()
const { msg = '' } = (route.params || {}) as { msg: string }

const router = useRouter()
function back() {
  if (route.query.back) {
    router.replace(decodeURIComponent(route.query.back as string))
  }
  else {
    router.replace('/home/search')
  }
}
const searchMsg = ref(msg)
const result = (await findSearchDefaultMsg())
const placeholderSearch = ref(result.searchDefault)

const initPageParams: API.CommonBaseListParams = {
  pageNum: 1,
  pageSize: 10,
  order: 'asc',
  priceOrder: '',
  saleOrder: '',
}
const pageParams = ref<API.CommonBaseListParams>({
  ...initPageParams,
})
const list = ref<API.CommonRecommendListItem[]>([])
const listLoading = ref(false)
const listFinished = ref(false)
const listMoreNumMax = ref(5)
const refreshing = ref(false)

search({ initFlag: true })

interface SearchProps { value?: string, initFlag?: boolean }
async function search({ value = searchMsg.value, initFlag = false }: SearchProps) {
  listLoading.value = true
  let copySearchMsg = ''
  if (value) {
    copySearchMsg = value
  }
  else if (!searchMsg.value) {
    copySearchMsg = placeholderSearch.value
  }

  if (initFlag) {
    pageParams.value = {
      ...initPageParams,
      priceOrder: pageParams.value.priceOrder,
      saleOrder: pageParams.value.saleOrder,
    }
  }
  else {
    pageParams.value.pageNum += 1

    if (pageParams.value.pageNum >= listMoreNumMax.value) {
      listFinished.value = true
    }
  }

  const result = await findCommonRecommendList({
    ...pageParams.value,
    order: 'asc',
    title: copySearchMsg,
  })
  if (initFlag) {
    list.value = result.list
  }
  else {
    list.value = list.value.concat(result.list)
  }
  await nextTick()
  listLoading.value = false
  refreshing.value = false
}

function changeOrder(flag: 'price' | 'sale') {
  const is = flag === 'price' ? 'priceOrder' : 'saleOrder'
  const currentOrder = pageParams.value[is]
  if (!currentOrder) {
    pageParams.value[is] = 'asc'
  }
  else if (currentOrder === 'asc') {
    pageParams.value[is] = 'desc'
  }
  else if (currentOrder === 'desc') {
    pageParams.value[is] = ''
  }

  search({ initFlag: true })
}
</script>

<template>
  <div>
    <van-nav-bar placeholder fixed>
      <template #left>
        <van-icon name="arrow-left" color="#0B1526" @click="back" />
      </template>
      <template #title>
        <van-search
          v-model="searchMsg" class="search-box h-[46px]" :placeholder="placeholderSearch"
          @search="v => search({ initFlag: true })"
        />
      </template>

      <template #right>
        <RouterLink :to="`/shopping?back=${encodeURIComponent(`/home/search/${msg}`)}`" class="relative">
          <SvgIcon icon-class="shopping" color="#7d7e80" />
          <div v-if="shoppingList.length" class="absolute right--2.5 top-0 h-2 w-2 rounded-full bg-red" />
        </RouterLink>
      </template>
    </van-nav-bar>

    <div class="fixed left-0 right-0 z-1 mt--1px box-border flex b-b b-t b-#f8f9fa bg-white bg-white">
      <div class="top-0 flex flex-1 items-center justify-center py-3" @click="changeOrder('sale')">
        <span>价格</span>
        <div class="flex flex-col pl-1">
          <SvgIcon icon-class="arrow-top" size="8" :color="pageParams.saleOrder === 'asc' ? '#40ae36' : '#666'" />
          <SvgIcon icon-class="arrow-bottom" size="8" :color="pageParams.saleOrder === 'desc' ? '#40ae36' : '#666'" />
        </div>
      </div>
      <div class="top-0 flex flex-1 items-center justify-center py-3" @click="changeOrder('price')">
        <span>销量</span>
        <div class="flex flex-col pl-1">
          <SvgIcon icon-class="arrow-top" size="8" :color="pageParams.priceOrder === 'asc' ? '#40ae36' : '#666'" />
          <SvgIcon icon-class="arrow-bottom" size="8" :color="pageParams.priceOrder === 'desc' ? '#40ae36' : '#666'" />
        </div>
      </div>
    </div>
    <div class="h-42px" />

    <div v-if="list.length" class="m-3">
      <van-pull-refresh v-model="refreshing" @refresh="search({ initFlag: true })">
        <van-list
          v-model:loading="listLoading"
          finished-text="没有更多了"
          :finished="listFinished"
          @load="search({ value: searchMsg })"
        >
          <CardList :list="list" @add="v => addShoppingList(v, true)" />
        </van-list>
      </van-pull-refresh>
    </div>
    <div v-else-if="!listLoading" class="mt-10vh text-center">
      <SvgIcon icon-class="searchNoData" size="125" />
      <p class="mt-5 text-3 color-#999">
        抱歉，没有找到商品哦
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.van-nav-bar__title) {
  width: calc(100vw - 120px);
  max-width: none;

  .van-search__field {
    padding: 0;
  }

  .van-search {
    padding: 0;
  }

  .search-box {
    .van-nav-bar,
    .van-icon {
      color: #8d93a6;
    }
  }
}
</style>

<route lang="yaml">
  meta:
    title: 搜索商品
</route>
