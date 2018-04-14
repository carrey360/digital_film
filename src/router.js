import Main from './views/Main.vue';

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['./views/error_page/404.vue'], resolve); }
};

export const commonRouter = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录'
        },
        component: resolve => { require(['./views/common/login.vue'], resolve); }
    },{
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: resolve => { require(['./views/common/register.vue'], resolve); }
    },{
        path: '/forgetpwd',
        name: 'forgetpwd',
        meta: {
            title: '忘记密码'
        },
        component: resolve => { require(['./views/common/forgetpwd.vue'], resolve); }
    }
];

export const appRouter = [
    {
        path: '/',
        name: 'home',
        icon: 'ios-home-outline',
        title: '首页',
        redirect: '/home',
        component: Main,
        children: [
            { path: 'home', title: '首页', name: 'home_index', component: resolve => { require(['./views/home/home.vue'], resolve); } }
        ]
    },
    {
        path: '/',
        icon: 'ios-monitor-outline',
        title: '设备总况',
        name: 'device',
        meta: {},
        component: Main,
        children: [
            { path: '/device/distribution', title: '设备分布', name: 'device_distribution', component: resolve => { require(['./views/device/distribution.vue'], resolve); } },
            { path: '/device/monitor', title: '实时监控', name: 'device_monitor', component: resolve => { require(['./views/device/monitor.vue'], resolve); } },
            { path: '/device/map', title: '地图监控', name: 'device_map', component: resolve => { require(['./views/device/map.vue'], resolve); } }
        ]
    }
];

export const routers = [
    ...commonRouter,
    ...appRouter,
    page404,
    
];
