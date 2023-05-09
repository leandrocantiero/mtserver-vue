import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Layout/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard/Dashboard.vue')
      },
      {
        path: '/configuration',
        name: 'Configuração',
        component: () => import('../views/Configuration/Configuration.vue')
      },
      {
        path: '/profile',
        name: 'Perfil',
        component: () => import('../views/UserProfile/UserProfile.vue')
      },
      {
        path: '/justification',
        name: 'Justificativas',
        component: () => import('../views/Justification/Justifications.vue')
      },
      {
        path: '/situation',
        name: 'Situações',
        component: () => import('../views/Situation/Situations.vue')
      },
      {
        path: '/relation',
        name: 'Relacionamentos',
        component: () => import('../views/Relation/Relations.vue')
      },
      {
        path: '/seller',
        name: 'Vendedores',
        component: () => import('../views/Sellers/Sellers.vue')
      },
      {
        path: '/images',
        name: 'Imagens',
        component: () => import('../views/Images/Images.vue')
      },
      {
        path: '/goal',
        name: 'Metas',
        component: () => import('../views/Goals/Goals.vue')
      },
      {
        path: '/database',
        name: 'Base de Dados',
        component: () => import('../views/Database/Database.vue')
      },

      // Example pages
      {
        path: '/icons',
        name: 'icons',
        component: () => import('../views/Icons/Icons.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        component: () => import('../views/Maps/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import('../views/Tables/RegularTables.vue')
      }
    ]
  },
  {
    path: '/auth',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/Auth/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/Auth/Register.vue')
      },
      {
        path: '/forgotPassword',
        name: 'forgotPassword',
        component: () => import('../views/Auth/ForgotPassword.vue')
      },
      {
        path: '/connectDatabase',
        name: 'connectDatabase',
        component: () => import('../views/Auth/ConnectDatabase.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
