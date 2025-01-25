<script setup>
import { ref, onMounted } from 'vue';
import { GetCaptcha, Login, Register } from '../http';
import { showToast, isPassword, isUserName } from '../utils';
import validator from 'validator/es/index'
import { getCurrentWindow } from '@tauri-apps/api/window';

const Ding = ref(false);
const isLogin = ref(true);
const base64Captcha = ref({});
const data = ref({
    userName: '',
    email: '',
    password: '',
    checkCodeKey: '',
    checkCode: ''
});
const repassword = ref("");

const closeWindow = async () => {
    await getCurrentWindow().close();
};

const getCaptchas = async () => {
    base64Captcha.value = await GetCaptcha();
    data.value.checkCodeKey = base64Captcha.value.id;
};

const minimizeWindow = async () => {
    await getCurrentWindow().minimize();
};

const isAlwaysTop = async () => {
    Ding.value = !Ding.value;
    await getCurrentWindow().setAlwaysOnTop(Ding.value);
};

onMounted(async () => {
    await getCurrentWindow().setAlwaysOnTop(false);
    await getCurrentWindow().setResizable(false);
    await getCaptchas();
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
    if (validator.isEmpty(data.value.email) || validator.isEmpty(data.value.password) ||
        validator.isEmpty(data.value.checkCodeKey) || validator.isEmpty(data.value.checkCode)
    ) {
        showToast("字段不能为空", 1500, false)
        return
    }
    if (!validator.isEmail(data.value.email)) {
        showToast("邮箱格式不匹配", 1500, false)
        return
    }
    if (!isPassword(data.value.password)) {
        showToast("密码格式必须为8~32位，包含大小写字母")
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
        }
    } catch (error) {
        showToast(error.message, 1500, false)
        throw error
    }
}

const register = async () => {
    if (validator.isEmpty(data.value.userName) || validator.isEmpty(data.value.email) || validator.isEmpty(data.value.password) ||
        validator.isEmpty(data.value.checkCodeKey) || validator.isEmpty(data.value.checkCode)
    ) {
        showToast("字段不能为空", 1500, false)
        return
    }
    if (!isUserName(data.value.userName)) {
        showToast("用户名长度必须在8~32")
        return
    }
    if (!validator.isEmail(data.value.email)) {
        showToast("邮箱格式不匹配", 1500, false)
        return
    }
    if (!isPassword(data.value.password)) {
        showToast("密码格式必须为8~32位，包含大小写字母")
        return
    }
    if (repassword.value !== data.value.password) {
        showToast("两次密码必须一致", 1500, false)
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
                    <input type="text" placeholder="验证码" class="input input-bordered w-2/3 pr-8" v-model="data.checkCode" />
                    <img :src="base64Captcha.b64s" alt="验证码" class="w-1/3 h-10 cursor-pointer" @click="getCaptchas" />
                </div>
                <button v-if="isLogin" class="btn btn-primary w-full" @click.prevent="login">登录</button>
                <button v-if="!isLogin" class="btn btn-primary w-full" @click.prevent="register">注册</button>
            </form>
            <a class="text-sm text-blue-500 hover:underline mt-4" @click="switchRegLog">{{ isLogin === true ? '注册' : '登录'
            }}</a>
        </div>
    </div>
</template>
