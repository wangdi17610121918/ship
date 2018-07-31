import Vue from 'vue'
import moment from 'moment'

//千分位加逗号
Vue.filter('NumFormat', function(value) {
    if(!value) {
        return '0'
    }
    
    var intPart = Number(value).toFixed(0); //获取整数部分
    
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    
    var floatPart = ""; //预定义小数部分
    
    var value2Array = null;
    
    if((value.toString()).indexOf(".") != -1){
    
        value2Array = value.toString().split(".");
        
    }else {
        
        value2Array = [];
    }
    
    //=2表示数据有小数位
    if(value2Array.length == 2) {
        
        floatPart = value2Array[1].toString(); //拿到小数部分
        
        if(floatPart == 0){
            
            return intPartFormat;
            
        }else {
            
            return intPartFormat + "." + floatPart.slice(0, 2);
            
        }
        
        /*if(floatPart.length == 1) { //补0,实际上用不着
            return intPartFormat + "." + floatPart + '0';
        } else {
            return intPartFormat + "." + floatPart;
        }*/
        
    } else {
        return intPartFormat + floatPart;
    }
    
});

Vue.filter('formatNumber',function(num,cent,isThousand) {
	// 检查传入数值为数值类型
	
	if(isNaN(num) || !num) {
		//num = "0";
		return "";
	}

	num = num.toString().replace(/\$|\,/g,'');
	
    // 获取符号(正/负数)
    var sign = (num == (num = Math.abs(num)));
	
    num = Math.floor(num*Math.pow(10,cent)+0.50000000001);	// 把指定的小数位先转换成整数.多余的小数位四舍五入
    var  cents = num%Math.pow(10,cent);							// 求出小数位数值
    num = Math.floor(num/Math.pow(10,cent)).toString();		// 求出整数位数值
    cents = cents.toString();								// 把小数位转换成字符串,以便求小数位长度

    // 补足小数位到指定的位数
	while(cents.length<cent) {
		cents = "0" + cents;
	}

    if(isThousand) {
     	// 对整数部分进行千分位格式化.
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++) {
			num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
		}
    }

    if (cent > 0) {
		return (((sign)?'':'-') + num + '.' + cents);
	} else  {
		return (((sign)?'':'-') + num);
	}
})

Vue.filter('clear', function(value) {
	var arrClear=value.split(' ');
  return arrClear[0];
})
Vue.filter('clearHr', function(value){
	var strTime=value.split('-').join('');
    return strTime;
})
Vue.filter('timestampFormat', function(timestamp, format){
    var result;
	timestamp = parseInt(timestamp);
	
	if (!timestamp){
	    result = '-';
	} else if (format) {
	    result = moment(timestamp).format(format);
	} else {
	    result = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
	}
	return result;
})
Vue.filter('uppercase',function(str){
	return str.toUpperCase();
})
Vue.filter('lowercase',function(str){
	return str.toLowerCase()
})
Vue.filter('truncate',function(str, length, truncation){
	length = length || 30
    truncation = typeof truncation === "string" ?  truncation : "..." 
    if(str == null) return '';
    return str.length > length ? str.slice(0, length - truncation.length) + truncation : String(str)
})
Vue.filter('number',function(decimals, point, thousands){
	//number	必需，要格式化的数字
    //decimals	可选，规定多少个小数位。
    //point	可选，规定用作小数点的字符串（默认为 . ）。
    //thousands	可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
    let number = (number + '')
            .replace(/[^0-9+\-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
            sep = thousands || ",",
            dec = point || ".",
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec)
                return '' + (Math.round(n * k) / k)
                        .toFixed(prec)
            }
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.')
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '')
            .length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1)
                .join('0')
    }
    return s.join(dec)
})
Vue.filter('escape',function(str){
	//将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
    return String(str).
    replace(/&/g, '&amp;').
    replace(rsurrogate, function(value) {
        var hi = value.charCodeAt(0)
        var low = value.charCodeAt(1)
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';'
    }).
    replace(rnoalphanumeric, function(value) {
        return '&#' + value.charCodeAt(0) + ';'
    }).
    replace(/</g, '&lt;').
    replace(/>/g, '&gt;')
})
Vue.filter('currency',function(amount, symbol, fractionSize){
	return (symbol || "\uFFE5") + numberFormat(amount, isFinite(fractionSize) ? fractionSize : 2)
})

//将毫秒数转为小时
Vue.filter('timeNum', function (index) {
    let num = 0;
    if(!index){
        num = '';
    }else {
        num = Number(Math.floor((index / 1000 / 3600) * 100) / 100);
    }
    return num;
    
});


