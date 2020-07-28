import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Search from '../components/search/Search.vue'
import QuestionsAnswers from '../components/QuestionsAnswers.vue'
import test from '../components/test'
import Preview from '../components/Preview.vue'
import AtlasAnalysis from '../components/AtlasAnalysis.vue'
import Collaboration from '../components/Collaboration.vue'
import HelloWorld from '../components/HelloWorld.vue'

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    component: () =>
        import( /* webpackChunkName: "home" */ '@/components/Home.vue'),
    children: [
        {
            path: '/search',
            name: 'Search',
            component: () =>
                import('@/components/search/Search.vue')
            // children: [{
            //     path: 'model',
            //     name: 'Model',
            //     component: () =>
            //         import ('@/components/Model.vue'),
            // }]
        },
        {
            path: '/search/:id',
            name: 'Search',
            component: () =>
                import('@/components/search/Search.vue')
        },

        {
            path: '/questionsAnswers',
            component: QuestionsAnswers
        },
        {
            path: '/test',
            name: test,
            component: () =>
                import("@/components/test.vue")

        },
        // {

        //     path: '/preview',
        //     name: 'preview',
        //     component: () =>
        //         import ('@/components/Preview.vue'),
        //     menuorigin: 'local'
        // },

        {

            path: '/atlasAnalysis',
            name: 'AtlasAnalysis',
            component: () =>
                import('@/components/AtlasAnalysis.vue'),
        },
        {
            path: '/collaboration',
            name: 'Collaboration',
            component: () =>
                import('@/components/Collaboration.vue')

        },

        {
            path: '/preview',
            name: 'Preview',
            component: () =>
                import('@/components/Preview.vue'),

        },

        {
          path: '/morerecord',
          name: 'Morerecord',
          component: () =>
            import('@/components/morerecord/Morerecord.vue')
        },
    ]
},



{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import( /* webpackChunkName: "about" */ '../views/About.vue')
},
{
    name: 'HelloWorld',
    path: '/helloWorld',
    component: HelloWorld,
    // component: () =>
    // import ( /* webpackChunkName: "about" */ '@/components/HelloWorld.vue')
},


]

const router = new Router({
    routes
})

export default router
