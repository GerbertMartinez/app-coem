// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'

const routes = [
    {
        path: '/',
        name: 'landing',
        component: () => import('@/pages/index.vue')
    },
    {
        path: '/registro',
        name: 'registro',
        component: () => import('@/pages/registro.vue')
    },
    {
        path: '/preregistro/:id',
        name: 'preregistro',
        component: () => import('@/pages/preregistro.vue')
    },
    {
        path: '/ingreso',
        name: 'ingreso',
        component: () => import('@/pages/registroCoem.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login.vue')
    },
    {
        path: '/menu',
        name: 'menu',
        component: () => import('@/pages/menu.vue')
    },
    {
        path: '/ingresoIncidencia',
        name: 'ingresoIncidencia',
        component: () => import('@/pages/ingresoIncidencia.vue')
    },
    {
        path: '/ingresoEvento',
        name: 'ingresoEvento',
        component: () => import('@/pages/ingresoEvento.vue')
    },
    {
        path: '/detalleEventos',
        name: 'detalleEventos',
        component: () => import('@/pages/detalleEventos.vue')
    },
    {
        path: '/completar/:id',
        name: 'completar',
        component: () => import('@/pages/completar.vue')
    },
    {
        path: '/ingresoRecurso',
        name: 'ingresoRecurso',
        component: () => import('@/pages/ingresoRecurso.vue')
    },
    {
        path: '/detalleIncidencias',
        name: 'detalleIncidencias',
        component: () => import('@/pages/detalleIncidencias.vue')
    },
    {
        path: '/detIncidencia/:id',
        name: 'detIncidencia',
        component: () => import('@/pages/detalleIncidencia.vue')
    },
    {
        path: '/gestIncidencia/:id',
        name: 'gestIncidencia',
        component: () => import('@/pages/gestionarIncidencia.vue')
    },
    {
        path: '/gestFinanzas',
        name: 'gestFinanzas',
        component: () => import('@/pages/finanzas.vue')
    },
    {
        path: '/stats',
        name: 'stats',
        component: () => import('@/pages/stats.vue')
    },
    {
        path: '/tareas',
        name: 'tareas',
        component: () => import('@/pages/tareas.vue')
    },
    // ruta 404 redirigir al landing del evento
    {
        path: '/:pathMatch(.*)*', // Captura cualquier ruta no definida
        name: 'NotFound',
        component: () => import('@/pages/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.onError((err, to) => {
    if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
        if (!localStorage.getItem('vuetify:dynamic-reload')) {
            console.log('Reloading page to fix dynamic import error')
            localStorage.setItem('vuetify:dynamic-reload', 'true')
            location.assign(to.fullPath)
        } else {
            console.error('Dynamic import error, reloading page did not fix it', err)
        }
    } else {
        console.error(err)
    }
})

router.isReady().then(() => {
    localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach(async (to, from) => {
    if (!localStorage.getItem('token') && 
        to.name !== 'login' && 
        to.name !== 'landing' && 
        to.name !== 'ingreso' &&
        to.name !== 'registro' && 
        to.name !== 'preregistro' &&
        to.name !== 'completar'
    ){ return {name: 'login'} } else if (
        localStorage.getItem('token') && 
        to.name === 'login'
    ){ return {name: 'menu'} }
})

export default router
