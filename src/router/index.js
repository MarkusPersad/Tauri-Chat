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
        },
        {
            path: '/home',
            component: () => import('../view/Home.vue'),
            children: [
                {
                    path: '',
                    redirect: 'chat',
                },
                {
                    path: 'chat',
                    component: () => import('../view/Chat.vue')
                }
            ]
        }
    ]
})
