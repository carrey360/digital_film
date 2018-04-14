import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers, commonRouter, appRouter, page404} from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import Cookies from 'js-cookie';
// import 'iview/dist/styles/iview.css';

import VueI18n from 'vue-i18n';
import Locales from './locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(iView);

// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);

// 路由配置
const RouterConfig = {
    routes: routers
};

let cookieKey = Util.cookieKey();

const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {

    iView.LoadingBar.start();
    Util.title(to.meta.title);

    if(to.name == "register" || to.name == "forgetpwd"){
        next();
    }else if (!Cookies.get(cookieKey) && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else if (Cookies.get(cookieKey) && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
        next({
            name: 'home'
        });
    } else {
        next();
    }
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
// 状态管理
const store = new Vuex.Store({
    state: {
        routers: [
            commonRouter[0],
            ...appRouter
        ],
        menuList: [],
        currentPageName: '',
        currentPath: [],  // 面包屑数组
        openedSubmenuArr: [],  // 要展开的菜单数组
        menuTheme: 'light', // 主题
    },
    getters: {

    },
    mutations: {
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        updateMenulist (state) {
            let menuList = [];
            appRouter.forEach((item, index) => {
                if (item.children.length <= 1) {
                    menuList.push(item);
                } else {
                    let i = menuList.push(item);
                    let childrenArr = [];
                    childrenArr = item.children.filter(child => {
                        if (child.meta !== undefined) {
                            if (!child.meta.hide) {
                                return child;
                            }
                        } else {
                            return child;
                        }
                    });
                    menuList[i - 1].children = childrenArr;
                }
            });
            state.menuList = menuList;
        }
    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        //currentPageName: ''
    },
    mounted () {
        //this.currentPageName = this.$route.name;
        this.$store.commit('updateMenulist');
    },
    created () {
        //this.$router.push({
        //   path: '/product/list'
        //});
    }
});