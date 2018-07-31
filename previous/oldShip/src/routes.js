import Vue from 'vue'
import Router from 'vue-router'



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


// 公共模块
const NotFound = () =>
	import ('@/views/404.vue');

const Not_Found = () =>
	import ('@/views/403.vue');

// 国家化公共模块
const NotFoundEn = () =>
	import ('@/viewsEn/404.vue');

const Not_FoundEn = () =>
	import ('@/viewsEn/403.vue');

//船务
const shipMain = () =>
	import ('@/components/shipMain.vue');

const shipIndex = () =>
	import ('@/views/ship/index.vue');

const shipTransportNew = () =>
	import ('@/views/ship/transportNew.vue');	//新的船货跟踪

const shipTide = () =>
	import ('@/views/ship/tide.vue');

const shipCharter = () =>
	import ('@/views/ship/charter.vue');


const shipConversion = () =>
	import ('@/views/ship/conversion.vue'); // 单位换算

const shipInfo = () =>
	import ('@/views/ship/info.vue'); // 船舶资料

const shipBasic = () =>
	import ('@/views/ship/basic.vue'); //  基础运价

const shipBootPage = () =>
	import ('@/views/ship/bootPage.vue'); //  引导页

const comingSoon = () =>
	import ('@/views/ship/comingSoon.vue'); // 敬请期待

const introduction = () =>
	import ('@/views/ship/introduction.vue');

const olibk = () =>
	import ('@/views/ship/olibk.vue'); //油运百科

const olibkMore = () =>
	import ('@/views/ship/olibkMore.vue');

const bootInfo = () =>
	import ('@/views/ship/bootInfo.vue'); //船盘信息

const shipCost = () =>
	import ('@/views/ship/shipCost.vue'); //运费估算

const bootList = () =>
	import ('@/views/ship/bootList.vue'); //船盘列表盘列表

const echarts = () =>
	import ('@/views/ship/echarts.vue'); //曲线图

const transmore = () =>
	import ('@/views/ship/transmore.vue');

const goodList = () =>
	import ('@/views/ship/goodList.vue'); //货盘列表

const goodInfo = () =>
	import ('@/views/ship/goodInfo.vue'); //货盘信息



//航线地图

const routeMap = () =>
	import ('@/views/routemap.vue');

const routeMapEn = () =>
	import ('@/viewsEn/routemap1.vue'); //国际化地图


	
//appmap
const appmap = () =>
	import ('@/views/appmap.vue');
	
const appmapEn = () =>
	import ('@/viewsEn/appmap.vue');	//appmap国际化

//船务国际化
const shipMainEn = () =>
	import ('@/components/shipMainEn.vue');

const shipIndexEn = () =>
	import ('@/viewsEn/ship/index.vue');
	
const shipTransportNewEn = () =>
	import ('@/viewsEn/ship/transportNew.vue');	//新的船货跟踪

const shipTideEn = () =>
	import ('@/viewsEn/ship/tide.vue');

const shipCharterEn = () =>
	import ('@/viewsEn/ship/charter.vue');

const shipConversionEn = () =>
	import ('@/viewsEn/ship/conversion.vue'); // 单位换算

const shipInfoEn = () =>
	import ('@/viewsEn/ship/info.vue');

const shipBasicEn = () =>
	import ('@/viewsEn/ship/basic.vue'); //  基础运价

const shipBootPageEn = () =>
	import ('@/viewsEn/ship/bootPage.vue'); //  引导页

const comingSoonEn = () =>
	import ('@/viewsEn/ship/comingSoon.vue'); // 敬请期待

const introductionEn = () =>
	import ('@/viewsEn/ship/introduction.vue'); // 航程规划

const olibkEn = () =>
	import ('@/viewsEn/ship/olibk.vue'); //油运百科

const olibkMoreEn = () =>
	import ('@/viewsEn/ship/olibkMore.vue');

const bootInfoEn = () =>
	import ('@/viewsEn/ship/bootInfo.vue'); //船盘信息

