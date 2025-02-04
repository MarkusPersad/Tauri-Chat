import { processResponse, setTokenToHeader } from './utils';
import { GlobalHttp } from './http';
import { delVal, getVal, setVal } from '../utils'
import { CONSTANTS } from '../constants';

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
        return await processResponse(response)
    } catch (error) {
        throw error
    }
}

const Register = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Register, data, "POST")
        return await processResponse(response, true)
    } catch (error) {
        throw error
    }
}

const Login = async (data) => {
    try {
        let response = await GlobalHttp.request(API.Login, data, "POST")
        response = await processResponse(response, true)
        GlobalHttp.setHeader("Authorization", "Bearer " + response)
        await setVal(CONSTANTS.TOKEN_KEY, response)
        return response
    } catch (error) {
        throw error
    }
}

const Logout = async () => {
    try {
        let response = await GlobalHttp.request(API.Logout, null, "GET")
        setTokenToHeader()
        await delVal(CONSTANTS.TOKEN_KEY)
        return await processResponse(response)
    } catch (error) {
        throw error
    }
}

const GetUserInfo = async () => {
    try {
        let response = await GlobalHttp.request(API.GetUserInfo, null, "GET")
        return await processResponse(response)
    } catch (error) {
        throw error
    }
}
export { GetCaptcha, Register, Login, Logout, GetUserInfo }
