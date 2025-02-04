import { defaultWindowIcon } from "@tauri-apps/api/app"
import { Menu } from "@tauri-apps/api/menu"
import { TrayIcon } from "@tauri-apps/api/tray"
import { platform } from "@tauri-apps/plugin-os";
import { exit, relaunch } from "@tauri-apps/plugin-process";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Logout } from '../http'
import { SendNotification } from "./notification";
import { isEmpty } from "lodash";
import { CONSTANTS } from "../constants";
import { getVal } from '../utils'

export const setTray = async () => {
    return await TrayIcon.new({
        icon: await defaultWindowIcon(),
        showMenuOnLeftClick: platform() === "linux",
        action: async (event) => {
            if (event.type === 'Click' && event.button === 'Left' && event.buttonState === 'Down') {
                await showMainWindow()
            }
        },
        tooltip: 'Tauri-Chat',
        menu: await Menu.new({
            items: [
                {
                    id: 'ShowMainWindow',
                    text: '显示主窗口',
                    action: async () => {
                        await showMainWindow()
                    }
                },
                {
                    id: 'restart',
                    text: '重新加载',
                    action: async () => {
                        await relaunch()
                    }
                },
                {
                    id: 'exit',
                    text: '退出',
                    action: async () => {
                        try {
                            let token = await getVal(CONSTANTS.TOKEN_KEY)
                            if (!isEmpty(token)) {
                                await Logout();
                            }
                        } catch (error) {
                            await SendNotification("Error", error, 'error')
                            throw error
                        }
                        await exit(0)
                    }
                }
            ]
        })
    })
}

const showMainWindow = async () => {
    const window = getCurrentWindow()
    if (!(await window.isVisible())) {
        await window.show()
    } else {
        if (await window.isMinimized()) {
            await window.unminimize()
        }
        window.setFocus()
    }
}
