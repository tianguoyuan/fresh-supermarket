<script setup lang="ts">
import List from './List.vue'
import { recommendedListFind, recommendedTagsFind } from '~/api/recommended'

const kindList = ref<API.RecommendedTagsFindRes['kindList']>([])
const tagList = ref<API.RecommendedTagsFindRes['tagList']>([])
const orderList = ref<API.RecommendedTagsFindRes['orderList']>([])

const list = ref<API.RecommendedListFindRes['list']>([])
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)
const listLoading = ref(true) // 列表是否加载中-上拉刷新
const refreshing = ref(false) // 下拉刷新loading

const finished = computed(() => {
  if (listLoading.value || total.value === 0)
    return false
  return (pageNum.value * pageSize.value) >= total.value
})
const tagIndex = ref<number>(0)
const orderIndex = ref<number>(0)
const kindIndex = ref<number>(0)
function setTagIndex(index: number) {
  tagIndex.value = index
  findList(true)
}

// 查询tagList
recommendedTagsFind({}).then((data) => {
  kindList.value = data.kindList
  tagList.value = data.tagList
  orderList.value = data.orderList
  findList(true)
})

// 查询列表
function findList(initPage?: boolean) {
  listLoading.value = true
  if (initPage) {
    pageNum.value = 1
  }
  else {
    pageNum.value += 1
  }

  recommendedListFind({
    kindId: kindList.value[kindIndex.value]?.id || '',
    orderId: orderList.value[orderIndex.value]?.id || '',
    tagId: tagList.value[tagIndex.value]?.id || '',
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }).then((data) => {
    total.value = data.total
    if (initPage) {
      list.value = data.list
    }
    else {
      list.value = list.value.concat(data.list)
    }
    nextTick(() => {
      listLoading.value = false
      refreshing.value = false
    })
  })
}
</script>

<template>
  <div class="listTag">
    <div class="relative min-h-[42px] flex items-end py-3">
      <span v-for="(item, index) in tagList" :key="item.id" class="mr-3 transition-all color-gray" :class="{ active: index === tagIndex }" @click="setTagIndex(index)">
        {{ item.title }}
      </span>
      <div class="control-btn absolute bottom-0 right-0">
        <van-dropdown-menu auto-locate>
          <van-dropdown-item>
            <template #title>
              <van-icon name="list-switch" />
            </template>
            <template #default>
              <div class="p-3">
                筛选
              </div>
            </template>
          </van-dropdown-item>
        </van-dropdown-menu>
      </div>
    </div>
    <van-pull-refresh v-model="refreshing" @refresh="findList(true)">
      <List :list-data="list" :list-loading="listLoading" :finished="finished" @load="findList" />
    </van-pull-refresh>
  </div>
</template>

<style scoped lang="scss">
.listTag {
  .active {
    color: #0b1526;
    font-size: 18px;
  }

  ::v-deep(.van-dropdown-menu__bar) {
    background-color: transparent;
  }
}
</style>
