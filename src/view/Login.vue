<script setup>
import { ref, onMounted, } from 'vue';
import { getCurrentWindow } from '@tauri-apps/api/window'
const Ding = ref(false)
const isLogin = ref(true)
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
const switchRegLog = () => {
    isLogin.value = !isLogin.value
}
</script>
<template>
    <div class="overflow-hidden h-screen flex flex-col">
        <div class="bg-blue-500 text-white w-screen p-4 flex justify-end items-center" data-tauri-drag-region>
            <div class="flex space-x-4">
                <div class="text-white hover:text-black iconfont iconfont-jianhao join-vertical" @click="minimizeWindow">
                </div>
                <div class="text-white hover:text-black iconfont"
                    :class="{ 'iconfont-dinging': Ding, 'iconfont-ding': !Ding }" @click="isAlwaysTop"></div>
                <div class="text-white hover:text-black iconfont iconfont-guanbi join-vertical" @click="closeWindow"></div>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center flex-1 p-4">
            <h2 class="text-2xl mb-4 text-blue-500 font-sans">{{ isLogin == true ? '登录' : '注册' }}</h2>
            <form class="w-full max-w-md">
                <label v-if="!isLogin" class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-yonghuming text-xl"></div>
                    <input type="text" placeholder="用户名" class="grow pl-8" />
                </label>
                <label class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-youxiang text-xl"></div>
                    <input type="email" placeholder="邮箱" class="grow pl-8" />
                </label>
                <label class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-mima text-xl"></div>
                    <input type="password" placeholder="密码" class="grow pl-8" />
                </label>
                <!-- 条件渲染确认密码输入框 -->
                <label v-if="!isLogin" class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-mima text-xl"></div>
                    <input type="password" placeholder="确认密码" class="grow pl-8" />
                </label>
                <div class="flex items-center w-full mb-4">
                    <input type="text" placeholder="验证码" class="input input-bordered w-2/3 pr-8" />
                    <img src="" alt="验证码" class="w-1/3 h-10 cursor-pointer" />
                </div>
                <button class="btn btn-primary w-full">{{ isLogin == true ? '登录' : '注册' }}</button>
            </form>
            <a class="text-sm text-blue-500 hover:underline mt-4" @click="switchRegLog">注册</a>
        </div>
    </div>
</template>
