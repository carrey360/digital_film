<style lang="less" scoped>
    .mySelf_icon{
        width: 18px;
        height: 18px;
        background: url(../../images/home.svg) no-repeat 0 0;
        display: inline-block;
        background-size: contain;
        vertical-align: bottom;
        margin-right: 4px;
        &.home{
            background-image: url(../../images/home.svg); 
        }
        &.device{
            background-image: url(../../images/device.svg); 
        }
        &.movie{
            background-image: url(../../images/movie.svg); 
        }
        &.ad{
            background-image: url(../../images/ad.svg); 
        }
    }
</style>

<template>
    <Menu ref="sideMenu" :active-name="currentPageName" :open-names="openedSubmenuArr" :theme="menuTheme" width="auto" @on-select="changeMenu" accordion>
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="item.path">
                <!-- <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon> -->
                <i :class="['mySelf_icon',  item.icon]"></i>
                <span class="layout-text" :key="item.path">{{ item.title }}</span>
            </MenuItem>

            <Submenu v-if="item.children.length>1" :name="item.name" :key="item.path">
                <template slot="title">
                    <!-- <Icon :type="item.icon" :size="iconSize"></Icon> -->
                    <i :class="['mySelf_icon',  item.icon]"></i>
                    <span class="layout-text">{{ item.title }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
                        <span class="layout-text" :key="child.name">{{ child.title }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    data () {
        return {
            currentPageName: this.$route.name,
            openedSubmenuArr: this.$store.state.openedSubmenuArr,
            menuTheme: this.$store.state.menuTheme,
        };
    },
    name: 'sidebarMenu',
    props: {
        slotTopClass: String,
        menuList: Array,
        iconSize: Number
    },
    computed: {},
    methods: {
        changeMenu (active) {
            this.$router.push({
                name: active
            });
        }
    },
    watch: {
        '$route' (to) {
            this.currentPageName = to.name;
            localStorage.currentPageName = to.name;
        },
        currentPageName () {
            this.openedSubmenuArr = this.$store.state.openedSubmenuArr;
            this.$nextTick(() => {
                this.$refs.sideMenu.updateOpened();
            });
        }
    },
    updated () {
        this.$nextTick(() => {
            this.$refs.sideMenu.updateOpened();
        });
    }

};
</script>
