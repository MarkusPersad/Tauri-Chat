import { endsWith } from "lodash"
import { HttpError } from "./http"
export const TokenInterceptor = (config) => {
    if (endsWith(config.url, 'login') || endsWith(config.url, 'register') || endsWith(config.url, 'getcaptcha')) {
        return config
    }
    if (!config.headers["Authorization"]) {
        throw new HttpError('Token is Empty', 1005)
    }
    return config
}
