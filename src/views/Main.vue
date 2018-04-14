<style lang="less">
    @import "../styles/theme.less";
    @import "./main.less";
</style>
<template>
    <div id="main" class="main">
        <div class="top-bar">
            <topLogoBar></topLogoBar>
        </div>
        <div class="sidebar-menu-con">  
            <sidebar-menu :menuList="menuList" :iconSize="14"></sidebar-menu>
        </div>

        <div class="single-page-con">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import sidebarMenu from './main_components/sidebarMenu.vue';
    import breadcrumbNav from './main_components/breadcrumbNav.vue';
    import topLogoBar from './main_components/topLogoBar.vue';
    import Cookies from 'js-cookie';
    import util from '../libs/util.js';
    
    export default {
        components: {
            sidebarMenu,
            breadcrumbNav,
            topLogoBar
        },
        data () {
            return {
                userName: ''
            };
        },
        computed: {
            menuList () {
                return this.$store.state.menuList;
            },
            currentPath () {
                return this.$store.state.currentPath;  // 当前面包屑数组
            },
        },
        methods: {
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                if (pathArr.length) {
                    this.$store.commit('addOpenSubmenu', pathArr[0].name);
                }
            }
        },
        watch: {
            '$route' (to) {
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length) {
                    this.$store.commit('addOpenSubmenu', pathArr[0].name);
                }
            }
        },
        mounted () {
            this.init();
        },
        created () {}
    };
</script>
