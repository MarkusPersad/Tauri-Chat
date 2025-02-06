<template>
    <div class="flex flex-col overflow-hidden h-screen">
        <Cheader>
            <template #routes>
                <li>
                    <div @click="JumpTo('/home/')">聊天</div>
                </li>
            </template>
        </Cheader>
        <button class="btn btn-outline btn-accent" @click="async () => {
            await JumpTo('/home/chat')
        }">Chat</button>
        <RouterView />
    </div>
</template>
<script setup>
import Cheader from '../components/Cheader.vue';
import { RouterView, useRouter } from "vue-router"
const router = useRouter()
const JumpTo = async (to) => {
    try {
        let result = await router.push(to)
        if (result !== null) {
            console.log(result)
        }
    } catch (error) {
        throw error
    }
}
</script>
