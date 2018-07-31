<template>
	<section>
	    <div>
		<div class="inner">
	      <div class="wl_stowp_info">
	      {{shipPact.shipName}} IMO：{{shipPact.imo}}  <a href="javascript:;"v-for="(item,index) in trackList" :class="index == tips? 'xieyi' :''" @click="xieyiTab(index)">[{{item.agreementCode}}]</a>
	      <span class=""><a href="javascript:;" @click="getShipMap" class="condition">船舶动态</a><a href="javascript:;" @click="getMap">港口搜索</a><a href="javascript:;" @click="getMap">航线航速</a></span>
	      </div>
	    </div>
	    <div v-for = "(oneData,index) in trackList" :style="{display: index==tips ? 'block':'none'}" id="isShow">
	    <div class="wl_stowp_menu clearfix">

	      <div class="inner">

	        <ul class="wl_stowp_menut">
	          <li class="begin" @click="getStart">
	            <span :class="{'doing':status>=2}"><i class="ico-tran ico-ccks"></i></span>
	            <span class="wl_sto_text" :class="num==2 ? 'doing':''">航次开始</span>
	          </li>
	          <li class="begin" @click="getLoad">
	            <span :class="{'doing':status>=3}"><i class="ico-tran ico-zhug"></i></span>
	            <span class="wl_sto_text" :class="num==3 ? 'doing':''">装港</span>
	          </li>
	          <li class="begin"  @click="getOn">
	            <span :class="{'doing':status>=4}"><i class="ico-tran ico-zait"></i></span>
	            <span class="wl_sto_text" :class="num==4 ? 'doing':''">在途</span>
	          </li>
	          <li class="begin"  @click="getUnload">
	            <span :class="{'doing':status>=5}"><i class="ico-tran ico-xieg"></i></span>
	            <span class="wl_sto_text" :class="num==5 ? 'doing':''">卸港</span>
	          </li>
	          <li class="begin"   @click="getEnd">
	            <span :class="{'doing':status>=6}"><i class="ico-tran ico-ccjs"></i></span>
	            <span class="wl_sto_text" :class="num>=6 ? 'doing':''">航次结束</span>
	          </li>
	        </ul>
	      </div>
	    </div>
	    <!--配载计划-->
	    <div class="inner" v-show="num ==2">
	      <div class="wl_stowp_tabl clearfix">
	        <h1>配载计划</h1>
	        <div class="c-tabdiv1">
			  <table>
	            <tr>
	            	<th>配载计划油种</th>
	            	<th>计划装量（桶）</th>
	            	<th>配载计划装量(吨)</th>
	            	<th>配载计划API</th>
	            	<th>配载计划装货温度(℉)</th>
	            	<th>配载计划装港吃水(米)</th>
	            	<th>配载计划卸港吃水(米)</th>
	            </tr>
	            <tr class="c-tabcos1" v-for="item in oneData.VoyageStart">
	            	<td>{{item.oilType}}</td>
			      	<td>{{item.quantityCask|formatNumber(2,1)}}</td>
			      	<td>{{item.quantity|formatNumber(3,1)}}</td>
			      	<td>{{item.api|formatNumber(2,1)}}</td>
			      	<td>{{item.loadTemp|formatNumber(2,1)}}</td>
                  	<td>{{item.loadDraft|formatNumber(2,1)}}</td>
			      	<td>{{item.unloadDraft|formatNumber(2,1)}}</td>
	            </tr>
	          </table>
		     </div>
	      </div>
	    </div>



	   <!--装港-->
	    <div class="inner"  v-show="num ==3">
      <div class="wl_stowp_tabl clearfix" v-for="(item,index) in oneData.loadPort">
        <h1>装港装货</h1>
        <div class="wl_loadp_con">
          <h2>{{item.ship.loadPort}}</h2>
          <div class="wl_loadp_content clearfix">
            <h3>航程信息</h3>
            <ul>
              <li>ETA:<em>{{item.ship.eta| timestampFormat('MM-DD HH:mm')}}</em></li>
              <li>预计靠泊时间:<em>{{item.ship.exBerth | timestampFormat('MM-DD HH:mm')}}</em></li>
              <!--<li>指定商检:<em>CCIC</em></li>
              <li>装港船代:<em>青岛中远船代</em></li>-->
            </ul>
          </div>

          <div class="wl_loadp_content clearfix">
            <h3>装港信息</h3>
            <div class="wl_loadp_zgxx clearfix" v-for="(lists,index) in item.timeList" v-if="index < item.timeList.length-1">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt"></i></span>
	              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.time | timestampFormat('YYYY-MM-DD')}}</div>
	              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.week}}</div>

	              <div class="wl_loadp_zgxxneir">
	                <span v-for="(times,index) in lists">{{times.time | timestampFormat('HH:mm')}}<em>{{times.name}}</em></span>
	              </div>

            </div>
            <div class="wl_loadp_zgxx wloadp_zgxx clearfix" v-for="(lists,index) in item.timeList" v-if="index == item.timeList.length-1">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt1"></i></span>
              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.time | timestampFormat('YYYY-MM-DD')}}</div>
              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.week}}</div>
              <div class="wl_loadp_zgxxneir">
                <span v-for="(times,index) in lists">{{times.time | timestampFormat('HH:mm')}}<em>{{times.name}}</em></span>
                <span>
                  <em>
                    <p v-if="item.ship.accessory1 != null" :title="item.ship.accessory1Path">{{item.ship.accessory1 | truncate(16)}}<a href='javascript:;'class="wl_ladco_ann" @click="getSource(item.ship.accessory1Path)">查看</a><a class="wl_ladco_ann"  href="javascript:;" download=""  @click="downloadFn(item.ship.accessory1Path)">下载</a></p>
                  </em>
               </span>
              </div>


            </div>
          </div>

          <!--<div class="wl_loadp_content clearfix">
            <h3>代理信息</h3>
            <ul>
              <li>ETA:<em>{{item.ship.eta| timestampFormat('MM-DD HH:mm')}}</em></li>
              <li>预计靠泊时间:<em>{{item.ship.exBerth | timestampFormat('MM-DD HH:mm')}}</em></li>
              <li>指定商检:<em>CCIC</em></li>
              <li>装港船代:<em>青岛中远船代</em></li>
            </ul>
          </div>-->
          <div class="wl_loadp_content  wl_loadp_contentl clearfix">
            <h3>装港货物信息</h3>
            <div v-if="oneData.flag == 0">
	            <ul class="wl_loadp_contet clearfix">
	              <li>租船协议：{{item.goods.agreementCode}}</li>
	              <li>油种：{{item.ship.oilType}}</li>
	              <!--<li>数量（桶）：220，000，334</li>-->
	            </ul>
	            <ul class="wl_loadp_connr clearfix">
	               <li v-if="item.goods.billOfLadingPath != null" :title="item.goods.billOfLadingName">{{item.goods.billOfLadingName | truncate(16)}}<a href='javascript:;'class="wl_ladco_ann" @click="getSource(item.goods.billOfLadingPath)">查看</a>
	               	<a class="wl_ladco_ann" href="javascript:;" download=""    @click="downloadFn(item.goods.billOfLadingPath)">下载</a>
	               </li>
				   <li v-if="item.goods.cerOfOriginalPath != null" :title="item.goods.cerOfOriginalName">{{item.goods.cerOfOriginalName | truncate(16)}}<a href="javascript:;" class="wl_ladco_ann" @click="getSource(item.goods.cerOfOriginalPath)">查看</a>
				   	<a class="wl_ladco_ann" href="javascript:;" download=""   @click="downloadFn(item.goods.cerOfOriginalPath)">下载</a></li>
				   <li v-if="item.goods.cerOfQualityPath != null" :title="item.goods.cerOfQualityName">{{item.goods.cerOfQualityName | truncate(16)}}<a href="javascript:;" class="wl_ladco_ann" @click="getSource(item.goods.cerOfQualityPath)">查看</a>
				   	<a class="wl_ladco_ann" href="javascript:;" download=""   @click="downloadFn(item.goods.cerOfQualityPath)">下载</a></li>
				   <li v-if="item.goods.cerOfQuantityPath != null" :title="item.goods.cerOfQuantityName">{{item.goods.cerOfQuantityName | truncate(16)}}<a href="javascript:;" class="wl_ladco_ann" @click="getSource(item.goods.cerOfQuantityPath)">查看</a>
				   	<a class="wl_ladco_ann" href="javascript:;" download=""   @click="downloadFn(item.goods.cerOfQuantityPath)">下载</a></li>
				   <li v-if="item.goods.manifestPath != null" :title="item.goods.manifestName">{{item.goods.manifestName | truncate(16)}}<a href="javascript:;" class="wl_ladco_ann" @click="getSource(item.goods.manifestPath)">查看</a>
				   	<a class="wl_ladco_ann" href="javascript:;" download=""   @click="downloadFn(item.goods.manifestPath)">下载</a></li>
	            </ul>
            </div>
            <ul class="wl_loadp_contet clearfix" v-if="oneData.flag == 1">
              <li>租船协议：{{item.goods.agreementCode}}</li>
              <li>油种：{{item.ship.oilType}}</li>
              <!--<li>数量（桶）：220，000，334</li>-->
              <li>装港：{{item.ship.loadPort}}</li>
              <li>提单日：{{item.goods.blDate| timestampFormat('YYYY-MM-DD')}}</li>
              <li>装货期：{{item.ship.acStart| timestampFormat('MM-DD HH:mm')}}-{{item.ship.acFinish| timestampFormat('MM-DD HH:mm')}}</li>
              <li>US Barrels @60︒F（Gross）：{{item.goods.blHairBarrel|formatNumber(2,1)}}</li>
              <li>US Barrels @60︒F（Net）：{{item.goods.blNightstool|formatNumber(2,1)}}</li>
              <li>MT (in Air)（Gross）：{{item.goods.blHairTonnage|formatNumber(3,1)}}</li>
              <li>MT (in Air)（Net）：{{item.goods.blNetTonnage|formatNumber(3,1)}}</li>
              <li>Cubic meters@15︒C（Gross ）：{{item.goods.shGrossCubicMeter}}</li>
              <li>Cubic meters @15︒C（Net）：{{item.goods.shNetCubicMeter}}</li>
              <li>Density @15︒C（Kg/L）：{{item.goods.shDensity}}</li>
              <li>API @60︒F:{{item.goods.api|formatNumber(2,1)}}</li>
              <li>水杂：{{item.goods.waterImpCon|formatNumber(2,1)}}</li>
              <li>明水：{{item.goods.waterQuantity}}</li>
              <li>Others：{{item.goods.remark}}</li>
              <li>ship figure after loading Bbl. (Gross)：{{item.goods.shHairBarrel}}</li>
              <li>ship figure after loading MT in air (Gross)：{{item.goods.shHairTonnage}}</li>
            </ul>
            <!--<ul class="wl_loadp_connr clearfix">
              <li><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></li>
            </ul>-->
            <div class="wl_loadp_conpic clearfix">
            	<span v-for="img in item.imgList">
            		<a href="javascript:;" v-show="img.type==1"><img :src="img.path" alt=""></a>
		             <video id ="video" controls style="width:100%;height:100%;object-fit:fill ;" v-show='img.type==2'>
		   				<source :src="img.path" ></source>
					</video>
            	</span>

            </div>
            <!--<div class="wl_loadp_conpic clearfix">
              <a href=""><img src="../../../static/images/wl_pic1.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic2.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic3.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic1.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic2.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic3.jpg" alt=""></a>
            </div>-->
          </div>
        </div>
        <!--<div class="wl_loadp_con">
          <h2>SOUTH KOREB</h2>
          <div class="wl_loadp_content clearfix">
            <h3>航程信息</h3>
            <ul>
              <li>ETA:<em>2018-03-11</em></li>
              <li>预计靠泊时间:<em>2018-03-11 12:43</em></li>
              <li>指定商检:<em>CCIC</em></li>
              <li>装港船代:<em>青岛中远船代</em></li>
            </ul>
          </div>
          <div class="wl_loadp_content clearfix">
            <h3>装港信息</h3>
            <div class="wl_loadp_zgxx clearfix">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt"></i></span>
              <div class="wl_loadp_zgxxtit">2018-03-10</div>
              <div class="wl_loadp_zgxxtit">周六</div>
              <div class="wl_loadp_zgxxneir">
                <span>09:12:47<em>递交NOR</em></span>
                <span>09:12:47<em>引水上船</em></span>
                <span>09:12:47<em>起锚</em></span>
                <span>09:12:47<em>开始装货</em></span>
              </div>
            </div>
            <div class="wl_loadp_zgxx clearfix">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt"></i></span>
              <div class="wl_loadp_zgxxtit">2018-03-10</div>
              <div class="wl_loadp_zgxxtit">周日</div>
              <div class="wl_loadp_zgxxneir">
                <span>09:12:47<em>装货完成</em></span>
                <span>09:12:47<em>拆管，预计离港时间：2018-03-10</em></span>
                <span>
                  <em>
                    <p><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></p>
                    <p><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></p>
                  </em>
                </span>
              </div>
            </div>
            <div class="wl_loadp_zgxx clearfix">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt1"></i></span>
              <div class="wl_loadp_zgxxtit">&nbsp;</div>
              <div class="wl_loadp_zgxxtit">&nbsp;</div>
              <div class="wl_loadp_zgxxneir">
                <span>09:12:47<em>离港，下一站：青岛港</em></span>
              </div>
            </div>
          </div>
          <div class="wl_loadp_content clearfix">
            <h3>代理信息</h3>
            <ul>
              <li>ETA:<em>2018-03-11</em></li>
              <li>预计靠泊时间:<em>2018-03-11 12:43</em></li>
              <li>指定商检:<em>CCIC</em></li>
              <li>装港船代:<em>青岛中远船代</em></li>
            </ul>
          </div>
          <div class="wl_loadp_content wl_loadp_contentl clearfix">
            <h3>装港货物信息</h3>
            <ul class="wl_loadp_contet clearfix">
              <li>租船协议：XY203042234342992233</li>
              <li>油种：XY203042234342992233</li>
              <li>数量（桶）：220，000，334</li>
              <li>装港/Port of loading：2018-2-22</li>
              <li>提单日：2018-2-22</li>
              <li>装货期/laycan：2018-03-28</li>
              <li>桶US Barrels @60︒F（Gross）：200，000.324</li>
              <li>桶US Barrels @60︒F（Net）：199，000.224</li>
              <li>吨MT (in Air)（Gross）：200，000.444</li>
              <li>吨MT (in Air)（Net）：333，000.555</li>
              <li>立方米Cubic meters@15︒C（Gross ）：33，000.344</li>
              <li>立方米Cubic meters @15︒C（Net）：99，990</li>
              <li>密度Density @15︒C（Kg/L）：7.888</li>
              <li>API @60︒F:99244</li>
              <li>水杂BS&W：54929</li>
              <li>明水Free Water：owfdfo</li>
              <li>Others：nathing</li>
              <li>装港船数/ship figure after loading Bbl. (Gross)：33</li>
              <li>装港船数/ship figure after loading MT in air (Gross)：33</li>
            </ul>
            <ul class="wl_loadp_connr clearfix">
              <li><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></li>
            </ul>
            <div class="wl_loadp_conpic clearfix">
              <a href=""><img src="../../../static/images/wl_pic1.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic2.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic3.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic1.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic2.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic3.jpg" alt=""></a>
            </div>
          </div>
        </div>-->
      </div>
    </div>

    <!--在途-->
    <div class="inner"  v-show="num ==4">
      <div class="wl_stowp_tabl clearfix">
        <h1>在途信息<!-- <em @click="getMore(datas.shipPact.uuid)"><a href="javascript:;">查看更多 &gt;</a></em> --></h1>
        <div class="c-tabdiv1">
		  <table>
            <tr>
            	<th>时间</th>
            	<th>位置</th>
            	<th>平均速度(24H)</th>
            	<th>平均速度(全程)</th>
            	<th>RPM</th>
            	<th>海况</th>
            	<th>ETA</th>
				<th>目的港</th>
            	<th>明水</th>
            	<th>气相硫化氢</th>
            	<th>备注</th>
            </tr>
            <tr class="c-tabcos1" v-for="item in transitList">
            	<td>{{item.dateNow}}</td>
            	<td>{{item.position}}</td>
            	<td>{{item.speedH}}</td>
            	<td>{{item.speedAll}}</td>
            	<td>{{item.rpm}}</td>
            	<td>{{item.sea}}</td>
            	<td>{{item.ETA | truncate(18)}}</td>
				<td>{{item.unload}}</td>
            	<td>{{item.water}}</td>
            	<td>{{item.sulfide}}</td>
            	<td :title='item.remark'>{{item.remark | truncate(8)}}</td>
            </tr>
            <!--<tr class="c-tabcos1"><td>2018-03-11 14:20</td><td>17°60.0’N/090°59.0’E</td><td>13.5</td><td>12.9</td><td>6000</td><td>N3……N5</td><td>1</td><td>2</td><td>3</td></tr>
            <tr class="c-tabcos1"><td>2018-03-11 14:20</td><td>17°60.0’N/090°59.0’E</td><td>13.5</td><td>12.9</td><td>6000</td><td>N3……N5</td><td>1</td><td>2</td><td>3</td></tr>
            <tr class="c-tabcos1"><td>2018-03-11 14:20</td><td>17°60.0’N/090°59.0’E</td><td>13.5</td><td>12.9</td><td>6000</td><td>N3……N5</td><td>1</td><td>2</td><td>3</td></tr>-->
          </table>
	     </div>
      </div>
    </div>


	<!-- 在途图片视频附件 -->
	<div class="inner"  v-show="num ==4">
		<div class="wl_loadp_content  wl_loadp_contentl clearfix">
			<div class="wl_loadp_conpic mardel clearfix">
  <span v-for="img in imgList">
			<a href="javascript:;" v-show="img.type==1"><img :src="img.path" alt=""></a>
			 <video id ="video" controls style="width:100%;height:100%;object-fit:fill ;" v-show='img.type==2'>
				<source :src="img.path" ></source>
			</video>
			<em>{{img.times}}</em>
   </span>
			</div>
			<ul class="wl_loadp_connr mardel1 clearfix">
				<li  v-for="imgs in accessList"><a :href="imgs.path"  :title='imgs.name'>{{imgs.name | truncate(12)}}</a><a :href="imgs.path" class="wl_ladco_ann">查看</a><a href="javascript:;" class="wl_ladco_ann"  @click="downloadFn(imgs.path)">下载</a><span>{{imgs.times}}</span></li>
			</ul>
		</div>
	</div>


    <!--卸港-->
     <div class="inner"  v-show="num ==5">
      <div class="wl_stowp_tabl clearfix" v-for="(item,index) in oneData.unloadPort">
        <!--<h1>卸港卸货<span>SOUTH KOREA</span><span>SOUTH KOREB</span></h1>-->
         <h1>卸港卸货</h1>
        <div class="wl_loadp_con">
          <h2>{{item.ship.unloadPort}}</h2>
          <div class="wl_loadp_content clearfix">
            <h3>航程信息</h3>
            <ul>
              <li>ETA:<em>{{item.ship.eta| timestampFormat('MM-DD HH:mm')}}</em></li>
              <li>预计靠泊时间:<em>{{item.ship.exBerth| timestampFormat('MM-DD HH:mm')}}</em></li>

            </ul>
          </div>
         <div class="wl_loadp_content clearfix">
            <h3>卸港信息</h3>
            <div class="wl_loadp_zgxx clearfix" v-for="(lists,index) in item.timeList" v-if="index < item.timeList.length-1">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt"></i></span>
	              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.time | timestampFormat('YYYY-MM-DD')}}</div>
	              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.week}}</div>

	              <div class="wl_loadp_zgxxneir">
	                <span v-for="(times,index) in lists">{{times.time | timestampFormat('HH:mm')}}<em>{{times.name}}</em></span>
	              </div>

            </div>
            <div class="wl_loadp_zgxx wloadp_zgxx clearfix" v-for="(lists,index) in item.timeList" v-if="index == item.timeList.length-1">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt1"></i></span>
              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.time | timestampFormat('YYYY-MM-DD')}}</div>
              <div class="wl_loadp_zgxxtit" v-for="(times,index) in lists" v-if="index ==0">{{times.week}}</div>
              <div class="wl_loadp_zgxxneir">
                <span v-for="(times,index) in lists">{{times.time | timestampFormat('HH:mm')}}<em>{{times.name}}</em></span>
                 <span>
                  <em>
                    <p v-if="item.ship.accessory1 != null" :title="item.ship.accessory1Path">{{item.ship.accessory1 | truncate(16)}}<a href='javascript:;'class="wl_ladco_ann" @click="getSource(item.ship.accessory1Path)">查看</a><a class="wl_ladco_ann"  href="javascript:;" download="" @click="downloadFn(item.ship.accessory1Path)">下载</a></p>
                  </em>
               </span>
              </div>
            </div>
          </div>
          <!--<div class="wl_loadp_content clearfix">
            <h3>代理信息</h3>
            <ul>
              <li>ETA:<em>{{item.ship.eta| timestampFormat('YYYY-MM-DD')}}</em></li>
              <li>预计靠泊时间:<em>{{item.ship.exBerth| timestampFormat('MM-DD HH:mm')}}</em></li>
              <li>指定商检:<em>CCIC</em></li>
              <li>装港船代:<em>青岛中远船代</em></li>
            </ul>
          </div>-->
          <div class="wl_loadp_content  wl_loadp_contentl clearfix">
            <h3>卸港货物信息</h3>
            <div v-if="oneData.flag == 0">
	            <ul class="wl_loadp_contet clearfix">
	              <li>租船协议：{{item.goods.agreementCode}}</li>
	              <li>油种：{{item.ship.oilType}}</li>
	              <!--<li>数量（桶）：220，000，334</li>-->
	            </ul>
	            <ul class="wl_loadp_connr clearfix">
	              <li v-if="item.goods.accessoryPath != null" :title="item.goods.accessoryName"><a href="javascript:;">{{item.goods.accessoryName | truncate(16)}}</a><a href="javascript:;" class="wl_ladco_ann"  @click="getSource(item.goods.accessoryPath)">查看</a><a href="javascript:;" class="wl_ladco_ann" download="" @click="downloadFn(item.goods.accessoryPath)">下载</a></li>
	              <!--<li><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></li>
	              <li><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></li>
	              <li><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></li>
	              <li><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></li>-->
	            </ul>
            </div>
            <ul class="wl_loadp_contet clearfix" v-if="oneData.flag == 1">
              <li>租船协议：{{item.goods.agreementCode}}</li>
              <li>油种：{{item.ship.oilType}}</li>
             <!-- <li>数量（桶）：220，000，334</li>-->
              <li>Port of loading：{{item.ship.unloadPort}}</li>
              <li>提单日：{{item.goods.blDate| timestampFormat('YYYY-MM-DD')}}</li>
              <li>laycan：{{item.ship.acStart| timestampFormat('MM-DD HH:mm')}}-{{item.ship.acFinish| timestampFormat('MM-DD HH:mm')}}</li>
              <li>US Barrels @60︒F（Gross）：{{item.goods.commHairBar|formatNumber(2,1)}}</li>
              <li>US Barrels @60︒F（Net）：{{item.goods.commCleanBar|formatNumber(2,1)}}</li>
              <li>MT (in Air)（Gross）：{{item.goods.commHairTon|formatNumber(3,1)}}</li>
              <li>MT (in Air)（Net）：{{item.goods.commCleanTon|formatNumber(3,1)}}</li>
              <li>Cubic meters@15︒C（Gross ）：{{item.goods.shGrossCubicMeter|formatNumber(3,1)}}</li>
              <li>Cubic meters @15︒C（Net）：{{item.goods.shNetCubicMeter|formatNumber(3,1)}}</li>
              <li>Density @15︒C（Kg/L）：{{item.goods.shDensity|formatNumber(3,1)}}</li>
              <li>API @60︒F:{{item.goods.api}}</li>
              <li>BS&W：{{item.goods.waterImpCon}}</li>
              <li>Free Water：{{item.goods.waterQuantity}}</li>
              <li>Others：{{item.goods.remark}}</li>
              <li>ship figure after loading Bbl. (Gross)：{{item.goods.shipHairTon|formatNumber(3,1)}}</li>
              <li>ship figure after loading MT in air (Gross)：{{item.goods.shipHairBar|formatNumber(3,1)}}</li>
            </ul>
           <div class="wl_loadp_conpic clearfix">
            	<span v-for="img in item.imgList">
            		<a href="javascript:;" v-show="img.type==1"><img :src="img.path" alt=""></a>
		             <video id ="video" controls style="width:100%;height:100%;object-fit:fill ;" v-show='img.type==2'>
		   				<source :src="img.path" ></source>
					</video>
            	</span>

            </div>

          </div>
        </div>
        <!--<div class="wl_loadp_con">
          <h2>SOUTH KOREB</h2>
          <div class="wl_loadp_content clearfix">
            <h3>航程信息</h3>
            <ul>
              <li>ETA:<em>2018-03-11</em></li>
              <li>预计靠泊时间:<em>2018-03-11 12:43</em></li>
              <li>指定商检:<em>CCIC</em></li>
              <li>装港船代:<em>青岛中远船代</em></li>
            </ul>
          </div>
          <div class="wl_loadp_content clearfix">
            <h3>装港信息</h3>
            <div class="wl_loadp_zgxx clearfix">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt"></i></span>
              <div class="wl_loadp_zgxxtit">2018-03-10</div>
              <div class="wl_loadp_zgxxtit">周六</div>
              <div class="wl_loadp_zgxxneir">
                <span>09:12:47<em>递交NOR</em></span>
                <span>09:12:47<em>引水上船</em></span>
                <span>09:12:47<em>起锚</em></span>
                <span>09:12:47<em>开始装货</em></span>
              </div>
            </div>
            <div class="wl_loadp_zgxx clearfix">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt"></i></span>
              <div class="wl_loadp_zgxxtit">2018-03-10</div>
              <div class="wl_loadp_zgxxtit">周日</div>
              <div class="wl_loadp_zgxxneir">
                <span>09:12:47<em>装货完成</em></span>
                <span>09:12:47<em>拆管，预计离港时间：2018-03-10</em></span>
                <span>
                  <em>
                    <p><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></p>
                    <p><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></p>
                  </em>
                </span>
              </div>
            </div>
            <div class="wl_loadp_zgxx clearfix">
              <span class="wl_ladic_xx"><i class="ico-tran ico-xxzt1"></i></span>
              <div class="wl_loadp_zgxxtit">&nbsp;</div>
              <div class="wl_loadp_zgxxtit">&nbsp;</div>
              <div class="wl_loadp_zgxxneir">
                <span>09:12:47<em>离港，下一站：青岛港</em></span>
              </div>
            </div>
          </div>
          <div class="wl_loadp_content clearfix">
            <h3>代理信息</h3>
            <ul>
              <li>ETA:<em>2018-03-11</em></li>
              <li>预计靠泊时间:<em>2018-03-11 12:43</em></li>
              <li>指定商检:<em>CCIC</em></li>
              <li>装港船代:<em>青岛中远船代</em></li>
            </ul>
          </div>
          <div class="wl_loadp_content wl_loadp_contentl clearfix">
            <h3>装港货物信息</h3>
            <ul class="wl_loadp_contet clearfix">
              <li>租船协议：XY203042234342992233</li>
              <li>油种：XY203042234342992233</li>
              <li>数量（桶）：220，000，334</li>
              <li>装港/Port of loading：2018-2-22</li>
              <li>提单日：2018-2-22</li>
              <li>装货期/laycan：2018-03-28</li>
              <li>桶US Barrels @60︒F（Gross）：200，000.324</li>
              <li>桶US Barrels @60︒F（Net）：199，000.224</li>
              <li>吨MT (in Air)（Gross）：200，000.444</li>
              <li>吨MT (in Air)（Net）：333，000.555</li>
              <li>立方米Cubic meters@15︒C（Gross ）：33，000.344</li>
              <li>立方米Cubic meters @15︒C（Net）：99，990</li>
              <li>密度Density @15︒C（Kg/L）：7.888</li>
              <li>API @60︒F:99244</li>
              <li>水杂BS&W：54929</li>
              <li>明水Free Water：owfdfo</li>
              <li>Others：nathing</li>
              <li>装港船数/ship figure after loading Bbl. (Gross)：33</li>
              <li>装港船数/ship figure after loading MT in air (Gross)：33</li>
            </ul>
            <ul class="wl_loadp_connr clearfix">
              <li><a href="">bill of lading.pdf</a><a href="" class="wl_ladco_ann">查看</a><a href="" class="wl_ladco_ann">下载</a></li>
            </ul>
            <div class="wl_loadp_conpic clearfix">
              <a href=""><img src="../../../static/images/wl_pic1.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic2.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic3.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic1.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic2.jpg" alt=""></a>
              <a href=""><img src="../../../static/images/wl_pic3.jpg" alt=""></a>
            </div>
          </div>
        </div>-->
      </div>
    </div>

    <div class="inner endDiv"  v-show="num >=6">
    	航程结束！
    </div>
    </div>
	    <!--地图-->
	    <div class="inner">
	      <div class="wl_stowp_map">
	      	<!--<img src="../../../static/images/wl_p_map.jpg" alt=""/>-->
	      	<div class="bootmap">
	      		<pcappmap :ships='ships'></pcappmap>
	      	</div>

	        <span class="wl_stowp_mapd">
	          <a href="javascript:;" @click="getShipSearch">船舶查询</a><a href="javascript:;" @click="getMap">港口查询</a>
	          <em>
	           <a href="javascript:;" @click="getMap">历史航线</a><a href="javascript:;" @click="getMap">航速航线</a>
	          </em>
	        </span>
	        <div class="tab" style="position: absolute; right: 20px;top: 80px;">
	        	<span @click="map2">地图</span><span  @click="map1">卫星地图</span>
	        </div>
	      </div>
	    </div>

	    <!--<div class="inner">
	    	<div class="wl_stowp_map">
	    		<appmap></appmap>
	    	</div>

	      <div class="wl_stowp_map"></div>
	    </div>-->
	</div>

	</section>
