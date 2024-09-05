interface DefaultPage {
  pageNum: number
  pageSize: number
}

declare namespace API {
  /** 注册 */
  interface IRegister {
    /** 账号 */
    username: string
    /** 密码 */
    password: string
  }

  /** 登录 */
  interface ILogin {
    /** 账号 */
    username: string
    /** 密码 */
    password: string
  }
  interface ILoginRes {
    /** token */
    token: string
  }

  /** 获取用户信息 */
  interface IUserInfo {
    /** token */
    token: string
  }
  interface IUserInfoRes {

  }

  interface RecommendedTagsFind {

  }
  interface RecommendedTagsFindRes {
    tagList: {
      id: string
      title: string
    }[]
    orderList: {
      id: string
      title: string
    }[]
    kindList: {
      id: string
      title: string
    }[]
  }

  interface RecommendedListFind extends DefaultPage {
    /** 标签 */
    tagId: string
    /** 排序 */
    orderId: string
    /** 分类 */
    kindId: string
  }
  interface RecommendedListFindRes {
    pageNum: number
    total: number
    list: {
      id: string
      cover: string
      title: string
      likeNum: number
      isLike: boolean
      images: string[] | []
    }[]
  }
}
