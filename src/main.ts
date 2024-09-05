import { createApp } from 'vue'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import { setupI18n, setupRouter, setupStore } from '~/modules'

// 函数调用没有样式
import 'swiper/css'
import '@vant/touch-emulator'
import 'vant/lib/dialog/style'
import 'vant/lib/toast/style'

async function bootstrap() {
  const app = createApp(App)

  // pinia
  setupStore(app)

  // i18n
  setupI18n(app)

  // router
  setupRouter(app)

  app.mount('#app')
}
bootstrap()
