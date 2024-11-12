declare namespace API {
  /** 用户-获取验证码 */
  interface UserGetPhoneCode {
    phone: string
  }
  interface UserGetPhoneCodeRes {
    code: string
  }

  /** 用户-登录 */
  interface UserLogin {
    phone: string
    code: string
  }
  interface UserLoginRes {
    token: string
  }

  /** 用户-注册 */
  interface UserRegister {
    username: string
    phone: string
    code: string
  }
  interface UserRegisterRes {

  }

  /** 用户-获取信息 */
  interface UserInfoRes {
    id: string
    name: string
    phone: string
    img: string
  }

  /** 搜索 - 默认关键词 */
  interface SearchDefaultMsg {

  }
  interface SearchDefaultMsgRes {
    searchDefault: string
  }
  /** 首页 - banner */
  interface HomeBannerRes {
    banner: {
      id: string
      cover: string
    }[]
  }

  interface HomeFoodKindBannerRes {
    foodKindBanner: {
      id: string
      cover: string
      name: string
    }[]
  }
  interface CommonRecommendListRes {
    total: string
    list: {
      id: string
      title: string
      cover: string
      isBargainPrice: boolean
      isOneDay: boolean
      price: string
    }[]
  }
}
