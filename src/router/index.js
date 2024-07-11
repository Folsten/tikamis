import { createRouter, createWebHistory } from 'vue-router';
import index from '@/views/index.vue';
import { mechanicBeforeEach, mechanicRoutes } from '@/router/mechanic.js';
import { sadminBeforeEach, sadminRoutes } from '@/router/sadmin.js';
import { directorBeforeEach, directorRoutes } from '@/router/director.js';

// ПРИ ИЗМЕНЕНИИ КАКИХ-ЛИБО РОУТОВ ЗДЕСЬ (ПУТЕЙ) НЕОБХОДИМО
// ТАКЖЕ НЕ ЗАБЫТЬ ИЗМЕНИТЬ ИХ В КОМПОНЕНТЕ "MainHeaderMenu"
// (В КОМПОНЕНТЕ ОСНОВНОГО МЕНЮ)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: index,
      meta: { title: 'Выбор раздела | Tikamis' }
    },
    sadminRoutes,
    directorRoutes,
    mechanicRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to) => {
  // Именование страницы (meta)
  document.title = to?.meta.title ? to.meta.title : 'Tikamis';

  // Определение раздела
  let routingSection = to.fullPath.split('/')[1];

  // Делегирование обработки роутов в зависимости от раздела, к которому взывает пользователь
  if (routingSection === 'sadmin') {
    return sadminBeforeEach(to);
  }
  if (routingSection === 'director') {
    return directorBeforeEach(to);
  }
  if (routingSection === 'mechanic') {
    return mechanicBeforeEach(to);
  }
});

export default router;
