import { processResponse } from './utils';
import { GlobalHttp } from './http';
import { delVal, setVal } from '../utils'

const API = {
    GetCaptcha: "/account/getcaptcha",
    Register: "/account/register",
    Login: "/account/login",
    GetUserInfo: "/account/getuserinfo",
    Logout: "/account/logout",
    Search: "/account/search",
}

const GetCaptcha = async () => {
    try {
        let response = await GlobalHttp.request(API.GetCaptcha, null, "GET")
        return processResponse(response)
    } catch (error) {
        throw error
    }
}

const Register = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Register, data, "POST")
        return processResponse(response, true)
    } catch (error) {
        throw error
    }
}

const Login = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Login, data, "POST")
        response = processResponse(response, true)
        GlobalHttp.setHeader("Authorization", "Bearer " + response)
        await setVal("userToken", response)
    } catch (error) {
        throw error
    }
}

const Logout = async () => {
    try {
        let response = await GlobalHttp.request(API.Logout, null, "GET")
        await delVal("userToken")
        return processResponse(response)
    } catch (error) {
        throw error
    }
}

const GetUserInfo = async () => {
    try {
        let response = await GlobalHttp.request(API.GetUserInfo, null, "GET")
        return processResponse(response)
    } catch (error) {
        throw error
    }
}
export { GetCaptcha, Register, Login, Logout, GetUserInfo }
