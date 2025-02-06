<template>
    <NavBar data-tauri-drag-region>
        <template #end>
            <div class="iconfont iconfont-jianhao hover:text-black" @click="minimizeWindow"></div>
            <div class="hover:text-black iconfont" :class="{ 'iconfont-dinging': Ding, 'iconfont-ding': !Ding }"
                @click="isAlwaysTop"></div>
            <div class="hover:text-black iconfont"
                :class="{ 'iconfont-quanping': !isMaximize, 'iconfont-quxiaoquanping': isMaximize }"
                @click="maximizeWindow"></div>
            <div class="hover:text-black iconfont iconfont-guanbi" @click="closeWindow"></div>
        </template>
    </NavBar>
</template>
<script setup>
import { ref } from 'vue';
import NavBar from './NavBar.vue';
import { getCurrentWindow } from '@tauri-apps/api/window';

const Ding = ref(false)
const isMaximize = ref(false)
const minimizeWindow = async () => {
    try {
        await getCurrentWindow().minimize()
    } catch (error) {
        throw error
    }
}
const isAlwaysTop = async () => {
    try {
        Ding.value = !Ding.value
        await getCurrentWindow().setAlwaysOnTop(Ding.value)
    } catch (error) {
        throw error
    }
}
const closeWindow = async () => {
    try {
        await getCurrentWindow().close()
    } catch (error) {
        throw error
    }
}
const maximizeWindow = async () => {
    try {
        isMaximize.value = !isMaximize.value
        if (isMaximize.value) {
            await getCurrentWindow().maximize()
        } else {
            await getCurrentWindow().unmaximize()
        }
    } catch (error) {
        throw error
    }
}
</script>
