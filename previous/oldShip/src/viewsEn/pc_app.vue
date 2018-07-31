
<template>
	<section>
		<div id="map"></div>
		<!-- <div class="leaflet-bar leaflet-control">
		    <a title="Turn on PolylineMeasure" class="flag-1 polyline-measure-unicode-icon" id="polyline-measure-control">↦</a>
		    <a title="Clear Measurements" class="flag-2 center-a polyline-measure-unicode-icon polyline-measure-clearControl">×</a>
		</div> -->
		<!--船舶详情-->
		<div class="ship-details-wrap">
			<div class="ship-title">
				<span class="f_ship ship-title-span"><i class="fs-ships ship-i"></i></span>
				<span class="name">{{shipMessage.shipName}}</span>
				<a href="javascript:;" class="close sr-close close-1" @click="closeDetail"><i class="fs fs-close"></i></a>
			</div>
			<div class="ship-details">
				<table>
					<tbody>
						<tr>
							<td class="ship-details-td-title">Vessel Type：</td>
							<td class="ship-details-td-content">{{shipMessage.shipType}}</td>
							<td class="ship-details-td-title">Status：</td>
							<td class="ship-details-td-content" :title="shipMessage.shipConditionEn">{{shipMessage.shipConditionEn|truncate(13)}}</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">IMO：</td>
							<td class="ship-details-td-content">{{shipMessage.IMO}}</td>
							<td class="ship-details-td-title">MMSI：</td>
							<td class="ship-details-td-content">{{shipMessage.MMSI}}</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Calling：</td>
							<td class="ship-details-td-content">{{shipMessage.callSign}}</td>
							<td class="ship-details-td-title">Flag：</td>
							<td class="ship-details-td-content">
								<span :title="shipMessage.displayCountryEn">{{shipMessage.displayCountryEn|truncate(13)}}</span>
								<span class="flag-icon" :class="shipMessage.country"></span>
							</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Built：</td>
							<td class="ship-details-td-content">{{shipMessage.Built}}</td>
							<td class="ship-details-td-title">Cubic：</td>
							<td class="ship-details-td-content">{{shipMessage.Cubic}}</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">DWT：</td>
							<td class="ship-details-td-content">{{shipMessage.SDWT | NumFormat}}Mt</td>
							<td class="ship-details-td-title">LOA：</td>
							<td class="ship-details-td-content">{{shipMessage.LOA}}</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Beam：</td>
							<td class="ship-details-td-content">{{shipMessage.Beam}}</td>
							<td class="ship-details-td-title">Hull Type：</td>
							<td class="ship-details-td-content">{{shipMessage.HullType}}</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Latest Update：</td>
							<td class="ship-details-td-content">{{shipMessage.newTime}}</td>
							<td class="ship-details-td-title">Speed：</td>
							<td class="ship-details-td-content">{{shipMessage.shipSpeed}}Knots</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Draft：</td>
							<td class="ship-details-td-content">{{shipMessage.shipWaterline}}m</td>
							<td class="ship-details-td-title">Laden Draft：</td>
							<td class="ship-details-td-content">{{shipMessage.shipFullWaterline}}m</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Loading State：</td>
							<td class="ship-details-td-content">{{shipMessage.loadEn}}</td>
							<td class="ship-details-td-title"></td>
							<td class="ship-details-td-content"></td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Destination：</td>
							<td class="ship-details-td-content" :title="shipMessage.destination">{{shipMessage.destination | truncate(13)}}</td>
							<td class="ship-details-td-title">ETA：</td>
							<td class="ship-details-td-content">{{shipMessage.ETA}}</td>
						</tr>
						<tr>
							<td class="ship-details-td-title">Departure Port：</td>
							<td class="ship-details-td-content">{{shipMessage.shipInitialEn}}</td>
							<td class="ship-details-td-title">Current Zone：</td>
							<td class="ship-details-td-content">{{shipMessage.nowSeaAreaEn}}</td>
						</tr>
					</tbody>
				</table>
				<div class="ship-footer">
					Reminder: Google Chrome Recommended
				</div>
			</div>
		</div>
	</section>
</template>

