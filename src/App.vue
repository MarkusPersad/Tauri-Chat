<template>
    <RouterView />
    <Toast />
</template>
<script setup>
import Toast from './components/Toast.vue';
import { setTray } from './utils';
setTray().then(() => {
    console.log('Success')
}).catch((error) => {
    console.log("error", error)
})
</script>
