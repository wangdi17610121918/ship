<template>
	<section>
		<div class="inner">
		<div class="tide-title"><a href="">Index</a>&gt;&gt;<a href="">SHIPPING</a>&gt;&gt;<a href="" class="cur">Estimated Freight</a></div>
		<div class="comput-box">
			<div class="clearfix">
				<ul class="basic-query1 basic-query wl-operation clearfix shipCost">
					<li class="basic-query-blo4 clearfix">
						<p class="clearfix">
							<span>Date</span>
							
						    <el-date-picker
						      class='times time_en'
						      v-model="value1"
						      type="date"
						      @change="getTime"
						      placeholder="Pick a day"
						      :picker-options="options1"
						      value-format="yyyy-MM-dd">
						    </el-date-picker>
						
						</p>
						<p class="clearfix">
							<span>Vessel Type</span>
							<select v-model="bootType">
								<option value="" selected="selected">Vessel Type</option>
								<option v-for="item in typeArr">{{item}}</option>
							</select>
						</p>
					</li>
					<li class="basic-query-blo4 clearfix">
						<p class="clearfix">
							<span>Loading Port A</span>
							<select v-model="loadPort1">
								<option value="" selected="selected">Loading Port</option>
								<option v-for="item in loadPortArr">{{item}}</option>
							</select>
						</p>
						<p class="clearfix">
							<span>Loading Port B</span>
							<select v-model="loadPort2">
								<option value="" selected="selected">Loading Port</option>
								<option v-for="item in loadPortArr">{{item}}</option>
							</select>
						</p>
						<p class="clearfix">
							<span>Loading Port C</span>
							<select v-model="loadPort3">
								<option value="" selected="selected">Loading Port</option>
								<option v-for="item in loadPortArr">{{item}}</option>
							</select>
						</p>
					</li>
					<li class="basic-query-blo4 clearfix">
						<p class="clearfix">
							<span>Discharging Port A</span>
							<select v-model="unloadPort1">
								<option value="" selected="selected">Discharging Port</option>
								<option v-for="item in unloadPortArr">{{item}}</option>
							</select>
						</p>
						<p class="clearfix">
							<span>Discharging Port B</span>
							<select v-model="unloadPort2">
								<option value="" selected="selected">Discharging Port</option>
								<option v-for="item in unloadPortArr">{{item}}</option>
							</select>
						</p>
						<p class="clearfix">
							<span>Discharging Port C</span>
							<select v-model="unloadPort3">
								<option value="" selected="selected">Discharging Port</option>
								<option v-for="item in unloadPortArr">{{item}}</option>
							</select>
						</p>
					</li>
					<li class="basic-query-blo4 clearfix">
						<p class="operation-cx operationgai"><a href="javascript:;" @click="searchFn()">Calculate</a></p>
					</li>
				</ul>
			</div>
			<div class="oper-cont clearfix ship_tip">
				<div v-if="priceInfo.singleFare != null">
					<div class="oper-contl" ><span>Estimated Freight/BBL：{{priceInfo.singleFare}} USD/BBL</span></div>
					<!--<div class="oper-contr">
						<h1>参考点数  WS点 {{priceInfo.region}}（{{value2}}）：{{priceInfo.ws}}</h1>
						<h1>{{priceInfo.region}}计费吨为{{priceInfo.regionNum}}万吨</h1>
						<p>示例：2018年1月15日WS点为47，参考地区西非-中东，参考航线KIZOMABA TEEMINAL 至NINGBO，此航线2018参考运价为24.58，以26万吨为西非标准计费吨，单桶运费=（WS/100*基础运价*260,000)/2,000,000桶=1.501美金/桶。<br>以上结果仅供参考</p>
					</div>-->
				</div>
				<span class="shipTip" v-show="num ==1">No relevant information was found.</span>
			</div>
			
		</div>
	</div>
	</section>
</template>

