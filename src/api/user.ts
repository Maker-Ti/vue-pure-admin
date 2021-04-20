import {http} from "../utils/http"

// 获取验证码
export const getVerify = (): any => {
  return http.request("get", "/user/login")
}

// 登录
export const getLogin = (data: object): any => {
  return http.request("get", "/user/login", data)
}
// 获取用户信息
export const getUserInfo = (data: object): any => {
  return http.request("post", "/user/getUserInfo", data)
}

// 注册
export const getRegist = (data: object): any => {
  return http.request("post", "/user/registerUser", data)
}