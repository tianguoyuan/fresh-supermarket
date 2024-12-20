declare namespace API {
  interface CommonBaseListParams {
    pageNum: number
    pageSize: number
    order: 'asc' | 'desc'
    title?: string
    priceOrder?: 'asc' | 'desc' | ''
    saleOrder?: 'asc' | 'desc' | ''
  }

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
    phone: stringCommonRecommendListItem
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
  interface SearchHotTagItem {
    id: string
    name: string
  }
  interface SearchHotTagRes {
    total: number
    list: SearchHotTagItem[]
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
  interface CommonRecommendListItem {
    id: string
    title: string
    cover: string
    isBargainPrice: boolean
    isOneDay: boolean
    oldPrice: string
    desc: string

    price: string
    checked: boolean
    num: number // 数量
  }
  interface CommonRecommendListRes {
    total: number
    list: CommonRecommendListItem[]
  }

  interface FindCommonRecommendListFindOneRes extends CommonRecommendListItem {
    coverList: string[]
    tagList: string[]
  }

  interface FindHomeTagListRes {
    tagList: {
      id: string
      title: string
      desc: string
    }[]
  }
  interface FindHomeGreatDealListRes {
    id: string
    title: string
    desc: string
    list: CommonRecommendListItem[]
  }

  interface FindHomeList extends CommonBaseListParams {
    tagId: string
  }
  interface FindHomeListRes {
    total: number
    list: CommonRecommendListItem[]
  }

  interface KindListRes {
    module: {
      moduleTitle: string
      list: CommonRecommendListItem[]
    }[]
  }

  interface PersonalIntegral {
    userId: string
  }
  interface PersonalIntegralRes {
    integralList: {
      value: number
      label: string
    }[]
  }

  interface ShoppingAddress {
    userId: string
  }
  interface ShoppingAddressResItem {
    id: string
    username: string
    phone: string
    checked: boolean

    province: string
    city: string
    county: string
    suffix: string
  }
  interface ShoppingAddressRes {
    addressList: ShoppingAddressResItem[]
  }

  interface ShoppingFindDefaultAddressRes {
    defaultAddress: ShoppingAddressResItem
  }

  interface ShoppingGetCouponRes {
    couponList: number[]
  }
}
