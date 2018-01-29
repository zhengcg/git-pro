/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '../store/store'
import * as types from '../store/types'
import router from '../router'

// axios 配置
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // if (store.state.token) {
            // 登录接口
            // http://wx.zhengpinsuyuan.com/login?openId=oksWv05wD3EsjJTXLRD1yAAj-HsY

            document.cookie='sjy.session.id=409ce47543594913b843db963fbf6336'
            // config.headers.Authorization = `token ${store.state.token}`;//${}es6语法，在字符串中使用变量。

        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code==201){
            router.push({
                        name: 'timeOut'
                    })
        }else{
            return response;
        }
        
    },
    error => {
        if (error.response) {
            switch (error.response.code) {
                case 201:
                    // 401 清除token信息并跳转到登录页面
                    // store.commit(types.LOGOUT);
                    router.replace({
                        path: 'timeOut'
                        // query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)
    });

export default axios;
