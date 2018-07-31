<template>
	<section>
		<div class="fro-404">
		    <div class="fro-bg403">403</div>
		    <p class="fro-404-t">No Access</p>
		    <ul class="fro-404-b clearfix">
		
		        <li><a href="javascript:;" @click="getShip()"><i class="e-ico return-ico"></i>Home</a></li>
		        <li><a href="javascript:;" @click="getPersonal()"><i class="e-ico return-ico"></i>Please contact for authorization</a></li>
		    </ul>
		</div>
	</section>
</template>

<script>
	export default({
		data(){
			return{
				
			}
		},
		methods:{
			getPersonal(){
				window.open(configURL.member+'/center/my.htm',"_self");
			},
			getShip(){   
//				window.open(configURL.shipUrl+"/page/#/","_self");
				this.$router.push({path:'/'})
			},
		},
		mounted(){
			
		}
	})
</script>

<style scoped>
	 *{ padding:0; margin:0;}
        li{list-style:none;}
        img{ vertical-align:middle;}
        body{background:#fff;}
        html,body,img,iframe,abbr{border:0;}
        /*404*/
        .e-ico{ background:url('../assets/images/e-ico.png') no-repeat;display:inline-block;vertical-align:middle;}
        .fro-404{ text-align:center; width:100%; padding-top:30px;}
        .fro-bg403{ background:url('../assets/images/403_en.png') no-repeat center center; width:557px; height:390px; line-height:390px; font-size:120px; color:#126fb5; text-align:center; margin:0 auto; text-indent:-9999px; overflow:hidden;}
        .fro-404-t{ font-size:20px; color:#999; margin:40px 0;}
        .fro-404-b{ width:400px; margin:0 auto;}
        .fro-404-b li{ float:left;}
        .fro-404-b li:last-child{ float:right;}
        .fro-404-b li a{ font-size:18px; color:#999;}
        .refresh-ico{ background-position:0 0; width:29px; height:30px; margin-right:18px;}
        .return-ico{ background-position:-33px 0; width:31px; height:33px; margin-right:18px;}
</style>