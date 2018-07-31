import Axios from 'axios'
var param = (function(){
				let url = window.location.href 
				let obj = {}  
				let reg = /[?&][^?&]+=[^?&]+/g  
				let arr = url.match(reg) //找到所有匹配项   
				  if (arr) {  
				    arr.forEach((item) => { //遍历数组  
					    let tempArr = item.substring(1).split('=') //截取字符串并分割  
					    let key = decodeURIComponent(tempArr[0])  
					    let val = decodeURIComponent(tempArr[1])  
					    obj[key] = val  
				    })  
				  }
 
				  return obj['_gt']  
			})()
Axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
Axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';
export default Axios.create({
	baseURL: '',  // 基本路径
	headers:{  // 设置请求头
		"token": param
//		'content-type':'application/x-www-form-urlencoded',
//		xhrFields: {
//          withCredentials: true
//      },
//      crossDomain: true
	},
	transformRequest: [function (data,xhr) {
	    return JSON.stringify(data);
	}]
})
