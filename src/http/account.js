import { GlobalHttp } from './http'
import { processError } from '../utils'

const API = {
    GetCaptcha: "/account/getcaptcha",
    Register: "/account/register",
    Login: "/account/login",
    GetUserInfo: "/account/getuserinfo",
    Logout: "/account/logout",
    Search: "/account/search",
}

export const GetCaptcha = async () => {
    try {
        let response = await GlobalHttp.request(API.GetCaptcha, null, "GET")
        return processError(response)
    } catch (error) {
        throw error
    }
}
export const Logout = async () => {
    let response = await GlobalHttp.request(API.Logout, null, "GET")
    return processError(response)
}
