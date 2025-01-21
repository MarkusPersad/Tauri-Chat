import { createMemoryHistory, createRouter } from "vue-router";

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login&register'
        },
        {
            path: '/login&register',
            component: () => import('../view/Login.vue'),
        }
    ]
})
