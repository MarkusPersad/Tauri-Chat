import { createMemoryHistory, createRouter } from "vue-router";

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: () => import('../view/Login.vue'),
        }
    ]
})
