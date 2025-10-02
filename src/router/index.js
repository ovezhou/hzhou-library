import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/fireregister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role') || ''
  if (to.path === '/admin' && role !== 'admin') {
    alert('Access denied: Admins only')
    return next('/')
  }
  next()
})

export default router
