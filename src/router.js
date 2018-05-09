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
        // icon: 'ios-home-outline',
        icon: "home",
        title: '首页',
        redirect: '/ad/list',
        component: Main,
        children: [
            { path: 'home', title: '首页', name: 'home_index', component: resolve => { require(['./views/home/home.vue'], resolve); } }
        ]
    },{
        path: '/',
        //icon: 'laptop',
        icon: "device",
        title: '设备总况',
        name: 'device',
        meta: {},
        component: Main,
        children: [
            { path: '/device/distribution', title: '设备分布', name: 'device_distribution', component: resolve => { require(['./views/device/distribution.vue'], resolve); } },
            { path: '/device/monitor', title: '实时监控', name: 'device_monitor', component: resolve => { require(['./views/device/monitor.vue'], resolve); } },
            { path: '/device/map', title: '地图监控', name: 'device_map', component: resolve => { require(['./views/device/map.vue'], resolve); } }
        ]
    },{
        path: '/',
        //icon: 'ios-list-outline',
        icon: "movie",
        title: '放映信息',
        name: 'movie',
        meta: {},
        component: Main,
        children: [
            { path: '/movie/show', title: '放映总览', name: 'movie_show', component: resolve => { require(['./views/movie/show.vue'], resolve); } },
            { path: '/movie/rank_statistics', title: '放映排名', name: 'movie_rank_statistics', component: resolve => { require(['./views/movie/rank_statistics.vue'], resolve); } },
            { path: '/movie/abnormal_statistics', title: '异常统计', name: 'movie_abnormal_statistics', component: resolve => { require(['./views/movie/abnormal_statistics.vue'], resolve); } },
            { path: '/movie/statistics', title: '影片统计', name: 'movie_statistics', component: resolve => { require(['./views/movie/statistics.vue'], resolve); } },
            { path: '/movie/photo', title: '照片', name: 'video_photo', component: resolve => { require(['./views/video/photo.vue'], resolve); } },
        ]
    },{
        path: '/',
        //icon: 'ios-analytics-outline',
        icon: "ad",
        title: '广告统计',
        name: 'ad',
        meta: {},
        component: Main,
        children: [
            { path: '/ad/list', title: '广告项目明细', name: 'ad_list', component: resolve => { require(['./views/ad/list.vue'], resolve); } },
            { path: '/ad/show_list', title: '广告放映明细', name: 'ad_show_list', component: resolve => { require(['./views/ad/show_list.vue'], resolve); } }
        ]
    }
];

export const routers = [
    ...commonRouter,
    ...appRouter,
    page404,
    
];
