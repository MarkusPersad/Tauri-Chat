import { h, render } from "vue"
import Toast from '../components/Toast.vue'

export const showToast = (message, duration = 3000, isSuccessful = false) => {
    const container = document.createElement('div')
    document.body.appendChild(container)
    const vnode = h(Toast, {
        message,
        duration,
        isSuccessful
    })
    render(vnode, container)
    console.log(vnode)
    setTimeout(() => {
        render(null, container)
        document.body.removeChild(container)
    }, duration)
}
