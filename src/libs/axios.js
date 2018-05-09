import axios from 'axios';
import { Message } from 'iview';
import Cookies from 'js-cookie';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // let token = Cookies.get("serviceToken");

        let token = "";

        if (token) {
            switch (config.method) {
                case 'post': 
                    if (config.data) {
                        config.data += '&token=' + encodeURIComponent(token);
                    } else {
                        config.data = 'token=' + encodeURIComponent(token);
                    }
                    break;
                case 'get':
                    if (config.params && typeof config.params === 'object') {
                        config.params.token = token;
                    } else {
                        config.params = {};
                        config.params.token = token;
                    }
                    break;
            }
        }
        // if(token){
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        let res_code = response.data.code;
        if (res_code === 200) {
            return response.data.data || true;
        }else if(res_code === 10101 || res_code === 10102){
            //token失效
            Message.error({
                content: "token失效"
            });
            return false;
        }else {
            Message.error({
                content: response.data.msg || response.data.message
            });
            return false;
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
              case 400:
                error.message = '请求错误'
                break
              case 401:
                error.message = '未授权，请登录'
                break
              case 403:
                error.message = '拒绝访问'
                break
              case 404:
                error.message = `请求地址出错: ${error.response.config.url}`
                break
              case 408:
                error.message = '请求超时'
                break
              case 500:
                error.message = '服务器内部错误'
                break
              case 501:
                error.message = '服务未实现'
                break
              case 502:
                error.message = '网关错误'
                break
              case 503:
                error.message = '服务不可用'
                break
              case 504:
                error.message = '网关超时'
                break
              case 505:
                error.message = 'HTTP版本不受支持'
                break
              default:
            }
          }
        Message.error({
            content: error.message
        });
        return Promise.reject(error);
    }
);

export default axios;
