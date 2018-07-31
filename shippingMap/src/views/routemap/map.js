import {
  rectangle// 可是区域船只
  // shipLine, // 轨迹
  // shipinfo // 轨迹信息
} from '@/api/routemap'
// import _ from 'lodash'
import store from '@/store'
import config from '@/config'
import somaliaPirates from '@/lib/routemapData/somaliaPirates'
const L = window.L
let LazyArr = []
let piratesPoint = []
const militaryArea = []
const currents = []
const historyMarker = []
const historyLine = []
const cirle = []
const lineSpeedMarkers = []
const Map = {
  mapView: null,
  initShip: true, // 初始化地图
  ShipHistory: false,
  historyMarkerBlean: true, // 航线缩放
  shipPlateN: [],
  shipPlateY: [],
  portLists: [],
  /**
   * [initMap description]
   * @method 初始化地图
   * @param  {[type]} mapId  id
   * @param  {[type]} aption [description]
   * @return {[type]}        [description]
   */
  initMap(mapId, aption) {
    const osmUrl = config.mapTitlePath + '/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga'
    const landUrl = config.mapTitlePath + '/vt/lyrs=s@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga'
    const sea = 'http://m12.shipxy.com/tile.c?l=Na&m=o&x={x}&y={y}&z={z}'
    this.mapView = L.map(mapId, {
      center: [33.3231029267, 121.3725827950],
      zoom: 2,
      minZoom: 2,
      maxZoom: 12,
      zoomControl: false,
      // renderer: L.canvas(),
      maxBounds: [[180, -180], [-180, 180]],
      ...aption
    })
    L.tileLayer('http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga', { attribution: '' }).addTo(this.mapView)
    const osmMap = L.tileLayer(osmUrl)
    const landMap = L.tileLayer(landUrl)
    const seaMap = L.tileLayer(sea)
    const baseLayers = {
      '谷歌路线图': osmMap,
      '谷歌卫星图': landMap,
      '海图': seaMap
    }
    L.control.layers(baseLayers).addTo(this.mapView)
    this.mapView.on('resize', () => {
      this.mapView.invalidateSize()
    })
    const zoomControl = L.control.zoom({ position: 'bottomright' })
    this.mapView.addControl(zoomControl)
    const osm2 = new L.TileLayer(osmUrl, { minZoom: 0, maxZoom: 13 })
    new L.Control.MiniMap(osm2, { toggleDisplay: true, minimized: false }).addTo(this.mapView)

    // 索马里海盗区域
    const triangleCoords = somaliaPirates.data.triangleCoords
    const latlngs = []
    triangleCoords.map((value) => {
      const flagArr = []
      flagArr.push(value.lat)
      flagArr.push(value.lng)
      latlngs.push(flagArr)
    })
    const polygon = L.polygon(latlngs, { color: 'red', weight: '1' }).addTo(this.mapView)
    const html = '<div>索马里海盗高风险区</div>'
    polygon.bindPopup(html, { className: 'pirates-Somalia' })
  },
  /**
   * [removeMarker description]
   * @method removeMarker  canvas层marker清除
   * @param  {[type]}     ciLayer [description]
   * @param  {[type]}     markers [description]
   * @return {[type]}             [description]
   */
  // removeMarker(ciLayer, markers) {
  //   this.mapView.removeLayer(ciLayer)
  // },

  initial() {
    this.initCirleMarker(this.shipPlateN, '#29F92F')
    this.initCirleMarker(this.shipPlateY, '#ffee35')
    // this.initPort(ports)
    let flag = false
    this.mapView.on('dragend', (e) => {
      if (Map.initShip) {
        if (e.target.getZoom() >= 7) {
          // Map.removelazyShip()
          this.LazyLoadShip(this.shipDetailDliago)
        }
      }
    })
    this.mapView.on('zoomend', (e) => {
      if (this.initShip) {
        if (e.target.getZoom() >= 7) {
          flag = true
          // this.ciLayer.clearLayers()
          this.removeCirleMarker()
          this.LazyLoadShip(this.shipDetailDliago)
        } else {
          if (flag) {
            flag = false
            this.initCirleMarker(this.shipPlateN, '#29F92F')
            this.initCirleMarker(this.shipPlateY, '#ffee35')
            this.removelazyShip()
          }
        }
      }
    })
  },
  initPort() {
    const port = L.icon({
      iconUrl: config.staticImagesPath + '/images/port.png',
      iconSize: [20, 25],
      iconAnchor: [10, 9]
    })
    this.portLists.map((item, index) => {
      const marker = L.marker([item.lat, item.lng || item.log], {
        icon: port
      }).addTo(Map.mapView)
      marker.bindTooltip(`港口名:${item.nameCn}`)
    })
  },
  /**
   * [LazyLoadShip description]
   * @method LazyLoadShip 船懒加载
   * @param  {Function}   callback [description] 回调
   */
  LazyLoadShip(callback) {
    const obj = {
      'lat_n': this.mapView.getBounds()._northEast.lat,
      'lat_s': this.mapView.getBounds()._southWest.lat,
      'lon_e': this.mapView.getBounds()._northEast.lng,
      'lon_w': this.mapView.getBounds()._southWest.lng,
      'type': ''
    }
    rectangle(obj).then(response => {
      if (LazyArr.length > 0) {
        this.removelazyShip()
      }
      this.initMarkerShip(response.data.datas, callback)
    })
    // .catch(error => {})
  },
  initCirleMarker(arrDate, color) {
    arrDate.map((item, index) => {
      if (item.lat !== null) {
        const cirleMarker = L.circleMarker(L.latLng(item.lat, item.lng || item.log), {
          radius: 4,
          color: color,
          stroke: true,
          opacity: 0.7,
          weight: 2,
          fillColor: color,
          fillOpacity: 1
        }).addTo(this.mapView)
        cirle.push(cirleMarker)
      }
    })
  },
  removeCirleMarker() {
    const myGroup = L.layerGroup(cirle)
    this.mapView.addLayer(myGroup)
    myGroup.clearLayers()
    cirle.length = 0
  },
  initMarkerShip(arrDate, callback) {
    const newArr = []
    arrDate.map((item, index) => {
      let styles = ''
      if (item.isShipPlate === '0') {
        if (item.loadEn === 'Full-laden') {
          styles = `Full-laden`
        } else {
          styles = `Full-ladenN`
        }
      } else {
        if (item.loadEn === 'Full-laden') {
          styles = `Null-laden`
        } else {
          styles = `Null-ladenN`
        }
      }
      const headding = item.heading || 0
      // console.log(item.heading, index, 'rotate')
      const mark = L.marker([item.lat, item.lng], {
        icon: L.divIcon({
          'className': styles,
          // html: '<div style="background:red;width:10px;height:10px" ></div>'
          html: '<svg viewBox="-15 -15 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top:-8px; margin-left:-8px" width="28px" height="28px" ><path transform="rotate(' + headding + ')"  d="M-6 10L0 -10L6 10z" /></svg>'
        })
      }).addTo(this.mapView)
      var html = `<div class='bindTooltipHtml'><p>lat:${item.lat}</p><p>lng:${item.lng}</p></div>`
      mark.bindTooltip(html, { direction: 'right' })
      newArr.push(mark)
      // LazyArr.push(mark)
      mark.on({
        'click': (e) => {
          this.removeCurrentMarker()
          this.shipDetailImo = item.imo
          this.shipDetail(this.shipDetailImo)
          // store.dispatch('setImo', item.imo)
          this.addCurrentMarker(item.lat, item.lng, item.heading)
        }
        // 'mouseover': function(e) {
        //   mark._icon.childNodes[0].childNodes[0].style.stroke = '#af0636'
        // },
        // 'mouseout': function(e) {
        //   mark._icon.childNodes[0].childNodes[0].style.stroke = '#27af06'
        // }
      })
    })
    LazyArr = newArr
  },
  /**
   * [removelazyShip description]
   * @method removelazyShip 清除懒加载船只
   * @return {[type]}       [description]
   */
  removelazyShip() {
    const myGroup = L.layerGroup(LazyArr)
    this.mapView.addLayer(myGroup)
    myGroup.clearLayers()
    LazyArr.length = 0
  },
  /**
   * [addCurrentMarker description]
   * @method addCurrentMarker 当前选中船只
   * @param  {[type]}         lat   [description]
   * @param  {[type]}         lng   [description]
   * @param  {[type]}         marks [description]
   */
  addCurrentMarker(lat, lng, marks) {
    if (marks === undefined) {
      marks = 0
    }
    const styles = `stroke-width: 5;stroke:#ff5c00;fill: transparent;fill-opacity: 1;scale:0.22;`
    const currentMark = L.marker([lat, lng], {
      icon: L.divIcon({
        'className': 'cuurent-div-icon',
        // html: '<div style="background:red;width:10px;height:10px" ></div>'
        html: '<svg viewBox="-2 -2 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top:-17px; margin-left:-17px" width="48px" height="48px" ><path  style=" ' + styles + ' " d="M0 35L0 0L35 0 M61 0L96 0L96 35 M96 61L96 96L61 96 M35 96L0 96L0 61" /></svg>'
      })
    }).addTo(this.mapView)
    const styleship = `fill:transparent;stroke:#ff5c00;stroke-width:2;`
    const currentship = L.marker([lat, lng], {
      icon: L.divIcon({
        'className': 'cuurent-div-icon',
        // html: '<div style="background:red;width:10px;height:10px" ></div>'
        html: '<svg viewBox="-15 -15 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" transform="rotate(' + marks + ')" style="margin-top:-8px; margin-left:-8px" width="28px" height="28px" ><path  style=" ' + styleship + ' " d="M-6 10L0 -10L6 10z" /></svg>'
      })
    }).addTo(this.mapView)
    currents.push(currentship)
    currents.push(currentMark)
  },
  // removeMap(arr) {
  //   const myGroup = L.layerGroup(arr)
  //   this.mapView.addLayer(myGroup)
  //   myGroup.clearLayers()
  //   arr.length = 0
  // },
  /**
   * [removeCurrentMarker description]
   * @method removeCurrentMarker 清除当前船只
   * @return {[type]}            [description]
   */
  removeCurrentMarker() {
    const myGroup = L.layerGroup(currents)
    this.mapView.addLayer(myGroup)
    myGroup.clearLayers()
    currents.length = 0
  },

  /**
   * [addShipline description]
   * @method addShipline 历史轨迹
   * @param  {[type]}    imo       [description]
   * @param  {[type]}    startTime [description]
   * @param  {[type]}    endTime   [description]
   */
  addShipline(path) {
    this.initShip = false
    this.ShipHistory = true
    this.removelazyShip()
    this.removeCurrentMarker()
    // let infoArray = []
    this.ShipHistoryline(path)
    const num = this.mapView.getZoom()
    const start = L.icon({
      iconUrl: config.staticImagesPath + '/images/startIcon.png',
      iconSize: [20, 25],
      iconAnchor: [10, 9]
    })
    const startIcon = L.marker(L.latLng(path[0].lat, path[0].lng), {
      icon: start
    }).addTo(this.mapView)
    const styles = `fill:#0ea406;stroke:#0ea406;stroke-width:2;`
    const endtIcon = L.marker(L.latLng(path[path.length - 1].lat, path[path.length - 1].lng), {
      icon: L.divIcon({
        'className': 'ship-div-icon',
        // html: '<div style="background:red;width:10px;height:10px" ></div>'
        html: '<svg viewBox="-15 -15 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top:-8px; margin-left:-8px" width="28px" height="28px" ><path transform="rotate(' + path[path.length - 1].heading + ')" style=' + styles + ' d="M-6 10L0 -10L6 10z" /></svg>'
      })
    }).addTo(this.mapView)
    historyLine.push(startIcon)
    historyLine.push(endtIcon)
    this.ShipHistoryMarker(this.fillterlat(this.mapView, path, num))
    this.mapView.on('zoomend', (e) => {
      const zoomNumber = e.target.getZoom()
      this.removeShipHistoryMarker()
      if (this.historyMarkerBlean) {
        this.ShipHistoryMarker(this.fillterlat(this.mapView, path, zoomNumber))
      }
    })
    this.mapView.on('dragend', (e) => {
      const zoomNumber1 = this.mapView.getZoom()
      this.removeShipHistoryMarker()
      if (this.historyMarkerBlean) {
        this.ShipHistoryMarker(this.fillterlat(this.mapView, path, zoomNumber1))
      }
    })
  },

  /**
   * [ShipHistoryMarker description]
   * @method ShipHistoryMarker 动态加载marker
   * @param  {[type]}          path [description]数据
   */
  ShipHistoryMarker(path) {
    path.map(item => {
      // L.circleMarker(new L.LatLng(item.lat, item.lng), 10).addTo(this.mapView)
      const mark = L.marker(L.latLng(item.lat, item.lng), {
        icon: L.divIcon({
          'className': 'div-line',
          // html: '<div style="background:red;width:10px;height:10px" ></div>'
          html: '<div class="pointText">' + item.text + '</div><svg viewBox="-15 -15 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" style="margin-top:-8px; margin-left:-8px" width="28px" height="28px" ><circle cx="0" cy="0" r="5" stroke="red"stroke-width="2" fill="#fff"/></svg>'
        })
      }).addTo(this.mapView)
      historyMarker.push(mark)
    })
    // this.mapView.fitBounds(polyline.getBounds())
  },
  /**
   * [ShipHistoryline description]
   * @method ShipHistoryline 历史轨迹线
   * @param  {[type]}        path [description]数据
   */
  ShipHistoryline(path) {
    const path1 = []
    path.map(item => {
      const c = L.latLng(item.lat, item.lng)
      path1.push(c)
    })
    const polyline = L.polyline(path1, { color: 'red' }).addTo(this.mapView)
    const arrow = L.polylineDecorator(path1, {
      patterns: [
        { offset: 50, repeat: 300, symbol: L.Symbol.arrowHead({ pixelSize: 15, pathOptions: { color: 'red', fillOpacity: 1, weight: 0 }}) }
      ]
    }).addTo(this.mapView)
    historyLine.push(polyline)
    historyLine.push(arrow)
    this.mapView.fitBounds(polyline.getBounds())
  },
  /**
   * [removeShipHistoryMarker description]
   * @method removeShipHistoryMarker 清除历史轨迹线
   * @return {[type]}                [description]
   */
  removeShipHistoryMarker() {
    const myGroup = L.layerGroup(historyMarker)
    this.mapView.addLayer(myGroup)
    myGroup.clearLayers()
    historyMarker.length = 0
  },
  /**
   * [removeShipHistoryLine description]
   * @method removeShipHistoryLine 清除历史轨迹点
   * @return {[type]}              [description]
   */
  removeShipHistoryLine() {
    const myGroup = L.layerGroup(historyLine)
    this.mapView.addLayer(myGroup)
    myGroup.clearLayers()
    historyLine.length = 0
  },

  /**
   * [fillterlat description]
   * @method fillterlat 过滤marker点
   * @param  {[type]}   mapView     [map对象]
   * @param  {[type]}   arr         [数据]
   * @param  {[type]}   leval       [缩放等级]
   * @param  {Array}    [filter=[0, 0,            200, 90, 45, 20, 10, 5, 2, 2, 2, 1, 1]] [过滤规则]
   * @return {[type]}               [description]
   */
  fillterlat(mapView, arr, leval, filter = [0, 0, 200, 90, 45, 20, 10, 5, 2, 2, 2, 1, 1]) {
    return arr.filter((e, i) => {
      return leval ? i % filter[leval] === 0 && mapView.getBounds().contains(L.latLng(e.lat, e.lng)) : mapView.getBounds().contains(L.latLng(e.lat, e.lng))
    })
  },

  /**
   * [lineSpeedMarkers description]
   * @method lineSpeedMarkers 航速航速添加港口图标
   * @param  {[type]}         path [description]
   * @return {[type]}              [description]
   */
  lineSpeedMarkers(path, flag) {
    const port = L.icon({
      iconUrl: config.staticImagesPath + '/images/port.png',
      iconSize: [20, 25],
      iconAnchor: [10, 9]
    })
    let latlngs = {}
    path.map(item => {
      if (item.lon) {
        latlngs = L.latLng(item.lat, item.lon)
      } else {
        latlngs = L.latLng(item.lat, item.lng)
      }
      const marker = L.marker(latlngs, {
        icon: port
      }).addTo(this.mapView)
      if (flag) {
        var html = `<div class='bindTooltipHtml'><p>${item.nameCn}</p><p>${item.time}</p></div>`
        const popuops = L.popup({ 'autoClose': false, 'closeOnClick': false, 'closeButton': false }).setLatLng(latlngs).setContent(html).openOn(this.mapView)
        lineSpeedMarkers.push(popuops)
      }
      lineSpeedMarkers.push(marker)
    })
  },

  /**
   * [removeLineSpeedMarkers description]
   * @method removeLineSpeedMarkers 航速航线图标移除
   * @return {[type]}               [description]
   */
  removeLineSpeedMarkers() {
    const myGroup = L.layerGroup(lineSpeedMarkers)
    this.mapView.addLayer(myGroup)
    myGroup.clearLayers()
    lineSpeedMarkers.length = 0
  },

  /**
   * [removeLineSpeedMarkers description]
   * @method piratesDrills 海盗军演点
   * @return {[type]}               [description]
   */
  // 军演区域
  piratesDrills(data, key) {
    const point = []
    const area = []
    const navigationWarning = data.navigationWarning
    const pirate = data.pirate
    if (navigationWarning.length > 0) {
      var myIcon = L.icon({
        iconUrl: config.iconsSvg + '/military exercise.png',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
      navigationWarning.map(value => {
        const marker = L.marker([value.center.lat, value.center.lng], { icon: myIcon }).addTo(this.mapView)
        var html = '<div class="bindTooltipHtml">' + value.name + '</div>'
        marker.bindTooltip(html, { className: 'pirates-drills', direction: 'right', opacity: '0.7' })
        const polygonData = []
        var bound = value.bound
        bound.map(item => {
          polygonData.push([item.lat, item.lng])
        })
        point.push(marker)
        area.push(polygonData)
      })
    }
    if (pirate.length > 0) {
      pirate.map(value => {
        const myIcon = L.icon({
          iconUrl: config.iconsSvg + '/' + value.type + '.png',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        })
        const marker = L.marker([value.lat, value.lng], { icon: myIcon }).addTo(this.mapView)
        const html = '<div class="bindTooltipHtml">' +
        '<div class="type">类型:' + value.typeCn + '</div>' +
        '<div class="lng">经度:' + value.lng + '</div>' +
        '<div class="lat">纬度:' + value.lat + '</div>' +
        '<div class="time">时间:' + value.date + '</div>' + '</div>'
        marker.bindTooltip(html, { className: 'pirates-drills', direction: 'right', opacity: '0.7' })
        point.push(marker)
      })
    }
    let switchFlag = true
    this.mapView.on('zoomend', (e) => {
      if (e.target.getZoom() >= 7) {
        if (switchFlag) {
          area.map(value => {
            const polygon = L.polygon(value, { color: 'red', weight: '1' }).addTo(this.mapView)
            militaryArea.push(polygon)
          })
        }
        switchFlag = false
      }
    })
    if (key === 1) {
      this.removeMap(piratesPoint)
      this.removeMap(militaryArea)
    }
    piratesPoint = point
  },
  removeMap(arr) {
    const myGroup = L.layerGroup(arr)
    this.mapView.addLayer(myGroup)
    myGroup.clearLayers()
    arr.length = 0
  },
  shipDetail(imo) {
    store.dispatch('setImo', imo)
  }
}

export default Map

// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import XYZSource from 'ol/source/XYZ';
//
// const olMap = {
// 	mapView: null,
// 	initMap(mapId) {
// 		this.mapView = new Map({
// 		  target: mapId,
// 		  layers: [
// 		    new TileLayer({
// 		      source: new XYZSource({
// 		        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
// 		      })
// 		    })
// 		  ],
// 		  view: new View({
// 		    center: [0, 0],
// 		    zoom: 2
// 		  })
// 		});
// 		navigator.geolocation.getCurrentPosition(function(pos) {
// 		  const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
// 		  this.mapView.getView().animate({center: coords, zoom: 10});
// 		});
// 	}
// }
// export default olMap
