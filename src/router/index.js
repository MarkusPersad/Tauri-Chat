import { createMemoryHistory, createRouter } from "vue-router";

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            redirect: '/registerorlogin'
        },
        {
            path: '/registerorlogin',
            component: () => import('../view/LogReg.vue')
        }
    ]
})
