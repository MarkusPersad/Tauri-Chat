<template>
    <div v-show="alerts.length > 0" class="toast toast-top toast-center">
        <TransitionGroup name="toast">
            <div v-for="alter in alerts" :key="alter.id" :class="['alert', alertsClasses[alter.type]]">
                <span>{{ alter.message }}</span>
                <button class="btn btn-xs btn-accent btn-outline" @click="removeAlert(alter.id)">
                    X
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>
<script setup>
import { useAlerts } from '../store'
import { reactive } from 'vue';
const { alerts, removeAlert } = useAlerts()
const alertsClasses = reactive({
    info: 'alert-info',
    warning: 'alert-warning',
    success: 'alert-success',
    error: 'alert-error'
})
</script>
<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.5s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
