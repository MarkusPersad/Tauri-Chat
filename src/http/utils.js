import { useAlerts } from "../store"
const { addAlert } = useAlerts()

export const processResponse = (response, show = false) => {
    if (response.code !== 0) {
        addAlert({
            type: 'error',
            message: response.msg,
            duration: 1500
        })
        return -1
    } else {
        if (show) {
            addAlert({
                type: 'success',
                message: response.msg,
                duration: 1500
            })
        }
        return response.data
    }
}
