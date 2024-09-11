import { http } from '~/utils/request'

const { request } = http

/** 推荐用户列表 */
export function followUserLike(data: API.FollowUserLike): Promise<API.FollowUserLikeRes> {
  return request({ url: '/follow/userLike/find', method: 'POST', data })
}
