import { http } from '~/utils/request'

/** 购物车-地址列表 */
export function shoppingAddress(data: API.ShoppingAddress): Promise<API.ShoppingAddressRes> {
  return http.request({ url: '/shopping/address', method: 'GET', data })
}

/** 购物车-地址默认 */
export function shoppingFindDefaultAddress(data: API.ShoppingAddress): Promise<API.ShoppingFindDefaultAddressRes> {
  return http.request({ url: '/shopping/findDefaultAddress', method: 'GET', data })
}

/** 购物车-优惠券 */
export function shoppingGetCoupon(): Promise<API.ShoppingGetCouponRes> {
  return http.request({ url: '/shopping/getCoupon', method: 'GET' })
}
