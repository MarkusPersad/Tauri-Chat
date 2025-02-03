import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/plugin-notification"

const ICONS = {
    info: 'asset:///icons/info.png',
    warning: 'asset:///icons/warning.png',
    success: 'asset:///icons/color-success.png',
    error: 'asset:///icons/color-error.png'
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
