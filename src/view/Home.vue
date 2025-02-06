<template>
    <div class="flex flex-row overflow-hidden h-screen">
        <Sider />
        <div class="flex flex-col flex-1 overflow-hidden h-screen">
            <Cheader />
            <button @click.prevent="async () => {
                await JumpTo('/home/chat')
            }" class="btn btn-outline btn-accent">跳转</button>
            <RouterView />
        </div>
    </div>
</template>
<script setup>
import Cheader from '../components/Cheader.vue';
import { RouterView, useRouter } from "vue-router"
import Sider from '../components/Sider.vue';
const router = useRouter()
const JumpTo = async (to) => {
    try {
        let result = await router.replace(to)
        if (result !== null) {
            console.log(result)
        }
    } catch (error) {
        throw error
    }
}
</script>
