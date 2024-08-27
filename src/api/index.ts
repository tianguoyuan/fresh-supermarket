import { http } from '~/utils/request'

const { request } = http
export function login(data: API.ILogin): Promise<API.ILoginRes> {
  return request({ url: '/auth/login', method: 'POST', data })
}

export function getUserInfo(data: API.IUserInfo): Promise<API.IUserInfoRes> {
  return request({ url: '/auth/userInfo', method: 'POST', data })
}

export function userLogout(): Promise<void> {
  return request({ url: '/auth/logout', method: 'POST' })
}
