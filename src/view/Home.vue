<template>
    <Cheader />
    <button class="btn btn-outline" @click="logtout">退出登录</button>
</template>
<script setup>
import Cheader from '../components/Cheader.vue';
import { getVal } from '../utils';
import { CONSTANTS } from '../constants';
import { isEmpty } from 'lodash'
import { Logout } from "../http/index.js";

const logtout = async () => {
    try {
        let token = await getVal(CONSTANTS.TOKEN_KEY)
        if (!isEmpty(token)) {
            await Logout()
        }
    } catch (error) {
        throw error
    }
}
</script>
