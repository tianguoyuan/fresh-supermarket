import { http } from '~/utils/request'

const { request } = http

/** 推荐 */

/** 列表标签 */
export function recommendedTagsFind(data: API.RecommendedTagsFind): Promise<API.RecommendedTagsFindRes> {
  return request({ url: '/recommended/tags/find', method: 'POST', data })
}

/** 查找列表 */
export function recommendedListFind(data: API.RecommendedListFind): Promise<API.RecommendedListFindRes> {
  return request({ url: '/recommended/list/find', method: 'POST', data })
}
