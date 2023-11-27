export const routes = [
    {
        path:'/',
        name: 'LandingPage',
        component: () => import(/* webpackChunkName: "HomePage" */'../components/HomePage/HomePage.vue')
    },
    {
        path: '/:state',
        name: 'DetailPage',
        component: () => import(/* webpackChunkName: "DetailPage" */'../components/DetailPage/DetailPage.vue')
    },
    {
        path:'*',
        component: () => import(/* webpackChunkName: "PageNotFound" */'../components/PageNotFound/PageNotFound.vue')
    }

];