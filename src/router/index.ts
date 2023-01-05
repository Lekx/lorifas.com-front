import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth.store'
import { getAuth } from 'firebase/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    children: [
      {
        path: ':id/account',
        component: () => import(/* webpackChunkName: "profile-account" */ '../views/ProfileDataView.vue')
      },
      // {
      //   path: 'config',
      //   component: () => import(/* webpackChunkName: "profile-config" */ '../views/ProfileConfigView.vue')
      // },
      {
        path: ':id/summary',
        component: () => import(/* webpackChunkName: "profile-summary" */ '../views/ProfileSummaryView.vue')
      },
    ]
  },
  {
    path: '/raffle',
    name: 'raffle',
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "raffle-detail" */ '../views/RaffleDetailView.vue'),
        props: true 
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "raffle-list" */ '../views/RaffleListView.vue')
      },
      {
        path: 'search',
        component: () => import(/* webpackChunkName: "raffle-search" */ '../views/RaffleSearchView.vue')
      },
      {
        path: 'form',
        component: () => import(/* webpackChunkName: "raffle-form" */ '../views/RaffleFormView.vue')
      },
      {
        path: ':id/form',
        name: 'raffleFormUrl',
        component: () => import(/* webpackChunkName: "raffle-form" */ '../views/RaffleFormView.vue')
      },
      {
        path: ':id/tickets',
        name: 'raffleTicketsUrl',
        component: () => import(/* webpackChunkName: "raffle-form" */ '../views/RaffleTicketListView.vue'),
        props: true 
      }
    ]
  },
  {
      path: '/tickets',
      name: 'tickets',
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "raffle-detail" */ '../views/RaffleDetailView.vue')
        },
        {
          path: 'purchases',
          component: () => import(/* webpackChunkName: "raffle-list" */ '../views/TicketPurchasesView.vue')
        }
      ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getIdToken = async () => {
  const user = getAuth().currentUser;
  return await user?.getIdToken(true);
}
router.beforeEach(async(to)=>{
  // const user = getAuth().currentUser;
  // console.log(await getIdToken())
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const auth = useAuthStore()
  
  if(authRequired && !auth.user){
    auth.returnUrl = to.fullPath
    return '/login'
  }
});
export {
  router
} 
