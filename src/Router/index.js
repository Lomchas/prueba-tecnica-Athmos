import { createWebHistory, createRouter, RouterLink } from "vue-router";
import Login from '../components/Views/Login/Login.vue'
import SignUp from '../components/Views/SignUp/SignUp.vue'
import NotFound from '../components/Views/NotFound/NotFound.vue'
import Home from '../components/Views/AppHome/AppHome.vue'
import AddTask from '../components/Views/AddTask/AddTask.vue'
import EditTask from '../components/Views/EditTask/EditTask.vue'
import { auth } from "../Firebase/config";

const routes = [
    {
        path: '/:pathMatch(.*)',
        name: 'bad-not-found',
        component: NotFound
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if(to.meta.noIsAuth){
                if(auth.currentUser === null){
                    next()
                }
                else if (auth.currentUser){}
            }
            console.log(auth)
        },
        meta: {
            noIsAuth: true
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp,
        meta: {
            noIsAuth: true
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/addTask',
        name: 'AddTask',
        component: AddTask,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/editTask/:id',
        name: 'EditTask',
        component: EditTask,
        meta: {
            isAuth: true
        }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: 'active'
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.isAuth)) {
        const user = auth.currentUser;
        console.log('usuario desde router', user)
        if (user) {
            next()
        }
        else {
            next('/login')
        }
    }
    else if (to.matched.some(record => record.meta.noIsAuth)){
        const user = auth.currentUser;
        if (user) {
            next('/home')
        }
        else {
            next()
        }
    }
    else {
        next()
    }
})
export default router