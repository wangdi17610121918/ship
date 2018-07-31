<template>
	<section>
		<!--港口码头-->
		<div class="inner">
			<div class="tide-title"><a href="javascript:;" @click="getActive()">首页</a>&gt;&gt;<a href="/page/" class="cur">贸易物流</a>&gt;&gt;<a href="javascript:;" class="cur">潮汐查询</a></div>
			<div class="tide-search">
				<ul class="tide-search-list clearfix">
					<li>查询港口</li>
					<li>
						<el-select v-model="region" placeholder="地区" size="mini"  @change="change(region,'countryArr')">
							<el-option
						      v-for="item in regionArr"
						      :key="item.value"
						      :label="item.value"
						      :value="item.subGroup">
						    </el-option>
						</el-select>
					</li>
					<li>
						<el-select v-model="country" placeholder="国家" size="mini"  @change="change(country,'provinceArr')">
							<el-option
						      v-for="item in countryArr"
						      :key="item.value"
						      :label="item.value"
						      :value="item.subGroup">
						    </el-option>
						</el-select>
					</li>
					<li>
						<el-select v-model="province" placeholder="省" size="mini"   @change="change(province,'portArr')">
							<el-option
						       v-for="item in provinceArr"
						       :key="item.value"
						      :label="item.value"
						      :value="item.subGroup">
						    </el-option>
						</el-select>
					</li>
					<li class="ry-elemetLi">
						<el-select v-model="port" placeholder="港口" size="mini" @change="teChange" >
							<el-option
						      v-for="item in portArr"
						      :key="item.value"
						      :label="item.value"
						      :value="item.value"
						      >
						       <span style="display:block;">{{ item.value }}</span>  <!-- @click="portStrHald(item.value)"-->
						    </el-option>
						</el-select>
					</li>
					<li class="date">
						<span class="demonstration">日期</span>
						<el-date-picker
							class="timeP"
					      v-model="time"
					      type="date"
					      size="mini"
					      value-format="yyyy-MM-dd"
					      placeholder="选择日期">
					    </el-date-picker>
					</li>
					<li><a href="javascript:;" @click="seachFn">查询</a></li>
				</ul>
				<ul class="tide-search-hot clearfix">
					<li>热门港口</li>
					<li><a href="javascript:;" @click="portFn($event,'梯吴港')" class="ry-tide-active">梯吴港</a></li>
					<li><a href="javascript:;" @click="portFn($event,'大连港')">大连港</a></li>
					<li><a href="javascript:;" @click="portFn($event,'青岛港')">青岛港</a></li>
					<li class="fixed_width"><a href="javascript:;" @click="portFn($event,'日照港（岚山港区）')">日照港（岚山港区）</a></li>
					<li><a href="javascript:;" @click="portFn($event,'唐山港')">唐山港</a></li>
					<li><a href="javascript:;" @click="portFn($event,'镇海港')">镇海港</a></li>
					<li><a href="javascript:;" @click="portFn($event,'宁波港')">宁波港</a></li>
				</ul>
			</div>
			<div>
				<div class="common-tooln-top tide-search-top">
					<span class="tide-search-title">{{port}}</span>
					<ul class="common-tooln-line tide-search-line clearfix">
						<li></li><li class="tooln-line"></li>
					</ul>
				</div>
				<div class="tide-table-box">
					<div class="tide-table-title"><i class="shipping-ico ico-tide-table"></i>潮汐表</div>
					<div class="tide-table-cont" id="ryZyTable">
						<p class="tide-rli">{{strData}}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import {queryValueSet,tideData}  from '../../api/ship';
	export default {
		data() {
			return {
				strData:1,
				regionArr:[],   // 区
				region:'',
				countryArr:[],   //国
				country:'',
				provinceArr:[],   // 省
				province:'',
				portArr:[],   // 港口
				port:'梯吴港',
				time:'',
				timeListData:{},
				timeArrNum:{},
				addHtml:true,
								
			}
		},
		methods: {
			getActive(){
				window.location.href=configURL.index;
			},
			portFn(obj,str){
				$('.tide-search-hot a.ry-tide-active').removeClass('ry-tide-active');
				$(obj.target).addClass('ry-tide-active');
				this.port=str;
				this.seachFn();
				//清除 上面的搜索条件
				this.region='';
				this.country='';
				this.province='';
			},
			teChange(str){
				this.port=str;
				$('.tide-search-hot a.ry-tide-active').removeClass('ry-tide-active');
			},
			getPort(){
				var para = {
					'valueSetType':'17'
				};
				queryValueSet(para).then((res)=>{
					for(var i=0; i<res.datas.length;i++){
						this.portArr.push(res.datas[i]);
					}
				})
			},
			start(){
				var para = {
					'valueSetType':'12'
				};
				queryValueSet(para).then((res)=>{
					for(var i=0; i<res.datas.length;i++){
						this.regionArr.push(res.datas[i]);
					}
				})
			},
			seachFn(){ // 查询
				if(this.time == null){
					$('.tbody').find('.curr').removeClass('curr');
				}
				
				var para={
					date:this.time,
					portName:this.port
				};
				tideData(para).then((data)=>{
//					console.log(data)
					if(!data.datas){
						this.timeData(this.time);
						return false;
					}
					
					this.timeListData={};
					for(var i=0; i<data.datas.length;i++){
						if(this.timeListData[data.datas[i].date]){
							this.timeListData[data.datas[i].date].push(data.datas[i]);
						}else{
							this.timeListData[data.datas[i].date]=[];
							this.timeListData[data.datas[i].date].push(data.datas[i]);
						}
					}
					this.timeArrNum={};
					for(var key in  this.timeListData){
						var arr = key.split('-');
						var numStr=parseInt(arr[2]);
//						console.log(this.timeListData[key])
						this.timeArrNum[numStr]=this.timeListData[key];
					}
					this.timeData(this.time);
				});
				
			},
			change(str,str2){   //区变化
				var para = {
					'valueSetType':100,
					'subGroup':str
				};
				queryValueSet(para).then((res)=>{
					this[str2]=[];
					for(var i=0; i<res.datas.length;i++){
						this[str2].push(res.datas[i]);
					}
				})
			},
			portStrHald(str){
//				alert(str)
				//清空底部的热门港口
				//alert($('.tide-search-hot a.ry-tide-active').length)
				$('.tide-search-hot a.ry-tide-active').removeClass('ry-tide-active');
			},
			getTime(str){
		   		Date.prototype.format = function(fmt) { 
				     var o = { 
				        "M+" : this.getMonth()+1,                 //月份 
				        "d+" : this.getDate(),                    //日 
				        "h+" : this.getHours(),                   //小时 
				        "m+" : this.getMinutes(),                 //分 
				        "s+" : this.getSeconds(),                 //秒 
				        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
				        "S"  : this.getMilliseconds()             //毫秒 
				    }; 
				    if(/(y+)/.test(fmt)) {
				            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
				    }
				     for(var k in o) {
				        if(new RegExp("("+ k +")").test(fmt)){
				             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				         }
				     }
				    return fmt; 
				}
		   		this.time=new Date(str).format("yyyy-MM-dd")
				return new Date(str).format("yyyy-MM-dd");
			},
			leapYeay(year){
				if(year%4==0 && year%100!=0)
				{
					return true;
				}
				else{
					if(year%400==0)
					{
						return true;
					}
					return false;
				}
			},
			createTd(){
				var arr=['日SUN-','一MON','二TUE','三WED','四THU','五FRI','六SAT'];
				
				var oTab=document.createElement('table');
				var oThead=document.createElement('thead');
				
				for(var i=0;i<7;i++){
					var th=document.createElement('th');
					th.innerHTML=arr[i];

					oThead.appendChild(th);
				}
				
				var oTbody=document.createElement('tbody');
				oTbody.className="tbody";
				for(var i=0;i<6;i++){
					var oTr=document.createElement('tr');
					for(var j=0; j<7; j++)
					{
						var oTd=document.createElement('td');
						oTr.appendChild(oTd);
					}
					oTbody.appendChild(oTr);
				}
				
				oTab.appendChild(oThead);
				oTab.appendChild(oTbody);
				
				
				$('#ryZyTable').append(oTab);
				
			},
			timeData(str){
				var This=this;
				var oDate=new Date(str);
				var yearStr=oDate.getFullYear(); // 年
				var monthStr=oDate.getMonth()+1; // 月
				var dateStr=oDate.getDate(); // 日
				var dayNum=0;
				
				
					this.strData=dateStr;
				
				
				if(this.addHtml){
					this.addHtml=false;
					this.createTd();
				}
				

				//算出dayNum 
				if( monthStr==1 || monthStr==3 || monthStr==5 || monthStr==7 || monthStr==8 || monthStr==10 || monthStr==12 )
				{
					dayNum=31;
				}
				else if( monthStr==4 || monthStr==6 || monthStr==9 || monthStr==11)
				{
					dayNum=30;
				}
				else if( monthStr==2 && this.leapYeay(yearStr))
				{
					dayNum=29;
				}
				else{
					dayNum=28;
				}
				
				
				oDate.setFullYear(yearStr);
				oDate.setMonth(monthStr-1);
				oDate.setDate(1);

				
				$('.tbody td').html('');

				// 模板定义
				var htmlStr=`<div class="data-box">
						<p></p>
						<div class="clearfix data-blo">
							<ul class="data-blol">
								<li>时间</li>
							</ul>
							<ul class="data-blor">
								<li>潮高(cm)</li>
							</ul>
						</div>
					</div>`
				
				
				
				// 数据补足
				for(var i=1; i<=dayNum;i++){
					if(!this.timeArrNum[i]){
						this.timeArrNum[i]=[];
					}
				}

				//填充数据
				function addData(num){
					for(var i=0; i<dayNum; i++){
						
						$('.tbody').find('td:eq('+(i+num)+')').append(htmlStr).find('p').html(i+1);
						
						if(This.time != null){
							if((i+1)==dateStr){
								$('.tbody').find('td:eq('+(i+num)+')').find('.data-box').addClass('curr');		
							}
						}
						
						
						var lsArr=This.timeArrNum[i+1];
						
						for(var j=0; j<lsArr.length;j++){
							
							var $li = $('<li>'+lsArr[j].hour+':'+lsArr[j].minute+'</li>');
							
							$('.tbody').find('td:eq('+(i+num)+')').find('.data-blol').append($li);
						
							var $li1 = $('<li>'+lsArr[j].height+'</li>');
							$('.tbody').find('td:eq('+(i+num)+')').find('.data-blor').append($li1);
						}
					}
				}

				if(oDate.getDay()==0){
					addData(0)
					
				}else if(oDate.getDay()==1){
					addData(1)
				}else if(oDate.getDay()==2){
					addData(2)
				}else if(oDate.getDay()==3){
					addData(3)
				}else if(oDate.getDay()==4){
					addData(4)
				}else if(oDate.getDay()==5){
					addData(5)
				}else if(oDate.getDay()==6){
					addData(6)
				}
			}
		},
		mounted(){
			var dataStr=new Date();
			var strYear = dataStr.getFullYear();
			var strMonth = dataStr.getMonth()+1;
			var strDate = dataStr.getDate();
			var strTT=strYear+'-'+strMonth+'-'+strDate;
			this.timeData(strTT);
			
			var date = new Date()
			var yy = date.getFullYear()
			var mm = date.getMonth()+1
			var dd = date.getDate()
			this.time = yy + '-' +  mm +'-' + dd;
			
			this.getPort();
			this.start();
			this.seachFn();
		},
		created(){
			
		}
	}

</script>
<style>
	.tide-search-list li.date .timeP{ width:78%; padding-left:2%;height:24px; line-height:24px; position:relative; text-align:center;}
	.data-box{min-height:135px;}
	.tide-search-hot a.ry-tide-active{ background-color: #fff; color: #94c1ff;padding:5px; border-radius:3px;}
	.tide-search-hot li:nth-child(5){width: 12% !important; text-align: center;}
	.tide-search-hot li:nth-child(6){margin-left: 20px;}
	.tide-search-line li{width: 41% !important;}
	.el-date-table__row .current{border: none !important;}
	.timeP .el-input__suffix i.el-input__icon{display: block !important;}
	
</style>