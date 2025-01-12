import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import useAuth from '@/middlewares/useAuth'
import { nextTick } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home | Neuranotes',
        middlewares: [ useAuth ]
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login | Neuranotes',
      },
    },
    {
      path: '/note/untitled',
      name: 'create_note',
      component: () => import('../views/NoteView.vue'),
      meta: {
        title: 'Neuranotes | Editor',
        middlewares: [ useAuth ]
      },
    },
    {
      path: '/note/:id',
      name: 'update_note',
      component: () => import('../views/NoteView.vue'),
      meta: {
        title: 'Editor | Neuranotes',
        middlewares: [ useAuth ]
      },
    },
    {
      path: '/forward',
      name: 'forward',
      component: () => import('../views/ForwardView.vue'),
      meta: {
        title: 'Forward | Neuranotes',
        middlewares: [ useAuth ]
      },
    }
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

router.beforeEach(async (to, from, next) => {
  const middlewares = to.meta.middlewares || [];
  const execute = executeMiddlewares(middlewares);
  execute(to, from, next);

  await nextTick(async() => {
    //@ts-ignore
    document.title = to.meta?.title || '';
  })
})

export default router
