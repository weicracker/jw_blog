import axios from "axios";
// action 基础 类， 以后用于拓展使用
class ActionBase {
    BaseURL; // 底层服务事件，用户数据实时同步作用
    constructor() {
        this.init();
        this.initAxios();
    }
    init() {
        // 初始化 action
        this.BaseURL = 'http://10.0.32.59:8090/';
    }
    initAxios() {
        //设置全局axios默认值
        axios.defaults.timeout = 10000; //10000的超时验证
        axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
        axios.defaults.headers['Accept'] = 'application/json;charset=UTF-8';
        // axios.defaults.headers['XASPSESSION'] = this.asp.user.tokenstr;
        //request拦截器
        axios.interceptors.request.use(
            config => {
                //每次发送请求之前检测都mobx存有token,那么都要放在请求头发送给服务器
                if (true) {
                    config.headers['XASPSESSION'] = this.asp.user.tokenstr;
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            }
        );
        //respone拦截器
        axios.interceptors.response.use(
            response => {
                return response
            },
            error => { //默认除了2XX之外的都是错误的，就会走这里
                if (error.data) {
                    switch (error.data.status) {
                        case 401:
                            // 用户token过期或用户未登录
                            console.log(401);
                        case 404:
                            // 用户token过期或用户未登录
                            console.log("请求的内容不存在");
                            console.log(404);
                        case 408:
                            // 请求超时
                            console.log(408);
                        case 500:
                            // 用户token过期或用户未登录
                            console.log("服务器内部错误");
                    }
                } else {
                    console.log(error);
                }
                return Promise.reject(error.response);
            }
        );
    }
    // 获取浏览器 query 参数
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }
}

export default ActionBase;