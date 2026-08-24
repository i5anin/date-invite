import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'builder', component: () => import('@/views/BuilderView.vue') },
    { path: '/link/:id', name: 'link', component: () => import('@/views/LinkView.vue') },
    { path: '/i/:id', name: 'invite', component: () => import('@/views/InviteView.vue') },
    { path: '/p/:payload', name: 'invitePayload', component: () => import('@/views/InviteView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
