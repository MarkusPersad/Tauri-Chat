<template>
    <div class="overflow-hidden h-screen flex flex-col">
        <NavBar data-tauri-drag-region>
            <template #end>
                <div class="iconfont iconfont-jianhao hover:text-black" @click="minimizeWindow"></div>
                <div class="hover:text-black iconfont" :class="{ 'iconfont-dinging': Ding, 'iconfont-ding': !Ding }"
                    @click="isAlwaysTop"></div>
                <div class="hover:text-black iconfont iconfont-guanbi" @click="closeWindow"></div>
            </template>
        </NavBar>
        <div class="flex flex-col items-center justify-center flex-1 p-4">
            <h2 class="text-2xl mb-4 text-blue-500 font-sans">{{ isLogin == true ? '登录' : '注册' }}</h2>
            <form class="w-full max-w-md" @submit.prevent>
                <label v-if="!isLogin" class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-yonghuming text-xl"></div>
                    <input type="text" placeholder="用户名" class="grow pl-8" v-model="data.userName" />
                </label>
                <label class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-youxiang text-xl"></div>
                    <input type="email" placeholder="邮箱" class="grow pl-8" v-model="data.email" />
                </label>
                <label class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-mima text-xl"></div>
                    <input type="password" placeholder="密码" class="grow pl-8" v-model="data.password" />
                </label>
                <!-- 条件渲染确认密码输入框 -->
                <label v-if="!isLogin" class="input input-bordered flex items-center gap-2 justify-between w-full mb-4">
                    <div class="iconfont iconfont-mima text-xl"></div>
                    <input type="password" placeholder="确认密码" class="grow pl-8" v-model="repassword" @focusout="" />
                </label>
                <div class="flex items-center w-full mb-4">
                    <input type="text" placeholder="验证码" class="input input-bordered w-2/3 pr-8"
                        v-model="data.checkCode" />
                    <img :src="base64Captcha?.b64s" alt="验证码" class="w-1/3 h-10 cursor-pointer" @click="getCaptchas" />
                </div>
                <button v-if="isLogin" class="btn btn-primary w-full" @click.prevent="login">登录</button>
                <button v-if="!isLogin" class="btn btn-primary w-full" @click.prevent="register">注册</button>
            </form>
            <a class="text-sm text-blue-500 hover:underline mt-4" @click="switchRegLog">{{ isLogin === true ? '注册' :
                '登录'
                }}</a>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue'
import { GetCaptcha, GlobalHttp, Login, Register } from '../http';
import { isPassword, isUserName, isEmail, SendNotification } from '../utils';
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window';
import { useRouter } from 'vue-router'
import { exit } from '@tauri-apps/plugin-process';
import { isEmpty } from 'lodash'

const Ding = ref(false);
const isLogin = ref(true);
const router = useRouter()
const base64Captcha = ref({
    id: '',
    b64s: ''
});
const data = ref({
    userName: '',
    email: '',
    password: '',
    checkCodeKey: '',
    checkCode: ''
});
const repassword = ref("");

const closeWindow = async () => {
    try {
        await exit(0)
    } catch (error) {
        throw error
    }
};

const getCaptchas = async () => {
    try {
        base64Captcha.value = await GetCaptcha();
    } catch (error) {
        throw error
    }
    data.value.checkCodeKey = base64Captcha.value.id;
};

const minimizeWindow = async () => {
    try {
        await getCurrentWindow().minimize();
    } catch (error) {
        throw error
    }
};

const isAlwaysTop = async () => {
    try {
        Ding.value = !Ding.value;
        await getCurrentWindow().setAlwaysOnTop(Ding.value);
    } catch (error) {
        throw error
    }
};

onMounted(async () => {
    try {
        await getCurrentWindow().setAlwaysOnTop(false);
        await getCurrentWindow().setResizable(false);
        await getCaptchas();
    } catch (error) {
        throw error
    }
});

const switchRegLog = () => {
    isLogin.value = !isLogin.value;
    data.value = {
        userName: '',
        email: '',
        password: '',
        checkCodeKey: '',
        checkCode: ''
    }; // 清空表单数据
    repassword.value = "";
    getCaptchas()
};

const login = async () => {
    if (isEmpty(data.value.email) || isEmpty(data.value.password) ||
        isEmpty(data.value.checkCodeKey) || isEmpty(data.value.checkCode)
    ) {
        await SendNotification('错误', "字段不能为空", 'error')
        return
    }
    if (!isEmail(data.value.email)) {
        await SendNotification('错误', "邮箱格式错误", 'error')
        return
    }
    if (!isPassword(data.value.password)) {
        await SendNotification('错误', "密码必须包含大小写字母且长度在8~32位", 'error')
        return
    }
    try {
        let response = await Login({
            email: data.value.email,
            password: data.value.password,
            checkCodeKey: data.value.checkCodeKey,
            checkCode: data.value.checkCode
        })
        if (response === -1) {
            getCaptchas()
            data.value.checkCode = ""
            data.value.password = ""
        } else {
            await getCurrentWindow().setSize(new LogicalSize(800, 600))
            await getCurrentWindow().setResizable(true)
            router.push('/home')
        }
    } catch (error) {
        throw error
    }
}

const register = async () => {
    if (isEmpty(data.value.userName) || isEmpty(data.value.email) || isEmpty(data.value.password) ||
        isEmpty(data.value.checkCodeKey) || isEmpty(data.value.checkCode)
    ) {
        await SendNotification('错误', "字段不能为空", 'error')
        return
    }
    if (!isUserName(data.value.userName)) {
        await SendNotification('错误', "用户名必须在8~32位", 'error')
        return
    }
    if (!isEmail(data.value.email)) {
        await SendNotification('错误', "邮箱格式错误", 'error')
        return
    }
    if (!isPassword(data.value.password)) {
        await SendNotification('错误', "密码必须包含大小写字母,且长度为8~32", 'error')
        return
    }
    if (repassword.value !== data.value.password) {
        await SendNotification('错误', "两次密码必须一致", 'error')
    }
    try {
        let response = await Register({
            userName: data.value.userName,
            email: data.value.email,
            password: data.value.password,
            checkCodeKey: data.value.checkCodeKey,
            checkCode: data.value.checkCode
        })
        if (response === -1) {
            data.value = {
                userName: '',
                email: '',
                password: '',
                checkCodeKey: '',
                checkCode: ''
            }; // 清空表单数据
            repassword.value = "";
            getCaptchas()
        } else {
            switchRegLog()
        }
    } catch (error) {
        throw error
    }
}
</script>
