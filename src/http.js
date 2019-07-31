import axios from 'axios';
import qs from 'qs'
import router from '../src/router';
import store from '../src/store';
import $ from 'jquery'
axios.defaults.timeout = 5000;
// 有权限
axios.defaults.baseURL ='http://106.12.61.239:8080/ERService';
// 无权限
// axios.defaults.baseURL ='http://47.105.137.32:8080/ERService';


// axios.defaults.baseURL ='http://zjz.free.idcfengye.com/ERService';
// axios.defaults.headers.token = '12315446';

// axios.defaults.headers.common['token'] =sessionStorage.getItem("token");
//http request 拦截器
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        // config.data = JSON.stringify(config.data);
        config.data =qs.stringify(config.data);

        config.headers = {
            'Content-Type':'application/x-www-form-urlencoded',
        }
        // if(token){
        //  config.params = {'token':token}
        // }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);


//http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.code ==10000001 ){
            // router.push('/login')
            store.commit('changeStore',{key:'tipText',val:response.data.msg});
            store.commit('changeStore',{key:'alertTip',val:true});
        }else if(response.data.code ==10000002 ){
            store.commit('changeStore',{key:'tipText',val:response.data.msg});
            store.commit('changeStore',{key:'alertTip',val:true});
        }else if(response.data.code ==10000003 ){
            // alert(response.data.msg)
            store.commit('changeStore',{key:'tipText',val:response.data.msg});
            store.commit('changeStore',{key:'alertTip',val:true});
        }

        return response;
    },
    error => {
        return Promise.reject(error)
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        console.log(params)
        if(sessionStorage.getItem("token")){
            params.token=sessionStorage.getItem("token")
        }
        axios.get(url,{
            params:params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
    return new Promise((resolve,reject) => {
        if(sessionStorage.getItem("token")){
        data.token=sessionStorage.getItem("token")
        }
        axios.post(url,data)
            .then(response => {

                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.patch(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        axios.put(url,data)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}