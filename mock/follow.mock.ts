// 首页-推荐接口
import { defineMock } from './base'

const mockImg = (width = 48, height = 48, color = 'f3f') => `https://dummyimage.com/${width}x${height}/${color}`

export default defineMock([
  {
    url: 'follow/user/like',
    method: ['POST'],
    body: {
      code: '200',
      msg: 'ok',
      data: {
        total: 10,
        list: [
          { id: 1, name: '王子星', desc: '美国帝国理工', img: mockImg() },
          { id: 2, name: '周周Selina', desc: '生活小达人', img: mockImg() },
          { id: 3, name: '张棒耀', desc: '求职分享官', img: mockImg() },
        ],
      },
    },
  },
])
