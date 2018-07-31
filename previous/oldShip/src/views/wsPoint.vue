<template>
	<section>
		<div class="oil-box">
			<div class="oil-wind">
				<!--<h1>WS点数</h1>-->
				<!--<div class="oil-wind_tit"><p></p><span>风力级别</span></div>-->
				<img src="../assets/telimg/wsPoint .jpg">
				<span>
               		<p style="text-indent: 1.2rem;">WORLDSCALE，全称国际油轮名义运费(New Worldwide Tanker Nominal Freight Scale)，简称WS。在国际油运市场，对油轮运费水平的制定及计算已形成的通行的准则。在租船合同中明确要求船东、租家遵从WORLD SCALE有关运费的具体规定。</p>
					<p>总运费=基本费率×计费吨×WS点数</p>
					<p>对于总运费以外其他费用的承担原则做出规定：</p>
					<p>-- 规定港口货物税、运费税、直升飞机费等由租家承担。</p>
					<p> -- 规定针对船舶征收的费用由船东承担。</p>
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
	span{
		font-size: 0.6rem;
		display: block;
		margin-top: 0.5rem;
		text-align: left;
		color: #444444;
		text-indent: 1.2rem;
	}
	p{
		padding: 0.4rem 0;
	}
</style>