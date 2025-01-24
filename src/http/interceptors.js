import { endsWith } from "lodash";
import { HttpError } from "./http";
import { showToast } from "../utils";

export const TokenInterceptor = (config) => {
    if (endsWith(config.url, 'login') || endsWith(config.url, 'register') || endsWith(config.url, 'getcaptcha')) {
        return config
    }
    if (!config.headers["Authorization"]) {
        showToast("Token为空", 1500, false)
    }
    return config
}
