import { isEmpty } from "lodash"
import { CONSTANTS } from "../constants"
import { getVal, SendNotification } from "../utils"
import { GlobalHttp } from "./http"

export const processResponse = async (response, show = false) => {
    if (response.code !== 0) {
        await SendNotification('Warning', response.msg, 'warning')
        return -1
    } else {
        if (show) {
            await SendNotification('Success', response.msg, 'success')
        }
        return response.data
    }
}

export const setTokenToHeader = async () => {
    try {
        if (isEmpty(GlobalHttp.defaultHeaders[CONSTANTS.TOKEN_HEADER])) {
            let token = await getVal(CONSTANTS.TOKEN_KEY)
            GlobalHttp.setHeader(CONSTANTS.TOKEN_HEADER, CONSTANTS.BEARER_TOKEN + token)
        }
    } catch (error) {
        throw error
    }
}
