<template>
    <RouterView />
    <Toast />
</template>
<script setup>
import { onMounted } from 'vue';
import Toast from './components/Toast.vue';
import { setTray } from './utils';
onMounted(async () => {
    await setTray()
})
</script>
