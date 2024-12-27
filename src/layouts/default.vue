<script setup lang="ts">
import SvgIcon from '~/components/SvgIcon.vue'
import { ColorEnums } from '~/enums/ColorEnum'

interface ITabbarList {
  url: string
  title: string
  icon?: string
  vanIcon?: string
}
const tabbarList: ITabbarList[] = [
  {
    url: '/home',
    title: '首页',
    icon: 'home',
  },
  {
    url: '/kind',
    title: '分类',
    icon: 'kind',

  },
  {
    url: '/shopping',
    title: '购物车',
    icon: 'shopping',
  },
  {
    url: '/personal',
    title: '我的',
    icon: 'personal',
  },
]

const route = useRoute()
const router = useRouter()

// 页面全部回到顶部
watch(() => route.path, async () => {
  document.querySelector('#layoutDefaultContainer')?.scrollTo(10, 0)

  await nextTick()
  setTimeout(() => {
    document.querySelector('#layoutDefaultContainer')?.scrollTo(0, 0)
  }, 300)
})

const activeIndex = computed(() => {
  return tabbarList.findIndex(v => v.url === route.path) || 0
})
function toPath(url: string) {
  router.push(url)
}

const cacheViews = computed(() => router.getRoutes().filter(route => !route.meta.noCache && route.name).map(v => v.name as string))
// eslint-disable-next-line no-console
console.log('routeName', cacheViews.value, router.getRoutes())

const activeColor = ColorEnums.primary
const inactiveColor = '#7d7e80'
</script>

<template>
  <!-- 回到顶部 -->
  <van-back-top bottom="15vh" target="#layoutDefaultContainer" />
  <div id="layoutDefault" class="flex flex-col">
    <!-- 内容展示 -->
    <div id="layoutDefaultContainer" class="flex flex-1 flex-col overflow-auto">
      <RouterView v-slot="{ Component, route: currentRoute }">
        <Transition
          name="fade-transform"
          mode="out-in"
        >
          <KeepAlive :include="cacheViews">
            <component
              :is="Component"
              :key="currentRoute.fullPath"
            />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
    <!-- 首页 底部选项卡 -->
    <div class="tabbar">
      <VanTabbar v-if="route.meta.showTabBar" :model-value="activeIndex" safe-area-inset-bottom placeholder :fixed="false" :active-color="activeColor" :inactive-color="inactiveColor" border>
        <VanTabbarItem v-for="(item) in tabbarList" :key="item.url" class="relative transition-all" @click="toPath(item.url)">
          <template v-if="item.title">
            {{ item.title }}
          </template>
          <template #icon="props">
            <SvgIcon v-if="item.icon" :icon-class="item.icon" :color="props.active ? activeColor : inactiveColor" size="20" />
            <VanIcon v-if="item.vanIcon" :name="item.icon" size="50" :color="props.active ? activeColor : inactiveColor" />

            <div v-if="item.url === '/shopping'" class="absolute right--2.5 top-0 h-2 w-2 rounded-full bg-red" />
          </template>
        </VanTabbarItem>
      </VanTabbar>
    </div>
  </div>
</template>

<style lang="scss">
#layoutDefault {
  height: 100vh;
}

/* Avoid Chrome to see Safari hack */
@supports (-webkit-touch-callout: none) {
  #layoutDefault {
    /* The hack for Safari */
    height: -webkit-fill-available;
  }
}
</style>
