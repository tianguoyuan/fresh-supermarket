/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'unplugin-vue-router/types'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/add/': RouteRecordInfo<'/add/', '/add', Record<never, never>, Record<never, never>>,
    '/community/': RouteRecordInfo<'/community/', '/community', Record<never, never>, Record<never, never>>,
    '/home/': RouteRecordInfo<'/home/', '/home', Record<never, never>, Record<never, never>>,
    '/locationCity/': RouteRecordInfo<'/locationCity/', '/locationCity', Record<never, never>, Record<never, never>>,
    '/message/': RouteRecordInfo<'/message/', '/message', Record<never, never>, Record<never, never>>,
    '/personal/': RouteRecordInfo<'/personal/', '/personal', Record<never, never>, Record<never, never>>,
    '/redirect': RouteRecordInfo<'/redirect', '/redirect', Record<never, never>, Record<never, never>>,
    '/search/': RouteRecordInfo<'/search/', '/search', Record<never, never>, Record<never, never>>,
    '/search/result': RouteRecordInfo<'/search/result', '/search/result', Record<never, never>, Record<never, never>>,
    '/user/[id]': RouteRecordInfo<'/user/[id]', '/user/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/user/login': RouteRecordInfo<'/user/login', '/user/login', Record<never, never>, Record<never, never>>,
    '/user/register': RouteRecordInfo<'/user/register', '/user/register', Record<never, never>, Record<never, never>>,
  }
}
