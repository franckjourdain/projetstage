import { createRouter, createWebHistory } from 'vue-router';
import * as Users from '@/views/users';

const routes = [
  {
    path: '/',
    name: 'Accueil',
    redirect: () => {
     
        return { name: 'Login' };

    }
  }, 
  {
    path: '/inscription',
    name: 'Inscription',
    component: Users.InscriptionView
  },
  {
    path: '/login',
    name: 'Login',
    component: Users.LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Users.DashboardView
  },
  {
    path: '/mesphotos',
    name: 'MesPhotos',
    component: Users.MesPhotos
  },
  {
    path: '/mesvideos',
    name: 'MesVideos',
    component: Users.MesVideos
  },
  {
    path: '/mesfichiers',
    name: 'MesFichiers',
    component: Users.MesFichiers
  },
  {
    path: '/planSite',
    name: 'PlanSite',
    component: Users.PlanSite
  },
  {
    path: '/conditionsUtilisation',
    name: 'ConditionsUtilisation',
    component: Users.ConditionsUtilisation
  },
  {
    path: '/demandeSuppression',
    name: 'DemandeSuppression',
    component: Users.DemandeSuppression
  },
  {
    path: '/demandeContact',
    name: 'DemandeContact',
    component: Users.DemandeContact
  }
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
