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
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...all]': RouteRecordInfo<'/[...all]', '/:all(.*)', { all: ParamValue<true> }, { all: ParamValue<false> }>,
    '/home/': RouteRecordInfo<'/home/', '/home', Record<never, never>, Record<never, never>>,
    '/home/search/': RouteRecordInfo<'/home/search/', '/home/search', Record<never, never>, Record<never, never>>,
    '/kind/': RouteRecordInfo<'/kind/', '/kind', Record<never, never>, Record<never, never>>,
    '/personal/': RouteRecordInfo<'/personal/', '/personal', Record<never, never>, Record<never, never>>,
    '/redirect': RouteRecordInfo<'/redirect', '/redirect', Record<never, never>, Record<never, never>>,
    '/shopping/': RouteRecordInfo<'/shopping/', '/shopping', Record<never, never>, Record<never, never>>,
    '/user/login': RouteRecordInfo<'/user/login', '/user/login', Record<never, never>, Record<never, never>>,
    '/user/register': RouteRecordInfo<'/user/register', '/user/register', Record<never, never>, Record<never, never>>,
  }
}
