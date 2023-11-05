import { createRouter, createWebHistory } from "vue-router";
import MainTodo from '/src/pages/MainTodo.vue';
import About from '/src/pages/About.vue';
import Index from '/src/pages/Index.vue';

const routes = [
    {
        path: '/todo',
        name: 'MainTodo',
        component: MainTodo,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/',
        name: 'Index',
        component: Index,       
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;