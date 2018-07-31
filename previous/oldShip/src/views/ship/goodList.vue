<template>
	<section>
		<div class="list-box clearfix">
		  <div class="inner">
			<div class="list-box-n clearfix bootbg">
				<div class="list-search clearfix">
	              <input type="text" class="sea-srk" placeholder="输入装港/装货区域/卸港/卸货区域" v-model="searchWord" @keyup.enter="searchFn">
	              <button class="btn-sea" type="button" @click="searchFn">搜索</button>
	            </div>
				<div class="ship-info clearfix">
					<div class="c-tabdiv2">
						<table>                                                                                                           
							<tr class="fixedHeight">
								<td>数量<br />QUANTITY</td>
								<td>装期<br />LAYCAN</td>
								<td>装港/装货区域<br />LOADING</td>
								<td>卸港/卸货区域<br />DISCHARGING</td>
								<td>发布日期<br />PUBLISH</td>
								<td>状态<br />STATUS</td>
								<td>操作</td>
							</tr>
							<tr class="c-tabcos1" v-for="(item,index) in datas" :class="index%2==0 ? 'c-tabcos1' :'c-tabcos2'">
								<td>{{item.quantity}}</td>
								<td>{{item.laycan}}</td>
								<td>{{item.load}}</td>
								<td>{{item.unload}}</td>
								<td>{{item.createDate}}</td>
								<td>{{item.status}}</td>
								<td>
									<button class="btn-list" type="button" @click="goodInfo(item.uuid)">查看详情</button>
								</td>
							</tr>
	                    </table>
	                    <div style="text-align: center; margin-top: 30px;"  v-if="datas.length>0">
				       		<el-pagination
				       			:current-page.sync='currentPage'
						      @current-change='pageFn'
							  layout="prev, pager, next"
							  :total=total>
							</el-pagination>
				       	</div>
					 </div>
				</div>
			</div>
		  </div>
	    </div>
	</section>
</template>

<script>
	import { goodsList }   from '../../api/ship';
	export default{
		data(){
			return{
				total:0,
				pageNum:1,
				pageSize:10,
				datas :[],
				searchWord:'',
				currentPage:1
			}
		},
		methods:{
			listData1(){
				goodsList({}).then(res => {
					this.datas = res.datas
					this.total = res.total
				})
			},
			pageFn(sty){
				this.pageNum = sty
				var pageObj={'pageNum':sty,'portName':this.searchWord}
	         	goodsList(pageObj).then(res => {
					this.datas = res.datas
					this.total = res.total	
				})
//				this.listData1(pageObj)
			},
			searchFn(){
				this.currentPage =1;
				var nameObj={'portName':this.searchWord}
				goodsList(nameObj).then(res => {
					this.datas = res.datas
					this.total = res.total
				})
			},
			goodInfo(name){
				window.localStorage.setItem('uuidd',name);
				this.$router.push({"path":"/goodInfo?uuid" + name})
			}
		},
		created(){
			this.listData1()
		},
		mounted(){
			
		}
	}
</script>

<style>
	.bootbg{
		background: url('../../assets/images/map.jpg') no-repeat  !important;
		background-size: cover !important;
	}
	.list-search{
		margin-bottom: 0 !important;
		padding: 50px 0 30px !important;
	}
	
	.sea-srk{
		background-color: #fbfbfb !important;
		/*border: 1px solid #ccc!important;*/
		/*border-radius: 5px 5px 5px 5px;*/
	}
	.fixedHeight{
		height: 40px !important;
	}
</style>