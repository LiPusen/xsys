import Vue from 'vue'
import Router from 'vue-router'
import { constRoutes, asyncRoutes } from './route'
import store from '../store'
import { getCookie } from '../utils/index'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    scrollBehavior: () => ({ y: 0 }),
    routes: constRoutes
})

NProgress.configure({ showSpinner: false })

store.commit('mRouts', constRoutes)

// 路由拦截
// 白名单，不需要进行登录的路由
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
    NProgress.start() 
    if (window.localStorage.getItem('token')) {
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done() 
        } else {
            // 通过用户角色判断是否已经登录
            if (!store.state.isLogin) {
            // if (store.getters.roles.length === 0) {
            //     store.dispatch('GetUserInfo').then(res => {
            //         const roles = res.data.roles 
            //         store.dispatch('GenerateRoutes', { roles }).then(() => { 
                        // router.addRoutes(store.getters.addRouters) 
                        setTimeout(() => {
                            router.addRoutes(asyncRoutes)
                            store.commit('mIslogin')
                            store.commit('mRouts', constRoutes.concat(asyncRoutes))
                            // 语法糖
                            next({ ...to, replace: true }) 
                        }, 1000);
                        // 语法糖
                        // next({ ...to, replace: true }) 
                //     })
                // }).catch((err) => {
                //     store.dispatch('FedLogOut').then(() => {
                //         Message.error(err)
                //         next({ path: '/' })
                //     })
                // })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done() 
        }
    }
})

router.afterEach(route => {
    NProgress.done()
})

export default router

/*
 * 路由约定：
 * 1.公共页面没有name属性
 * 2.不需要权限控制的页面没有meta.code属性
 */