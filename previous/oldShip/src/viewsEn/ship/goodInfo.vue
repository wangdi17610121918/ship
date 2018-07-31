<template>
	<section>
		<div class="wlcp-banner"></div> 
		<div class="inner">
	       <div class="tran-title">Chartering Demand Details</div>
	       <ul class="tran-line tra-cp"><li></li><li class="tran-line1"></li></ul>
	        <div class="ship-info clearfix">
	            <div class="c-tabdiv1 c-cpxx">
	                <table>                                                                                                  
	                    <tr>
	                    	<th>QUANTITY：<em>{{infos.quantity}}</em></th>
	                    	<th>LOADING：<em>{{infos.load}}</em></th>
	                    	<th>DISCHARGING：<em>{{infos.unload}}</em></th>
	                    </tr>
	                    <tr class="c-tabcos1">
	                    	<td>LAYCAN：<em>{{infos.laycan}}</em></td>
	                    	<td>STATUS：<em>{{infos.status}}</em></td>
	                    	<td><em></em></td>
	                    </tr>
	                </table>
	              </div>
	        </div>
	        <ul class="wl-cp-com clearfix">
	          <li>
	            <div class="wl-cpcl"><i class="shipping-ico ico-cpcf"></i></div>
	            <div class="wl-cpcr">Poster<span>{{infos.epMemberName}}</span></div>
	          </li>
	          <li>
	            <div class="wl-cpcl"><i class="shipping-ico ico-cpcs"></i></div>
	            <div class="wl-cpcr">Post Time<span>{{infos.createDate}}</span></div>
	          </li>
	        </ul>
		</div>
	</section>
</template>

<script>
	import { goodsInfo } from '../../api/ship';
	export default{
		data(){
			return{
				infos:{},
				str:''
			}
		},
		methods:{
			infosFn:function(){
//				var str = this.$route.query.id;
				var para = {"uuid":this.str};
				goodsInfo(para).then(res => {
					this.infos = res.datas	
				})
			},
			content(){
				if(this.$own.getHref('uuid')){	
					this.str=decodeURIComponent(this.$own.getHref('uuid'));
				}else{
					this.str=window.localStorage.getItem('uuidd');
				}
			}
		},
		mounted(){
			this.infosFn()
		},
		created(){
			this.content();
		}
	}
</script>

<style scoped>
	.tran-title{
		color: #222 !important;
	}
	.c-cpxx td { width: calc(100% /3) !important;}
</style>