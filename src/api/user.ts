import { http } from '~/utils/request'

const { request } = http

/** 用户-获取验证码 */
export function userGetPhoneCode(data: API.UserGetPhoneCode): Promise<API.UserGetPhoneCodeRes> {
  return request({ url: '/user/getPhoneCode', method: 'POST', data })
}

/** 用户-登录 */
export function userLogin(data: API.UserLogin): Promise<API.UserLoginRes> {
  return request({ url: '/user/login', method: 'POST', data })
}

/** 用户-获取信息 */
export function userInfo(): Promise<API.UserInfoRes> {
  return request({ url: '/user/info', method: 'POST' })
}
