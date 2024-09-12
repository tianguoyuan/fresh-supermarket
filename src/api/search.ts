import { http } from '~/utils/request'

const { request } = http

/** 搜索-热门 */
export function searchHotTagFind(): Promise<API.SearchHotTagFindRes> {
  return request({ url: '/search/hot/tag/find', method: 'POST' })
}

/** 搜索-热门 */
export function searchHotFind(data: API.SearchHotFind): Promise<API.SearchHotFindRes> {
  return request({ url: '/search/hot/find', method: 'POST', data })
}

/** 搜索-默认关键词 */
export function searchDefaultMsgFind(): Promise<API.SearchDefaultMsgFindRes> {
  return request({ url: '/search/defaultMsg/find', method: 'POST' })
}
