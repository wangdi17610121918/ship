<template>
	<section>
		<iframe v-bind:src="srcFram"  width="100%" height='100vh' marginwidth="0" marginheight='0'></iframe>
	</section>
</template>

<script>
	import px2rem from '../../static/px2rem.js'
	export default{
		data(){
			return{
				param:'',
				srcFram:''
			}
		},
		methods:{
			urlParse(){  
				
//				console.log(encodeURIComponent('梯吴港'))
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
				  this.param = obj.mmsi
				  this.srcFram = 'http://www.chinaports.com/shiptracker/olv3/shipApi.jsp?mmsi='+obj.mmsi+'&typ=0&vague=1&user=cnpc&maptype=1';
				  console.log(this.srcFram)
				  return obj  
			}
		},
		mounted(){
			this.urlParse()
			
		}
	}
</script>

<style>
	body{
		margin: 0 !important;
	}
	iframe body{padding:0 !important;margin:0 !important;}
	iframe{
		height: 100vh;
		width: 100%;
		display: inline-block;
		
	}
</style>