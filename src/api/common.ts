import { http } from '~/utils/request'

/** 首页-搜索-默认词 */
export function findCommonRecommendList(): Promise<API.CommonRecommendListRes> {
  return http.request({ url: '/common/recommendList', method: 'GET' })
}
