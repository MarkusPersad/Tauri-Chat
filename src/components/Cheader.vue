<template>
    <NavBar data-tauri-drag-region>
        <template #start>
            <div class="dropdown dropdown-right">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content rounded-box bg-base-100 z-1 mt-3 w-52 p-2 shadow">
                        <slot name="routes"></slot>
                    </ul>
                </div>
            </div>
        </template>
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
