<style lang="less" scoped>
    .content{
        color: #fff; 
        display: flex; 
        font-size: 14px;
        .sys_name{
            margin-left: 25px;
        }
        .header-avator-con{
            position: absolute;
            right: 50px;
            display: flex;
            .message-con{
                display: inline-block;
                text-align: center;
                
                cursor: pointer;
                i{
                    vertical-align: middle;
                }
                
            }
            .user-dropdown{
                &-menu-con{
                    .main-user-name{
                        display: inline-block;
                        width: 100px;
                        word-break: keep-all;
                        white-space: nowrap;
                        vertical-align: middle;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: right;
                    }
                }
                &-innercon{
                    height: 100%;
                    padding-right: 14px;
                }
            }
            .userName{
                color: #fff;
                opacity: 0.8;
            }
            .notice{
                color: #fff;
                font-size: 14px;
                margin-right: 5px;
                opacity: 0.8;
            }
            .header-border{
                border-left: 1px solid #fff;
                height: 25px;
                opacity: 0.2;
                margin: 14px 12px 0 6px;
            }
        }

        .router-title{
            margin-left: 20px;
            opacity: 0.8;
        }
        .back_login{
            position: absolute;
            right: 30px;
            opacity: 0.8;
            a{
                color: #fff;
            }
        }
    } 
    
</style>
<style lang="less">
    .demo-badge-alone{
        background: #fff !important;
        color: #000 !important;
        height: 16px !important;
        line-height: 14px !important;
        padding: 0 !important;
    }
</style>


<template>
    <div class="content">
        <div class="sys_name">数字电影放映监管服务平台</div>
        <slot name="left"></slot>
        <slot name="right">
            <div class="header-avator-con">
                <div class="user-dropdown-menu-con">
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                            <a class="userName" href="javascript:void(0)">
                                <span class="main-user-name">{{ userName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="restPwd" divided>重置密码</DropdownItem>
                                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                </div>
                <span class="header-border"></span>
                <div class="message-con">
                    <a class="notice" href="javascript:void(0)">通知</a>
                    <Badge count="20" class-name="demo-badge-alone"></Badge>
                </div>
            </div>
        </slot>

    </div>
</template>
<script>
import Cookies from 'js-cookie';
import Util from '@/libs/util';

export default {
    data(){
        return {
            userName: "万象文化传媒"
        }
    },
    methods: {
        handleClickUserDropdown (name) {
            if(name == "loginout"){
                let cookieKey = Util.cookieKey();
                Cookies.remove(cookieKey);
                this.$router.push({path: '/login'});
            }
        },
    }
}
</script>
