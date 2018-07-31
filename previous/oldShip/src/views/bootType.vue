<template>
	<section>
		<div class="oil-box">
			<div class="oil-wind">
				<!--<h1>船型</h1>-->
				<!--<div class="oil-wind_tit"><p></p><span>风力级别</span></div>-->
				<img src="../assets/telimg/zhiqi.jpg">
				<span>
               		<p>特大型油轮（ULCC）       总载重量32万吨以上</p>
					<p>超大型油轮（VLCC）       总载重量20-32万吨之间</p>
					<p>苏伊士型油轮（Suezmax）  总载重量12-20万吨之间</p>
					<p>阿芙拉型油轮（Aframax）   总载重量8-12万吨之间</p>
					<p>巴拿马型油轮（Panamax）   总载重量6-8万吨之间</p>
					<p>轻便型油轮（MR Size）      总载重量1-6万吨之间</p>
               </span>
	             
			</div>	
		</div>
	</section>
</template>

<script>
	import clienWidth from '../../static/clienWidth.js'
	import '../assets/css/oil.css'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			
		},
		mounted(){
			
		}
	}
</script>

<style scoped>
	.oil-box{
		font-size: 0.6rem;
	}
	span{
		font-size: 0.6rem;
		display: block;
		margin-top: 0.5rem;
		text-align: left;
		color: #444444;
		text-indent: 0.8rem;
	}
</style>