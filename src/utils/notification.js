import { resolveResource } from "@tauri-apps/api/path"
import { isPermissionGranted, requestPermission, sendNotification } from "@tauri-apps/plugin-notification"

const ICONS = async () => ({
    info: await resolveResource('icons/info.png'),
    warning: await resolveResource('icons/warning.png'),
    success: await resolveResource('icons/color-success.png'),
    error: await resolveResource('icons/color-error.png')
})
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
            icon: await ICONS[type]
        })
    }
}
