<template>
	<section>
		<!--引导页-->
		<div class="fornt-user clearfix">
	       <div class="fornt-user-r">
	         <div class="fornt-user-lc user-qy" @click="goPage()">
		         	<i class="ico-tran1 ico-forq"></i>
		         	<a href="javascript:;">无订单租船</a>
		         	<span></span>
	         </div>
	        </div>
	        <div class="fornt-user-l">
	            <div class="fornt-user-lc"  @click="goPageTwo()">
	         		<i class="ico-tran1 ico-forg"></i>
	         		<a href="javascript:;">有订单租船</a>
	            </div>
	        </div>
	        <div class="fonr-bg"></div>
		</div>
	</section>
</template>

<script>
 	export default {
		data(){
			return {
				type:0,
			}
		},
		methods: {
			goPage(){
				//this.$router.push({'path': '/charter?palletType='+this.type});
//				window.location.href="/pallet/palletEdit.htm?palletType="+this.type;
				var userData = JSON.parse(window.localStorage.getItem('user'))
	    		if(userData){
	    			var flag = false;
	    			if(userData.roles != null){
	    				for(var i=0; i<userData.roles.length; i++){
	    					var role = userData.roles[i];
			    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner'){
			    				flag = true
			    			}
			    		}
	    			}
	    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
	    				this.$router.push({'path': '/403'});
	    			}else{
	    				window.location.href="/pallet/palletEdit.htm?palletType="+this.type;
	    			}
	    		}else{
	    			
	    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/bootPage?palletType=' + this.type;
	    		}
			},
			goPageTwo(){
					//this.$router.push({'path': '/charter?palletType='+this.type});
//					window.location.href="/pallet/orderPageList.htm?palletType="+this.type;
					var userData = JSON.parse(window.localStorage.getItem('user'))
		    		if(userData){
		    			var flag = false;
		    			if(userData.roles != null){
		    				for(var i=0; i<userData.roles.length; i++){
		    					var role = userData.roles[i];
				    			if( role == 'cargo_owner' || role == 'enter_master' || role == 'admin' || role == 'ship_agent' || role == 'ship_owner'){
				    				flag = true
				    			}
				    		}
		    			}
		    			if((userData.epMemberId ==  userData.memberId && !flag) || userData.epMemberId == null){
		    				this.$router.push({'path': '/403'});
		    			}else{
		    				window.location.href="/pallet/orderPageList.htm?palletType="+this.type;
		    			}
		    		}else{
		    			
		    			window.location.href=configURL.sys+'/login.htm?returnUrl='+configURL.shipUrl+'/page/#/bootPage?palletType=' + this.type;
		    		}
			}
		},
		created(){
			this.type=this.$own.getHref('palletType');
		},
		mounted(){
			
		}
	}

</script>
<style>
	
</style>