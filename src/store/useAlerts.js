import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlerts = defineStore('alerts', () => {
    const alerts = ref([]);

    const addAlert = (alertOption) => {
        const newAlert = {
            id: Date.now(),
            type: alertOption.type || 'info',
            message: alertOption.message,
            duration: alertOption.duration || 3000
        };

        if (alerts.value.length >= 3) {
            alerts.value.shift(); // 移除数组中的第一个元素
        }

        alerts.value.push(newAlert)// 确保响应式更新

        // 自动移除消息
        if (newAlert.duration > 0) {
            setTimeout(() => {
                removeAlert(newAlert.id);
            }, newAlert.duration);
        }
    };

    const removeAlert = (id) => {
        const index = alerts.value.findIndex(alert => alert.id === id);
        if (index !== -1) {
            alerts.value.splice(index, 1);
        }
    };

    return { alerts, addAlert, removeAlert };
});
