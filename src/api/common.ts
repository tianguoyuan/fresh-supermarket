import { http } from '~/utils/request'

/** 公共-推荐-查找列表 */
export function findCommonRecommendList(): Promise<API.CommonRecommendListRes> {
  return http.request({ url: '/common/recommendList', method: 'GET' })
}

/** 商品详情 */
export function findCommonRecommendListFindOne(id: string): Promise<API.CommonRecommendListItem> {
  return http.request({ url: `/common/${id}/recommendListFindOne`, method: 'GET' })
}
