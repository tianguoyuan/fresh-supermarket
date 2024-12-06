import { http } from '~/utils/request'

/** 我的-积分列表 */
export function personalIntegral(data: API.PersonalIntegral): Promise<API.PersonalIntegralRes> {
  return http.request({ url: '/personal/integral', method: 'GET', data })
}
