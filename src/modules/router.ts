import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getScreenBannerStorage } from '~/utils/storage'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
  parent: '#app',
})

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: routes => setupLayouts(routes),
})

export function setupRouter(app: App) {
  app.use(router)
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 配置标题
  useTitle(`${to.meta.title}-${import.meta.env.VITE_GLOB_APP_TITLE}`)
  const hasScreenBanner = getScreenBannerStorage()
  if (to.path === '/' && hasScreenBanner) {
    next('/home')
    return
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
