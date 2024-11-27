<script setup lang="ts" name="/kind/">
import type { IndexBarInstance } from 'vant'
import { kindList } from '~/api/kind'

const shoppingStore = useShoppingStore()
const { addShoppingList } = shoppingStore

const { module } = await kindList()
const keys = module.map(v => v.moduleTitle)

const sidebarList = ref(keys)
const sidebarActive = ref(0)

const indexBarRef = ref<null | IndexBarInstance>(null)
function onChangeSidebarActive() {
  indexBarRef.value?.scrollTo(module[sidebarActive.value].moduleTitle)
}
function onChangeListIndex(key: string) {
  const index = module.findIndex(v => v.moduleTitle === key)
  sidebarActive.value = index
}
</script>

<template>
  <div class="flex flex-1 flex-col flex-wrap">
    <van-nav-bar placeholder fixed title="分类" />

    <div class="flex flex-1 flex-shrink-0 flex-basis-none overflow-hidden">
      <div class="overflow-auto">
        <van-sidebar v-model="sidebarActive" class="vanSidebar" @change="onChangeSidebarActive">
          <van-sidebar-item v-for="v in sidebarList" :key="v" :title="v" />
        </van-sidebar>
      </div>
      <div id="kindListRightContainer" class="flex-1 overflow-auto p-3">
        <van-index-bar ref="indexBarRef" :index-list="keys" :sticky="false" @change="onChangeListIndex">
          <template v-for="item in module" :key="item.moduleTitle">
            <van-index-anchor :index="item.moduleTitle">
              {{ item.moduleTitle }}
            </van-index-anchor>
            <Card :list="item.list" hide-animation @add="v => addShoppingList(v, true)" />
          </template>
        </van-index-bar>
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
