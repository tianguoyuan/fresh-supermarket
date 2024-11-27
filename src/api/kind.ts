import { http } from '~/utils/request'

/** 分类-列表 */
export function kindList(): Promise<API.KindListRes> {
  return http.request({ url: '/kind/list', method: 'get' })
}
