import { showToast } from "./toast"

export const processError = (response, show = false) => {
    if (response.code !== 0) {
        showToast(response.msg, 1500, false)
        return -1
    } else {
        if (show) {
            showToast(response.msg, 1500, true)
        }
        return response.data
    }
}
