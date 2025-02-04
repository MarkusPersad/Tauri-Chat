import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/plugin-notification"

const ICONS = {
    info: "dialog-information",
    warning: "dialog-warning",
    success: "dialog-ok",
    error: "dialog-error"
}
export const SendNotification = async (title, content, type) => {
    let permissionGranted = await isPermissionGranted()
    if (!permissionGranted) {
        let permission = await requestPermission()
        permissionGranted = permission === 'granted'
    }
    if (permissionGranted) {
        sendNotification({
            title: title,
            body: content,
            icon: ICONS[type]
        })
    }
}
