<template>
	<section>
		<div class="wl_yybg"></div>
		<div class="inner">
		      <h1 class="wl_yybk">油运百科</h1>
		      <div class="wl_yybkx"><span><em></em></span></div>
		      <ul class="wl_yybk_nr clearfix">
		        <li><a href="javascript:;" @click='getActive("游轮")'><img src="../../assets/images/wl_bg7.jpg" alt=""/><em>油轮船型</em></a></li>
		        <li><a href="javascript:;" @click="getActive('风力')"><img src="../../assets/images/wl_bg8.jpg" alt=""/><em>风力、海浪级别对照表</em></a></li>
		        <li><a href="javascript:;" @click="getActive('战争')"><img src="../../assets/images/wl_bg9.jpg" alt=""/><em>战争险区域</em></a></li>
		        <li><a href="javascript:;" @click="getActive('滞期费')"><img src="../../assets/images/wl_bg10.jpg" alt=""/><em>滞期费</em></a></li>
		        <li><a href="javascript:;" @click="getActive('基本费率')"><img src="../../assets/images/wl_bg11.jpg" alt=""/><em>基本费率</em></a></li>
		        <li><a href="javascript:;" @click="getActive('点数')"><img src="../../assets/images/wl_bg12.jpg" alt=""/><em>WS点数</em></a></li>
		        <li><a href="javascript:;" @click="getActive('航线')"><img src="../../assets/images/wl_bg13.jpg" alt=""/><em>主要运输航线</em></a></li>
		        <li><a href="javascript:;" @click="getActive('分布')"><img src="../../assets/images/wl_bg14.jpg" alt=""/><em>世界石油分布</em></a></li>
		      </ul>
		      <div class="wl_yybk_mor" @click="getBKMore()"><a href="javascript:;">更多</a></div>
    	</div>
	</section>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			getActive(str){
				this.$router.push({'path':'/olibkMore',query:{name :str}})
			},
			getBKMore(){
				this.$router.push({'path':'/olibkMore'})
			}
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>

<style>
</style>