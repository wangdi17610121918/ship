<template>
	<section>
		<div id="map"></div>
		<!-- <div class="leaflet-bar leaflet-control">
		    <a title="Turn on PolylineMeasure" class="flag-1 polyline-measure-unicode-icon" id="polyline-measure-control">↦</a>
		    <a title="Clear Measurements" class="flag-2 center-a polyline-measure-unicode-icon polyline-measure-clearControl">×</a>
		</div> -->

	</section>
</template>

<script>
    export default{

        props:['ships'],
        data(){
            return{
                url: configURL.shipUrl,
            }
        },
        methods:{

        },
        init(){
//			var script = document.createElement('script');
//			script.type = 'text/jacascript';
//			script.src = "http://maps.google.cn/maps/api/js?v=3.exp&region=cn&language=zh-CN&key=AIzaSyBeovhzBxHuGP_lijmkKhb0kqTQZJLlWlY";     //填自己的js路径
//			script.async = true;
//			script.defer = true;
//			$('head').append(script);
        },
        mounted(){

            var self =this;
            function getHref(key) { //获取地址拦？后面的vue值  //  $.getHref('name')
                var str = window.location.href;
                str = str.substring(str.indexOf('?') + 1);
                var end = false;

                var arrHref = str.split('&');
                for(var i = 0; i < arrHref.length; i++) {
                    var chilrenArr = arrHref[i].split('=');
                    if(chilrenArr[0] == key) {
                        end = chilrenArr[1];
                        break;
                    }
                }
                return end;
            }
            var map, infowindow;
            var chicago = {lat: 5, lng: 124};
            initMap();
            function initMap(){//初始化地图
                window.Maps = new google.maps.Map(document.getElementById('map'), {
                    center: chicago,
                    zoom: 3,
                    mapTypeControl: false,
                    zoomControl: false,
                    scaleControl: true,
                    streetViewControl: false,
                    fullscreenControl: false,
                    gestureHandling: 'greedy',
                });
                // Marker(20,10,Map,symbolEnd,'2222')

                window.Marker = function Marker(lat,lng,Maps,icon,label){
                    new google.maps.Marker({
                        position:{lat:lat, lng:lng},
                        map:Maps,
                        icon:icon,
                        label:label
                    })

                }
                window.ShipLine = function Trajectory(Maps,locus){
                    new google.maps.Polyline({
                        map: Maps,
                        strokeColor: '#FF0000',
                        strokeWeight: 2,
                        icons: [
                            {
                                icon: symbolOne,
                                offset: '0%',
                            },
                            {
                                icon: symbolArrows,
                                offset: '20px',
                                repeat: '200px',
                            },
                            {
                                icon: symbolEnd,
                                offset: '100%',
                            },
                        ],
                        path: locus,

                    });
                }
                //轨迹起点箭头样式
                var symbolOne = {
                    path: 'M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z',
                    strokeWeight: 1,
                    strokeColor: '#00de1a',
                    fillColor: '#00de1a',
                    fillOpacity: 1,
                    scale: 1,
                    rotation:-78,
                };
                //轨迹终点箭头样式
                var symbolEnd = {
                    path: 'M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z',
                    strokeColor: '#F00',
                    strokeWeight: 2,
                    fillColor: '#F00',
                    fillOpacity: 1,
                    scale: 1,
                    rotation:0,
                };
                //轨迹箭头样式
                var symbolArrows = {
                    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                    strokeWeight: 3,
                    strokeColor: '#F00',
                    fillColor: '#eaedec',
                    fillOpacity: 1,
                    scale: 1,
                };
                window.symbolCircle = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeWeight: 3,
                    strokeColor: '#F00',
                    fillColor: '#ddd',
                    fillOpacity: 1,
                    scale: 4,
                };
                //黄圆
                window.symbolCircleYellow = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeWeight: 3,
                    strokeColor: '#F5FF44',
                    fillColor: '#FFF',
                    fillOpacity: 1,
                    scale: 4,
                };
                //红圆

                var type =  getHref('type')




                if(type == '1'){//船
                    var imo = Number(getHref('imo'));//获取imo  getHref(imo)
                    var gt = getHref('_gt');
                    //var obj = {imo:imo}
                    $.ajax({
                        url: self.url + '/api/appjson/ship.json?imo='+imo+'&oauth_token='+gt+'',
//              beforeSend: function(xhr) {
//                xhr.setRequestHeader("_gt",gt);
//           },
                        success:function(data){
                            console.log(data)
                            var hog = Number(data.datas.data[0].hog);
                            var lat =Number(data.datas.data[0].lat)
                            var lng =Number(data.datas.data[0].lon)
                            var symbolEnd2 = {//轮船图标
                                path:'M-6 10L0 -10L6 10z',
                                strokeColor: '#000',
                                strokeWeight: 1,
                                fillColor: '#F00',
                                fillOpacity: 0.3,
                                scale:1.1,
                                rotation:hog,

                            };
                            Marker(lat,lng,Maps,symbolEnd2);
                            //console.log(Maps)
                            Maps.setCenter({lat:lat,lng:lng});
//              Map.getZoom(5)
                        }
                    })

                }else if(type == '2'){//港口查询
                    var portName = decodeURIComponent(getHref('portName'));// )'大连'
                    var deadWeight = getHref('deadWeight');//"1"
                    var endTime =  getHref('endTime')//毫秒1520812800000
                    var type =getHref('vesselType')//船名'Suezmax '
                    var gt = getHref('_gt');
                    var  naviStatus = getHref('naviStatus');
                    var obj = {
                        portName:portName,
                        deadWeight:deadWeight,
                        endTime:endTime,
                        type:type,
                        naviStatus:naviStatus
                    }
                    $.ajax({
                        url:self.url + '/api/appjson/location.json?oauth_token='+gt+'',
                        type: "POST",
//             beforeSend: function(xhr) {
//                   xhr.setRequestHeader("_gt",gt);
//              },
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType:"application/json",
                        success:function(data){
                            console.log(data)
                            var portName =  data.datas.html//港口坐标
                            var locus = data.datas.data//船只坐标
                            Marker(portName.lat,portName.lon,Maps,symbolEnd);//港口
                            // Marker(portName.lat,portName.lon,Maps,symbolCircle);//港口
                            Maps.setCenter({lat:portName.lat,lng:portName.lon});
                            for(var i = 0; i < locus.length; i++) {//船只
                                var symbolEnd2 = {//轮船图标
                                    path:'M-6 10L0 -10L6 10z',
                                    strokeColor: '#000',
                                    strokeWeight: 1,
                                    fillColor: '#F00',
                                    fillOpacity: 0.3,
                                    scale:1.1,
                                    rotation:locus[i].heading,

                                };
                                Marker(locus[i].lat,locus[i].lon,Maps,symbolEnd2);
                            }
                        }
                    })


                }else if(type == '3'){//轨迹
                    var imo =Number(getHref('imo'));  // Number(getHref(type));//获取ims
                    var startTime =decodeURIComponent(getHref('startTime'))//"2018-03-26 20:39"  String类型
                    var endTime = decodeURIComponent(getHref('endTime'))//  "2018-03-26 20:39"   String类型
                    var gt = getHref('_gt');
                    var obj = {
                        "imo":imo,
                        "startTime":startTime,
                        "endTime":endTime,
                    }
                    $.ajax({
                        url: self.url + '/api/geojson/waypoint.json?&oauth_token='+gt+'',
                        type: 'post',
                        data: JSON.stringify(obj),
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader("_gt",gt);
                        },
                        dataType: "json",
                        contentType:"application/json",
                        success:function(data){
                            var locus = data;
                            ShipLine(Maps,locus);
                            Map.setCenter({lat:locus[0].lat,lng:locus[0].lng});
                            for(var i = 0; i < locus.length; i++) {
                                Marker(locus[i].lat,locus[i].lng,Maps,symbolCircle);
                            }
                        }
                    })
                }

            }

            window.addZoom = function(){//enlarge放大地图

                var num =Maps.getZoom();
                ++num;
                Maps.setZoom(num)
            }
            window.narrowZoom = function (){//减小地图
                var num =Maps.getZoom();
                --num;
                Maps.setZoom(num)
            }
            window.satellite = function (){//卫星图
                Maps.setMapTypeId('satellite')
                Maps.setMapTypeId('hybrid')
            }
            window.roadmap = function (){//正常地图
                Maps.setMapTypeId('roadmap')

            }
            window.Location = function (lat,lng){//定位
                Maps.setCenter({lat:lat,lng:lng})
            }

            var symbolEnd1 = {//轮船图标
                path:"M989.9,339.9L886.6,441.4l21.6,19c9.7,9.3,1.7,21.9,1.6,35c-0.5,71.3-127.9,265.9-358.1,282.8V444.4H752V329.3H551.8V299c56.8-22.2,93-72.8,93-131.7c0-79.5-61.1-143.9-140.5-143.9c-79.5,0-149.6,64.4-149.6,143.9c0,59,52.2,109.5,80.6,131.7v30.3H234.9v115.1h200.2v333.9C234.9,761.4,90.8,566.8,90.3,495.5c-0.1-13.2,1.4-25.8,11.1-35l21.8-19L10.1,339.9C4.6,777.2,350,886.3,435.1,909.6l0,0l0,0l72.4,67l71.9-71.9l0,0C694.5,881.3,995.4,777.2,989.9,339.9z M507.5,109.7c31.8,0,57.5,25.8,57.5,57.5c0,31.8-25.8,57.5-57.5,57.5c-31.8,0-57.5-25.8-57.5-57.5C449.9,135.5,475.7,109.7,507.5,109.7z",
                strokeColor: '#000',
                strokeWeight: 1,
                fillColor: '#F00',
                fillOpacity: 0.3,
                scale:0.02,
                rotation:0,

            };

            var rect = {
                path:'M19-28L69-28z',
                strokeColor: '#000',
                strokeWeight: 1,
                fillColor: '#000',
                fillOpacity: 0.7,
                scale: 0.6,
                rotation:0,
            };
            //

        }


    }
</script>

<style scoped>

	html, body {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
	}

	#map {
		height: 100vh;
		width: 100%;
	}

	.ssss{
		background-color: red;
		width: 1em;
		height: 1em;
		margin-bottom: 10px;
	}
</style>
