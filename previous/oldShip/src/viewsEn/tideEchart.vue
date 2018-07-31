<template>
	<section>
		<div class="title">
			<p>The query results are for reference only.</p>
		</div>
			<ul class="uls" v-show="data1.length != 0">
				<li class="lis">
					<ul class="ul">
						<li>Time (rs)</li>
						<li v-for="item in dataArr">{{item.hour}}:{{item.minute}}</li>
					</ul>
				</li>
				<li class="lis">
					<ul class="ul">
						<li>Tide (cm)</li>
						<li v-for="item in dataArr">{{item.height}}</li>
					</ul>
				</li>
			</ul>
			<p class="texts" v-show="data1.length != 0">
				{{param.portName}}{{datee}}Tide
			</p>
	    	<div class="echart" v-show="data1.length != 0" style="width: 17rem;height: 14rem;">
	    		<div id="echartsTwo" style="width: 17rem;height: 14rem;"></div>
	    	</div>
		
		<div class="nodata" v-show="data1.length == 0">
			<p>No query data is available.</p>
		</div>
	</section>
</template>

<script>
	import echarts from 'echarts'
	import '../../static/clienWidth.js'
	import { tideData }  from '../api/ship'
	export default{
		data(){
			return{
				eachData : {
					textStyle: {
				        fontSize:10,
//				        color:'rgb(20,53,130)'
				    },
					 grid: [
			            {
			                left: '10%',
			                right: '0%',
			                height: '50%',
			                
			            }
			        ],
				    xAxis: {
//				    	splitArea : {show : true},//保留网格区域
				    	splitLine:{show: true},//去除网格线
				        type: 'category',
				        data: [],
				        axisLabel:{ 
				            textStyle:{
				                fontSize:10, // 让字体变大   
				            }
				        },
				    },
				    yAxis: {
//				    	splitArea : {show : true},//保留网格区域
				    	splitLine:{show: true},//去除网格线
				        type: 'value',
				        name:'Tide(cm)' ,
//				        nameLocation:'left'
						axisLabel:{ 
				            textStyle:{
				                fontSize:10, // 让字体变大   
				            }
				        },
				    },
				    series: [{
				        data: [],
				        type: 'line',
				        smooth: true,
				         itemStyle : {  
			                normal : {  
			                   
			                    lineStyle:{  
			                        color:'#184895'  
			                    }  
			                }  
			           }  
				    }]
				},
//				data1:['04:32', '10:58', '16:57'],
//				data2:[39, 705, 150],
				data1:[],
				data2:[],
				datee:"",
				dataArr:[],
				param:{}
			}
		},
		methods:{
			echartsFn(){
				var that = this;
				var myChart = echarts.init(document.getElementById('echartsTwo'));
				var option12 = $.extend(true, option12, this.eachData);
				var para={
					date:this.param.date,
					portName:this.param.portName
				}
				
				tideData(para).then((res)=>{
					res.datas.forEach(function(o){
						if(o.date == that.datee){
							that.dataArr.push(o)
							that.data1.push(o.hour + ':' + o.minute)
							that.data2.push(o.height)
						}
					})
					option12.xAxis.data = this.data1    //  x 轴
					option12.series[0].data=this.data2    // y 轴
					myChart.setOption(option12);
				});
			},
			urlParse(){  
				
				console.log(encodeURIComponent('天津港'))
				  let url = window.location.href 
				  
				  let obj = {}  
				  let reg = /[?&][^?&]+=[^?&]+/g  
				  let arr = url.match(reg) //找到所有匹配项   
				  if (arr) {  
				    arr.forEach((item) => { //遍历数组  
					    let tempArr = item.substring(1).split('=') //截取字符串并分割  
					    let key = decodeURIComponent(tempArr[0])  
					    let val = decodeURIComponent(tempArr[1])  
					    obj[key] = val  
				    })  
				  }
				  this.param = obj
				  this.datee = obj.date 
				  
				  this.echartsFn()
				  return obj  
			}  
		},
		mounted(){
			this.urlParse()
		}
	}
</script>

<style scoped>
	
	.title{
		width:100%;
	    background: #eee;
	    border-top: 1px solid #CCCCCC;
	    border-bottom: 2px solid #CCCCCC;
	    height:2.2rem;
	}
	.title p{
		margin-left: 5%;
        margin-top: 5%;
        font-size:0.7rem;
	}
	.uls{
    background: #FFF;
    width: 90%;
    margin-bottom: 5%;
    margin-left: 5%;
    }
    .lis{
        padding: 0 5%;
    }
    .ul{
         border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5% 0;
        font-size:0.6rem;
    }
	
	.texts{
	    width: 100%;
	    text-align: center;
	    color: #184895;
	    font-size:0.6rem;
	}
	/*table{
		width: 80%;
		margin-left: 10%;
		font-size: 0.14rem;
		text-align: center;	
	}
	table tr td{
		height: 0.4rem !important;
	}*/
	#echartsTwo{
		height: 4rem;
		text-align: center;	
	}
	.echart{
		width: 80%;
		margin-left: 14%;
		margin-right: 10%;
	}
	.nodata p{
		margin-left: 5%;
        margin-top: 6%;
        font-size:0.6rem;
        text-align: center;
	}
</style>