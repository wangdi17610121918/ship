<template>
	<section>
		<!--船舶资料-->
		<div class="inner">
			<div class="tide-title"><a href="javascript:;" @click="getActive()">Index</a>&gt;&gt;<a href="/page/" class="cur">SHIPPING</a>&gt;&gt;<a href="javascript:;" class="cur">Vessel Data</a></div>
			<div class="basic-box">
				<ul class="basic-query1 clearfix">
					<li class="basic-query-blo1">
						<p class="clearfix"><span>Vessel Name</span><input v-model="name" type="text" ></p>
						<p class="clearfix"><span>IMO</span><input v-model="imo" type="text" ></p>
						<p class="clearfix">
							<span>Vessel Type</span>
							<select v-model="type" name="请选择类型">
								<option value="" selected="selected">Vessel Type</option>
								<option :value="item" v-for="item in selectData">{{item}}</option>
							</select>
						</p>
					</li>
					<li class="basic-query-blo2"><a href="javascript:;" @click="submitFn">Search</a></li>
				</ul>
				<div class="ship-info clearfix">
					<div class="c-tabdiv1">
						<table>                                                                                                  
							<tr>
								<th>Vessel Name</th>
								<th>IMO</th>
								<th>Built</th>
								<th>Vessel Type</th>
								<th>Vessel Size</th>
								<th>Cubic</th>
								<th>SDWT</th>
								<th>LOA</th>
								<th>Beam</th>
								<th>Draft</th>
								<th>Hull Type</th>
								<!--<th width="60">下载</th>-->
							</tr>
							<tr class="c-tabcos1" v-for="item in tabData">
								<td>{{item.VesselName}}</td>
								<td>{{item.IMO}}</td>
								<td>{{item.Built}}</td>
								<td>{{item.VesselType}}</td>
								<td>{{item.VesselSize}}</td>
								<td>{{item.Cubic}}</td>
								<td>{{item.SDWT}}</td>
								<td>{{item.LOA}}</td>
								<td>{{item.Beam}}</td>
								<td>{{item.Draft}}</td>
								<td>{{item.HullType}}</td>
								<!--<td>
									<a :href="'http://image8.1chemic.com//'+el.path" v-for="el in item.url" download="">下载附件</a>
								</td>-->
							</tr>
						</table>
						<!--分页-->
				       	<div style="text-align: center; margin-top: 30px;" v-if="tabData.length>0">
				       		<el-pagination
				       		:current-page="currentPage1"
						      @current-change="pageFn"
							  layout="prev, pager, next"
							  :total=total>
							</el-pagination>
				       	</div>
					 </div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { shipInfoData,queryValueSet }   from '../../api/ship';
 	export default {
		data() {
			return {
				name:'',
				imo:'',
				type:'',
				tabData:[],
				selectData:[],
				total:0,    //总共条数
				pageNum:1,   // 当前页
				pageSize:10,  // 一页多少条
				currentPage1:1
			}
		},
		methods: {
			getActive(){
				window.location.href=configURL.index;
			},
			init(obj){
				shipInfoData(obj).then((res)=>{
					this.tabData=res.datas;
					this.total=res.total;
				});
			},
			submitFn(){
				var params = {};
				params.imo = this.imo; //IMO
				params.name = this.name; //船名
				params.type = this.type;//船型
				this.init(params);
				this.currentPage1 = 1
			},
			pageFn(sty){    // 分页
				this.currentPage1 = sty
	         	var pageObj = {};
	         	pageObj.pageNum = sty
				pageObj.imo = this.imo; //IMO
				pageObj.name = this.name; //船名
				pageObj.type = this.type;//船型
	         	this.init(pageObj);
	         	
	        }
		},
		created(){
			this.init({});
		},
		mounted(){
			//下拉数据
			var para={'valueSetTypes':9};
			queryValueSet(para).then((res)=>{
				for(var i=0;i<res.datas.length-1;i++){
					this.selectData.push(res.datas[i].value);
				}
			})
		}
	}

</script>
<style>
</style>