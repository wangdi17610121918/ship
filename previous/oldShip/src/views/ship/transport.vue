<template>
	<section>
		 <div class="tran_bg_box">
		<div class="inner">
		  <div class="tran-ycxx">
	         <div class="tran-title ycxx">油船信息</div>
	         <p class="tran-title-i"><i class="shipping-ico ico-trtt1"></i></p>
			 <p class="tran-line1"></p>
	         <ul class="tran-cont clearfix">
	            <!--<li><span class="tran-cont1">船合同号：</span><span class="tran-cont2">{{oneData.shipPactCode}}</span></li>-->
	             <li><span class="tran-cont1">租船协议号：</span><span class="tran-cont2">{{oneData.agreementCode}}</span></li>
	            <!--<li><span class="tran-cont1">油品合同号：</span><span class="tran-cont2">{{oneData.pactCode}}</span></li>-->
	            <li><span class="tran-cont1">租约日：</span><span class="tran-cont2">{{oneData.signDate}}</span></li>
	            <li><span class="tran-cont1">船名：</span><span class="tran-cont2">{{oneData.shipName}}</span></li>
	            <li><span class="tran-cont1">船东：</span><span class="tran-cont2">{{oneData.shipOwner}}</span></li>
	            <li><span class="tran-cont1">租船人：</span><span class="tran-cont2">{{oneData.carrierName}}</span></li>
	            <li><span class="tran-cont1">LAYCAN：</span><span class="tran-cont2">{{oneData.laycan}}</span></li>
	            <li><span class="tran-cont1">第一装港：</span><span class="tran-cont2">{{oneData.loadPort}}</span></li>
	         </ul>
	      </div>    
	    </div>
	    
	    <div class="inner">
			<div class="tran-chgz">
	         <div class="tran-title ycxx">船货跟踪</div>
	         <p class="tran-title-i"><i class="shipping-ico ico-trtt2"></i></p>
			 <p class="tran-line2"></p>
	         <div class="tran-xy">
	            <ul class="tran-xy-dh clearfix ry-liBox">
	             	<li v-for="(item,index) in trackList" :class="{'xy-dh-hov':(index==0)}"><a href="javascript:;"  >{{item.agreementCode}}</a></li>
	            </ul>
	           <div class="ry-divBox">
	           		<div class="divBox-div"   v-for="(oneData,index) in trackList" :style="{display: index==0 ? 'block':'none'}">
	           			
	           			<!--top-->
	           			<div class="follow-con clearfix ry-active-tran">
			               <span class="progress-bar"></span>
							<div class="begin doing">
								<span class="begin-ico"><i class="ico-tran ico-fol1" :class="{'ico-fol1-1':status>=2}"></i></span>
								<span class="begin_statue begin_active">航次开始</span>
							</div>
							
			                <div class="begin">
								<span class="begin-ico"><i class="ico-tran ico-fol2" :class="{'ico-fol2-2':status>=3}"></i></span>
								<span class="begin_statue">装港</span>
						    </div>
			                <div class="begin">
								<span class="begin-ico"><i class="ico-tran ico-fol3" :class="{'ico-fol3-3':status>=4}"></i></span>
								<span class="begin_statue">在途</span>
						  	</div>
			              	<div class="begin">
								<span class="begin-ico"><i class="ico-tran ico-fol4" :class="{'ico-fol4-4':status>=5}"></i></span>
								<span class="begin_statue">卸港</span>
						  	</div>
						  	<div class="begin">
								<span class="begin-ico"><i class="ico-tran ico-fol1" :class="{'ico-fol5-5':status>=6}"></i></span>
								<span class="begin_statue">航次结束</span>
						  	</div>
					    </div>
	           			
	           			<!--more-->
	           			
	           			
	           			<div class="tran-qh">
				            <div class="tran-jt"><i class="ico-tran tran-ico1 ry-right-click arrow"></i>&nbsp;</div>
				            <div class="tran-ccks ryLi">
				            	<div class="ry-box-ovh">			          			
				            		<!--航次开始-->
				            		<div class="ry-tr-bao" >
						               <div class="tran-ccks-t">航次开始</div>
						               <div class="tran-ccks-b clearfix">
						                 <h3>配载计划</h3>
						                 <table class="tran-ccks-b-r">
										    <tr class="gaiCss">
										      <th>配载计划油种</th>
										      <th>计划装量（桶）</th>
										      <th>计划装量（吨）</th>
										      <th>计划API</th>
										      <th>计划装货温度  （℉）</th>
						                      <th>配载计划装港吃水（米）</th>
						                      <th>配载计划卸港吃水<br/>（米）</th>
										    </tr>
										    <tr v-for="item in oneData.VoyageStart">
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
						             
				            		<!--装港-->
				            		<div class="ry-tr-bao" >
					            		<div class="tran-ccks-t ">装港</div>
							               <div class="tran-ccks-b clearfix" >
							               		<div class="ry-tran-box ryShowBox" v-for="(item,index) in oneData.loadPort"  :style="{display:index==0 ? 'block':'none'}">
							               			<h3>{{item.ship.loadPort}} <span>{{item.ship.oilType}}</span></h3>
									                <ul class="tran-gnz clearfix"> 
									                   <i class="ico-tran tran-ico4"></i>
									                   <li class="attrActive">ETA：{{item.ship.eta| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">装港：{{item.ship.loadPort}}</li>
									      
									                   <li class="attrActive">预计靠泊时间：{{item.ship.exBerth | timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">NOR递交时间：{{item.ship.norDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>引水上船时间：{{item.ship.waterDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>起锚时间：{{item.ship.atripDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>靠泊完成时间：{{item.ship.berthDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">实际开始装货时间：{{item.ship.acStart| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>实际装货完成时间：{{item.ship.acFinish| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">拆管时间：{{item.ship.remTubeDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">预计离港时间：{{item.ship.exLeave| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">实际离港时间：{{item.ship.acLeave| timestampFormat('MM-DD HH:mm')}}</li>
									                   
									                </ul>
									                <!--<ul class="tran-gnz clearfix">
									                   <i class="ico-tran tran-ico5"></i>  
									                   <li class="attrActive">提单日：{{item.goods.blDate| timestampFormat('YYYY-MM-DD')}}</li>
									                   <li class="attrActive">提单净桶：{{item.goods.blNightstool|formatNumber(2,1)}}</li>
									                   <li class="attrActive">提单毛桶：{{item.goods.blHairBarrel|formatNumber(2,1)}}</li>
									                   <li class="attrActive">提单净吨：{{item.goods.blNetTonnage|formatNumber(3,1)}}</li>
									                   <li class="attrActive">提单毛吨：{{item.goods.blHairTonnage|formatNumber(3,1)}}</li>
									                   <li class="attrActive">API：{{item.goods.api|formatNumber(2,1)}}</li>
									                   <li>水杂含量：{{item.goods.waterImpCon|formatNumber(2,1)}}</li>
									                   <li class="attrActive">装港明水数量：{{item.goods.waterQuantity|formatNumber(2,1)}}</li>
									                   <li>船量毛桶：{{item.goods.shHairBarrel|formatNumber(2,1)}}</li>
									                   <li>船量毛吨：{{item.goods.shHairTonnage|formatNumber(3,1)}}</li>
									                   <li>船量净桶：{{item.goods.shNetBarrel|formatNumber(2,1)}}</li>
									                   <li>船量净吨：{{item.goods.shNetTonnage|formatNumber(3,1)}}</li>
									                   <li class="attrActive">短量比例（桶）：{{item.goods.ratioBarrel|formatNumber(2,1)}}</li>
									                   <li class="attrActive">短量比例（吨）：{{item.goods.ratioTonnage|formatNumber(3,1)}}</li>
									                   <li>On board Quantity(OBQ)：{{item.goods.quantity|formatNumber(2,1)}}</li>
									                   <li>备注：{{item.goods.remark}}</li>
									                </ul>-->
									                <ul class="tran-gnz tran-gnz2 clearfix" v-if="oneData.flag == 1">
													 <i class="ico-tran tran-ico5"></i>
													   <li class="w100">Port of loading:{{item.ship.loadPort}},  <span>{{item.ship.oilType}}</span></li>  
													   <li class="attrActive">提单日：{{item.goods.blDate| timestampFormat('YYYY-MM-DD')}}</li>
													   <li class="attrActive">装货期/laycan：{{item.ship.acStart| timestampFormat('MM-DD HH:mm')}}-{{item.ship.acFinish| timestampFormat('MM-DD HH:mm')}}</li>
													   <li>US Barrels @60 ︒F（Gross）：{{item.goods.blHairBarrel|formatNumber(2,1)}}</li>
													   <li>US Barrels @60 ︒F（Net）：{{item.goods.blNightstool|formatNumber(2,1)}}</li>
													   <li>MT (in Air)（Gross）：{{item.goods.blHairTonnage|formatNumber(3,1)}}</li>
													   <li>MT (in Air)（Net）：{{item.goods.blNetTonnage|formatNumber(3,1)}}</li>
													    <li>API @60 ︒F：{{item.goods.api|formatNumber(2,1)}}</li>
													   <li>Cubic meters @15︒C（Gross）：{{item.goods.shGrossCubicMeter}}</li>
													   <li>Cubic meters @15︒C（Net）：{{item.goods.shNetCubicMeter}}</li>
													    <li>Free Water：{{item.goods.waterQuantity}}</li>
													   <li>Density@15︒C（Kg/L）：{{item.goods.shDensity}}</li>
													 <li>ship figure after loadingBbl. (Gross)：{{item.goods.shHairBarrel}}</li>
													  <li>ship figure after loading MT in air (Gross)：{{item.goods.shHairTonnage}}</li>
													   <li>BS&W：{{item.goods.waterImpCon|formatNumber(2,1)}}</li>
													   <li>Others：{{item.goods.remark}}</li>
													 </ul>
													 <!--附件下载-->
													 <ul class="tran-gnz tran-gnz2 clearfix" v-if="oneData.flag == 0">
													 <i class="ico-tran tran-ico5"></i>
													   <li class="w100">装港/Port of loading:{{item.ship.loadPort}}</li>  
													   <li v-if="item.goods.billOfLadingPath != null">附件:{{item.goods.billOfLadingName}}<a :href="'http://image8.1chemic.com//'+item.goods.billOfLadingPath" download="">下载附件</a></li>
													   <li v-if="item.goods.cerOfOriginalPath != null">附件:{{item.goods.cerOfOriginalName}}<a :href="'http://image8.1chemic.com//'+item.goods.cerOfOriginalPath" download="">下载附件</a></li>
													   <li v-if="item.goods.cerOfQualityPath != null">附件:{{item.goods.cerOfQualityName}}<a :href="'http://image8.1chemic.com//'+item.goods.cerOfQualityPath" download="">下载附件</a></li>
													   <li v-if="item.goods.cerOfQuantityPath != null">附件:{{item.goods.cerOfQuantityName}}<a :href="'http://image8.1chemic.com//'+item.goods.cerOfQuantityPath" download="">下载附件</a></li>
													   <li v-if="item.goods.manifestPath != null">附件:{{item.goods.manifestName}}<a :href="'http://image8.1chemic.com//'+item.goods.manifestPath" download="">下载附件</a></li>
													 </ul>
							               		</div>
								                <div class="wltra-qh clearfix" style="text-align: center;" v-if="oneData.loadPort.length != 0">
								                 	<i class="ico-tran ry-ico-tran ry-click-i ry-tran-ico6" v-for="(item,index) in oneData.loadPort" :class="{'ry-tran-ico7':(index==0)}"></i>
								                 	<!--<span><a href="javascript:;" class="ry-tran-more more_one">查看更多</a></span>-->
								                </div>
							               </div> 
					            	</div>
					            	
					            	
					            	
					            	
					            	<!--在途-->
						            <div class="ry-tr-bao">
						               <div class="tran-ccks-t">在途</div>
						               <div class="tran-ccks-b clearfix">
						                 <!--<i class="ico-tran tran-ico3"></i>-->
						                 <ul class="tran-gnz" v-for="item in oneData.transit">  
						                   <li>日期（LT）：{{item.dateNow| timestampFormat('YYYY-MM-DD')}}</li>
						                   <li>时间：{{item.timeNow}}</li>
						                   <li>位置：{{item.position}}</li>
						                   <li>平均速度（24h）：{{item.speedH}}海里</li>
						                   <li>平均速度（全程）：{{item.speedAll}}海里</li>
						                   <li>RPM：{{item.rpm}}转/分</li>
						                   <li>海况：{{item.sea}}</li>
						                   <li>ETA：{{item.ext1}}</li>
						                   <li>目的港：{{item.unloadEta}}</li>
						                   <li>明水：{{item.water}}</li>
						                   <li>气相硫化氢：{{item.sulfide}}</li>
						                   <li>备注：{{item.remark}} </li>
						                 </ul>
						               </div>
						            </div>
					            	
					            	
					            	
					            	<!--卸港港-->
					            	<div class="ry-tr-bao" >
					            		<div class="tran-ccks-t">卸港</div>
				
							               <div class="tran-ccks-b clearfix" >
							               		<div class="ry-tran-box ryShowBox" v-for="(item,index) in oneData.unloadPort"  :style="{display:index==0 ? 'block':'none'}">
							               			<h3>{{item.ship.unloadPort}} <span>{{item.ship.oilType}}</span></h3>
									                <ul class="tran-gnz clearfix"> 
									                   <i class="ico-tran tran-ico4"></i>
									                   <li class="attrActive">卸港：{{item.ship.unloadPort}}</li>
									                   <li class="attrActive">ETA：{{item.ship.eta| timestampFormat('YYYY-MM-DD')}}</li>
									                   <li class="attrActive">预计靠泊时间：{{item.ship.exBerth| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">NOR递交时间：{{item.ship.norDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>引水上船时间：{{item.ship.waterDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>起锚时间：{{item.ship.atripDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>靠泊完成时间：{{item.ship.berthDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">实际开始卸货时间：{{item.ship.acStart| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li>实际卸货完成时间：{{item.ship.acFinish| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">拆管时间：{{item.ship.remTubeDate| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">预计离港时间：{{item.ship.exLeave| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">实际离港时间：{{item.ship.acLeave| timestampFormat('MM-DD HH:mm')}}</li>
									                   <li class="attrActive">卸港商检：{{item.ship.inspection}}</li>
									                   <li class="attrActive">卸港船代：{{item.ship.agency}}</li>
									                   <li>卸港监卸：{{item.ship.monitor}}</li>
									                </ul>
									                <!--<ul class="tran-gnz clearfix">
									                    <i class="ico-tran tran-ico5"></i> 
									                    <li class="attrActive">卸港船毛桶：{{item.goods.shipHairBar|formatNumber(2,1)}}</li>
									                    <li class="attrActive">卸港船毛吨：{{item.goods.shipHairTon|formatNumber(3,1)}}</li>
									                    <li class="attrActive">卸港商检毛桶：{{item.goods.commHairBar|formatNumber(2,1)}}</li>
									                    <li class="attrActive">卸港商检毛吨：{{item.goods.commHairTon|formatNumber(3,1)}}</li>
									                    <li class="attrActive">卸港商检净桶：{{item.goods.commCleanBar|formatNumber(2,1)}}</li>
									                    <li class="attrActive">卸港商检净吨：{{item.goods.commCleanTon|formatNumber(3,1)}}</li>
									                    <li class="attrActive">卸港国检净桶：{{item.goods.counCleanBar|formatNumber(2,1)}}</li>
									                    <li class="attrActive">卸港国检净吨：{{item.goods.counCleanTon|formatNumber(3,1)}}</li>
									                    <li class="attrActive">卸港罐毛桶：{{item.goods.potHairBar|formatNumber(2,1)}}</li>
									                    <li class="attrActive">卸港罐毛吨：{{item.goods.potHairTon|formatNumber(3,1)}}</li>
									                    <li class="attrActive">船/提单短量%（毛桶）：{{item.goods.blHairBarRate|formatNumber(2,1)}}</li>
									                    <li class="attrActive">船/提单短量%（毛吨）：{{item.goods.blHairTonRate|formatNumber(3,1)}}</li>
									                    <li class="attrActive">船/国检短量%（净桶）：{{item.goods.counCleanBarRate|formatNumber(2,1)}}</li>
									                    <li class="attrActive">船/国检短量%（净吨）：{{item.goods.counCleanTonRate|formatNumber(3,1)}}</li>
									                    <li class="attrActive">ROB(桶）：{{item.goods.robQuanatity|formatNumber(2,1)}}</li>
									               		<li>备注：{{item.goods.remark}}</li>
									                </ul>-->
									                <ul class="tran-gnz tran-gnz2 clearfix" v-if="oneData.flag == 1">
													<i class="ico-tran tran-ico5"></i>
													   <li class="w100">Port of discharge:{{item.ship.unloadPort}}</li>  
													   <li>COD:{{item.goods.cod | timestampFormat('MM-DD HH:mm')}}</li>
													   <li>DDR:{{item.ship.acStart| timestampFormat('MM-DD HH:mm')}}-{{item.ship.acFinish| timestampFormat('MM-DD HH:mm')}}</li>
													   <li>US Barrels @60 ︒F（Gross）：{{item.goods.commHairBar|formatNumber(2,1)}}</li>
													   <li>US Barrels @60 ︒F（Net）：{{item.goods.commCleanBar|formatNumber(2,1)}}</li>
													   <li>MT (in Air)（Gross）：{{item.goods.commHairTon|formatNumber(3,1)}}</li>
													    
													    <li>MT (in Air)（Net）：{{item.goods.commCleanTon|formatNumber(3,1)}}</li>
													   <li>Cubic meters @15︒C（Gross）：{{item.goods.shGrossCubicMeter|formatNumber(3,1)}}</li>
													   <li>Cubic meters @15︒C（Net）：{{item.goods.shNetCubicMeter|formatNumber(3,1)}}</li>
													   <li>Density@15︒C（Kg/L）：{{item.goods.shDensity|formatNumber(3,1)}}</li>
													   <li>API @60 ︒F：{{item.goods.api}}</li>
													    
													    <li>BS&W：{{item.goods.waterImpCon}}</li>
													   <li>Free Water：{{item.goods.waterQuantity}}</li>
													   <li>Others：{{item.goods.remark}}</li>
													   <li>ROB：{{item.goods.robQuanatity}}</li>
													   <li>Ship figure on after loadingBbl. (Gross)：{{item.goods.shipHairTon|formatNumber(3,1)}}</li>
													   
													    <li>Ship figure on after loadingMT in air (Gross)：{{item.goods.shipHairBar|formatNumber(3,1)}}</li>
													   
													   <li>Shore received figure Bbl. (Gross)：{{item.goods.potHairBar}}</li>
													   <li>Shore received figure MT in air (Gross)：{{item.goods.potHairTon}}</li>
													</ul>
													
													 <!--附件下载-->
													 <ul class="tran-gnz tran-gnz2 clearfix" v-if="oneData.flag == 0">
													 <i class="ico-tran tran-ico5"></i>
													    <li class="w100">Port of discharge:{{item.ship.unloadPort}}</li>    
													   <li v-if="item.goods.accessoryPath != null">附件:{{item.goods.accessoryName}}<a :href="'http://image8.1chemic.com//'+item.goods.accessoryPath" download="">下载附件</a></li>
											
													 </ul>
							               		</div>
								                <div class="wltra-qh clearfix" style="text-align: center;" v-if="oneData.unloadPort != 0">
								                 	<i class="ico-tran ry-ico-tran ry-click-i ry-tran-ico6" v-for="(item,index) in oneData.unloadPort" :class="{'ry-tran-ico7':(index==0)}"></i>
								                 	<!--<span><a href="javascript:;" class="ry-tran-more more_two">查看更多</a></span>-->
								                </div>
							               </div> 
					            	</div>
					            	
					            	
					            	<!--在途-->
						            <div class="ry-tr-bao">
						               <div class="tran-ccks-t">航程结束</div>
						               <div class="tran-ccks-b clearfix">
						                	航程结束
						               </div>
						            </div>
					            	
			
				            	</div>
			
				             </div>
				             <div class="tran-jt" v-show="isShowLeft"><i class="ico-tran tran-ico2 ry-left-click"></i>&nbsp;</div>
				           </div>
	           			
	           			
	           			
	           			
	           			<!--more -end-->
	           		</div>

	           	
	           	
	           </div>
	           
	           
	           
			   
			   
			   
			   
	           
	           
	         </div>
	       </div>
	    </div>
	    <div class="inner">
			<div class="tran-ycxx">
				<div class="tran-mod">
	              <div class="tran-title">实时概况</div>
	              <p class="tran-title-i"><i class="shipping-ico ico-trtt1"></i></p>
				  <p class="tran-line1"></p>
	              <table class="tra-table">
					<tr>
					  <th>船名</th>
					  <th>装货港</th>
					  <th>装货ETA</th>
					  <th>实际离港时间</th>
					  <th>卸货港</th>
					  <th>卸货ETA</th>
					  <th>实际卸货完成时间</th>
					  <th>实际离港时间</th>
					  </tr>
					<tr>
					  <td>{{shipRealTime.shipName}}</td>
					  <td>{{shipRealTime.loadPort}}</td>
					  <td>{{shipRealTime.loadPortETA}}</td>
					  <td>{{shipRealTime.loadPortLEAVEDATE}}</td>
					  <td>{{shipRealTime.unloadPort}}</td>
					  <td>{{shipRealTime.unloadPortETA}}</td>
					  <td>{{shipRealTime.acFinish}}</td>
					  <td>{{shipRealTime.unloadPortLEAVEDATE}}</td>
					</tr>
	              </table>
				</div>
			</div>
			</div>
			<div class="inner">
			<div class="tran-chgz">
	         	<div class="tran-mod mod1">
	              <div class="tran-title">全程概览<a href="javascript:;" @click="getMore(datas.shipPact.uuid)">更多>></a></div>
	              <p class="tran-title-i"><i class="shipping-ico ico-trtt2"></i></p>
			 	  <p class="tran-line2"></p>
	              <table class="tra-table">
					<tr>
					  <th>日期</th>
					  <th>时间</th>
					  <th>位置</th>
					  <th>平均速度（24h）</th>
					  <th>平均速度（全程）</th>
					  <th>RPM</th>
					  <th>海况</th>
					  <th>ETA</th>
					  <th>目的港</th>
					  <th>明水(桶)</th>
					  <th>气相硫化氢</th>
					  <th>Remark </th>
					  </tr>
					<tr v-for="item in datas.transitList">
					  <td>{{item.dateNow}}</td>
					  <td>{{item.timeNow}}</td>
					  <td>{{item.position}}</td>
					  <td>{{item.speedH}}</td>
					  <td>{{item.speedAll}}</td>
					  <td>{{item.rpm}}</td>
					  <td>{{item.sea}}</td>
					  <td>{{item.ETA}}</td>
					  <td>{{item.unload}}</td>
					  <td>{{item.water}}</td>
					  <td>{{item.sulfide}}</td>
					  <td :title='item.remark'>{{item.remark | truncate(8)}}</td>
					</tr>
	              </table>
				</div>
			</div>	       
		</div>
	</div>
	<div class="mod2" v-if='onOff'>
		<iframe  v-bind:src="srcFram" width="100%"  height= "100%" name="topFrame"  scrolling="No"  noresize="noresize" frameborder="0" id="my-iframe" ></iframe>  
	</div>
	<div v-else>
		<div class="tra-zwxx">
          <i class="cw-ico tran-zw"></i>
          <span>暂无地图信息</span>
        </div>
	</div>
	<p class="tran-title-top" @click="scrollTop1()"><a><i class="shipping-ico ico-top"></i></a></p>
	</section>
</template>


<script>
	import {queryTrack} from '../../api/ship'
	export default {
		data() {
			return {
				onOff:false,
				iww:0,
				iww2:0,
				datas:{},
				myDate:'',
				oneData:{
					shipPactCode:'',
					pactCode:'',
					agreementCode:'',
					signDate:'',
					shipName:'',
					shipOwner:'',
					carrierName:'',
					laycan:'',
					loadPort:''
				},
				shipRealTime:{
					shipName:'',
					loadPort:'',
					loadPortETA:'',
					loadPortLEAVEDATE:'',
					unloadPort:'',
					unloadPortETA:'',
					acFinish:'',
					unloadPortLEAVEDATE:''
				},
				trackList:[],
				status:1,
				srcFram:'',
				
				isShowLeft:true
			}
		},
		methods: {
			getMore(param){
				this.$router.push({path:'/transmore',query:{name:param}})
			},
			init(){
				var para = {};
				if(this.$own.getHref('uuid')){
					para.uuid=this.$own.getHref('uuid');
				}else{
					para.agreementUuid=this.$own.getHref('agreementUuid');
				}
				
				
				/*$.ajax({
						type: "POST",
			            url: 'http://10.26.3.148/shipPact/queryTrack.json',
			            data: JSON.stringify(para),
			            contentType:'application/json;charset=UTF-8',
			            success:function(data){
			            	alert('chenggogn')
			            	this.status = data.datas.shipPact.detailStatus;	
							this.datas=data.datas;
							this.oneData=data.datas.shipPact;
							this.shipRealTime=data.datas.shipRealTime;
							this.loadPort = data.datas.trackList[0].loadPort;    // 装港
							this.shipStartData = data.datas.trackList[0].VoyageStart;     // 船次开始
							this.transitData = data.datas.trackList[0].transit;     // 在途
							this.trackList=data.datas.trackList;	
			            },
			            error:function(error){
			            	console.log(error)
			            	alert(error)
			            }
					})*/
				
				
				
				//return false;
				//para.uuid='e90ba980d23e44c28ae9267e91e928d1';
				queryTrack(para).then((res)=>{
					this.status = res.datas.shipPact.detailStatus;	
					this.datas=res.datas;
					console.log(res)
					this.oneData=res.datas.shipPact;
					this.shipRealTime=res.datas.shipRealTime;
					this.loadPort = res.datas.trackList[0].loadPort; // 装港
					this.shipStartData = res.datas.trackList[0].VoyageStart;     // 船次开始
					this.transitData = res.datas.trackList[0].transit;     // 在途
					this.trackList=res.datas.trackList;	
					
					var This=this;
					setTimeout(function(){
//						This.handleLi();
						$('.ryLi li').show();
						This.listShip();
						This.xieyiTab();
						This.slideFn();
						This.edaiFn();
					},100);
					
				})
				
				
				
				
				
			},
			handleLi(){  // 查看详情
				$('.ry-tran-more').on('click',function(){
					if($(this).text()=='查看更多'){
						$('.ryLi li').show();
						$(this).text('收起');
					}else{
						$('.ryLi li').hide();
						$(this).text('查看更多');
					}
				});
			},
			listShip(){    //港口切换
				$('body').on('click','.ry-click-i',function(){
					$(this).addClass('ry-tran-ico7').siblings('i').removeClass('ry-tran-ico7');
					$('.ryShowBox').eq($(this).index('.ry-click-i')).show().siblings('.ryShowBox').hide();
				})
			},
			slideFn(){    // 图片切换
				var This=this;
				$('.divBox-div').each(function(i){
					
					var obj=this;
					var index=0;
					var iWidth= This.iww || 0;
					if(i==0){
						iWidth=$(this).find('.ryLi').innerWidth();
						This.iww=iWidth;
					}
					var len = $(this).find('.ry-tr-bao').length;

					
					if(This.iww){
						$(this).find('.ry-tr-bao').css({'width':This.iww +'px','float':'left'});
						$(this).find('.ry-box-ovh').css({'width':This.iww*len+'px','position':'relative'});
					}else{
						$(this).find('.ry-tr-bao').css({'width':iWidth +'px','float':'left'});
						$(this).find('.ry-box-ovh').css({'width':iWidth*len+'px','position':'relative'});
					}
					
					
					$(this).find('.ry-left-click').on('click',function(){
						if(index<4){
							index++;
							$(obj).find('.ry-box-ovh').animate({'left':-iWidth*index},600);
							$(obj).find('.ry-active-tran .begin').eq(index).addClass('doing').siblings('.begin').removeClass('doing');
							$(obj).find('.ry-active-tran .begin').eq(index).children(".begin_statue").addClass('begin_active').parent().siblings('.begin').children(".begin_active").removeClass('begin_active');
							$('.ry-right-click').removeClass('arrow');
							if(index == 4){
								This.isShowLeft = false;
							}
						}
					})
					$(this).find('.ry-right-click').on('click',function(){
						if(index>0){
							index--;
							$(obj).find('.ry-box-ovh').animate({'left':-iWidth*index},600);
							$(obj).find('.ry-active-tran .begin').eq(index).addClass('doing').siblings('.begin').removeClass('doing');
							This.isShowLeft = true;
							$('.ry-right-click').removeClass('arrow')
							if(index == 0){
								This.isShowLeft = true;
								$('.ry-right-click').addClass('arrow')
							}
						}
					})
					//点击圆切换
					$(obj).find('.begin').on('click',function(){
						index=$(this).index('.ry-active-tran:visible .begin');
						console.log(index)
						$(obj).find('.ry-box-ovh').animate({'left':-iWidth*index},600);
						$(obj).find('.ry-active-tran .begin').eq(index).addClass('doing').siblings('.begin').removeClass('doing');
						$(obj).find('.ry-active-tran .begin').eq(index).children(".begin_statue").addClass('begin_active').parent().siblings('.begin').children(".begin_active").removeClass('begin_active');
						if(index < 4 && index !=0){
							This.isShowLeft = true;
							$('.ry-right-click').removeClass('arrow')
						}else if(index == 4){
							This.isShowLeft = false;
							$('.ry-right-click').removeClass('arrow')
						}else if(index == 0){
							$('.ry-right-click').addClass('arrow')
						}
					});
				})
				
			},
			xieyiTab(){   // 协议切换
				var This=this;
				$('body').on('click','.ry-liBox li',function(){
					var index = $('.ry-liBox li').index(this);
					$(this).addClass('xy-dh-hov').siblings('li').removeClass('xy-dh-hov');
					$('.ry-divBox .divBox-div').eq(index).show().siblings('.divBox-div').hide();
				})
			},
			edaiFn(){
				var d = new Date(); 
				var y = d.getFullYear();                                                                                                                                                                                  
				var m = d.getMonth()+1;
				var m2 ='';
				var y2 =y;
				if(!d.getMonth()){
					m2 = 12; 
					y2 = y-1;
				}else{
					m2 = d.getMonth(); 
				}
				
				var dd = d.getDate();                                                                                                                                                                                     
				var hh = d.getHours();                                                                                                                                                                                    
				var ss = d.getSeconds();                                                                                                                                                                                  
				var ed = y+"-"+m+"-"+dd+" "+hh+":"+ss;   
				
				var st = y2+"-"+m2+"-"+dd+" "+hh+":"+ss;  
				
				var hour  = this.oneData.signDate +' 00:00';
				if(this.oneData.mmsi){
					this.onOff=true;
					this.srcFram='http://www.chinaports.com/shiptracker/olv3/shipApi.jsp?mmsi='+this.oneData.mmsi+'&typ=0&vague=1&user=cnpc&maptype=1';
					//this.srcFram='http://www.chinaports.com/shiptracker/olv3/shipApi.jsp?mmsi='+this.oneData.mmsi+'&typ=1&st='+(hour || st) +'&ed='+ed+'&user=cnpc&maptype=2&shipname='+this.oneData.shipName;
				}else{
					this.onOff=false;
				}
			},
			scrollTop1(){
				var x=document.body.scrollTop||document.documentElement.scrollTop; 
				var timer=setInterval(function(){ 
					x=x-100; 
					if(x<100) { 
						x=0; 
						window.scrollTo(x,x); 
						clearInterval(timer); 
					} 
					window.scrollTo(x,x); 
				},30); 
//				scrollTo(0,0);
				
			}
		},
		mounted(){
			
			
			
			
			        

		},
		created(){
			this.init();
		}
	}

</script>
<style scoped>
	.ryLi li.attrActive{ display: block !important;}
	.ryLi .ry-tran-box li{display: none;}
	.ryShowBox{ display: none;}
	.wltra-qh{text-align:center;}
	.ry-ico-tran{
		display:inline-block;
		vertical-align:middle;
		cursor:pointer;
		margin:0 10px;
		background-position:-107px -165px !important;
		width:21px; height:21px; 
	}
	.ry-tran-ico6{background-position:-67px -155px !important; width:21px; height:21px; cursor:pointer; border:2px solid #dddddd;}
	.ry-tran-ico7{background-position:-97px -155px; width:21px; height:21px; cursor:pointer; border:2px solid #ff8653;}
	.ryLi{position:relative; width:80%; overflow: hidden;}
	.tran-xy-dh li.xy-dh-hov a{color:#fddd33;}
	.divBox-div{display:none;}
	.ico-fol1-1{background-position:14px -213px !important;}
	.ico-fol2-2{background-position:-69px -212px !important;}
	.ico-fol3-3{background-position:-150px -212px!important;}
	.ico-fol4-4{background-position:-227px -212px!important;}
	.ico-fol5-5{background-position:14px -213px!important;}
	.mod2{
		height: 600px !important;
	}
	.begin_statue{padding-left: 28px;text-align: center;width: 50px;display: block; margin-top: 10px;color: #fff;display: block;font-weight: bold;}
	.arrow {visibility: hidden !important;}
	
	
	.wltra-qh{
		position: relative;
	}
	.wltra-qh span{
		right: 0 !important;
		line-height: 45px;
	}
	body{
		margin:0 !important;
	}
	.gaiCss th{
	    color: #000000 !important;
	    line-height: 40px;
	    background: none !important;
	    border-left: 1px solid #fff;
	    font-weight: bold;
	}
	/*.ry-box-ovh {width:10000px;}
	.ry-box-ovh .ry-tr-bao{float: left;}*/
	
	
</style>

