var configURL = null;
var urlStr = window.location.href;
if(urlStr.indexOf('ship9.mycrudeoil')!=-1 || urlStr.indexOf('info9.mycrudeoil')!=-1){   // uat 
	configURL={
		ids: [100008982],
		infoUrl:'https://info9.mycrudeoil.com',
        weatherUrl: 'http://10.143.0.76:8080',
		shipUrl:'https://ship9.mycrudeoil.com',
		index:'https://www9.mycrudeoil.com',
		shopHall:"https://trade9.mycrudeoil.com",
		member:'https://member9.mycrudeoil.com',
		sys:'https://sys9.mycrudeoil.com',
		appUrl:'https://app9.mycrudeoil.com',
		
	}
}else if(urlStr.indexOf('info.mycrudeoil')!=-1 || urlStr.indexOf('ship.mycrudeoil')!=-1){    // 生产
	configURL={
        ids: [100008019, 100008020, 100008024, 100008022],
		infoUrl:'https://info.mycrudeoil.com',
        weatherUrl: 'http://10.136.64.146:8080',
		shipUrl:'https://ship.mycrudeoil.com',
		index:'https://www.mycrudeoil.com',
		shopHall:"https://trade.mycrudeoil.com",
		member:'https://member.mycrudeoil.com',
		sys:'https://sys.mycrudeoil.com',
		appUrl:'https://app.mycrudeoil.com',
	}
}else{  // 测试环境
	
	configURL={
        ids: [100011683, 100000085],
		infoUrl:'http://info.test.mycrudeoil.com',         // 资讯
		//shipUrl:'http://ship.test.mycrudeoil.com',       // 船务
		shipUrl:'http://10.26.2.175',
		index:'http://www.test.mycrudeoil.com',            //大首页
		shopHall:"http://trade.test.mycrudeoil.com",       //原油大厅
		member:'http://member.test.mycrudeoil.com/member',
		sys:'http://member.test.mycrudeoil.com/sys',
		appUrl:'http://app.test.mycrudeoil.com',
	}
}
