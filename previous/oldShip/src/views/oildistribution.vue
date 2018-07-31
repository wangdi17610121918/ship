<template>
	<section>
		<div class="oil-box">
			<!--<h1>世界石油</h1>-->
			<div class="oil-banner"><img src="../assets/telimg/oil_banner.jpg" /></div>
			<div class="oil-text">
				<p>世界石油资源集中在中东、中南美洲、北美洲等地，且近十年除中南美洲探明储量有较大增长外，其他地区变化不大。截至2016年底，全球探明储量为1.7万亿桶，中东储量占据近半壁江山（47.7%）。中东以下探明储量排序为：中南美洲（19.2%）、北美洲（13.3%）、欧洲及欧亚大陆（9.5%）、非洲（7.5%）、亚太地区（2.8%）。</p> 
				<p>世界石油探明储量最多的15个国家占全球储量92.9%，依次为：委内瑞拉（17.63%）、沙特（15.61%）、加拿大（10.05%）、伊朗（9.28%）、伊拉克（8.96%）、俄罗斯（6.41%）、科威特（5.95%）、阿联酋（5.73%）、利比亚（2.83%）、美国（2.81%）、尼日利亚（2.17%）、哈萨克斯坦（1.76%）、中国（1.5%）、卡塔尔（1.48%）、巴西（0.74%）。</p>
			</div>
			<div class="oil-text">
				<h1>石油探明储量及占比情况</h1>
				<table width="100%" border="1" cellspacing="0" cellpadding="0" class="oil-table">
					<tr>
						<th scope="col">序号</th>
						<th scope="col">国家</th>
						<th scope="col">探明储量（桶）</th>
						<th scope="col">比例</th>
					</tr>
					<tr>
       					<td>1</td>
       					<td>委内瑞拉</td>
       					<td>300.9</td>
       					<td>17.63%</td>
       				</tr>
       				<tr>
       					<td>2</td>
       					<td>沙特</td>
       					<td>266.5</td>
       					<td>15.61%</td>
       				</tr>
       				<tr>
       					<td >3</td>
       					<td >加拿大</td>
       					<td >171.5</td>
       					<td >10.05%</td>
       				</tr>
       				<tr>
       					<td>4</td>
       					<td>伊朗</td>
       					<td >158.4</td>
       					<td >9.28%</td>
       				</tr>
       				<tr>
       					<td >5</td>
       					<td >伊拉克</td>
       					<td >153</td>
       					<td >8.96%</td>
       				</tr>
       				<tr>
       					<td >6</td>
       					<td >俄罗斯</td>
       					<td >109.5</td>
       					<td >6.41%</td>
       				</tr>
       				<tr>
       					<td>7</td>
       					<td >科威特</td>
       					<td >101.5</td>
       					<td >5.95%</td>
       				</tr>
       				<tr>
       					<td >8</td>
       					<td >阿联酋</td>
       					<td >97.8</td>
       					<td >5.73%</td>
       				</tr>
       				<tr>
       					<td >9</td>
       					<td >利比亚</td>
       					<td >48.4</td>
       					<td >2.83%</td>
       				</tr>
       				<tr>
       					<td >10</td>
       					<td >美国</td>
       					<td >48</td>
       					<td >2.81%</td>
       				</tr>
       				<tr>
       					<td>11</td>
       					<td >尼日利亚</td>
       					<td >37.1</td>
       					<td >2.17%</td>
       				</tr>
       				<tr>
       					<td >12</td>
       					<td >哈萨克斯坦</td>
       					<td>30</td>
       					<td >1.76%</td>
       				</tr>
       				<tr>
       					<td >13</td>
       					<td >中国</td>
       					<td >25.7</td>
       					<td >1.50%</td>
       				</tr>
       				<tr>
       					<td >14</td>
       					<td >卡塔尔</td>
       					<td >25.2</td>
       					<td >1.48%</td>
       				</tr>
       				<tr>
       					<td >15</td>
       					<td >巴西</td>
       					<td >12.6</td>
       					<td >0.74%</td>
       				</tr>
       				<tr>
       					<td colspan="2">合计</td>
       					<td >1586.1</td>
       					<td >92.9%</td>
       					
       				</tr>
				</table>
				<div class="oil-ratio-graph"><img src="../assets/telimg/oil_graph.jpg" /></div>
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
	table tr td{
		text-align: center !important;
	}
	table tr th{
		text-align: center !important;
	}
</style>