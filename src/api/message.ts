import { http } from '~/utils/request'

const { request } = http

/** 消息-列表 */
export function messageFind(): Promise<API.MessageFindRes> {
  return request({ url: '/message/find', method: 'POST' })
}
