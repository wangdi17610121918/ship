import Vue from 'vue'
import $ from 'jquery'


import Vuex from 'vuex'
Vue.use(Vuex)

import ElementUI from 'element-ui'
Vue.use(ElementUI)

import locale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'

import Utile from '@/lib/utils'
Vue.use(Utile)

import 'font-awesome/css/font-awesome.min.css'
import '@/filters'

function getCookie(name) { 
    var strCookie = document.cookie.replace(/\s/,"");
    var arr = strCookie.split(';');
    for (var i = 0; i < arr.length; i++) {
       var t = arr[i].split("=");
        if(t[0].trim() == name) {
            return t[1];
        }
    };
    return null;
}

if(getCookie("_l_")){
	var lang = getCookie("_l_").substr(0,2)
}else{
	var lang = navigator.languages || navigator.userLanguages;
	if(lang){
		lang = lang[0].substr(0,2)
	}else{
		lang = navigator.language || navigator.userLanguage;
	}
}
//console.log(document.getElementsByTagName("script")[0])



if(lang == 'en'){
	locale.use(enLocale)
}
if (lang == 'en') {
	require('../static/cssEn/apiEn.css')
} else {
	require('../static/css/api.css')
}