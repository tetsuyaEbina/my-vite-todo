import { createRouter, createWebHistory } from "vue-router";
import MainTodo from '/src/pages/MainTodo.vue';
import Index from '/src/pages/Index.vue';
// 遅延ローディングルート
// import About from '/src/pages/About.vue';
import NotFound from '/src/pages/NotFound.vue';
import Blog from '/src/pages/Blog.vue';

const routes = [
    {
        path: '/todo',
        name: 'MainTodo',
        component: MainTodo,
    },
    {
        path: '/about',
        name: 'About',
        // component: About,
        component: () => import('/src/pages/About.vue'),
    },
    {
        path: '/',
        name: 'Index',
        component: Index,       
    },
    {
        path: '/blog/:id', //:idでパラメータを設定することができる
        name: 'BlogId',
        component: Blog,
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog,
    },
    {
        path: '/:pathMatch(.*)*', // 存在しないアドレスにマッチするような設定
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;