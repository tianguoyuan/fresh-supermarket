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
}
