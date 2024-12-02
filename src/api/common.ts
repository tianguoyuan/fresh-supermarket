import { http } from '~/utils/request'

/** 公共-推荐-查找列表 */
export function findCommonRecommendList(params: API.CommonBaseListParams): Promise<API.CommonRecommendListRes> {
  return http.request({ url: '/common/recommendList', method: 'GET', params })
}

/** 商品详情 */
export function findCommonRecommendListFindOne(id: string): Promise<API.FindCommonRecommendListFindOneRes> {
  return http.request({ url: `/common/${id}/recommendListFindOne`, method: 'GET' })
}
