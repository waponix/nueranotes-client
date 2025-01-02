import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useAuth from '@/middlewares/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        middlewares: [ useAuth ]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/note/untitled',
      name: 'create_note',
      component: () => import('../views/Note.vue'),
    },
  ],
})

function executeMiddlewares(middlewares: any) {
  return (to: any, from: any, next: any) => {
      const run = (index: any) => {
          if (index < middlewares.length) {
              middlewares[index](to, from, (parameter: any = null) => {
                parameter !== null ? next(parameter) : run(index + 1)
              })
          } else {
              next() // Proceed to the route
          }
      }
      run(0)
  }
}

router.beforeEach((to, from, next) => {
  const middlewares = to.meta.middlewares || [];
  const execute = executeMiddlewares(middlewares);
  execute(to, from, next);
})

export default router
