import type { Emitter } from 'mitt'
import mitt from 'mitt'

// eslint-disable-next-line ts/consistent-type-definitions
type Events = {
  /** 0否 1是 */

  /** 首页-推荐 下拉刷新 */
  homeRecommendedPullDownRefresh: '0' | '1'
  homeRecommendedPullDownRefreshSuccess: () => void
}

const emitter: Emitter<Events> = mitt<Events>()
export default emitter
