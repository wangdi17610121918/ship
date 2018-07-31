<template>
	<section>
		<div class="oil-box">
			<div class="oil-wind">
				<!--<h1>风力、海浪级别对照表内容</h1>-->
				<div class="oil-wind_tit"><p></p><span>风力级别</span></div>
				<img src="../assets/telimg/oil_wind1.jpg">
				<table width="100%" border="1" cellspacing="0" cellpadding="0" class="oil-wtable">
					<tr>
						<th scope="col">级别</th>
						<th scope="col" colspan="2">名称</th>
						<th scope="col">风速（m／s）</th>
						<th scope="col">风速（kt）</th>
					</tr>
					<tr>
       					<td >0</td>
       					<td >Calm</td>
       					<td>无风</td>
       					<td >0-0.2</td>
       					<td><1</td>
       				</tr>
       				<tr >
       					<td >1</td>
       					<td >Light</td>
       					<td >软风</td>
       					<td >0.3-1.5</td>
       					<td >1-3</td>
       				</tr>
       				<tr >
       					<td >2</td>
       					<td >Light breeze</td>
       					<td >轻风</td>
       					<td >1.6-3.3</td>
       					<td >4-6</td>
       				</tr>
       				<tr >
       					<td >3</td>
       					<td >Gentl breeze</td>
       					<td >微风</td>
       					<td >3.4-5.4</td>
       					<td>7-10</td>
       				</tr>
       				<tr >
       					<td >4</td>
       					<td >Moderate breeze</td>
       					<td >和风</td>
       					<td >5.4-7.9</td>
       					<td >11-16</td>
       				</tr>
       				<tr >
       					<td >5</td>
       					<td>Fresh breeze</td>
       					<td >清风</td>
       					<td >8.0-11.7</td>
       					<td >17-21</td>
       				</tr>
       				<tr >
       					<td >6</td>
       					<td >Strong breeze</td>
       					<td >强风</td>
       					<td >11.8-13.8</td>
       					<td >22-27</td>
       				</tr>
       				<tr >
       					<td >7</td>
       					<td >Near gale</td>
       					<td >疾风</td>
       					<td >13.9-17.1</td>
       					<td >28-33</td>
       				</tr>
       				<tr >
       					<td >8</td>
       					<td >Gale</td>
       					<td >大风</td>
       					<td >17.2-20.7</td>
       					<td >34-40</td>
       				</tr>
       				<tr >
       					<td >9</td>
       					<td >Strong gale</td>
       					<td >烈风</td>
       					<td >20.8-24.4</td>
       					<td >41-47</td>
       				</tr>
       				<tr >
       					<td >10</td>
       					<td >Storm</td>
       					<td >狂风</td>
       					<td >24.5-28.4</td>
       					<td >48-55</td>
       				</tr>
       				<tr >
       					<td >11</td>
       					<td >Violent storm</td>
       					<td>暴风</td>
       					<td >28.5-32.6</td>
       					<td >56-63</td>
       				</tr>
       				<tr >
       					<td >12</td>
       					<td >Hurricane</td>
       					<td >飓风</td>
       					<td >>32.7</td>
       					<td >>64</td>
       				</tr>
				</table>
			</div>
			<div class="oil-wind">
				<!--<h1>风力、海浪级别对照表内容</h1>-->
				<div class="oil-wind_tit"><p></p><span>海浪级别</span></div>
				<img src="../assets/telimg/oil_wind2.jpg">
				<table width="100%" border="1" cellspacing="0" cellpadding="0" class="oil-wtable">
					<tr>
						<th scope="col">级别</th>
						<th scope="col" colspan="2">名称</th>
						<th scope="col">高度（米）</th>
					</tr>
					<tr>
       					<td>0</td>
       					<td>Calm sea glassy</td>
       					<td>海面如镜</td>
       					<td>0</td>
       				</tr>
       				<tr>
       					<td >1</td>
       					<td >Rippled sea calm</td>
       					<td >微波</td>
       					<td >0.1-0.5</td>
       				</tr>
       				<tr >
       					<td >2</td>
       					<td >Smooth sea</td>
       					<td >小波</td>
       					<td >0.1-0.5</td>
       				</tr>
       				<tr >
       					<td>3</td>
       					<td >Slight sea</td>
       					<td >轻浪</td>
       					<td >1.5-1.25</td>
       				</tr>
       				<tr >
       					<td >4</td>
       					<td >Moderate sea</td>
       					<td >中浪</td>
       					<td >1.25-2.5</td>
       				</tr>
       				<tr>
       					<td>5</td>
       					<td >Rough sea</td>
       					<td >大浪</td>
       					<td >2.5-4.0</td>
       				</tr>
       				<tr >
       					<td >6</td>
       					<td >Very rough sea</td>
       					<td >巨浪</td>
       					<td >4.0-6.0</td>
       				</tr>
       				<tr>
       					<td>7</td>
       					<td >High sea</td>
       					<td>狂浪</td>
       					<td >6.0-9.0</td>
       				</tr>
       				<tr>
       					<td >8</td>
       					<td>Very high sea</td>
       					<td >怒涛</td>
       					<td >9.0-14.0</td>
       				</tr>
       				<tr >
       					<td >9</td>
       					<td >Confused sea</td>
       					<td >凶涛</td>
       					<td >>14.0</td>
       				</tr>
				</table>
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
	table tr th{
		text-align: center !important;
		font-size: 0.5rem;
	}
	table tr td{
		text-align: center !important;
		font-size: 0.5rem;
	}
</style>