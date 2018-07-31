 import axios from '../axios';

let base =configURL.shipUrl;    // 船务

let base2 = configURL.infoUrl;   // 资讯

let base3 = configURL.appUrl; //app船务



// 我要租船
export const start = params => { return axios.post(`${base}/shipPact/queryValueSetEle.json`, params).then(res => res.data); };

export const saveForm = params => { return axios.post(`${base}/pallet/save.json`, params).then(res => res.data); };

export const trader = params => { return axios.post(`${base}/traderNameList.json`, params).then(res => res.data); };

export const shipInfoData = params => { return axios.post(`${base}/sysShip/findSysShipByImoName.json`, params).then(res => res.data); };    //船舶资料

export const queryValueSet = params => { return axios.post(`${base}/sysShip/queryValueSet.json`, params).then(res => res.data); };    //船舶资料 下拉

export const tideData = params => { return axios.post(`${base}/tide/findTideListByPortDate.json`, params).then(res => res.data); };    //潮汐

export const tideDataApp = params => { return axios.post(`${base3}/ship/tide/findTideListByPortDate.json`, params).then(res => res.data); };    //潮汐

export const conversionAllData = params => { return axios.post(`${base}/om/unit/findAll.json`, params).then(res => res.data); };    //单位换算 - 全

export const conversionData = params => { return axios.post(`${base}/om/unit/getRateInfo.json`, params).then(res => res.data); };    //单位换算 - 单

export const basicData = params => { return axios.post(`${base}/om/basicTariff/findBasicTariffByPort.json`, params).then(res => res.data); };    //基础运价

export const queryTrack = params => { return axios.post(`${base}/shipPact/queryTrack.json`, params).then(res => res.data); };    //船务跟踪

export const bootsInfo = params => { return axios.post(`${base}/shipPlate/findShipPlateDetailForground.json`, params).then(res => res.data); }; //船盘信息

export const shippingCost = params => { return axios.post(`${base}/om/dealPoints/getDealPointsDates.json`, params).then(res => res.data); } //运费估算 船型

export const costLoad = params => { return axios.post(`${base}/om/basicTariff/findAllPortList.json`, params).then(res => res.data); } //运费估算 装卸港

export const CostSearch = params => { return axios.post(`${base}/om/basicTariff/freightTools.json`, params).then(res => res.data); } //运费估算

export const CostDates = params => { return axios.post(`${base}/om/dealPoints/getDealPointsDates.json`, params).then(res => res.data); } // 运费详情日期

export const bootsList = params => {return axios.post(`${base}/shipPlate/queryAllShipPlateList.json`, params).then(res => res.data);} // 胎盘列表

export const transMore = params => {return axios.post(`${base}/transit/queryMoreTransitList.json`, params).then(res => res.data);} // 全程概览更多

export const goodsList = params => { return axios.post(`${base}/pallet/findMorePalletList.json`, params).then(res => res.data);};   // 货盘列表

export const goodsInfo = params => { return axios.post(`${base}/pallet/findPalletDetail.json`, params).then(res => res.data);};   // 货盘列表


// 首页
export const topInfo = params => { return axios.post(`${base}/shipPlate/findShipPlateList.json`, params).then(res => res.data); };

export const dayInfo = params => { return axios.post(`${base}/om/dealPoints/getTodayDealPoints.json`, params).then(res => res.data); };

//export const oceanInfo = params => { return axios.post(`${base2}/front/infoList.json`, params).then(res => res.data); };  //海运
//
//export const daysInfo = params => { return axios.post(`${base2}/front/infoList.json`, params).then(res => res.data); }; //日报

export const userLoad = params => { return axios.get(`${base}/current_user/get.json`, params).then(res => res.data);};   // 登入

export const userLoadInfo = params => { return axios.get(`${base2}/current_user/get.json`, params).then(res => res.data);};   // 资讯登入

export const goodData = params => { return axios.post(`${base}/pallet/findPalletList.json`, params).then(res => res.data);};   // 货盘滚动

export const oceanInfo = params => { return axios.post(`${base2}/front/infoListOS.json`, params).then(res => res.data); };  //海运

export const daysInfo = params => { return axios.post(`${base2}/front/infoListOS.json`, params).then(res => res.data); }; //日报

export const mapgui = params => { return axios.post(`${base}/api/geojson/waypoint.json`, params).then(res => res.data); };

export const columnList = params => { return axios.post(`${base2}/column/columnList.json`, params).then(res => res.data); }; //大咖秀

export const  dingYue = params => { return axios.post(`${base2}/subscribe/subscribeColumn.json`, params).then(res => res.data); }; //订阅专栏

export const  cancle = params => { return axios.post(`${base2}/subscribe/removeSubscribe.json`, params).then(res => res.data); }; //取消关注

export const  ShipPlateDetail = params => { return axios.post(`${base}/shipPlate/findShipPlateDetailByShip.json`, params).then(res => res.data); }; //船盘详情

export const Lloydsfile = params => { return axios.post(`${base}/api/weather/lsRecord.json`, params).then(res => res.data); }; //劳氏档案

export const typhoon = params => { return axios.post(`${base}/api/weather/typhoon.json`, params).then(res => res.data);}; //台风

export const navigationWarning = params => { return axios.post(`${base}/api/weather/navigationWarning.json`, params).then(res => res.data);}; //海盗、航线预警

export const weatherTime = params => { return axios.get(`${base}/api/weather/dateSchedule.json`).then(res => res.data);}; //气象海况气象时间列表
 
export const weatherForecast = params => { return axios.post(`${base}/api/weather/forecast.json`, params).then(res => res.data);}; //三天气象预报接口

 export const homeInfo = params => { return axios.post(`${base}/om/dealPoints/queryDealPoints.json`, params).then(res => res.data);}; //通知信息
 
 export const portWeather = params => { return axios.get(`${base}/api/weather/seaportWeather.json`,{params:params}).then(res => res.data);}; //港口天气
 
 export const myShips = params => { return axios.get(`${base}/api/fleet/queryFleets.json`).then(res => res.data);}; //我的船队
 
