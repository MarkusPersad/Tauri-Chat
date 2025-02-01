import { processResponse } from './utils';
import { GlobalHttp } from './http';
import { useAlerts } from '../store';
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
        console.log(response)
        return processResponse(response)
    } catch (error) {
        useAlerts().addAlert({
            type: 'error',
            message: "请求验证码出错",
            duration: 1500
        })
        throw error
    }
}

const Register = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Register, data, "POST")
        return processResponse(response, true)
    } catch (error) {
        useAlerts().addAlert({
            type: 'error',
            message: "注册请求出错",
            duration: 1500
        })
    }
}

const Login = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Login, data, "POST")
        response = processResponse(response, true)
        GlobalHttp.setHeader("Authorization", "Bearer " + response)
        await setVal("userToken", response)
    } catch (error) {
        useAlerts().addAlert({
            type: 'error',
            message: "登陆请求出错",
            duration: 1500
        })
    }
}

const Logout = async () => {
    try {
        let response = await GlobalHttp.request(API.Logout, null, "GET")
        await delVal("userToken")
        return processResponse(response)
    } catch (error) {
        useAlerts({
            type: 'error',
            message: "退出登录请求出错",
            duration: 1500
        })
    }
}

const GetUserInfo = async () => {
    try {
        let response = await GlobalHttp.request(API.GetUserInfo, null, "GET")
        return processResponse(response)
    } catch (error) {
        useAlerts().addAlert({
            type: 'error',
            message: "获取用户信息出错",
            duration: 1500
        })
    }
}
export { GetCaptcha, Register, Login, Logout, GetUserInfo }
