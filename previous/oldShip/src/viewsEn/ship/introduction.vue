<template>
	<section>
		<!--航程规划-->
		<div class="wl-int-bg">
	      <div class="inner wlin-bg clearfix">
	        <h1>航程规划服务介绍</h1>
	        <span>客户可通过输入到货期，由系统综合各种因素，推算出合理装期供客户参考。</span>
	      </div>
	    </div>
	    <div class="inner clearfix">
	      <div class="wl-czlc">
	        <span class="wl-czlc-l"></span>
	         操作流程
	        <span class="wl-czlc-r"></span>
	      </div>    
	      <ul class="wl-cznr clearfix">
	        <li>输入A装港名称</li>
	        <li class="wl-cznr-jt"></li>
	        <li class="wl-cznr-ys">B卸港名称</li>
	        <li class="wl-cznr-jt"></li>
	        <li class="wl-cznr-ys1">C合同航速</li>
	        <li class="wl-cznr-jt"></li>
	        <li class="wl-cznr-ys2">D装期</li>
	        <li class="wl-cznr-jt"></li>
	        <li class="wl-cznr-ys3">E装量（可选填）</li>
	      </ul> 
	      <div class="wl-czlc">
	        <span class="wl-czlc-l"></span>
	         输出结果
	        <span class="wl-czlc-r"></span>
	      </div> 
	      <div class="wl-czsc-p"></div>
	    </div>
	    <div class="wl-ccbz">
	        <h1>第一步计算</h1>
	        <span>根据理论值，系统自动计算以上结果</span>
	        <h1>第二步计算</h1>
	        <p>再通过该轮可能的在装港等待和装货时间（根据历史数据来推测）；显示历史相同月份<br>同航线的航行用时（根据历史数据来推测），与理论航行时间的差异供客户参考；<br>回归计算出基于理论和历史数据的以上结果<br></p>
	        <p class="wl-ccbz-co">**未来还可实现国内主要港口VLCC等靠泊排队船只情况列表，为客户提供卸货港<br>预计卸货时间参考<br></p>
	        <p class="wl-ccbz-co1">航程监控及回归验证：可在航线图上显示台风实时路径；可在航线图上显示海洋<br>风力、风向、海浪、洋流等信息。</p>
	    </div>
	</section>
</template>

<script>
 	export default {
		data() {
			return {
				
			}
		},
		methods:{
			
		},
		created(){
			
		},
		mounted(){
			
		}
	}

</script>