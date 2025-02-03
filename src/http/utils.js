import { SendNotification } from "../utils"

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
