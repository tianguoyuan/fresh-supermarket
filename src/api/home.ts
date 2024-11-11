import { http } from '~/utils/request'

/** 首页-搜索-默认词 */
export function findSearchDefaultMsg(): Promise<API.SearchDefaultMsgRes> {
  return http.request({ url: '/search/defaultMsg', method: 'GET' })
}

/** 首页-banner */
export function findHomeBanner(): Promise<API.HomeBannerRes> {
  return http.request({ url: '/home/banner', method: 'GET' })
}
