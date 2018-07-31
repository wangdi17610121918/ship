<template>
	<section>
		<!--单位换算-->
		<div class="inner">
			<div class="tide-title"><a href="javascript:;" @click="getActive()">Index</a>&gt;&gt;<a href="/page/" class="cur">SHIPPING</a>&gt;&gt;<a href="javascript:;" class="cur">Unit Converter</a></div>
			<div class="dwhs-box clearfix">
				<div class="common-tooln-top tide-search-top">
					<span class="tide-search-title">Unit Converter</span>
					<ul class="common-tooln-line tide-search-line clearfix">
						<li></li><li class="tooln-line"></li>
					</ul>
				</div>
				<div class="conversion-box">
	               <i class="shipping-ico ico-chi"></i>
	               	<ul class="dwhs-con">
		                <li>
		                	<el-input v-model="inputL1" placeholder="Please enter content"  class="ry-dwhs-int con_inputL1" size="small" type='number'></el-input>
		                	<span>Farenheit</span>
		                </li>
		                <li class="dwhs-con-r ry-dis">
		                	<el-input v-model="inputR1"  placeholder="Conversion results"  class="ry-dwhs-int con_inputR1" size="small" type='number'></el-input>
		                	<span>Celsius</span>
		                	<!--<el-select v-model="value1"  placeholder="" class="ry-select-unit"  size="small"  @change="changeFn(str1,value1,'bfb1')">
							    <el-option	
							      v-for="item in optionsVal1"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
							</el-select>-->
		                </li>
	               	</ul>
	               	<ul class="dwhs-con">
		                <li>
		                	<el-input v-model="inputL2" placeholder="Please enter content"  class="ry-dwhs-int con_inputL2" size="small" type='number'></el-input>
		                	<span>API</span>
		                </li>
		                <li class="dwhs-con-r ry-dis">
		                	<el-input v-model="inputR2" placeholder="Conversion results"  class="ry-dwhs-int con_inputR2" size="small" type='number'></el-input>
		                	<span>SG@60°F</span>
		                	<!--<el-select v-model="value2" placeholder="" class="ry-select-unit" size="small"  @change="changeFn(str2,value2,'bfb2')">
							    <el-option	
							      v-for="item in optionsVal2"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
							</el-select>-->
		                </li>
	               	</ul>
	               	<ul class="dwhs-con">
		                <li>
		                	<el-input v-model="inputL3" placeholder="Please enter content"  class="ry-dwhs-int con_inputL3" size="small" type='number'></el-input>
		                	<span>Long Tons</span>
		                </li>
		                <li class="dwhs-con-r ry-dis">
		                	<el-input v-model="inputR3" placeholder="Conversion results"  class="ry-dwhs-int con_inputR3" size="small" type='number'></el-input>
		                	<span>Metric Tons</span>
		                	<!--<el-select v-model="value3" placeholder="" class="ry-select-unit" size="small"   @change="changeFn(str3,value3,'bfb3')">
							    <el-option	
							      v-for="item in optionsVal3"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
							</el-select>-->
		                </li>
	               	</ul>
	               	<ul class="dwhs-con">
		                <li>
		                	<el-input v-model="inputL4"  placeholder="Please enter content"  class="ry-dwhs-int  con_inputL4" size="small" type='number'></el-input>
		                	<span>Factor BBLS@60°F</span>
		                </li>
		                <li class="dwhs-con-r ry-dis">
		                	<el-input v-model="inputR4" placeholder="Conversion results"  class="ry-dwhs-int con_inputR4" size="small" type='number'></el-input>
		                	<span>m³@15°C</span>
		                	<!--<el-select v-model="value4" placeholder="" class="ry-select-unit" size="small"  @change="changeFn(str4,value4,'bfb4')">
							    <el-option	
							      v-for="item in optionsVal4"
							      :key="item"
							      :label="item"
							      :value="item">
							    </el-option>
							</el-select>-->
		                </li>
	               	</ul>
	               
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { conversionAllData , conversionData }   from '../../api/ship';
	export default {
		data() {
			return {
				bfb2:3,
				bfb1:3,
				bfb3:3,
				bfb4:3,
				inputL1:'',
				value1:'',
				optionsVal1:[],
				str1:'',
				inputL2:'',
				value2:'',
				optionsVal2:[],
				str2:'',
				inputL3:'',
				value3:'',
				optionsVal3:[],
				str3:'',
				inputL4:'',
				value4:'',
				optionsVal4:[],
				str4:'',
				selectData:[],
				inputR1:'',
				inputR2:'',
				inputR3:'',
				inputR4:'',
			}
		},
		computed:{
//			inputR1:function(){
//				var sum = this.getResult1(this.inputL1);
//				return this.round(sum,2)
//			},
//			inputR2:function(){
//				var sum = this.getResult2(this.inputL2);
//				return this.round(sum,4)
//			},
//			inputR3:function(){
//				var sum = this.getResult3(this.inputL3);
//				return this.round(sum,3)
//			},
//			inputR4:function(){
//				var sum = this.getResult4(this.inputL4);
//				return this.round(sum,5)
//			}
		},
		methods: {
			getActive(){
				window.open(configURL.index,"_blank");
			},
//			changeFn(str1,str2,zhi){
//				var onj={
//					oneName:str1,
//					twoName:str2
//				}
//				conversionData(onj).then((res)=>{
//				
//					this[zhi]=res.datas;
//				})
//			},
//			accuracyFn(oneStr,twoStr){
//				
//				var arr1=oneStr.toString().split('.');
//				var arr2=twoStr.toString().split('.');
//				var len1=0;
//				var len2=0;
//				
//				len1=arr1.length>1?arr1[1].length:0;
//
//				len2=arr2.length>1?arr2[1].length:0;
//
//				var big = len1>len2?len1:len2;
//				var zhi = Math.pow(10,big);
//				var zhi2 = Math.pow(10,big*2);
//				var sum=(oneStr*zhi)*(twoStr*zhi)/zhi2;
//
//				return sum;
//			},
//			cunArr(objrr,obj2,objStr){
//				objrr.push(obj2.chName);
//			},
			 accMul(arg1,arg2){   
				  var m=0,s1=arg1.toString(),s2=arg2.toString();   
				  try{m+=s1.split(".")[1].length}catch(e){}   
				  try{m+=s2.split(".")[1].length}catch(e){}   
				  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)   
			},//乘法
			accAdd(arg1,arg2){   
				var r1,r2,m;   
				try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}   
				try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}   
				m=Math.pow(10,Math.max(r1,r2))   
				return (arg1*m+arg2*m)/m   
			},//加法
			Subtr(arg1,arg2){  
			    var r1,r2,m,n;  
			    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
			    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
			    m=Math.pow(10,Math.max(r1,r2));  
			    n=(r1>=r2)?r1:r2;  
			    return ((arg1*m-arg2*m)/m).toFixed(n);  
			},//减法
			accDiv(num1, num2) {  
		        var baseNum1 = 0, baseNum2 = 0;  
		        var baseNum3, baseNum4;  
		        try {  
		            baseNum1 = num1.toString().split(".")[1].length;  
		        } catch (e) {  
		            baseNum1 = 0;  
		        }  
		        try {  
		            baseNum2 = num2.toString().split(".")[1].length;  
		        } catch (e) {  
		            baseNum2 = 0;  
		        };
				//with (Math) {  
		            baseNum3 = Number(num1.toString().replace(".", ""));  
		            baseNum4 = Number(num2.toString().replace(".", ""));  
		            return (baseNum3 / baseNum4) *Math.pow(10, baseNum2 - baseNum1);  
		       // }  
		    },  //除法
