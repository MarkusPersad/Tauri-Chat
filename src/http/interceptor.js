import { endsWith, isEmpty } from "lodash"
import { HttpError } from "./http"
import { CONSTANTS } from "../constants"
export const TokenInterceptor = (config) => {
    if (endsWith(config.url, 'login') || endsWith(config.url, 'register') || endsWith(config.url, 'getcaptcha')) {
        return config
    }
    if (isEmpty(config.headers[CONSTANTS.TOKEN_HEADER])) {
        throw new HttpError('Token is Empty', 1005)
    }
    return config
}
