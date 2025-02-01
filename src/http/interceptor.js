import { endsWith } from "lodash"
import { useAlerts } from "../store"
export const TokenInterceptor = (config) => {
    if (endsWith(config.url, 'login') || endsWith(config.url, 'register') || endsWith(config.url, 'getcaptcha')) {
        return config
    }
    if (!config.headers["Authorization"]) {
        useAlerts().addAlert({
            type: 'error',
            message: 'Token为空',
            duration: 1500,
        })
    }
    return config
}
