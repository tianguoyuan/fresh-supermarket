import { http } from '~/utils/request'

/** 我的-积分列表 */
export function shoppingAddress(data: API.ShoppingAddress): Promise<API.ShoppingAddressRes> {
  return http.request({ url: '/shopping/address', method: 'GET', data })
}

/** 我的-积分列表 */
export function shoppingFindDefaultAddress(data: API.ShoppingAddress): Promise<API.ShoppingFindDefaultAddressRes> {
  return http.request({ url: '/shopping/findDefaultAddress', method: 'GET', data })
}
