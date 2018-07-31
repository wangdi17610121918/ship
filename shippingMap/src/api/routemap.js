import request from '@/utils/request'

/**
 *初始化数据
 *
 * @export
 * @param {*} name
 * @returns
 */
export function allbackNew(name) {
  return request({
    url: '/api/mapVisual/indexInitialize.json',
    method: 'post',
    data: {
      portShow: 'Y',
      shipType: ['VLCC', 'ULCC']
    }
  })
}
/**
 *
 *地图可视区域船只
 * @export
 * @param {
 *  lat_n
 *  lat_s
 *  lon_e
 *  lon_w
 * } data
 * @returns
 */
export function rectangle(data) {
  return request({
    url: 'api/mapVisual/shipRectangle.json',
    method: 'post',
    data
  })
}
/**
 *船详细信息查询
 *
 * @export
 * @param {*
 * imo:imo
 * } data
 * @returns
 */
export function vessel(data) {
  return request({
    url: 'api/geojson/vessel.json',
    method: 'post',
    data
  })
}
/**
 * 搜索排名
 * @param {*}name
 */
export function searchHistory(name) {
  return request({
    url: 'api/searchHistory/searchHistory.json',
    method: 'post'
  })
}

/**
 * 船只模糊搜索
 * @param {*
 * input输入的值
 * }data
 */
export function fuzzySearch(data) {
  return request({
    url: 'sysShip/findSysShipByKeyword.json',
    method: 'post',
    data
  })
}

/**
* 搜索排名
* @param {*
* matchkey
* imo
* }data
*/
export function findShip(data) {
  return request({
    url: 'api/searchHistory/findShip.json',
    method: 'post',
    data
  })
}

/**
* 轨迹查询
* @param {*
* endTime 结束时间
* imo
* startTime 开始时间
* }data
*/
export function shipLine(data) {
  return request({
    url: 'api/geojson/waypointnewUUID.json',
    method: 'post',
    data
  })
}

/**
 * [shipinfo description]
 * @method shipinfo 轨迹查询信息
 * @param  {[type]} data [uuid]
 * @return {[type]}      [description]
 */
export function shipinfo(uuid) {
  return request({
    url: 'api/geojson/waypointDetails.json',
    method: 'get',
    params: { uuid }
  })
}

/**
 * [reachPortSearch description]
 * @method reachPortSearch 靠港查询
 * @param  {[type]}        开始时间 [startTime]
 * @param  {[type]}       结束时间 [endTime]
 * @param  {[type]}        imo [imo]
 * @param  {[type]}        data [pageIndex]
 * @param  {[type]}        data [pageSize]
 * @return {[type]}             [description]
 */
export function reachPortSearch(data) {
  return request({
    url: 'api/appjson/history.json',
    method: 'post',
    data
  })
}
/**
 * [lsRecord description]
 * @method lsRecord 劳氏档案
 * @param  {[type]} data [description]
 * @return {[type]}  imo    [description]
 * @return {[type]}  mmsi    [description]
 */
export function lsRecord(data) {
  return request({
    url: 'api/weather/lsRecord.json',
    method: 'post',
    data
  })
}

/**
 * [port description]
 * @method port 港口初始化列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function port(name) {
  return request({
    url: 'api/mapVisual/ports.json',
    method: 'get'
  })
}
/**
 * [plan description]
 * @method plan 航速航线
 * @param  {[type]} fromPortStartTime [开始港口时间]
 * @param  {[type]} route [description]
 * @param  {[type]} sizeType [船型]
 * @param  {[type]} speed [航速]
 * @param  {[type]} timeZone [时区]
 * @return {[type]}      [description]
 */
export function plan(data) {
  return request({
    url: 'api/geojson/plan.json',
    method: 'post',
    data
  })
}
/**
 * [port description]
 * @method navigationWarning 海盗军演
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function navigationWarning(data) {
  return request({
    url: 'api/weather/navigationWarning.json',
    method: 'post',
    data
  })
}
/**
 * [port description]
 * @method queryFleets 我的船队
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function queryFleets(data) {
  return request({
    url: 'api/fleet/queryFleets.json',
    method: 'post',
    data
  })
}
/**
 * [port description]
 * @method unfollowFleet 取消关注船队
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function unfollowFleet(data) {
  return request({
    url: 'api/fleet/unfollowFleet.json',
    method: 'post',
    data
  })
}
/**
 * [port description]
 * @method historyport 查询历史航线
 * @param  {[type]} data [请求数据]
 * @return {[type]}
 */
export function historyport(data) {
  return request({
    url: 'api/geojson/historyport.json',
    method: 'post',
    data
  })
}
/**
 * [port description]
 * @method ports 获取发货港口
 * @param  {[type]} data [请求数据]
 * @return {[type]}
 */
export function ports(data) {
  return request({
    url: 'api/foreign/ports.json',
    method: 'post',
    data
  })
}
/**
 * [port description]
 * @method chinaPorts 获取到货港口
 * @param  {[type]} data [请求数据]
 * @return {[type]}
 */
export function chinaPorts() {
  return request({
    url: 'api/chinaPorts.json',
    method: 'get'
  })
}
