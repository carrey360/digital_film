import axios from './axios'
import qs from 'querystring'
import env from '../config/env';

let util = {};

util.title = function (title) {
    title = title || '数字电影放映监管服务平台';
    window.document.title = title;
};

util.cookieKey = function(){
    return "token";
}

const ajaxUrl = env === 'development' ? 'http://10.6.26.136:8082' : env === 'test' ? '' : env === 'production' ? '' : '';
const devApi = "http://10.200.49.99";


util.ajaxUrl = ajaxUrl;

//分页每页条数
util.limit = 15;

util.getData = (url, params, config = {}) => {
	if(!url){
		return;
    }
    let perfix = ajaxUrl;

    if(config.devApi){
        perfix = devApi;
        url += '.json';
    }
	return axios.get(perfix + url, { params: params });
}

util.postData = (url, params, config = {}) => {
	if(!url){
		return;
    }
    let perfix = ajaxUrl;

    if(config.devApi){
        perfix = devApi;
        url += '.json';
    }

	return axios.post(perfix +url,qs.stringify(params));
}

util.setCurrentPath = function (vm, name) {
    let title = '';
    let routers = vm.$store.state.routers;
    let subName = name && name.split("_")[0];

    let currentPathArr = routers.filter(item => {
        return item.name == subName;
    });
    
    return currentPathArr || [];
};

const copyStyleSheets = (doc) => {
    const ret = doc.createElement('style');
    ret.media="print";
    ret.type="text/css";
    Array.from(document.styleSheets)
           .forEach((styleSheet) => {
             if (styleSheet.cssRules) {
               const rules = styleSheet.cssRules;
               Array.from(rules).forEach((style) => {
                 ret.textContent += style.cssText;
               });
             }
           });
    doc.head.appendChild(ret);
};

util.print = (html) => {
    const iframe = document.createElement('iframe');
    iframe.src = 'about:blank';
    iframe.addEventListener('load', (e) => {
        const contentWindow = e.target.contentWindow;
        copyStyleSheets(contentWindow.document);

        contentWindow.document.body.innerHTML = html;
        contentWindow.print();
    });
    Object.assign(iframe.style, { display: 'none' });
    document.body.appendChild(iframe);
};

util.downFile = (url) =>{
    if(!url){
        return "";
    }
    let a = document.createElement('a');
    a.href = ajaxUrl + url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

util.dataPickerOptions = {
    disabledDate (date) {
        return date && date.valueOf() > Date.now() - 24*60*60*1000;
    }
};

util.dataPickerOption = {
    disabledDate (date) {
        return date && date.valueOf() > Date.now() ;
    }
};

//千分位数字
util.percentileNumber = (number)=>{
   return (parseFloat(number).toFixed(2) || 0).toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {return $1 + ",";});
}
util.percentileNumberInt = (number)=>{
    return (number || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, function($0, $1) {return $1 + ",";});
}

util.jsonToString = (obj) =>{
    let str = [];
    for(let item in obj){
        str.push(item + "=" + obj[item]);
    }
    return str.join("&");
}

util.checkInputNumber = (rule, value, callback, attr) => {
    if (!value) {
        return callback(new Error((attr || '') +'不能为空'));
    }
    // 模拟异步验证效果
    setTimeout(() => {
        if (!Number.isInteger(value)) {
            callback(new Error((attr || '') +'只能是数字类型'));
        } else {
            callback();
        }
    }, 500);
}

util.checkInputMoney = (rule, value, callback, attr="") => {
    if (!value) {
        return callback(new Error(attr +'不能为空'));
    }
    // 模拟异步验证效果
    setTimeout(() => {
        let reg = /^\d+(\.\d{1,2})?$/
        if (!reg.test(value)) {
            callback(new Error(attr +'请输入正确的格式'));
        } else {
            callback();
        }
    }, 500);
}

//分转元
util.formatMoney = (value) => {
    return parseFloat(value/100).toFixed(2);
}

export default util;
