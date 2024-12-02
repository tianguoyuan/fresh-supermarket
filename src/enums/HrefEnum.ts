import { isPC } from '~/utils'

export const qqHref: string = isPC() ? 'tencent://message/?uin=603660895&Site=Sambow&Menu=yes' : 'mqqwpa://im/chat?chat_type=wpa&uin=603660895&version=1&src_type=web'
