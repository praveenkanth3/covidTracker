export const routes = [
    {
        path:'/',
        name: 'LandingPage',
        component: () => import('../components/HomePage/HomePage.vue')
    },
    {
        path: '/:state',
        name: 'DetailPage',
        component: () => import('../components/DetailPage/DetailPage.vue')
    },
    {
        path:'*',
        component: () => import('../components/PageNotFound/PageNotFound.vue')
    }

];