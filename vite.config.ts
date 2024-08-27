import path from 'node:path'
import process from 'node:process'
import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Layouts from 'vite-plugin-vue-layouts'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'
import { VantResolver } from '@vant/auto-import-resolver'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const { VITE_OPEN, VITE_MOCK_DEV_SERVER, VITE_PORT, VITE_PUBLIC_PATH } = loadEnv(mode, root)

  return {
    base: VITE_PUBLIC_PATH,
    server: {
      host: '0.0.0.0',
      port: +VITE_PORT,
      open: VITE_OPEN,
      proxy: {
        '/api': {
          target: 'http://localhost:9993',
          changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, "")
        },
      },
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    plugins: [
      VueMacros({
        defineOptions: false,
        defineModels: false,
        plugins: {
          vue: Vue({
            script: {
              propsDestructure: true,
              defineModel: true,
            },
          }),
        },
      }),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        dts: './src/types/types-router.d.ts',
        exclude: 'src/pages/**/components/**',
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
          'vue-i18n',
          VueRouterAutoImports,
          {
            // add any other imports you were relying on
            'vue-router/auto': ['useLink'],
          },
        ],
        dts: './src/types/auto-imports.d.ts',
        dirs: [
          './src/composables',
          './src/stores',
        ],
        vueTemplate: true,
        resolvers: [VantResolver()],
      }),

      // https://github.com/antfu/vite-plugin-components
      Components({
        dts: './src/types/components.d.ts',
        resolvers: [VantResolver()],
      }),

      // https://github.com/antfu/unocss
      // see uno.config.ts for config
      UnoCSS(),
      // MOCK 服务
      VITE_MOCK_DEV_SERVER ? mockDevServerPlugin() : null,

      // i18n
      VueI18nPlugin({
        include: [path.resolve(__dirname, 'src/locales/**')],
      }),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
      environment: 'jsdom',
    },
  }
})
