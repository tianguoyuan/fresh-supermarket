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
}
