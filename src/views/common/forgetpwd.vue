<style lang="less">
    @import './register.less';
</style>

<template>
    <div>
        <div class="top-bar">
            <topLogoBar>
                <div slot="left">
                    <div class="router-title">重置密码</div>
                </div>
                <div slot="right">
                    <div class="back_login"><a href="#/login">返回登录</a></div>
                </div>
            </topLogoBar>
        </div>
        <div class="register" v-if="step ==1">
            <div class="register-con">
                <div class="form-con">
                    <Form class="regForm" ref="loginForm" :model="form" :rules="rules" :label-width="100">
                        <FormItem prop="userName" label="手机号">
                            <Input v-model="form.userName" placeholder="请输入手机号"></Input>
                        </FormItem>
                        <FormItem class="verif-code-item" label="验证码">
                            <Input v-model="form.password" placeholder="请输入验证码" style="width:65%"></Input>
                            <span class="get_ver_code">获取短信验证码</span>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>下一步</Button>
                        </FormItem>
                    </Form>    
                </div>
            </div>
        </div>
        <div class="register" v-if="step ==2">
            <div class="register-con">
                <div class="form-con">
                    <Form class="regForm" ref="loginForm" :model="form" :rules="rules" :label-width="100">
                        <FormItem prop="password" label="输入新密码">
                            <Input v-model="form.password" placeholder="请输入新密码"></Input>
                        </FormItem>
                        <FormItem prop="password" label="确认新密码">
                            <Input v-model="form.password" placeholder="请确认新密码"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" long>重置密码</Button>
                        </FormItem>
                    </Form>  
                </div>
            </div>
        </div>
        <div class="register" v-if="step ==3">
            <div class="register-con">
                <Form class="result_form" :label-width="100">
                    <FormItem>
                        <Icon type="checkmark-circled" size="80" color="green"></Icon>
                    </FormItem>
                    <FormItem>
                        <span class="result_msg">重置密码成功</span>
                    </FormItem>
                    <FormItem>
                        <router-link to="login"><Button type="primary" long class="button">返回登录</Button></router-link>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
    
</template>

<script>
import Cookies from 'js-cookie';
import util from '@/libs/util';

import topLogoBar from '../main_components/topLogoBar.vue';

let urlMap = {
    login: "/login"
};

export default {
    components: {
        topLogoBar
    },
    data () {
        return {
            step:1,
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        verifRefresh(){
            console.log(333);
        },
        handleSubmit () {
            this.step++;
        }
    }
};
</script>

<style>

</style>

