<script setup>
import { ref, onMounted } from 'vue';
import { getCurrentWindow } from '@tauri-apps/api/window'
const Ding = ref(false)
const closeWindow = async () => {
    await getCurrentWindow().close()
}
const minimizeWindow = async () => {
    await getCurrentWindow().minimize()
}
const isAlwaysTop = async () => {
    Ding.value = !Ding.value
    await getCurrentWindow().setAlwaysOnTop(Ding.value)
}
onMounted(async () => {
    await getCurrentWindow().setAlwaysOnTop(false)
    await getCurrentWindow().setResizable(false)
})
</script>
<template>
    <div class="container">
        <header class="bg-blue-500 text-white w-screen p-2 flex-row-reverse flex" data-tauri-drag-region>
            <div class="flex space-x-2">
                <div class="text-white iconfont iconfont-jianhao hover:text-black join-vertical" @click="minimizeWindow">
                </div>
                <div class="text-white hover:text-black iconfont join-vertical"
                    :class="{ 'iconfont-dinging': Ding, 'iconfont-ding': !Ding }" @click="isAlwaysTop"></div>
                <div class="text-white iconfont iconfont-guanbi hover:text-black join-vertical" @click="closeWindow"></div>
            </div>
        </header>
        <main class="flex flex-col">
            {{ Ding }}
        </main>
    </div>
</template>