const shipCostEn = () =>
	import ('@/viewsEn/ship/shipCost.vue'); //运费估算

const bootListEn = () =>
	import ('@/viewsEn/ship/bootList.vue'); //船盘列表

const transmoreEn = () =>
	import ('@/viewsEn/ship/transmore.vue'); //曲线图

const goodListEn = () =>
	import ('@/viewsEn/ship/goodList.vue'); //货盘列表

const goodInfoEn = () =>
	import ('@/viewsEn/ship/goodInfo.vue'); //货盘信息
	
const tideEchartEn = () =>
	import ('@/viewsEn/tideEchart.vue'); //潮汐曲线图


//移动端
const tideEchart = () =>
	import ('@/views/tideEchart.vue'); //潮汐曲线图

const map = () =>
	import ('@/views/map.vue'); //地图

const oildistribution = () =>
	import ('@/views/oildistribution.vue'); //世界石油分布

const oilWind = () =>
	import ('@/views/oilWind.vue'); //风级 浪级

const warArea = () =>
	import ('@/views/warArea.vue'); //战争区域

const bootType = () =>
	import ('@/views/bootType.vue'); //船型

const wsPoint = () =>
	import ('@/views/wsPoint.vue'); //WS点数

const basicRa = () =>
	import ('@/views/basicRa.vue'); // 基本汇率

const charge = () =>
	import ('@/views/charge.vue'); //滞期费

const mainTrans = () =>
	import ('@/views/mainTrans.vue'); // 主要航线




