import { createRouter, createWebHistory } from '@ionic/vue-router';


const routes = [
  { path: '/',    component: () => import('@/views/HomePage.vue') },
  {   path: '/game',
    component: () => import('@/views/GamePage.vue') },
    {path:'/score',
    component: () => import('@/views/ScorePage.vue')},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  // or createWebHashHistory() if you prefer hashes
  routes,
});

export default router;
