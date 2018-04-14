<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="logo-title">数字电影放映<span>监管服务平台</span></div>
        <div class="login-con">
            <div class="form-con">
                <p class="login-tip">登录服务平台</p>
                <Form class="loginForm" ref="loginForm" :model="form" :rules="rules">
                    <FormItem prop="userName">
                        <Input v-model="form.userName" placeholder="请输入用户名"></Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input v-model="form.password" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem class="verif-code-item">
                        <Input v-model="form.password" placeholder="请输入验证码">
                            <span slot="append" @click="verifRefresh">
                                <Icon :size="18" type="refresh"></Icon>
                            </span>
                        </Input>
                        <img class="verif-code" src="../../images/code.jpg" />
                    </FormItem>
                    <div class="login-config clearfix">
                        <CheckboxGroup>
                            <Checkbox label="下次自动登录"></Checkbox>
                        </CheckboxGroup>
                        <div class="forgetpassword"><router-link to="forgetpwd">忘记密码</router-link></div>
                    </div>
                    <FormItem>
                        <Button @click="handleSubmit" type="primary" long>登录账号</Button>
                    </FormItem>
                    <div class="no-account">
                        还没用账号？<a href="#/register">立即注册</a>
                    </div>
                </Form>
                
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Util from '@/libs/util';

let urlMap = {
    login: "/login"
};

export default {
    data () {
        return {
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
                    let params = {
                        username: this.form.userName,
                        password: this.form.password
                    };
                    // util.postData(urlMap.login, params).then((res) => {
                    //     if(res){
                            let cookieKey = Util.cookieKey();
                            Cookies.set(cookieKey, "cfcd208495d565ef66e7dff9f98764da");
                            Cookies.set('user', this.form.userName);
                            // Cookies.set('password', this.form.password);
                            this.$router.push({ path: '/' });
                    //     }
                    // });
                }
            });
        }
    }
};
</script>

<style>

</style>
