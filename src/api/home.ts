import { http } from '~/utils/request'

/** 首页-banner */
export function findHomeBanner(): Promise<API.HomeBannerRes> {
  return http.request({ url: '/home/banner', method: 'GET' })
}

/** 首页-食品分类 */
export function findHomeFoodKindBanner(): Promise<API.HomeFoodKindBannerRes> {
  return http.request({ url: '/home/foodKindBanner', method: 'GET' })
}

/** 首页-商品标签 */
export function findHomeTagList(): Promise<API.FindHomeTagListRes> {
  return http.request({ url: '/home/tagList', method: 'GET' })
}

/** 首页-超划算列表 */
export function findHomeGreatDealList(params: API.CommonBaseListParams): Promise<API.FindHomeGreatDealListRes> {
  return http.request({ url: '/home/greatDealList', method: 'GET', params })
}

/** 首页-列表 */
export function findHomeList(params: API.FindHomeList): Promise<API.FindHomeListRes> {
  return http.request({ url: '/home/list', method: 'GET', params })
}

/** 首页-搜索-默认词 */
export function findSearchDefaultMsg(): Promise<API.SearchDefaultMsgRes> {
  return http.request({ url: '/search/defaultMsg', method: 'GET' })
}
/** 首页-搜索-热门 */
export function findSearchHotTag(): Promise<API.SearchHotTagRes> {
  return http.request({ url: '/search/hotTag', method: 'GET' })
}
