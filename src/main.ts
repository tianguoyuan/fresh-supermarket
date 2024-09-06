import { createApp } from 'vue'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
// vant-ui
import '~/modules/vant'

import { setupI18n, setupRouter, setupStore } from '~/modules'

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
