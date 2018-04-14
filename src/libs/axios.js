import axios from 'axios';
import { Message } from 'iview';
import Cookies from 'js-cookie';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // let token = Cookies.get("serviceToken");

        let token = "S9NWSk4NXp3DdjZYHuf4xHmMsXUAFTRXyry9BXHhqZr2mdY7KgL9k1OvSP2YFMHvn1nrXjp9wQCYx0qdlxl4dRZ7kS5Mgb6YSbvj/S9ZaaYs0D3sgMT5nmPAu0I3AcNR4mcJqUhctnpxLfo0URtt4yDWm1YMNVeflt6For7vTdyvwt3GVH1NS/o9JvnvueKmj10Gl0RdhNus7rn799b7BXJfux60o1Xa4sTaf33ggtF+T4nP4YQEWObHgqQLoab79jBghFmVk6U0HZgZqiZ272j79JJn2YPoDKKQ1UlqqHIEAw1mAHSRvV3Qvmv1jzIrCHVhs4gAMt/4MIqH+MFZ+gZsUzKCsA9gazGa3t3y7eKZyFHKacT1M+oPdNI56//rbRLMfmEAld4eAvYHsWh/PoOYYKNBGRm0UXLaSG8ZToPu05v+PCG61UMx9rMCjqC4uISHo9zAtcPmu4ySlG7O0CCNJpVNBw4gZnk/6e+UNhK4Hq7JdWKvSrr21Ih5XEWRJq3JsNAHKhhZJVzAz+DNHma4iUEXobl+Ee/2+/59pjd6vqRbxMjSx7LK2nSY2x6+sSrWwNF0GWVnb3YZiXQwcXnP0v1TUNdddg4y4XNFin+x4Y3imQIBjgkngfgfrVcaPgcrmcCRPWBQePnpPjeqiFWtYL/EEdPRIitFjXTZNbo=";

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