</template>

<script>
	import {queryTrack,mapgui} from '../../api/ship'
	import pcappmap from '../pc_app.vue'
	export default{
		data(){
			return{
				imo:'',
				num:null,
				datas:[],
				trackList:[],
				shipPact:[],
				transitList:[],
                imgList:[],
                accessList:[],
				tips:0,
				status:1,
				ships:{
					mmis:'',
					startTime:'',
					endTime:'',
					flag:1,
					imo:'',
					type:'',
                    signDate:'',
				}

			}
		},
		methods:{

			getShipSearch(){
				window.open(configURL.shipUrl+"/page/#/routemap?imo=" + this.imo,"_blank");
			},
			map2(){
				window.roadmap()
			},
			map1(){
				 window.satellite()
			},
			getShipMap(){
				$('#isShow').toggle()
				if($('.condition').html() == '船舶动态'){
					$('.condition').html('船货跟踪')
				}else{
					$('.condition').html('船舶动态')
				}
			},
			getMore(param){
				this.$router.push({path:'/transmore',query:{name:param}})
			},
			downloadFn(param){
				window.location.href=configURL.shipUrl+"/download.htm?path="+param;
			},
			xieyiTab(id){
				this.tips = id
			},
			getSource(path){
				window.open(path,'_blank');  
			},
			getMap(){
//				this.$router.push({path:'/routemap'})
				window.open(configURL.shipUrl+"/page/#/routemap","_blank");
			},
			getStart(){
				this.num = 2
			},
			getLoad(){
				this.num = 3
			},
			getOn(){
				this.num = 4
			},
			getUnload(){
				this.num = 5
			},
			getEnd(){
				this.num = 6
			},
			init(){
				var para = {};
				if(this.$own.getHref('uuid')){
					para.uuid=this.$own.getHref('uuid');
				}else{
					para.agreementUuid=this.$own.getHref('agreementUuid');
				}

				//para.uuid='e90ba980d23e44c28ae9267e91e928d1';
				queryTrack(para).then((res)=>{
                    console.log(res, 'res');
					this.status = res.datas.shipPact.detailStatus;
					this.datas = res.datas;
					this.transitList = res.datas.transitList
					this.trackList=res.datas.trackList;
					this.shipPact = res.datas.shipPact;
					this.accessList = res.datas.accessList;
                    this.imgList = res.datas.imgList;
					console.log(res);
                    this.imo = res.datas.shipPact.imo;
					//imo
					this.ships.imo=res.datas.shipPact.imo;

					 this.ships.mmis = res.datas.shipPact.mmsi;
					 //timeBeg
					 this.ships.startTime = res.datas.shipPact.timeBeg;
					 //timeEnd
					 this.ships.endTime = res.datas.shipPact.timeEnd;

					 this.ships.type = res.datas.shipPact.type;

                     this.ships.signDate = res.datas.shipPact.signDate;

                     this.num = res.datas.shipPact.detailStatus;

				})

			},
			shipMove(){

			}
		},
		components:{
          	pcappmap
        },
		mounted(){
			this.init()

		},
		created(){

		}
	}
</script>

<style scoped>
	.bootmap{
		height: 800px;
	}

	.xieyi{
		color: #0063DB;
	}

	.tab span{
		display: block;
		padding: 0 10px;
		line-height: 30px;
		float: left;
		background: #FFFFFF;
		text-align: center;
		cursor: pointer;
	}
	.tab span:first-child{
		border-right: 1px solid #C0C0C0;
	}

</style>
