import { defaultWindowIcon } from "@tauri-apps/api/app"
import { Menu } from "@tauri-apps/api/menu"
import { TrayIcon } from "@tauri-apps/api/tray"
import { platform } from "@tauri-apps/plugin-os";
import { exit, relaunch } from "@tauri-apps/plugin-process";
import { useAlerts } from "../store";
import { getCurrentWindow } from "@tauri-apps/api/window";

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
                            if (await getVal("userToken")) {
                                await Logout();
                            }
                        } catch (error) {
                            useAlerts().addAlert({
                                type: 'error',
                                message: '退出登录失败',
                                duration: 1500,
                            })
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