if (lang == 'en') {
	var routes = [{
			path: '/',
			component: shipMainEn,
			name: 'index',
			children: [{
					path: '',
					component: shipIndexEn,
					name: '船务主页',
					meta: {
						title: 'Shipping-Mycrudeoil'
					}
				},
				{
					path: 'transport',
					component: shipTransportNewEn,
					name: '船务主页',
					meta: {
						title: 'Shipping-Mycrudeoil'
					}
				},
				{
					path: 'tide',
					component: shipTideEn,
					name: '潮汐表',
					meta: {
						title: 'Tide-Mycrudeoil'
					}
				},
				{
					path: 'charter',
					component: shipCharterEn,
					name: '我要租船',
					meta: {
						title: 'Chartering-Mycrudeoil'
					}
				},
				{
					path: 'conversion',
					component: shipConversionEn,
					name: '单位换算',
					meta: {
						title: 'Unit Converter-Mycrudeoil'
					}
				},
				{
					path: 'info',
					component: shipInfoEn,
					name: '船舶资料',
					meta: {
						title: 'Vessel Data-Mycrudeoil'
					}
				},
				{
					path: 'basic',
					component: shipBasicEn,
					name: '基础运价',
					meta: {
						title: 'Flat Rate-Mycrudeoil'
					}
				},
				{
					path: 'comingSoon',
					component: comingSoonEn,
					name: '敬请期待',
					meta: {
						title: 'Coming soon-Mycrudeoil'
					}
				},
				{
					path: 'introduction',
					component: introductionEn,
					name: '航程规划',
					meta: {
						title: 'Voyage Route&Speed INTELLIGENCE-Mycrudeoil'
					}
				},
				{
					path: 'olibk',
					component: olibkEn,
					name: '油运百科',
					meta: {
						title: 'Encyclopedia-Mycrudeoil'
					}
				},
				{
					path: 'olibkMore',
					component: olibkMoreEn,
					name: '油运百科详情',
					meta: {
						title: 'Encyclopedia-Mycrudeoil'
					}
				},
				{
					path: 'bootInfo',
					component: bootInfoEn,
					name: '船盘信息',
					meta: {
						title: 'Vessel Details-Mycrudeoil'
					}
				},
				{
					path: 'shipCost',
					component: shipCostEn,
					name: '运费估算',
					meta: {
						title: 'Estimated Freight-Mycrudeoil'
					}
				},
				{
					path: 'bootList',
					component: bootListEn,
					name: '船盘列表',
					meta: {
						title: 'Vessel Details-Mycrudeoil'
					}
				},
				{
					path: 'transmore',
					component: transmoreEn,
					name: '全程概览',
					meta: {
						title: 'Captain Noon Report-Mycrudeoil'
					}
				},
				{
					path: 'goodList',
					component: goodListEn,
					name: '货盘列表',
					meta: {
						title: 'Mycrudeoil'
					}
				},
				{
					path: 'goodInfo',
					component: goodInfoEn,
					name: '货盘信息',
					meta: {
						title: 'Mycrudeoil'
					}
				}
			],
			hidden: true
		},
		{
			path: '/appmap',
			component: appmapEn,
			name: '',
			meta: {
				title: '航线地图'
			},
			hidden: true
		},
		{
			path: '/tideEchart',
			component: tideEchartEn,
			name: '',
			meta: {
				title: '图表'
			},
			hidden: true
		},
		{
			path: '/routemap',
			component: routeMapEn,
			name: '',
			meta: {
				title: 'Mycrudeoil'
			},
			hidden: true
		},
		{
			path: '/oildistribution',
			component: oildistribution,
			name: '',
			meta: {
				title: '世界石油分布'
			},
			hidden: true
		},
		{
			path: '/oilWind',
			component: oilWind,
			name: '',
			meta: {
				title: '风力海浪级别表'
			},
			hidden: true
		},
		{
			path: '/warArea',
			component: warArea,
			name: '',
			meta: {
				title: '战争险区域'
			},
			hidden: true
		},
		{
			path: '/bootType',
			component: bootType,
			name: '',
			meta: {
				title: '油轮船型'
			},
			hidden: true
		},
		{
			path: '/wsPoint',
			component: wsPoint,
			name: '',
			meta: {
				title: 'ws点数'
			},
			hidden: true
		},
		{
			path: '/basicRa',
			component: basicRa,
			name: '',
			meta: {
				title: '基本费率'
			},
			hidden: true
		},
		{
			path: '/charge',
			component: charge,
			name: '',
			meta: {
				title: '滞期费'
			},
			hidden: true
		},
		{
			path: '/mainTrans',
			component: mainTrans,
			name: '',
			meta: {
				title: '主要运输航线'
			},
			hidden: true
		},
		{
			path: '/bootPage',
			component: shipBootPageEn,
			name: '',
			meta: {
				title: 'Mycrudeoil'
			},
			hidden: true
		},
		{
			path: '/404',
			component: NotFoundEn,
			name: '',
			hidden: true
		},
		{
			path: '*',
			hidden: true,
			redirect: {
				path: '/404'
			}
		},
		{
			path: '/403',
			component: Not_FoundEn,
			name: '',
			hidden: true
		}
	]
} else {
	var routes = [{
			path: '/',
			component: shipMain,
			name: 'index',
			children: [{
					path: '',
					component: shipIndex,
					name: '船务主页',
					meta: {
						title: '贸易物流_租油船_船舶租赁_船舶经纪_买原油网'
					}
				},
				{
					path: 'tide',
					component: shipTide,
					name: '潮汐表',
					meta: {
						title: '港口码头（潮汐查询）_贸易物流_租油船_船舶租赁_船舶经纪_买原油网'
					}
				},
				{
					path: 'charter',
					component: shipCharter,
					name: '我要租船',
					meta: {
						title: '我要租船_贸易物流_租油船_船舶租赁_船舶经纪_买原油网'
					}
				},
				{
					path: 'conversion',
					component: shipConversion,
					name: '单位换算',
					meta: {
						title: '单位换算_贸易物流_租油船_船舶租赁_船舶经纪_买原油网'
					}
				},
				{
					path: 'info',
					component: shipInfo,
					name: '船舶资料',
					meta: {
						title: '船舶资料_贸易物流_租油船_船舶租赁_船舶经纪_买原油网'
					}
				},
				{
					path: 'basic',
					component: shipBasic,
					name: '基础运价',
					meta: {
						title: '基础运价_贸易物流_租油船_船舶租赁_船舶经纪_买原油网'
					}
				},
				{
					path: 'comingSoon',
					component: comingSoon,
					name: '敬请期待',
					meta: {
						title: '敬请期待'
					}
				},
				{
					path: 'introduction',
					component: introduction,
					name: '航程规划',
					meta: {
						title: '航程规划'
					}
				},
				{
					path: 'olibk',
					component: olibk,
					name: '油运百科',
					meta: {
						title: '油运百科'
					}
				},
				{
					path: 'olibkMore',
					component: olibkMore,
					name: '油运百科详情',
					meta: {
						title: '油运百科详情'
					}
				},
				{
					path: 'bootInfo',
					component: bootInfo,
					name: '船盘信息',
					meta: {
						title: '船盘信息'
					}
				},
				{
					path: 'shipCost',
					component: shipCost,
					name: '运费估算',
					meta: {
						title: '运费估算'
					}
				},
				{
					path: 'bootList',
					component: bootList,
					name: '船盘列表',
					meta: {
						title: '船盘列表'
					}
				},
				{
					path: 'echarts',
					component: echarts,
					name: '曲线图',
					meta: {
						title: '曲线图'
					}
				},
				{
					path: 'transmore',
					component: transmore,
					name: '全程概览',
					meta: {
						title: '全程概览'
					}
				},
				{
					path: 'goodList',
					component: goodList,
					name: '货盘列表',
					meta: {
						title: '货盘列表'
					}
				},
				{
					path: 'goodInfo',
					component: goodInfo,
					name: '货盘信息',
					meta: {
						title: '货盘信息'
					}
				},
				{
					path: 'transport',
					component: shipTransportNew,
					name: '船务主页',
					meta: {
						title: '贸易物流_租油船_船舶租赁_船舶经纪_买原油网'
					}
				}
			],
			hidden: true
		},
		{
			path: '/tideEchart',
			component: tideEchart,
			name: '',
			meta: {
				title: '图表'
			},
			hidden: true
		},
		{
			path: '/routemap',
			component: routeMap,
			name: '',
			meta: {
				title: '航线地图'
			},
			hidden: true
		},
		{
			path: '/appmap',
			component: appmap,
			name: '',
			meta: {
				title: '航线地图'
			},
			hidden: true
		},
		{
			path: '/oildistribution',
			component: oildistribution,
			name: '',
			meta: {
				title: '世界石油分布'
			},
			hidden: true
		},
		{
			path: '/oilWind',
			component: oilWind,
			name: '',
			meta: {
				title: '风力海浪级别表'
			},
			hidden: true
		},
		{
			path: '/warArea',
			component: warArea,
			name: '',
			meta: {
				title: '战争险区域'
			},
			hidden: true
		},
		{
			path: '/bootType',
			component: bootType,
			name: '',
			meta: {
				title: '油轮船型'
			},
			hidden: true
		},
		{
			path: '/wsPoint',
			component: wsPoint,
			name: '',
			meta: {
				title: 'ws点数'
			},
			hidden: true
		},
		{
			path: '/basicRa',
			component: basicRa,
			name: '',
			meta: {
				title: '基本费率'
			},
			hidden: true
		},
		{
			path: '/charge',
			component: charge,
			name: '',
			meta: {
				title: '滞期费'
			},
			hidden: true
		},
		{
			path: '/mainTrans',
			component: mainTrans,
			name: '',
			meta: {
				title: '主要运输航线'
			},
			hidden: true
		},
		{
			path: '/bootPage',
			component: shipBootPage,
			name: '',
			meta: {
				title: '租船_买原油网'
			},
			hidden: true
		},
		{
			path: '/404',
			component: NotFound,
			name: '',
			hidden: true
		},
		{
			path: '*',
			hidden: true,
			redirect: {
				path: '/404'
			}
		},
		{
			path: '/403',
			component: Not_Found,
			name: '',
			hidden: true
		}
	]
}






Vue.use(Router);

export default new Router({
	//mode : 'history',
	base: __dirname,
	routes,
})