// 主页面布局模板
import Layout from '@/views'

/**
 * Note: 如果要生成菜单路由，必须有一个父渲染模板和最终渲染页面
 * hidden: 如果设置为true则不会渲染为菜单
 * name: 路由名称，如果需要缓存页面则必须设置这一项
 * meta: {
 *    roles: 允许访问的角色或者编码
 *    title: 菜单名
 *    icon: 菜单图标svg名称
 *    cache: 设置为true页面会被缓存
 *    nocrumb: 设置为true页面不会被显示在面包屑上
 *    affix: 设置为true则在面包屑上不能被关闭
 * }
 */  

export const constRoutes = [{
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
        name: 'Dashboard',
        path: 'dashboard',
        hidden: true,
        component: () => import('@/views/board'),
        meta: { title: '概览', icon: 'dashboard', cache: false, affix: true }
    }]
}, {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login')
}, {
    name: '404',
    path: '/404',
    component: () => import('@/views/404')
}]

export const asyncRoutes = [{
    path: '/base',
    component: Layout,
    redirect: '/base/index',
    meta: { title: '基本信息', icon: 'star', cache: true },
    children: [{
        name: 'base',
        path: 'index',
        hidden: true,
        component: () => import('@/views/board'),
        meta: { title: '概览', icon: 'dashboard', cache: false, affix: true }
    }], 
}, {
    path: '/icon',
    component: Layout,
    redirect: '/icon',
    meta: { title: '小图标', icon: 'ding', cache: true },
    children: [{
        name: 'svg',
        path: '',
        hidden: true,
        component: () => import('@/views/svg'),
        meta: { title: '概览', icon: 'dashboard', cache: false, affix: true }
    }], 
}, {
    name: 'other', path: '*', redirect: '/404' 
}]
