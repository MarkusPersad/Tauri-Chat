import { defaultWindowIcon } from "@tauri-apps/api/app"
import { Menu } from "@tauri-apps/api/menu"
import { TrayIcon } from "@tauri-apps/api/tray"
import { getCurrentWindow } from "@tauri-apps/api/window"
import { platform } from "@tauri-apps/plugin-os"
import { exit, relaunch } from '@tauri-apps/plugin-process'

export const SetTray = async () => {
    (await TrayIcon.new({
        showMenuOnLeftClick: platform() == 'linux' ? true : false,
        action: async (event) => {
            console.log(`${event.button}:${event.buttonState}:${event.type}`)
            if (event.type == 'Click' && event.button == 'Left' && event.buttonState == 'Down') {
                await ShowMainWindow()
            }
        },
        tooltip: 'Tauri-Chat',
        icon: await defaultWindowIcon(),
        menu: await Menu.new({
            items: TrayMenus
        })
    }))
}

export const TrayMenus = [
    {
        id: 'showMainWindow',
        text: '显示主窗口',
        action: async () => {
            await ShowMainWindow()
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
            await exit(0)
        }
    },
]

export const ShowMainWindow = async () => {
    const window = getCurrentWindow()
    console.log(window)
    if (!(await window.isVisible())) {
        await window.show()
    } else {
        if (await window.isMinimized()) {
            await window.unminimize()
        }
        window.setFocus()
    }
}