<script>
    import '../../static/markerclusterer.js'
    export default {
        props: ["ships"],
        data() {
            return {
                url: configURL.shipUrl,
                shipMessage:{},
            };
        },
        methods: {
            closeDetail(){
                $('.ship-details-wrap').hide();
            }
		},
        mounted() {

            var self = this;

            function getHref(key) {
                //获取地址拦？后面的vue值  //  $.getHref('name')
                var str = window.location.href;
                str = str.substring(str.indexOf("?") + 1);
                var end = false;

                var arrHref = str.split("&");
                for (var i = 0; i < arrHref.length; i++) {

                    var chilrenArr = arrHref[i].split("=");
                    if (chilrenArr[0] == key) {
                        end = chilrenArr[1];
                        break;
                    }
                }
                return end;
            }
            
            var map, infowindow;
            var zoomMar = null;
            var routeMarkerArr = [];
            var allShipMarker = [];
            var pathMarker = [];
            var timeLineArr = [];
            var chicago = { lat: 5, lng: 124 };

            //function markerCluster(map,markers){new MarkerClusterer(map, markers)}
            initMap();
            function initMap() {
                //初始化地图
                window.Maps = new google.maps.Map(document.getElementById("map"), {
                    center: chicago,
                    zoom: 3,
                    maxZoom: 12,
                    minZoom: 3,
                    //      mapTypeControl: false,
                    zoomControl: false,
                    scaleControl: true,
                    mapTypeId: "hybrid",
                    streetViewControl: false,
                    fullscreenControl: false,
                    gestureHandling: "greedy",
                    mapTypeControl: false
                });

                window.Mapoptions = new google.maps.Marker();

                // window.Marker = function (lat,lng,Maps,icon,label){
                //     var c = new google.maps.Marker({
                //         position:{lat:lat, lng:lng},
                //         map:Maps,
                //         icon:icon,
                //         label:label,
                //         visible:true
                //     })

                //     a.push(c);
                // }

                window.ShipLine = function Trajectory(Maps, locus, rato) {
                    var symbolEnd12 = {
                        //图标
                        path: "M-6 10L0 -10L6 10z",
                        strokeColor: "#fff",
                        strokeWeight: 1,
                        fillColor: "#fff",
                        fillOpacity: 0,
                        strokeOpacity: 0,
                        scale: 1,
                        rotation: rato
                    };
                    new google.maps.Polyline({
                        map: Maps,
                        strokeColor: "#FF0000",
                        strokeWeight: 2,
                        icons: [
                            {
                                icon: "",
                                offset: "0%"
                            },
                            {
                                icon: symbolArrows,
                                offset: "20px",
                                repeat: "200px"
                            },
                            {
                                icon: symbolEnd12,
                                offset: "100%"
                            }
                        ],
                        path: locus
                    });
                };

                //轨迹起点箭头样式
                var symbolOne = {
                    path:
                        "M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z",
                    strokeWeight: 1,
                    strokeColor: "#00de1a",
                    fillColor: "#00de1a",
                    fillOpacity: 1,
                    scale: 1,
                    rotation: -78
                };

                //轨迹终点箭头样式
                var symbolEnd = {
                    path:
                        "M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z",
                    strokeColor: "#F00",
                    strokeWeight: 2,
                    fillColor: "#F00",
                    fillOpacity: 1,
                    scale: 1,
                    rotation: 0
                };

                //轨迹箭头样式
                var symbolArrows = {
                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                    strokeWeight: 3,
                    strokeColor: "#F00",
                    fillColor: "#eaedec",
                    fillOpacity: 1,
                    scale: 1
                };

                window.symbolCircle = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeWeight: 3,
                    strokeColor: "#F00",
                    fillColor: "#ddd",
                    fillOpacity: 1,
                    scale: 4
                };
                //黄圆
                window.symbolCircleYellow = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeWeight: 3,
                    strokeColor: "#F5FF44",
                    fillColor: "#FFF",
                    fillOpacity: 1,
                    scale: 4
                };
                //红圆

                var type = getHref("type");

                //物流页面调用

                setTimeout(function() {

					var imo = Number(self.ships.mmis); // Number(getHref(type));//获取ims{imo: 308275000, startTime: "2018-03-24", endTime: "2018-03-31"}
					var startTime = self.ships.startTime; //"2018-03-26 20:39"  String类型
					var endTime = self.ships.endTime; //  "2018-03-26 20:39"   String类型
					var imos = self.ships.imo;

					var obj1 = {
						"imo": imos,
						"mmsi": imo,
						"signDate": self.ships.signDate,
					};

					$.ajax({
						url: self.url + "/api/mapVisual/wayPoint.json",
						type: "post",
						data: JSON.stringify(obj1),
						dataType: "json",
						contentType: "application/json",
						success: function(data) {

							if(data.length != 0){

								var locus = data.wayPoints;

								var details = data.ship.features[0].properties;

								self.shipMessage = details.shipMessage;

								var cog = locus[locus.length - 1].cog; //角度

								Maps.setZoom(5); //设置地图层级

								ShipLine(Maps, locus, cog); //划线

								var symbolEnd13 = {
									//图标
									path: "M-6 10L0 -10L6 10z",
									strokeColor: "#fd3c00",
									strokeWeight: 1,
									fillColor: "#00ff60",
									fillOpacity: 1,
									scale: 1,
									rotation: cog
								};

								let startShipMarker = new google.maps.Marker({
									position: { lat: locus[0].lat, lng: locus[0].lng },
									map: Maps,
									icon: "../../static/images/start.png"
								});

								let ShipMarker = new google.maps.Marker({
									position: {
										lat: details.lat,
										lng: details.lng
									},
									map: Maps,
									icon: symbolEnd13
								});

								var imo = obj1.imo;

								ShipMarker.addListener("click", function() {
									$('.ship-details-wrap').show();
									/*window.open(
										configURL.shipUrl + "/page/#/routemap?imo=" + imos + ""
									); //跳转*/
								});

								Maps.setCenter({
									lat: locus[locus.length - 1].lat,
									lng: locus[locus.length - 1].lng
								});

								/*//设置中心
								var markers = []; //点聚焦数组
								var markers1 = []; //文字聚焦数组
								for (var i = 0; i < locus.length; i++) {
									/!*var c = new google.maps.Marker({
										position: { lat: locus[i].lat, lng: locus[i].lng },
										map: Maps,
										icon: symbolCircle
									});

									markers.push(c);
									var text = locus[i].text;
									var marker46 = new google.maps.Marker({
										position: { lat: locus[i].lat, lng: locus[i].lng },
										label: {
											text,
											color: "#000"
										},
										map: Maps,
										icon: {
											path: "M0-0L0-28z",
											fillColor: "#000",
											strokeColor: "#000",
											labelOrigin: new google.maps.Point(50, -63),
											strokeOpacity: 1,
											strokeWeight: 2,
											anchor: new google.maps.Point(0, 0),
											scale: 1
										}
									});
									markers1.push(marker46);*!/
								}
								var markerCluster = new MarkerClusterer(Maps, markers);
								console.log(markerCluster);
								var markerCluster1 = new MarkerClusterer(Maps, markers1);*/
                                zoomMar = locus;
                                zoomTrack();
							}

						}
					});

                }, 3000);
            }
            Maps.addListener('zoom_changed', function () {

                zoomTrack()
            })
            Maps.addListener('dragstart', function () {

                if (zoomMar.length != 0) {

                    if (pathMarker.length != 0) {

                        for (let i = 0; i < pathMarker.length; i++) {

                            pathMarker[i].setMap(null);

                            pathMarker[i].remove && pathMarker[i].remove();

                        }

                    }

                }

            });
            Maps.addListener('dragend', function () {

                zoomTrack();

            });
            //历史轨迹查询
            function zoomTrack() {
                if(zoomMar != null){
                    if (pathMarker.length != 0) {

                        for (let i = 0; i < pathMarker.length; i++) {

                            pathMarker[i].setMap(null);

                            pathMarker[i].remove && pathMarker[i].remove();

                        }

                    }

                    var arr1 = [0, 0, 200, 90, 45, 20, 10, 5, 2, 2, 2, 1, 1];

                    var resArr = zoomMar.filter((e, i) => {
                        return i % arr1[Maps.getZoom()] == 0;
                    });
                    /*var zoom_ = 15 - map.getZoom();
                    counter++;
                    counter %= 5;
                    var resArr = zoomMar.filter((e, i) =>{
                        return i % zoom_ - counter == 0;
                    });*/
                    for (let i = 0; i < resArr.length; i++) {
                        let latLng = new google.maps.LatLng(resArr[i].lat, resArr[i].lng);

                        let text = resArr[i].text;
                        let marker46;
                        //绘制路线点
                        let marker = new google.maps.Marker({
                            position: latLng,
                            map: Maps,
                            icon: symbolCircle,
                            visible: true,
                            data: resArr[i],
                        });

                        routeMarkerArr.push(marker);
                        allShipMarker.push(marker);
                        pathMarker.push(marker);

                        /*!//绘制时间轴
                        marker46 = new google.maps.Marker({
                            position:latLng,
                            label: {
                                text,
                                color: '#00ff51',
                            },
                            map: map,
                            icon: {
                                path: 'M0-0L19-28z',
                                fillColor: '#00ff51',
                                strokeColor: '#00ff48',
                                labelOrigin: new google.maps.Point(75, -35),
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                anchor: new google.maps.Point(0, 0),
                                scale: 1,
                            },
                        });*/
                        marker46 = new WarInfoWindow(latLng, Maps, 'marker-46', {
                            "span1": text,
                            "title1": '',
                        });

                        timeLineArr.push(marker46);

                        pathMarker.push(marker46);

                        /*//鼠标移入
                        marker.addListener('mouseover', function () {
                            if (limitedShipArr.length != 0) {
                                for (let i = 0; i < limitedShipArr.length; i++) {
                                    limitedShipArr[i].setMap(null);
                                }
                                //limitedShipArr.splice(0);
                            }
                            marker.setIcon(symbolCircleYellow);
                            var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lng));
                            if (zoomResultMsg == null) {

                                var trackMarker = new WarInfoWindow(latLng, map, 'track-marker-info', {
                                    "title1": '船名：',
                                    "title2": 'IMO：',
                                    "title3": 'MMSI：',
                                    "title4": '速度：',
                                    "title5": '经度：',
                                    "title6": '纬度：',
                                    "title7": '吃水：',
                                    "title8": '时间：',
                                    "title9": '',
                                    "title10": '',
                                    "title11": '船艏向：',
                                    "title12": '船迹向：',
                                    "span1": this.data.shipName,
                                    "span2": this.data.imo,
                                    "span3": this.data.mmsi,
                                    "span4": this.data.speed + '节',
                                    "span5": lngFormatter(this.data.lng),
                                    "span6": latFormatter(this.data.lat),
                                    "span7": this.data.draught,
                                    "span8": this.data.text,
                                    "span9": '',
                                    "span10": '',
                                    "span11": this.data.heading,
                                    "span12": this.data.cog,
                                });
                                trackMarkerArr.push(trackMarker);
                            } else {
                                var trackMarker = new WarInfoWindow(latLng, map, 'track-marker-info', {
                                    "title1": '船名：',
                                    "title2": 'IMO：',
                                    "title3": 'MMSI：',
                                    "title4": '速度：',
                                    "title5": '经度：',
                                    "title6": '纬度：',
                                    "title7": '吃水：',
                                    "title8": '时间：',
                                    "title9": '风速：',
                                    "title10": '风向：',
                                    "title11": '船艏向：',
                                    "title12": '船迹向：',
                                    "span1": this.data.shipName,
                                    "span2": this.data.imo,
                                    "span3": this.data.mmsi,
                                    "span4": this.data.speed + '节',
                                    "span5": lngFormatter(this.data.lng),
                                    "span6": latFormatter(this.data.lat),
                                    "span7": this.data.draught,
                                    "span8": this.data.text,
                                    "span9": zoomResultMsg[this.data.idx].windSpeed != null?zoomResultMsg[this.data.idx].windSpeed + 'm/s':'',
                                    "span10": zoomResultMsg[this.data.idx].windDirection,
                                    "span11": this.data.heading,
                                    "span12": this.data.cog,
                                });
                                trackMarkerArr.push(trackMarker);
                            }
                        });

                        //鼠标离开
                        marker.addListener('mouseout', function () {
                            marker.setIcon(symbolCircle);
                            if (trackMarkerArr.length != 0) {
                                for (let i = 0; i < trackMarkerArr.length; i++) {
                                    trackMarkerArr[i].setMap(null);
                                }
                            }
                        });*/
                    }
                    ;
                }
            };
            //warInfoWindow海盗军演自定义气泡弹窗
            function WarInfoWindow(latlng, map, className, innerHTML) {
                this.latlng_ = latlng;
                this.className = className;
                this["content"] = innerHTML;
                this.setMap(map);
            }

            WarInfoWindow.prototype = new google.maps.OverlayView();

            WarInfoWindow.prototype.draw = function () {
                var me = this;
                var div = me.div_;
                if (!div) {
                    div = this.div_ = document.createElement('div',);
                    div.className = me.className;
                    var divChild1 = document.createElement('div');
                    divChild1.style.padding = '2px 5px 3px 6px';
                    div.appendChild(divChild1);
                    var lenArr = Object.keys(me["content"]);
                    for (var i = 0; i < lenArr.length / 2; i++) {
                        divChild1.innerHTML += `
                                <div>
                                    <span>${me["content"][`title${i + 1}`] || ''}</span>
                                    <span>${me["content"][`span${i + 1}`] || ''}</span>
                                </div>
                            `;
                    };
                    div.style.cssText = `
                            position:absolute;
                            min-width: 120px;
                            min-height: 20px;
                            background-color: rgba(55, 69, 112, 0.64);
                            border-radius: 3px;
                            font-size: 12px;
                            color: #fff;
                            white-space: nowrap;
                        `;
                    var panes = me.getPanes();
                    panes.overlayImage.appendChild(div);

                }
                var point = this.getProjection().fromLatLngToDivPixel(me.latlng_);
                if (point) {
                    div.style.left = `${point.x + (me.offsetX || 15)}px`;
                    div.style.top = `${point.y - (me.offsetY || 25)}px`;
                }
            };

            WarInfoWindow.prototype.remove = function () {
                if (this.div_) {
                    this.div_.parentNode.removeChild(this.div_);
                    this.div_ = null;
                    this.setMap(null);
                }
            };

            WarInfoWindow.prototype.getPosition = function () {
                return this.latlng_;
            };

            window.addZoom = function() {
                //enlarge放大地图

                var num = Maps.getZoom();
                ++num;
                Maps.setZoom(num);
            };
            window.narrowZoom = function() {
                //减小地图
                var num = Maps.getZoom();
                --num;
                Maps.setZoom(num);
            };
            window.satellite = function() {
                //卫星图
                Maps.setMapTypeId("satellite");
                Maps.setMapTypeId("hybrid");
            };
            window.roadmap = function() {
                //正常地图
                Maps.setMapTypeId("roadmap");
            };
            window.Location = function(lat, lng) {
                //定位
                Maps.setCenter({ lat: lat, lng: lng });
            };

            var symbolEnd1 = {
                //港口图标
                path:
                    "M989.9,339.9L886.6,441.4l21.6,19c9.7,9.3,1.7,21.9,1.6,35c-0.5,71.3-127.9,265.9-358.1,282.8V444.4H752V329.3H551.8V299c56.8-22.2,93-72.8,93-131.7c0-79.5-61.1-143.9-140.5-143.9c-79.5,0-149.6,64.4-149.6,143.9c0,59,52.2,109.5,80.6,131.7v30.3H234.9v115.1h200.2v333.9C234.9,761.4,90.8,566.8,90.3,495.5c-0.1-13.2,1.4-25.8,11.1-35l21.8-19L10.1,339.9C4.6,777.2,350,886.3,435.1,909.6l0,0l0,0l72.4,67l71.9-71.9l0,0C694.5,881.3,995.4,777.2,989.9,339.9z M507.5,109.7c31.8,0,57.5,25.8,57.5,57.5c0,31.8-25.8,57.5-57.5,57.5c-31.8,0-57.5-25.8-57.5-57.5C449.9,135.5,475.7,109.7,507.5,109.7z",
                strokeColor: "#000",
                strokeWeight: 1,
                fillColor: "#F00",
                fillOpacity: 0.3,
                scale: 0.02,
                rotation: 0
            };

            var rect = {
                path: "M19-28L69-28z",
                strokeColor: "#000",
                strokeWeight: 1,
                fillColor: "#000",
                fillOpacity: 0.7,
                scale: 0.6,
                rotation: 0
            };
            //
        }
    };
