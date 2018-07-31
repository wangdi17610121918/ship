<template>
	<section>
		<!--基础运价-->
		<div class="inner">
			<div class="tide-title"><a href="javascript:;" @click="getActive()">首页</a>&gt;&gt;<a href="/page/" class="cur">贸易物流</a>&gt;&gt;<a href="javascript:;" class="cur">基础运价</a></div>
			<div class="comput-box">
				<div class="clearfix">
					<p class="comput-tb"><i class="shipping-ico ico-basic"></i></p>
					<ul class="basic-query1 basic-query clearfix">
						<li class="basic-query-blo4 clearfix">
							<p class="clearfix">
								<span>年份</span>
								<select v-model="year">
									<option v-for="item in yearArr">{{item}}</option>
								</select>
							</p>
						</li>
						<li class="basic-query-blo4 clearfix">
							<p class="clearfix">
								<span>装港1</span>
								<select v-model="loadPort1">
									<option v-for="item in loadPortArr">{{item}}</option>
								</select>
							</p>
							<p class="clearfix">
								<span>装港2</span>
								<select v-model="loadPort2">
									<option v-for="item in loadPortArr">{{item}}</option>
								</select>
							</p>
							<p class="clearfix">
								<span>装港3</span>
								<select v-model="loadPort3">
									<option v-for="item in loadPortArr">{{item}}</option>
								</select>
							</p>
							
						</li>
						<li class="basic-query-blo4 clearfix">
							<p class="clearfix">
								<span>卸港1</span>
								<select v-model="unloadPort1">
									<option v-for="item in unloadPortArr">{{item}}</option>
								</select>
							</p>
							<p class="clearfix">
								<span>卸港2</span>
								<select v-model="unloadPort2">
									<option v-for="item in unloadPortArr">{{item}}</option>
								</select>
							</p>
							<p class="clearfix">
								<span>卸港3</span>
								<select v-model="unloadPort3">
									<option v-for="item in unloadPortArr">{{item}}</option>
								</select>
							</p>
						</li>
					</ul>
					<p class="comput-cx"><a href="javascript:;" @click="submitFn">查询</a></p>
					<p class="comput-cx reset"><a href="javascript:;" @click="submitFnReset">重置</a></p>
				</div>
				<div class="comput-tab comput-tab1">
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<th scope="col">ROUTE（路线）</th>
							<th scope="col">RATE（费率）</th>
							<th scope="col">MILEAGE（里程数）</th>
							<th scope="col">ROUTE ABB（路线选择）</th>
							<th scope="col">NOTICE（注意事项）</th>
						</tr>
						<tr>
							<td>{{moreStr}}</td>
							<td>{{data.price}}</td>
							<td>{{data.mileage}}</td>
							<td>{{data.remark2}}</td>
							<td>{{data.remark}}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { basicData,queryValueSet,costLoad }   from '../../api/ship';
 	export default {
		data() {
			return {
				year:'',        //年份
				loadPort1:'',   //年份
				loadPort2:'',   //年份
				loadPort3:'',   //年份
				unloadPort1:'',    //卸港
				unloadPort2:'',    //卸港
				unloadPort3:'',    
				yearArr:[],
				loadPortArr:[],
				unloadPortArr:[],
				data:{
					price:'',
					mileage:'',
					remark2:'',
					remark:''
				},
				moreStr:''
			}
		},
		methods: {
			getActive(){
				window.open(configURL.index,"_blank");
			},
			init(){
				var para={valueSetTypes:'4;5;15;'};
				queryValueSet(para).then((res)=>{
					for(var i=0; i<res.datas.length;i++){
						if(res.datas[i].type=='15' ){
							this.yearArr.push(res.datas[i].value);
						}
					}
				})
				
				costLoad({}).then(res =>{
					this.loadPortArr = res.datas.loadPortList
					this.unloadPortArr = res.datas.unloadPortList
				})
			},
			submitFn(){
				this.moreStrFn();
				var para={
					year:this.year,   //年份
					loadPort1:this.loadPort1,   //年份
					loadPort2:this.loadPort2,   //年份
					loadPort3:this.loadPort3,   //年份
					unloadPort1:this.unloadPort1,    //卸港
					unloadPort2:this.unloadPort2,    //卸港
					unloadPort3:this.unloadPort3    	
				}
				basicData(para).then((res)=>{
					if(res.datas){
						this.data=res.datas;
						this.data.remark2=this.data.remark2=='' ? '无' : this.data.remark2;
						this.data.remark=this.data.remark=='' ? '无' : this.data.remark;
					}else{
						this.data={
							price:'',
							mileage:'',
							remark2:'',
							remark:''
						}	
						this.moreStr='';
					}
					
				})
			},
			submitFnReset(){
				this.year = '',
				this.loadPort1= '',   //年份
				this.loadPort2= '',   //年份
				this.loadPort3= '',   //年份
				this.unloadPort1= '',    //卸港
				this.unloadPort2= '',    //卸港
				this.unloadPort3= ''
			},
			moreStrFn(){
				this.moreStr='';
				var arr1 = [];
				var arr2 = [];
				if(this.loadPort1!=''){
					arr1.push(this.loadPort1);
				}
				if(this.loadPort2!=''){
					arr1.push(this.loadPort2);
				}
				if(this.loadPort3!=''){
					arr1.push(this.loadPort3);
				}
				if(this.unloadPort1!=''){
					arr2.push(this.unloadPort1);
				}
				if(this.unloadPort2!=''){
					arr2.push(this.unloadPort2);
				}
				if(this.unloadPort3!=''){
					arr2.push(this.unloadPort3);
				}
				
				for(var i=0; i<arr1.length;i++){
					if(arr1.length-1==i){
						this.moreStr += arr1[i] +'-';
					}else{
						this.moreStr += arr1[i] +'/';
					}
				}
				
				for(var i=0; i<arr2.length;i++){
					if(arr2.length-1==i){
						this.moreStr += arr2[i];
					}else{
						this.moreStr += arr2[i] +'/';
					}
				}
				
			}
		},
		created(){
			this.init();
		},
		mounted(){
			
		}
	}

</script>
<style>
	.comput-tab1{text-align: center;}
	.reset{margin-top:20px !important;}
</style>