//			 accMul(arg1,arg2)乘法
//			accAdd(arg1,arg2)加法
//			Subtr(arg1,arg2)减法
//			accDiv(num1, num2)除法
			xiaoshu(x,y)
			 	{
			      var f = parseFloat(x); 
			        var f = Math.round(x*100)/100; 
			        var s = f.toString(); 
			        var rs = s.indexOf('.'); 
			      if (rs < 0) { 
			         rs = s.length; 
			         s += '.'; 
			       } 
			       while (s.length <= rs + y) { 
			         s += '0'; 
			       } 
			       return s; 
			},
			formatFloat(f, digit) { 
			    var m = Math.pow(10, digit); 
			    return parseInt(f * m, 10) / m; 
			},
			bigNum(num1,num2){
				//小数点
				var len1=0;
    			var len2=0;
				if(num1.indexOf('.')!=-1){
    				var arrStr1=num1.split('.');
    				len1=arrStr1[1].length;
    			}
				if(num2.indexOf('.')!=-1){
    				var arrStr2=num2.split('.');
    				len2=arrStr2[1].length;
    			}
				return (len1>len2) ? len1 : len2 ;
			},
            converFn(){
            	var This = this;
            	$('.con_inputL1').bind('input propertychange', function() {
            		if(This.inputL1 != '' && !isNaN(This.inputL1)){
            			This.inputR1=Number(((This.inputL1-32)/(1.8)).toFixed(3)).toFixed(2);
            			
            			
            			
            		
            			
            		}else{
            			This.inputR1 ='';
            		}
				});
				$('.con_inputR1').bind('input propertychange', function() {
            		if(This.inputR1 != ''){
            			var a = This.accMul(This.inputR1,1.8);
            			var b= Number(This.accAdd(a,32).toFixed(3)).toFixed(2);   //1.34
            			This.inputL1 = b;
            		}else{
            			This.inputL1 =''
            		}			
				})
				
				
            	$('.con_inputL2').bind('input propertychange', function() {
            		if(This.inputL2 != ''){
            			var a = This.accAdd(This.inputL2,131.5)
            			var b = This.accDiv(141.5,a)
            			This.inputR2 =  This.xiaoshu(b,4)
            		}else{
            			This.inputR2 =''
            		}
            			
				})
            	$('.con_inputL3').bind('input propertychange', function() {
            		if(This.inputL3 != ''){
            			var a =This.accMul(0.984,This.inputL3)
            			This.inputR3 =  This.xiaoshu(a,3)
            		}else{
            			This.inputR3 =''
            		}	
				})
            	$('.con_inputL4').bind('input propertychange', function() {
            		if(This.inputL4 != ''){
            			var a = This.accDiv(This.inputL4, 0.15893)
            			This.inputR4 =  This.xiaoshu(a,5)
            		}else{
            			This.inputR4 =''
            		}		
				})
            	
            	$('.con_inputR2').bind('input propertychange', function() {
            		if(This.inputR2 != ''){
            			var a = This.accDiv(141.5, This.inputR2)
            			var b= This.Subtr(a,131.5)
            			This.inputL2 =  This.xiaoshu(b,2)
            		}else{
            			This.inputL2 =''
            		}		
				})
            	$('.con_inputR3').bind('input propertychange', function() {
            		if(This.inputR3 != ''){
            			var a = This.accDiv(This.inputR3, 0.984)
            			This.inputL3 =  This.xiaoshu(a,3)
            		}else{
            			This.inputL3 =''
            		}		
				})
            	$('.con_inputR4').bind('input propertychange', function() {
            		if(This.inputR4 != ''){
            			var a = This.accMul(0.15893,This.inputR4)
            			This.inputL4 =  This.xiaoshu(a,2)
            		}else{
            			This.inputL4 =''
            		}	
				})
            }
		},
		created(){
			
		},
		mounted(){
			this.converFn()
//			this.$message({
//	          message: '请输入数字',
//	          type: 'warning'
//	        });
			
			
//			conversionAllData({}).then((res)=>{
//				console.log(res)
//				for(var i=0; i<res.datas.length;i++){
//					if(res.datas[i].type=="温度"){   //温度
//						if(res.datas[i].isDefaultUnit==1){
//							this.str1= res.datas[i].chName; 
//						}else{
//							this.cunArr(this.optionsVal1,res.datas[i],this.str1);
//						}
//					}else if(res.datas[i].type=="密度"){    // 密度
//						if(res.datas[i].isDefaultUnit==1){
//							this.str2= res.datas[i].chName; 
//						}else{
//							this.cunArr(this.optionsVal2,res.datas[i],this.str2);
//						}
//					}else if(res.datas[i].type=="体积"){    //体积
//						if(res.datas[i].isDefaultUnit==1){
//							this.str3= res.datas[i].chName; 
//						}else{
//							this.cunArr(this.optionsVal3,res.datas[i],this.str3);
//						}
//					}else if(res.datas[i].type=="容积"){    // 容积
//						if(res.datas[i].isDefaultUnit==1){
//							this.str4= res.datas[i].chName; 
//						}else{
//							this.cunArr(this.optionsVal4,res.datas[i],this.str4);
//						}
//					}
//				}
//				//初始赋值
//				this.value1=this.optionsVal1[0];
//				this.value2=this.optionsVal2[0];
//				this.value3=this.optionsVal3[0];
//				this.value4=this.optionsVal4[0];
//				//计算结果
//				this.changeFn(this.str1,this.value1,'bfb1');
//				this.changeFn(this.str2,this.value2,'bfb2');
//				this.changeFn(this.str3,this.value3,'bfb3');
//				this.changeFn(this.str4,this.value4,'bfb4');
//			})
			
		}
	}

</script>
<style>
	.ry-dwhs-int{width:calc(56% - 2px);height:28px;line-height:28px;margin-top: -1px;}
	.ry-select-unit{width:calc(44% - 2px);}
	.ry-dis .el-input.is-disabled .el-input__inner{ background-color: #fff;position:relative;top:-1px;}
	.dwhs-con li { width: 44% !important;}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	}
	input[type="number"]{
	  -moz-appearance: textfield;
	}
</style>