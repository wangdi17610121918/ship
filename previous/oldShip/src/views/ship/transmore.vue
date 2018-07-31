<template>
	<div class="inner">
		<div class="tide-title"><a href="">首页</a>&gt;<a href="" class="cur">全程概览</a></div>
		<div class="dwhs-box clearfix">
			<div class="common-tooln-top tide-search-top">
				<span class="tide-search-title">全程概览</span>
				<ul class="common-tooln-line tide-search-line clearfix">
					<li></li><li class="tooln-line"></li>
				</ul>
			</div>
			<div class="full-box">
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
					  <th>明水</th>
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