<script>
	import { shippingCost,queryValueSet,CostSearch,CostDates,costLoad }   from '../../api/ship';
	export default{
		data(){
			return{
				options1:{},
				bootType:'',
				loadPortArr:[],
				unloadPortArr:[],
				typeArr:[],
				loadPort1:'',   
				loadPort2:'',   
				loadPort3:'',   
				unloadPort1:'',    
				unloadPort2:'',    
				unloadPort3:'',
				value1:'',
				priceInfo:{},
				datesArr:[],
				value2:'',
				num:0
			}
		},
		methods:{
			init(){
				var para={valueSetTypes:'4;5;9;'};
				queryValueSet(para).then((res)=>{
					
					for(var i=0; i<res.datas.length;i++){
						if(res.datas[i].type=='9' && res.datas[i].value!="其它"){
							this.typeArr.push(res.datas[i].value);
						}
					}
				})
				
				costLoad({}).then(res =>{
					this.loadPortArr = res.datas.loadPortList
					this.unloadPortArr = res.datas.unloadPortList
				})
				
				CostDates({}).then(res =>{
					var datesArr = [];
					res.datas.forEach(o => {
						datesArr.push(o.slice(0,4) + '/' + o.slice(5,7) + '/' + o.slice(8))
					})
					this.datesArr=datesArr
				})
			},
			searchFn(){
				if(this.bootType ==''&&this.loadPort1==''&&this.loadPort2==''&&this.loadPort3==''&&this.unloadPort1==''&&this.unloadPort2==''&&this.unloadPort3==''&&this.value1==''){
					this.$message({
			          message: 'Please enter the query condition',
			          type: 'warning'
			        });
					 return false;
				}
				this.value2 = this.value1;
				var para={
					shipType:this.bootType,   
					loadPort1:this.loadPort1,   
					loadPort2:this.loadPort2,  
					loadPort3:this.loadPort3,   
					unloadPort1:this.unloadPort1,    //卸港
					unloadPort2:this.unloadPort2,    //卸港
					unloadPort3:this.unloadPort3,
					referenceDate:this.value1
				}
				CostSearch(para).then(res => {
					this.priceInfo = res.datas
					if(res.datas.singleFare == null){
						this.num =1
					}else{
						this.num = 0
					}
				})
			},
			getTime(str){
				
				this.value1 = str
//		   		Date.prototype.format = function(fmt) { 
//				     var o = { 
//				        "M+" : this.getMonth()+1,                 //月份 
//				        "d+" : this.getDate(),                    //日 
//				        "h+" : this.getHours(),                   //小时 
//				        "m+" : this.getMinutes(),                 //分 
//				        "s+" : this.getSeconds(),                 //秒 
//				        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
//				        "S"  : this.getMilliseconds()             //毫秒 
//				    }; 
//				    if(/(y+)/.test(fmt)) {
//				            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
//				    }
//				     for(var k in o) {
//				        if(new RegExp("("+ k +")").test(fmt)){
//				             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
//				         }
//				     }
//				    return fmt; 
//				}
//		   		 this.value1=new Date(str).format("yyyy-MM-dd")
//				return new Date(str).format("yyyy-MM-dd");
			}
		},
		mounted(){
			this.init()
			 
	          this.options1.disabledDate = time =>{
	          	let b = this.datesArr.filter(v=>{
	          		return time.getTime() == new Date(v).getTime();
	          	})
	            return !b.length
	          }
		},
		created(){
			
		}
	}
</script>

<style>
	.times .el-input__inner{
		height: 32px !important;
		border-radius:0 4px 4px 0 !important;
		background-color: #fbfbfb !important;
	}
	.times{
		height: 32px !important;
		
	}
	.time_en{
		width: 40% !important;
	}
	.costActive{
		display: none;	
	}
	.el-input__icon{
		line-height: 32px !important;
	}
	.shipTip{
		display: block;
		height: 300px;
		color: #C0C0C0;
		font-size: 20px;
		text-align: center;
	}
	.ship_tip{
		height: 300px;
	}
	.shipCost li p{width:33% !important;}
	.operationgai a{width: 85% !important;}
</style>