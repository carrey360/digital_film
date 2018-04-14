<style lang="less">
    @import './register.less';
</style>

<template>
    <div>
        <div class="top-bar">
            <topLogoBar>
                <div slot="left">
                    <div class="router-title">注册登录</div>
                </div>
                <div slot="right">
                    <div class="back_login"><a href="#/login">我已注册，现在就登录</a></div>
                </div>
            </topLogoBar>
        </div>
        
        <div v-if="step ==1" class="register">
            <div class="register-con">
                <div class="form-con">
                    <Form class="regForm" ref="loginForm" :model="form" :rules="rules" :label-width="100">
                        <FormItem prop="userName" label="用户名">
                            <Input v-model="form.userName" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem prop="userName" label="手机号">
                            <Input v-model="form.userName" placeholder="请输入手机号"></Input>
                        </FormItem>
                        <FormItem prop="password" label="密码">
                            <Input v-model="form.password" placeholder="请输入密码"></Input>
                        </FormItem>
                        <FormItem class="verif-code-item" label="验证码">
                            <Input v-model="form.password" placeholder="请输入验证码" style="width:65%"></Input>
                            <span class="get_ver_code">获取短信验证码</span>
                        </FormItem>
                        <FormItem>
                            <label><Checkbox></Checkbox>阅读并接受</label>
                            <a href="">《注册协议》</a>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>注册账号</Button>
                        </FormItem>
                    </Form>   
                </div>
            </div>
        </div>

        <div v-if="step ==2" class="register">
            <div class="register-con">
                <Form class="result_form" :label-width="100">
                    <FormItem>
                        <Icon type="checkmark-circled" size="80" color="green"></Icon>
                    </FormItem>
                    <FormItem>
                        <span class="result_msg">注册成功</span>
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
            step: 1,
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
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.step++;
                }
            });
        }
    }
};
</script>

<style>

</style>

