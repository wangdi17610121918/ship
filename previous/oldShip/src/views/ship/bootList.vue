<template>
	<section>
		<div class="list-box clearfix">
		  <div class="inner">
			<div class="list-box-n clearfix bootbg">
				<div class="list-search clearfix">
	              <input type="text" class="sea-srk" placeholder="输入船名、船东、船盘发布人" v-model="bootName">
	              <button class="btn-sea" type="button" @click="searchFn">搜索</button>
	            </div>
				<div class="ship-info clearfix">
					<div class="c-tabdiv2">
						<table>                                                                                                           
							<tr class="fixedHeight">
								<th>船名</th>
								<th>船龄</th>
								<th>船型</th>
								<th>船位</th>
								<th>ETA Fujairal</th>
								<th>ETA Cabinda</th>
								<th>船东</th>
								<th>经纪人</th>
								<th>船盘发布人</th>
								<th>操作</th>
							</tr>
							<tr class="c-tabcos1" v-for="(item,index) in datas" :class="index%2==0 ? 'c-tabcos1' :'c-tabcos2'">
								<td	:title="item.name">{{item.name | truncate(13)}}</td>
								<td>{{item.age}}</td>
								<td>{{item.type}}</td>
								<td	:title="item.position">{{item.position | truncate(10)}}</td>
								<td>{{item.eta}}</td>
								<td>{{item.etaCabinda}}</td>
								<td :title='item.shipOwner'>{{item.shipOwner | truncate(20)}}</td>
								<td	:title='item.brokerName'>{{item.brokerName | truncate(20)}}</td>
								<td	:title='item.ext1'>{{item.ext1 | truncate(10)}}</td>
								<td>
									<button class="btn-list" type="button" @click="bootInfo(item.uuid)">查看详情</button>
								</td>
							</tr>
	                    </table>
	                    <div style="text-align: center; margin-top: 30px;"  v-if="datas.length>0">
				       		<el-pagination
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
	import { bootsList }   from '../../api/ship';
	export default{
		data(){
			return{
				total:0,
				pageNum:1,
				pageSize:10,
				datas :[],
				bootName:''
			}
		},
		methods:{
			listData1(){
				bootsList({}).then(res => {
					this.datas = res.datas
					this.total = res.total
				})
			},
			pageFn(sty){
				this.pageNum = sty
				var pageObj={'pageNum':sty,'name':this.bootName}
	         	bootsList(pageObj).then(res => {
					this.datas = res.datas
					this.total = res.total	
				})
//				this.listData1(pageObj)
			},
			searchFn(){
				var nameObj={'name':this.bootName}
				bootsList(nameObj).then(res => {
					this.datas = res.datas
					this.total = res.total
				})
			},
			bootInfo(name){
				window.localStorage.setItem('uuidd',name);
				this.$router.push({"path":"/bootInfo?uuid=" + name})
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