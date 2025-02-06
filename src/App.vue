<template>
    <RouterView />
</template>
<script setup>
import { onMounted } from 'vue';
import { setTray } from './utils';
onMounted(async () => {
    await setTray()
})
</script>
