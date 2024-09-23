import { http } from '~/utils/request'

export function login(data: API.ILogin): Promise<API.ILoginRes> {
  return http.request({ url: '/auth/login', method: 'POST', data })
}

export function getUserInfo(data: API.IUserInfo): Promise<API.IUserInfoRes> {
  return http.request({ url: '/auth/userInfo', method: 'POST', data })
}

export function userLogout(): Promise<void> {
  return http.request({ url: '/auth/logout', method: 'POST' })
}
