<template>
	<section>
		<div id="echartsTwo" style="width: 249px;height:250px; margin-left: 100px;"></div>
	</section>
</template>

<script>
	import echarts from 'echarts'
	
	export default{
		data(){
			return{
				eachData : {
					 grid: [
			            {
			                left: '15%',
			                right: '8%',
			                height: '50%'
			            }
			        ],
				    xAxis: {
//				    	splitArea : {show : true},//保留网格区域
				    	splitLine:{show: true},//去除网格线
				        type: 'category',
				        data: []
				    },
				    yAxis: {
//				    	splitArea : {show : true},//保留网格区域
				    	splitLine:{show: true},//去除网格线
				        type: 'value',
				         name:'潮高(cm)' ,
//				        nameLocation:'left'
				    },
				    series: [{
				        data: [],
				        type: 'line',
				        smooth: true
				    }]
				},
				data1:['04:32', '10:58', '16:57'],
				data2:[39, 705, 150]
			}
		},
		methods:{
			echartsFn(){
				var myChart = echarts.init(document.getElementById('echartsTwo'));
				var option12 = $.extend(true, option12, this.eachData);
//				var para={
//					date:'2018-01-01',
//					portName:'梯吴港'
//				}
				option12.xAxis.data = this.data1    //  x 轴
				option12.series[0].data=this.data2    // y 轴
				myChart.setOption(option12);
			}
		},
		created(){
			
		},
		mounted(){
			this.echartsFn()
			
		}
	}
</script>

<style>
</style>