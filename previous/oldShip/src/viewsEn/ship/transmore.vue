<template>
	<div class="inner">
		<div class="tide-title"><a href="">Index</a>&gt;<a href="" class="cur">Captain Noon Report</a></div>
		<div class="dwhs-box clearfix">
			<div class="common-tooln-top tide-search-top">
				<span class="tide-search-title">Captain Noon Report</span>
				<ul class="common-tooln-line tide-search-line clearfix">
					<li></li><li class="tooln-line"></li>
				</ul>
			</div>
			<div class="full-box">
				<table class="tra-table">
					<tr>
					  <th>Date</th>
					  <th>Time</th>
					  <th>Position</th>
					  <th>AVG SPD (24h)</th>
					  <th>G.AVE SPD</th>
					  <th>RPM</th>
					  <th>Wind/Sea</th>
					  <th>ETA</th>
					  <th>Destination</th>
					  <th>Free Water</th>
					  <th>Remark </th>
					</tr>
					<tr v-for="item in datas">
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
					  <td :title="item.remark">{{item.remark | truncate(8)}}</td>
					</tr>
				  </table>
			</div>
			<div class="c-page">
	            <el-pagination
	            	
	       		  @current-change="pageFn"
				  layout="prev, pager, next"
				  :total=total>
				</el-pagination>
	        </div>
		</div>
	</div>
</template>

<script>
	import {transMore} from '../../api/ship'
	export default{
		data(){
			return{
				datas:[],
				total:0,
				pageNum:1,
				pageSize:10
			}
		},
		methods:{
			pageFn(sty){
				this.pageNum = sty
				var param = { 
					"shipPactUuid":this.$route.query.name,
					"pageNum":this.pageNum,
				};
				transMore(param).then(res => {
					this.datas = res.datas
					this.total = res.total
				})
			},
			initData(){
				var param = { "shipPactUuid":this.$route.query.name};
				transMore(param).then(res => {
					console.log(res)
					this.datas = res.datas
					this.total = res.total
				})
			}
		},
		mounted(){
			this.initData()
		},
		created(){
			
		}
	}
</script>

<style>
</style>