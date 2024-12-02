<script setup lang="ts" name="/kind/">
import type { IndexBarInstance } from 'vant'
import { kindList } from '~/api/kind'

const refreshing = ref(false)
const shoppingStore = useShoppingStore()
const { addShoppingList } = shoppingStore

const module = ref<API.KindListRes['module']>([])
const sidebarList = ref<string[]>([])
const sidebarActive = ref(0)

init()
async function init() {
  const { module: moduleResult } = await kindList()
  const keys = moduleResult.map(v => v.moduleTitle)
  sidebarList.value = keys
  module.value = moduleResult
  refreshing.value = false
}

const indexBarRef = ref<null | IndexBarInstance>(null)
function onChangeSidebarActive() {
  indexBarRef.value?.scrollTo(module.value[sidebarActive.value]?.moduleTitle)
}
function onChangeListIndex(key: string) {
  const index = module.value.findIndex(v => v.moduleTitle === key)
  sidebarActive.value = index
}

// 恢复上次看到 选项卡位置
onActivated(async () => {
  await nextTick()
  if (module.value[sidebarActive.value]) {
    indexBarRef.value?.scrollTo(module.value[sidebarActive.value].moduleTitle)
  }
})
</script>

<template>
  <div class="flex flex-1 flex-col flex-wrap">
    <van-nav-bar placeholder fixed title="分类">
      <template #right>
        <ShareSheet />
      </template>
    </van-nav-bar>

    <div class="flex flex-1 flex-shrink-0 flex-basis-none overflow-hidden">
      <div class="overflow-auto">
        <van-sidebar v-model="sidebarActive" class="vanSidebar" @change="onChangeSidebarActive">
          <van-sidebar-item v-for="v in sidebarList" :key="v" :title="v" />
        </van-sidebar>
      </div>
      <div id="kindListRightContainer" class="flex-1 overflow-auto p-3">
        <van-pull-refresh v-model="refreshing" class="flex flex-1 flex-col flex-wrap" @refresh="init()">
          <van-index-bar ref="indexBarRef" :index-list="sidebarList" :sticky="false" @change="onChangeListIndex">
            <template v-for="item in module" :key="item.moduleTitle">
              <van-index-anchor :index="item.moduleTitle">
                <span class="text-3 color-#999">{{ item.moduleTitle }}</span>
              </van-index-anchor>
              <CardList :list="item.list" @add="v => addShoppingList(v, true)" />
            </template>
          </van-index-bar>
        </van-pull-refresh>
      </div>
    </div>

    <van-back-top bottom="15vh" target="#kindListRightContainer" />
  </div>
</template>

<style lang="scss" scoped>
.vanSidebar {
  background-color: #f8f9fa;
  width: 90px;
  ::v-deep(.van-sidebar-item) {
    color: #666;
    font-size: 12px;
    font-weight: 400;
    text-align: center;
  }
  ::v-deep(.van-sidebar-item--select) {
    color: #40ae36;
    &::before {
      display: none;
    }
  }
}

::v-deep(.van-index-bar__sidebar) {
  display: none;
}
</style>

<route lang="yaml">
  meta:
    title: 分类
    showTabBar: true
</route>
