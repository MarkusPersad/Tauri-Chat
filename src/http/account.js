import { GlobalHttp } from './http'
import { delVal, processError, setVal } from '../utils'

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
    try {
        let response = await GlobalHttp.request(API.Logout, null, "GET")
        delVal("userToken")
        return processError(response)
    } catch (error) {
        throw error
    }
}

export const Register = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Register, data, "POST")
        return processError(response, true)
    } catch (error) {
        throw error
    }
}

export const Login = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Login, data, "POST")
        response = processError(response)
        console.log(response)
        GlobalHttp.setHeader("Authorization", "Bearer " + response)
        await setVal("userToken", response)
    } catch (error) {
        throw error
    }
}

export const GetUserInfo = async () => {
    try {
        let response = await GlobalHttp.request(API.GetUserInfo, null, "GET")
        return processError(response)
    } catch (error) {
        throw error
    }
}
