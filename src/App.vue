<script setup>
import { RouterView } from 'vue-router';
import { SetTray } from './utils'
SetTray().then(() => {
    console.log('Success')
}).catch((error) => {
    console.log("error", error)
})
</script>
<template>
    <RouterView />
</template>
