<template>
    <div style="user-select: auto;" @click="fuzzySearchBlur($event)">
        <div id="longitudeAndLatitude" style="position: absolute; bottom: 15px; right: 0; z-index: 999999">
            <div class="latLng-children latLng-lat"></div>
            <div class="latLng-children latLng-lng"></div>
            <div class="latLng-children latLng-GMT"></div>
        </div>
        <div class="sr-layout">
            <div class="sr-header">
                <div class="sr-logo_en" @click="getActiveIndex()">Voyage Route & Speed Intelligence</div>
                <ul class="sr-layout-right">
                    <li class="sr-nav-item">
                        <a href="javascript:;" class="setting-ship-map ship-map-setting" title="Settings" @click="shipMapSetting">
                            <i class="fs fs-cog setting-ship-map-i"></i>
                        </a>
                    </li>
                    <li class="sr-nav-item mar-left-10" v-if="userStorage == null">
                        <a href="javascript:;" class="setting-ship-map ship-map-exit" title="Login" @click="registerClick">
                            <i class="fs fs-user setting-ship-map-i"></i>
                        </a>
                    </li>
                    <li class="sr-nav-item mar-left-10" v-if="userStorage != null">
                        <a href="javascript:;" class="setting-ship-map ship-map-exit" title="Sign out" @click="signOut()">
                            <i class="fs fs-log-out setting-ship-map-i"></i>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sr-side">
                <a class="side-btn open">
                    <i class="fs fs-side-retra"></i>
                </a>
                <div class="sr-side-scroll">
                    <div class="sr-search">
                        <input class="sear_input" type="text" placeholder="Vessel Name/IMO" value=""
                               @input="fuzzySearch"
                               @focus="fuzzySearchShow" v-model.trim='full_search'>
                        <a href="javascript:;" class="ship-search-a">
                            <i class="fs fs-search"></i>
                        </a>
                    </div>
                    <div class="fullz-z" v-show="ulFlag">
                        <div class='selected'></div>
                        <ul class="ul-list-data">
                            <li v-for="fuzzyMsg in fuzzyMsgs" @click="pitchOn(fuzzyMsg.imo, fuzzyMsg.matchkey)">
                                <span :title="fuzzyMsg.matchkey" class="noSpan">{{fuzzyMsg.matchkey}}</span>
                                <span class="right-context-1">{{fuzzyMsg.matchname}}</span>
                                <input type="hidden" :value="fuzzyMsg.imo">
                            </li>
                        </ul>
                    </div>
                    <div class="gk-search mar-bottom-10">
                        <a class="fs_search_model" href="javascript:;" @click="myShips">
                            <i class="fs fs-historical-route"></i>My Vessel Lists</a>
                    </div>
                    <div class="gk-search">
                        <a class="fs_search_model" href="javascript:;" @click="reqList">
                            <i class="fs fs-port"></i>Port Search</a>
                    </div>
                    <div class="gk-search mar-top-10">
                        <a class='historical' href="javascript:;" @click="reqListHIstory">
                            <i class="fs fs-hangxian"></i>Historical Route</a>
                    </div>
                    <div class="gk-search mar-top-10">
                        <a class="hx_calc line-speed-cal" href="javascript:;">
                            <i class="fs fs-speed-calcu"></i>Route&Speed
                        </a>
                    </div>
                    <!--<div class="gk-search mar-top-10">
                                <a href="javascript:;" @click="coming">
                                    <i class="fs fs-weather-infor"></i>Weather Service Beta</a>
                            </div>-->
                    <!--台风-->
                    <div class="gk-search mar-top-10 menu_down clickClearMsg">
                        <a class="tf_search_name"><i class="fs fs-typhoon"></i>Typhoon<i
                                class="icon_down fs fs-chevron-down"></i></a>
                    </div>
                    <div class="tf_form menu_item_form typhoonWrap" data-value="1">
                        <div class="radio_group tf_row">
                            <label class="item typhoonContent" data-value="1">
                                <a class="f_radio"><i class="fs-circle fs-circle-select"></i></a>
                                <label>Currently active</label>
                            </label>
                            <label class="item typhoonContent" data-value="2">
                                <a class="f_radio"><i class="fs-circle"></i></a>
                                <label>Time range</label>
                            </label>
                        </div>
                        <div class="tf_time tf_row typhoonTiming">
                            <div class="time">
                                <el-date-picker prefix-icon="fs-calendar" v-model="typhoonTime1" class="timeP4"
                                                size="mini" type="date" placeholder="" :picker-options="pickerOptions0">
                                </el-date-picker>
                            </div>
                            <em>-</em>
                            <div class="time">
                                <el-date-picker prefix-icon="fs-calendar" v-model="typhoonTime2" class="timeP4"
                                                size="mini" type="date" placeholder="" :picker-options="pickerOptionsTyphoon">
                                </el-date-picker>
                            </div>
                        </div>
                        <div class="legend tf_row">
                            <div class="item"><i class="solid_circle bg_color_1"></i>Tropical<br><i
                                    class="solid_circle"></i>depression
                            </div>
                            <div class="item"><i class="solid_circle bg_color_2"></i>Tropical<br><i
                                    class="solid_circle"></i>storm
                            </div>
                        </div>
                        <div class="legend tf_row">
                            <div class="item"><i class="solid_circle bg_color_3"></i>Strong tropical<br><i
                                    class="solid_circle"></i>storm
                            </div>
                            <div class="item"><i class="solid_circle bg_color_4"></i>Typhoon</div>
                        </div>
                        <div class="legend tf_row">
                            <div class="item"><i class="solid_circle bg_color_5"></i>Strong typhoon</div>
                            <div class="item"><i class="solid_circle bg_color_6"></i>Super typhoon</div>
                        </div>
                        <div class="tf_search tf_row typhoonSearch" style="cursor: pointer">Search</div>
                    </div>
                    <!--气象海况-->
                    <div class="gk-search mar-top-10 menu_down clickClearMsg">
                        <a class="qx_show"><i class="fs fs-weather-infor"></i>Weather<i
                                class="icon_down fs fs-chevron-down"></i></a>
                    </div>
                    <div class="qx_form menu_item_form windWaveStream" data-value="">
                        <div class="check_group">
                            <label class="item windWave">
                                <a class="f_checkbox" uuid=",pressure">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <label>Pressure</label>
                            </label>
                            <label class="item windWave">
                                <a class="f_checkbox" uuid=",wind">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <label>Wind</label>
                            </label>
                            <label class="item windWave">
                                <a class="f_checkbox" uuid=",wave">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <label>Wave</label>
                            </label>
                            <label class="item windWave">
                                <a class="f_checkbox" uuid=",current">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <label>Current</label>
                            </label>
                            <a class="f_question">
                                <i class="fs-question"></i>
                            </a>
                        </div>
                        <div class="time weatherqx"><span>{{weatherTimes[weatherTimesIndex]}}</span> GMT+8</div>
                        <div class="time_choose">
                            <div class="time_progress">
                                <div class="have_cover"></div>
                                <div class="sign"></div>
                            </div>
                            <div class="time_operate" data-value="0">
                                <a class="f_pre pre_next" data-param="-1"><i class="fs-pre_doub"></i></a>
                                <a class="f_next pre_next" data-param="1"><i class="fs-next_doub"></i></a>
                            </div>
                        </div>
                    </div>
                    <!--海盗军演-->
                    <div class="gk-search mar-top-10 menu_down clickClearMsg">
                        <a class="hd_show"><i class="fs fs-haidaojunyan"></i>Piracy & Military exercise<i
                                class="icon_down fs fs-chevron-down"></i></a>
                    </div>
                    <div class="hd_form menu_item_form pirate-wrap"
                         data-value="suspicious vessel,attack intention,boarded,fired,stolen,hijacked,military exercise">
                        <div class="hd_row">
                            <label>Time range：</label>
                            <select class="select selectTime">
                                <option selected value="1">Last month</option>
                                <option value="3">Last three months</option>
                                <option value="6">Last half year</option>
                                <option value="12">Last one year</option>
                                <option value="36">Last three years</option>
                            </select>
                        </div>
                        <div class="hd_row">
                            <label class="item pirate-content">
                                <a class="f_checkbox pirate-a checked" uuid=",suspicious vessel">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <a class="f_ship_icon">
                                    <i class="fs-keyi bg_color_11"></i>
                                </a>
                                <label>Suspicious<br><i class="f_ship_gap"></i>vessel</label>
                            </label>
                            <label class="item pirate-content">
                                <a class="f_checkbox pirate-a checked" uuid=",attack intention">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <a class="f_ship_icon">
                                    <i class="fs-gongji bg_color_12"></i>
                                </a>
                                <label>Attack<br><i class="f_ship_gap"></i>Intention</label>
                            </label>
                        </div>
                        <div class="hd_row">
                            <label class="item pirate-content">
                                <a class="f_checkbox pirate-a checked" uuid=",boarded">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <a class="f_ship_icon">
                                    <i class="fs-dengchuan bg_color_13"></i>
                                </a>
                                <label>Boarded</label>
                            </label>
                            <label class="item pirate-content">
                                <a class="f_checkbox pirate-a checked" uuid=",fired">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <a class="f_ship_icon">
                                    <i class="fs-jiaohuo bg_color_14"></i>
                                </a>
                                <label>Fired</label>
                            </label>
                        </div>
                        <div class="hd_row">
                            <label class="item pirate-content">
                                <a class="f_checkbox pirate-a checked" uuid=",stolen">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <a class="f_ship_icon">
                                    <i class="fs-haidao bg_color_15"></i>
                                </a>
                                <label>Stolen</label>
                            </label>
                            <label class="item pirate-content">
                                <a class="f_checkbox pirate-a checked" uuid=",hijacked">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <a class="f_ship_icon">
                                    <i class="fs-jiechi bg_color_16"></i>
                                </a>
                                <label>Hijacked</label>
                            </label>
                        </div>
                        <div class="hd_row" style="border-top: 1px solid #383838;padding-top: 10px;">
                            <label class="item pirate-content" style="width: 100%;">
                                <a class="f_checkbox pirate-a checked" uuid=",military exercise">
                                    <i class="fs-checkbox"></i>
                                </a>
                                <a class="f_ship_icon">
                                    <i class="fs-junyan bg_color_17"></i>
                                </a>
                                <label>Military exercise</label>
                            </label>
                        </div>
                        <div class="hd_search hd_row warSearch">Search</div>
                    </div>
                </div>
            </div>
            <div class="sr-body">
                <!-- 放大缩小图层 -->
                <div class="sr-zooming">
                    <a href="javascript:;" class="enlarge">+</a>
                    <div class="scroll1-height1">
                        <span class="dieblock"></span>
                    </div>
                    <a href="javascript:;" class="reduce">-</a>
                </div>
                <!--视图切换-->
                <div id="map"></div>
                <!-- 通知信息 -->
                <div class="pannel_notice pannel_25 clearfix" style="position: fixed;top: 60px;left: 330px;">
                    <div class="_left"><img class="notice_img" src="../../static/images/ship/radio.png"></div>
                    <div class="_right " id="header_demo">
                        <div class="notice_list" style="white-space:nowrap;">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td id="header_demo1" nowrap>{{homeInfox}}</td>
                                    <td id="header_demo2" nowrap></td>
                                    <td id="header_demo3" nowrap></td>
                                    <td id="header_demo4" nowrap></td>
                                    <td id="header_demo5" nowrap></td>
                                    <td id="header_demo6" nowrap></td>
                                </tr>
                            </table>
                            <!-- <marquee direction="left" scrollamount="8" onMouseOver="this.stop()" onMouseOut="this.start()">{{homeInfox}}</marquee> -->
                        </div>
                    </div>
                    <div class="_close"><i class="fs-close" @click='infoClose()'></i></div>
                </div>
                <div style="position:absolute;left: 212px;height: 100%;width: 100%;top: 0;">
                    <!-- 三天气象信息 -->
                    <div class="pannel_weather pannel_23 sr-dialog zIndexZoom hide"
                         style="position: absolute; top:80px; left:200px;">
                        <div class="pannel_title">
                            <div class="tab_item active">{{threeWeathertitle}}rd May</div>
                            <div class="tab_item">{{threeWeathertitle1}}rd May</div>
                            <div class="tab_item">{{threeWeathertitle2}}rd May</div>
                            <div class="time_zone">[GMT{{zone}}]</div>
                            <a href="javascript:;" class="close tridWeatherClose"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="pannel_content infobody" v-show='index==0'
                             v-for='(threeWeatherbodys,index) in threeWeatherbody '>
                            <div class="high_low">
                                <div class="item" v-for='higWaters in threeWeatherbodys.tides.higWaters'>High
                                    tide:{{higWaters.waterTime}}&nbsp;&nbsp;{{higWaters.water}}
                                </div>
                            </div>
                            <div class="high_low">
                                <div class="item" v-for='lowWaters in threeWeatherbodys.tides.lowWaters'>Low
                                    tide:{{lowWaters.waterTime}}&nbsp;&nbsp;{{lowWaters.water}}
                                </div>
                            </div>
                            <div class="weather_info" v-for='weathers in threeWeatherbodys.weathers'>
                                <div class="weather_top">{{weathers.date}}Hour&nbsp;&nbsp;{{weathers.weatherEn}}</div>
                                <div class="weather_body clearfix">
                                    <div class="img">
                                        <img :src="weathers.iconurl">
                                    </div>
                                    <div class="info">
                                        <div class="clearfix">
                                            <div class="item item1">
                                                <label class="label1">Pressure：</label>
                                                <span>{{weathers.pressure}}mb</span>
                                            </div>
                                            <div class="item item2 ">
                                                <label class="label2">Wind：</label>
                                                <span class="ellipsis_line_1"
                                                      :title="Number(weathers.windspeed).toFixed(2)">{{weathers.winddirection}}/{{Number(weathers.windspeed).toFixed(2)|truncate(1)}}Knots</span>
                                            </div>
                                            <div class="item">
                                                <label>Wave height：</label>
                                                <span>{{weathers.wave}}m</span>
                                            </div>
                                        </div>
                                        <div class="clearfix">
                                            <div class="item item1">
                                                <label class="label1">Swell：</label>
                                                <span>{{weathers.current}}m</span>
                                            </div>
                                            <div class="item item2">
                                                <label class="label2">Temp：</label>
                                                <span>{{weathers.temperature}}℃</span>
                                            </div>
                                            <div class="item">
                                                <label>Humidity：</label>
                                                <span>{{weathers.humidity}}%</span>
                                            </div>
                                        </div>
                                        <div class="clearfix">
                                            <div class="item item1">
                                                <label class="label1">Dew point：</label>
                                                <span>{{weathers.dew}}℃</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 历史航线历史参考数据 -->
                    <div class="pannel_table_3 pannel_24 sr-dialog zIndexZoom hide"
                         style="position: absolute; top:350px; left:260px;">
                        <div class="pannel_title">
                            <span class="name">Historical reference</span>
                            <a class="close"><i class="fs fs-close" @click="historyClose()"></i></a>
                        </div>
                        <div class="table_container">
                            <table>
                                <tr>
                                    <th class="tabel_title">Voyage</th>
                                    <th class="tabel_title">Historical speed（knots）</th>
                                    <th class="tabel_title ">Historical average time stay in port(H)</th>
                                </tr>
                                <tr v-for="recomendSpeeds in recomendSpeedH">
                                    <td class="tabel_cell">{{recomendSpeeds.fromNameEn}}
                                        <img class="arrow_link" src="../../static/images/ship/arrow_10.png">{{recomendSpeeds.toNameEn}}
                                    </td>
                                    <td class="tabel_cell">{{recomendSpeeds.historySpeed}}</td>
                                    <td class="tabel_cell">{{recomendSpeeds.avgWorkTimePort}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="bottom_info">Historical average route speed-{{recomendSpeed}}knots-Total
                            time{{totalDays}}days
                        </div>
                    </div>
                    <!-- 实时航线历史参考数据 -->
                    <div class="pannel_table_3 hide nowSpeedD sr-dialog zIndexZoom"
                         style="position: absolute; top:350px; left:260px;">
                        <div class="pannel_title">
                            <span class="name">Historical reference</span>
                            <a class="close"><i class="fs fs-close" @click="historyCloseN()"></i></a>
                        </div>
                        <div class="table_container">
                            <table>
                                <tr>
                                    <th class="tabel_title">Voyage</th>
                                    <th class="tabel_title">Historical speed（knots）</th>
                                    <th class="tabel_title ">Historical average time stay in port(H)</th>
                                </tr>
                                <tr v-for="recomendSpeedNs in recomendSpeedN">
                                    <td class="tabel_cell">
                                        {{recomendSpeedNs.fromNameEn}}<img class="arrow_link"
                                                                           src="../../static/images/ship/arrow_10.png">{{recomendSpeedNs.toNameEn}}
                                    </td>
                                    <td class="tabel_cell">{{recomendSpeedNs.historySpeed}}</td>
                                    <td class="tabel_cell">{{recomendSpeedNs.avgWorkTimePort}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="bottom_info">Historical average route speed -{{recomendSpeed2}}knots-Total time
                            {{totalDays2}}days
                        </div>
                    </div>

                    <!--&lt;!&ndash; 港口信息 hide&ndash;&gt;
                    <div class="pannel_port pannel_26 sr-dialog zIndexZoom "
                         style="position:fixed; top:100px; left:300px; z-index: 10000; display: block" >
                        <div class="pannel_title">
                            <span class="name">{{initPortName}}</span>
                            <a class="close" @click="closeInitPort"><i class="fs fs-close"></i></a>
                            &lt;!&ndash;<img class="sign_img" src="../../static/images/ship/sign_1.png">&ndash;&gt;
                        </div>
                        <div class="weather_info"><span>{{initPortCurrent}}</span>&nbsp;&nbsp;<span>{{leftinfo.weatherEn}}</span>
                            <a class="port_icon" @click="portWeathers" style="color:#fff">
                                <i class="fs-qixiang bg_color_24"></i>
                            </a>
                        </div>
                        &lt;!&ndash;<div class="port_info">
                                    <div class="item " data-index="1">
                                         <label @click="quickEntry">
                                             <a class="port_icon" style="color:#fff"><i class="fs-chufa bg_color_21" style="margin-right:5px"></i>当前在港</a>
                                         </label>
                                    </div>
                                    <div class="item " data-index="2">
                                         <label @click="quickEntry">
                                             <a class="port_icon" style="color:#fff"><i class="fs-yuji bg_color_22" style="margin-right:5px"></i>预计到港</a>
                                         </label>
                                    </div>
                                    <div class="item " data-index="3">
                                         <label @click="quickEntry">
                                             <a class="port_icon" style="color:#fff" >
                                                 <i class="fs-lishi bg_color_23" style="margin-right:5px"></i>历史到港
                                             </a>
                                         </label>
                                    </div>
                                    <div class="item " data-index="4">
                                         <label>
                                             <a class="port_icon" @click="portWeathers" style="color:#fff"><i class="fs-qixiang bg_color_24" style="margin-right:5px"></i>气象预报</a>
                                         </label>
                                    </div>
                                </div>&ndash;&gt;
                    </div>-->
                    <!-- 港口天气 -->
                    <div class="pannel_port_weather pannel_27 hide sr-dialog zIndexZoom"
                         style="position:absolute; top:100px; left:440px;">
                        <div class="pannel_title">
                            <span class="name">Port Weather</span>
                            <a class="close" @click="portWClose"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="pannel_content clearfix">
                            <div class="_left">
                                <div class="_top">{{initPortName}},<span>{{initPortCurrent}}</span></div>
                                <div class="_one" :title="leftinfo.weatherEn">Now：{{leftinfo.weatherEn|truncate(15)}}
                                </div>
                                <div class="_one">Pressure：{{leftinfo.pressure}}mb</div>
                                <div class="_one">Temp：{{leftinfo.temperature}}℃</div>
                                <div class="_one">Rainfall：{{leftinfo.rain}}mm</div>
                                <div class="_one">
                                    Wind：{{leftinfo.winddirection}}/{{Number(leftinfo.windspeed).toFixed(2)}}Knots
                                </div>
                                <div class="_one">Humidity：{{leftinfo.humidity}}%</div>
                            </div>
                            <div class="_right">
                                <div class="item" v-for="weekW in rightinfo">
                                    <div class="_day">{{weekW.date}}</div>
                                    <div class="weather_img">
                                        <img :src="weekW.iconurl">
                                    </div>
                                    <div class="_one" :title="weekW.weatherEn">{{weekW.weatherEn|truncate(20)}}</div>
                                    <div class="_one">{{weekW.maxtemp}}℃ | {{weekW.mintemp}}℃</div>
                                    <div class="_one">Sunrise：{{weekW.sunrise}}</div>
                                    <div class="_one">Sunset：{{weekW.sunset}}</div>
                                    <div class="_one">Rain：{{weekW.rainchance}}%</div>
                                    <div class="_one">
                                        Wind：{{weekW.winddirection}}/{{Number(weekW.windspeed).toFixed(2)}}Knots
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 风力风向示意图 -->
                    <div class="pannel_wind pannel_22 sr-dialog zIndexZoom hide"
                         style="position: absolute; top:50px; left:560px;">
                        <div class="one_legend">
                            <div class="legend_title">
                                <span class="name">Wind vectors</span>
                                <a href="javaScript:;" class="close wind-close"><i class="fs fs-close"></i></a>
                            </div>
                            <div class="legend_info" style="text-align: left;">
                                <div class="wind_item">
                                    <img class="wind_img" src="../../static/images/ship/wind_1.png">
                                    <div class="wind_grade">South 5</div>
                                </div>
                                <div class="wind_item">
                                    <img class="wind_img" src="../../static/images/ship/wind_2.png">
                                    <div class="wind_grade">Northeast 25</div>
                                </div>
                                <div class="wind_item">
                                    <img class="wind_img" src="../../static/images/ship/wind_3.png">
                                    <div class="wind_grade">No wind</div>
                                </div>
                                <div class="wind_item">
                                    <div class="wind_grade_calc">50+10+10+5=75</div>
                                    <img class="wind_img" src="../../static/images/ship/wind_4.png">
                                    <div class="wind_grade">West 75</div>
                                </div>
                            </div>
                        </div>
                        <div class="one_legend">
                            <div class="legend_title">
                                <span class="name">Wind scale and wind speed comparison</span>
                            </div>
                            <div class="legend_info" style="text-align: left;">
                                <div class="grade_speed_legend">
                                    <span>1</span>
                                    <span>4</span>
                                    <span>7</span>
                                    <span>11</span>
                                    <span>17</span>
                                    <span>22</span>
                                    <span>28</span>
                                    <span>34</span>
                                    <span>41</span>
                                    <span>48</span>
                                    <span>56</span>
                                    <span>64</span>
                                    <span>wind speed(knots)</span>
                                </div>
                                <div>
                                    <img class="scale_1" src="../../static/images/ship/scale_1.png">
                                </div>
                                <div class="grade_speed_legend">
                                    <span>1</span>
                                    <span>2</span>
                                    <span>3</span>
                                    <span>4</span>
                                    <span>5</span>
                                    <span>6</span>
                                    <span>7</span>
                                    <span>8</span>
                                    <span>9</span>
                                    <span>10</span>
                                    <span>11</span>
                                    <span>12</span>
                                    <span>wind scale(level)</span>
                                </div>
                            </div>
                        </div>
                        <div class="one_legend">
                            <div class="legend_title">
                                <span class="name">Wave color spectrum</span>
                            </div>
                            <div class="legend_info" style="text-align: left;">
                                <div>
                                    <img class="scale_2" src="../../static/images/ship/scale_2.png">
                                </div>
                                <div class="wave_height_color_legend">
                                    <span>2</span>
                                    <span>4</span>
                                    <span>6</span>
                                    <span>8</span>
                                    <span>10</span>
                                    <span>12</span>
                                    <span>14</span>
                                    <span>30m</span>
                                </div>
                            </div>
                        </div>
                        <div class="one_legend">
                            <div class="legend_title">
                                <span class="name">Ocean current color spectrum</span>
                            </div>
                            <div class="legend_info">
                                <div class="seawater_item">
                                    <img class="seawater_img" src="../../static/images/ship/arrow_1.png">
                                    <div class="seawater_grade">0kn</div>
                                </div>
                                <div class="seawater_item">
                                    <img class="seawater_img" src="../../static/images/ship/arrow_2.png">
                                    <div class="seawater_grade">1kn</div>
                                </div>
                                <div class="seawater_item">
                                    <img class="seawater_img" src="../../static/images/ship/arrow_3.png">
                                    <div class="seawater_grade">2kn</div>
                                </div>
                                <div class="seawater_item">
                                    <img class="seawater_img" src="../../static/images/ship/arrow_4.png">
                                    <div class="seawater_grade">3kn</div>
                                </div>
                                <div class="seawater_item">
                                    <img class="seawater_img" src="../../static/images/ship/arrow_5.png">
                                    <div class="seawater_grade">>4kn</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 台风查询结果 -->
                    <div class="pannel_table_2 pannel_20 sr-dialog zIndexZoom hide">
                        <div class="pannel_title">
                            <span class="name">Results</span>
                            <a href="javascript:;" class="close typhoon-result"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="table_container">
                            <table>
                                <tr>
                                    <th class="tabel_title">Name</th>
                                    <th class="tabel_title">Time</th>
                                    <th class="tabel_title">No.</th>
                                </tr>
                                <tr v-for="typhoonResults in typhoonResult">
                                    <td class="tabel_cell can_click posCenter"
                                        @click="detailedTyphoon(typhoonResults.positions, typhoonResults.typhoon.ename)">
                                        {{typhoonResults.typhoon.ename}}
                                    </td>
                                    <td class="tabel_cell">{{typhoonResults.typhoon.updatetime}}</td>
                                    <td class="tabel_cell">{{typhoonResults.typhoon.xuhao}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- 台风路径信息 -->
                    <div class="pannel_table_2 pannel_21 sr-dialog zIndexZoom hide">
                        <div class="pannel_title">
                            <span class="name">[{{typhoonName}}] Path information</span>
                            <a href="javascript:;" class="close" @click="closeTyphoonPath"><i
                                    class="fs fs-close"></i></a>
                        </div>
                        <div class="table_container" style="height: 248px;">
                            <table>
                                <tr>
                                    <th class="tabel_title">Time</th>
                                    <th class="tabel_title">Wind-speed</th>
                                    <th class="tabel_title">Moving direction</th>
                                    <th class="tabel_title">Wind-level</th>
                                </tr>
                                <tr v-for="typhoonPaths in typhoonPath">
                                    <td class="tabel_cell">{{typhoonPaths.updatetime}}</td>
                                    <td class="tabel_cell">{{typhoonPaths.windspeed}}</td>
                                    <td class="tabel_cell">{{typhoonPaths.movedirection}}</td>
                                    <td class="tabel_cell">{{typhoonPaths.strong}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- 船舶信息 -->
                    <div v-drag class="ship_pannel_two pannel_9 sr-d1 zIndexZoom" style="display: none;width:540px">
                        <div class="pannel_title sr-dialog-title drag-title-el">
                            <span class="f_ship"><i class="fs-ships"></i></span>
                            <span class="name">{{shipMessage.shipName}}</span>
                            <div class="img_container" style="margin-left: 16px;">
                                <div class="btn_name">Message Notification</div>
                                <img class="img_btn" src="../../static/images/ship/message.png"
                                     style="margin-bottom: 3px;">
                            </div>
                            <div class="img_container">
                                <div class="btn_name">Meteorological Information</div>
                                <img class="img_btn tridWeather" @click='threeweatherf' datalat='' datalng=''
                                     src="../../static/images/ship/weather.png" style="margin: 0 16px;">
                            </div>
                            <div class="img_container" style="top:8px;">
                                <div class="btn_name">{{this.ifCollect == 0?'favorites':'cancelled'}}</div>
                                <div class="img_btn collect-ship" @click="collectShip"></div>
                            </div>
                            <a href="javascript:;" class="close sr-close close-1 close-1-1"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="column_container">
                            <div class="column_two">
                                <div class="name">Vessel Type：</div>
                                <div class="text">{{shipMessage.shipType}}</div>
                                <div class="name">Status：</div>
                                <div class="text" :title="shipMessage.shipConditionEn">
                                    {{shipMessage.shipConditionEn|truncate(13)}}
                                </div>
                            </div>
                            <div class="column_two">
                                <div class="name">IMO：</div>
                                <div class="text get-imo">{{shipMessage.IMO}}</div>
                                <div class="name">MMSI：</div>
                                <div class="text get-mmsi">{{shipMessage.MMSI}}</div>
                            </div>
                            <div class="column_two">
                                <div class="name">Calling：</div>
                                <div class="text">{{shipMessage.callSign}}</div>
                                <div class="name">Flag ：</div>
                                <div class="text">
                                    <span :title="shipMessage.displayCountryEn">{{shipMessage.displayCountryEn|truncate(13)}}</span>
                                    <span class="flag-icon" :class="shipMessage.country"></span>
                                </div>
                            </div>
                        </div>
                        <div class="column_container">
                            <div class="column_two">
                                <div class="name">Built：</div>
                                <div class="text">{{shipMessage.Built}}</div>
                                <div class="name">Cubic：</div>
                                <div class="text">{{shipMessage.Cubic}}</div>
                            </div>
                            <div class="column_two">
                                <div class="name">DWT：</div>
                                <div class="text">{{shipMessage.SDWT | NumFormat}}Mt</div>
                                <div class="name">LOA：</div>
                                <div class="text">{{shipMessage.LOA}}</div>
                            </div>
                            <div class="column_two">
                                <div class="name">Beam：</div>
                                <div class="text">{{shipMessage.Beam}}</div>
                                <div class="name">Hull Type：</div>
                                <div class="text">{{shipMessage.HullType}}</div>
                            </div>
                        </div>
                        <div class="column_container">
                            <div class="column_two">
                                <div class="name">Latest Update：</div>
                                <div class="text">{{shipMessage.newTime}}</div>
                                <div class="name">Speed：</div>
                                <div class="text">{{shipMessage.shipSpeed}}Knots</div>
                            </div>
                            <div class="column_two">
                                <div class="name">Draft：</div>
                                <div class="text">{{shipMessage.shipWaterline}}m</div>
                                <div class="name">Laden Draft：</div>
                                <div class="text">{{shipMessage.shipFullWaterline}}m</div>
                            </div>
                            <div class="column_two">
                                <div class="name"> Loading State：</div>
                                <div class="text">{{shipMessage.loadEn}}</div>
                            </div>
                            <div class="column_two">
                                <div class="name">Destination：</div>
                                <div class="text">{{shipMessage.destination}}</div>
                                <div class="name">ETA：</div>
                                <div class="text">{{shipMessage.ETA}}</div>
                            </div>
                            <div class="column_two">
                                <div class="name">Departure Port：</div>
                                <div class="text">{{shipMessage.shipInitialEn}}</div>
                                <div class="name">Current Zone：</div>
                                <div class="text">{{shipMessage.nowSeaAreaEn}}</div>
                            </div>
                            <div class="column_two lastli">
                                <div class="name sr-d1-label">Time Range：</div>
                                <div class="time_range">
                                    <div class="time">
                                    <span class="d1-time-cpm d1-time-cpm1">
        										<el-date-picker
                                                        prefix-icon="fs-calendar"
                                                        v-model="time1"
                                                        @change="changeRouteTime"
                                                        class="timeP1"
                                                        size="mini"
                                                        type="datetime"
                                                        placeholder=""
                                                        :picker-options="pickerOptionss">
        					                     </el-date-picker>
        									</span>
                                    </div>
                                    <em class="sr-lineb">-</em>
                                    <div class="time">
                                    <span class="d1-time-cpm d1-time-cpm1">
        										<el-date-picker
                                                        prefix-icon="fs-calendar"
                                                        v-model="time2"
                                                        @change="changeRouteTime"
                                                        class="timeP1"
                                                        size="mini"
                                                        type="datetime"
                                                        placeholder=""
                                                        :picker-options="pickerOptions1">
        					                    </el-date-picker>
        									</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="operate">
                            <div class="item tryQuery">Voyage History</div>
                            <div class="item abolish" style="display: none; background:#D9B300;">Cancel</div>
                            <div class="item harborSearch" @click="harborSearch">Port Calling</div>
                            <div class="item laoShiDangAn" @click="laoShiDangAn">Vessel File</div>
                            <div class="item routeLineActive routeLineClick" @click="routeLine(shipMessage.MMSI)">Route&Speed</div>
                            <div class="item boat-details" @click="isLogin">Vessel Details</div>
                            <!--<router-link class="item boat-details" style="color:#fff" tag="a" target="_blank" :to="{path:'/bootinfo',query:{imo:shipMessage.IMO,mmsi:shipMessage.MMSI,type:3}}">Vessel Details</router-link>-->
                        </div>
                        <div class="tips">Reminder: Google Chrome Recommended</div>
                    </div>
                    <!-- 劳氏档案 -->
                    <div class="ship_pannel_three pannel_11 zIndexZoom sr-dialog hide" style="top:50px;left:310px;">
                        <div class="pannel_title">
                            <span class="f_ship"><i class="fs-folder"></i></span>
                            <span class="name">Vessel File</span>
                            <a class="close record-close"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="pannel_content">
                            <div class="column_container basic_information">
                                <div class="sub_title">Basic Information</div>
                                <div class="column_three">
                                    <div class="name">Ship Name:</div>
                                    <div class="text ellipsis_line_1" :title="daliao.basic.shipName">
                                        {{daliao.basic.shipName}}
                                    </div>
                                    <div class="name">IMO:</div>
                                    <div class="text">{{daliao.basic.imo}}</div>
                                    <div class="name">MMSI:</div>
                                    <div class="text">{{daliao.basic.mmsi}}</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Callsign:</div>
                                    <div class="text">{{daliao.basic.callsign}}</div>
                                    <div class="name">Ship Type:</div>
                                    <div class="text ellipsis_line_1" style='width:108px'
                                         :title="daliao.basic.shipType">{{daliao.basic.shipType}}
                                    </div>
                                    <div class="name">Flag:</div>
                                    <div class="text">{{daliao.basic.flag}}</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Gross Tonnage:</div>
                                    <div class="text">{{daliao.basic.grossTonnage}}Mt</div>
                                    <div class="name">DWT:</div>
                                    <div class="text">{{daliao.basic.deadWeight}}Mt</div>
                                    <div class="name">Service Status:</div>
                                    <div class="text ellipsis_line_1" :title="daliao.basic.serviceStatus">
                                        {{daliao.basic.serviceStatus}}
                                    </div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Service Speed:</div>
                                    <div class="text">{{daliao.basic.serviceSpeed}} Knots</div>
                                </div>
                            </div>
                            <div class="column_container classification_society">
                                <div class="sub_title">Classification Society</div>
                                <div class="column_three">
                                    <div class="name">Flag:</div>
                                    <div class="text">{{daliao.pis.flag}}</div>
                                    <div class="name">Port of Registry:</div>
                                    <div class="text">{{daliao.pis.portOfRegisttry}}</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">P_l:</div>
                                    <div class="text3" style="display:inline-block">{{daliao.pis.pi}}</div>
                                </div>
                            </div>
                            <div class="column_container _dimension">
                                <div class="sub_title">Dimension</div>
                                <div class="column_three">
                                    <div class="name">Lpb:</div>
                                    <div class="text">{{daliao.dimension.lpb}}m</div>
                                    <div class="name">Loa:</div>
                                    <div class="text">{{daliao.dimension.loa}}m</div>
                                    <div class="name">Breadth Extreme:</div>
                                    <div class="text">{{daliao.dimension.breadthRxtreme}}m</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Breadth:</div>
                                    <div class="text">{{daliao.dimension.breadthMoulded}}m</div>
                                    <div class="name">Depth Moulded:</div>
                                    <div class="text">{{daliao.dimension.depthMoulded}}m</div>
                                    <div class="name">Draught:</div>
                                    <div class="text">{{daliao.dimension.draught}}m</div>
                                </div>
                            </div>
                            <div class="column_container _built">
                                <div class="sub_title">Built</div>
                                <div class="column_three">
                                    <div class="name">Builder:</div>
                                    <div class="text ellipsis_line_1" :title="daliao.built.builder">
                                        {{daliao.built.builder}}
                                    </div>
                                    <div class="name">Year of Built:</div>
                                    <div class="text">{{daliao.built.yearOfBuilt}}</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Group Owner:</div>
                                    <div class="text">{{daliao.companyname.own}}</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Operator:</div>
                                    <div class="text">{{daliao.companyname.run}}</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Shipmanager:</div>
                                    <div class="text">{{daliao.companyname.manage}}</div>
                                </div>
                                <div class="column_three">
                                    <div class="name">Charterer:</div>
                                    <div class="text">{{daliao.companyname.rent}}</div>
                                </div>
                            </div>
                            <div class="column_container survey_records">
                                <div class="sub_title">Survey Records</div>
                                <div class="column_three">
                                    <div class="text" v-for="classfication in daliao.classfications">
                                        {{classfication.content}}
                                    </div>
                                </div>
                            </div>
                            <div class="column_container _PSC">
                                <div class="sub_title">PSC</div>
                                <div class="PSC_item" v-for="psc in daliao.pscs">
                                    <div class="column_three">
                                        <div class="name">PSC Orgnizition:</div>
                                        <div class="text">{{psc.pscOrganization}}</div>
                                        <div class="name">Authority:</div>
                                        <div class="text">{{psc.authority}}</div>
                                    </div>
                                    <div class="column_three">
                                        <div class="name">Port of Inspection:</div>
                                        <div class="text ellipsis_line_1" :title="psc.portOfInspection">
                                            {{psc.portOfInspection}}
                                        </div>
                                        <div class="name">Type of Inspection:</div>
                                        <div class="text">{{psc.typeOfInspection}}</div>
                                    </div>
                                    <div class="column_three">
                                        <div class="name">Detention:</div>
                                        <div class="text">{{psc.detention}}</div>
                                        <div class="name">Duration Days:</div>
                                        <div class="text">{{psc.durationDays}}</div>
                                    </div>
                                    <div class="column_three">
                                        <div class="name">Number of Deficiencies:</div>
                                        <div class="text">{{psc.numberOfDeficiencies}}</div>
                                        <div class="name">Date of Report:</div>
                                        <div class="text">{{psc.dateOfReport}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--弹出图层2  添加船舶-->
                    <div class="sr-dialog sr-d2 zIndexZoom" style="display:none;">
                        <h2 class="sr-d-title">
                            <span>添加船舶提醒</span>
                            <a href="javascript:;" class="sr-close">
                                <i class="fs fs-close"></i>
                            </a>
                        </h2>
                        <div class="sr-form">
                            <div class="sr-row">
                                <span class="sr-label">IMO</span>
                                <input type="text" class="sr-inp">
                            </div>
                            <div class="sr-row">
                                <span class="sr-label">提醒邮箱</span>
                                <input type="text" class="sr-inp" placeholder="huaxianzi_888@163.com">
                            </div>
                            <div class="sr-row">
                                <span class="sr-label">提醒间隔</span>
                                <select class="sr-sel">
                                    <option></option>
                                </select>
                            </div>
                            <div class="sr-row">
                                <span class="sr-label"></span>
                                <button class="sr-btn">添加</button>
                            </div>
                        </div>
                    </div>
                    <!--弹出图层3-->
                    <!---<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-->
                    <div class="pannel pannel_1 sr-dialog hide is-port-drag zIndexZoom" style="white-space: nowrap">
                        <div class="pannel_title">
                            <span class="fs_port"><i class="fs-port"></i></span>
                            <span class="name">Port Search</span>
                            <a href="javascript:;" class="close search-port-close"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="pannel_content">
                            <div class="row">
                                <div class="name">Port:</div>
                                <div class="text">
                                    <select class="select_d3 select-port-1" v-model="loadPort1">
                                        <option value="" selected="selected">Please select a port</option>
                                        <option v-for="item in loadPortArr" :value="item.portNameEn">
                                            {{item.portNameEn}}
                                        </option>
                                    </select>
                                    <button class="button search-button">Search</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">Condition:</div>
                                <div class="text">
                                    <div class="radio_group-1">
                                        <label class="item pannel_1_radio" data-value="1">
                                            <a class="f_radio"><i class="radio-list fs-circle fs-circle-select"></i></a>
                                            <span>Vessels In Port</span>
                                        </label>
                                        <label class="item pannel_1_radio" data-value="2">
                                            <a class="f_radio"><i class="radio-list fs-circle"></i></a>
                                            <span>Vessels Inbound</span>
                                        </label>
                                        <label class="item pannel_1_radio" data-value="3">
                                            <a class="f_radio"><i class="radio-list fs-circle"></i></a>
                                            <span>Port Arrivals</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row timer-list hide">
                                <div class="name">Time Range：</div>
                                <div class="text" v-show="portDataValue==2">
                                    <div class="time">
                                        <el-date-picker prefix-icon="fs-calendar" v-model="time5" class="timeP2"
                                                        size="mini" type="datetime" placeholder="Please enter date"
                                                        :picker-options="pickerOptions4">
                                        </el-date-picker>
                                    </div>
                                    <em>-</em>
                                    <div class="time">
                                        <el-date-picker prefix-icon="fs-calendar" v-model="time6" class="timeP2"
                                                        size="mini" type="datetime" placeholder="Please enter date"
                                                        :picker-options="pickerOptions5">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="text" v-show="portDataValue==3">
                                    <div class="time">
                                        <el-date-picker prefix-icon="fs-calendar" v-model="time8" class="timeP2"
                                                        size="mini" type="datetime" placeholder="Please enter date"
                                                        :picker-options="pickerOptions6">
                                        </el-date-picker>
                                    </div>
                                    <em>-</em>
                                    <div class="time">
                                        <el-date-picker prefix-icon="fs-calendar" v-model="time9" class="timeP2"
                                                        size="mini" type="datetime" placeholder="Please enter date"
                                                        :picker-options="pickerOptions3">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">Vessel Type:</div>
                                <div class="text">
                                    <div class="check_group wrap-ship-type" data-value="VLCC">
                                        <label class="item">
                                            <a class="f_checkbox checked" href="javascript:;" uuid=",VLCC"><i
                                                    class="fs-checkbox"></i></a>
                                            <label>VLCC</label>
                                        </label>
                                        <label class="item">
                                            <a class="f_checkbox" href="javascript:;" uuid=",Suezmax"><i
                                                    class="fs-checkbox"></i></a>
                                            <label>Suezmax</label>
                                        </label>
                                        <label class="item">
                                            <a class="f_checkbox" href="javascript:;" uuid=",Aframax"><i
                                                    class="fs-checkbox"></i></a>
                                            <label>Aframax</label>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">DWT：</div>
                                <div class="text">
                                    <input type="text" class="text_input" placeholder="" v-model="dwt1">
                                    <em>-</em>
                                    <input type="text" class="text_input" placeholder="" v-model="dwt2">
                                    <em>Mt</em>
                                </div>
                            </div>
                            <div class="row hide" id="sailState">
                                <div class="name">Status：</div>
                                <div class="text">
                                    <div class="check_group ship-status" data-value="1,2">
                                        <label class="item">
                                            <a class="f_checkbox checked" uuid=",1"><i class="fs-checkbox"></i></a>
                                            <span>Anchored</span>
                                        </label>
                                        <label class="item">
                                            <a class="f_checkbox checked" uuid=",2"><i class="fs-checkbox"></i></a>
                                            <span>Under way using engine</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 港口记录、当前 -->
                    <div class="pannel_table pannel_6 zIndexZoom portTable" id="sr-d9">
                        <div class="sr-dialog9 sr-d9">
                            <div class="pannel_title  sr-d8-title">
                                <span href="javascript:;" class="f_search"><i class="fs-search"></i></span>
                                <span class="name">Port Reports</span>
                                <span class="details">Total Vessels：<span
                                        class="color_orange">{{portLog1.length}}</span>, total Vessel Capacity：<span
                                        class="color_orange">{{zaiZhong1.pageSize | NumFormat}}</span>MT</span>
                                <a :href="export1" class="export export-1">Data Export</a>
                                <a href="javascript:;" class="close sr-close8 close-window-1"><i
                                        class="fs fs-close"></i></a>
                            </div>
                            <div class="table-wrap">
                                <div class="scrollTableChild">
                                    <div class="table-head">No.</div>
                                    <div class="table-body" v-for="(portList, index) in portLog1">
                                        <div>{{index + 1}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="pannel_content contentWrap scrollTable">
                                <div class="headContainer">
                                    <div class="tableHead tableRowOne">
                                        <div class="item">No.</div>
                                        <div class="item">Vessel Name</div>
                                        <div class="item">IMO</div>
                                        <div class="item">MMSI</div>
                                        <div class="item">Vessel Type</div>
                                        <div class="item">DWT</div>
                                        <div class="item">Max Draught</div>
                                        <div class="item">Arrival Draught</div>
                                        <div class="item">Previous Port</div>
                                        <div class="item" style="width: 120px;">ATA</div>
                                        <div class="item">Hours in Port(h)</div>
                                        <div class="item" style="width: 17px;visibility: hidden;">.</div>
                                    </div>
                                </div>
                                <div class="tableBody tableBody9">
                                    <div class="tableRow tableRowOne present-port" :data-lat='portList.lat'
                                         :data-lng="portList.lon" v-for="(portList, index) in portLog1">
                                        <div class="item">{{index + 1}}</div>
                                        <div class="item" :title="portList.shipName">{{portList.shipName}}</div>
                                        <div class="item">{{portList.imo}}</div>
                                        <div class="item">{{portList.mmsi}}</div>
                                        <div class="item">{{portList.sizeTypeEn}}</div>
                                        <div class="item">{{portList.sdwt | NumFormat}}</div>
                                        <div class="item">{{portList.draft}}</div>
                                        <div class="item">{{portList.draught}}</div>
                                        <div class="item">{{portList.fromPortEn}}</div>
                                        <div class="item" style="width: 120px;">{{portList.ata | timestampFormat}}</div>
                                        <div class="item">{{new Date() - portList.ata | timeNum}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--拖拽放大-->
                        <div class="line line9"></div>
                    </div>
                    <!-- 港口记录、预计 -->
                    <div class="pannel_table pannel_7 zIndexZoom portTable1" id="sr-d10">
                        <div class="sr-dialog10 sr-d10">
                            <div class="pannel_title  sr-d8-title">
                                <span href="javascript:;" class="f_search"><i class="fs-search"></i></span>
                                <span class="name">Port Reports</span>
                                <span class="details">Total Vessels: <span
                                        class="color_orange">{{portLog2.length}}</span>，total Vessel Capacity：<span
                                        class="color_orange">{{zaiZhong2.pageSize | NumFormat}}</span>MT</span>
                                <a :href="export2" class="export export-2">Data Export</a>
                                <a href="javascript:;" class="close sr-close8 close-window-1"><i
                                        class="fs fs-close"></i></a>
                            </div>
                            <div class="table-wrap">
                                <div class="scrollTableChild">
                                    <div class="table-head">No.</div>
                                    <div class="table-body" v-for="(portList, index) in portLog2">
                                        <div>{{index + 1}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="pannel_content contentWrap scrollTable">
                                <div class="headContainer">
                                    <div class="tableHead tableRowOne">
                                        <div class="item">No.</div>
                                        <div class="item">Vessel Name</div>
                                        <div class="item">IMO</div>
                                        <div class="item">MMSI</div>
                                        <div class="item">DWT</div>
                                        <div class="item">Vessel Type</div>
                                        <div class="item">Max Draught</div>
                                        <div class="item">Arrival Draught</div>
                                        <div class="item">Previous Port</div>
                                        <div class="item">ATA/ETA</div>
                                        <div class="item">Speed</div>
                                        <div class="item">Last Updated</div>
                                        <div class="item" style="width: 17px;visibility: hidden;">.</div>
                                    </div>
                                </div>
                                <div class="tableBody tableBody10">
                                    <div class="tableRow tableRowOne tableRowOne10"
                                         v-for="(portList, index) in portLog2" :data-lat='portList.lat'
                                         :data-lng="portList.lon">
                                        <div class="item">{{index + 1}}</div>
                                        <div class="item">{{portList.shipName}}</div>
                                        <div class="item">{{portList.imo}}</div>
                                        <div class="item">{{portList.mmsi}}</div>
                                        <div class="item">{{portList.sdwt | NumFormat}}</div>
                                        <div class="item">{{portList.vesselSizeEn}}</div>
                                        <div class="item">{{portList.draft}}</div>
                                        <div class="item">{{portList.draught}}</div>
                                        <div class="item">{{portList.lastPortEn}}</div>
                                        <div class="item">{{portList.eta | timestampFormat}}{{portList.type}}</div>
                                        <div class="item">{{portList.speed}}</div>
                                        <div class="item">{{portList.receiveTime | timestampFormat}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--拖拽放大-->
                        <div class="line line10"></div>
                    </div>
                    <!-- 港口记录、历史 -->
                    <div class="pannel_table pannel_8 zIndexZoom portTable2" id="sr-d11">
                        <div class="sr-dialog11 sr-d11">
                            <div class="pannel_title  sr-d8-title">
                                <span href="javascript:;" class="f_search"><i class="fs-search"></i></span>
                                <span class="name">Port Reports</span>
                                <span class="details">Total Vessels: <span
                                        class="color_orange">{{portLog3.length}}</span>，total Vessel Capacity: <span
                                        class="color_orange">{{zaiZhong3.pageSize | NumFormat}}</span>MT</span>
                                <a :href="export3" class="export export-3">Data Export</a>
                                <a href="javascript:;" class="close sr-close8 close-window-1"><i
                                        class="fs fs-close"></i></a>
                            </div>
                            <div class="table-wrap">
                                <div class="scrollTableChild">
                                    <div class="table-head">No.</div>
                                    <div class="table-body" v-for="(portList, index) in portLog3">
                                        <div>{{index + 1}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="pannel_content contentWrap scrollTable">
                                <div class="headContainer">
                                    <div class="tableHead tableRowOne">
                                        <div class="item">No.</div>
                                        <div class="item">Vessel Name</div>
                                        <div class="item">IMO</div>
                                        <div class="item">MMSI</div>
                                        <div class="item">DWT</div>
                                        <div class="item">Vessel Type</div>
                                        <div class="item">Max Draught</div>
                                        <div class="item">Arrival Draught</div>
                                        <div class="item">Departure Draught</div>
                                        <div class="item">Previous Port</div>
                                        <div class="item">ATD</div>
                                        <div class="item">ATA</div>
                                        <div class="item" style="width: 17px;visibility: hidden;">.</div>
                                    </div>
                                </div>
                                <div class="tableBody tableBody11">
                                    <div class="tableRow tableRowOne tableRowOne11"
                                         v-for="(portList, index) in portLog3" :data-lat='portList.lat'
                                         :data-lng="portList.lon">
                                        <div class="item">{{index + 1}}</div>
                                        <div class="item">{{portList.shipName}}</div>
                                        <div class="item">{{portList.imo}}</div>
                                        <div class="item">{{portList.mmsi}}</div>
                                        <div class="item">{{portList.sdwt | NumFormat}}</div>
                                        <div class="item">{{portList.vesselSizeEn}}</div>
                                        <div class="item">{{portList.draft}}</div>
                                        <div class="item">{{portList.draughtIn}}</div>
                                        <div class="item">{{portList.draughtOut}}</div>
                                        <div class="item">{{portList.lastPortEn}}</div>
                                        <div class="item">{{portList.atd | timestampFormat}}</div>
                                        <div class="item">{{portList.ata | timestampFormat}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--拖拽放大-->
                        <div class="line line11"></div>
                    </div>
                    <!--<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<-->
                    <!--弹出图层4-->
                    <div class="sr-dialog sr-d4 port-record zIndexZoom" style="display:none">
                        <h2 class="sr-d-title">
                            <span>Port Calling Report({{total}})</span>
                            <a href="javascript:;" class="sr-close">
                                <i class="fs fs-close"></i>
                            </a>
                        </h2>
                        <div class="sr-table-wrap tr-hover-wrap">
                            <table class="sr-table">
                                <thead>
                                <tr>
                                    <th>船名</th>
                                    <th>船型</th>
                                    <th>吃水</th>
                                    <th>始发港</th>
                                    <th>ETA</th>
                                    <th>目的港</th>
                                    <th>航速</th>
                                    <th>更新时间</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="tr-hover" v-for="reachLog in reachLogs" :data-lat="reachLog.lat"
                                    :data-lon="reachLog.lon">
                                    <td>{{reachLog.shipName}}</td>
                                    <td>{{reachLog.shipTypeCn}}</td>
                                    <td>{{reachLog.draught}}</td>
                                    <td>{{reachLog.startCn}}</td>
                                    <td>{{reachLog.eta | timestampFormat}}</td>
                                    <td>{{reachLog.destCn}}</td>
                                    <td>{{reachLog.sog}}</td>
                                    <td>{{reachLog.lasttime | timestampFormat}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="page-wrap">
                                <el-pagination class="page-style" @current-change='pageFn' :page-size="pageSize"
                                               layout="prev, pager, next" :total=total>
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <!--弹出图层5-->
                    <div class="sr-dialog sr-d5 zIndexZoom" style="display:none">
                        <h2 class="sr-d-title">
                            <span class="sr-label">绕开航行：</span>
                            <div class="sr-chk-group">
                                <label>
                                    <a class="sr-chk" href="javascript:;">
                                        <i class="fs fs-checkbox"></i>
                                    </a>
                                    苏伊士</label>
                                <label>
                                    <a class="sr-chk checked" href="javascript:;">
                                        <i class="fs fs-checkbox"></i>
                                    </a>
                                    巴拿马</label>
                                <label>
                                    <a class="sr-chk" href="javascript:;">
                                        <i class="fs fs-checkbox"></i>
                                    </a>
                                    KLEL</label>
                            </div>
                            <a href="javascript:;" class="sr-close">
                                <i class="fs fs-close"></i>
                            </a>
                        </h2>
                        <div class="sr-table-wrap">
                            <table class="sr-table">
                                <tr>
                                    <th>序号</th>
                                    <th>港口</th>
                                    <th>距离 (nm)</th>
                                    <th>航速 (km/s)</th>
                                    <th>经验航速 (km/s)</th>
                                    <th>港口停留时间 (h)</th>
                                    <th>预计离港时间</th>
                                    <th>预计到港时间</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Nanjing</td>
                                    <td>112</td>
                                    <td>12</td>
                                    <td>12</td>
                                    <td>
                                        <select class="sr-sel">
                                            <option>12</option>
                                        </select>
                                    </td>
                                    <td>
                                    <span class="d1-time">
        										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
        										<a href="javascript:;" class="fs fs-calendar"></a>
        									</span>
                                    </td>
                                    <td>
                                    <span class="d1-time">
        										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
        										<a href="javascript:;" class="fs fs-calendar"></a>
        									</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Nanjing</td>
                                    <td>112</td>
                                    <td>12</td>
                                    <td>12</td>
                                    <td>
                                        <select class="sr-sel">
                                            <option>12</option>
                                        </select>
                                    </td>
                                    <td>
                                    <span class="d1-time">
        										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
        										<a href="javascript:;" class="fs fs-calendar"></a>
        									</span>
                                    </td>
                                    <td>
                                    <span class="d1-time">
        										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
        										<a href="javascript:;" class="fs fs-calendar"></a>
        									</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Nanjing</td>
                                    <td>112</td>
                                    <td>12</td>
                                    <td>12</td>
                                    <td>
                                        <select class="sr-sel">
                                            <option>12</option>
                                        </select>
                                    </td>
                                    <td>
                                    <span class="d1-time">
        										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
        										<a href="javascript:;" class="fs fs-calendar"></a>
        									</span>
                                    </td>
                                    <td>
                                    <span class="d1-time">
        										<input type="text" class="sr-inp" placeholder="2018-03-20 24:00">
        										<a href="javascript:;" class="fs fs-calendar"></a>
        									</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="d5-tag">
                            <span class="d5-txt">标准航行：1757.0km</span>
                            <span class="d5-txt">用时：26.5天</span>
                            <span class="d5-txt">经验航行：
        							<em class="orange">1023.20km</em>
        						</span>
                            <span class="d5-txt">用时：
        							<em class="orange">24天</em>
        						</span>
                            <span class="d5-txt">
        							<em class="orange">* 以上计算结果仅供参考</em>
        						</span>
                        </div>
                    </div>
                    <!--弹出层6  靠港记录-->
                    <div class="pannel_table pannel_10 reach-popout zIndexZoom portTable3 hide" id="sr-d3">
                        <div class="sr-dialog3 sr-d-3">
                            <div class="pannel_title  sr-d8-title">
                                <span class="f_search"><i class="fs-search"></i></span>
                                <span class="name">Port Calling Report</span>
                                <span class="details">Total<span class="color_orange">{{total1}}</span>records</span>
                                <!--<a class="export"  :href="exportMsg">导出数据</a>-->
                                <a href='javascript:;' class="close sr-close8"><i class="fs fs-close"></i></a>
                            </div>
                            <div class="pannel_content contentWrap">
                                <div class="headContainer">
                                    <div class="tableHead tableRowOne">
                                        <div class="item">No.</div>
                                        <div class="item">Port(CN)</div>
                                        <div class="item">Port(EN)</div>
                                        <div class="item">Country</div>
                                        <div class="item">ATA</div>
                                        <div class="item">ATD</div>
                                        <div class="item">Arriving Draft</div>
                                        <div class="item">Departure Draft</div>
                                        <div class="item">Port Operation Time(/h)</div>
                                        <div class="item">Terminal Operation Time(/h)</div>
                                        <div class="item" style="width: 17px;visibility: hidden;">.</div>
                                    </div>
                                </div>
                                <div class="tableBody tableBody3 sr-d8-body">
                                    <div class="tableRow tableRowOne tableRowOne3" v-for="(list,index) in reachLogs1"
                                         :data-lat="list.lat" :data-lng="list.lon">
                                        <div class="item">{{index+1}}</div>
                                        <div class="item">{{list.portNameCn}}</div>
                                        <div class="item" :title="list.portNameEn">{{list.portNameEn}}</div>
                                        <div class="item">{{list.counrtyEn}}</div>
                                        <div class="item">{{list.ata | timestampFormat}}</div>
                                        <div class="item">{{list.atd | timestampFormat}}</div>
                                        <div class="item">{{list.draughtIn}}</div>
                                        <div class="item">{{list.draughtOut}}</div>
                                        <div class="item">{{list.workTimePort | timeNum}}</div>
                                        <div class="item">{{list.workTimeDoc | timeNum}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--拖拽放大-->
                        <div class="line line3"></div>
                    </div>
                    <!--弹出图层7 历史航线-->
                    <div class="pannel pannel_2 sr-d7 sr-dialog zIndexZoom  hide ">
                        <div class="pannel_title">
                            <span class="fs_history"><i class="fs-hangxian"></i></span>
                            <span class="name">Historical Route</span>
                            <a href="javascript:;" class="close haven-close"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="pannel_content">
                            <div class="row">
                                <div class="name sr-label">Loading Port：</div>
                                <div class="text">
                                    <input class=" sear_inputPort sear_inputFrom" type="text" placeholder="Loading Port"
                                           value="" @input="fuzzySearchFrom" @focus="fuzzySearchFrom"
                                           v-model.trim='full_searchFrom'>
                                    <div class="fullz-zPort fullz-zFrom" v-show="ulFlagFrom">
                                        <ul class="ul-list-dataFrom" style="display: none">
                                            <li v-for="fuzzyMsg in fuzzyMsgsFrom" @click="pitchOnFrom(fuzzyMsg)">
                                                <span :title="fuzzyMsg.portNameEn" class="right-context">{{fuzzyMsg.portNameEn.trim()}}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <button class="button sr-btn add-btn search-btnHistory"
                                            style="margin-left: 20px;width: 80px;" @click='addBtnHistory'>Search
                                    </button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">Discharge Port：</div>
                                <div class="text">
                                    <select class="select_d3" v-model="loadPort3">
                                        <option value="" selected="selected">Please select the port</option>
                                        <option v-for="item in loadPortArrEnd" :value="item.portNameEn">
                                            {{item.portNameEn}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">Vessel Type：</div>
                                <div class="check_group text ship-type-wrapHistory" data-value="VLCC,Suezmax,Aframax">
                                    <label class="item">
                                        <a class="f_checkbox sr-chk checked" uuid=",VLCC">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>VLCC</label>
                                    </label>
                                    <label class="item">
                                        <a class="f_checkbox sr-chk checked" uuid=",Suezmax">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>Suezmax</label>
                                    </label>
                                    <label class="item">
                                        <a class="f_checkbox sr-chk checked" uuid=",Aframax">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>Aframax</label>
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">DWT：</div>
                                <div class="text load-wrap">
                                    <input type="text" class="text_input" v-model="num1" placeholder="Enter Please">
                                    <em>-</em>
                                    <input type="text" class="text_input" v-model="num2" placeholder="Enter Please">
                                    <em>Mt</em>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name">Time type：</div>
                                <div class="text radio_group voyageHistory-wrap" data-value="1">
                                    <label class="item">
                                        <a class="f_radio" href="javascript:;" uid="1">
                                            <i class="fs-circle fs-circle-select"></i>
                                        </a>
                                        <label>Arrival</label>
                                    </label>
                                    <label class="item">
                                        <a class="f_radio" href="javascript:;" uid="2">
                                            <i class="fs-circle"></i>
                                        </a>
                                        <label>Departure</label>
                                    </label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="name sr-label">Time Range：</div>
                                <div class="text">
                                    <div class="time">
                                        <el-date-picker prefix-icon="fs-calendar" v-model="time3" class="timeP2"
                                                        size="mini" type="datetime" placeholder="Choose Date"
                                                        :picker-options="pickerOptions2">
                                        </el-date-picker>
                                    </div>
                                    <em>-</em>
                                    <div class="time">
                                        <el-date-picker prefix-icon="fs-calendar" v-model="time4" class="timeP2"
                                                        size="mini" type="datetime" placeholder="Choose Date"
                                                        :picker-options="pickerOptionsHis">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <!--<div class="row hide">
                                        <div class="name">航行状态：</div>
                                        <div class="text">
                                            <div class="check_group">
                                                <label class="item">
                                                    <a class="f_checkbox checked"><i class="fs-checkbox"></i></a>
                                                    <label>静止</label>
                                                </label>
                                                <label class="item">
                                                    <a class="f_checkbox"><i class="fs-checkbox"></i></a>
                                                    <label>航行</label>
                                                </label>
                                            </div>
                                        </div>
                                    </div>-->
                        </div>
                    </div>
                    <!-- 历史记录 -->
                    <div class="pannel_table pannel_3 zIndexZoom" id="sr-d8">
                        <div class="sr-dialog8 sr-d8">
                            <div class="pannel_title sr-d8-title">
                                <span class="f_search"><i class="fs-search"></i></span>
                                <span class="name">History Reports</span>
                                <span class="details">Total<span
                                        class="color_orange">{{historyTotal}}</span>records</span>
                                <a class="export" :href="exportMsg">Data Export</a>
                                <a href="javascript:;" class="close sr-close8"><i class="fs fs-close"></i></a>
                            </div>
                            <div class="pannel_content contentWrap">
                                <div class="headContainer">
                                    <div class="tableHead tableRowOne">
                                        <div class="item">No.</div>
                                        <div class="item">Vessel Name</div>
                                        <div class="item">IMO</div>
                                        <div class="item">MMSI</div>
                                        <div class="item">Vessel Type</div>
                                        <div class="item">Max Draught</div>
                                        <div class="item ellipsis_line_1" title="Departure Draught(Origin Port)">
                                            Departure Draught(Origin Port)
                                        </div>
                                        <div class="item ellipsis_line_1" title="Arrival Draught(Arrival Port)">Arrival
                                            Draught(Arrival Port)
                                        </div>
                                        <div class="item">Origin Port</div>
                                        <div class="item">Origin Zone</div>
                                        <div class="item">ATD</div>
                                        <div class="item">Via Ports</div>
                                        <div class="item">Destination</div>
                                        <div class="item">ATA</div>
                                        <div class="item" style="width: 17px;visibility: hidden;">.</div>
                                    </div>
                                </div>
                                <div class="tableBody tableBody8 sr-d8-body">
                                    <div class="tableRow tableRowOne tableRowOne8"
                                         v-for="(reachLog,index) in reachLogsHistory" :data-lat="reachLog.lat"
                                         :data-lng="reachLog.lon">
                                        <div class="item">{{index+1}}</div>
                                        <div class="item">{{reachLog.vesselName}}</div>
                                        <div class="item">{{reachLog.imo}}</div>
                                        <div class="item">{{reachLog.mmsi}}</div>
                                        <div class="item">{{reachLog.vesselSizeTypeEN}}</div>
                                        <div class="item">{{reachLog.draft}}</div>
                                        <div class="item">{{reachLog.draughtOut}}</div>
                                        <div class="item">{{reachLog.draughtIn}}</div>
                                        <div class="item">{{reachLog.fromPortEN}}</div>
                                        <div class="item">{{reachLog.fromCounrtyEN}}</div>
                                        <div class="item">{{reachLog.atd | timestampFormat}}</div>
                                        <div class="item" :title="reachLog.subPortsEN">{{reachLog.subPortsEN}}</div>
                                        <div class="item">{{reachLog.toPortEN}}</div>
                                        <div class="item">{{reachLog.ata | timestampFormat}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--拖拽放大-->
                        <div class="line line8"></div>
                    </div>
                    <!-- 航速航线 -->
                    <div class="pannel_table pannel_4 route_history hide sr-dialog zIndexZoom flex-tabel">
                        <div class="pannel_title">
                            <span class="fs_speed_calcu"><i class="fs-speed-calcu"></i></span>
                            <span class="name">Route&Speed</span>
                            <span class="check_group">
                                <span class="line-speed-type" data-value="VLCC">Vessel Type：</span>
                        <label class="item line-ship-type" data-value="VLCC">
                                        <a class="f_checkbox checked checked_2"><i class="fs-checkbox"></i></a>
                                        <span>VLCC</span>
                                      </label>
                        <label class="item line-ship-type" data-value="Suezmax">
                                        <a class="f_checkbox"><i class="fs-checkbox"></i></a>
                                        <span>Suezmax</span>
                                      </label>
                        <label class="item line-ship-type" data-value="Aframax">
                                        <a class="f_checkbox"><i class="fs-checkbox"></i></a>
                                        <span>Aframax</span>
                                      </label>
                        </span>
                            <div class="details_2">
                                <span class="item">Distance:<span class="color_orange" v-model="totalDistance">{{totalDistance.toFixed(2)}}</span>nm</span>
                                <span class="item">Days:<span class="color_orange">{{totalDays}}</span>days</span>
                                <span class="item">
                                        <span>Speed:</span>
                            <input type="number" class="text_input line-speed-speed" @input="speedChange" value="13.0"
                                   step="0.5" v-model="speedSpeed" min="0">
                            <span>kts</span>
                            </span>
                                <span class="item" v-if="recomendSpeed != 0">
                                        <span @click="historyOpen()" class="hover-status"
                                              style='color: #3B99FC;font-weight: 700;cursor: pointer;'>Historical AVG SPD:</span>
                            <span style="color: #FFA900;"> {{recomendSpeed}}</span>
                            <span>kts</span>
                            </span>
                            </div>
                            <a href="javascript:;" class="close sr-close close-route-line"><i
                                    class="fs fs-close"></i></a>
                        </div>
                        <div class="pannel_content contentWrap">
                            <div class="headContainer">
                                <div class="tableHead tableRowOne">
                                    <div class="item">No.</div>
                                    <div class="item">Port</div>
                                    <div class="item">Time Zone</div>
                                    <div class="item">Distance(NM)</div>
                                    <div class="item">Speed(Knots)</div>
                                    <div class="item">Voyage Days</div>
                                    <div class="item">Hours in Port(h)</div>
                                    <div class="item">ETA</div>
                                    <div class="item">ETD</div>
                                    <div class="item" style="width: 17px;visibility: hidden;">.</div>
                                </div>
                            </div>
                            <div class="tableBody tableBody1">
                                <div class="tableRow tableRowOne">
                                    <div class="item">1</div>
                                    <div class="item" style="text-align: left">
                                        <el-select clearable class="line-value" v-model="lineVal1" filterable
                                                   auto-complete="on" @change="copyMsg" @clear="clearText(0)"
                                                   default-first-option remote reserve-keyword
                                                   placeholder="Please enter the port" :loading="loadingText"
                                                   :remote-method="remoteMethod1">
                                            <el-option v-for="item in options4" :key="item.value" :label="item.value"
                                                       :value="item">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="item" v-model="timeArea">{{timeArea}}</div>
                                    <div class="item"></div>
                                    <div class="item"></div>
                                    <div class="item"></div>
                                    <div class="item"></div>
                                    <div class="item"></div>
                                    <div class="item">
                                        <div class="time ">
                                            <el-date-picker v-model="time7" class="timeP2 get-time7" size="mini"
                                                            type="datetime" placeholder="Please select a date"
                                                            :picker-options="pickerOptions3">
                                            </el-date-picker>
                                        </div>
                                    </div>
                                </div>
                                <!--2-->
                                <div class="tableRow tableRowOne tableRowOneHover" v-model="lineList"
                                     v-for="(lineItem, index) in lineList">
                                    <div class="item">{{index + 2}}</div>
                                    <div class="item" style="text-align: left">
                                        <el-select clearable class="line-value" v-model="lineItem.value"
                                                   @change="copyMsg2" :title="listArr[index].title"
                                                   @focus="changeList(lineItem.value,index)" size="mini" filterable
                                                   @clear="clearText(index+1)"
                                                   :disabled="listArr[index].list==null?false:listArr[index].list.length==0"
                                                   auto-complete="on" default-first-option remote reserve-keyword
                                                   placeholder="Please enter the port" :loading="loadingText"
                                                   :remote-method="remoteMethod2">
                                            <el-option v-for="(item,sindex) in listArr[index].list2" :key="sindex"
                                                       :label="item.en" :value="item.en">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="item">{{lineItem.toNameZone}}</div>
                                    <div class="item">
                                        {{lineItem.distance==null?'':Number(lineItem.distance).toFixed(2)}}
                                    </div>
                                    <div class="item">
                                        <input type="text" v-model="lineItem.speed"
                                               style="color:#fff; font-size:14px;border: none; background-color: transparent; outline: none; width: 80%; height: 100%;">
                                    </div>
                                    <div class="item">{{Number(Number(lineItem.distance/(lineItem.speed == ''?
                                        speedSpeed:lineItem.speed)/24).toFixed(2)) || ''}}
                                    </div>
                                    <div class="item">
                                        <input type="text" v-model="lineItem.stayTime"
                                               style="color:#fff; font-size:14px;border: none; background-color: transparent; outline: none; width: 80%; height: 100%;">
                                    </div>
                                    <div class="item">{{lineItem.dateEndStr}}</div>
                                    <div class="item">
                                        {{index==lineList.length-1?lineItem.dateEndStr:lineList[index+1].dateStartStr}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="operate">
                            <span class="calculate calculate1">Get Result</span>
                            <span class="item remove-line" @click="clearList">Clear</span>
                            <span class="item" @click="toUpList">Move Up</span>
                            <span class="item" @click="toDownList">Move Down</span>
                            <span class="item" @click="insertLine">Insert Row</span>
                            <span class="item" @click="deleteLine">Remove Row</span>
                        </div>
                        <div class="footer" style="background: none">
                            <span class="color_orange">*</span>
                            <span class="color_gray_1">The calculation results are for reference only.</span>
                            <span class="right_message">
                  <span class="">Port Local Time：&nbsp;&nbsp;</span>
                        <span class="color_gray_1" v-model="timeArea">{{timeArea}}</span>
                        </span>
                        </div>
                    </div>
                    <!-- 实时航速航线 -->
                    <div class="pannel_table pannel_4 route_now hide sr-dialog zIndexZoom flex-tabel">
                        <div class="pannel_title">
                            <span class="fs_speed_calcu"><i class="fs-speed-calcu"></i></span>
                            <span class="name">Route&Speed</span>
                            <div class="details_2">
                                <span class="item">Distance：<span class="color_orange" v-model="totalDistance2">{{totalDistance2.toFixed(2)}}</span>nm</span>
                                <span class="item">Days：<span class="color_orange">{{totalDays2}}</span>days</span>
                                <span class="item">
                                        <span>Speed：</span>
                            <input type="number" class="text_input line-speed-speed" value="13.0" step="0.5"
                                   v-model="speedSpeed2">
                            <span>kts</span>
                            </span>
                                <span class="item" v-if="recomendSpeed2 != 0" style='color: #3B99FC;font-weight: 700;'>
                                        <span @click="historyOpenN()" class="hover-status"
                                              style='color: #3B99FC;font-weight: 700;cursor: pointer;'>Historical AVG SPD：</span>
                            <span style="color: #FFA900;"> {{recomendSpeed2}}</span>
                            <span>kts</span>
                            </span>
                            </div>
                            <a href="javascript:;" class="close sr-close close-route-line2"><i class="fs fs-close"></i></a>
                        </div>
                        <div class="pannel_content contentWrap">
                            <div class="headContainer">
                                <div class="tableHead tableRowOne">
                                    <div class="item">No.</div>
                                    <div class="item">Port</div>
                                    <div class="item">Time Zone</div>
                                    <div class="item">Distance(NM)</div>
                                    <div class="item">Speed(Knots)</div>
                                    <div class="item">Voyage Days</div>
                                    <div class="item">Hours in Port(h)</div>
                                    <div class="item">ETA</div>
                                    <div class="item">Current Time／ETD</div>
                                    <div class="item" style="width: 17px;visibility: hidden;">.</div>
                                </div>
                            </div>
                            <div class="tableBody tableBody2">
                                <div class="tableRow tableRowOne">
                                    <div class="item">1</div>
                                    <div class="item" style="text-align: left" v-model="lineVal2" :title='lineVal2'>
                                        {{lineVal2|truncate(26)}}
                                    </div>
                                    <div class="item">{{timeGMT}}:00</div>
                                    <div class="item"> -</div>
                                    <div class="item"> -</div>
                                    <div class="item"> -</div>
                                    <div class="item"> -</div>
                                    <div class="item"> -</div>
                                    <div class="item"> -</div>
                                </div>
                                <!--2-->
                                <div class="tableRow tableRowOne tableRowOneHover"
                                     v-for="(lineItem, index) in lineList2">
                                    <div class="item">{{index + 2}}</div>
                                    <div class="item" style="text-align: left">
                                        <el-select clearable class="line-value" filterable :loading="loadingText"
                                                   loading-text="loading..." v-model="lineItem.value"
                                                   default-first-option remote reserve-keyword
                                                   placeholdxer="Please enter the port" :remote-method="remoteMethod">
                                            <el-option v-for="item in options4" :key="item.value" :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="item">{{lineItem.toNameZone}}</div>
                                    <div class="item">
                                        {{lineItem.distance==null?'':Number(lineItem.distance).toFixed(2)}}
                                    </div>
                                    <div class="item">
                                        <input type="text" v-model="lineItem.speed"
                                               style="color:#fff; font-size:14px;border: none; background-color: transparent; outline: none; width: 80%; height: 100%;">
                                    </div>
                                    <div class="item">{{Number(Number(lineItem.distance/(lineItem.speed == ''?
                                        speedSpeed:lineItem.speed)/24).toFixed(2)) || ''}}
                                    </div>
                                    <div class="item">
                                        <input type="text" v-model="lineItem.stayTime"
                                               style="color:#fff; font-size:14px;border: none; background-color: transparent; outline: none; width: 80%; height: 100%;">
                                    </div>
                                    <div class="item">{{lineItem.dateEndStr}}</div>
                                    <div class="item">
                                        {{index==lineList2.length-1?lineItem.dateEndStr:lineList2[index+1].dateStartStr}}
                                    </div>
                                    <!--<div class="item"></div>-->
                                    <!--<div class="item"></div>-->
                                </div>
                            </div>
                        </div>
                        <div class="operate">
                            <span class="calculate calculate2">Get Result</span>
                            <span class="item remove-line" @click="clearList2">Clear</span>
                            <span class="item" @click="toUpList2">Move Up</span>
                            <span class="item" @click="toDownList2">Move Down</span>
                            <span class="item" @click="insertLine2">Insert Row</span>
                            <span class="item" @click="deleteLine2">Remove Row</span>
                        </div>
                        <div class="footer" style="background: none">
                            <span class="color_orange">*</span>
                            <span class="color_gray_1">The calculation results are for reference only.</span>
                            <span class="right_message">
                  <span class="">Port Local Time：&nbsp;</span>
                        <span class="color_gray_1"> -<!--{{timeGMT}}--> </span>
                                <!--<div class="f_up_down">-->
                                <!--<i class="fs-drop-down up" onclick="alert(1)"></i>-->
                                <!--<i class="fs-drop-down down" onclick="alert(-1)"></i>-->
                                <!--</div>-->
                        </span>
                        </div>
                    </div>

                    <!--我的船队-->
                    <div class="my-ships-wrap sr-dialog zIndexZoom bg-color-default my-ships-wrap-js hide">
                        <div class="my-ships-header">
                            <span class="f_ship"><i class="fs-historical-route"></i></span>
                            <span class="pad-5">My Vessel Lists</span>
                            <span class="font14" v-show="myShipsArr.length!=0"> Total <span class="color-yellow">{{myShipsArr.length==0? 0 : myShipsArr.length}}</span> Ships </span>
                            <a href="javascript:;" class="my-ships-close" @click="myShipsClose">
                                <i class="fs fs-close text-grayLighter valign-middle"></i>
                            </a>
                        </div>
                        <div v-show="myShipsArr.length!=0" v-bind:style="{ height: setTable + 'px' }" class="flexLeft">
                            <div id="left_div2" style="position: absolute; top: 0px; width: 100px; height: 185px; margin-top: 2.5px;">
                                <table v-show="myShipsArr.length!=0">
                                    <thead>
                                    <tr class="lh30 bg-thead">
                                        <th class="clumWidth">No.</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="my-ships-tr-js" v-for="(myShipsArrs, index) in myShipsArr" :dataLat="myShipsArrs.lat" :dataLng="myShipsArrs.lng" :dataImo="myShipsArrs.imo">
                                        <td class="clumWidth">{{index+1}}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="my-ships-content" id="tableContent">
                            <div class="my-ships-content-hide" v-show="myShipsArr.length==0">
                                No Vessels Vollected
                            </div>
                            <div>
                                <table v-show="myShipsArr.length!=0">
                                    <thead>
                                    <tr class="lh30 bg-thead">
                                        <th class="clumWidth">序号</th>
                                        <th>Vessel Name</th>
                                        <th>IMO</th>
                                        <th>MMSI</th>
                                        <th>DWT(MT)</th>
                                        <th>Vessel type</th>
                                        <th>Vessel type</th>
                                        <th>Speed(Knots)</th>
                                        <th>Set</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="my-ships-tr-js" v-for="(myShipsArrs, index) in myShipsArr" :dataLat="myShipsArrs.lat" :dataLng="myShipsArrs.lng" :dataImo="myShipsArrs.imo">
                                        <td class="clumWidth">{{index+1}}</td>
                                        <td>{{myShipsArrs.shipName}}</td>
                                        <td >{{myShipsArrs.imo}}</td>
                                        <td >{{myShipsArrs.mmsi}}</td>
                                        <td>{{myShipsArrs.sdwt}}</td>
                                        <td>{{myShipsArrs.vesselTypeEn}}</td>
                                        <td>{{myShipsArrs.draft}}</td>
                                        <td>{{myShipsArrs.speed}}</td>
                                        <td class="text-blu my-ships-unfollow"><span @click.stop="unfollow(myShipsArrs.imo, myShipsArrs.mmsi)">Delete Vessel</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!--港口详情-->
                    <div class="port-details-wrap sr-dialog background-greyLight zIndexZoom hide">
                        <div class="port-details-header">
                            <span class="f_ship"><i class="fs fs-port"></i></span>
                            <span class="pad-5">Port Details</span>
                            <a href="javascript:;" class="port-details-close port-details-close1">
                                <i class="fs fs-close"></i>
                            </a>
                        </div>
                        <div class="port-details-nav">
                            <div class="port-details-img-wrap" v-show="infoPortType == 1 && infoPortType != null">
                                <el-carousel trigger="click" width="300px" height="150px">
                                    <el-carousel-item v-for="item in infoPortImg" :key="item">
                                        <img :src="item" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                            <div class="port-details-video-wrap" v-show="infoPortType == 2 && infoPortType != null">
                                <video v-for="item in infoPortVideo" :src="item" controls="controls" width="320" height="150" controlsList="nodownload"></video>
                            </div>
                        </div>
                        <div class="port-details-content">
                            <div class="pad-bottom-10">
                                <p class="font18 text-333">{{initPortNameEn}}</p>
                                <div class="font14 pad-top-5">
                                    <span>{{initPortCurrent}}</span>
                                    <span class="pad-left-5">.{{leftinfo.weatherEn}}</span>
                                    <a class="port_icon dis-inline-block mar-left-10" @click="portWeathers" v-show="leftinfo.weatherEn != null" style="color:#fff;">
                                        <i class="fs-qixiang bg_color_24" title="Port Weather"></i>
                                    </a>
                                </div>
                                <div style="left: 320px;" class="port-details-circle" @click="portDetailsInfo(initPortNameEn)" v-show="infoPortType != null">
                                    Details
                                </div>
                            </div>
                            <div class="port-details-footer">

                                <label class="current-port" v-show="portForeign == 0">
                                    <a class="port_icon" style="color:#fff">
                                        <i class="fs-chufa bg_color_21"></i>
                                        <span class="">Nearby boat</span>
                                    </a>
                                </label>

                                <label class="predict-port" v-show="countryStatus == 1">
                                    <a class="port_icon" style="color:#fff">
                                        <i class="fs-yuji bg_color_22"></i>
                                        <span class="">Vessels Inbound</span>
                                    </a>
                                </label>


                                <label class="history-port" v-show="countryStatus == 1">
                                    <a class="port_icon" style="color:#fff" >
                                        <i class="fs-lishi bg_color_23"></i>
                                        <span class="">Port Arrivals</span>
                                    </a>
                                </label>

                                <label v-show="portQueuingArr.length != 0">
                                    <a class="port_icon" style="color:#fff" @click="portQueuing(initPortNameEn)">
                                        <i class="fs-qixiang bg_color_24"></i>
                                        <span class="">Queue Up</span>
                                    </a>
                                </label>
                            </div>
                        </div>
                    </div>

                    <!--港口详细信息-->
                    <div class="port-details-info sr-dialog zIndexZoom hide">
                        <div class="port-details-info-header">
                            <h2 class="" v-text="portInfo.titleEn"></h2>
                            <a href="javascript:;" class="port-details-close" @click="portInfoClose">
                                <i class="fs fs-close text-gray"></i>
                            </a>
                        </div>
                        <div class="port-details-info-content" v-html="portInfo.htmlEn"></div>
                    </div>

                    <!--港口排队-->
                    <div class="port-queuing-wrap sr-dialog zIndexZoom hide">
                        <div class="port-queuing-header">
                            <span class="f_ship"><i class="fs fs-gkpd"></i></span>
                            <span class="pad-5">{{initPortNameEn}} {{isPortDate}} Port queuing plan</span>
                            <a href="javascript:;" class="port-queuing-close" @click="portQueuingClose">
                                <i class="fs fs-close text-blu text-grayLighter"></i>
                            </a>
                        </div>
                        <div class="port-queuing-center">
                            <table>
                                <thead>
                                    <tr class="lh30 bg-thead">
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Vessel Name</th>
                                    <th>Vessel Type</th>
                                    <th>Commodity</th>
                                    <th>Cargo Quantity</th>
                                    <th>Draught</th>
                                    <th>Previous Port</th>
                                    <th>ETA</th>
                                    <th>ETB</th>
                                    <th>ETD</th>
                                    <th>Berth</th>
                                    <th>Note</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in portQueuingArr">
                                    <td>{{item.dateFormatEn}}</td>
                                    <td>{{item.statusEn}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.type}}</td>
                                    <td>{{item.goodsEn}}</td>
                                    <td>{{item.quantity}}{{item.quantityUnitEn}}</td>
                                    <td>{{item.draft}}</td>
                                    <td>{{item.lastPortEn}}</td>
                                    <td>{{item.exArriveFormatEn}}</td>
                                    <td>{{item.exNearFormatEn}}</td>
                                    <td>{{item.exLeaveFormatEn}}</td>
                                    <td>{{item.berth}}</td>
                                    <td>{{item.remark}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!--控制面板-->
                    <div class="ctrl-wrap sr-dialog zIndexZoom hide">
                        <div class="ctrl-header">
                            <span class="f_ship"><i class="fs fs-cog"></i></span>
                            <span class="pad-5">Settings</span>
                            <a href="javascript:;" class="ctrl-close" @click="closeCtrlWrap">
                                <i class="fs fs-close text-blu text-grayLighter"></i>
                            </a>
                        </div>
                        <div class="ctrl-center">
                            <div class="ctrl-helght ctrl-explain">
                                <div class="ctrl-span">Explain：</div>
                                <ul class="ctrl-ul">
                                    <li>
                                        <div>
                                            <i class="fs fs-kongzai text-green"></i>
                                        </div>
                                        <div class="ctrl-kongzai">Ballast</div>
                                    </li>
                                    <li>
                                        <div>
                                            <i class="fs fs-manzai text-green"></i>
                                        </div>
                                        <div class="ctrl-kongzai">Laden</div>
                                    </li>
                                    <li>
                                        <div>
                                            <i class="fs fs-kongzai text-yell"></i>
                                        </div>
                                        <div class="ctrl-kongzai">Position<br>Posted<br>Ballast</div>
                                    </li>
                                    <li>
                                        <div>
                                            <i class="fs fs-manzai text-yell"></i>
                                        </div>
                                        <div class="ctrl-kongzai">Position<br>Posted<br>Laden</div>
                                    </li>
                                </ul>
                            </div>
                            <div class="ctrl-helght ctrl-type">
                                <span>Vessel Type：</span>
                                <div class="ctrl-type-select">
                                    <label class="item">
                                        <a class="f_checkbox checked" href="javascript:;" uuid="0">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>VLCC</label>
                                    </label>
                                    <label class="item">
                                        <a class="f_checkbox checked" href="javascript:;" uuid="1">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>ULCC</label>
                                    </label>
                                    <label class="item">
                                        <a class="f_checkbox checked" href="javascript:;" uuid="2">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>Suezmax</label>
                                    </label>
                                    <label class="item">
                                        <a class="f_checkbox checked" href="javascript:;" uuid="3">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>Aframax</label>
                                    </label>
                                </div>
                            </div>
                            <div class="ctrl-helght ctrl-port">
                                <span>Port：</span>
                                <div class="ctrl-type-radiu">
                                    <label class="item">
                                        <a class="f_checkbox checked a1" href="javascript:;" uuid="1">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>Visible</label>
                                    </label>
                                    <label class="item pad-left-35">
                                        <a class="f_checkbox a2" href="javascript:;" uuid="2">
                                            <i class="fs-checkbox"></i>
                                        </a>
                                        <label>Non-Visible</label>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <!--<div id="_1111111111">{{reachLogs1}}</div>-->
    </div>
</template>


<script>
    import drag from '../directive/drag'
    import axios from 'axios';
    import _ from 'lodash'
    // import mapDrag from '../../static/mapDrag'
    import {
        userLoad,
        Lloydsfile,
        navigationWarning, //海盗军演
        weatherTime, //气象海况
        weatherForecast, //三天气象预报
        typhoon, //台风
        homeInfo, //通知信息
        portWeather, //港口天气
        myShips,
        ShipPlateDetail,
    } from '../api/ship';
    import {
        Loading
    } from 'element-ui';
    import '../../static/markerclusterer';
    import {
        sideBth,
        setZIndex,
        loggingStatusFun,
        configUrlFun,
    } from '../action/js/router-map'

    export default {
        data() {
            return {
                memberId: null,
                userStorage: null,
                portForeign:'',
                isPortDate:'',
                setTable:0,
                countryStatus: '',
                portQueuingArr:[],
                portInfo:{},
                infoPortImg:[],
                infoPortVideo:[],
                infoPortType:null,
                ifCollect:0,
                myShipsArr: [],
                isPortLatLng: null,
                zoomFlag: false,
                zone: '',
                initPortName: '',
                initPortNameEn:'',
                initPortCurrent: '',
                userName: null,
                isFlagMsg: true,
                timeRange: [],
                loadPortArr: [],
                loadPort1: '', //港口
                time0: new Date(), //截止日期
                dwt1: '', //>>>>>>
                dwt2: '', //>>>>>>
                portDataValue: 1,
                portLog1: [], //>>>>>>港口记录1
                portLog2: [], //>>>>>>港口记录2
                portLog3: [], //>>>>>>港口记录3
                zaiZhong1: {}, //>>>>>>三个靠港弹窗的载重吨单位
                zaiZhong2: {}, //>>>>>>三个靠港弹窗的载重吨单位
                zaiZhong3: {}, //>>>>>>三个靠港弹窗的载重吨单位
                export1: '',
                export2: '',
                export3: '',
                time5: new Date(), //>>>>>>>>>>>>>>>
                time6: new Date(new Date() - (-(24 * 30) * 60 * 60 * 1000)), //>>>>>>>>>>>>>>>
                time7: new Date(), //>>>>>>航速航线日期
                time8: new Date(new Date() - (24 * 30) * 60 * 60 * 1000), //>>>>>>>>>>>>>>>
                time9: new Date(), //>>>>>>
                ulFlag: false,
                shipMessage: {},
                full_search: '',
                matchkey: '',
                fuzzyMsgs: [],
                time1: new Date(new Date() - (24 * 7) * 60 * 60 * 1000),
                time2: new Date(),
                reachLogs: [], //靠港记录
                ulFlagFrom: true, //历史航线发货港
                full_searchFrom: '', //历史航线发货港value
                fuzzyMsgsFrom: [], //历史航线发货港模糊搜索列表
                loadPortArrEnd: [], //历史航线到货港列表
                loadPort3: '', //历史航线到货港value
                num1: '', //历史航线DWT
                num2: '', //历史航线DWT
                time3: new Date(new Date() - (24 * 30) * 60 * 60 * 1000), //历史航线起始时间
                time4: new Date(), //历史航线结束时间
                reachLogsHistory: [], //历史航线查询记录列表
                historyTotal: 0, //历史航线查询记录总条数
                exportMsg: '', //历史航线导出数据
                total: 0,
                total1: 0,
                pageNum: 1,
                pageSize: 5,
                pageNum1: 1,
                loadingText: false,
                reachLogs1: [], //靠港记录
                loading: {}, //loading
                url: configURL.shipUrl,
                weatherUrl: configURL.weatherUrl,
                pickerOptions0: {
                    disabledDate: (time) => {
                        let curDate = (new Date()).getTime();
                        let seven = 7 * 24 * 3600 * 1000;
                        let months = curDate - seven;
                        return time.getTime() > Date.now()
                        /*|| time.getTime() > months;*/
                    }
                },
                pickerOptionss:{
                    disabledDate: (time) => {
                        let _now = Date.now(),
                            seven = 180 * 24 * 60 * 60 * 1000,
                            sevenDays = _now - seven;
                        return /*time.getTime() > _now || */time.getTime() < sevenDays;
                    }
                },
                pickerOptions1: {
                    disabledDate: (time) => {
                        return time.getTime() < this.value1 || time.getTime() > Date.now();
                    }
                },
                pickerOptions2: {
                    disabledDate: (time) => {
                        //
                        //let curDate = (new Date()).getTime();
                        //
                        //let seven = 180 * 24 * 3600 * 1000;
                        //let months = curDate - seven;
                        //
                        //return time.getTime() > Date.now() || time.getTime() < months;
                        //return time.getTime() > new Date(this.time4.toString()).getTime();
                        if (time.getTime() < 1388505600000) {
                            return true
                        }

                        return time.getTime() > this.endDate
                    }
                },
                pickerOptions3: {
                    disabledDate: (time) => {
                        //return time.getTime() < this.value1 || time.getTime() > Date.now();
                        //return time.getTime() > Date.now();
                    }
                },
                pickerOptionsHis: {

                    disabledDate: (time) => {

                        return time.getTime() < this.time3

                    }

                },
                pickerOptionsTyphoon: {
                    disabledDate: (time) => {
                        if (this.typhoonTime1) { //这里就涉及到日期的指定了  setMonth()函数可以设置月份
                            let currentTime = this.typhoonTime1;
                            let threeMonths = currentTime.setMonth(currentTime.getMonth() + 2);
                            //一开始我没加下面减三个月的那个语句，他的值会一直累加
                            currentTime.setMonth(currentTime.getMonth() - 2);
                            return time.getTime() < this.typhoonTime1 || time.getTime() > threeMonths;
                        }
                    }
                },
                pickerOptions4: {
                    disabledDate: (time) => {
                        return time.getTime() < Date.now();
                    }
                },
                pickerOptions5: {
                    disabledDate: (time) => {
                        return time.getTime() <= this.time5;
                    }
                },
                pickerOptions6: {
                    disabledDate: (time) => {
                        return time.getTime() >= this.time9;
                    }
                },
                options4: [], //>>>>>>>>>航速航线模糊搜索
                list: [],
                states: [],
                listArr: [{
                    list: [],
                    list2: [],
                    title: ''
                },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                    {
                        list: [],
                        list2: [],
                        title: ''
                    },
                ],
                lineList: [{
                    value: '',
                    distance: '',
                    stayTime: '',
                    speed: 13
                },
                    {
                        value: '',
                        distance: '',
                        stayTime: '',
                        speed: 13
                    },
                    {
                        value: '',
                        distance: '',
                        stayTime: '',
                        speed: 13
                    },
                    {
                        value: '',
                        distance: '',
                        stayTime: '',
                        speed: 13
                    },
                ], //>>>>>>>航线航速关联港口数组
                listIndex: 0,
                recomendSpeed: 0, //>>>>>>>航速航线推荐航速
                totalDistance: 0, //>>>>>>>航速航线海里
                timeArea: '', //>>>>>>>航速航线天数时区
                speedSpeed: 13.0, //>>>>>>>航速航线航速
                lineVal1: '', //>>>>>>>>>航速航线第一个港口
                lineList2: [{
                    value: '',
                    stayTime: '',
                    speed: ''
                },
                    {
                        value: '',
                        stayTime: '',
                        speed: ''
                    },
                    {
                        value: '',
                        stayTime: '',
                        speed: ''
                    },
                    {
                        value: '',
                        stayTime: '',
                        speed: ''
                    },
                ], //>>>>>>>实时航线航速关联港口数组
                shipMMsi: '', //>>>>>>>实时航速航线mmsi
                recomendSpeed2: 0, //>>>>>>>航速航线推荐航速
                totalDistance2: 0, //>>>>>>>航速航线海里
                timeGMT: null, //>>>>>>>实时航速航线天数时区
                speedSpeed2: 13.0, //>>>>>>>实时航速航线航速
                lineVal2: '', //>>>>>>>>>实时航速航线第一个港口
                isLatLng: {}, ///实时经纬度
                urlPortName: '', //>>>>>>>>>>//
                mapDataFlag: true,
                daliao: {
                    basic: {},
                    pis: {},
                    dimension: {},
                    built: {},
                    companyname: {},
                    pscs: [],
                    classfications: [],
                }, //劳氏档案
                typhoonTime1: new Date(new Date() - (24 * 60) * 60 * 60 * 1000),
                typhoonTime2: new Date(),
                weatherTimes: [], //气象时间列表
                weatherTimesIndex: 0,
                weatherTimesNum: 0,
                threeWeathertitle: [],
                threeWeathertitle1: [],
                threeWeathertitle2: [],
                threeWeatherbody: [],
                typhoonResult: [],
                typhoonPath: [],
                typhoonName: '',
                myMap: {},
                homeInfox: '', //通知栏
                leftinfo: {}, //港口气象左边
                rightinfo: [], //港口气象右边
                recomendSpeedH: [], //历史参考数据
                portNew: '', //港口气象
                recomendSpeedN: [], //实时历史参考数据
                index: 1,
            }
        },
        components: {},
        directives: {
            drag
        },
        methods: {
            isLogin(){

                var obj = {
                    "imo": $('.get-imo').text().toString(),
                    "mmsi": $('.get-mmsi').text().toString(),
                    "uuid":""
                };

                ShipPlateDetail(obj).then(res => {

                    if(res.status == 401){

                        window.location.href = configURL.sys + '/login.htm?returnUrl=' + encodeURIComponent(window.location.href);

                    }else if(res.status == 403){

                        this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No permission</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });

                    }else{
                        window.location.href = configURL.shipUrl + '/page/#/bootinfo?imo='+ this.shipMessage.IMO +'&mmsi='+ this.shipMessage.MMSI +'&type=3';
                    }

                });

            },
            //<<<<选择时间改变轨迹查询
            changeRouteTime() {
                $('.tryQuery').show();
                $('.abolish').hide();
            },
            getActiveIndex() {
                window.open(configURL.index, "_self");
            },
            getin() {
                userLoad().then((res) => {

                    if(res.status != 2){

                        var userData = res.datas;

                        this.userStorage = userData;

                        this.memberId = userData.memberId;

                        if (userData) {

                            this.userName = res.datas.userName;

                        } /*else {
                                window.location.href = configURL.sys + '/login.htm?returnUrl=' + configURL.shipUrl + '/page/#/routemap';
                            }*/

                        localStorage.setItem('user',JSON.stringify(userData));

                    }else{

                        var userData = null;

                        this.userStorage = userData;

                        this.memberId = null;

                        localStorage.setItem('user',JSON.stringify(userData));

                    }

                })
            },
            //
            signOut() {
                this.userName = '';
                window.localStorage.removeItem('user');
                window.location.href = this.removeHref('loging');
                window.location.href = configURL.sys + "/logout.htm";
                window.location.href = configURL.sys + '/logout.htm?returnUrl=' + configURL.shipUrl + '/page/#/'
            },

            registerClick(){

                if(this.userStorage == null){

                    window.location.href = configURL.sys + '/login.htm?returnUrl=' + encodeURIComponent(window.location.href);

                }

            },
            //
            removeHref(str) {
                var url = window.location.href;
                var index = window.location.href.indexOf('?');
                if (index == -1) return url;
                var newUrl = window.location.href.substring(0, index);
                url = window.location.href.substring(index + 1);
                var urlArr = url.split('&');
                for (var i = 0; i < urlArr.length; i++) {
                    if (urlArr[i].indexOf(str) != -1) {
                        urlArr.splice(i, 1);
                    }
                }
                var newQuery = '';
                if (urlArr.length == 0) {
                    newQuery += '';
                } else if (urlArr.length == 1) {
                    newQuery = '?' + urlArr.join("");
                } else {
                    newQuery = '?' + urlArr.join("&");
                }
                return newUrl + newQuery;
            },

            //模糊搜索
            fuzzySearch() {
                this.index = 1;

                var that = this;
                if (this.full_search != '') {
                    var obj = {
                        keyword: this.full_search
                    };
                    $.ajax({
                        type: "POST",
                        url: that.url + "/sysShip/findSysShipByKeyword.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            that.fuzzyMsgs = data.datas;
                            setTimeout(function () {
                                $('.ul-list-data').find('li').eq(0).addClass('fullcurrent')
                            })
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    });
                } else {
                    return
                }
                this.full_search != '' ? this.ulFlag = true : this.ulFlag = false;
            },

            //获取焦点显示用户输入偏好
            fuzzySearchShow(){

                this.ulFlag = true;

                $('.fullz-z ul').show();

                $.ajax({
                    type: "GET",
                    url: this.url + "/api/searchHistory/searchHistory.json",
                    success: (data) => {

                        this.fuzzyMsgs = data;

                        setTimeout(()=> {
                            $('.ul-list-data').find('li').eq(0).addClass('fullcurrent');
                        })

                    },

                    error: function (error) {
                        console.log(error)
                    }

                });

            },

            fuzzySearchBlur(e){

                if( e.target.className != 'sear_input' && e.target.parentNode.parentNode.className != 'ul-list-data'){

                    this.ulFlag = false;

                }

            },

            //搜索框赋值
            pitchOn(msg, matchkey) {
                this.full_search = msg;
                this.matchkey = matchkey;
                this.ulFlag = false;
            },

            //港口查询
            reqList() {
                $('.zIndexZoom').removeClass('zIndex');
                $('.pannel_1').addClass('zIndex');
                $('.pannel_1').toggleClass('hide');
            },

            //搜索港口分页
            pageFn(page) {
                var that = this;
                var obj = {
                    "portName": this.loadPort1,
                    "type": $('.ship-type-wrap').attr('data-value'),
                    "endTime": new Date(this.time0).getTime(),
                    "deadWeight": $('.load-wrap').attr('data-value'),
                    "naviStatus": $('.voyage-wrap').attr('data-value'),
                    "pageSize": that.pageSize,
                    "pageIndex": page,
                };
                $.ajax({
                    type: "POST",
                    url: this.url + "/api/appjson/location.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        that.reachLogs = data.datas.data;
                        that.total = data.total;
                    },
                    error: function (error) {
                        console.log(error)
                    }
                });
            },
            //历史航线
            reqListHIstory() {
                var that = this;
                $('.zIndexZoom').removeClass('zIndex');
                $('.sr-d7').addClass('zIndex');
                $('.sr-d7').toggleClass('hide');
                if ($('.sr-d7').hasClass('hide')) {
                    $('.sr-d7').css({
                        'display': 'none'
                    });
                } else {
                    let topSize = $(".pannel_1").is(":hidden") ? '1.5%' : $(".pannel_1").height() + 80 + 'px';

                    $('.sr-d7').css({'display': 'block', 'left': '118px', 'top': topSize});
                }
            },
            //历史航线查询
            addBtnHistory() {
                if (this.full_searchFrom == '') {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Loading Port Information can not be blank</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                    return false
                }
                if (this.loadPort3 == '') {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Discharge Port Information can not be blank</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                    return false
                }
                //                if($('.ship-type-wrapHistory').attr('data-value')==''){
                //                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">船型不能为空</span>', 'Prompt', {
                //                        dangerouslyUseHTMLString: true,
                //                        showClose: false,
                //                    });
                //                    return false
                //                }
                /*DWT数据判断*/
                if (this.num1 == '' || this.num2 == '') {
                    //                    this.$alert('<span style="text-align: center;">DWT数据不能为空</span>', 'Prompt', {
                    //                        dangerouslyUseHTMLString: true,
                    //                        showClose: false,
                    //
                } else {
                    var num = isNaN(this.num1) || isNaN(this.num2);
                    if (num) {
                        this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please enter number</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                        return false
                    } else {
                        if (parseFloat(this.num2) - parseFloat(this.num1) <= 0) {
                            this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please enter number order correctly</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                            return false
                        }
                    }
                }
                /*判断日期*/
                if (this.time3 == '' || this.time4 == '' || this.time3 == null || this.time4 == null) {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Date can not be blank</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                    return false
                } else {
                    if (this.time3 > this.time4) {
                        this.$alert('<span style="text-align: center; display: block; font-weight: bold;">End date cannot be less than start date</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                        return false
                    }
                    var tday = parseInt((this.time4.getTime() - this.time3.getTime()) / 86400000)
                    if (tday > 180) {
                        this.$alert('<span style="text-align: center; display: block; font-weight: bold;">earching range only available within 180 days</span>', 'information', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                        return false
                    }
                    //船型
                    var $$shipType = $('.ship-type-wrapHistory').attr('data-value');
                    //时间类型
                    var $$timeType = $('.voyageHistory-wrap').attr('data-value');
                    /*历史航线查询*/
                    var that = this;
                    var dataObj = {
                        "fromPort": this.full_searchFrom,
                        "toPort": this.loadPort3,
                        "sizeType": $$shipType,
                        "timeType": $$timeType,
                        "dwtMaxValue": this.num2,
                        "dwtMinValue": this.num1,
                        "startTime": new Date(this.time3.toString()).getTime(),
                        "endTime": new Date(this.time4.toString()).getTime(),
                    };
                    /*加载中*/
                    let loadingInstance = Loading.service({
                        lock: true,
                        text: 'Loading',
                        target: document.querySelector('.sr-body'),
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    /*修改load样式*/
                    $('.el-loading-spinner i.el-icon-loading').css({
                        fontSize: '30px'
                    });
                    $('.el-loading-spinner .el-loading-spinner').css({
                        fontSize: '30px'
                    });
                    $('.el-loading-mask').css({
                        zIndex: 10000000000
                    });
                    $.ajax({
                        type: "POST",
                        url: that.url + "/api/geojson/historyport.json",
                        data: JSON.stringify(dataObj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            loadingInstance.close();
                            if (data.datas.data.length > 0) {
                                that.reachLogsHistory = data.datas.data;
                                $('#sr-d8').css({
                                    'display': 'block'
                                });
                                //导出数据
                                that.exportMsg = `${that.url}/api/export/en/historyport.htm?fromPort=${that.full_searchFrom}&toPort=${that.loadPort3}&sizeType=${$$shipType}&timeType=${$$timeType}&dwtMaxValue=${that.num2}&dwtMinValue=${that.num1}&startTime=${new Date(that.time3.toString()).getTime()}&endTime=${new Date(that.time4.toString()).getTime()}`
                            } else {
                                that.$alert('<span style="text-align: center; display: block; font-weight: bold;">No historical route data</span>', 'Prompt', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                });
                            }
                        },
                        error: function (error) {
                            loadingInstance.close();
                            console.log(error)
                        }
                    });
                }
            },
            //发货港模糊搜索
            fuzzySearchFrom(direction) {
                var port = this.full_searchFrom,
                    flag = this.ulFlagFrom;
                var that = this;
                if (port != '') {
                    var obj = {
                        keyword: port
                    };
                    $.ajax({
                        type: "POST",
                        url: that.url + "/api/foreign/ports.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            that.fuzzyMsgsFrom = data.datas;
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    });
                } else {
                    return
                }
                port != '' ? flag = true : flag = false;
            },
            //发货港模糊搜索框赋值
            pitchOnFrom(msg) {
                this.full_searchFrom = msg.portNameEn;
            },
            //清空按钮
            clearBtn() {
                this.loadPort1 = '';
                this.loadPort2 = '';
                this.time0 = '';
                $('.load-wrap .sr-chk').removeClass('checked');
                $('.voyage-wrap .sr-chk').removeClass('checked');
                $('.a-flag').addClass('checked');
                $('.load-wrap').attr('data-value', '1');
                $('.voyage-wrap').attr('data-value', '1');
            },
            //靠港查询
            harborSearch() {
                var that = this;
                if (that.time1 != '' && that.time2 != '') {
                    //向后台传递的数据
                    var obj = {
                        imo: $('.get-imo').text(),
                        startTime: new Date(this.time1).getTime(),
                        endTime: new Date(this.time2).getTime(),
                        "pageSize": -1,
                        "pageIndex": 0,
                    };
                    let loadingInstance = Loading.service({
                        lock: true,
                        text: 'Loading',
                        target: document.querySelector('.sr-body'),
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    /*修改load样式*/
                    $('.el-loading-spinner i.el-icon-loading').css({
                        fontSize: '30px'
                    });
                    $('.el-loading-mask').css({
                        zIndex: 10000000000
                    });
                    $('.el-loading-spinner .el-loading-spinner').css({
                        fontSize: '30px'
                    });
                    // $('.sr-d3').css({'display': 'block', 'left': '32.5%', 'top': '10%'});
                    /*var obj = {
                        "imo": 9315367,
                        "startTime": "1489142976000",
                        "endTime": "1521616176000",
                        "pageSize": that.pageSize,
                        "pageIndex": that.pageNum1,
                    };*/
                    $.ajax({
                        type: "POST",
                        url: this.url + "/api/appjson/history.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {

                            var loggingStatus = loggingStatusFun(data);

                            if(!loggingStatus){return};

                            if (data.datas != null && data.datas.length != 0) {
                                loadingInstance.close();
                                that.reachLogs1 = data.datas;
                                that.total1 = data.total;
                                $('.reach-popout').show();
                                setZIndex('.pannel_9', '.reach-popout');
                            } else {
                                loadingInstance.close();
                                that.$alert('<span style="text-align: center; display: block; font-weight: bold;">no data on current date</span>', 'Prompt', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                });
                            }
                        },
                        error: function (error) {
                            loadingInstance.close();
                            console.log(error)
                        }
                    });
                } else {
                    that.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please enter date</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            },
            //靠港查询分页
            pageFn1(page) {
                var that = this;
                var obj = {
                    imo: $('.get-imo').text(),
                    startTime: new Date(this.time1).getTime(),
                    endTime: new Date(this.time2).getTime(),
                    "pageSize": this.pageSize,
                    "pageIndex": page,
                };
                $.ajax({
                    type: "POST",
                    url: this.url + "/api/appjson/history.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        that.reachLogs1 = data.datas;
                        that.total1 = data.total;
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            search_input(e) {
                $(e.target).val('');
            },
            full_input() {
                $('.fullz-z ul').html('');
                if (this.full_search == '') {
                    $('.fullz-z').css('display', "none");
                } else {
                    var html = '<li><span class="full_l">11111111</span> <span class="full_r">船名</span></li><li><span class="full_l">11111111</span> <span class="full_r">船名</span></li>'
                    $('.fullz-z ul').append(html);
                    $('.fullz-z').css('display', "block");
                }
            },
            //敬请期待
            coming() {
                this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Stay tuned</span>', 'Prompt', {
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                });
            },
            //>>>>>>>>>航速航线模糊搜索功能
            remoteMethod(query) {
                if (query !== '') {
                    this.loadingText = true;
                    setTimeout(() => {
                        this.loadingText = false;
                        this.options4 = this.list.filter(item => {
                            return item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                        });
                    }, 50);
                } else {
                    this.options4 = [];
                }
            },
            remoteMethod1(query) {
                var _this = this;
                if (query !== '') {
                    this.loadingText = true;
                    setTimeout(() => {
                        this.loadingText = false;
                        var arr = [];
                        _this.options4 = [];
                        _this.list.forEach(function (item) {
                            if (item.label.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                                arr.push(item)
                            }
                        });
                        _this.list.forEach(function (item) {
                            if (item.label.toLowerCase().indexOf(query.toLowerCase()) > 0) {
                                arr.push(item)
                            }
                        });
                        _this.options4 = arr;
                    }, 1);
                } else {
                    this.options4 = [];
                }
            },
            //>>>>>>>>>航速航线模糊搜索功能
            remoteMethod2(query) {
                var _this = this;
                var breakNum = true;
                for (var i = 0; i < this.listIndex + 1; i++) {
                    if ($('.route_history .line-value').eq(i).find('.el-input__inner').val() == '') {
                        breakNum = false;
                        break;
                    }
                }
                if (breakNum) {
                    if (query !== '') {
                        this.loadingText = true;
                        setTimeout(() => {
                            this.loadingText = false;
                            var arr = new Array([], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []);
                            for (var i = 0; i < _this.listIndex + 1; i++) {
                                _this.listArr[i].list.forEach(function (item) {
                                    if (item.en.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                                        arr[i].push(item)
                                    }
                                });
                                _this.listArr[i].list.forEach(function (item) {
                                    if (item.en.toLowerCase().indexOf(query.toLowerCase()) > 0) {
                                        arr[i].push(item)
                                    }
                                });
                                _this.listArr[i].list2 = arr[i]
                            }
                        }, 1);
                    } else {
                        _this.listArr.forEach(function (item, index) {
                            if (index > _this.listIndex) {
                                item.list2 = []
                            }
                        })
                    }
                }
            },
            //>>>>>>>>>航速航线插入行功能
            insertLine() {
                this.lineList.push({
                    value: '',
                    distance: '',
                    stayTime: '',
                    speed: this.speedSpeed
                });
                setTimeout(function () {
                    $('.pannel_4 .el-input__inner').css({
                        backgroundColor: 'rgb(33,33,33)',
                        color: '#e5e5e5',
                        height: '30px',
                        lineHeight: '30px',
                        border: 'none',
                        fontSize: '14px',
                    });
                    $('.pannel_4 .get-time7 .el-input__inner').css({
                        paddingRight: '32.5px',
                        fontSize: '12px',
                    });
                    $('.pannel_4 .tableRowOneHover.activeItem .el-input__inner').css({
                        background: 'rgba(33, 0, 255, 0.5)'
                    });
                    $('.el-select.line-value').css({
                        width: '95%'
                    });
                }, 0)
            },
            //>>>>>>>>>航速航线插入行功能
            insertLine2() {
                this.lineList2.push({
                    value: ''
                });
                setTimeout(function () {
                    $('.pannel_4 .el-input__inner').css({
                        backgroundColor: 'rgb(33,33,33)',
                        color: '#e5e5e5',
                        height: '30px',
                        lineHeight: '30px',
                        border: 'none',
                        fontSize: '14px',
                    });
                    $('.pannel_4 .get-time7 .el-input__inner').css({
                        paddingRight: '32.5px',
                        fontSize: '12px',
                    });
                    $('.el-select.line-value').css({
                        width: '95%'
                    });
                }, 0)
            },
            //>>>>>>>>>航线航速删除行功能
            deleteLine() {
                if (this.lineList.length > 1) {
                    this.lineList.pop();
                    this.listArr[this.lineList.length - 1].list = []
                } else {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Keep at least two ports</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            },
            //>>>>>>>>>实时航线航速删除行功能
            deleteLine2() {
                if (this.lineList2.length > 1) {
                    this.lineList2.pop();
                } else {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Keep at least one port</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            },
            //>>>>>>>>>航线航速清空列表功能
            clearList() {
                var len = this.lineList.length;
                this.lineList = [];
                for (let i = 0; i < len; i++) {
                    this.lineList.push({
                        value: ''
                    })
                }
                this.speedSpeed = 13;
                this.lineVal1 = '';
                this.time7 = new Date();
                this.totalDistance = 0;
                this.recomendSpeed = 0;
                $('.line-ship-type a').removeClass('checked checked_2');
                $('.line-ship-type').eq(0).find('a').addClass('checked checked_2');
                $('.line-speed-type').attr('data-value', 'VLCC');
            },
            //>>>>>>>>>航线航速上移功能
            toUpList() {
                var index = $('.tableBody1 .activeItem').parent().index() - 1;

                var _this = this;

                if (index > 0) {
                    [_this.lineList[index - 1], _this.lineList[index]] = [_this.lineList[index], _this.lineList[index - 1]];
                    var setList = _this.lineList;
                    setTimeout(function () {
                        _this.lineList = []
                    }, 0);
                    setTimeout(function () {
                        _this.lineList = setList;
                    }, 1);
                    setTimeout(function () {
                        $('.tableBody1 .tableRowOneHover .el-input__inner').css({
                            backgroundColor: 'rgb(33,33,33)',
                            color: '#e5e5e5',
                            paddingRight: '30px',
                            height: '30px',
                            lineHeight: '30px',
                            border: 'none',
                            fontSize: '14px',
                        });
                        $('.el-select.line-value').css({
                            width: '95%'
                        });
                        /*$('.tableBody1 .tableRowOneHover').eq(index - 1).addClass('activeItem');
                        $('.tableBody1 .tableRowOneHover').eq(index - 1).find('input').css({
                            background: 'rgba(33, 0, 255, 0.5)'
                        });*/
                    }, 2);
                } else if (index == 0) {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Unable to exchange with first row</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                } else {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please select a row</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            },
            //>>>>>>>>>航线航速下移功能
            toDownList() {
                var index = $('.tableBody1 .activeItem').parent().index() - 1;
                var _this = this;
                if (index < _this.lineList.length - 1 && index >= 0) {
                    [_this.lineList[index], _this.lineList[index + 1]] = [_this.lineList[index + 1], _this.lineList[index]];
                    var setList = _this.lineList;
                    setTimeout(function () {
                        _this.lineList = []
                    }, 0);
                    setTimeout(function () {
                        _this.lineList = setList;
                    }, 1);
                    setTimeout(function () {
                        $('.tableBody1 .tableRowOneHover .el-input__inner').css({
                            backgroundColor: 'rgb(33,33,33)',
                            color: '#e5e5e5',
                            paddingRight: '30px',
                            height: '30px',
                            lineHeight: '30px',
                            border: 'none',
                            fontSize: '14px',
                        });
                        $('.el-select.line-value').css({
                            width: '95%'
                        });
                       /* $('.tableBody1 .tableRowOneHover').eq(index + 1).addClass('activeItem');
                        $('.tableBody1 .tableRowOneHover').eq(index + 1).find('input').css({
                            background: 'rgba(33, 0, 255, 0.5)'
                        });*/
                    }, 2);
                } else if (index == _this.lineList.length - 1) {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">This is the last line</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                } else if (index < 0) {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please select a row</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            },
            //>>>>>>>>>实时航线航速上移功能
            toUpList2() {
                var index = $('.tableBody2 .activeItem').parent().index() - 1;
                var _this = this;
                if (index > 0) {
                    [_this.lineList2[index - 1], _this.lineList2[index]] = [_this.lineList2[index], _this.lineList2[index - 1]];
                    var setList = _this.lineList2;
                    setTimeout(function () {
                        _this.lineList2 = [];
                    }, 0);
                    setTimeout(function () {
                        _this.lineList2 = setList;
                    }, 1);
                    setTimeout(function () {
                        $('.tableBody2 .tableRowOneHover .el-input__inner').css({
                            backgroundColor: 'rgb(33,33,33)',
                            color: '#e5e5e5',
                            paddingRight: '30px',
                            height: '30px',
                            lineHeight: '30px',
                            border: 'none',
                            fontSize: '14px',
                        });
                        $('.el-select.line-value').css({
                            width: '95%'
                        });
                       /* $('.tableBody2 .tableRowOneHover').eq(index - 1).addClass('activeItem');
                        $('.tableBody2 .tableRowOneHover').eq(index - 1).find('input').css({
                            background: 'rgba(33, 0, 255, 0.5)'
                        });*/
                    }, 2);
                } else if (index == 0) {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Unable to exchange with first row</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                } else {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please select a row</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            },
            //>>>>>>>>>实时航线航速下移功能
            toDownList2() {
                var index = $('.tableBody2 .activeItem').parent().index() - 1;
                var _this = this;
                if (index < _this.lineList2.length - 1 && index >= 0) {
                    [_this.lineList2[index], _this.lineList2[index + 1]] = [_this.lineList2[index + 1], _this.lineList2[index]];
                    var setList = _this.lineList2;
                    setTimeout(function () {
                        _this.lineList2 = [];
                    }, 0);
                    setTimeout(function () {
                        _this.lineList2 = setList;
                    }, 1);
                    setTimeout(function () {
                        $('.tableBody2 .tableRowOneHover .el-input__inner').css({
                            backgroundColor: 'rgb(33,33,33)',
                            color: '#e5e5e5',
                            paddingRight: '30px',
                            height: '30px',
                            lineHeight: '30px',
                            border: 'none',
                            fontSize: '14px',
                        });
                        $('.el-select.line-value').css({
                            width: '95%'
                        });
                        /*$('.tableBody2 .tableRowOneHover').eq(index + 1).addClass('activeItem');
                        $('.tableBody2 .tableRowOneHover').eq(index + 1).find('input').css({
                            background: 'rgba(33, 0, 255, 0.5)'
                        });*/
                    }, 2);
                } else if (index == _this.lineList2.length - 1) {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">This is the last line</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                } else if (index < 0) {
                    this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please select a row</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            },
            //>>>>>>>>>实时航线航速清空列表功能
            clearList2() {
                var len = this.lineList2.length;
                this.lineList2 = [];
                for (let i = 0; i < len; i++) {
                    this.lineList2.push({
                        value: ''
                    })
                }
                this.speedSpeed2 = 13;
                //this.lineVal2='';
                this.totalDistance2 = 0;
                this.recomendSpeed2 = 0;
            },
            //>>>>>>>>>航速航线下拉选择时赋值时区
            copyMsg(e) {
                this.timeArea = e.timeArea;
                var that = this;
                var val = e.value;
                var obj = {
                    "portName": val,
                    "type": "from"
                };
                $.ajax({
                    type: "POST",
                    url: that.url + "/api/geojson/opposite.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.datas == null || data.datas.length == 0) {
                            that.listArr.forEach(function (item, index) {
                                item.list = [];
                                item.list2 = [];
                            });
                            that.listArr[0].title = '暂无关联港口'
                        } else {
                            that.listArr[0].title = '';
                            that.listArr[0].list = data.datas;
                            that.listArr.forEach(function (item, index) {
                                if (index > 0) {
                                    item.list = [];
                                    item.list2 = [];
                                }
                            });
                            that.lineList.forEach(function (item, index) {
                                item.value = '';
                                item.distance = '';
                                item.stayTime = '';
                                item.speed = that.speedSpeed;
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error)
                    }
                });
            },
            //>>>>>>>>>航速航线下拉选择时赋值时区
            copyMsg2(e) {
                var that = this;
                that.lineList.forEach(function (item, index) {
                    if (index > that.listIndex) {
                        item.value = '';
                        item.distance = '';
                        item.stayTime = '';
                        item.speed = that.speedSpeed;
                    }
                });
                setTimeout(function () {
                    var len = $('.route_history .line-value').length;
                    var val = $('.route_history .line-value').eq(that.listIndex + 1).find('.el-input__inner').val();
                    var obj = {
                        "portName": val,
                        "type": "to"
                    };
                    $.ajax({
                        type: "POST",
                        url: that.url + "/api/geojson/opposite.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            that.listArr[that.listIndex + 1].list = data.datas;
                            if (data.datas == null || data.datas.length == 0) {
                                that.listArr.forEach(function (item, index) {
                                    if (index > that.listIndex + 1) {
                                        item.list = [];
                                        item.list2 = [];
                                    }
                                });
                                that.listArr[that.listIndex + 1].title = '暂无关联港口';
                            } else {
                                that.listArr[that.listIndex + 1].list = data.datas;
                                that.listArr[that.listIndex + 1].title = '';
                                /*that.listArr.forEach(function (item, index) {
                                    if (index > that.listIndex + 1) {
                                        item.list = [];
                                        item.list2 = [];
                                    }
                                });*/
                                that.lineList.forEach(function (item, index) {
                                    if (index > that.listIndex) {
                                        item.value = '';
                                        item.distance = '';
                                        item.stayTime = '';
                                        item.speed = that.speedSpeed;
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            console.log(error)
                        }
                    });
                }, 10);
            },
            clearText(e) {
                var that = this;
                that.lineList.forEach(function (item, index) {
                    if (index >= e) {
                        item.value = '';
                        item.distance = '';
                        item.stayTime = '';
                        item.speed = that.speedSpeed;
                    }
                });
                setTimeout(function () {
                    that.listArr[e].list = new Array();
                }, 1000)
            },
            //>>>>>>>>航速航线速度同步
            speedChange() {
                var that = this;
                that.lineList.forEach(function (item, index) {
                    item.speed = that.speedSpeed;
                });
            },
            //>>>>>>>>>航速航线获取焦点后清除无用项
            changeList(value, index) {
                var _this = this;
                setTimeout(function () {
                    _this.listIndex = index;
                }, 10)
            },
            //>>>>>>>>>实时航速航线计算
            routeLine(e) {
                this.shipMMsi = e;
                this.clearList();
                var _this = this;
                setTimeout(()=>{

                    setZIndex('.pannel_9', '.route_now');

                    if(_this.userStorage == null){

                        window.location.href = configURL.sys + '/login.htm?returnUrl=' + encodeURIComponent(window.location.href);

                    }else {

                        configUrlFun(_this, configURL.ids, _this.memberId, '.route_now', false, 'Zh');

                    }

                }, 1);

                $('.route_now').show();
            },

            /*//船盘详情
            boatDetails() {
                var imo = $('.get-imo').text();
                var mmsi = $('.get-mmsi').text();
                window.open(configURL.shipUrl + `/page/#/bootInfo?imo=${imo}&mmsi=${mmsi}&type=3`);
                // this.$router.push({
                //     "path": ``
                // });
            },*/

            //劳氏档案
            laoShiDangAn() {

                var para = {
                    imo: $('.get-imo').text(),
                    mmsi: $('.get-mmsi').text()
                };

                /*加载中*/
                let loadingInstance = Loading.service({
                    lock: true,
                    text: 'Loading',
                    target: document.querySelector('.sr-body'),
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                /*修改load样式*/
                $('.el-loading-spinner i.el-icon-loading').css({
                    fontSize: '30px'
                });

                $('.el-loading-spinner .el-loading-spinner').css({
                    fontSize: '30px'
                });

                $('.el-loading-mask').css({
                    zIndex: 10000000000
                });

                Lloydsfile(para).then(res => {

                    var loggingStatus = loggingStatusFun(res);

                    if(!loggingStatus){return};

                    if (res.datas != null) {
                        loadingInstance.close();
                        this.daliao.basic = res.datas.basic;
                        this.daliao.pis = res.datas.pis[0];
                        this.daliao.dimension = res.datas.dimension;
                        this.daliao.built = res.datas.built;
                        this.daliao.companyname = res.datas.companyname;
                        this.daliao.pscs = res.datas.pscs;
                        this.daliao.classfications = res.datas.classfications;
                        setZIndex('.pannel_9', '.pannel_11');
                        $('.pannel_11').show();
                    }else{
                        loadingInstance.close();
                        this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'information', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        })
                    };

                });
            },
            //台风详情
            detailedTyphoon(msg, name) {
                this.typhoonPath = msg;
                this.typhoonName = name;
                $('.pannel_21').removeClass('hide');
            },
            //关闭台风路径窗口
            closeTyphoonPath() {
                $('.pannel_21').addClass('hide');
            },
            //三天气象信息列表
            threeweatherf() {
                if ($('.pannel_23').hasClass('hide')) {
                    var ftime = new Date().format("yyyy-MM-dd hh:mm:ss");
                    let loadingInstance = Loading.service({
                        lock: true,
                        text: 'Loading',
                        target: document.querySelector('.sr-body'),
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    /*修改load样式*/
                    $('.el-loading-spinner i.el-icon-loading').css({
                        fontSize: '30px'
                    });
                    $('.el-loading-mask').css({
                        zIndex: 10000000000
                    });
                    $('.el-loading-spinner .el-loading-spinner').css({
                        fontSize: '30px'
                    });
                    var param = {
                        'lat': $('.tridWeather').attr('datalat'),
                        'lng': $('.tridWeather').attr('datalng'),
                        'time': ftime
                    };
                    weatherForecast(param).then(res => {

                        var loggingStatus = loggingStatusFun(res);

                        if(!loggingStatus){return};

                        if (res.status == 0 && res.datas != null && res.datas.length != 0) {
                            loadingInstance.close();
                            var body = [
                                {
                                    weathers: res.datas[0].weathers,
                                    tides: res.datas[0].tides
                                },
                                {
                                    weathers: res.datas[1].weathers,
                                    tides: res.datas[1].tides
                                },
                                {
                                    weathers: res.datas[2].weathers,
                                    tides: res.datas[2].tides
                                },
                            ];
                            //title
                            this.threeWeathertitle = res.datas[0].time;
                            this.threeWeathertitle1 = res.datas[1].time;
                            this.threeWeathertitle2 = res.datas[2].time;
                            //高潮
                            this.threeWeatherbody = body;
                            setZIndex('.pannel_9', '.pannel_23');
                            $('.pannel_23').removeClass('hide');
                        } else {
                            loadingInstance.close();
                            this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No meteorological information</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        }
                    });
                }
            },

            //气象时间列表
            wetherTimelists() {

                weatherTime().then(res => {

                    if(!_.isEmpty(res.datas)){

                        this.weatherTimes = res.datas.time;

                        function a(arr, cur, width) {

                            if(arr.length == 0 && arr == 'undefined'){return};

                            var result = arr.findIndex(function (val) {

                                return val == cur;

                            });

                            var len = width / arr.length;

                            return {len: len * (result + 1), index: result};

                        }

                        var isWidth = parseInt($('.time_progress').css('width'));

                        var result = a(this.weatherTimes , res.datas.defTime, isWidth);

                        this.weatherTimesIndex = result.index;

                        $('.sign').css('left', result.len + 'px');

                    }

                });
            },

            //通知广告
            homeInfos() {
                homeInfo().then(res => {
                    this.homeInfox = res.datas
                });
            },
            //港口天气
            portWeathers() {
                setTimeout(function () {
                    setZIndex('.pannel_9', '.pannel_27');
                }, 1);

                $('.pannel_27').css('display', 'block');
            },
            //港口弹窗关闭
            portWClose() {
                $('.pannel_27').css('display', 'none');
            },
            //快捷入口
            quickEntry() {
                /*this.loadPort1 = 'Tianjin'*/
                var i = $(event.currentTarget).parent().index();
                $($('.radio-list')[i]).addClass('fs-circle-select');
                $('.radio-list').not($('.radio-list')[i]).removeClass('fs-circle-select');
                this.portDataValue = $($('.radio_group-1 label')[i]).attr('data-value');
                if (i == 0) {
                    $('#sailState').hide();
                    $('.timer-list').hide();
                } else if (i == 1) {
                    $('#sailState').show();
                    $('.timer-list').show();
                } else if (i == 2) {
                    $('#sailState').hide();
                    $('.timer-list').show();
                }
                ;
                $('.pannel_1').removeClass('hide');
                $('.pannel_1').show();
            },
            //关闭港口信息快捷入口
            closeInitPort() {
                $('.pannel_26 ').addClass('hide');
                $('.pannel_27').css('display', 'none');
            },
            //关闭历史参考数据
            historyClose() {
                $('.pannel_24 ').addClass('hide');
            },
            //历史参考数据显示
            historyOpen() {
                setTimeout(function () {
                    setZIndex('.route_history', '.pannel_24');
                }, 1);
                $('.pannel_24').removeClass('hide');
                $('.pannel_24').show();
            },
            //关闭实时历史参考数据
            historyCloseN() {
                $('.nowSpeedD ').addClass('hide');
            },
            //打开实时历史参考数据
            historyOpenN() {
                setTimeout(function () {
                    setZIndex('.route_now', '.nowSpeedD');
                }, 1);
                $('.nowSpeedD').removeClass('hide');
                $('.nowSpeedD').show();
            },

            //我的船队
            myShips(){

                $('.my-ships-wrap-js').toggleClass('hide');

                if(!$('.my-ships-wrap-js').hasClass('hide')){

                    myShips().then(res => {

                        var loggingStatus = loggingStatusFun(res);

                        if(!loggingStatus){return};

                        if (res.status == 0) {

                            this.myShipsArr = res.datas;

                            setTimeout(()=>{
                                if(res.datas.length>=6){
                                    this.setTable = 185
                                }else{
                                    this.setTable = (res.datas.length+1)*30.4
                                }
                            },50)

                        }

                    });

                }

            },

            //关闭我的船队
            myShipsClose(){
                $('.my-ships-wrap-js').addClass('hide');
            },

            //收藏船只
            collectShip(){

                var _this = this;

                var obj = {
                    imo: $('.get-imo').text(),
                    mmsi: $('.get-mmsi').text(),
                };

                if(this.ifCollect == 0){

                    $.ajax({
                        type: "POST",
                        url: this.url + "/api/fleet/addFleets.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: (data) => {
                            var loggingStatus = loggingStatusFun(data);

                            if(!loggingStatus){return};

                            $('.collect-ship').css({'background-position': '0 0'});

                            this.ifCollect = 1;

                            myShips().then(res => {

                                if (res.status == 0) {

                                    _this.myShipsArr = res.datas;

                                    setTimeout(()=>{
                                        if(res.datas.length>=6){
                                            this.setTable = 185
                                        }else{
                                            this.setTable = (res.datas.length+1)*30.4
                                        }
                                    },50)

                                }

                            });

                        },
                        error: (error) => {
                            console.log(error)
                        }
                    });

                }else if(this.ifCollect == 1){

                    $.ajax({
                        type: "POST",
                        url: this.url + "/api/fleet/unfollowFleet.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: (data) => {

                            var loggingStatus = loggingStatusFun(data);

                            if(!loggingStatus){return};

                            $('.collect-ship').css({'background-position': '-30px 0'});

                            this.ifCollect = 0;

                            myShips().then(res => {

                                if (res.status == 0) {

                                    _this.myShipsArr = res.datas;

                                    setTimeout(()=>{
                                        if(res.datas.length>=6){
                                            this.setTable = 185
                                        }else{
                                            this.setTable = (res.datas.length+1)*30.4
                                        }
                                    },50)

                                }

                            });

                        },
                        error: (error) => {
                            console.log(error)
                        }
                    });

                }

            },

            //取消关注
            unfollow(imo, mmsi){

                var _this = this;

                var obj = {imo, mmsi,};

                $.ajax({
                    type: "POST",
                    url: this.url + "/api/fleet/unfollowFleet.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json",
                    success:  (data) => {

                        $('.collect-ship').css({'background-position': '-30px 0'});

                        this.ifCollect = 0;

                        myShips().then(res => {

                            if (res.status == 0) {

                                _this.myShipsArr = res.datas;

                                setTimeout(()=>{
                                    if(res.datas.length>=6){
                                        this.setTable = 185
                                    }else{
                                        this.setTable = (res.datas.length+1)*30.4
                                    }
                                },50)

                            }

                        });

                    },
                    error: (error) => {
                        console.log(error)
                    }
                });

            },

            //通知信息关闭
            infoClose() {
                $('.pannel_notice').addClass('hide')
            },

            //港口详情
            portDetailsInfo(nameEn){

                $.ajax({
                    type: "GET",
                    url: this.url + "/api/weather/seaportDetails.json?nameEn="+nameEn,
                    success:  (data) => {

                        if(!_.isEmpty(data.datas)){

                            this.portInfo = data.datas;

                            $('.port-details-info').removeClass('hide');

                        }

                    },
                    error: (error) => {
                        console.log(error)
                    }
                });

            },

            //关闭港口详情富文本弹窗
            portInfoClose(){

                $('.port-details-info').addClass('hide');

            },

            //港口排队
            portQueuing(nameEn){

                /*$.ajax({
                    type: "GET",
                    url: this.url + "/api/mapVisual/dockPlan.json?nameEn="+nameEn,
                    success:  (data) => {

                        if (data.datas.length != 0) {

                            this.portQueuingArr = data.datas;



                        }else{

                            this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No information available currently</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            })

                        }

                        console.log(data)

                    },
                    error: (error) => {
                        console.log(error)
                    }
                });*/
                $('.port-queuing-wrap').removeClass('hide');

            },

            //关闭港口排队
            portQueuingClose(){

                $('.port-queuing-wrap').addClass('hide');

            },

            //关闭控制面板
            closeCtrlWrap(){

                $('.ctrl-wrap').addClass('hide');

            },

            //控制面板弹窗打开
            shipMapSetting(){

                $('.ctrl-wrap').toggleClass('hide');

            },

        },
        mounted() {

            var _this = this;

            _this.getin();

            /*var userData = JSON.parse(window.localStorage.getItem('user'));

            if (userData != null) {
                _this.userName = userData.userName;
                _this.memberId = userData.memberId;
            }else{
                _this.userName = null;
                _this.memberId = null;
            }*/

            var dataResultPort = [];
            var dataResultPort1 = [];
            var portShipsLine = [];
            var portFlag = true;

            this.wetherTimelists();
            this.homeInfos();
            var zoomLog = 7;
            var centerLog = {};
            var map,
                infowindow,
                shipMarker, //搜索船只点
                startMarker,
                endMarker;
            var counter = 0;
            var zoomMar;
            var zoomResultMsg = null;
            var routeMarkerArr = [];
            var timeLineArr = [];
            var trackMarkerArr = [];
            var shipMarkerYelArr = [];
            var shipMarkerGreArr = [];
            var portListArr = [];
            var SOSInfoWindow = null;
            var markers = [];
            var isShipMarker = [];
            var allShipMarker = [];
            var pathMarker = [];
            var shipOutlineArr = [];
            var lineRouterArr = []; //航速航线
            var portSearchArr = []; // >>>>>>港口查询港口点数组
            var routePortArr = [];
            var portArr = [];
            var limitedShipArr = []; //屏幕内的船
            var stopPortArr = [];
            var shipBubbleArr = [];
            var pirateArr = [];
            var typhoonArr = []; //台风
            var currentTyphoonArr = [] //当前台风位置
            var typhoonMarArr = []; //台风点
            var typhoonMarArr1 = []; //台风点
            var clearTyphoonArr = []; // 删除台风弹窗
            var typhoonMarkerClusterArr = []; //删除聚类器
            var posCenterArr = []; //定位台风数组
            //海盗
            var warPirateArr = [];
            //军演
            var manoeuvreArr = [];
            //红圆
            var symbolCircle = {
                path: google.maps.SymbolPath.CIRCLE,
                strokeWeight: 3,
                strokeColor: '#F00',
                fillColor: '#ddd',
                fillOpacity: 1,
                scale: 4,
            };
            //黄圆
            var symbolCircleYellow = {
                path: google.maps.SymbolPath.CIRCLE,
                strokeWeight: 3,
                strokeColor: '#F5FF44',
                fillColor: '#FFF',
                fillOpacity: 1,
                scale: 4,
            };
            //虚线
            var dottedLine = {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                scale: 4
            };
            //船只外轮廓高亮显示
            var shipOutlineStyle = {
                path: 'M-100 -100 L-100 -50 M-100 -100 L-50 -100 M100 -101 L50 -101 M100 -100 L100 -50 M-101 100 L-101 50 M-100 99 L-50 99 M100 99 L50 99 M100 100 L100 50',
                strokeWeight: 3,
                strokeColor: '#ff2200',
                fillColor: '#ff2200',
                fillOpacity: 1,
                scale: 0.22,
                zIndex: -11,
            };

            var right_div2 = document.getElementById("tableContent");
            right_div2.onscroll = function(){
                var right_div2_top = this.scrollTop;
                var right_div2_left = this.scrollLeft;
                document.getElementById("left_div2").style.top = - right_div2_top + 'px';
            };

            //scrollTable

            scrollTableFun('.scrollTable', '.scrollTableChild');

            function scrollTableFun(ele,eleChild) {

                var eleScroll = document.querySelectorAll(ele);

                var eleScrollChild = document.querySelectorAll(eleChild);

                for(let i = 0; i < eleScroll.length ; i++){

                    eleScroll[i].onscroll = function(){

                        var right_div2_top = this.scrollTop;

                        var right_div2_left = this.scrollLeft;

                        eleScrollChild[i].style.top = - right_div2_top + 'px';
                    };

                }

            }

            //时间选择背景颜色
            $('.el-input__inner').css({
                backgroundColor: 'rgb(33,33,33)',
                color: '#e5e5e5',
                paddingRight: '30px',
                border: '1px solid #5c5c5c'
            });
            $('.el-input--mini .el-input__icon').css({
                marginTop: '-2px'
            });
            $('.fs-calendar').css({
                "color": '#fff',
                "fontSsize": "20px",
                "position": "absolute",
                "left": "-1px",
                "top": "2px"
            });
            //航速航线样式
            $('.pannel_4 .el-input__inner').css({
                backgroundColor: 'rgb(33,33,33)',
                color: '#e5e5e5',
                paddingRight: '30px',
                height: '30px',
                lineHeight: '30px',
                border: 'none',
                fontSize: '14px',
            });
            $('.pannel_4 .get-time7 .el-input__inner').css({
                paddingRight: '32.5px',
                fontSize: '12px',
            });
            $('.el-select.line-value').css({
                width: '95%'
            });
            //地图入口
            initMap();

            function initMap() {
                $('#map').css('position', 'none');
                //地图初始化
                initializeMapFun();

                function initializeMapFun() {
                    //控制台输出Google Maps API版本
                    console.log('Google Maps API version: ' + google.maps.version);
                    //path: 'M-6 10L0 -10L6 10z'
                    //地图初始化
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: {
                            lat: 33.3231029267,
                            lng: 121.3725827950
                        },
                        zoom: 3,
                        maxZoom: 12,
                        minZoom: 2,
                        /*backgroundColor: '#1A2A5B',*/
                        mapTypeId: 'hybrid',
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                            position: google.maps.ControlPosition.TOP_RIGHT,
                        },
                        zoomControl: false,
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_TOP
                        },
                        scaleControl: true,
                        streetViewControl: false,
                        fullscreenControl: false,
                    });
                    /*_this.myMap = map;
                    //载入船只数据
                    var script = document.createElement('script');
                    script.setAttribute('src', _this.url + '/api/geojson/allbackNew.json?callbackparam=shipMsg_callback');
                    document.getElementsByTagName('head')[0].appendChild(script);
                    //处理JSONP请求
                    window.shipMsg_callback = function (data) {
                        if (data.datas != null) {
                            var greenShip = data.datas.shipsN;
                            var yellowShip = data.datas.shipsY;
                            var portList = data.datas.portList;

                            var initPortIcon = {
                                url: '../../static/images/initPortYellow.png'
                            };

                            var portIcon = {
                                url: '../../static/images/port.png'
                            };
                            for (let i = 0; i < greenShip.length; i++) {
                                markerFun({
                                    lat: Number(greenShip[i].lat),
                                    lng: Number(greenShip[i].lng)
                                }, '../../static/images/green.png', shipMarkerGreArr)
                            }
                            for (let i = 0; i < yellowShip.length; i++) {
                                markerFun({
                                    lat: Number(yellowShip[i].lat),
                                    lng: Number(yellowShip[i].lng)
                                }, '../../static/images/yellow.png', shipMarkerYelArr)
                            }
                            for (let i = 0; i < portList.length; i++) {
                                var portResult = markerFun({
                                    lat: Number(portList[i].lat),
                                    lng: Number(portList[i].lng)
                                }, initPortIcon, portListArr, portList[i]);

                                google.maps.event.addListener(portResult, "click", function () {

                                    if (map.getZoom() > 6) {

                                        zoomLog = map.getZoom();

                                        centerLog = {lat: this.data.lat, lng: this.data.lng};

                                        _this.isPortLatLng = {lat: this.data.lat, lng: this.data.lng};

                                        _this.initPortName = this.data.nameCn;

                                        _this.initPortNameEn = this.data.nameEn;

                                        _this.initPortCurrent = this.data.countryCn;

                                        //取消船只外轮廓高亮
                                        if (shipOutlineArr.length != 0) {
                                            for (let i = 0; i < shipOutlineArr.length; i++) {
                                                shipOutlineArr[i].setMap(null);
                                            }
                                        }

                                        //>>>>>清除港口点
                                        if (portSearchArr.length != 0) {

                                            for (let i = 0; i < portSearchArr.length; i++) {
                                                portSearchArr[i].setMap(null);
                                            }
                                        }

                                        if (closeInfoWindow != null) {

                                            closeInfoWindow.remove();

                                        }

                                        $('.port-details-info').addClass('hide');

                                        $.ajax({
                                            type: "GET",
                                            url: _this.url + "/api/weather/seaportWeather.json?nameEn=" + this.data.nameEn,
                                            success: function (data) {
                                                if (data != null && data.datas && data.datas.seaport.currents.length != 0) {

                                                    _this.infoPortImg = data.datas.accessory.fileList;

                                                    _this.infoPortVideo = data.datas.accessory.fileList;

                                                    _this.infoPortType = data.datas.accessory.type;

                                                    _this.leftinfo = data.datas.seaport.currents[0];

                                                    _this.rightinfo = data.datas.seaport.weathers;

                                                    _this.portNew = data.datas.seaport.currents[0].weathers;

                                                }

                                            },

                                            error: function (error) {

                                                console.log(error)

                                            }

                                        });

                                        $('.port-details-wrap').removeClass('hide');

                                    }
                                });
                                google.maps.event.addListener(portResult, "mouseover", function () {
                                    if (map.getZoom() > 6) {
                                        var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lng));
                                        var warPirate = new WarInfoWindow(latLng, map, 'pirate-info-window', {
                                            "title1": 'Port Name：',
                                            "span1": this.data.nameEn,
                                        });
                                        warPirateArr.push(warPirate);
                                    }
                                });
                                google.maps.event.addListener(portResult, "mouseout", function () {
                                    if (warPirateArr.length != 0) {
                                        for (let i = 0; i < warPirateArr.length; i++) {
                                            warPirateArr[i].remove();
                                        }
                                        ;
                                    }
                                    ;
                                });
                            }
                        } else {
                            console.log('初始化数据未请求到...')
                        }
                    };*/


                    var initDataArr = ['VLCC', 'ULCC', 'SUEZMAX', 'AFRAMAX'];

                    //初始化地图
                    $.ajax({
                        type: "POST",
                        url: _this.url + "/api/mapVisual/indexInitialize.json",
                        data: JSON.stringify({"shipType":initDataArr,"portShow":"Y"}),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {

                            if (!_.isEmpty(data.datas)) { initMapShipsPort(data);}

                        },
                        error: function (error) {

                            console.log(error)
                        }
                    });
                    //>>>>>>>>>>>>>>>>>航速航线模糊搜索请求
                    $.ajax({
                        type: "POST",
                        url: _this.url + "/api/mapVisual/ports.json",
                        data: JSON.stringify({
                            "keyword": ""
                        }),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (!_.isEmpty(data.datas)) {
                                _this.states = data.datas;
                                _this.list = _this.states.map(item => {
                                    return {
                                        value: item.portNameEn,
                                        label: item.portNameEn,
                                        timeArea: item.timeZone
                                    };
                                });
                            }
                        },
                        error: function (error) {

                            console.log(error)

                        }
                    });

                    //>>>>>>>>>>>>>港口请求
                    $.ajax({
                        type: "GET",
                        url: _this.url + "/api/ports.json",
                        success: function (data) {
                            dataResultPort = data.datas;
                            _this.loadPortArr = data.datas;
                            //_this.loadPortArrEnd = data.datas;
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: _this.url + "/api/chinaPorts.json",
                        success: function (data) {
                            dataResultPort1 = data.datas;
                            _this.loadPortArrEnd = data.datas;
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });

                    var urlImo = getHref('imo');

                    _this.urlPortName = getHref('portName') == false ? '' : getHref('portName');

                    var objUrl = {
                        "imo": urlImo
                    };

                    //初始化 判断物流页面跳转
                    if (urlImo != '') {

                        setTimeout(function () {

                            searchShip(objUrl, _this, true);

                        }, 5000);

                        setTimeout(function () {

                            map.setZoom(8);

                        }, 7000);

                    }

                };

                //获取地址拦？后面的vue值 $.getHref('name');
                function getHref(key) {
                    var str = window.location.href;
                    str = str.substring(str.indexOf('?') + 1);
                    var end = false;
                    var arrHref = str.split('&');
                    for (var i = 0; i < arrHref.length; i++) {
                        var chilrenArr = arrHref[i].split('=');
                        if (chilrenArr[0] == key) {
                            end = chilrenArr[1];
                            break;
                        }
                    }
                    return end;
                }

                //索马里海盗高风险区
                var triangleCoords = [{
                    lng: 40.44363905694253,
                    lat: 14.976115345390085
                },
                    {
                        lng: 40.83914686944253,
                        lat: 14.678741885963362
                    },
                    {
                        lng: 41.23465468194253,
                        lat: 14.561805420006138
                    },
                    {
                        lng: 41.42142226006753,
                        lat: 14.38096358256594
                    },
                    {
                        lng: 41.71805311944253,
                        lat: 13.976201779330736
                    },
                    {
                        lng: 42.02567030694253,
                        lat: 13.752210553298255
                    },
                    {
                        lng: 42.26736952569253,
                        lat: 13.624119047124566
                    },
                    {
                        lng: 42.39920546319253,
                        lat: 13.260817999488111
                    },
                    {
                        lng: 42.53104140069253,
                        lat: 13.185952778284857
                    },
                    {
                        lng: 42.70682265069253,
                        lat: 13.100364460230281
                    },
                    {
                        lng: 42.73978163506753,
                        lat: 12.961220044411562
                    },
                    {
                        lng: 42.91556288506753,
                        lat: 12.779144666979676
                    },
                    {
                        lng: 43.02542616631753,
                        lat: 12.854132885483764
                    },
                    {
                        lng: 43.13528944756753,
                        lat: 12.661261096825243
                    },
                    {
                        lng: 43.39896132256753,
                        lat: 12.371680380040601
                    },
                    {
                        lng: 43.46487929131753,
                        lat: 11.95283158513989
                    },
                    {
                        lng: 43.19022108819253,
                        lat: 11.866832939003231
                    },
                    {
                        lng: 42.57498671319253,
                        lat: 11.619436343168815
                    },
                    {
                        lng: 43.13528944756753,
                        lat: 11.51180377294125
                    },
                    {
                        lng: 43.40038950600286,
                        lat: 11.461013775029201
                    },
                    {
                        lng: 43.56518442787785,
                        lat: 11.159370955333571
                    },
                    {
                        lng: 43.88378794350287,
                        lat: 10.717116141189436
                    },
                    {
                        lng: 44.25732309975286,
                        lat: 10.490343206997196
                    },
                    {
                        lng: 44.58691294350287,
                        lat: 10.42552024188403
                    },
                    {
                        lng: 45.05932505287787,
                        lat: 10.457933416552805
                    },
                    {
                        lng: 45.29003794350286,
                        lat: 10.609149989573453
                    },
                    {
                        lng: 45.50976450600286,
                        lat: 10.738704764409093
                    },
                    {
                        lng: 45.67455942787786,
                        lat: 10.846624682465901
                    },
                    {
                        lng: 45.85034067787786,
                        lat: 10.878993082547169
                    },
                    {
                        lng: 46.13598520912786,
                        lat: 10.825043801767578
                    },
                    {
                        lng: 46.38867075600287,
                        lat: 10.738704764409093
                    },
                    {
                        lng: 46.69628794350286,
                        lat: 10.846624682465901
                    },
                    {
                        lng: 46.99291880287787,
                        lat: 10.997647076317051
                    },
                    {
                        lng: 47.30053599037787,
                        lat: 11.148592149704726
                    },
                    {
                        lng: 47.64111216225287,
                        lat: 11.148592149704726
                    },
                    {
                        lng: 48.03661997475286,
                        lat: 11.1270333399127
                    },
                    {
                        lng: 48.21240122475287,
                        lat: 11.159370955333571
                    },
                    {
                        lng: 48.37719614662786,
                        lat: 11.267136951143812
                    },
                    {
                        lng: 48.90453989662786,
                        lat: 11.267136951143812
                    },
                    {
                        lng: 49.22122157320194,
                        lat: 11.328411504642276
                    },
                    {
                        lng: 49.51785243257693,
                        lat: 11.360726533941971
                    },
                    {
                        lng: 49.67166102632694,
                        lat: 11.533011276934488
                    },
                    {
                        lng: 49.83645594820193,
                        lat: 11.489949937062846
                    },
                    {
                        lng: 50.16604579195192,
                        lat: 11.60835271973211
                    },
                    {
                        lng: 50.46267665132693,
                        lat: 11.769729997179851
                    },
                    {
                        lng: 50.58352626070194,
                        lat: 11.94176140453557
                    },
                    {
                        lng: 50.95706141695194,
                        lat: 11.974005183996084
                    },
                    {
                        lng: 51.21714564190144,
                        lat: 11.922603599211001
                    },
                    {
                        lng: 51.370954235651446,
                        lat: 11.772071467708813
                    },
                    {
                        lng: 51.21714564190144,
                        lat: 11.610695555217944
                    },
                    {
                        lng: 51.063337048151425,
                        lat: 11.41887920652762
                    },
                    {
                        lng: 51.063337048151425,
                        lat: 11.22497377030568
                    },
                    {
                        lng: 51.17320032940142,
                        lat: 11.149530788131116
                    },
                    {
                        lng: 51.17320032940142,
                        lat: 10.901509494730774
                    },
                    {
                        lng: 51.16221400127643,
                        lat: 10.6640780257448
                    },
                    {
                        lng: 51.15122767315142,
                        lat: 10.534491549326574
                    },
                    {
                        lng: 50.898542126276425,
                        lat: 10.296775189090383
                    },
                    {
                        lng: 50.78867884502642,
                        lat: 9.60423149497835
                    },
                    {
                        lng: 50.71177454815143,
                        lat: 9.26826429088878
                    },
                    {
                        lng: 50.601911266901425,
                        lat: 8.997088073072973
                    },
                    {
                        lng: 50.415143688776425,
                        lat: 8.714849161513357
                    },
                    {
                        lng: 50.07456751690143,
                        lat: 8.185470000193192
                    },
                    {
                        lng: 49.90977259502643,
                        lat: 7.957042658236219
                    },
                    {
                        lng: 49.843854626276425,
                        lat: 7.772031835207287
                    },
                    {
                        lng: 49.69004603252644,
                        lat: 7.44534433210535
                    },
                    {
                        lng: 49.28355189190143,
                        lat: 6.758520147976284
                    },
                    {
                        lng: 48.71226282940145,
                        lat: 5.480471424031933
                    },
                    {
                        lng: 48.05308314190145,
                        lat: 4.550219275208818
                    },
                    {
                        lng: 47.042340954401446,
                        lat: 3.520078473177932
                    },
                    {
                        lng: 46.28428431377645,
                        lat: 2.708297603896881
                    },
                    {
                        lng: 45.33946009502645,
                        lat: 1.9398930046888836
                    },
                    {
                        lng: 44.548444470026446,
                        lat: 1.5226040264456202
                    },
                    {
                        lng: 43.27403040752646,
                        lat: 0.38020235367460486
                    },
                    {
                        lng: 41.63706751690145,
                        lat: -1.6300729586930345
                    },
                    {
                        lng: 40.84605189190144,
                        lat: -2.4315646312738437
                    },
                    {
                        lng: 40.407176994697494,
                        lat: -2.552299937233556
                    },
                    {
                        lng: 40.1874504321975,
                        lat: -2.7827626734376594
                    },
                    {
                        lng: 40.15449144782249,
                        lat: -3.002209165883855
                    },
                    {
                        lng: 40.3852043384475,
                        lat: -3.166765288434263
                    },
                    {
                        lng: 40.044628166572494,
                        lat: -3.3532305494679946
                    },
                    {
                        lng: 39.978710197822494,
                        lat: -3.6821989497009184
                    },
                    {
                        lng: 39.780956291572494,
                        lat: -3.79182861413814
                    },
                    {
                        lng: 39.715038322822494,
                        lat: -4.0877581433708485
                    },
                    {
                        lng: 39.495311760322494,
                        lat: -4.471206827221863
                    },
                    {
                        lng: 39.198680900947494,
                        lat: -4.734028183335923
                    },
                    {
                        lng: 39.0338859790725,
                        lat: -4.963915190193745
                    },
                    {
                        lng: 64.99457933844748,
                        lat: -4.996749739337986
                    },
                    {
                        lng: 64.99457933844751,
                        lat: 22.000172993137866
                    },
                    {
                        lng: 59.66621019782251,
                        lat: 22.000172993137866
                    },
                    {
                        lng: 58.72138597907251,
                        lat: 20.762350834276432
                    },
                    {
                        lng: 58.5016594165725,
                        lat: 20.38177932858865
                    },
                    {
                        lng: 58.16108324469751,
                        lat: 20.402374962307803
                    },
                    {
                        lng: 57.9413566821975,
                        lat: 20.36118094390433
                    },
                    {
                        lng: 57.809520744697515,
                        lat: 19.989942229423136
                    },
                    {
                        lng: 57.74360277594751,
                        lat: 19.50395154392656
                    },
                    {
                        lng: 57.776561760322515,
                        lat: 19.078805176223383
                    },
                    {
                        lng: 57.75977614459376,
                        lat: 18.902782202430515
                    },
                    {
                        lng: 57.36426833209376,
                        lat: 18.91317571092239
                    },
                    {
                        lng: 56.91382887896876,
                        lat: 18.84040760326728
                    },
                    {
                        lng: 56.61719801959376,
                        lat: 18.455254559861274
                    },
                    {
                        lng: 56.50733473834376,
                        lat: 18.100566263548373
                    },
                    {
                        lng: 56.37549880084376,
                        lat: 17.943856791793692
                    },
                    {
                        lng: 55.88111403521875,
                        lat: 17.954308423625164
                    },
                    {
                        lng: 55.529551535218744,
                        lat: 17.90204409314613
                    },
                    {
                        lng: 55.441660910218765,
                        lat: 17.734694906752452
                    },
                    {
                        lng: 55.23292067584378,
                        lat: 17.517140059437196
                    },
                    {
                        lng: 55.22193434771877,
                        lat: 17.118585757733257
                    },
                    {
                        lng: 54.85938551959377,
                        lat: 16.94000706455286
                    },
                    {
                        lng: 53.8464954385894,
                        lat: 16.896392930417733
                    },
                    {
                        lng: 53.6157825479644,
                        lat: 16.801760621808583
                    },
                    {
                        lng: 52.3963001260894,
                        lat: 16.401684207118336
                    },
                    {
                        lng: 52.18755989171441,
                        lat: 15.641399713346686
                    },
                    {
                        lng: 50.3308704385894,
                        lat: 14.920747882720079
                    },
                    {
                        lng: 49.058667281010095,
                        lat: 14.516481807526446
                    },
                    {
                        lng: 48.860913374760095,
                        lat: 14.079996665131048
                    },
                    {
                        lng: 48.190747359135095,
                        lat: 13.994730660085125
                    },
                    {
                        lng: 48.058911421635095,
                        lat: 14.03736762826749
                    },
                    {
                        lng: 47.509595015385095,
                        lat: 13.749415287092162
                    },
                    {
                        lng: 47.00422392163509,
                        lat: 13.52520689039217
                    },
                    {
                        lng: 46.39997587476009,
                        lat: 13.450423655032196
                    },
                    {
                        lng: 45.652905562260095,
                        lat: 13.35423948525164
                    },
                    {
                        lng: 45.2793704060101,
                        lat: 12.990533148535903
                    },
                    {
                        lng: 44.88386259351009,
                        lat: 12.733477296136215
                    },
                    {
                        lng: 44.510327437260095,
                        lat: 12.722760940207905
                    },
                    {
                        lng: 44.224682906010095,
                        lat: 12.626293414656914
                    },
                    {
                        lng: 43.8181887653851,
                        lat: 12.615572549214363
                    },
                    {
                        lng: 43.532544234135095,
                        lat: 12.712044131726003
                    },
                    {
                        lng: 43.268872359135095,
                        lat: 13.35423948525164
                    },
                    {
                        lng: 43.071118452885095,
                        lat: 14.207835966737804
                    },
                    {
                        lng: 42.895337202885095,
                        lat: 14.888412129112226
                    },
                    {
                        lng: 42.77448759351009,
                        lat: 15.21730147413166
                    },
                    {
                        lng: 40.44363905694253,
                        lat: 14.976115345390085
                    }
                ];
                var bermudaTriangle = new google.maps.Polygon({
                    paths: triangleCoords,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    fillColor: '#FF0000',
                    fillOpacity: 0.35,
                    label: {
                        text: '11111111111111111',
                        color: "#fff"
                    }
                });
                bermudaTriangle.setMap(map);
                bermudaTriangle.addListener('click', showArrays);
                SOSInfoWindow = new google.maps.InfoWindow;

                function showArrays(event) {
                    var contentString = '<p>Somali Pirate High Risk Area</p>';
                    SOSInfoWindow.setContent(contentString);
                    SOSInfoWindow.setPosition(event.latLng);
                    SOSInfoWindow.open(map);
                }

                //显示经纬度
                google.maps.event.addListener(map, 'mousemove', showCoordinate);
                google.maps.event.addListener(bermudaTriangle, 'mousemove', showCoordinate);
                //轨迹查询
                $('.tryQuery').on('click', function () {
                    if ($('.get-imo').text() != '' && _this.time1 != '' && _this.time1 != null && _this.time2 != '' && _this.time2 != null) {
                        if (_this.time1 > _this.time2) {
                            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">End date cannot be less than start date</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        } else {
                            loadingFun();
                            //轨迹起点箭头样式
                            var symbolOne = {
                                path: 'M2-30.68c-5.773 0-10.454 4.682-10.454 10.454 0 7.309 10.454 20.906 10.454 20.906s10.454-12.771 10.454-20.906c0-5.773-4.682-10.454-10.454-10.454zM2-15c-2.739 0-4.96-2.221-4.96-4.96s2.221-4.96 4.96-4.96 4.96 2.221 4.96 4.96c0 2.739-2.221 4.96-4.96 4.96z',
                                strokeWeight: 1,
                                strokeColor: '#00ff1c',
                                fillColor: '#00ff1f',
                                fillOpacity: 1,
                                scale: 0.6,
                            };

                            // 斜线
                            var symbolEnd1 = {
                                path: 'M0-0L19-28z',
                                strokeColor: '#00de1a',
                                strokeWeight: 2,
                                fillColor: '#F00',
                                fillOpacity: 0.3,
                                scale: 0.6,
                                rotation: 0,
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

                            //向后台传递的数据
                            var obj = {
                                imo: $('.get-mmsi').text(),
                                startTime: new Date(_this.time1).getTime(),
                                endTime: new Date(_this.time2).getTime(),
                            };

                            var resultMsg = null;

                            //绘制轨迹请求
                            $.ajax({
                                url: _this.url + '/api/geojson/waypointnewUUID.json',
                                type: 'post',
                                data: JSON.stringify(obj),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (data) {

                                    var loggingStatus = loggingStatusFun(data);

                                    if(!loggingStatus){return};

                                    if (data.point.length !=0 && data.length != 0) {

                                        _this.isFlagMsg = false;
                                        var LatLngList = new Array(new google.maps.LatLng(data.html[0]), new google.maps.LatLng(data.html[1]), new google.maps.LatLng(data.html[2]), new google.maps.LatLng(data.html[3]));
                                        var bounds = new google.maps.LatLngBounds();
                                        for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
                                            bounds.extend(LatLngList[i]);
                                        }
                                        map.fitBounds(bounds);
                                        var uuid = data.uuid;
                                        delShipGreYel();
                                        isInitPortMark(null);
                                        if (limitedShipArr.length != 0) {
                                            for (let i = 0; i < limitedShipArr.length; i++) {
                                                limitedShipArr[i].setMap(null);
                                            }
                                            //limitedShipArr.splice(0);
                                        }
                                        //取消船只外轮廓高亮
                                        if (shipOutlineArr.length != 0) {
                                            for (let i = 0; i < shipOutlineArr.length; i++) {
                                                shipOutlineArr[i].setMap(null);
                                            }
                                        }
                                        if (allShipMarker.length != 0) {
                                            for (var i = 0; i < allShipMarker.length; i++) {
                                                allShipMarker[i].setMap(null);
                                            }
                                            ;
                                        }
                                        ;
                                        if (pathMarker.length != 0) {
                                            for (let i = 0; i < pathMarker.length; i++) {
                                                pathMarker[i].setMap(null);
                                                pathMarker[i].remove && pathMarker[i].remove();
                                            }
                                        }
                                        ;
                                        isInitPortMark(null);
                                        //>>>>>清除港口点
                                        if (portSearchArr.length != 0) {
                                            for (let i = 0; i < portSearchArr.length; i++) {
                                                portSearchArr[i].setMap(null);
                                            }
                                        }
                                        $('.abolish').show();
                                        $('.tryQuery').hide();
                                        var locus = data.point;
                                        zoomMar = locus;
                                        _this.zoomFlag = true;
                                        _this.loading.close();
                                        //绘制轨迹
                                        var line = new google.maps.Polyline({
                                            map: map,
                                            strokeColor: '#FF0000',
                                            strokeWeight: 2,
                                            path: locus,
                                            icons: [{
                                                icon: symbolArrows,
                                                offset: '20px',
                                                repeat: '200px',
                                            },],
                                        });

                                        allShipMarker.push(line);

                                        zoomTrack();

                                        /*for(let i = 0; i < locus.length; i++) {
                                            let latLng = new google.maps.LatLng(locus[i].lat, locus[i].lng);
                                            let text = locus[i].text;
                                            let marker46;
                                            //绘制路线点
                                            let marker =new google.maps.Marker({
                                                position: latLng,
                                                map: map,
                                                icon: symbolCircle,
                                                visible: true,
                                                data: locus[i],
                                            });
                                            routeMarkerArr.push(marker);
                                            allShipMarker.push(marker);
                                            pathMarker.push(marker);
                                            /!*!//绘制时间轴
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
                                            });*!/
                                            marker46 = new WarInfoWindow (latLng, map, 'marker-46', {
                                                "span1": text,
                                                "title1": '',
                                            });
                                            timeLineArr.push(marker46);
                                            pathMarker.push(marker46);
                                            //鼠标移入
                                            marker.addListener('mouseover', function () {
                                                if(limitedShipArr.length != 0){
                                                    for (let i = 0; i < limitedShipArr.length; i++) {
                                                        limitedShipArr[i].setMap(null);
                                                    }
                                                    //limitedShipArr.splice(0);
                                                }
                                                marker.setIcon(symbolCircleYellow);
                                                var latLng = new google.maps.LatLng(Number(this.data.lat) , Number(this.data.lng));
                                                if( resultMsg == null ){
                                                    var trackMarker = new WarInfoWindow (latLng, map, 'track-marker-info', {
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
                                                        "title11": '船首向：',
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
                                                        "span12": this.data.rot,
                                                    });
                                                    trackMarkerArr.push(trackMarker);
                                                }else{
                                                    var trackMarker = new WarInfoWindow (latLng, map, 'track-marker-info', {
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
                                                        "title11": '船首向：',
                                                        "title12": '船迹向：',
                                                        "span1": this.data.shipName,
                                                        "span2": this.data.imo,
                                                        "span3": this.data.mmsi,
                                                        "span4": this.data.speed + '节',
                                                        "span5": lngFormatter(this.data.lng),
                                                        "span6": latFormatter(this.data.lat),
                                                        "span7": this.data.draught,
                                                        "span8": this.data.text,
                                                        "span9": resultMsg[this.data.idx].windSpeed,
                                                        "span10": resultMsg[this.data.idx].windDirection,
                                                        "span11": this.data.heading,
                                                        "span12": this.data.rot,
                                                    });
                                                    trackMarkerArr.push(trackMarker);
                                                }
                                            });
                                            //鼠标离开
                                            marker.addListener('mouseout', function () {
                                                marker.setIcon(symbolCircle);
                                                if(trackMarkerArr.length != 0){
                                                    for (let i = 0; i < trackMarkerArr.length; i++) {
                                                        trackMarkerArr[i].setMap(null);
                                                    }
                                                }
                                            });
                                        };*/

                                        /*var routeMarkerCluster = new MarkerClusterer(map, routeMarkerArr);
                                        typhoonMarkerClusterArr.push(routeMarkerCluster);
                                        var timeLineCluster = new MarkerClusterer(map, timeLineArr);
                                        typhoonMarkerClusterArr.push(timeLineCluster);*/

                                        //绘制起点
                                        startMarker = new google.maps.Marker({
                                            position: {
                                                lat: locus[0].lat,
                                                lng: locus[0].lng
                                            },
                                            map: map,
                                            icon: '../../static/images/start.png',
                                            /*label: '起',*/
                                        });

                                        allShipMarker.push(startMarker);

                                        //轨迹终点箭头样式
                                        var symbolEnd = {
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor: '#000',
                                            strokeWeight: 1,
                                            fillColor: '#00ff60',
                                            fillOpacity: 1,
                                            scale: 1,
                                            rotation: locus[locus.length - 1].cog,
                                        };

                                        //绘制终点
                                        endMarker = new google.maps.Marker({
                                            position: {
                                                lat: locus[locus.length - 1].lat,
                                                lng: locus[locus.length - 1].lng
                                            },
                                            map: map,
                                            icon: symbolEnd,
                                            /*label: '终',*/
                                        });

                                        allShipMarker.push(endMarker);

                                    } else {

                                        _this.loading.close();

                                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">no tracking information</span>', 'Prompt', {
                                            dangerouslyUseHTMLString: true,
                                            showClose: false,
                                        });

                                    }

                                    //绘制轨迹请求
                                    $.ajax({
                                        url: _this.url + '/api/geojson/waypointDetails.json?uuid=' + uuid,
                                        type: 'GET',
                                        success: function (msg) {

                                            if (JSON.stringify(msg) != "{}") {

                                                resultMsg = msg;

                                                zoomResultMsg = resultMsg;

                                            }
                                        },
                                    });
                                },
                            });
                        }
                    } else {
                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please enter date</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                    }
                });
                //取消绘制
                $('.abolish').on('click', function () {

                    _this.isFlagMsg = true;

                    _this.zoomFlag = false;

                    $('.tryQuery').show();

                    $('.abolish').hide();

                    //取消聚类器
                    if (typhoonMarkerClusterArr.length != 0) {
                        for (let i = 0; i < typhoonMarkerClusterArr.length; i++) {
                            typhoonMarkerClusterArr[i].clearMarkers();
                        }
                    }
                    if (allShipMarker.length != 0) {
                        for (var i = 0; i < allShipMarker.length; i++) {
                            allShipMarker[i].setMap(null);
                        };
                    }
                    if (pathMarker.length != 0) {
                        for (let i = 0; i < pathMarker.length; i++) {
                            pathMarker[i].setMap(null);
                            pathMarker[i].remove && pathMarker[i].remove();
                        }
                    }
                    //>>>>>清除港口点
                    if (portSearchArr.length != 0) {
                        for (let i = 0; i < portSearchArr.length; i++) {
                            portSearchArr[i].setMap(null);
                        }
                    }

                    isInitPortMark(map);

                    var obj = {
                        imo: $('.get-imo').text()
                    };

                    searchShip(obj, _this, true);

                    _this.isFlagMsg = true;

                });
                //关闭弹窗
                $('.close-1').on('click', function () {
                    $('.tryQuery').show();
                    $('.abolish').hide();
                    _this.isFlagMsg = true;
                    _this.zoomFlag = false;
                    map.setZoom(map.getZoom());
                    //取消聚类器
                    if (typhoonMarkerClusterArr.length != 0) {
                        for (let i = 0; i < typhoonMarkerClusterArr.length; i++) {
                            typhoonMarkerClusterArr[i].clearMarkers();
                        }
                    }
                    for (var i = 0; i < allShipMarker.length; i++) {
                        allShipMarker[i].setMap(null);
                    }
                    for (let i = 0; i < pathMarker.length; i++) {
                        pathMarker[i].setMap(null);
                    }
                    if (shipOutlineArr.length != 0) {
                        for (let i = 0; i < shipOutlineArr.length; i++) {
                            shipOutlineArr[i].setMap(null);
                        }
                    }
                    //>>>>>>>>清除航速航线轨迹
                    if (lineRouterArr.length != 0) {
                        for (let i = 0; i < lineRouterArr.length; i++) {
                            lineRouterArr[i].setMap(null);
                        }
                    }
                });

                //点击模糊搜索列表搜索船只
                $('.fullz-z').on('click', 'li', function () {

                    var obj = {
                        imo: $(this).find('input').val(),
                        matchkey: $(this).find('.noSpan').text(),
                    };

                    loadingFun();

                    $.ajax({
                        type: "POST",
                        url: _this.url + "/api/searchHistory/findShip.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            if (data.features.length != 0) {

                                _this.loading.close();

                                //取消船只外轮廓高亮
                                if (shipOutlineArr.length != 0) {
                                    for (let i = 0; i < shipOutlineArr.length; i++) {
                                        shipOutlineArr[i].setMap(null);
                                    }
                                }

                                //清除航速航线轨迹
                                if (lineRouterArr.length != 0) {
                                    for (let i = 0; i < lineRouterArr.length; i++) {
                                        lineRouterArr[i].setMap(null);
                                    }
                                }

                                //console.log(data.features[0].properties.shipMessage)
                                //console.log(data.features[0].properties);
                                //var {lat, lng, path, rotation, scale, fillOpacity, fillColor, shipMessage} = data.features[0].properties;

                                var {
                                    lat,
                                    lng,
                                    rotation,
                                    attention,
                                    shipMessage,
                                    isShipPlate
                                } = data.features[0].properties;

                                if(attention == 0){
                                    $('.collect-ship').css({'background-position': '-30px 0'});
                                }else if(attention == 1){
                                    $('.collect-ship').css({'background-position': '0 0'});
                                }else{
                                    alert('不对')
                                }

                                _this.ifCollect = attention;

                                isShipPlate == 0 ? $('.boat-details').hide() : $('.boat-details').show();
                                // $('.boat-details').find('ul li').eq(0).addClass('fullcurrent')
                                map.setZoom(9);

                                map.setCenter({
                                    lat,
                                    lng
                                });

                                _this.isFlagMsg = true;

                                shipMsgFun('Y');

                                _this.shipMessage = shipMessage;

                                _this.zone = shipMessage.zone;

                                $('.pannel_23').addClass('hide');

                                _this.isLatLng = {
                                    lat,
                                    lng
                                };
                                $('.tridWeather').attr('datalat', lat);
                                $('.tridWeather').attr('datalng', lng);
                                setTimeout(function () {
                                    shipOutlineFun(lat, lng);
                                }, 200);
                                _this.time1 = new Date(new Date() - (24 * 7) * 60 * 60 * 1000);
                                _this.time2 = new Date();
                                $('.zIndexZoom').removeClass('zIndex');
                                $('.sr-d1').addClass('zIndex');
                                $('.sr-d1').show();
                                $('.ul-list-data').hide();
                            } else {
                                _this.loading.close();
                                _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No vessel information</span>', 'Prompt', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                });
                            }
                        },
                        error: function (error) {
                            _this.loading.close();
                            console.log(error)
                        }
                    });
                });
                /*//船名IMO搜索框
                $('.ship-search-a').on('click', function () {
                    if ($('.close-1').is(':hidden')) {
                        if ($('.sear_input').val() != '') {
                            var obj = {
                                imo: $('.sear_input').val(),
                                matchkey: _this.matchkey == ''? $('.sear_input').val() : _this.matchkey,
                            };
                            var value = obj.imo;
                            loadingFun();
                            $.ajax({
                                type: "POST",
                                url: _this.url + "/api/searchHistory/findShip.json",
                                data: JSON.stringify(obj),
                                dataType: "json",
                                contentType: "application/json",
                                success: function (data) {
                                    if (data.features.length != 0) {
                                        //console.log(data.features[0].properties.shipMessage)
                                        //console.log(data.features[0].properties);
                                        //取消船只外轮廓高亮
                                        if (shipOutlineArr.length != 0) {
                                            for (let i = 0; i < shipOutlineArr.length; i++) {
                                                shipOutlineArr[i].setMap(null);
                                            }
                                        }
                                        //清除航速航线轨迹
                                        if (lineRouterArr.length != 0) {
                                            for (let i = 0; i < lineRouterArr.length; i++) {
                                                lineRouterArr[i].setMap(null);
                                            }
                                        }
                                        _this.loading.close();
                                        //var {lat, lng, path, rotation, scale, fillOpacity, fillColor, shipMessage} = data.features[0].properties;
                                        var {
                                            lat,
                                            lng,
                                            attention,
                                            shipMessage,
                                            isShipPlate
                                        } = data.features[0].properties;
                                        if(attention == 0){
                                            $('.collect-ship').css({'background-position': '-30px 0'});
                                        }else if(attention == 1){
                                            $('.collect-ship').css({'background-position': '0 0'});
                                        }else{
                                            alert('不对')
                                        }
                                        _this.ifCollect = attention;
                                        isShipPlate == 0 ? $('.boat-details').hide() : $('.boat-details').show();
                                        map.setCenter({
                                            lat,
                                            lng
                                        });
                                        map.setZoom(9);
                                        shipMsgFun('Y');
                                        _this.shipMessage = shipMessage;
                                        $('.zIndexZoom').removeClass('zIndex');
                                        $('.sr-d1').addClass('zIndex');
                                        setTimeout(function () {
                                            shipOutlineFun(lat, lng);
                                        }, 0);
                                        _this.time1 = new Date(new Date() - (24 * 7) * 60 * 60 * 1000);
                                        _this.time2 = new Date();
                                        $('.zIndexZoom').removeClass('zIndex');
                                        $('.sr-d1').addClass('zIndex');
                                        $('.sr-d1').show();
                                    } else {
                                        _this.loading.close();
                                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No vessel information</span>', 'Prompt', {
                                            dangerouslyUseHTMLString: true,
                                            showClose: false,
                                        });
                                    }
                                },
                                error: function (error) {
                                    _this.loading.close();
                                    console.log(error)
                                }
                            });
                        } else {
                            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Vessel name/IMO can not be blank</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        }
                    } else {
                        return;
                    }
                });*/
                //搜索港口列表点击显示船只
                $('.tr-hover-wrap').on('click', '.tr-hover', function () {
                    var lat = +$(this).attr('data-lat');
                    var lng = +$(this).attr('data-lon');
                    map.setCenter({
                        lat,
                        lng
                    });
                    map.setZoom(4);
                });
                //搜索港口关闭窗口
                $('.haven-close').on('click', function () {
                    _this.isFlagMsg = true;
                    //取消船只外轮廓高亮
                    if (shipOutlineArr.length != 0) {
                        for (let i = 0; i < shipOutlineArr.length; i++) {
                            shipOutlineArr[i].setMap(null);
                        }
                    }
                    //>>>>>清除港口点
                    if (portSearchArr.length != 0) {
                        for (let i = 0; i < portSearchArr.length; i++) {
                            portSearchArr[i].setMap(null);
                        }
                    }
                    if (markers.length != 0) {
                        for (var i = 0; i < markers.length; i++) {
                            markers[i].setMap(null);
                        }
                    }
                    map.setZoom(3);
                    map.setCenter({
                        lat: 31,
                        lng: 129
                    });
                    $(this).parent().parent().addClass('hide');
                    $('.sr-d7').css({
                        'display': 'none'
                    });
                });
                //模糊搜索列表显示隐藏
                $('.sear_input').on('input', function () {
                    if ($('.sear_input').val() == '') {
                        $('.ul-list-data').hide();
                    } else {
                        $('.ul-list-data').show();
                    }
                });
                //历史航线查询显示港口
                $('.search-btnHistory').on('click', function () {
                    if (_this.full_searchFrom == '') {
                        return false
                    }
                    if (_this.loadPort3 == '') {
                        return false
                    }
                    /*DWT数据判断*/
                    if (_this.num1 == '' || _this.num2 == '') {} else {
                        var num = isNaN(_this.num1) || isNaN(_this.num2);
                        if (num) {
                            return false
                        } else {
                            if (parseFloat(_this.num2) - parseFloat(_this.num1) <= 0) {
                                return false
                            }
                        }
                    }
                    /*判断日期*/
                    if (_this.time3 == '' || _this.time4 == '' || _this.time3 == null || _this.time4 == null) {
                        return false
                    } else {
                        if (_this.time3 > _this.time4) {
                            return false
                        }
                        //船型
                        var $$shipType = $('.ship-type-wrapHistory').attr('data-value');
                        //时间类型
                        var $$timeType = $('.voyageHistory-wrap').attr('data-value');
                        /*历史航线查询*/
                        var that = _this;
                        var dataObj = {
                            "fromPort": _this.full_searchFrom,
                            "toPort": _this.loadPort3,
                            "sizeType": $$shipType,
                            "timeType": $$timeType,
                            "dwtMaxValue": _this.num2,
                            "dwtMinValue": _this.num1,
                            "startTime": new Date(_this.time3.toString()).getTime(),
                            "endTime": new Date(_this.time4.toString()).getTime(),
                        };
                        /*加载中*/
                        let loadingInstance = Loading.service({
                            lock: true,
                            text: 'Loading',
                            target: document.querySelector('.sr-body'),
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        /*修改load样式*/
                        $('.el-loading-spinner i.el-icon-loading').css({
                            fontSize: '30px'
                        });
                        $('.el-loading-spinner .el-loading-spinner').css({
                            fontSize: '30px'
                        });
                        $('.el-loading-mask').css({
                            zIndex: 10000000000
                        });
                        $.ajax({
                            type: "POST",
                            url: that.url + "/api/geojson/historyport.json",
                            data: JSON.stringify(dataObj),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                loadingInstance.close();
                                that.historyTotal = data.datas.data.length;
                                var portShip = data.datas.data;
                                if (portShip.length != 0) {
                                    _this.isFlagMsg = false;
                                    delShipGreYel();
                                    isInitPortMark(null);
                                    if (limitedShipArr.length != 0) {
                                        for (let i = 0; i < limitedShipArr.length; i++) {
                                            limitedShipArr[i].setMap(null);
                                        }
                                    };
                                    if (portSearchArr.length != 0) {
                                        for (let i = 0; i < portSearchArr.length; i++) {
                                            portSearchArr[i].setMap(null);
                                        }
                                    };
                                    var portSearchClickArr = [];
                                    //使港口船只可点击
                                    for (let i = 0; i < portShip.length; i++) {
                                        let shipLatLng = {
                                            lat: Number(portShip[i].lat),
                                            lng: Number(portShip[i].lon)
                                        };
                                        var portShipIcon = {
                                            path: "M-6 10L0 -10L6 10z",
                                            strokeWeight: 1,
                                            strokeColor: '#000',
                                            fillColor: '#1aff00',
                                            fillOpacity: 1,
                                            scale: 1,
                                            rotation: Number(portShip[i].heading),
                                        };
                                        var instanceMarker = markerFun(shipLatLng, portShipIcon, portSearchClickArr, {
                                            data: {
                                                imo: portShip[i].imo,
                                                datas: portShip[i],
                                            },
                                            latLng: {
                                                lat: portShip[i].lat,
                                                lng: portShip[i].lon
                                            }
                                        });
                                        portSearchArr.push(instanceMarker);
                                        google.maps.event.addListener(portSearchClickArr[i], "click", clickShipMsg);
                                    }
                                }
                                if (data.datas.data.length > 0) {
                                    if (markers.length != 0) {
                                        for (let i = 0; i < markers.length; i++) {
                                            markers[i].setMap(null);
                                        }
                                    }
                                    that.reachLogsHistory = data.datas.data;
                                    $('#sr-d8').css({
                                        'display': 'block'
                                    });
                                    that.exportMsg = `${that.url}/api/export/en/historyport.htm?fromPort=${that.full_searchFrom}&toPort=${that.loadPort3}&sizeType=${$$shipType}&timeType=${$$timeType}&dwtMaxValue=${that.num2}&dwtMinValue=${that.num1}&startTime=${new Date(that.time3.toString()).getTime()}&endTime=${new Date(that.time4.toString()).getTime()}`
                                    var haven = data.datas.html;
                                    //港口标记
                                    var havenMarker = new google.maps.Marker({
                                        position: {
                                            lat: haven.lat,
                                            lng: haven.lon
                                        },
                                        map: map,
                                        icon: '../../static/images/port.png',
                                    });
                                    markers.push(havenMarker);
                                    map.setZoom(4);
                                    map.setCenter({
                                        lat: haven.lat,
                                        lng: haven.lon
                                    });
                                    /*--------------------------------------------------*/
                                }
                            },
                            error: function (error) {
                                loadingInstance.close();
                                console.log(error)
                            }
                        });
                    }
                });
                //发货港模糊搜索列表显示隐藏
                $('.sear_inputFrom').on('input', function () {
                    if ($('.sear_inputFrom').val() == '') {
                        $('.ul-list-dataFrom').hide();
                    } else {
                        $('.ul-list-dataFrom').show();
                    }
                });
                //发货港模糊搜索点击模糊搜索列表搜索船只
                $('.fullz-zFrom').on('click', 'li', function () {
                    $('.ul-list-dataFrom').hide();
                });
                //滚动条放大地图
                $('.enlarge').click(function () {
                    var c = parseInt(map.getZoom());
                    if (c < 13) {
                        ++c;
                        if (c == 12) {
                            map.setZoom(c);
                            $('.dieblock').css({
                                'top': '0%'
                            });
                        }
                        var c1 = (1 - parseInt(c - 2) / 11) * 100;
                        map.setZoom(c);
                        $('.dieblock').css({
                            'top': '' + c1 + '%'
                        });
                    } else {
                        c = 2;
                        map.setZoom(c);
                        $('.dieblock').css({
                            'top': '100%'
                        });
                    }
                });
                //滚动条缩小地图
                $('.reduce').click(function () {
                    var Zoom = parseInt(map.getZoom());
                    //最小层级是2
                    if (Zoom > 2 && Zoom < 13) {
                        --Zoom;
                        if (Zoom == 2) {
                            map.setZoom(Zoom);
                            var heights = parseInt($('.scroll1-height1').css('height')) - 19;
                            $('.dieblock').css({
                                'top': '' + heights + 'px'
                            });
                        } else {
                            var c1 = 1 - parseInt(Zoom - 2) / 11;
                            map.setZoom(Zoom);
                            $('.dieblock').css({
                                'top': '' + c1 * 100 + '%'
                            });
                        }
                    }
                });
                //拖动缩放滚动条
                draw();

                function draw() {
                    var oDiv = document.querySelector('.dieblock');
                    var Parent = document.querySelector('.scroll1-height1');
                    oDiv.onmousedown = function (ev) {
                        var oEvent = ev || event;
                        var disY = oEvent.clientY - oDiv.offsetTop;
                        document.onmousemove = function (ev) {
                            var oEvent = ev || event;
                            var y = oEvent.clientY - disY;
                            if (y < 0) {
                                y = 0;
                            } else if (y > Parent.offsetHeight - oDiv.offsetHeight + 18) {
                                y = Parent.offsetHeight - oDiv.offsetHeight + 18;
                            }
                            oDiv.style.top = y + 'px';
                            var rato = y / (Parent.offsetHeight - oDiv.offsetHeight);
                            var c = parseInt(rato * 11);
                            map.setZoom(11 - c + 2);
                        };
                        document.onmouseup = function () {
                            document.onmousemove = document.onmouseup = null;
                        };
                        //解决FF问题
                        return false;
                    }
                };
                //缩放滚动条
                ZoomNumber();

                function ZoomNumber() {
                    var c = (1 - parseInt((map.getZoom()) - 2) / 11);
                    var heights = (parseInt($('.scroll1-height1').css('height')) - 18) * c;
                    $('.dieblock').css({
                        'top': '' + heights + 'px'
                    });
                };
                //监听地图缩放等级变化修改缩放滚动条位置
                map.addListener('zoom_changed', function () {
                    var initPortIcon = {
                        url: '../../static/images/initPortYellow.png'
                    };
                    var portIcon = {
                        url: '../../static/images/port.png'
                    };
                    console.log('当前缩放等级为' + map.getZoom());
                    var c = (1 - parseInt((map.getZoom()) - 2) / 10);
                    var heights;
                    if (c == 1) {
                        heights = (parseInt($('.scroll1-height1').css('height')) - 18);
                    } else {
                        heights = ((parseInt($('.scroll1-height1').height())) * c);
                    }
                    $('.dieblock').css({
                        'top': '' + heights + 'px'
                    });
                    if (shipBubbleArr.length != 0) {
                        for (let i = 0; i < shipBubbleArr.length; i++) {
                            shipBubbleArr[i].remove();
                        }
                    }
                    if (map.getZoom() < 7 && _this.isFlagMsg) {

                        if (limitedShipArr.length != 0) {

                            for (let i = 0; i < limitedShipArr.length; i++) {
                                limitedShipArr[i].setMap(null);
                            }

                        }

                        showShipGreYel();


                        if (portListArr.length != 0) {
                            for (let i = 0; i < portListArr.length; i++) {
                                portListArr[i].setIcon(initPortIcon);
                            }
                        }
                    } else if (map.getZoom() >= 6 && _this.isFlagMsg) {

                        shipMsgFun();

                        delShipGreYel();

                        if (portListArr.length != 0) {

                            for (let i = 0; i < portListArr.length; i++) {

                                portListArr[i].setIcon(portIcon);

                            }

                        }

                    } else if (map.getZoom() <= 6) {
                        if (limitedShipArr.length != 0) {
                            for (let i = 0; i < limitedShipArr.length; i++) {
                                limitedShipArr[i].setMap(null);
                            }
                            //limitedShipArr.length = 1;
                        }
                    }
                    if (_this.zoomFlag && zoomMar.length != 0) {
                        zoomTrack()
                    };

                    if(map.getZoom() < 7 && portFlag == true){

                        isInitPortMark(map);

                    }

                });

                //历史轨迹
                map.addListener('dragstart', function () {

                    if (_this.zoomFlag && zoomMar.length != 0) {

                        if (pathMarker.length != 0) {

                            for (let i = 0; i < pathMarker.length; i++) {

                                pathMarker[i].setMap(null);

                                pathMarker[i].remove && pathMarker[i].remove();

                            }

                        }

                    }

                });

                map.addListener('dragend', function () {

                    if (_this.zoomFlag && zoomMar.length != 0) {

                        zoomTrack();

                    }

                });

                var oldData = [];

                var newLimitedShipArr = [];
                //船只懒加载
                google.maps.event.addListener(map, "dragend", function () {
                    shipMsgFun();
                });
                //关闭详情弹窗
                $('.close-1-1').click(function () {
                    if (isShipMarker.length != 0) {
                        for (var i = 0; i < isShipMarker.length; i++) {
                            isShipMarker[i].setMap(null)
                        }
                    }
                });
            };
            /*--------------------------------------initMap end--------------------------------------------------------------------*/

            //***********港口查询infoWindow弹窗
            function PortInfoWindowFun(latlng, map, name, method) {
                this.latlng_ = latlng;
                this.name = name;
                this.setMap(map);
                this.method = method;
            }

            PortInfoWindowFun.prototype = new google.maps.OverlayView();
            PortInfoWindowFun.prototype.draw = function () {
                switch (this.method) {
                    case 'portDialog':
                        this.portDialog();
                        break;
                    case 'portDialog1':
                        this.portDialog1();
                        break;
                }
            };
            PortInfoWindowFun.prototype.remove = function () {
                if (this.div_) {
                    this.div_.parentNode.removeChild(this.div_);
                    this.div_ = null;
                    this.setMap(null);
                }
            };
            PortInfoWindowFun.prototype.getPosition = function () {
                return this.latlng_;
            };
            PortInfoWindowFun.prototype.portDialog = function () {
                var me = this;
                var div = this.div_;
                if (!div) {
                    div = this.div_ = document.createElement('div');
                    div.className = me.name;
                    var divChild1 = document.createElement('div');
                    divChild1.style.cssText = "height: 25px;line-height: 25px;white-space:nowrap;";
                    var divChild2 = document.createElement('div');
                    divChild2.style.cssText = "height: 25px;line-height: 25px;white-space:nowrap;";
                    var span1 = document.createElement('span');
                    span1.style.cssText = 'display:inline-block;';
                    span1.className = 'infoWindow-span1';
                    var span2 = document.createElement('span');
                    span2.style.cssText = 'display:inline-block;';
                    span2.className = 'infoWindow-span2';
                    var span3 = document.createElement('span');
                    span3.style.cssText = 'display:inline-block;';
                    span3.className = 'infoWindow-span3';
                    var span4 = document.createElement('span');
                    span4.className = 'infoWindow-span4';
                    span4.style.cssText = 'display:inline-block;';
                    span1.innerHTML = '';
                    span2.innerHTML = '';
                    span3.innerHTML = '';
                    span4.innerHTML = '';
                    divChild1.appendChild(span1);
                    divChild1.appendChild(span2);
                    divChild2.appendChild(span3);
                    divChild2.appendChild(span4);
                    div.appendChild(divChild1);
                    div.appendChild(divChild2);
                    div.style.cssText = "position:absolute;" +
                        "height: 50px;" +
                        "min-width:150px;" +
                        "background-color: rgba(55, 69, 112, 0.64);" +
                        "border-radius: 3px;" +
                        "font-size: 12px;" +
                        "text-align: left;" +
                        "color: #fff;" +
                        "padding: 0px 10px;";
                    var panes = this.getPanes();
                    panes.overlayImage.appendChild(div);
                }
                var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
                if (point) {
                    div.style.left = point.x + 15 + 'px';
                    div.style.top = point.y - 70 + 'px';
                }
            };
            PortInfoWindowFun.prototype.portDialog1 = function () {
                var me = this;
                var div = this.div_;
                if (!div) {
                    div = this.div_ = document.createElement('div');
                    div.className = me.name;
                    var divChild1 = document.createElement('div');
                    divChild1.style.cssText = "height: 25px;line-height: 25px;white-space:nowrap;";
                    var divChild2 = document.createElement('div');
                    divChild2.style.cssText = "height: 25px;line-height: 25px;white-space:nowrap;";
                    var span1 = document.createElement('span');
                    span1.style.cssText = 'display:inline-block;';
                    span1.className = 'infoWindow-span1';
                    var span2 = document.createElement('span');
                    span2.style.cssText = 'display:inline-block;';
                    span2.className = 'infoWindow-span2';
                    var span3 = document.createElement('span');
                    span3.style.cssText = 'display:inline-block;';
                    span3.className = 'infoWindow-span3';
                    var span4 = document.createElement('span');
                    span4.className = 'infoWindow-span4';
                    span4.style.cssText = 'display:inline-block;';
                    span1.innerHTML = '';
                    span2.innerHTML = '';
                    span3.innerHTML = '';
                    span4.innerHTML = '';
                    divChild1.appendChild(span1);
                    divChild1.appendChild(span2);
                    divChild2.appendChild(span3);
                    divChild2.appendChild(span4);
                    div.appendChild(divChild1);
                    div.appendChild(divChild2);
                    div.style.cssText = "position:absolute;" +
                        "height: 50px;" +
                        "min-width:150px;" +
                        "background-color: rgba(55, 69, 112, 0.64);" +
                        "border-radius: 3px;" +
                        "font-size: 12px;" +
                        "text-align: left;" +
                        "color: #fff;" +
                        "padding: 0px 10px;";
                    var panes = this.getPanes();
                    panes.overlayImage.appendChild(div);
                }
                var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
                if (point) {
                    div.style.left = point.x + 15 + 'px';
                    div.style.top = point.y - 70 + 'px';
                }
            };

            //点击显示单船信息
            function clickShipMsg() {

                if (shipOutlineArr.length != 0) {
                    for (let i = 0; i < shipOutlineArr.length; i++) {
                        shipOutlineArr[i].setMap(null);
                    }
                }

                shipOutlineFun(Number(this.data.latLng.lat), Number(this.data.latLng.lng));

                _this.isLatLng = {
                    lat: this.data.latLng.lat,
                    lng: this.data.latLng.lng,
                };

                var obj = {
                    imo: this.data.data.imo
                };

                searchShip(obj, _this, false);

            };

            //定位显示单船信息
            function positionShipMsg(msg) {

                if (shipOutlineArr.length != 0) {
                    for (let i = 0; i < shipOutlineArr.length; i++) {
                        shipOutlineArr[i].setMap(null);
                    }
                }

                shipOutlineFun(Number(msg.latLng.lat), Number(msg.latLng.lng));

                map.setCenter(msg.latLng);

                var obj = {
                    imo: msg.imo
                };

                searchShip(obj, _this, false);

            };

            //船只懒加载
            function shipMsgFun(flag) {
                if (map.getZoom() > 6 && _this.isFlagMsg) {
                    const RTLAT = map.getBounds().getNorthEast().lat();
                    const RTLNG = map.getBounds().getNorthEast().lng();
                    const LBLAT = map.getBounds().getSouthWest().lat();
                    const LBLNG = map.getBounds().getSouthWest().lng();
                    var dataObj = {
                        "lon_w": LBLNG,
                        "lon_e": RTLNG,
                        "lat_s": LBLAT,
                        "lat_n": RTLAT,
                        "type":flag || '',
                    };
                    $.ajax({
                        type: "POST",
                        url: _this.url + "/api/mapVisual/shipRectangle.json",
                        data: JSON.stringify(dataObj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {

                            if (data.status == 0 ) {

                                delShipGreYel();

                                if (limitedShipArr.length != 0) {

                                    for (let i = 0; i < limitedShipArr.length; i++) {

                                        limitedShipArr[i].setMap(null);

                                    }

                                }

                                var limitedShipArr1 = [];

                                for (let i = 0; i < data.datas.length; i++) {

                                    var rotation = Number(data.datas[i].heading);

                                    var strokeColor = data.datas[i].isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                    var fillColor = data.datas[i].isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                    var fillOpacity = data.datas[i].loadEn == 'Full-laden'? 1 : 0;

                                    var shipStyle = {
                                        path: 'M-6 10L0 -10L6 10z',
                                        strokeColor,
                                        strokeOpacity:0.7,
                                        strokeWeight: 2,
                                        fillColor,
                                        fillOpacity,
                                        scale: 1,
                                        rotation,
                                    };

                                    var latLng = {
                                        lat: Number(data.datas[i].lat),
                                        lng: Number(data.datas[i].lng)
                                    };

                                    var datas = {
                                        data: data.datas[i],
                                        latLng,
                                        rotation,
                                        /*color*/
                                    };

                                    markerFun(latLng, shipStyle, limitedShipArr1, datas);

                                }

                                limitedShipArr = limitedShipArr1;

                                for (let i = 0; i < limitedShipArr.length; i++) {

                                    google.maps.event.addListener(limitedShipArr[i], "click", function () {

                                        clickShipMsg.call(this);

                                    });

                                    google.maps.event.addListener(limitedShipArr[i], "mouseover", function () {

                                        var rotation = Number(this.data.data.heading);

                                        var fillColor = this.data.data.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillOpacity = this.data.data.loadEn == 'Full-laden'? 1 : 0;

                                        this.setIcon({
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor: '#ff2200',
                                            strokeOpacity:1,
                                            strokeWeight: 2,
                                            fillColor,
                                            fillOpacity,
                                            scale: 1,
                                            rotation,
                                        });

                                        if (shipBubbleArr.length != 0) {
                                            for (let i = 0; i < shipBubbleArr.length; i++) {
                                                shipBubbleArr[i].remove();
                                            }
                                        }

                                        var latLng = new google.maps.LatLng(this.data.latLng.lat, this.data.latLng.lng);

                                        var shipBubble = new WarInfoWindow(latLng, map, 'ship-bubble', {
                                            "span1": this.data.data.shipName,
                                            "span2": lngFormatter(this.data.latLng.lng),
                                            "span3": latFormatter(this.data.latLng.lat),
                                            "span4": '',
                                            "title1": 'Vessel Name：',
                                            "title2": 'Lng：',
                                            "title3": 'Lat：',
                                            "title4": '',
                                        });

                                        shipBubbleArr.push(shipBubble);

                                    });

                                    google.maps.event.addListener(limitedShipArr[i], "mouseout", function () {
                                        if (shipBubbleArr.length != 0) {
                                            for (let i = 0; i < shipBubbleArr.length; i++) {
                                                shipBubbleArr[i].remove();
                                            }
                                        }
                                        var rotation = Number(this.data.data.heading);

                                        var strokeColor = this.data.data.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillColor = this.data.data.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillOpacity = this.data.data.loadEn == 'Full-laden'? 1 : 0;

                                        this.setIcon({
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor,
                                            strokeOpacity:0.7,
                                            strokeWeight: 2,
                                            fillColor,
                                            fillOpacity,
                                            scale: 1,
                                            rotation,
                                        });
                                    });
                                }
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                }
            };

            //历史轨迹查询
            function zoomTrack() {
                if (pathMarker.length != 0) {
                    for (let i = 0; i < pathMarker.length; i++) {
                        pathMarker[i].setMap(null);
                        pathMarker[i].remove && pathMarker[i].remove();
                    }
                }

                var arr1 = [0, 0, 200, 90, 45, 20, 10, 5, 2, 2, 2, 1, 1];

                var resArr = zoomMar.filter((e, i) => {

                    return i % arr1[map.getZoom()] == 0;

                });

                for (let i = 0; i < resArr.length; i++) {
                    let latLng = new google.maps.LatLng(resArr[i].lat, resArr[i].lng);
                    let text = resArr[i].text;
                    let marker46;
                    //绘制路线点
                    let marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
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
                    marker46 = new WarInfoWindow(latLng, map, 'marker-46', {
                        "span1": text,
                        "title1": '',
                    });
                    timeLineArr.push(marker46);
                    pathMarker.push(marker46);
                    //鼠标移入
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
                                "title1": 'ShipName：',
                                "title2": 'IMO：',
                                "title3": 'MMSI：',
                                "title4": 'Speed：',
                                "title5": 'Lng：',
                                "title6": 'Lat：',
                                "title7": 'Draft：',
                                "title8": 'Time：',
                                "title9": '',
                                "title10": '',
                                "title11": 'Ship bow：',
                                "title12": 'Direction：',
                                "span1": this.data.shipName,
                                "span2": this.data.imo,
                                "span3": this.data.mmsi,
                                "span4": this.data.speed + "K'nots",
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
                                "title1": 'ShipName：',
                                "title2": 'IMO：',
                                "title3": 'MMSI：',
                                "title4": 'Speed：',
                                "title5": 'Lng：',
                                "title6": 'Lat：',
                                "title7": 'Draft：',
                                "title8": 'Time：',
                                "title9": 'Wind speed：',
                                "title10": 'Wind direction：',
                                "title11": 'Ship bow：',
                                "title12": 'Direction：',
                                "span1": this.data.shipName,
                                "span2": this.data.imo,
                                "span3": this.data.mmsi,
                                "span4": this.data.speed + "K'nots",
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
                    });
                }
                ;
            };

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Loading加载
            function loadingFun() {
                let loadingInstance = Loading.service({
                    lock: true,
                    text: 'Loading',
                    target: document.querySelector('.sr-body'),
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                /*修改load样式*/
                $('.el-loading-spinner i.el-icon-loading').css({
                    fontSize: '30px'
                });
                $('.el-loading-mask').css({
                    zIndex: 10000000000
                });
                $('.el-loading-spinner .el-loading-spinner').css({
                    fontSize: '30px'
                });
                // $('.sr-d3').css({'display': 'block', 'left': '32.5%', 'top': '10%'});
                _this.loading = loadingInstance;
            };

            //拖拽函数
            function drag(el) {
                var mouseAndEle = {
                    x: 0,
                    y: 0,
                    ex: 0,
                    ey: 0
                };
                el.onmousedown = function (event) {
                    mouseAndEle.x = event.clientX;
                    mouseAndEle.y = event.clientY;
                    mouseAndEle.ex = el.offsetLeft + document.documentElement.scrollLeft;
                    mouseAndEle.ey = el.offsetTop + document.documentElement.scrollTop;
                    /*mouseAndEle.ey = el.offsetTop;
                    mouseAndEle.ex = el.offsetLeft;*/
                    document.onmousemove = function (event) {
                        var newMouseAndEle = {
                            newX: 0,
                            newY: 0,
                        };
                        newMouseAndEle.newX = event.clientX;
                        newMouseAndEle.newY = event.clientY;
                        var x = mouseAndEle.ex + (newMouseAndEle.newX - mouseAndEle.x);
                        var y = mouseAndEle.ey + (newMouseAndEle.newY - mouseAndEle.y);
                        //console.log(el.offsetLeft);
                        //el.style.transform = `translate(${x}px, ${y}px)`;
                        el.style.left = x + 'px';
                        el.style.top = y + 'px';
                        el.style.bottom = 'auto';
                    };
                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null;
                    }
                }
            };

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>拖拽函数2
            function drag2(el, oWrap) {
                var mouseAndEle = {
                    x: 0,
                    y: 0,
                    ex: 0,
                    ey: 0
                };
                el.onmousedown = function (event) {
                    mouseAndEle.x = event.clientX;
                    mouseAndEle.y = event.clientY;
                    mouseAndEle.ex = oWrap.offsetLeft + document.documentElement.scrollLeft;
                    mouseAndEle.ey = oWrap.offsetTop + document.documentElement.scrollTop;
                    /*mouseAndEle.ey = el.offsetTop;
                     mouseAndEle.ex = el.offsetLeft;*/
                    document.onmousemove = function (event) {
                        var newMouseAndEle = {
                            newX: 0,
                            newY: 0,
                        };
                        newMouseAndEle.newX = event.clientX;
                        newMouseAndEle.newY = event.clientY;
                        var x = mouseAndEle.ex + (newMouseAndEle.newX - mouseAndEle.x);
                        var y = mouseAndEle.ey + (newMouseAndEle.newY - mouseAndEle.y);
                        //console.log(el.offsetLeft);
                        //el.style.transform = `translate(${x}px, ${y}px)`;
                        //                        el.style.left = 0;
                        //                        el.style.top = 0;
                        oWrap.style.left = x + 'px';
                        oWrap.style.top = y + 'px';
                        oWrap.style.bottom = 'auto';
                    };
                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null;
                    }
                }
            };

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>拖拽放大函数
            function dragScale(el, oWrap, oWrap2, oContent, oBody, oTitle, oWidth) {
                var mouseAndEle = {
                    x: 0,
                    y: 0,
                    ex: 0,
                    ey: 0
                };
                el.onmousedown = function (event) {
                    mouseAndEle.x = event.clientX;
                    mouseAndEle.y = event.clientY;
                    mouseAndEle.ex = el.offsetLeft + document.documentElement.scrollLeft;
                    mouseAndEle.ey = el.offsetTop + document.documentElement.scrollTop;
                    /*mouseAndEle.ey = el.offsetTop;
                     mouseAndEle.ex = el.offsetLeft;*/
                    document.onmousemove = function (event) {
                        var newMouseAndEle = {
                            newX: 0,
                            newY: 0,
                        };
                        newMouseAndEle.newX = event.clientX;
                        newMouseAndEle.newY = event.clientY;
                        var x = mouseAndEle.ex + (newMouseAndEle.newX - mouseAndEle.x);
                        var y = mouseAndEle.ey + (newMouseAndEle.newY - mouseAndEle.y);
                        x < 500 && (x = 500);
                        x > oWidth && (x = oWidth);
                        y < 235 && (y = 235);
                        el.style.left = x + 'px';
                        el.style.top = y + 'px';
                        oWrap2.style.width = x + 20 + 'px';
                        oWrap2.style.height = y + 20 + 'px';
                        oWrap.style.width = x + 20 + 'px';
                        oWrap.style.height = y + 20 + 'px';
                        oContent.style.height = y - 20 + 'px';
                        oBody.style.height = y - 66 + 'px';
                        oTitle.style.width = x + 20 + 'px';
                    };
                    document.onmouseup = function () {
                        document.onmousemove = document.onmouseup = null;
                    }
                }
            };
            //弹窗拖拽
            var drags = document.querySelectorAll('.sr-dialog');
            for (var i = 0; i < drags.length; i++) {
                drag(drags[i]);
            }
            ;
            //模糊查询控制
            // var index =1;
            $('.sear_input').keyup(function (event) {

                var ul = $('.ul-list-data').height()
                var li = $('.ul-list-data li').height()
                var liL = $('.ul-list-data li').length
                var len = parseInt(ul / li)
                if ($(this).val() != '') {
                    if (event.keyCode == 38) {
                        // if (_this.index <= 0) {
                        //     _this.index = 0;
                        //     $('.fullz-z').find('li').eq(_this.index).addClass('fullcurrent');
                        //     $('.fullz-z').find('li').not($('.fullz-z').find('li').eq(_this.index)).removeClass('fullcurrent');
                        // }else
                        if (_this.index == 0) {
                            $(".fullz-z ul").scrollTop(0);
                            $('.fullz-z').find('li').eq(0).addClass('fullcurrent');
                            $('.fullz-z').find('li').not($('.fullz-z').find('li').eq(0)).removeClass('fullcurrent');
                        } else {
                            _this.index--;
                            if (_this.index > len) {
                                var liH = $(".fullz-z ul").scrollTop()
                                $(".fullz-z ul").scrollTop(liH - li);
                            }
                            $('.fullz-z').find('li').eq(_this.index - 1).addClass('fullcurrent');
                            $('.fullz-z').find('li').not($('.fullz-z').find('li').eq(_this.index - 1)).removeClass('fullcurrent');
                        }
                    }
                    if (event.keyCode == 40) {
                        if (_this.index >= liL) {
                            _this.index = liL;
                            $('.fullz-z').find('li').eq(liL - 1).addClass('fullcurrent');
                            $('.fullz-z').find('li').not($('.fullz-z').find('li').eq(liL - 1)).removeClass('fullcurrent');
                            $(".fullz-z ul").scrollTop(liL * li);
                        } else {
                            _this.index++;
                            if (_this.index > len) {
                                $('.fullz-z').find('li').eq(_this.index - 1).addClass('fullcurrent');
                                $('.fullz-z').find('li').not($('.fullz-z').find('li').eq(_this.index - 1)).removeClass('fullcurrent');
                                var liH = $(".fullz-z ul").scrollTop()
                                $(".fullz-z ul").scrollTop(liH + li);
                            } else {
                                $('.fullz-z').find('li').eq(_this.index - 1).addClass('fullcurrent');
                                $('.fullz-z').find('li').not($('.fullz-z').find('li').eq(_this.index - 1)).removeClass('fullcurrent');
                            }
                        }
                    }
                }
                if (event.keyCode == 13) {
                    var imo = $('.fullz-z').find('.fullcurrent input').val();
                    _this.full_search = imo;
                    var obj = {
                        imo,
                        matchkey: $('.fullz-z .fullcurrent .noSpan').text()
                    };
                    var value = obj.imo;
                    loadingFun();
                    // console.log(geojson.features.length);
                    $.ajax({
                        type: "POST",
                        url: _this.url + "/api/searchHistory/findShip.json",
                        data: JSON.stringify(obj),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {

                            if (data.features && data.features.length != 0) {
                                _this.loading.close();
                                //取消船只外轮廓高亮
                                if (shipOutlineArr.length != 0) {
                                    for (let i = 0; i < shipOutlineArr.length; i++) {
                                        shipOutlineArr[i].setMap(null);
                                    }
                                }
                                //清除航速航线轨迹
                                if (lineRouterArr.length != 0) {
                                    for (let i = 0; i < lineRouterArr.length; i++) {
                                        lineRouterArr[i].setMap(null);
                                    }
                                }
                                //console.log(data.features[0].properties.shipMessage)
                                //console.log(data.features[0].properties);
                                //var {lat, lng, path, rotation, scale, fillOpacity, fillColor, shipMessage} = data.features[0].properties;
                                var {
                                    lat,
                                    lng,
                                    attention,
                                    rotation,
                                    shipMessage
                                } = data.features[0].properties;
                                if(attention == 0){
                                    $('.collect-ship').css({'background-position': '-30px 0'});
                                }else if(attention == 1){
                                    $('.collect-ship').css({'background-position': '0 0'});
                                }else{
                                    alert('不对')
                                }
                                _this.ifCollect = attention;
                                //console.log(data, '78963522222');
                                map.setZoom(9);
                                map.setCenter({
                                    lat,
                                    lng
                                });
                                shipMsgFun('Y');
                                _this.shipMessage = shipMessage;
                                _this.isLatLng = {
                                    lat,
                                    lng
                                };
                                setTimeout(function () {
                                    shipOutlineFun(lat, lng);
                                }, 200);
                                _this.time1 = new Date(new Date() - (24 * 7) * 60 * 60 * 1000);
                                _this.time2 = new Date();
                                $('.zIndexZoom').removeClass('zIndex');
                                $('.sr-d1').addClass('zIndex');
                                $('.sr-d1').show();
                                $('.ul-list-data').hide();
                            } else {

                                _this.loading.close();

                                $('.sear_input').blur();

                                _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No vessel information</span>', 'Prompt', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                });

                            }

                        },
                        error: function (error) {
                            _this.loading.close();
                            console.log(error)
                        }
                    });
                }
            });
            //航线航速计算弹窗显示
            $('.hx_calc').click(function () {

                $('.zIndexZoom').removeClass('zIndex');
                $('.route_history').addClass('zIndex');
                $('.route_history').toggleClass('hide');
                if ($('.route_history').hasClass('hide')) {
                    $('.route_history').css({
                        'display': 'none'
                    });
                } else {

                    if(_this.userStorage == null){

                        window.location.href = configURL.sys + '/login.htm?returnUrl=' + encodeURIComponent(window.location.href);

                    }else {

                        $('.route_history').css({
                            'display': 'block'
                        });

                        configUrlFun(_this, configURL.ids, _this.memberId, '.route_history', true, 'Zh');

                    }

                }
            });
            //侧边栏
            $('.side-btn').click(function () {
                sideBth(this)
            });
            //菜单展开收缩
            $('.menu_down').click(function () {
                var isReverse = $(this).find('.icon_down').attr('class').indexOf('reverse_180');
                $('.icon_down').removeClass('reverse_180');
                $('.menu_item_form').slideUp(500);
                if (isReverse == -1) {
                    $(this).find('.icon_down').addClass('reverse_180');
                    $(this).next().slideDown(500);
                }
            });

            //地图设置
            $('.ctrl-type-select .item').click(function () {

                var arr = ['VLCC', 'ULCC', 'SUEZMAX', 'AFRAMAX'];

                $(this).find('a').toggleClass('checked');

                var dataArr = ctrlSetMap(arr, '.ctrl-type-select a', 'checked');

                var isY = null;

                $('.ctrl-type-radiu .a1').hasClass('checked')?isY = 'Y': isY = 'N';

                var obj = {"shipType": dataArr,"portShow":isY};

                $.ajax({
                    type: "POST",
                    url: _this.url + "/api/mapVisual/indexInitialize.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {

                        delShipGreYel();

                        isInitPortMark(null);

                        if(map.getZoom() <= 6){

                            initMapShipsPort(data);

                        }else{

                            _this.isFlagMsg = true;

                            shipMsgFun();

                        }

                        if(!$('.ctrl-type-select a').hasClass('checked')){

                            delShipGreYel();

                            _this.isFlagMsg = false;

                        }

                    },
                    error: function (error) {
                        _this.loading.close();
                        console.log(error)
                    }
                });

            });

            $('.ctrl-type-radiu .item').click(function () {

                if( $(this).find('a').hasClass('checked')){return};

                $(this).find('a').addClass('checked');

                $('.ctrl-type-radiu .item').find('a').not($(this).find('a')).removeClass('checked');

                var result = $(this).find('a').attr('uuid');

                var flag = result == 1? map : null;

                portFlag = result == 1?true:false;

                isInitPortMark(flag);

            });

            //地图设置函数
            function ctrlSetMap(dataArr, element, checked) {

                var arr = [];

                $(element).each(function (i, e) {

                    if($(e).hasClass(checked)){

                        arr.push(dataArr[i]);

                    }

                });

                return arr;

            };

            //港口详情当前在港
            $('.current-port').click(function () {

                var dataObj = {
                    dwtMaxValue: "",
                    dwtMinValue: "",
                    portNameEn: _this.initPortNameEn,
                    sizeType: "VLCC,Suezmax,Aframax",
                };

                currentPort(dataObj, _this, true);

            });

            //港口详情预计到港
            $('.predict-port').click(function () {

                var dataObj={
                    dwtMaxValue:"",
                    dwtMinValue:"",
                    endTime:new Date().getTime() * 30,
                    naviStatus:"1,2",
                    pageIndex:-1,
                    pageSize:-1,
                    portNameEn:_this.initPortNameEn,
                    sizeType:"VLCC",
                    startTime:new Date().getTime(),
                };

                predictPort(dataObj, _this);

            });

            //港口详情历史到港
            $('.history-port').click(function () {

                var dataObj={
                    dwtMaxValue:"",
                    dwtMinValue:"",
                    endTime:new Date().getTime(),
                    portNameEn:_this.initPortNameEn,
                    sizeType:"VLCC",
                    startTime:new Date(new Date() - (24 * 60) * 60 * 60 * 1000).getTime(),
                };


                historyPort(dataObj, _this);

            });

            //关闭港口详情
            $('.port-details-close1').click(function () {

                _this.isFlagMsg = true;

                if (_this.infoPortType == 2) { $('.port-details-video-wrap video')[0].pause();}

                //>>>>>清除港口点
                if (portSearchArr.length != 0) {

                    for (let i = 0; i < portSearchArr.length; i++) {
                        portSearchArr[i].setMap(null);
                    }

                }

                if (portShipsLine.length != 0) {
                    for (let i = 0; i < portShipsLine.length; i++) {
                        portShipsLine[i].setMap(null);
                    }
                };

                if (shipOutlineArr.length != 0) {
                    for (let i = 0; i < shipOutlineArr.length; i++) {
                        shipOutlineArr[i].setMap(null);
                    }
                }
                if (closeInfoWindow != null) {
                    closeInfoWindow.remove();
                }
                $('.port-details-wrap').addClass('hide');
                $('.port-details-info').addClass('hide');
                $('.port-queuing-wrap').addClass('hide');
                $('.pannel_27').css('display', 'none');

                map.setZoom(zoomLog);
                map.setCenter(centerLog);
                shipMsgFun();
                isInitPortMark(map);

            });

            //定位我的船队船只
            $('body').on('click', '.my-ships-tr-js', function () {

                var imo = Number($(this).attr('dataImo'));

                var msg = {imo};

                searchShip(msg, _this, true);

            });

            //三天气象信息切换
            $('.tab_item').each(function (i, el) {
                $(el).click(function () {
                    $(this).addClass('active');
                    $(this).parent().find('.tab_item ').not($(this)).removeClass('active');
                    $('.infobody').eq(i).show();
                    $('.infobody').parent().find('.infobody').not($('.infobody').eq(i)).hide();
                })
            });
            //关闭三天气象信息
            $('.tridWeatherClose').click(function () {
                $('.pannel_23').addClass('hide');
            });
            //台风查询结果
            $('.typhoonSearch').click(function () {
                var obj, status;
                if ($('.typhoonWrap').attr('data-value') == 1) {
                    obj = {
                        "beginTime": '',
                        "endTime": '',
                    };
                    status = 0
                } else {
                    obj = {
                        "beginTime": new Date(_this.typhoonTime1).format("yyyy-MM-dd hh:mm:ss"),
                        "endTime": new Date(_this.typhoonTime2).format("yyyy-MM-dd hh:mm:ss"),
                    };
                    status = 1
                }
                ;

                if (_this.typhoonTime1.getTime() < _this.typhoonTime2.getTime()) {
                    if (_this.typhoonTime2.getTime() - _this.typhoonTime1.getTime() < 5356800000) {
                        loadingFun();

                        typhoon(obj).then(res => {

                            var loggingStatus = loggingStatusFun(res);

                            if(!loggingStatus){return};

                            if (res != null && res != '') {
                                //取消聚类器
                                if (typhoonMarkerClusterArr.length != 0) {
                                    for (let i = 0; i < typhoonMarkerClusterArr.length; i++) {
                                        typhoonMarkerClusterArr[i].clearMarkers();
                                    }
                                }
                                isInitPortMark(null);
                                //取消船只外轮廓高亮
                                if (shipOutlineArr.length != 0) {
                                    for (let i = 0; i < shipOutlineArr.length; i++) {
                                        shipOutlineArr[i].setMap(null);
                                    }
                                }
                                if (limitedShipArr.length != 0) {
                                    for (var i = 0; i < limitedShipArr.length; i++) {
                                        limitedShipArr[i].setMap(null);
                                    }
                                    //limitedShipArr.splice(0);
                                }
                                ;
                                if (typhoonMarArr.length != 0) {
                                    for (let i = 0; i < typhoonMarArr.length; i++) {
                                        typhoonMarArr[i].setMap(null);
                                    }
                                }
                                if (typhoonMarArr1.length != 0) {
                                    for (let i = 0; i < typhoonMarArr1.length; i++) {
                                        typhoonMarArr1[i].setMap(null);
                                    }
                                }
                                if (typhoonArr.length != 0) {
                                    for (let i = 0; i < typhoonArr.length; i++) {
                                        typhoonArr[i].setMap(null);
                                    }
                                }
                                if (currentTyphoonArr.length != 0) {
                                    for (let i = 0; i < currentTyphoonArr.length; i++) {
                                        currentTyphoonArr[i].setMap(null);
                                    }
                                }
                                _this.loading.close();
                                delShipGreYel();
                                _this.isFlagMsg = false;

                                if (res.datas.length == 0) {
                                    if (status == 0) {
                                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Typhoon Information</span>', 'information', {
                                            dangerouslyUseHTMLString: true,
                                            showClose: false,
                                        });
                                    } else {
                                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Typhoon Information</span>', 'information', {
                                            dangerouslyUseHTMLString: true,
                                            showClose: false,
                                        });
                                    }



                                } else {


                                    _this.typhoonResult = res.datas;
                                    var result = res.datas;
                                    var color = [{
                                        icon: dottedLine,
                                        offset: '0',
                                        repeat: '15px'
                                    }];
                                    //台风已走过的线
                                    for (let i = 0; i < result.length; i++) {
                                        //台风已走过的线
                                        polyLineFun(map, '#F00', result[i].positions, typhoonArr, 3);

                                        if (result[i].positions.length != 0) {

                                            var togethermarkerArr = [];

                                            //台风已走过的点
                                            for (let j = 0; j < result[i].positions.length; j++) {
                                                var icon = {
                                                    path: google.maps.SymbolPath.CIRCLE,
                                                    strokeWeight: 3,
                                                    strokeColor: result[i].positions[j].colour || '#ffd800',
                                                    fillColor: '#ddd',
                                                    fillOpacity: 1,
                                                    scale: 2.5,
                                                };
                                                //台风已走过的点
                                                var togethermarker = markerFun({
                                                    lat: result[i].positions[j].lat,
                                                    lng: result[i].positions[j].lng
                                                }, icon, typhoonMarArr, result[i].positions[j], 99999);
                                                togethermarkerArr.push(togethermarker);
                                            }
                                            ;
                                            // var typhoonMarkerCluster = new MarkerClusterer(map, togethermarkerArr);
                                            // typhoonMarkerClusterArr.push(typhoonMarkerCluster);
                                            var currentIcon = {
                                                url: '../../static/images/taifeng/typhoon.png',
                                                anchor: new google.maps.Point(18, 18),
                                                /*origin:new google.maps.Point(25, 25),
                                                labelOrigin:new google.maps.Point(-1, 1),*/
                                            };
                                            var currentMark = {
                                                lat: result[i].positions[result[i].positions.length - 1].lat,
                                                lng: result[i].positions[result[i].positions.length - 1].lng
                                            };
                                            //台风当前位置图标
                                            markerFun(currentMark, currentIcon, typhoonArr, result[i].positions[result[i].positions.length - 1], 99999999);
                                            posCenterArr.push(currentMark);
                                            //七级风圈
                                            if (result[i].positions[result[i].positions.length - 1].circle7 != "0.0") {
                                                var myCity1 = new google.maps.Circle({
                                                    center: {
                                                        lat: result[i].positions[result[i].positions.length - 1].lat,
                                                        lng: result[i].positions[result[i].positions.length - 1].lng
                                                    },
                                                    radius: Number(result[i].positions[result[i].positions.length - 1].circle7) * 1000,
                                                    strokeColor: "#ff7300",
                                                    strokeOpacity: 0,
                                                    strokeWeight: 1,
                                                    fillColor: "#ff7300",
                                                    fillOpacity: 0.4,
                                                    zIndex: 88888888,
                                                    map: map,
                                                    data: result[i].positions[result[i].positions.length - 1],
                                                });
                                                google.maps.event.addListener(myCity1, "mouseover", function () {
                                                    var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lng));
                                                    var currentTyphoonArrMarker = new WarInfoWindow(latLng, map, 'currentTyphoonArrMarker', {
                                                        "title1": '七级风圈：',
                                                        "title2": '半径：',
                                                        "span1": '',
                                                        "span2": this.data.circle7 + '公里',
                                                    });
                                                    clearTyphoonArr.push(currentTyphoonArrMarker);
                                                });
                                                google.maps.event.addListener(myCity1, "mouseout", function () {
                                                    if (clearTyphoonArr.length != 0) {
                                                        for (let i = 0; i < clearTyphoonArr.length; i++) {
                                                            clearTyphoonArr[i].remove();
                                                        }
                                                    }
                                                });
                                                currentTyphoonArr.push(myCity1);
                                            }
                                            //十级风圈
                                            if (result[i].positions[result[i].positions.length - 1].circle10 != "0.0") {
                                                var myCity2 = new google.maps.Circle({
                                                    center: {
                                                        lat: result[i].positions[result[i].positions.length - 1].lat,
                                                        lng: result[i].positions[result[i].positions.length - 1].lng
                                                    },
                                                    radius: Number(result[i].positions[result[i].positions.length - 1].circle10) * 1000,
                                                    strokeColor: "#e70014",
                                                    strokeOpacity: 0,
                                                    strokeWeight: 1,
                                                    fillColor: "#e70014",
                                                    fillOpacity: 0.6,
                                                    zIndex: 99999999,
                                                    map: map,
                                                    data: result[i].positions[result[i].positions.length - 1],
                                                });
                                                google.maps.event.addListener(myCity2, "mouseover", function () {
                                                    var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lng));
                                                    var currentTyphoonArrMarker = new WarInfoWindow(latLng, map, 'currentTyphoonArrMarker', {
                                                        "title1": '十级风圈',
                                                        "title2": '半径：',
                                                        "span1": '',
                                                        "span2": this.data.circle10 + '公里',
                                                    });
                                                    clearTyphoonArr.push(currentTyphoonArrMarker);
                                                });
                                                google.maps.event.addListener(myCity2, "mouseout", function () {
                                                    if (clearTyphoonArr.length != 0) {
                                                        for (let i = 0; i < clearTyphoonArr.length; i++) {
                                                            clearTyphoonArr[i].remove();
                                                        }
                                                    }
                                                });
                                                currentTyphoonArr.push(myCity2);
                                            }
                                        }
                                        ;
                                        if (result[i].forepositions.length != 0) {
                                            //预测台风路线
                                            for (let j = 0; j < result[i].forepositions.length; j++) {
                                                //预测台风路线
                                                polyLineFun(map, backgroundFun(j), result[i].forepositions[j], typhoonArr, 3,  color);
                                                //预测台风点
                                                for (let k = 0; k < result[i].forepositions[j].length; k++) {
                                                    var markIcon = {
                                                        path: google.maps.SymbolPath.CIRCLE,
                                                        strokeWeight: 3,
                                                        strokeColor: result[i].forepositions[j][k].colour || '#ffd800',
                                                        fillColor: '#ddd',
                                                        fillOpacity: 1,
                                                        scale: 2.5,
                                                    };
                                                    //预测台风点
                                                    var togethermarker1 = markerFun({
                                                        lat: result[i].forepositions[j][k].lat,
                                                        lng: result[i].forepositions[j][k].lng
                                                    }, markIcon, typhoonMarArr1, result[i].forepositions[j][k], 99999);
                                                }
                                            }
                                            ;
                                        }
                                    }
                                    ;
                                    //台风已走过的路线事件
                                    if (typhoonMarArr.length != 0) {
                                        for (let i = 0; i < typhoonMarArr.length; i++) {
                                            google.maps.event.addListener(typhoonMarArr[i], "mouseover", function () {
                                                var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lng));
                                                var typhoonMarMarker = new WarInfoWindow(latLng, map, 'typhoonMarMarker', {
                                                    "title1": '名称：',
                                                    "title2": '时间：',
                                                    "title3": '气压：',
                                                    "title4": '风力：',
                                                    "title5": '等级：',
                                                    "title6": '风速：',
                                                    "title7": '移动速度：',
                                                    "title8": '移动方向：',
                                                    "title9": '经度',
                                                    "title10": '纬度',
                                                    "title11": '七级风圈：',
                                                    "title12": '十级风圈：',
                                                    "title13": '来源：',
                                                    "span1": this.data.name,
                                                    "span2": this.data.updatetime,
                                                    "span3": this.data.pressure + '百帕',
                                                    "span4": this.data.level + '级',
                                                    "span5": this.data.strong,
                                                    "span6": this.data.windspeed + 'm/s',
                                                    "span7": this.data.movespeed + 'Kn',
                                                    "span8": this.data.movedirection,
                                                    "span9": lngFormatter(this.data.lng),
                                                    "span10": latFormatter(this.data.lat),
                                                    "span11": this.data.circle7 + '公里',
                                                    "span12": this.data.circle10 + '公里',
                                                    "span13": this.data.src,
                                                });
                                                clearTyphoonArr.push(typhoonMarMarker);
                                            });
                                            google.maps.event.addListener(typhoonMarArr[i], "mouseout", function () {
                                                if (clearTyphoonArr.length != 0) {
                                                    for (let i = 0; i < clearTyphoonArr.length; i++) {
                                                        clearTyphoonArr[i].remove();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    ;
                                    //台风预测路线事件
                                    if (typhoonMarArr1.length != 0) {
                                        for (let i = 0; i < typhoonMarArr1.length; i++) {
                                            google.maps.event.addListener(typhoonMarArr1[i], "mouseover", function () {
                                                var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lng));
                                                var typhoonMarArr1Marker = new WarInfoWindow(latLng, map, 'typhoonMarArr1Marker', {
                                                    "title1": '来源：',
                                                    "title2": '时间：',
                                                    "title3": '气压：',
                                                    "title4": '风速：',
                                                    "title5": '经度：',
                                                    "title6": '纬度：',
                                                    "span1": this.data.country,
                                                    "span2": this.data.forecasttime,
                                                    "span3": this.data.forepressure + '百帕',
                                                    "span4": this.data.forespeed + 'm/s',
                                                    "span5": lngFormatter(this.data.lng),
                                                    "span6": latFormatter(this.data.lat),
                                                });
                                                clearTyphoonArr.push(typhoonMarArr1Marker);
                                            });
                                            google.maps.event.addListener(typhoonMarArr1[i], "mouseout", function () {
                                                if (clearTyphoonArr.length != 0) {
                                                    for (let i = 0; i < clearTyphoonArr.length; i++) {
                                                        clearTyphoonArr[i].remove();
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    ;
                                    $(".pannel_20").removeClass('hide');
                                    map.setZoom(2);
                                }
                            }
                        });
                    } else {
                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;"> searching rang cannot be longer than 2 months</span>', '信息', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });

                    }

                } else {
                    _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">finish time cannot be ealier than start time</span>', 'information', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            });
            //定位选中台风
            $('body').on('click', '.posCenter', function () {
                var i = $(this).parent().index();
                map.setCenter(posCenterArr[i]);
                v
                // alert('222')
                map.setZoom(5);
            });
            //点击 气象 台风海盗军演 清除地图数据
            $('.clickClearMsg').click(function () {
                map.overlayMapTypes.clear();
                _this.isFlagMsg = true;
                //取消船只外轮廓高亮
                if (shipOutlineArr.length != 0) {
                    for (let i = 0; i < shipOutlineArr.length; i++) {
                        shipOutlineArr[i].setMap(null);
                    }
                }
                //取消聚类器
                if (typhoonMarkerClusterArr.length != 0) {
                    for (let i = 0; i < typhoonMarkerClusterArr.length; i++) {
                        typhoonMarkerClusterArr[i].clearMarkers();
                    }
                }
                if (typhoonMarArr.length != 0) {
                    for (let i = 0; i < typhoonMarArr.length; i++) {
                        typhoonMarArr[i].setMap(null);
                    }
                }
                if (typhoonMarArr1.length != 0) {
                    for (let i = 0; i < typhoonMarArr1.length; i++) {
                        typhoonMarArr1[i].setMap(null);
                    }
                }
                if (typhoonArr.length != 0) {
                    for (let i = 0; i < typhoonArr.length; i++) {
                        typhoonArr[i].setMap(null);
                    }
                }
                if (currentTyphoonArr.length != 0) {
                    for (let i = 0; i < currentTyphoonArr.length; i++) {
                        currentTyphoonArr[i].setMap(null);
                    }
                }
                //清除海盗军演marer点
                if (pirateArr.length != 0) {
                    for (let i = 0; i < pirateArr.length; i++) {
                        pirateArr[i].setMap(null);
                    }
                }
                if (!$('.pannel_20').hasClass('hide')) {
                    $('.pannel_20').addClass('hide');
                }
                if (!$('.pannel_21').hasClass('hide')) {
                    $('.pannel_20').addClass('hide');
                }
                map.setZoom(map.getZoom());
            });
            //气象海况图例
            $('.qx_form .f_question').click(function () {
                $(".pannel_22").toggleClass('hide');
            });
            //气象海况图例弹窗关闭
            $('.wind-close').click(function () {
                $(this).parent().parent().parent().addClass('hide')
            });
            //台风单选框
            $('.typhoonTiming').hide();
            $('.typhoonContent').click(function () {
                $(this).find('i').addClass('fs-circle-select');
                $('.typhoonContent').not(this).find('i').removeClass('fs-circle-select');
                $('.typhoonWrap').attr('data-value', $(this).attr('data-value'));
                if ($('.typhoonWrap').attr('data-value') == 1) {
                    $('.typhoonTiming').hide();
                } else {
                    $('.typhoonTiming').show();
                }
            });
            //关闭台风查询结果
            $('.typhoon-result').click(function () {
                $('.pannel_20').addClass('hide');
            });
            //海盗军演复选框
            $('.pirate-content').click(function () {
                var result = '';
                $(this).find('.pirate-a').toggleClass('checked');
                var len = $('.pirate-content .checked').length;
                if (len > 0) {
                    $('.pirate-content .pirate-a').each(function (i, e) {
                        if ($(e).hasClass('checked')) {
                            result += $(e).attr('uuid');
                            $('.pirate-wrap').attr('data-value', result);
                        }
                    });
                    var res = result.substr(1);
                    $('.pirate-wrap').attr('data-value', res);
                } else {
                    $('.pirate-wrap').attr('data-value', '');
                }
            });
            //海盗军演查询
            $('.warSearch').click(function () {
                if ($('.pirate-wrap').attr('data-value') != '') {
                    loadingFun();
                    var timeResult = $('.selectTime').val();
                    var result = $('.pirate-wrap').attr('data-value').split(',');
                    var dataObj = {
                        "time": timeResult,
                        "type": result,
                    };
                    navigationWarning(dataObj).then(res => {

                        var loggingStatus = loggingStatusFun(res);

                        if(!loggingStatus){return};

                        if (res != null && res != '') {

                            _this.loading.close();

                            map.setZoom(2);

                            //清除海盗军演marer点
                            if (pirateArr.length != 0) {
                                for (let i = 0; i < pirateArr.length; i++) {
                                    pirateArr[i].setMap(null);
                                }
                            }
                            var {
                                navigationWarning,
                                pirate
                            } = res.datas;
                            //军演
                            if (navigationWarning != null && navigationWarning != '') {
                                var warIcon = '../../static/images/haidao/military exercise.png';
                                for (let i = 0; i < navigationWarning.length; i++) {
                                    var warMar = markerFun(navigationWarning[i].center, warIcon, pirateArr, navigationWarning[i], 99999998);
                                    var warScope = new google.maps.Polygon({
                                        paths: navigationWarning[i].bound,
                                        strokeColor: '#C699D2',
                                        strokeOpacity: 1,
                                        strokeWeight: 1,
                                        fillColor: '#C699D2',
                                        fillOpacity: 0.35,
                                        map: map,
                                        data: navigationWarning[i],
                                    });
                                    google.maps.event.addListener(warScope, 'mousemove', showCoordinate);
                                    google.maps.event.addListener(warMar, 'mouseover', function () {

                                        if (manoeuvreArr.length != 0) {
                                            for (let i = 0; i < manoeuvreArr.length; i++) {
                                                manoeuvreArr[i].remove();
                                            }
                                        }
                                        var latLng = new google.maps.LatLng(this.data.center.lat, this.data.center.lng);
                                        var manoeuvre = new WarInfoWindow(latLng, map, 'military-exercises', {
                                            "span1": '',
                                            "span2": '',
                                            "span3": '',
                                            "span4": '',
                                            "title1": this.data.name,
                                            "title2": '',
                                            "title3": '',
                                            "title4": '',
                                        });
                                        manoeuvreArr.push(manoeuvre);
                                    });
                                    google.maps.event.addListener(warMar, 'mouseout', function () {
                                        if (manoeuvreArr.length != 0) {
                                            for (let i = 0; i < manoeuvreArr.length; i++) {
                                                manoeuvreArr[i].remove();
                                            }
                                        }
                                    });
                                    pirateArr.push(warScope);
                                }
                            }
                            //海盗
                            if (pirate != null && pirate != '') {
                                for (let i = 0; i < pirate.length; i++) {
                                    var pirateIcon = `../../static/images/haidao/${pirate[i].type}.png`;
                                    var pirateMarke = markerFun({
                                        lat: Number(pirate[i].lat),
                                        lng: Number(pirate[i].lng)
                                    }, pirateIcon, pirateArr, pirate[i], 99999998);
                                    google.maps.event.addListener(pirateMarke, 'mouseover', function () {
                                        if (warPirateArr.length != 0) {
                                            for (let i = 0; i < warPirateArr.length; i++) {
                                                warPirateArr[i].remove();
                                            }
                                            ;
                                        }
                                        ;
                                        var result = this.data;
                                        var latLng = new google.maps.LatLng(result.lat, result.lng);
                                        var warPirate = new WarInfoWindow(latLng, map, 'pirate-info-window', {
                                            "span1": result.type,
                                            "span2": lngFormatter(result.lng),
                                            "span3": latFormatter(result.lat),
                                            "span4": result.date,
                                            "title1": 'Type：',
                                            "title2": 'Lng：',
                                            "title3": 'Lat：',
                                            "title4": 'Time：',
                                        });
                                        warPirateArr.push(warPirate);
                                    });
                                    google.maps.event.addListener(pirateMarke, 'mouseout', function () {
                                        if (warPirateArr.length != 0) {
                                            for (let i = 0; i < warPirateArr.length; i++) {
                                                warPirateArr[i].remove();
                                            }
                                            ;
                                        }
                                        ;
                                    });
                                };
                            }
                        } else {
                            _this.loading.close();
                            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'information', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        }
                    });
                } else {
                    _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">input cannot be empty</span>', 'information', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            });
            //气象海况
            var num = 0;
            setTimeout(function () {

                num = _this.weatherTimesIndex

            }, 1000);

            $('.fs-pre_doub').click(function () {

                if ($('.windWaveStream').attr('data-value') != '') {

                    map.overlayMapTypes.clear();
                    --num;
                    if (num < 0) {
                        $('.sign').css('left', '0px');
                        num = 0;
                    }
                    var len = parseInt($('.time_progress').css('width')) / _this.weatherTimes.length;
                    $('.sign').css('left', num * len + 'px');
                    $('.weatherqx span').text(_this.weatherTimes[num]);
                    var wvd = $('.windWaveStream').attr('data-value').split(',');
                    var time = (_this.weatherTimes[num]).replace(/\-/g, '');
                    var time1 = encodeURI(time);
                    if (wvd.length > 0) {
                        for (var i = 0; i < wvd.length; i++) {
                            map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256), wvd[i], time1));
                        }
                    }
                } else {
                    _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please choose at least one weather type</span>', 'information', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            });
            //气象海况
            $('.fs-next_doub').click(function () {
                if ($('.windWaveStream').attr('data-value') != '') {

                    map.overlayMapTypes.clear();
                    ++num;
                    if (num > _this.weatherTimes.length - 1) {
                        $('.sign').css('left', $('.time_progress').css('width'));
                        num = _this.weatherTimes.length - 1;
                        var wvd = $('.windWaveStream').attr('data-value').split(',');
                        var time = (_this.weatherTimes[_this.weatherTimes.length - 1]).replace(/\-/g, '');
                        var time1 = encodeURI(time);
                        for (var i = 0; i < wvd.length; i++) {
                            map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256), wvd[i], time1));
                        }
                    } else {
                        var lef = $('.sign').css('left');
                        var len = parseInt($('.time_progress').css('width')) / _this.weatherTimes.length;
                        $('.sign').css('left', (num + 1) * len + 'px');
                        $('.weatherqx span').text(_this.weatherTimes[num]);
                        var wvd = $('.windWaveStream').attr('data-value').split(',');
                        var time = (_this.weatherTimes[num]).replace(/\-/g, '');
                        var time1 = encodeURI(time);
                        if (wvd.length > 0) {
                            for (var i = 0; i < wvd.length; i++) {
                                map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256), wvd[i], time1));
                            }
                        }
                    }
                } else {
                    _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please choose at least one weather type</span>', 'information', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                }
            });
            //气象海况复选框
            $('.windWave').click(function () {
                $(this).find('a').toggleClass('checked');
                if(_this.userStorage == null){
                    window.location.href = configURL.sys + '/login.htm?returnUrl=' + encodeURIComponent(window.location.href);
                }else {

                    map.overlayMapTypes.clear();

                    var result = '';

                    var len = $('.windWave .checked').length;
                    if (len > 0) {
                        $('.windWave a').each(function (i, e) {
                            if ($(e).hasClass('checked')) {
                                result += $(e).attr('uuid');
                                $('.windWaveStream').attr('data-value', result);
                            }
                        });
                        var res = result.substr(1);
                        $('.windWaveStream').attr('data-value', res);
                        var wvd = $('.windWaveStream').attr('data-value').split(',');
                        var time = $('.weatherqx span').text().replace(/\-/g, '');
                        var time1 = encodeURI(time);
                        if (wvd.length > 0) {
                            for (var i = 0; i < wvd.length; i++) {
                                map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256), wvd[i], time1));
                            }
                        }
                    } else {
                        $('.windWaveStream').attr('data-value', '');
                    }
                }
            });
            setTimeout(function () {
                scroll2();
            }, 3000);

            function scroll2() {
                var header_demo = document.getElementById("header_demo");
                var header_demo1 = document.getElementById("header_demo1");
                var header_demo2 = document.getElementById("header_demo2");
                var header_demo3 = document.getElementById("header_demo3");
                var header_demo4 = document.getElementById("header_demo4");
                var header_demo5 = document.getElementById("header_demo5");
                var header_demo6 = document.getElementById("header_demo6");
                var speed = 15; //数值越大滚动速度越慢
                header_demo2.innerHTML = header_demo1.innerHTML;
                header_demo3.innerHTML = header_demo1.innerHTML;
                header_demo4.innerHTML = header_demo1.innerHTML;
                header_demo5.innerHTML = header_demo1.innerHTML;
                header_demo6.innerHTML = header_demo1.innerHTML;

                function Marquee() {
                    if (header_demo3.offsetWidth - header_demo.scrollLeft < 0)
                        header_demo.scrollLeft -= header_demo1.offsetWidth;
                    else {
                        header_demo.scrollLeft++;
                    }
                }

                var MyMar = setInterval(Marquee, speed);
                header_demo.onmouseover = function () {
                    clearInterval(MyMar)
                };
                header_demo.onmouseout = function () {
                    MyMar = setInterval(Marquee, speed)
                }
            }

            //气象海况时间滑块拖拽
            (function () {
                var ox = 0;
                var lx = 0;
                var statu = false;
                ;
                var left = 0;
                $('.sign').mousedown(function (e) {
                    lx = $(this).offset().left;
                    ox = e.pageX - left;
                    statu = true;
                    $('.time_progress').mousemove(function (e) {
                        var time_progress = parseInt($(this).width());
                        if ($('.windWaveStream').attr('data-value') != '') {
                            if (statu) {
                                map.overlayMapTypes.clear();
                                left = e.pageX - ox;
                                if (left < 0) {
                                    left = 0;
                                }
                                if (left > time_progress) {
                                    left = time_progress;
                                }
                                $('.sign').css('left', left);
                                var widthp = Math.round(left / (time_progress / _this.weatherTimes.length));
                                num = widthp;
                                var htmlTime = _this.weatherTimes[widthp];
                                $('.weatherqx span').html(htmlTime);
                                if (widthp < _this.weatherTimes.length) {
                                    var time = (_this.weatherTimes[widthp]).replace(/\-/g, '');
                                }
                                var wvd = $('.windWaveStream').attr('data-value').split(',');
                                var time1 = encodeURI(time);
                                for (var i = 0; i < wvd.length; i++) {
                                    map.overlayMapTypes.insertAt(0, new CoordMapType(new google.maps.Size(256, 256), wvd[i], time1));
                                }
                            }
                        } else {
                            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please choose at least one weather type </span>', 'information', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        }
                    })
                })
                $(document).mouseup(function () {
                    statu = false;
                });
            }());

            //warInfoWindow海盗军演自定义气泡弹窗
            function WarInfoWindow(latlng, map, className, innerHTML, offsetX, offsetY) {
                this.latlng_ = latlng;
                this.className = className;
                this.offsetX = offsetX;
                this.offsetY = offsetY;
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
                    }
                    ;
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

            //气象海况瓦片图
            function CoordMapType(tileSize, type, time) {
                this.tileSize = tileSize;
                this.type = type;
                this.time = time;
            };
            CoordMapType.prototype.getTile = function (coord, zoom, ownerDocument) {
                var arr = [0, 1, 3, 7, 15, 31, 63]
                if (coord.y >= 0 && coord.y <= arr[zoom]) {
                    var div = ownerDocument.createElement('div');
                    div.className = 'sss';
                    div.www = coord;
                    div.style.width = this.tileSize.width + 'px';
                    div.style.height = this.tileSize.height + 'px';
                    div.style.fontSize = '10';
                    if (zoom <= 7) {
                        var url = _this.url + '/api/weather/weatherChart.json?type=' + this.type + '&x=' + coord.x + '&y=' + coord.y + '&z=' + zoom + '&time=' + this.time + '';
                        div.style.backgroundImage = 'URL(' + url + ')';
                    } else {
                        div.style.backgroundImage = 'URL()';
                    }
                    return div;
                }
            };
            $('.typhoonWrap .el-input__inner').css({
                "paddingRight": "0"
            });
            //$('.typhoonWrap .el-input__suffix-inner').remove();
            /*********************************************************************************************************************/
            //>>>>>>>>>>>>>>弹出层点击事件
            $('.zIndexZoom').click(function () {

                $(this).addClass('zIndex').siblings('.zIndexZoom').removeClass('zIndex');

                /*var curZindex = $(this).css('z-index');

                                $(this).css('z-index', curZindex + 1);*/

            });
            //船型复选框
            $('.ship-type-wrap .sr-chk').on('click', function () {
                var result = '';
                $(this).toggleClass('checked');
                $('.ship-type-wrap .sr-chk').each(function (i, e) {
                    if ($(e).hasClass('checked')) {
                        result += $(e).attr('uuid');
                        $('.ship-type-wrap').attr('data-value', result);
                    }
                });
            });
            //载重状态单选框
            $('.load-wrap .sr-chk').on('click', function () {
                $(this).addClass('checked');
                $('.load-wrap').attr('data-value', $(this).attr('uid'));
                $('.load-wrap .sr-chk').not(this).removeClass('checked');
            });
            //航行状态单选框
            $('.voyage-wrap .sr-chk').on('click', function () {
                $(this).addClass('checked');
                $('.voyage-wrap').attr('data-value', $(this).attr('uid'));
                $('.voyage-wrap .sr-chk').not(this).removeClass('checked');
            });
            var closeInfoWindow = null;
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>港口查询查询按钮
            $('.search-button').click(function () {
                //红圆
                var symbolCircle = {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeWeight: 3,
                    strokeColor: '#F00',
                    fillColor: '#ddd',
                    fillOpacity: 1,
                    scale: 4,
                };
                //>>>>>清除港口点
                if (portSearchArr.length != 0) {
                    for (let i = 0; i < portSearchArr.length; i++) {
                        portSearchArr[i].setMap(null);
                    }
                }

                if (portShipsLine.length != 0) {
                    for (let i = 0; i < portShipsLine.length; i++) {
                        portShipsLine[i].setMap(null);
                    }
                };

                if (closeInfoWindow != null) {

                    closeInfoWindow.remove();

                }

                for (let i = 0; i < shipOutlineArr.length; i++) {
                    shipOutlineArr[i].setMap(null);
                }
                //港口
                var $haven = $('.select-port-1').val();
                //船型
                var shipType = $('.wrap-ship-type').attr('data-value');
                //航行状态
                var $naviStatus = $('.ship-status').attr('data-value');
                if (closeInfoWindow != null) {
                    closeInfoWindow.remove();
                }
                if ($($('.radio-list')[0]).hasClass('fs-circle-select')) { //当前在港
                    if ($haven != '') {

                        var dataObj = {
                            "dwtMinValue": _this.dwt1,
                            "dwtMaxValue": _this.dwt2,
                            "portNameEn": $haven,
                            "sizeType": shipType,
                        };
                        //loading

                        currentPort(dataObj, _this, false);


                    } else {
                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please select a port</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                    }
                } else if ($($('.radio-list')[1]).hasClass('fs-circle-select')) { //预计到港
                    if ($haven != '') {
                        var dataObj = {
                            "dwtMinValue": _this.dwt1,
                            "dwtMaxValue": _this.dwt2,
                            "startTime": new Date(_this.time5).getTime(),
                            "endTime": new Date(_this.time6).getTime(),
                            "naviStatus": $naviStatus,
                            "portNameEn": $haven,
                            "sizeType": shipType,
                            "pageIndex": -1,
                            "pageSize": -1,
                        };

                        predictPort(dataObj, _this);

                    } else {
                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please select a port</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                    }
                } else if ($($('.radio-list')[2]).hasClass('fs-circle-select')) { //历史到港
                    if ($haven != '') {
                        var dataObj = {
                            "dwtMinValue": _this.dwt1,
                            "dwtMaxValue": _this.dwt2,
                            "startTime": new Date(_this.time8).getTime(),
                            "endTime": new Date(_this.time9).getTime(),
                            "portNameEn": $haven,
                            "sizeType": shipType,
                        };

                        historyPort(dataObj, _this);

                    } else {
                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Please select a port</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                    }
                }
            });

            //点击当前港口、预计到港、历史到港、历史航线列表定位当前船位置
            $('body').on('click', '.present-port,.tableRowOne10,.tableRowOne11,.tableRowOne8', function () {

                var lat = Number($(this).attr('data-lat'));

                var lng = Number($(this).attr('data-lng'));

                var msg = {
                    latLng: {lat, lng},
                    imo: $(this).find('div:eq(2)').text(),
                };

                positionShipMsg(msg);

            });

            //点击靠港查询定位当前港口位置
            $('body').on('click', '.tableRowOne3', function () {

                if (shipOutlineArr.length != 0) {
                    for (let i = 0; i < shipOutlineArr.length; i++) {
                        shipOutlineArr[i].setMap(null);
                    }
                }

                if (stopPortArr.length != 0) {
                    for (let i = 0; i < stopPortArr.length; i++) {
                        stopPortArr[i].setMap(null);
                    }
                }

                var lat = Number($(this).attr('data-lat'));

                var lng = Number($(this).attr('data-lng'));

                var portMark = markerFun({
                    lat,
                    lng
                }, '../../static/images/port.png', stopPortArr, _this.reachLogs1[$(this).index()]);

                centerLog = {lat: _this.reachLogs1[$(this).index()].lat, lng: _this.reachLogs1[$(this).index()].lon};

                _this.isPortLatLng = {lat: _this.reachLogs1[$(this).index()].lat, lng: _this.reachLogs1[$(this).index()].lon};

                _this.portForeign = _this.reachLogs1[$(this).index()].foreign;

                _this.countryStatus = _this.reachLogs1[$(this).index()].country;

                _this.initPortName = _this.reachLogs1[$(this).index()].portNameEn;

                _this.initPortNameEn = _this.reachLogs1[$(this).index()].portNameEn;

                _this.initPortCurrent = _this.reachLogs1[$(this).index()].counrtyEn;

                //取消船只外轮廓高亮
                if (shipOutlineArr.length != 0) {

                    for (let i = 0; i < shipOutlineArr.length; i++) {

                        shipOutlineArr[i].setMap(null);

                    }

                }

                //>>>>>清除港口点
                if (portSearchArr.length != 0) {

                    for (let i = 0; i < portSearchArr.length; i++) {

                        portSearchArr[i].setMap(null);

                    }

                }

                if (closeInfoWindow != null) {

                    closeInfoWindow.remove();

                }

                $('.port-details-info').addClass('hide');

                $.ajax({
                    type: "GET",
                    url: _this.url + "/api/weather/seaportWeather.json?nameEn=" + _this.reachLogs1[$(this).index()].portNameEn,
                    success: function (data) {

                        if (data != null && data.datas != null && data.datas.accessory.fileList.length != 0 && data.datas.seaport.currents.length != 0) {

                            var msg = data.datas;

                            _this.portForeign = msg.foreign;

                            _this.infoPortType = msg.accessory.type;

                            _this.countryStatus = msg.country;

                            _this.infoPortImg = msg.accessory.fileList;

                            _this.infoPortVideo = msg.accessory.fileList;

                            _this.leftinfo = msg.seaport.currents[0];

                            _this.rightinfo = msg.seaport.weathers;

                            _this.portNew = msg.seaport.currents[0].weathers;

                            _this.portQueuingArr = msg.berthPlan;

                        }

                    },

                    error: function (error) {

                        console.log(error)

                    }

                });

                $('.port-details-wrap').removeClass('hide');

                google.maps.event.addListener(portMark, "click", function () {

                    if (map.getZoom() > 6) {

                        zoomLog = map.getZoom();

                        centerLog = {lat: this.data.lat, lng: this.data.lon};

                        _this.isPortLatLng = {lat: this.data.lat, lng: this.data.lon};

                        _this.initPortName = this.data.portNameEn;

                        _this.initPortNameEn = this.data.portNameEn;

                        _this.initPortCurrent = this.data.countryEn;

                        //取消船只外轮廓高亮
                        if (shipOutlineArr.length != 0) {

                            for (let i = 0; i < shipOutlineArr.length; i++) {
                                shipOutlineArr[i].setMap(null);
                            }

                        }

                        //>>>>>清除港口点
                        if (portSearchArr.length != 0) {

                            for (let i = 0; i < portSearchArr.length; i++) {
                                portSearchArr[i].setMap(null);
                            }

                        }

                        if (closeInfoWindow != null) {

                            closeInfoWindow.remove();

                        }
                        $('.port-details-info').addClass('hide');

                        $.ajax({
                            type: "GET",
                            url: _this.url + "/api/weather/seaportWeather.json?nameEn=" + this.data.portNameEn,
                            success: function (data) {

                                if (data != null && data.datas != null && data.datas.accessory.fileList.length != 0 && data.datas.seaport.currents.length != 0) {

                                    var msg = data.datas;

                                    _this.portForeign = msg.foreign;

                                    _this.infoPortType = msg.accessory.type;

                                    _this.countryStatus = msg.country;

                                    _this.infoPortImg = msg.accessory.fileList;

                                    _this.infoPortVideo = msg.accessory.fileList;

                                    _this.leftinfo = msg.seaport.currents[0];

                                    _this.rightinfo = msg.seaport.weathers;

                                    _this.portNew = msg.seaport.currents[0].weathers;

                                    _this.portQueuingArr = msg.berthPlan;

                                }

                            },

                            error: function (error) {

                                console.log(error)

                            }

                        });

                        //var point = LatLng2Pixel(map, new google.maps.LatLng(this.data.lat, this.data.lng));

                        $('.port-details-wrap').removeClass('hide');

                        //$('.pannel_26').css({"top": `${point.y - 20}px`, "left": `${point.x + 30}px`,});
                    }

                });

                google.maps.event.addListener(portMark, "mouseover", function () {

                    var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lon));

                    var warPirate = new WarInfoWindow(latLng, map, 'pirate-info-window', {
                        "title1": 'Port Name：',
                        "span1": this.data.portNameEn,
                    });

                    warPirateArr.push(warPirate);



                });

                google.maps.event.addListener(portMark, "mouseout", function () {
                    if (warPirateArr.length != 0) {
                        for (let i = 0; i < warPirateArr.length; i++) {
                            warPirateArr[i].remove();
                        }
                        ;
                    }
                    ;
                });

                map.setCenter({
                    lat,
                    lng
                });

            });

            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>查询条件单选框
            $('.radio_group-1 label').click(function (event) {
                $(this).find('i').addClass('fs-circle-select');
                _this.portDataValue = $(this).attr('data-value');
                $('.radio_group-1 label').not(this).find('i').removeClass('fs-circle-select');
                if ($(this).find('span').text() == 'Vessels In Port') {
                    $('#sailState').hide();
                    $('.timer-list').hide();
                    _this.loadPortArr = dataResultPort;
                } else if ($(this).find('span').text() == 'Vessels Inbound') {
                    $('#sailState').show();
                    $('.timer-list').show();
                    _this.loadPortArr = dataResultPort1;
                } else if ($(this).find('span').text() == 'Port Arrivals') {
                    $('#sailState').hide();
                    $('.timer-list').show();
                    _this.loadPortArr = dataResultPort1;
                }
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>..船型复选框
            $('.wrap-ship-type label').click(function () {
                var result = '';
                $(this).find('a').toggleClass('checked');
                var len = $('.wrap-ship-type .checked').length;
                if (len > 0) {
                    $('.wrap-ship-type a').each(function (i, e) {
                        if ($(e).hasClass('checked')) {
                            result += $(e).attr('uuid');
                            $('.wrap-ship-type').attr('data-value', result);
                        }
                    });
                    var res = result.substr(1);
                    $('.wrap-ship-type').attr('data-value', res);
                } else {
                    $('.wrap-ship-type').attr('data-value', '');
                }
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>航行状态复选框
            $('.ship-status label').click(function () {
                var result = '';
                $(this).find('a').toggleClass('checked');
                var len = $('.ship-status label .checked').length;
                if (len > 0) {
                    $('.ship-status label a').each(function (i, e) {
                        if ($(e).hasClass('checked')) {
                            result += $(e).attr('uuid');
                        }
                    });
                    var res = result.substr(1);
                    $('.ship-status').attr('data-value', res);
                } else {
                    $('.ship-status').attr('data-value', '');
                }
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>关闭港口查询弹窗
            $('.search-port-close').click(function () {
                $(this).parent().parent().addClass('hide');
                _this.isFlagMsg = true;
                //>>>>>清除港口点
                if (portSearchArr.length != 0) {
                    for (let i = 0; i < portSearchArr.length; i++) {
                        portSearchArr[i].setMap(null);
                    }
                }
                if (portShipsLine.length != 0) {
                    for (let i = 0; i < portShipsLine.length; i++) {
                        portShipsLine[i].setMap(null);
                    }
                };
                if (shipOutlineArr.length != 0) {
                    for (let i = 0; i < shipOutlineArr.length; i++) {
                        shipOutlineArr[i].setMap(null);
                    }
                }
                if (closeInfoWindow != null) {
                    closeInfoWindow.remove();
                }
                shipMsgFun();
                map.setZoom(map.getZoom());
                isInitPortMark(map);
                $('.pannel_6').hide();
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>顶部固定
            var classArr = [".tableBody3", ".tableBody8", ".tableBody9", ".tableBody10", ".tableBody11"];
            classArr.forEach(function (i, e) {
                $(i).on('scroll', function () {
                    var left = $(this).scrollLeft();
                    $(this).prev().scrollLeft(left);
                });
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>弹窗拖拽放大
            //拖拽放大函数
            function $$(select) {
                return document.querySelector(select);
            }

            var width3 = 1800;
            var width8 = ($('#sr-d8 .tableHead .item').length - 1) * 101 + 12;
            var width9 = ($('#sr-d9 .tableHead .item').length - 1) * 101 + 16;
            var width10 = ($('#sr-d10 .tableHead .item').length - 1) * 101 + 16;
            var width11 = ($('#sr-d11 .tableHead .item').length - 1) * 101 + 16;
            drag2($$(".sr-dialog3"), $$("#sr-d3"));
            dragScale($$('.line3'), $$("#sr-d3"), $$(".sr-d-3"), $$("#sr-d3 .contentWrap"), $$(".tableBody3"), $$("#sr-d3 .sr-d8-title"), width3);
            drag2($$(".sr-dialog8"), $$("#sr-d8"));
            dragScale($$('.line8'), $$("#sr-d8"), $$(".sr-d8"), $$("#sr-d8 .contentWrap"), $$(".tableBody8"), $$("#sr-d8 .sr-d8-title"), width8);
            drag2($$(".sr-dialog9"), $$("#sr-d9"));
            dragScale($$('.line9'), $$("#sr-d9"), $$(".sr-d9"), $$("#sr-d9 .contentWrap"), $$(".tableBody9"), $$("#sr-d9 .sr-d8-title"), width9);
            drag2($$(".sr-dialog10"), $$("#sr-d10"));
            dragScale($$('.line10'), $$("#sr-d10"), $$(".sr-d10"), $$("#sr-d10 .contentWrap"), $$(".tableBody10"), $$("#sr-d10 .sr-d8-title"), width10);
            drag2($$(".sr-dialog11"), $$("#sr-d11"));
            dragScale($$('.line11'), $$("#sr-d11"), $$(".sr-d11"), $$("#sr-d11 .contentWrap"), $$(".tableBody11"), $$("#sr-d11 .sr-d8-title"), width11);
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>航速航线功能
            $('.routeLineClick').click(function () {
                _this.timeGMT = gmtFormatter(_this.isLatLng.lng);
                _this.lineVal2 = "Lng：" + lngFormatter(Number(_this.isLatLng.lng).toFixed(5).toString()) + ' Lat：' + latFormatter(Number(_this.isLatLng.lat).toFixed(5).toString());
            });
            //>>>>>>>>>>>>>>>>>>>航速航线船型选择
            $('.line-ship-type').click(function () {
                $(this).find('a').addClass('checked checked_2');
                $('.line-ship-type a').not($(this).find('a')).removeClass('checked checked_2');
                $('.line-speed-type').attr('data-value', $(this).attr('data-value'));
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 航速航线计算
            $('.calculate1').click(function () {
                _this.totalDistance = 0;
                var $speed = _this.speedSpeed; //航速
                var $firstPort = _this.lineVal1; //第一个港口
                var $shipType = $('.line-speed-type').attr('data-value'); //船型
                var newStr = true; //为true可以计算
                var arr = [];
                var $result = [];
                _this.lineList.forEach(function (i, e) {
                    if (i.value != '') {
                        arr.push(e);
                    }
                });
                var len = arr.length - 1;
                _this.lineList.forEach(function (i, e) {
                    if (e <= len && i.value == '') {
                        newStr = false;
                    }
                });
                if (len < 0) {
                    _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Select at least two ports</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                } else {
                    //正确计算航速航线的判断入口
                    if (newStr == true) {
                        loadingFun();
                        $result = _this.lineList.filter(function (i, e) {
                            return i.value != ''
                        });
                        $result.unshift({
                            value: $firstPort
                        });
                        var $route = [];
                        $result.forEach(function (item, index) {
                            if (index < $result.length - 1) {
                                if (index == 0) {
                                    $route.push({
                                        "fromPort": $result[index].value.value,
                                        "toPort": $result[index + 1].value,
                                        "startTime": new Date(_this.time7.toString()).getTime(),
                                        "stayTime": $result[index + 1].stayTime,
                                        "speed": $result[index + 1].speed
                                    })
                                } else {
                                    $route.push({
                                        "fromPort": $result[index].value,
                                        "toPort": $result[index + 1].value,
                                        "stayTime": $result[index + 1].stayTime,
                                        "speed": $result[index + 1].speed
                                    });
                                }
                            }
                        });
                        var obj = {
                            /*"dwtMaxValue":"1111111",
                            "dwtMinValue":"1",*/
                            "sizeType": $shipType,
                            "speed": $speed,
                            "route": $route,
                            "fromPortStartTime": $('.get-time7 input').val(),
                            "timeZone": _this.timeArea,
                        };
                        $.ajax({
                            type: "POST",
                            url: _this.url + "/api/geojson/plan.json",
                            data: JSON.stringify(obj),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {

                                var loggingStatus = loggingStatusFun(data);

                                if(!loggingStatus){return};

                                if (data.datas != null && data.datas.data.data.length != 0) {
                                    _this.loading.close();
                                    var msg = data.datas.data.data;
                                    _this.recomendSpeed = data.datas.data.speed;
                                    _this.recomendSpeedH = data.datas.speedReference;
                                    //>>>>>>>>清除航速航线轨迹
                                    if (lineRouterArr.length != 0) {
                                        for (let i = 0; i < lineRouterArr.length; i++) {
                                            lineRouterArr[i].setMap(null);
                                        }
                                    }
                                    if (shipOutlineArr.length != 0) {
                                        for (let i = 0; i < shipOutlineArr.length; i++) {
                                            shipOutlineArr[i].setMap(null);
                                        }
                                    }
                                    //清除轨迹查询轨迹
                                    if (allShipMarker.length != 0) {
                                        for (var i = 0; i < allShipMarker.length; i++) {
                                            allShipMarker[i].setMap(null);
                                        }
                                        ;
                                    }
                                    if (routePortArr.length != 0) {
                                        for (let i = 0; i < routePortArr.length; i++) {
                                            routePortArr[i].remove();
                                        }
                                    }
                                    if (portArr.length != 0) {
                                        for (let i = 0; i < portArr.length; i++) {
                                            portArr[i].setMap(null);
                                        }
                                    }
                                    if (pathMarker.length != 0) {
                                        for (let i = 0; i < pathMarker.length; i++) {
                                            pathMarker[i].setMap(null);
                                            pathMarker[i].remove && pathMarker[i].remove();
                                        }
                                    }
                                    msg.forEach(function (item, index) {
                                        item.value = _this.lineList[index].value;
                                        _this.totalDistance += Number(item.distance);
                                    });
                                    _this.lineList = msg;
                                    //箭头
                                    var symbolArrows = {
                                        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                                        strokeWeight: 4,
                                        strokeColor: '#F00',
                                        fillColor: '#eaedec',
                                        fillOpacity: 1,
                                        scale: 1,
                                    };
                                    delShipGreYel();
                                    isInitPortMark(null);
                                    _this.isFlagMsg = false;
                                    for (let i = 0; i < _this.lineList.length; i++) {
                                        let drawLine = _this.lineList[i].waypoint;
                                        var line = new google.maps.Polyline({
                                            map: map,
                                            strokeColor: '#FF0000',
                                            strokeWeight: 3,
                                            path: drawLine,
                                            icons: [{
                                                icon: symbolArrows,
                                                offset: '20px',
                                                repeat: '200px',
                                            },],
                                        });
                                        //航线数组
                                        lineRouterArr.push(line);
                                    }
                                    //labelOrigin: new google.maps.Point(75, -35),
                                    var startPath = {
                                        url: '../../static/images/port.png',
                                        //anchor: new google.maps.Point(-1, -1),
                                    };
                                    var endPath = '../../static/images/port.png';
                                    var startLat = _this.lineList[0].waypoint[0].lat;
                                    var startLng = _this.lineList[0].waypoint[0].lng;
                                    var endLat = _this.lineList[_this.lineList.length - 1].waypoint[_this.lineList[_this.lineList.length - 1].waypoint.length - 1].lat;
                                    var endLng = _this.lineList[_this.lineList.length - 1].waypoint[_this.lineList[_this.lineList.length - 1].waypoint.length - 1].lng;
                                    var routeLine1 = markerFun({
                                        lat: startLat,
                                        lng: startLng
                                    }, startPath, lineRouterArr, {}, 99999);
                                    var routeLine2 = markerFun({
                                        lat: endLat,
                                        lng: endLng
                                    }, endPath, lineRouterArr, {}, 99999);
                                    map.setCenter({
                                        lat: startLat,
                                        lng: startLng
                                    });
                                    map.setZoom(4);
                                    //港口信息显示
                                    var portMsg = data.datas.html;
                                    for (let i = 0; i < portMsg.length; i++) {
                                        if (i > 0 && i < portMsg.length - 1) {
                                            markerFun({
                                                lat: portMsg[i].lat,
                                                lng: portMsg[i].lon
                                            }, '../../static/images/port.png', portArr);
                                        }
                                        var $routePort = new PortInfoWindowFun(new google.maps.LatLng(portMsg[i].lat, portMsg[i].lon), map, 'route-port', 'portDialog1');
                                        routePortArr.push($routePort);
                                    }
                                    setTimeout(function () {
                                        for (let i = 0; i < portMsg.length; i++) {
                                            $('.route-port').eq(i).find('.infoWindow-span1').html(portMsg[i].nameEn);
                                            $('.route-port').eq(i).find('.infoWindow-span2').html('&nbsp;(' + portMsg[i].country + ')');
                                            $('.route-port').eq(i).find('.infoWindow-span3').html(portMsg[i].time);
                                            $('.route-port').eq(i).find('.infoWindow-span4').html('&nbsp;[' + portMsg[i].zone + ']');
                                        }
                                    }, 1500)
                                } else {
                                    _this.loading.close();
                                    _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No calculation scheme</span>', 'Prompt', {
                                        dangerouslyUseHTMLString: true,
                                        showClose: false,
                                    });
                                }
                            },
                            error: function (error) {
                                console.log(error);
                                _this.loading.close();
                            }
                        });
                    } else {
                        _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Port can not be blank</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                    }
                }
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 实时航速航线计算
            $('.calculate2').click(function () {
                _this.totalDistance2 = 0;
                var $speed = _this.speedSpeed2; //航速
                var $mmsi = _this.shipMMsi; //航速
                //var $firstPort = _this.lineVal2; //第一个港口
                var newStr = true; //为true可以计算
                var arr = [];
                var $result = [];
                _this.lineList2.forEach(function (i, e) {
                    if (i.value != '') {
                        arr.push(e);
                    }
                });
                var len = arr.length - 1;
                _this.lineList2.forEach(function (i, e) {
                    if (e <= len && i.value == '') {
                        newStr = false;
                    }
                });
                if (len < 0) {
                    _this.$alert('<span style="text-align: center">Select at least one port</span>', 'Prompt', {
                        dangerouslyUseHTMLString: true,
                        showClose: false,
                    });
                    return false;
                } else {
                    //正确计算航速航线的判断入口
                    if (newStr == true) {
                        loadingFun();
                        $result = _this.lineList2.filter(function (i, e) {
                            return i.value != ''
                        });

                        function markerFun(latLng, icon) {
                            let startMarker = new google.maps.Marker({
                                position: latLng,
                                map: map,
                                icon: icon,
                                visible: true,
                            });
                            lineRouterArr.push(startMarker);
                        };
                        $result.unshift({
                            value: ''
                        });
                        var $route = [];
                        $result.forEach(function (item, index) {
                            if (index < $result.length - 1) {
                                if (index == 0) {
                                    $route.push({
                                        "fromPort": '',
                                        "toPort": $result[index + 1].value,
                                        "stayTime": $result[index + 1].stayTime,
                                        "speed": $result[index + 1].speed
                                    })
                                } else {
                                    $route.push({
                                        "fromPort": $result[index].value,
                                        "toPort": $result[index + 1].value,
                                        "stayTime": $result[index + 1].stayTime,
                                        "speed": $result[index + 1].speed
                                    })
                                }
                            }
                        });
                        var obj = {
                            "fromPort": _this.urlPortName,
                            "mmsi": $mmsi,
                            "speed": $speed,
                            "route": $route,
                        };
                        /*var obj = {
                        "fromPort":"Ras Laffan",
                        "mmsi":"354231000",
                        "speed":"13",
                        "route":[{"fromPort":"","toPort":"singapore"},{"fromPort":"singapore", "toPort":"ningbo" },{ "fromPort":"ningbo", "toPort":"qingdao" }]
                        }*/
                        $.ajax({
                            type: "POST",
                            url: _this.url + "/api/geojson/planCurrentNew.json",
                            data: JSON.stringify(obj),
                            dataType: "json",
                            contentType: "application/json",
                            success: function (data) {
                                if (data.datas != null) {

                                    var loggingStatus = loggingStatusFun(data);

                                    if(!loggingStatus){return};

                                    _this.loading.close();

                                    var msg = data.datas.data.data;

                                    _this.recomendSpeed2 = data.datas.data.speed;

                                    _this.recomendSpeedN = data.datas.speedReference;

                                    if (limitedShipArr.length != 0) {
                                        for (let i = 0; i < limitedShipArr.length; i++) {
                                            limitedShipArr[i].setMap(null);
                                        }
                                        limitedShipArr.splice(0);
                                    }
                                    if (routePortArr.length != 0) {
                                        for (let i = 0; i < routePortArr.length; i++) {
                                            routePortArr[i].remove();
                                        }
                                    }
                                    //>>>>>>>>清除航速航线轨迹
                                    if (lineRouterArr.length != 0) {
                                        for (let i = 0; i < lineRouterArr.length; i++) {
                                            lineRouterArr[i].setMap(null);
                                        }
                                    }
                                    if (shipOutlineArr.length != 0) {
                                        for (let i = 0; i < shipOutlineArr.length; i++) {
                                            shipOutlineArr[i].setMap(null);
                                        }
                                    }
                                    if (allShipMarker.length != 0) {
                                        for (var i = 0; i < allShipMarker.length; i++) {
                                            allShipMarker[i].setMap(null);
                                        }
                                        ;
                                    }
                                    if (pathMarker.length != 0) {
                                        for (let i = 0; i < pathMarker.length; i++) {
                                            pathMarker[i].setMap(null);
                                            pathMarker[i].remove && pathMarker[i].remove();
                                        }
                                    }
                                    msg.forEach(function (item, index) {
                                        item.value = _this.lineList2[index].value;
                                        _this.totalDistance2 += Number(item.distance);
                                        _this.timeGMT = item.fromNameZone;
                                    });
                                    _this.lineList2 = msg;
                                    //绘制轨迹
                                    var symbolArrows = {
                                        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                                        strokeWeight: 3,
                                        strokeColor: '#F00',
                                        fillColor: '#eaedec',
                                        fillOpacity: 1,
                                        scale: 1,
                                    };
                                    delShipGreYel();
                                    isInitPortMark(null);
                                    //删除船只高亮标记
                                    if (shipOutlineArr.length != 0) {
                                        for (let i = 0; i < shipOutlineArr.length; i++) {
                                            shipOutlineArr[i].setMap(null);
                                        }
                                    }
                                    _this.isFlagMsg = false;
                                    //将要走的航线
                                    for (let i = 0; i < _this.lineList2.length; i++) {
                                        let drawLine = _this.lineList2[i].waypoint;
                                        var line = new google.maps.Polyline({
                                            map: map,
                                            strokeColor: '#00ff3b',
                                            strokeWeight: 3,
                                            path: drawLine,
                                            icons: [{
                                                icon: symbolArrows,
                                                offset: '20px',
                                                repeat: '200px',
                                            },],
                                        });
                                        //航线数组
                                        lineRouterArr.push(line);
                                    }
                                    var historyLine = data.datas.data.history;
                                    var lineSymbol = {
                                        path: 'M 0,-1 0,1',
                                        strokeOpacity: 1,
                                        scale: 4
                                    };
                                    var lineHistory = new google.maps.Polyline({
                                        map: map,
                                        strokeColor: '#00c3ff',
                                        strokeWeight: 3,
                                        strokeOpacity: 0,
                                        path: historyLine,
                                        icons: [
                                            /*{
                                                icon: symbolArrows,
                                                offset: '20px',
                                                repeat: '200px',
                                            },*/
                                            {
                                                icon: lineSymbol,
                                                offset: '0',
                                                repeat: '20px',
                                            }
                                        ],
                                    });
                                    //历史推荐航线数组
                                    lineRouterArr.push(lineHistory);
                                    var startPath = {
                                        url: '../../static/images/port.png',
                                        //anchor: new google.maps.Point(0, 0),
                                    };
                                    markerFun({
                                        lat: historyLine[0].lat,
                                        lng: historyLine[0].lng
                                    }, startPath);
                                    //实时船舶运行状态
                                    var locat = data.datas.data.locat;
                                    var shipStyle = {
                                        path: 'M-6 10L0 -10L6 10z',
                                        strokeColor: '#ff0005',
                                        strokeWeight: 2,
                                        fillColor: '#00d70b',
                                        fillOpacity: 1,
                                        scale: 1,
                                        rotation: locat.heading,
                                    };
                                    var endPath = '../../static/images/port.png';
                                    var startLat = _this.lineList2[0].waypoint[0].lat;
                                    var startLng = _this.lineList2[0].waypoint[0].lng;
                                    var endLat = _this.lineList2[_this.lineList2.length - 1].waypoint[_this.lineList2[_this.lineList2.length - 1].waypoint.length - 1].lat;
                                    var endLng = _this.lineList2[_this.lineList2.length - 1].waypoint[_this.lineList2[_this.lineList2.length - 1].waypoint.length - 1].lng;
                                    markerFun({
                                        lat: startLat,
                                        lng: startLng
                                    }, shipStyle);
                                    markerFun({
                                        lat: endLat,
                                        lng: endLng
                                    }, endPath);
                                    //历史推荐路线
                                    // markerFun({lat: historyLine[0].lat, lng: historyLine[0].lng}, '');
                                    // markerFun({lat: historyLine[historyLine.length-1].lat, lng: historyLine[historyLine.length-1].lng}, '');
                                    map.setCenter({
                                        lat: startLat,
                                        lng: startLng
                                    });
                                    map.setZoom(4);
                                    //港口信息显示
                                    var portMsg = data.datas.html;
                                    for (let i = 0; i < portMsg.length; i++) {
                                        if (i > 0 && i < portMsg.length - 1) {
                                            markerFun({
                                                lat: portMsg[i].lat,
                                                lng: portMsg[i].lon
                                            }, '../../static/images/port.png', portArr);
                                        }
                                        var $routePort = new PortInfoWindowFun(new google.maps.LatLng(portMsg[i].lat, portMsg[i].lon), map, 'route-port', 'portDialog1');
                                        routePortArr.push($routePort);
                                    }
                                    setTimeout(function () {
                                        for (let i = 0; i < portMsg.length; i++) {
                                            $('.route-port').eq(i).find('.infoWindow-span1').html(portMsg[i].nameEn);
                                            $('.route-port').eq(i).find('.infoWindow-span2').html('&nbsp;(' + portMsg[i].country + ')');
                                            $('.route-port').eq(i).find('.infoWindow-span3').html(portMsg[i].time);
                                            $('.route-port').eq(i).find('.infoWindow-span4').html('&nbsp;[' + portMsg[i].zone + ']');
                                        }
                                    }, 1500)
                                } else {
                                    _this.loading.close();
                                    _this.$alert('<span style="text-align: center">No calculation scheme</span>', 'Prompt', {
                                        dangerouslyUseHTMLString: true,
                                        showClose: false,
                                    });
                                }
                            },
                            error: function (error) {
                                console.log(error);
                                _this.loading.close();
                            }
                        });
                    } else {
                        _this.$alert('<span style="text-align: center">Port can not be blank</span>', 'Prompt', {
                            dangerouslyUseHTMLString: true,
                            showClose: false,
                        });
                    }
                }
            });
            //>>>>>>>>清空航速航线计算按钮清空轨迹
            $('.remove-line').click(function () {
                //>>>>>>>>清除航速航线轨迹
                if (lineRouterArr.length != 0) {
                    for (let i = 0; i < lineRouterArr.length; i++) {
                        lineRouterArr[i].setMap(null);
                    }
                }
                if (portArr.length != 0) {
                    for (let i = 0; i < portArr.length; i++) {
                        portArr[i].setMap(null);
                    }
                }
                if (limitedShipArr.length != 0) {
                    for (let i = 0; i < limitedShipArr.length; i++) {
                        limitedShipArr[i].setMap(null);
                    }
                    limitedShipArr.splice(0);
                }
                if (routePortArr.length != 0) {
                    for (let i = 0; i < routePortArr.length; i++) {
                        routePortArr[i].remove();
                    }
                }
                _this.isFlagMsg = false;
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>航速航线行点击事件
            $('.tableBody1').on('click', '.tableRowOneHover', function () {
                var isActive = $(this).find('.item').attr('class').indexOf('activeItem');
                $('.tableBody1').find('.item').removeClass('activeItem');
                $('.tableBody1').find('input').css({
                    backgroundColor: 'rgba(33, 0, 255, 0)'
                });
                if (isActive > 0) {
                    $(this).find('.item').removeClass('activeItem');
                    $(this).find('input').css({
                        backgroundColor: 'rgba(33, 0, 255, 0)'
                    });
                } else {
                    $(this).find('.item').addClass('activeItem');
                    $(this).find('input').css({
                        background: 'rgba(33, 0, 255, 0.5)'
                    });
                }
            });
            //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>实时航速航线行点击事件
            $('.tableBody2').on('click', '.tableRowOneHover', function () {
                var isActive = $(this).find('.item').attr('class').indexOf('activeItem');
                $('.tableBody2').find('.item').removeClass('activeItem');
                $('.tableBody2').find('input').css({
                    backgroundColor: 'rgba(33, 0, 255, 0)'
                });
                if (isActive > 0) {
                    $(this).find('.item').removeClass('activeItem');
                    $(this).find('input').css({
                        backgroundColor: 'rgba(33, 0, 255, 0)'
                    });
                } else {
                    $(this).find('.item').addClass('activeItem');
                    $(this).find('input').css({
                        background: 'rgba(33, 0, 255, 0.5)'
                    });
                }
            });
            //>>>>>>>>>>>>>>>>>关闭航速航线弹窗清除轨迹
            $('.close-route-line').click(function () {
                $('.pannel_24').addClass('hide');
                //>>>>>>>>清除航速航线轨迹
                if (lineRouterArr.length != 0) {
                    for (let i = 0; i < lineRouterArr.length; i++) {
                        lineRouterArr[i].setMap(null);
                    }
                }
                _this.isFlagMsg = true;
                if (portArr.length != 0) {
                    for (let i = 0; i < portArr.length; i++) {
                        portArr[i].setMap(null);
                    }
                }
                _this.clearList();
                if (routePortArr.length != 0) {
                    for (let i = 0; i < routePortArr.length; i++) {
                        routePortArr[i].remove();
                    }
                }
                shipMsgFun();
                map.setZoom(map.getZoom());
            });
            //>>>>>>>>>>>>>>>>>关闭实时航速航线弹窗清除轨迹
            $('.close-route-line2').click(function () {
                //>>>>>>>>清除航速航线轨迹
                if (lineRouterArr.length != 0) {
                    for (let i = 0; i < lineRouterArr.length; i++) {
                        lineRouterArr[i].setMap(null);
                    }
                }
                if (routePortArr.length != 0) {
                    for (let i = 0; i < routePortArr.length; i++) {
                        routePortArr[i].remove();
                    }
                }
                _this.isFlagMsg = true;
                shipMsgFun();
                map.setZoom(map.getZoom());
                _this.clearList2();
            });
            //历史航线复选框
            $('.ship-type-wrapHistory .sr-chk').on('click', function () {
                var result = '';
                $(this).toggleClass('checked');
                var len = $('.ship-type-wrapHistory .checked').length;
                if (len > 0) {
                    $('.ship-type-wrapHistory .sr-chk').each(function (i, e) {
                        if ($(e).hasClass('checked')) {
                            result += $(e).attr('uuid');
                            $('.ship-type-wrapHistory').attr('data-value', result);
                        }
                    });
                    var res = result.substr(1);
                    $('.ship-type-wrapHistory').attr('data-value', res);
                } else {
                    $('.ship-type-wrapHistory').attr('data-value', '');
                }
            });
            //历史航线单选框
            $('.voyageHistory-wrap label').on('click', function () {
                $(this).find('i').addClass('fs-circle-select');
                $('.voyageHistory-wrap').attr('data-value', $(this).find('a').attr('uid'));
                $('.voyageHistory-wrap label').not(this).find('i').removeClass('fs-circle-select');
            });
            //弹窗关闭
            $('.sr-close').click(function () {
                $(this).parent().parent().addClass('hide');
                $(this).parent().parent().css({
                    'display': 'none'
                });
            });
            //历史航线弹窗关闭
            $('.sr-close8').click(function () {
                $(this).parent().parent().parent().addClass('hide');
                $(this).parent().parent().parent().css({
                    'display': 'none'
                });
                if (stopPortArr.length != 0) {
                    for (let i = 0; i < stopPortArr.length; i++) {
                        stopPortArr[i].setMap(null);
                    }
                }
            });
            //关闭弹窗
            $('.reach-close').click(function () {
                $('.reach-popout').addClass('hide');
            });
            //劳氏档案弹窗关闭
            $('.record-close').click(function () {
                $('.pannel_11').hide();
            });
            //敬请期待
            $('.coming').on('click', function () {
                _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Stay tuned</span>', 'Prompt', {
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                });
            });
            //通用滚动条顶部固定
            $('.tableBody').on('scroll', function () {
                var left = $(this).scrollLeft();
                $(this).prev().scrollLeft(left);
            });
            //计算敬请期待
            $('.calc').click(function () {
                _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">Stay tuned</span>', 'Prompt', {
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                });
            });

            /**
             * 绘制marker函数
             * @param latLng
             * @param icon
             * @param delMsgArr
             * @param data
             * @param zIndex
             */
            function markerFun(latLng, icon, delMsgArr, data = {}, zIndex = 99999) {
                let startMarker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: icon,
                    visible: true,
                    zIndex: zIndex,
                    data: data,
                });
                delMsgArr.push(startMarker);
                return startMarker
            };

            function markerFun1(latLng, icon, delMsgArr, data = {}, zIndex = 99999, label) {
                let startMarker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    icon: icon,
                    visible: true,
                    zIndex: zIndex || 9999,
                    data: data || {},
                    label: label
                });
                delMsgArr.push(startMarker);
                return startMarker
            };


            //绘制线段
            function polyLineFun(map, clolr, path, lineArr,strokeWeight, icon) {
                var line = new google.maps.Polyline({
                    map: map,
                    strokeColor: clolr,
                    strokeWeight,
                    strokeOpacity: icon == undefined ? 1 : 0,
                    path: path,
                    icons: icon || [],
                });
                lineArr.push(line);
                return line
            };


            //船只外轮廓高亮函数
            function shipOutlineFun(lat, lng) {
                var shipOutline = new google.maps.Marker({
                    position: {
                        lat,
                        lng
                    },
                    map: map,
                    icon: shipOutlineStyle,
                    /*label: '起',*/
                });
                shipOutlineArr.push(shipOutline);
            }

            // 坐标转像素点
            function LatLng2Pixel(map, latLng) {

                var scale = Math.pow(2, map.getZoom());

                var proj = map.getProjection();

                var bounds = map.getBounds();

                var nw = proj.fromLatLngToPoint(new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getSouthWest().lng()));

                var point = proj.fromLatLngToPoint(latLng);

                return new google.maps.Point(Math.floor((point.x - nw.x) * scale), Math.floor((point.y - nw.y) * scale));

            };

            //格式化经纬度时间yy-dd
            Date.prototype.format = function (format) {
                var args = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                    "S": this.getMilliseconds(),
                };
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var i in args) {
                    var n = args[i];
                    if (new RegExp("(" + i + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
                    }
                }
                return format;
            };

            //搜索船只
            function searchShip(obj, _this, flag) {

                $.ajax({
                    type: "POST",
                    url: _this.url + "/api/geojson/vessel.json",
                    data: JSON.stringify(obj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.features.length != 0) {
                            //var {lat, lng, path, rotation, scale, fillOpacity, fillColor, shipMessage} = data.features[0].properties;
                            var {
                                lat,
                                lng,
                                attention,
                                shipMessage,
                                isShipPlate
                            } = data.features[0].properties;

                            if(attention == 0){
                                $('.collect-ship').css({'background-position': '-30px 0'});
                            }else if(attention == 1){
                                $('.collect-ship').css({'background-position': '0 0'});
                            }else{
                                alert('不对')
                            }

                            _this.ifCollect = attention;

                            isShipPlate == 0 ? $('.boat-details').hide() : $('.boat-details').show();

                            _this.shipMessage = shipMessage;

                            _this.zone = shipMessage.zone;

                            $('.tridWeather').attr('datalat', lat);

                            $('.tridWeather').attr('datalng', lng);

                            _this.isLatLng = {lat, lng};

                            if(flag){

                                map.setZoom(9);

                                map.setCenter({lat, lng});

                                _this.isFlagMsg = true;

                                shipMsgFun('Y');

                                //取消船只外轮廓高亮
                                if (shipOutlineArr.length != 0) {
                                    for (let i = 0; i < shipOutlineArr.length; i++) {
                                        shipOutlineArr[i].setMap(null);
                                    }
                                }

                                setTimeout(function () {
                                    shipOutlineFun(lat, lng);
                                }, 200);

                            }

                            _this.time1 = new Date(new Date() - (24 * 7) * 60 * 60 * 1000);

                            _this.time2 = new Date();

                            $('.pannel_23').addClass('hide');

                            $('.sr-d1').show();

                        }

                    },
                    error: function (error) {
                        console.log(error)
                    }
                });

            };

            //初始化地图港口
            function initMapShipsPort(data) {

                if (data.datas != null) {

                    var greenShip = data.datas.shipsN;

                    var yellowShip = data.datas.shipsY;

                    var portList = data.datas.ports;

                    var initPortIcon = {
                        url: '../../static/images/initPortYellow.png'
                    };

                    var portIcon = {
                        url: '../../static/images/port.png'
                    };

                    var greenIcon = {
                        url: '.../../static/images/haidao/wukong2.png',
                        size: new google.maps.Size(34, 34),
                        origin:new google.maps.Point(34*359, 0),
                        //anchor: new google.maps.Point(13, 13)
                    };

                    var shipMarkerGreArr1 = [];
                    for (let i = 0; i < greenShip.length; i++) {
                        markerFun({
                            lat: Number(greenShip[i].lat),
                            lng: Number(greenShip[i].lng),
                        }, '../../static/images/green.png', shipMarkerGreArr1)
                    }

                    shipMarkerGreArr = shipMarkerGreArr1;

                    var shipMarkerYelArr1 = [];

                    for (let i = 0; i < yellowShip.length; i++) {

                        markerFun({
                            lat: Number(yellowShip[i].lat),
                            lng: Number(yellowShip[i].lng)
                        }, '../../static/images/yellow.png', shipMarkerYelArr1)

                    }

                    shipMarkerYelArr = shipMarkerYelArr1;

                    //港口点击
                    var portListArr1 = [];

                    if (portList != null) {

                        for (let i = 0; i < portList.length; i++) {

                            var portResult = markerFun({

                                lat: Number(portList[i].lat),

                                lng: Number(portList[i].lng)

                            }, initPortIcon, portListArr1, portList[i]);

                            google.maps.event.addListener(portResult, "click", function () {

                                if (map.getZoom() > 6) {

                                    if(_this.userStorage == null){

                                        window.location.href = configURL.sys + '/login.htm?returnUrl=' + encodeURIComponent(window.location.href);

                                        return;

                                    }

                                    _this.infoPortImg.length = 0;
                                    _this.infoPortVideo.length = 0;
                                    _this.infoPortType = null;
                                    zoomLog = map.getZoom();

                                    centerLog = {lat: this.data.lat, lng: this.data.lng};

                                    _this.isPortLatLng = {lat: this.data.lat, lng: this.data.lng};

                                    _this.portForeign = this.data.foreign;

                                    _this.countryStatus = this.data.country;

                                    _this.initPortName = this.data.nameCn;

                                    _this.initPortNameEn = this.data.nameEn;

                                    _this.initPortCurrent = this.data.countryEn;


                                    //取消船只外轮廓高亮
                                    if (shipOutlineArr.length != 0) {
                                        for (let i = 0; i < shipOutlineArr.length; i++) {
                                            shipOutlineArr[i].setMap(null);
                                        }
                                    }

                                    //>>>>>清除港口点
                                    if (portSearchArr.length != 0) {

                                        for (let i = 0; i < portSearchArr.length; i++) {
                                            portSearchArr[i].setMap(null);
                                        }
                                    }

                                    if (closeInfoWindow != null) {

                                        closeInfoWindow.remove();

                                    }
                                    $('.port-details-info').addClass('hide');

                                    $.ajax({
                                        type: "GET",
                                        url: _this.url + "/api/weather/seaportWeather.json?nameEn=" + this.data.nameEn,
                                        success: function (data) {

                                            if (data != null && data.datas && data.datas.seaport.currents.length != 0) {

                                                var msg = data.datas;

                                                _this.infoPortType = msg.accessory.type;

                                                _this.infoPortImg = msg.accessory.fileList;

                                                _this.infoPortVideo = msg.accessory.fileList;

                                                _this.leftinfo = msg.seaport.currents[0];

                                                _this.rightinfo = msg.seaport.weathers;

                                                _this.portNew = msg.seaport.currents[0].weathers;

                                                _this.portQueuingArr = msg.berthPlan;

                                                _this.isPortDate = msg.dateEn;

                                            }

                                        },

                                        error: function (error) {

                                            console.log(error)

                                        }

                                    });

                                    //var point = LatLng2Pixel(map, new google.maps.LatLng(this.data.lat, this.data.lng));

                                    $('.port-details-wrap').removeClass('hide');

                                    //$('.pannel_26').css({"top": `${point.y - 20}px`, "left": `${point.x + 30}px`,});
                                }

                            });

                            google.maps.event.addListener(portResult, "mouseover", function () {

                                if (map.getZoom() > 6) {

                                    var latLng = new google.maps.LatLng(Number(this.data.lat), Number(this.data.lng));

                                    var warPirate = new WarInfoWindow(latLng, map, 'pirate-info-window', {
                                        "title1": 'Port Name：',
                                        "span1": this.data.nameEn,
                                    });

                                    warPirateArr.push(warPirate);

                                }

                            });

                            google.maps.event.addListener(portResult, "mouseout", function () {
                                if (warPirateArr.length != 0) {
                                    for (let i = 0; i < warPirateArr.length; i++) {
                                        warPirateArr[i].remove();
                                    }
                                    ;
                                }
                                ;
                            });

                        }
                        ;

                        portListArr = portListArr1;
                    };

                } else {

                    console.log('初始化数据未请求到...');

                }
            };

            //毫秒转日期
            Date.prototype.Format = function(fmt) {
                var o = {
                    "M+" : this.getMonth()+1, //月份
                    "d+" : this.getDate(), //日
                    "h+" : this.getHours(), //小时
                    "m+" : this.getMinutes(), //分
                    "s+" : this.getSeconds(), //秒
                    "q+" : Math.floor((this.getMonth()+3)/3), //季度
                    "S" : this.getMilliseconds() //毫秒
                };
                if(/(y+)/.test(fmt))
                    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                for(var k in o)
                    if(new RegExp("("+ k +")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                return fmt;
            };

            //生成随机颜色
            function backgroundFun(i) {

                var colorArr = ['#FF2A6C', '#C52BFF', '#FE9329', '#2AFECB', '#2A8EFE', '#00FA9A', '#FFD700', '#FF6347', '#8A2BE2', '#FF00FF'];

                return colorArr[i];

            };

            //格式化经纬度数字
            var xe = (Object.freeze || Object)({
                formatNum: function (t, e) {
                    var i = Math.pow(10, e || 5);
                    return Math.round(t * i) / i
                }
            });

            //格式化经度
            function lngFormatter(t) {
                t %= 360;
                var e = "W";
                t < 0 && t > -180 || t > 180 && t < 360 ? (e = "W", t > 180 && t < 360 && (t -= 360)) : (t > 0 && t < 180 || t < -180 && t > -360) && (e = "E", t < -180 && t > -360 && (t += 360));
                var i = String(t);
                -1 == i.lastIndexOf(".") && (i += ".000");
                var n = i.lastIndexOf("."),
                    r = Number(i.substring(0, n)),
                    o = 60 * Number("0." + i.substring(n + 1, i.length));
                return Math.abs(r) + "º " + xe.formatNum(o, 3) + e
            };

            //格式化纬度
            function latFormatter(t) {
                var e = t < 0 ? "S" : "N",
                    i = String(t);
                -1 == i.lastIndexOf(".") && (i += ".000");
                var n = i.lastIndexOf("."),
                    r = Number(i.substring(0, n)),
                    o = 60 * Number("0." + i.substring(n + 1, i.length));
                return Math.abs(r) + "º " + xe.formatNum(o, 3) + e
            };

            //时区计算
            function gmtFormatter(lng) {
                var GMT = 0;
                lng = Number(lng);
                GMT = Math.round(lng / 15);
                if (GMT > 0) {
                    GMT = '+' + GMT;
                }
                return GMT
            };

            //显示经纬度
            function showCoordinate(event) {
                var center = event.latLng;
                var centerLat = latFormatter(center.lat());
                var centerLng = lngFormatter(center.lng());
                $('#longitudeAndLatitude .latLng-lat').text(centerLat);
                $('#longitudeAndLatitude .latLng-lng').text(centerLng);
                $('#longitudeAndLatitude .latLng-GMT').text("GMT: " + gmtFormatter(center.lng()));
            };

            //删除船只绿点
            function delShipGreYel() {
                if (shipMarkerGreArr.length != 0) {
                    for (let i = 0; i < shipMarkerGreArr.length; i++) {
                        shipMarkerGreArr[i].setMap(null);
                    }
                }
                if (shipMarkerYelArr.length != 0) {
                    for (let i = 0; i < shipMarkerYelArr.length; i++) {
                        shipMarkerYelArr[i].setMap(null);
                    }
                }
            };

            //显示船只绿点
            function showShipGreYel() {
                if (shipMarkerGreArr.length != 0) {
                    for (let i = 0; i < shipMarkerGreArr.length; i++) {
                        shipMarkerGreArr[i].setMap(map)
                    }
                }
                if (shipMarkerYelArr.length != 0) {
                    for (let i = 0; i < shipMarkerYelArr.length; i++) {
                        shipMarkerYelArr[i].setMap(map)
                    }
                }
            };

            //显示删除港口marker
            function isInitPortMark(flag) {
                if (portListArr.length != 0) {
                    for (let i = 0; i < portListArr.length; i++) {
                        portListArr[i].setMap(flag);
                    }
                }
            };

            //当前在港
            function currentPort(dataObj, _this, flag) {
                loadingFun();

                if(flag){

                    //>>>>>清除港口点
                    if (portSearchArr.length != 0) {

                        for (let i = 0; i < portSearchArr.length; i++) {
                            portSearchArr[i].setMap(null);
                        }

                    }

                    if (closeInfoWindow != null) {

                        closeInfoWindow.remove();

                    }

                }

                $.ajax({
                    type: "POST",
                    url: _this.url + "/api/mapVisual/currentProtShip.json",
                    data: JSON.stringify(dataObj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.datas !=null) {
                            _this.loading.close();
                            _this.zaiZhong1 = data;
                            _this.export1 = `${_this.url}/api/export/en/now.htm?dwtMaxValue=${dataObj.dwtMaxValue}&dwtMinValue=${dataObj.dwtMinValue}&portNameEn=${dataObj.portNameEn}&sizeType=${dataObj.sizeType}`;
                            var portLatLng1 = {
                                lat: data.datas.html.lat,
                                lng: data.datas.html.lon
                            };
                            closeInfoWindow = new PortInfoWindowFun(new google.maps.LatLng(data.datas.html.lat, data.datas.html.lon), map, 'info-window-wrap', 'portDialog');

                            //>>>>>港口点
                            let portLatLngMarker1 = new google.maps.Marker({
                                position: portLatLng1,
                                map: map,
                                icon: '../../static/images/port.png',
                                visible: true,
                                zIndex: 10000,
                            });

                            portSearchArr.push(portLatLngMarker1);

                            var myCity = new google.maps.Circle({
                                center: portLatLng1,
                                radius: 80000,
                                strokeColor: "#00c3ff",
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                fillColor: "#00c3ff",
                                fillOpacity: 0.5,
                                zIndex: 10000,
                                map: map
                            });

                            portSearchArr.push(myCity);

                            var portShip = data.datas.data;

                            if (portShip != null) {

                                _this.isFlagMsg = false;

                                delShipGreYel();

                                if(flag){

                                    isInitPortMark(map);

                                    if (limitedShipArr.length != 0) {
                                        for (let i = 0; i < limitedShipArr.length; i++) {
                                            limitedShipArr[i].setMap(null);
                                        }
                                    };

                                }else{

                                    isInitPortMark(null);

                                }

                                var portSearchClickArr = [];

                                //使港口船只可点击
                                if (portShip != null) {
                                    _this.portLog1 = data.datas.data;
                                    for (let i = 0; i < portShip.length; i++) {
                                        let shipLatLng = {
                                            lat: portShip[i].lat,
                                            lng: portShip[i].lon
                                        };
                                        var strokeColor = portShip[i].isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillColor = portShip[i].isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillOpacity = portShip[i].loadEn == 'Full-laden' ? 1 : 0;

                                        var portShipIcon = {
                                            path: "M-6 10L0 -10L6 10z",
                                            strokeWeight: 2,
                                            strokeColor,
                                            fillColor,
                                            fillOpacity,
                                            scale: 1,
                                            rotation: portShip[i].heading,
                                        };

                                        var label = {
                                            color: '#FF0001',
                                            /*fontFamily:'楷体',*/
                                            fontSize: '20px',
                                            fontWeight: '900',
                                            text: `${i + 1}`,
                                            labelOrigin: new google.maps.Point(20, 20),
                                            anchor: new google.maps.Point(40, 40),
                                        };

                                        var instanceMarker = markerFun1(shipLatLng, portShipIcon, portSearchClickArr, {
                                            data: {
                                                imo: portShip[i].imo,
                                                datas: portShip[i],
                                                fillColor,
                                                fillOpacity,
                                                strokeColor,
                                            },
                                            latLng: {
                                                lat: portShip[i].lat,
                                                lng: portShip[i].lon
                                            },
                                            rotation: portShip[i].heading,
                                        }, 99999, label);
                                        portSearchArr.push(instanceMarker);
                                        google.maps.event.addListener(portSearchClickArr[i], "click", clickShipMsg);
                                        google.maps.event.addListener(portSearchClickArr[i], "mouseover", function () {

                                            var fillColor = this.data.data.datas.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                            var fillOpacity = this.data.data.datas.loadEn == 'Full-laden' ? 1 : 0;

                                            this.setIcon({
                                                path: 'M-6 10L0 -10L6 10z',
                                                strokeColor: '#ff1000',
                                                strokeWeight: 2,
                                                fillColor,
                                                fillOpacity,
                                                scale: 1,
                                                rotation: this.data.rotation,
                                            });

                                            if (shipBubbleArr.length != 0) {
                                                for (let i = 0; i < shipBubbleArr.length; i++) {
                                                    shipBubbleArr[i].remove();
                                                }
                                            }

                                            var latLng = new google.maps.LatLng(this.data.latLng.lat, this.data.latLng.lng);

                                            var shipBubble = new WarInfoWindow(latLng, map, 'ship-bubble', {
                                                "span1": this.data.data.datas.shipName,
                                                "span2": lngFormatter(this.data.latLng.lng),
                                                "span3": latFormatter(this.data.latLng.lat),
                                                "span4": '',
                                                "title1": 'Vessel Name：',
                                                "title2": 'Lng：',
                                                "title3": 'Lat：',
                                                "title4": '',
                                            });

                                            shipBubbleArr.push(shipBubble);
                                        });
                                        google.maps.event.addListener(portSearchClickArr[i], "mouseout", function () {
                                            var strokeColor = this.data.data.datas.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                            var fillColor = this.data.data.datas.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                            var fillOpacity = this.data.data.datas.loadEn == 'Full-laden' ? 1 : 0;

                                            this.setIcon({
                                                path: 'M-6 10L0 -10L6 10z',
                                                strokeColor,
                                                strokeWeight: 2,
                                                fillColor,
                                                fillOpacity,
                                                scale: 1,
                                                rotation: this.data.rotation,
                                            });

                                            if (shipBubbleArr.length != 0) {
                                                for (let i = 0; i < shipBubbleArr.length; i++) {
                                                    shipBubbleArr[i].remove();
                                                }
                                            }
                                        });
                                    }
                                }

                                if (data.datas.data != null && data.datas.data.length !=0) {

                                    $('#sr-d9').show();

                                }else{

                                    $('#sr-d9').hide();

                                    _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'information', {
                                        dangerouslyUseHTMLString: true,
                                        showClose: false,
                                    })

                                }

                            } else {
                                $('#sr-d9').hide();
                                _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'information', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                })
                            }
                            map.setZoom(7);
                            map.setCenter(portLatLng1);
                            setTimeout(function () {
                                $('.info-window-wrap .infoWindow-span1').html(data.datas.html.nameEn);
                                $('.info-window-wrap .infoWindow-span2').html('&nbsp;(' + data.datas.html.country + ')');
                                $('.info-window-wrap .infoWindow-span3').html(data.datas.html.time);
                                $('.info-window-wrap .infoWindow-span4').html('&nbsp;[' + data.datas.html.zone + ']');
                            }, 1500);
                        } else {
                            _this.loading.close();
                            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error);
                        _this.loading.close();
                    }
                });
            };

            //预计到港
            function predictPort(dataObj, _this) {

                loadingFun();

                if (closeInfoWindow != null) {

                    closeInfoWindow.remove();

                }

                $.ajax({
                    type: "POST",
                    url: _this.url + "/api/mapVisual/expectedList.json",
                    data: JSON.stringify(dataObj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.datas != null) {
                            _this.loading.close();

                            _this.zaiZhong2 = data;
                            _this.export2 = `${_this.url}/api/export/en/expected.htm?endTime=${dataObj.endTime}&naviStatus=${dataObj.naviStatus}&pageIndex=-1&pageSize=-1&portNameEn=${dataObj.portNameEn}&startTime=${dataObj.startTime}&sizeType=${dataObj.sizeType}`;
                            var portLatLng2 = {
                                lat: data.datas.html.lat,
                                lng: data.datas.html.lng
                            };

                            closeInfoWindow = new PortInfoWindowFun(new google.maps.LatLng(data.datas.html.lat, data.datas.html.lng), map, 'info-window-wrap', 'portDialog');
                            //>>>>>港口点
                            let portLatLngMarker2 = new google.maps.Marker({
                                position: portLatLng2,
                                map: map,
                                icon: '../../static/images/port.png',
                                visible: true,
                                zIndex: 10000,
                            });
                            portSearchArr.push(portLatLngMarker2);
                            var myCity = new google.maps.Circle({
                                center: portLatLng2,
                                radius: 80000,
                                strokeColor: "#00c3ff",
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                fillColor: "#00c3ff",
                                fillOpacity: 0.5,
                                zIndex: 10000,
                                map: map
                            });
                            portSearchArr.push(myCity);
                            var portShip = data.datas.data;
                            if (portShip != null) {
                                _this.portLog2 = data.datas.data;
                                _this.isFlagMsg = false;
                                delShipGreYel();
                                isInitPortMark(null);
                                if (limitedShipArr.length != 0) {
                                    for (let i = 0; i < limitedShipArr.length; i++) {
                                        limitedShipArr[i].setMap(null);
                                    }
                                };

                                if (portShipsLine.length != 0) {
                                    for (let i = 0; i < portShipsLine.length; i++) {
                                        portShipsLine[i].setMap(null);
                                    }
                                };

                                var portSearchClickArr = [];


                                //使港口船只可点击
                                for (let i = 0; i < portShip.length; i++) {
                                    let shipLatLng = {
                                        lat: Number(portShip[i].lat),
                                        lng: Number(portShip[i].lon)
                                    };

                                    var strokeColor = portShip[i].isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                    var fillColor = portShip[i].isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                    var fillOpacity = portShip[i].loadEn == 'Full-laden'? 1 : 0;

                                    var portShipIcon = {
                                        path: "M-6 10L0 -10L6 10z",
                                        strokeWeight: 2,
                                        strokeColor,
                                        fillColor,
                                        fillOpacity,
                                        scale: 1,
                                        rotation: portShip[i].heading,
                                    };

                                    polyLineFun(map, '#FFC200', [shipLatLng,portLatLng2], portShipsLine, 2);

                                    var speed = portShip[i].speed != null?portShip[i].speed+'Knots' : '';

                                    var label = {
                                        color:'#ff3701',
                                        /*fontFamily:'楷体',*/
                                        fontSize:'16px',
                                        fontWeight:'900',
                                        text:`${i+1}`,
                                        labelOrigin: new google.maps.Point(20, 20),
                                        anchor: new google.maps.Point(40, 40),
                                    };

                                    var instanceMarker = markerFun1(shipLatLng, portShipIcon, portSearchClickArr, {
                                        data: {
                                            imo: portShip[i].imo,
                                            datas:portShip[i],
                                            speed,
                                            fillColor,
                                        },
                                        latLng: {
                                            lat: portShip[i].lat,
                                            lng: portShip[i].lon
                                        },
                                        rotation: portShip[i].heading,
                                    }, 99999, label);
                                    portSearchArr.push(instanceMarker);
                                    google.maps.event.addListener(portSearchClickArr[i], "click", clickShipMsg);
                                    google.maps.event.addListener(portSearchClickArr[i], "mouseover", function () {
                                        var fillColor = this.data.data.datas.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillOpacity = this.data.data.datas.loadEn == 'Full-laden'? 1 : 0;

                                        this.setIcon({
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor: '#ff2200',
                                            strokeOpacity:1,
                                            strokeWeight: 2,
                                            fillColor,
                                            fillOpacity,
                                            scale: 1,
                                            rotation: this.data.rotation,
                                        });

                                        if (shipBubbleArr.length != 0) {
                                            for (let i = 0; i < shipBubbleArr.length; i++) {
                                                shipBubbleArr[i].remove();
                                            }
                                        }

                                        var latLng = new google.maps.LatLng(this.data.latLng.lat, this.data.latLng.lng);

                                        var shipBubble = new WarInfoWindow(latLng, map, 'ship-bubble', {
                                            "span1": this.data.data.datas.shipName,
                                            "span2": this.data.data.speed,
                                            "span3": lngFormatter(this.data.latLng.lng),
                                            "span4": latFormatter(this.data.latLng.lat),
                                            "title1": 'Vessel Name：',
                                            "title2": 'Speed：',
                                            "title3": 'Lng：',
                                            "title4": 'Lat：',

                                        });

                                        shipBubbleArr.push(shipBubble);
                                    });
                                    google.maps.event.addListener(portSearchClickArr[i], "mouseout", function () {
                                        var strokeColor = this.data.data.datas.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillColor = this.data.data.datas.isShipPlate == 0 ? '#04bd00' : '#ffff0c';

                                        var fillOpacity = this.data.data.datas.loadEn == 'Full-laden'? 1 : 0;

                                        this.setIcon({
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor,
                                            strokeWeight: 2,
                                            fillColor,
                                            fillOpacity,
                                            scale: 1,
                                            rotation: this.data.rotation,
                                        });

                                        if (shipBubbleArr.length != 0) {
                                            for (let i = 0; i < shipBubbleArr.length; i++) {
                                                shipBubbleArr[i].remove();
                                            }
                                        }
                                    });
                                }
                                $('#sr-d10').show();
                            } else {
                                _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'information', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                })
                            }
                            map.setZoom(7);
                            map.setCenter(portLatLng2);
                            setTimeout(function () {
                                $('.info-window-wrap .infoWindow-span1').html(data.datas.html.nameEn);
                                $('.info-window-wrap .infoWindow-span2').html('&nbsp;(' + data.datas.html.country + ')');
                                $('.info-window-wrap .infoWindow-span3').html(new Date(Number(data.datas.html.time)).Format("yyyy-MM-dd hh:mm:ss"));
                                $('.info-window-wrap .infoWindow-span4').html('&nbsp;[' + data.datas.html.zone + ']');
                            }, 1500);
                        } else {
                            _this.loading.close();
                            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        }
                    },
                    error: function (error) {
                        _this.loading.close();
                        console.log(error)
                    }
                });

            };

            //历史到港
            function historyPort(dataObj, _this){

                loadingFun();

                if (closeInfoWindow != null) {

                    closeInfoWindow.remove();

                }

                $.ajax({
                    type: "POST",
                    url: _this.url + "/api/geojson/current.json",
                    data: JSON.stringify(dataObj),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        if (data.datas != null) {
                            _this.loading.close();

                            _this.zaiZhong3 = data;
                            _this.export3 = `${_this.url}/api/export/en/current.htm?endTime=${dataObj.endTime}&portNameEn=${dataObj.portNameEn}&sizeType=${dataObj.sizeType}&startTime=${dataObj.startTime}`;
                            var portLatLng3 = {
                                lat: data.datas.html.lat,
                                lng: data.datas.html.lon
                            };
                            closeInfoWindow = new PortInfoWindowFun(new google.maps.LatLng(data.datas.html.lat, data.datas.html.lon), map, 'info-window-wrap', 'portDialog');
                            //>>>>>港口点
                            let portLatLngMarker3 = new google.maps.Marker({
                                position: portLatLng3,
                                map: map,
                                icon: '../../static/images/port.png',
                                visible: true,
                                zIndex: 10000,
                            });
                            portSearchArr.push(portLatLngMarker3);
                            var myCity = new google.maps.Circle({
                                center: portLatLng3,
                                radius: 80000,
                                strokeColor: "#00c3ff",
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                fillColor: "#00c3ff",
                                fillOpacity: 0.5,
                                zIndex: 10000,
                                map: map
                            });
                            portSearchArr.push(myCity);
                            var portShip = data.datas.data;
                            if (portShip != null) {
                                _this.portLog3 = data.datas.data;
                                _this.isFlagMsg = false;
                                delShipGreYel();
                                isInitPortMark(null);
                                if (limitedShipArr.length != 0) {
                                    for (let i = 0; i < limitedShipArr.length; i++) {
                                        limitedShipArr[i].setMap(null);
                                    }
                                }
                                ;
                                var portSearchClickArr = [];
                                //使港口船只可点击
                                for (let i = 0; i < portShip.length; i++) {

                                    let shipLatLng = {
                                        lat: Number(portShip[i].lat),
                                        lng: Number(portShip[i].lon)
                                    };

                                    var portShipIcon = {
                                        path: "M-6 10L0 -10L6 10z",
                                        strokeWeight: 2,
                                        strokeColor: '#000',
                                        fillColor: '#1aff00',
                                        fillOpacity: 1,
                                        scale: 1,
                                        rotation: portShip[i].heading,
                                    };

                                    var label = {
                                        color:'#FF0001',
                                        /*fontFamily:'楷体',*/
                                        fontSize:'20px',
                                        fontWeight:'900',
                                        text:`${i+1}`,
                                        labelOrigin: new google.maps.Point(20, 20),
                                        anchor: new google.maps.Point(40, 40),
                                    };

                                    var instanceMarker = markerFun1(shipLatLng, portShipIcon, portSearchClickArr, {
                                        data: {
                                            imo: portShip[i].imo,
                                            datas:portShip[i],
                                        },
                                        latLng: {
                                            lat: portShip[i].lat,
                                            lng: portShip[i].lon
                                        },
                                        rotation: portShip[i].heading,
                                    },99999, label);
                                    portSearchArr.push(instanceMarker);
                                    google.maps.event.addListener(portSearchClickArr[i], "click", clickShipMsg);
                                    google.maps.event.addListener(portSearchClickArr[i], "mouseover", function () {
                                        this.setIcon({
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor: '#ff1000',
                                            strokeWeight: 2,
                                            fillColor: '#1aff00',
                                            fillOpacity: 1,
                                            scale: 1,
                                            rotation: this.data.rotation,
                                        });

                                        if (shipBubbleArr.length != 0) {
                                            for (let i = 0; i < shipBubbleArr.length; i++) {
                                                shipBubbleArr[i].remove();
                                            }
                                        }

                                        var latLng = new google.maps.LatLng(this.data.latLng.lat, this.data.latLng.lng);

                                        var shipBubble = new WarInfoWindow(latLng, map, 'ship-bubble', {
                                            "span1": this.data.data.datas.shipName,
                                            "span2": lngFormatter(this.data.latLng.lng),
                                            "span3": latFormatter(this.data.latLng.lat),
                                            "span4": '',
                                            "title1": 'Vessel Name：',
                                            "title2": 'Lng：',
                                            "title3": 'Lat：',
                                            "title4": '',
                                        });

                                        shipBubbleArr.push(shipBubble);
                                    });
                                    google.maps.event.addListener(portSearchClickArr[i], "mouseout", function () {
                                        this.setIcon({
                                            path: 'M-6 10L0 -10L6 10z',
                                            strokeColor: '#000',
                                            strokeWeight: 2,
                                            fillColor: '#1aff00',
                                            fillOpacity: 1,
                                            scale: 1,
                                            rotation: this.data.rotation,
                                        });

                                        if (shipBubbleArr.length != 0) {
                                            for (let i = 0; i < shipBubbleArr.length; i++) {
                                                shipBubbleArr[i].remove();
                                            }
                                        }
                                    });
                                }

                                $('#sr-d11').show();

                            } else {

                                _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'information', {
                                    dangerouslyUseHTMLString: true,
                                    showClose: false,
                                })
                            }
                            map.setZoom(7);
                            map.setCenter(portLatLng3);
                            setTimeout(function () {
                                $('.info-window-wrap .infoWindow-span1').html(data.datas.html.nameEn);
                                $('.info-window-wrap .infoWindow-span2').html('&nbsp;(' + data.datas.html.country + ')');
                                $('.info-window-wrap .infoWindow-span3').html(data.datas.html.time);
                                $('.info-window-wrap .infoWindow-span4').html('&nbsp;[' + data.datas.html.zone + ']');
                            }, 1500);
                        } else {
                            _this.loading.close();
                            _this.$alert('<span style="text-align: center; display: block; font-weight: bold;">No Record</span>', 'Prompt', {
                                dangerouslyUseHTMLString: true,
                                showClose: false,
                            });
                        }
                    },
                    error: function (error) {
                        console.log(error);
                        _this.loading.close();
                    }
                });

            };

        },
        computed: {
            totalDays() {
                var _this = this;
                var total = 0;
                this.lineList.forEach(function (item, index) {
                    total = total + Number(item.distance / (item.speed == '' ? _this.speedSpeed : item.speed) / 24) + Number(item.stayTime) / 24;
                });
                return Number(total.toFixed(2)) || '';
            },
            totalDays2() {
                var _this = this;
                var total = 0;
                this.lineList2.forEach(function (item, index) {
                    total = total + Number(item.distance / (item.speed == '' ? _this.speedSpeed2 : item.speed) / 24) + Number(item.stayTime) / 24;
                });
                return Number(total.toFixed(2)) || ''
            },
        },
        //制作省略号
        /*filters: {
            textOverflow(value){
                if(value.length >=10){
                    value = value.substr(0,10)+ '...'
                }
                return value
            },
        },*/
        //
        created() {


        }
    }
    /**
     *Created by WangDi on 2018/4/17.
     */
</script>

<style scoped>
    @import url('../assets/css/rotemap.css');
    @import url('../assets/css/myCss.css');

    /* .hover-status{
        background-color: #363636;
        cursor: pointer;
    } */

    /* .hover-status:hover{
        background-color: #F2A610;
    } */
    #map {
        width: 100%;
        height: 100%;
        z-index: 555;

    }

    .sr-d-title {
        height: 50px;
    }

    /*缩放滚动条*/
    /* 放大条 */
    .scroll-height-1 {
        height: 452px;
        position: relative;
    }

    .scroll1-height1 {
        /* height: 452px; */
        height: calc(100% - 44px);
        position: relative;
        top: 22px;
    }

    .select_d3 {
        width: 200px;
        height: 32px;
        background: rgba(24, 24, 24, 0.6);
        border: 1px solid #5c5c5c;
        color: #fff;
        border-radius: 5px;
    }

    .sr-row .el-input__inner {
        width: 250px;
        height: 36px;
        background: rgba(24, 24, 24, 0.6);
        border: 1px solid #5c5c5c;
        color: rgba(24, 24, 24, 0.6);
        border-radius: 2px;
    }

    .sr-row input {
        background: rgba(24, 24, 24, 0.6);
    }

    .fullz-z {
        width: 240px;
        background: rgba(40, 40, 47, 0.6);
        margin-left: 10px;
        position: absolute;
        top: 55px;
        left: 0px;
    }

    .fullz-z ul {
        max-height: 200px;
        font-size: 14px;
        overflow: auto;
        background-color: rgb(135, 135, 135);
    }

    .fullz-z ul li {
        height: 10%;
        line-height: 200%;
    }

    .fullz-z ul li span {
        white-space: nowrap;
        box-sizing: border-box;
        width: 47%;
        display: inline-block;
    }

    .fullz-z ul li:hover {
        background-color: blue;
        color: #f0f0f0;
    }

    .right-context {
        text-align: left;
    }

    .right-context-1 {
        text-align: right;
    }

    .full_l {
        color: #fff;
        margin-left: 10px;
    }

    .full_r {
        float: right;
        color: yellowgreen;
        margin-right: 10px;
    }

    .d1-time-cpm {
        display: inline-block;
        width: 150px;
    }

    .d1-time-cpm2 {
        display: inline-block;
        width: 175px;
    }

    .timeP {
        width: 160px !important;
        height: 30px;
        background-color: #000;
    }

    .timeP1 {
        width: 157px !important;
        height: 30px;
    }

    .page-wrap {
        width: 100%;
        text-align: right;
    }

    .page-wrapper {
        width: 100%;
        text-align: right;
    }

    .page-style {
        margin-top: 10px;
    }

    .sr-table-wrap {
        background-color: #383838;
    }

    /*弹出层初始位置*/
    .sr-d1 {
        width: 25%;
        min-width: 520px;
        min-height: 480px;
        right: 220px;
        top: 44px;
    }

    .el-message-box {
        background-color: #000 !important;
    }

    .el-month-table td.current {
        position: relative;
        top: inherit !important;
        left: inherit !important;
        width: auto !important;
        height: auto !important;
        border: none !important;
        box-shadow: none !important;
        border-radius: inherit !important;
    }

    .hangsu {
        display: inline-block;
        margin-left: 7px;
    }

    .tr-hover:hover {
        background-color: blue;
    }

    /*经纬度*/
    #longitudeAndLatitude {
        background-color: rgba(255, 255, 255, .7);
        box-shadow: 3px 4px 10px #363636;
        padding: 0 5px;
        margin: 0;
        color: #333;
        font-size: 12px;
        margin-bottom: 5px;
        margin-right: 5px;
        border-radius: 3px;
        width: 78px;
    }

    #longitudeAndLatitude .latLng-children {
        line-height: 18px;
        text-align: left;
    }

    /*DWT 输入框*/
    .sr-wrap {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .sr-row-input {
        width: 78%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .sr-row-input .sr-input {
        -webkit-appearance: none;
        background-color: transparent;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #5c5c5c;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #e5e5e5;
        display: inline-block;
        font-size: inherit;
        height: 30px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 140px;
    }

    .sr-row-input .sr-input:focus {
        border-color: #409EFF;
        outline: 0;
    }

    /*!*历史航线*!*/
    .sr-d7 .sr-chk-group {
        width: 78%;
    }

    .color_orange {
        color: #FFA900;
        padding: 0 4px;
    }

    /*发货港*/
    .sear_inputPort {
        width: 200px;
        height: 32px;
        background: rgba(24, 24, 24, 0.6);
        border: 1px solid #5c5c5c;
        color: #fff;
        border-radius: 5px;
        padding: 0 15px;
        box-sizing: border-box;
    }

    .fullz-zPort {
        width: 200px;
        background: rgba(40, 40, 47, 0.6);
        margin-left: -6px;
        position: absolute;
        top: 103px;
        left: 130px;
        z-index: 1000;
    }

    .fullz-zPort ul {
        max-height: 200px;
        font-size: 12px;
        overflow: auto;
        background-color: rgb(135, 135, 135);
    }

    .fullz-zPort ul li {
        height: 24px;
        line-height: 24px;
    }

    .fullz-zPort ul li span {
        white-space: nowrap;
        box-sizing: border-box;
        width: 47%;
        display: inline-block;
    }

    .fullz-zPort ul li:hover {
        background-color: blue;
        color: #f0f0f0;
    }

    .timeP2 {
        width: 157px;
        height: 30px;
    }

    .timeP3 {
        width: 155px;
    }

    #sr-d8 {
        display: none;
    }

    #sr-d9 {
        display: none;
    }

    #sr-d10 {
        display: none;
    }

    #sr-d11 {
        display: none;
    }

    .color_orange {
        color: #FFA900;
        padding: 0 4px;
    }

    .line {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 20px;
        width: 20px;
        background: transparent;
        cursor: se-resize;
        z-index: 1000;
    }

    .content {
        width: 100%;
        height: 100%;
        background: none;
        position: relative;
        top: 0;
        left: 0;
        padding-top: 20px;
    }

    /*>>>>>>>>>>>>>>>>>>>>>>>航速航线*/
    .line-value {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        position: relative;
        background-color: rgb(33, 33, 33);
        color: #e5e5e5;
    }

    .tableRowOneHover {
        cursor: pointer;
    }

    /*.tableRowOneHover:hover{*/
    /*background: rgba(33, 0, 255, 0.5);*/
    /*}*/
    .activeItem {
        background: rgba(33, 0, 255, 0.5);
    }

    .pannel_two .column_container {
        white-space: nowrap;
        padding-left: 10px;
        padding-right: 0;
    }

    .pannel_two .operate {
        margin: 10px auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pannel_two .operate .item {
        margin-left: 2px;
        margin-right: 2px;
        padding: 1px 5px;
        box-sizing: border-box;
    }

    .zIndex {
        z-index: 99999;
    }

    .sr-d7 .sr-label {
        text-align: right;
        width: 105px;
    }

    /* .pannel_4 {
        width: 1056px;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(1),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(1) {
        width: 45px !important;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(2),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(2) {
        width: 210px !important;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(3),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(3) {
        width: 62px !important;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(4),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(4) {
        width: 82px !important;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(5),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(5) {
        width: 82px !important;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(6),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(6) {
        width: 82px !important;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(7),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(7) {
        width: 88px !important;
    } */
    /* .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(8),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(8) {
        width: 180px !important;
    }
    .pannel_table.pannel_4 .contentWrap .headContainer .tableHead .item:nth-child(9),
    .pannel_table.pannel_4 .contentWrap .tableRow .item:nth-child(9) {
        width: 180px !important;
    } */
    .pannel_table.pannel_6 .contentWrap .headContainer .tableHead .item:nth-child(1),
    .pannel_table.pannel_6 .contentWrap .tableRow .item:nth-child(1) {
        width: 45px !important;
    }

    .pannel_table.pannel_6 .contentWrap .headContainer .tableHead .item:nth-child(2),
    .pannel_table.pannel_6 .contentWrap .tableRow .item:nth-child(2) {
        width: 200px !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
    }

    .pannel_table.pannel_7 .contentWrap .headContainer .tableHead .item:nth-child(1),
    .pannel_table.pannel_7 .contentWrap .tableRow .item:nth-child(1) {
        width: 45px !important;
    }

    .pannel_table.pannel_7 .contentWrap .headContainer .tableHead .item:nth-child(8),
    .pannel_table.pannel_7 .contentWrap .tableRow .item:nth-child(8) {
        width: 150px !important;
    }

    .pannel_table.pannel_8 .contentWrap .headContainer .tableHead .item:nth-child(1),
    .pannel_table.pannel_8 .contentWrap .tableRow .item:nth-child(1) {
        width: 45px !important;
    }

    .pannel_table.pannel_8 .contentWrap .headContainer .tableHead .item:nth-child(2),
    .pannel_table.pannel_8 .contentWrap .tableRow .item:nth-child(2) {
        width: 150px !important;
    }

    .pannel_table.pannel_8 .contentWrap .headContainer .tableHead .item:nth-child(10),
    .pannel_table.pannel_8 .contentWrap .tableRow .item:nth-child(10) {
        width: 150px !important;
    }

    .pannel_table.pannel_8 .contentWrap .headContainer .tableHead .item:nth-child(8),
    .pannel_table.pannel_8 .contentWrap .tableRow .item:nth-child(8) {
        width: 150px !important;
    }

    .pannel_table.pannel_8 .contentWrap .headContainer .tableHead .item:nth-child(9),
    .pannel_table.pannel_8 .contentWrap .tableRow .item:nth-child(9) {
        width: 150px !important;
    }

    /* .pannel_3 .tableRowOne .item:nth-child(1) {
        width: 50px !important;
    }
    .pannel_3 .tableRowOne .item:nth-child(7) {
        width: 200px !important;
    }
    .pannel_3 .tableRowOne .item:nth-child(8) {
        width: 200px !important;
    } */
    /* .pannel_10 {
        position: absolute;
        top: 59px;
        left: 37px;
        width: 1040px;
    } */
    .pannel_10 .tableRowOne .item:nth-child(1) {
        width: 45px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(2) {
        width: 180px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(3) {
        width: 180px !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
    }

    .pannel_10 .tableRowOne .item:nth-child(4) {
        width: 180px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(5) {
        width: 200px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(6) {
        width: 200px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(7) {
        width: 200px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(8) {
        width: 200px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(9) {
        width: 200px !important;
    }

    .pannel_10 .tableRowOne .item:nth-child(10) {
        width: 200px !important;
    }

    /* 台风 */
    .tf_form {
        margin-left: 10px;
        width: 220px;
        background: #28282F;
        color: #FFFFFF;
        padding-left: 10px;
        padding-bottom: 10px;
        display: none;
    }

    .tf_form .tf_row + .tf_row {
        margin-top: 10px;
    }

    .tf_form .radio_group {
        font-size: 12px;
    }

    .tf_form .tf_time .time .time_input {
        width: 70px;
        height: 24px;
        padding-left: 25px;
        font-size: 12px;
    }

    .tf_form .tf_time .time .f_time .fs-calendar {
        left: 4px;
        top: -4px;
        font-size: 16px;
    }

    .tf_form .legend .item {
        display: inline-block;
        font-size: 12px;
        width: 106px;
        line-height: 16px;
        vertical-align: top;
    }

    .tf_form .legend .item .solid_circle {
        display: inline-block;
        border-radius: 50%;
        width: 9px;
        height: 9px;
        margin-right: 4px;
    }

    .tf_form .tf_search {
        width: 82px;
        height: 22px;
        background-color: #3B99FC;
        border-radius: 2px;
        margin: 0 auto;
        text-align: center;
        line-height: 22px;
        cursor: pointer;
    }

    .pannel_21 {
        position: absolute;
        top: 70px;
        left: 500px;
        width: 533px;
        height: 301px;
    }

    /* 台风查询结果 */
    .pannel_table_2 {
        min-width: 330px;
        min-height: 181px;
        opacity: 0.85;
        background: #212121;
        box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.50);
        border-radius: 2px;
        color: #FFFFFF;
        z-index: 10000;
    }

    .pannel_table_2 .pannel_title {
        font-size: 16px;
        padding: 10px;
    }

    .pannel_table_2 .pannel_title .name {
        font-size: 16px;
        margin-left: 4px;
    }

    .pannel_table_2 .pannel_title .close {
        position: absolute;
        right: 10px;
        top: 12px;
        color: #FFFFFF;
    }

    .pannel_table_2 .pannel_title .close .fs-close {
        font-size: 14px;
    }

    .pannel_table_2 .table_container {
        margin: 0 10px;
        height: 124px;
        overflow-y: auto;
    }

    .pannel_table_2 .table_container table {
        width: 100%;
        border-collapse: collapse;
    }

    .pannel_table_2 .table_container table .tabel_title,
    .tabel_cell {
        border: 1px solid #5C5C5C;
        text-align: center;
        height: 40px;
    }

    .pannel_table_2 .table_container table tr:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .pannel_table_2 .table_container .can_click {
        text-decoration: underline;
        cursor: pointer;
    }

    /* 风力风向示意图 */
    .pannel_wind {
        width: 368px;
        min-height: 365px;
        background: rgba(33, 33, 33, 0.85);
        box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.50);
        border-radius: 2px;
        color: #E3E3E3;
        z-index: 10000;
    }

    .pannel_wind .one_legend {
    }

    .pannel_wind .one_legend .legend_title {
        font-size: 16px;
        padding: 10px 10px 5px;
    }

    .pannel_wind .one_legend .legend_title .name {
        margin-left: 4px;
    }

    .pannel_wind .one_legend .legend_title .close {
        position: absolute;
        right: 10px;
        top: 4px;
        color: #FFFFFF;
        font-size: 12px;
    }

    .pannel_wind .one_legend .legend_info {
        text-align: left;
        margin-top: 2px;
    }

    /* 风力风向示意图 */
    .pannel_wind .one_legend .legend_info .wind_item {
        display: inline-block;
        text-align: center;
        position: relative;
        margin-left: 14px;
    }

    .pannel_wind .one_legend .legend_info .wind_item .wind_img {
        height: 35px;
    }

    .pannel_wind .one_legend .legend_info .wind_item .wind_grade {
        font-size: 12px;
    }

    .pannel_wind .one_legend .legend_info .wind_item .wind_grade_calc {
        position: absolute;
        font-size: 12px;
        margin-top: -14px;
        margin-left: -4px;
        transform: scale(0.9);
    }

    /* 风力等级和风速对照 */
    .pannel_wind .one_legend .legend_info .grade_speed_legend {
        font-size: 12px;
        margin-left: 8px;
    }

    .pannel_wind .one_legend .legend_info .grade_speed_legend span {
        min-width: 17px;
        display: inline-block;
        text-align: center;
    }

    .pannel_wind .one_legend .legend_info .scale_1 {
        margin-left: 16px;
    }

    /* 海浪高度色谱图 */
    .pannel_wind .one_legend .legend_info .wave_height_color_legend {
        font-size: 12px;
        margin-left: 2px;
    }

    .pannel_wind .one_legend .legend_info .wave_height_color_legend span {
        min-width: 32px;
        display: inline-block;
        text-align: center;
    }

    .pannel_wind .one_legend .legend_info .scale_2 {
        margin-left: 16px;
    }

    /* 海流速度示意图 */
    .pannel_wind .one_legend .legend_info .seawater_item {
        display: inline-block;
        text-align: center;
        margin-left: 10px;
    }

    .pannel_wind .one_legend .legend_info .seawater_item + .seawater_item {
        margin-left: 38px;
    }

    .pannel_wind .one_legend .legend_info .seawater_item .seawater_img {
        height: 35px;
    }

    .pannel_wind .one_legend .legend_info .seawater_item .seawater_grade {
        font-size: 12px;
    }

    /* 气象海况 */
    .qx_form {
        margin-left: 10px;
        width: 220px;
        background: #28282F;
        color: #FFFFFF;
        padding-left: 10px;
        padding-bottom: 10px;
        font-size: 12px;
        display: none;
    }

    .qx_form .check_group {
        position: relative;
        line-height: 28px;
    }

    .qx_form .check_group .f_checkbox {
        width: 15px;
        height: 15px;
        line-height: 20px;
        margin-right: 5px;
    }

    .qx_form .check_group .item {
        display: inline-block;
        width: 94px;
        margin-left: 0;
    }

    .qx_form .f_question {
        position: absolute;
        font-size: 17px;
        color: #FFFFFF;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        margin-left: 0;
    }

    .qx_form .time {
        font-size: 14px;
        padding-top: 10px;
    }

    .qx_form .time_choose {
        position: relative;
    }

    .qx_form .time_choose .time_progress {
        display: inline-block;
        width: 180px;
        height: 6px;
        border-radius: 3px;
        background-color: #757272;
        position: relative;
    }

    .qx_form .time_choose .time_progress .have_cover {
        width: 0px;
        height: 6px;
        background-color: #3B99FC;
        border-radius: 3px;
    }

    .qx_form .time_choose .time_progress .sign {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #FFFFFF;
        border-radius: 50%;
        margin-top: -8px;
        margin-left: -5px;
    }

    .qx_form .time_choose .time_operate {
        position: absolute;
        display: inline-block;
        margin-top: 2px;
        margin-left: 5px;
    }

    .qx_form .time_choose .time_operate .f_pre,
    .f_next {
        font-size: 12px;
        color: #D8D8D8;
    }

    .qx_form .time_choose .time_operate .f_next {
        margin-left: 4px;
    }

    /* 海盗军演 */
    .hd_form {
        margin-left: 10px;
        width: 230px;
        background: #28282F;
        color: #FFFFFF;
        padding-left: 10px;
        padding-bottom: 10px;
        font-size: 12px;
        display: none;
    }

    .hd_form .hd_row + .hd_row {
        margin-top: 10px;
    }

    .hd_form .select {
        width: 140px;
        height: 20px;
    }

    .hd_form .f_checkbox {
        width: 15px;
        height: 15px;
        line-height: 20px;
    }

    .hd_form .f_ship_icon i {
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
        text-indent: -999999px;
    }

    .hd_form .hd_row .item {
        display: inline-block;
        width: 49%;
    }

    .hd_form .hd_row .item .f_ship_gap {
        display: inline-block;
        width: 46px;
        height: 5px;
    }

    .hd_form .hd_search {
        width: 80px;
        height: 20px;
        background-color: #3B99FC;
        border-radius: 2px;
        margin: 0 auto;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
    }

    /* 气象信息 */
    .pannel_weather {
        width: 570px;
        min-height: 300px;
        background: rgba(33, 33, 33, 0.85);
        box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.50);
        border-radius: 2px;
        color: #E3E3E3;
        z-index: 10000;
    }

    .pannel_weather .pannel_title {
        font-size: 16px;
        padding: 10px 10px 0 10px;
        position: relative;
        border-bottom: 1px solid #383838;
    }

    .pannel_weather .pannel_title .tab_item {
        display: inline-block;
        margin-right: 15px;
        cursor: pointer;
    }

    .pannel_weather .pannel_title .active {
        border-bottom: 2px solid #3B99FC;
    }

    .pannel_weather .pannel_title .time_zone {
        position: absolute;
        display: inline-block;
        right: 40px;
    }

    .pannel_weather .pannel_title .close {
        position: absolute;
        right: 10px;
        top: 6px;
        color: #FFFFFF;
        font-size: 12px;
    }

    .pannel_weather .pannel_content {
        padding: 10px;
    }

    .pannel_weather .pannel_content .high_low {
    }

    .pannel_weather .pannel_content .high_low .item {
        width: 40%;
        display: inline-block;
    }

    .pannel_weather .pannel_content .weather_info {
        padding-top: 10px;
    }

    .pannel_weather .pannel_content .weather_info .weather_top {
        color: #84C0FF;
    }

    .pannel_weather .pannel_content .weather_info .weather_body {
        padding-top: 5px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .img {
        float: left;
        margin-right: 10px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .img img {
        width: 66px;
        height: 61px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .info {
        float: left;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .info .item {
        float: left;
        width: 140px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .info .item1 {
        width: 170px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .info .item2 {
        width: 150px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .info .label1 {
        width: 78px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .info .label2 {
        width: 44px;
    }

    .pannel_weather .pannel_content .weather_info .weather_body .info label {
        color: #949494;
        width: 92px;
        display: inline-block;
        text-align: right;
    }

    .gk-search .icon_down {
        float: right;
        margin-top: 12px;
        margin-left: 0;
    }

    .pannel_3 .tableRowOne:hover .item {
        background-color: rgba(33, 0, 255, 0.5);
    }

    .pannel_6 .tableRowOne:hover .item {
        background-color: rgba(33, 0, 255, 0.5);
    }

    .pannel_7 .tableRowOne:hover .item {
        background-color: rgba(33, 0, 255, 0.5);
    }

    .pannel_8 .tableRowOne:hover .item {
        background-color: rgba(33, 0, 255, 0.5);
    }

    .pannel_10 .tableRowOne:hover .item {
        background-color: rgba(33, 0, 255, 0.5);
    }

    .fullcurrent {
        background-color: blue;
        color: #f0f0f0;
    }

    .abolish {
        text-align: center !important;
        /* padding: 0px 30px !important; */
    }

    .export {
        color: #fff
    }

    .export:hover {
        background-color: #F2A610;
    }

    .fullcurrent {
        background-color: blue;
        color: #f0f0f0;
    }

    .selectTime option {
        background-color: rgba(24, 24, 24, 0.64);
    }

    .right_message {
        position: absolute;
        right: 25px;
        bottom: 10px;
    }

    .pannel_2 .pannel_content .row .name {
        width: 110px;
    }

    .sr-logo_en {
        position: absolute;
        left: 0;
        top: 0;
        width: 560px;
        height: 100%;
        line-height: 50px;
        color: #fff;
        font-size: 18px;
        text-indent: 135px;
        background: url(../assets/images/s_logo_en.png) -25px center no-repeat;
        background-size: 190px auto;
    }

    .jianyanjilu {
        display: inline-block;
        padding-left: 40px;
        width: 674px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
    }

    .timeP4 {
        width: 97px !important;
        height: 30px;
    }

    /*模态框（三列）*/
    .ship_pannel_three {
        min-width: 468px;
        min-height: 481px;
        opacity: 0.85;
        background: #212121;
        box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.50);
        border-radius: 2px;
        color: #FFFFFF;
        z-index: 10000;
    }

    .ship_pannel_three .pannel_title {
        font-size: 16px;
        border-bottom: 1px solid #383838;
        padding: 10px;
    }

    .ship_pannel_three .pannel_title .name {
        margin-left: 5px;
    }

    .ship_pannel_three .pannel_title .close {
        position: absolute;
        right: 10px;
        top: 12px;
        color: #FFFFFF;
    }

    .ship_pannel_three .pannel_title .close .fs-close {
        font-size: 12px;
    }

    .ship_pannel_three .pannel_content {
        height: 450px;
        overflow-y: auto;
    }

    .ship_pannel_three .column_container {
        padding: 10px 0;
    }

    .ship_pannel_three .column_container + .column_container {
        border-top: 1px solid #383838;
    }

    .ship_pannel_three .column_container .sub_title {
        font-size: 15px;
        padding-left: 10px;
    }

    .ship_pannel_three .column_container .PSC_item + .PSC_item {
        margin-top: 10px;
    }

    .ship_pannel_three .column_container .column_three {
        font-size: 14px;
        line-height: 25px;
        padding-left: 10px;
    }

    .ship_pannel_three .column_container .column_three .name {
        display: inline-block;
        width: 110px;
        height: 25px;
        color: #989898;
    }

    .ship_pannel_three .column_container .column_three .text {
        display: inline-block;
        width: 120px;
        height: 25px;
    }

    .ship_pannel_three .column_container .column_three .text:before {
        content: ".";
        visibility: hidden;
    }

    .ship_pannel_three .pannel_content .basic_information .column_three .name:nth-child(1) {
        width: 100px;
    }

    .ship_pannel_three .pannel_content .basic_information .column_three .name:nth-child(3) {
        width: 68px;
    }

    .ship_pannel_three .pannel_content .basic_information .column_three .name:nth-child(5) {
        width: 96px;
    }

    .ship_pannel_three .pannel_content .basic_information .column_three .text:nth-child(2) {
        width: 190px;
    }

    .ship_pannel_three .pannel_content .basic_information .column_three .text:nth-child(4) {
        width: 100px;
    }

    .ship_pannel_three .pannel_content .basic_information .column_three .text:nth-child(6) {
        width: 100px;
    }

    .ship_pannel_three .pannel_content .classification_society .column_three .name:nth-child(1) {
        width: 40px;
    }

    .ship_pannel_three .pannel_content .classification_society .column_three .name:nth-child(3) {
        width: 110px;
    }

    .ship_pannel_three .pannel_content .classification_society .column_three .text:nth-child(2) {
        width: 380px;
    }

    .ship_pannel_three .pannel_content ._dimension .column_three .name:nth-child(1) {
        width: 60px;
    }

    .ship_pannel_three .pannel_content ._dimension .column_three .name:nth-child(3) {
        width: 100px;
    }

    .ship_pannel_three .pannel_content ._dimension .column_three .name:nth-child(5) {
        width: 110px;
    }

    .ship_pannel_three .pannel_content .power_equipment .column_three .name:nth-child(1) {
        width: 200px;
    }

    .ship_pannel_three .pannel_content .power_equipment .column_three .text:nth-child(2) {
        width: 460px;
    }

    .ship_pannel_three .pannel_content ._built .column_three .name:nth-child(1) {
        width: 120px;
    }

    .ship_pannel_three .pannel_content ._built .column_three .name:nth-child(3) {
        width: 100px;
    }

    .ship_pannel_three .pannel_content ._built .column_three .text:nth-child(2) {
        width: 320px;
    }

    .ship_pannel_three .pannel_content ._company .column_three .name:nth-child(1) {
        width: 110px;
    }

    .ship_pannel_three .pannel_content ._company .column_three .text:nth-child(2) {
        width: 550px;
    }

    .ship_pannel_three .pannel_content .survey_records .column_three .text {
        width: 670px;
    }

    .ship_pannel_three .pannel_content ._PSC .column_three .name:nth-child(1) {
        width: 150px;
    }

    .ship_pannel_three .pannel_content ._PSC .column_three .name:nth-child(3) {
        width: 120px;
    }

    .ship_pannel_three .pannel_content ._PSC .column_three .text {
        width: 190px;
    }

    /* //按钮样式 */
    .ship_pannel_two .operate .item {
        display: inline-block;
        width: 84px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #254467;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
        font-size: 12px;
    }

    /* 船信息样式 */
    .ship_pannel_two .column_container .column_two .name {
        display: inline-block;
        width: 106px;
        height: 25px;
        text-align: right;
        color: #989898;
    }

    /* 历史航速 */
    .pannel_4 .pannel_title .history_speed {
        cursor: pointer;
    }

    .pannel_table_3 {
        min-width: 330px;
        min-height: 181px;
        opacity: 0.85;
        background: #212121;
        box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.50);
        border-radius: 2px;
        color: #FFFFFF;
        z-index: 10000;
    }

    .pannel_table_3 .pannel_title {
        font-size: 16px;
        padding: 10px 15px;
        border-bottom: 1px solid #383A3D;
        margin-bottom: 20px;
    }

    .pannel_table_3 .pannel_title .name {
        font-size: 16px;
    }

    .pannel_table_3 .pannel_title .close {
        position: absolute;
        right: 14px;
        top: 12px;
        color: #FFFFFF;
    }

    .pannel_table_3 .pannel_title .close .fs-close {
        font-size: 14px;
    }

    .pannel_table_3 .table_container {
        margin: 0 15px;
        height: 109px;
        overflow-y: auto;
    }

    .pannel_table_3 .table_container table {
        width: 100%;
        border-collapse: collapse;
    }

    .pannel_table_3 .table_container table .tabel_title,
    .tabel_cell {
        border: 1px solid #383A3D;
        text-align: center;
        height: 35px;
    }

    .pannel_table_3 .table_container table .tabel_cell .arrow_link {
        margin: 0 10px;
    }

    .pannel_table_3 .table_container table tr:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .pannel_table_3 .bottom_info {
        margin: 10px 15px;
        color: #FFA900;
    }

    /* 港口天气 */
    .pannel_port_weather {
        width: 546px;

        min-height: 310px;
        background: rgba(33, 33, 33, 0.85);
        box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.50);
        border-radius: 2px;
        color: #FFFFFF;
        z-index: 10000;
    }

    .pannel_port_weather .pannel_title {
        padding: 10px 15px;
        border-bottom: 1px solid #383838;
    }

    .pannel_port_weather .pannel_title .name {
        font-size: 16px;
    }

    .pannel_port_weather .pannel_title .close {
        position: absolute;
        right: 10px;
        top: 6px;
        color: #FFFFFF;
        font-size: 12px;
    }

    .pannel_port_weather .pannel_content {
        padding: 10px 15px;
    }

    .pannel_port_weather .pannel_content ._left {
        float: left;
        width: 25%;
    }

    .pannel_port_weather .pannel_content ._left ._top {
        line-height: 36px;
    }

    .pannel_port_weather .pannel_content ._left ._one {
        line-height: 22px;
        font-size: 12px;
    }

    .pannel_port_weather .pannel_content ._right {
        float: right;
        width: 75%;
    }

    .pannel_port_weather .pannel_content ._right .item {
        float: left;
        font-size: 12px;
        width: 33%;
    }

    .pannel_port_weather .pannel_content ._right .item ._day {
        line-height: 36px;
        padding-left: 20px;
    }

    .pannel_port_weather .pannel_content ._right .item .weather_img img {
        width: 65px;
        height: 60px;
        margin-bottom: 6px;
    }

    .pannel_port_weather .pannel_content ._right .item ._one {
        line-height: 22px;
    }

    /* 航线航速table */
    .flex-tabel .tableHead .item, .flex-tabel .tableRow .item {
        width: 8.2% !important;
    }

    .flex-tabel .tableHead .item:nth-child(1), .flex-tabel .tableRow .item:nth-child(1) {
        width: 5% !important;
    }

    .flex-tabel .tableHead .item:nth-child(2), .flex-tabel .tableRow .item:nth-child(2) {
        width: 21% !important;
    }

    .flex-tabel .tableHead .item:nth-child(7), .flex-tabel .tableRow .item:nth-child(7) {
        width: 15% !important;
    }

    .flex-tabel .tableHead .item:nth-child(8), .flex-tabel .tableRow .item:nth-child(8) {
        width: 15% !important;
    }

    .flex-tabel .tableHead .item:nth-child(9), .flex-tabel .tableRow .item:nth-child(9) {
        width: 17% !important;
    }

    .pannel_10 {
        position: absolute;
        top: auto;
        bottom: 22px;
        left: 119px;
        width: calc(100% - 430px);
    }

    .zIndex {
        z-index: 99999;
    }
    .zIndexz{
        z-index: 999999;
    }
    /* .hover-status{
        background-color: #363636;
        cursor: pointer;
    }

    .hover-status:hover{
        background-color: #F2A610;
    } */
    @media screen and (max-width: 1366px) {
        .pannel_4 {
            position: absolute;
            top: auto;
            bottom: 22px;
            left: 119px;
            width: calc(100% - 335px);
        }

        .pannel_table .pannel_title .check_group {
            margin-left: 10px;
        }

        .check_group .item + .item {
            margin-left: 0px;
        }

        .pannel_table .pannel_title .details_2 .item + .item {
            margin-left: 5px;
        }

        .ctrl-center span {
            display: inline-block;
            text-align: right !important;
            width: 90px;
        }
    }
    .ctrl-center span,.ctrl-span {
        display: inline-block;
        text-align: right !important;
        width: 90px;
    }

    .ctrl-ul li .ctrl-kongzai {
        line-height: 25px !important;
        text-align: center;
    }
    .port-details-wrap{width: 400px;}
    .port-details-video-wrap{
        width: 100%;
        text-align: center;
    }
    .port-details-video-wrap video{
        max-width: 100%;
        width: 100% !important;
        height: 225px !important;
    }
</style>

