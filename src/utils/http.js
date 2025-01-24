import { showToast } from "./toast"

export const processError = (response) => {
    if (response.code !== 0) {
        showToast(response.msg, 3000, false)
        return null
    } else {
        return response.data
    }
}