</script>

<style scoped>
	html,
	body {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}

	#map {
		height: 100vh;
		width: 100%;
	}

	.ssss {
		background-color: red;
		width: 1em;
		height: 1em;
		margin-bottom: 10px;
	}

	.ship-details-wrap{
		position: absolute;
		top: 10%;
		left: 2%;
		z-index: 1000;
		width: 33%;
		min-height: 38%;
		background-color: rgba(33, 33, 33, 0.81);
		box-shadow: 10px 20px 20px 0 rgba(0,0,0,0.50);
		border-radius: 2px;
		color: #FFFFFF;
		white-space: nowrap;
	}
	.ship-i{
		color: #EE6723;
		font-size: 18px;
	}
	.ship-title{
		border-bottom: 1px solid rgba(255,255,255,.16);
	}
	.ship-title-span{
		display: inline-block;
		vertical-align: middle;
		margin: 10px 5px 10px 10px;
	}
	.close-1{
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.close-1 i{
		color: #fff;
	}
	.ship-details{
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 10px;
	}
	.ship-details table{
		width: 100%;
	}
	.ship-details table tr{
		width: 100%;
		line-height: 25px;
	}
	.ship-details-td-title{
		text-align: right;
		color: rgba(255, 255, 255, 0.67);
	}
	.ship-details-td-content{

	}
	.ship-footer{
		box-sizing: border-box;
		width: 100%;
		font-size: 11px;
		line-height: 12px;
		text-align: center;
		padding: 10px;
		color: rgba(255,255,255,.16);
	}
</style>
