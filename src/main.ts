import { createApp } from 'vue'

import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

import { setupRouter, setupStore } from '~/modules'

async function bootstrap() {
  const app = createApp(App)

  // pinia
  setupStore(app)

  // router
  setupRouter(app)

  app.mount('#app')
}
bootstrap()
