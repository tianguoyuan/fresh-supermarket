// 首页-推荐接口
import { defineMock } from './base'

const mockImg = (width = 166, height = 200, color = 'f33') => `https://dummyimage.com/${width}x${height}/${color}`

export default defineMock([
  {
    url: 'recommended/tags/find',
    method: ['POST'],
    body: {
      code: '200',
      msg: 'ok',
      data: {
        tagList: [
          { id: '1', title: '推荐' },
          { id: '2', title: '生活' },
          { id: '3', title: '学术' },
          { id: '4', title: '求职' },
          { id: '5', title: '科技' },
          { id: '6', title: '热门' },
        ],
        orderList: [
          { id: '1', title: '最新' },
          { id: '2', title: '最热' },
        ],
        kindList: [
          { id: '1', title: '投行' },
          { id: '2', title: '资讯' },
          { id: '3', title: '科技' },
          { id: '4', title: '生活' },
          { id: '5', title: '娱乐' },
          { id: '6', title: '纽约' },
          { id: '7', title: '美食' },
          { id: '8', title: '摄影' },
          { id: '9', title: '交友' },
          { id: '10', title: '哥大' },
          { id: '11', title: 'NYU' },
          { id: '12', title: '机票' },
        ],
      } as API.RecommendedTagsFindRes,
    },
  },
  {
    url: 'recommended/list/find',
    method: ['POST'],
    delay: 1500,
    body: {
      code: '200',
      msg: 'ok',
      data: {
        list: [
          { id: '1', title: '最新', cover: mockImg(), likeNum: 0, isLike: true, images: [] },
          { id: '2', title: '最热', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
          { id: '3', title: '投行', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
          { id: '4', title: '咨询', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
          { id: '5', title: '科技', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
          { id: '6', title: '生活', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
          { id: '7', title: '最新', cover: mockImg(), likeNum: 0, isLike: true, images: [] },
          { id: '8', title: '最热', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
          { id: '9', title: '投行', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
          { id: '10', title: '咨询', cover: mockImg(), likeNum: 0, isLike: false, images: [] },
        ],
        total: 20,
      } as API.RecommendedListFindRes,
    },
  },

])
