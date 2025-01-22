<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: ""
    },
    duration: {
        type: Number,
        default: 3000
    },
    isSuccessful: {
        type: Boolean,
        default: false
    }
})

const visible = ref(false)

const show = () => {
    visible.value = true
    setTimeout(() => {
        visible.value = false
    }, props.duration)
}
onMounted(() => {
    show()
})
</script>
<template>
    <div v-if="visible" class="toast toast-top toast-center">
        <div class="alert" :class="{ 'alert-success': isSuccessful, 'alert-error': !isSuccessful }">
            <span>{{ message }}</span>
        </div>
    </div>
</template>
