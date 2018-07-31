import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'

import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import router from '@/routes'


import promise from 'es6-promise';
promise.polyfill();

import '@/slib.js'


Vue.use(VueRouter)




router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    document.title = to.meta.title;
    next()
});





var mianVue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')