<template>
	<section>
		<div class="inner">
			<div class="charter-box">
				<h1 class="charter-title">我要租船</h1>
				<ul class="charter-list clearfix">
					<li :class="{cur:onoffTab}" @click="onoffTab=true"><a href="javascript:;">按港口</a></li>
					<li :class="{cur:!onoffTab}"><a href="javascript:;"  @click="onoffTab=false">按区域</a></li>
				</ul>
				
				<div class="charter-cont" >
					
					
			<el-form :model="data" :rules="rules" ref="form"  class="demo-ruleForm" >			
					<!--租船申请--按港口-->
					<div class="onoffBox" v-if="onoffTab">
						
						
						<div class="clearfix" v-for="(item,index) in list">
							<div class="charter-add">
								<div class="form-row charter-row">
									<label class="control-label add-label">数量</label>
									<div class="controls add-controls clearfix">
										<el-input v-model="item.quantity" placeholder="请输入内容" style="width:68%;"></el-input>
										<el-select v-model="item.unitName" placeholder="请选择" style="width:30%">
										    <el-option v-for="item in caseArr" :key="item"  :label="item"  :value="item">
										    </el-option>
										</el-select>
									</div>
								</div>
								<div class="form-row charter-row">
									<label class="control-label add-label">装港</label>
									<div class="controls add-controls">
										<el-select v-model="item.loadPort" placeholder="请选择" style="width:100%" @change="otherFn(item.loadPort,item)">
										    <el-option v-for="item in loadingArr" :key="item"  :label="item"  :value="item">
										    </el-option>
										</el-select>
									</div>
								</div>
								
								<!--其它-->
								<div class="form-row charter-row te-element"  v-if="item.isShow">
									<label class="control-label add-label"></label>
									<div class="controls add-controls">
										<el-form-item label="">
											<el-input v-model="item.other" placeholder="请输入内容" class="ry-input-error" ></el-input>
											<span class="ry-error">必填</span>
										</el-form-item>
									</div>
								</div>
								
								
							</div>
							<div class="description clearfix">
								<a href="javascript:;" class="shipping-ico" :class="index ? 'w-ico-Less': 'w-ico-plus' " @click="addTab(index,list)"></a>
								<span v-if="more && !index">说明：装港有几个填几个，装港和装港区域、卸港和卸港区域不能同时为空</span>
							</div>
						</div>
						
						<div class="form-row charter-row" v-for="(zhi,index) in dataMore" style="clear: both;">
							<label class="control-label charter-label">{{index+1}}卸港</label>
							<div class="controls charter-controls">
								<el-select v-model="zhi.unloadPort" @change="unOtherFn(zhi.unloadPort,zhi)" placeholder="请选择" :inline="true" style="width:100%">
								    <el-option v-for="item in unloadingArr" :key="item"  :label="item"  :value="item">
								    </el-option>
								</el-select>
							</div>
							<a href="javascript:;" class="shipping-ico mtt3" :class="index ? 'w-ico-Less': 'w-ico-plus'"   @click="addTabDuo(index,dataMore)"></a>
							
							<!--卸港 其它-->
							<div class="form-row charter-row te-element"  v-if="zhi.isShow" style="clear: both;">
								<label class="control-label charter-label">&nbsp;</label>
								<div class="controls charter-controls">
									<el-form-item label="">
										<el-input v-model="zhi.other" placeholder="请输入内容"   class="ry-input-error" ></el-input>
										<span class="ry-error">必填</span>
									</el-form-item>
								</div>
							</div>

							
						</div>
						
						
						
					</div>
					<div class="onoffBox"  v-if="!onoffTab">
						
						<div class="clearfix" v-for="(item,index) in listTwo">
							<div class="charter-add">
								<div class="form-row charter-row">
									<label class="control-label add-label">数量</label>
									<div class="controls add-controls clearfix">
										<el-input v-model="item.quantity" placeholder="请输入内容"  style="width:68%;"></el-input>
										<el-select v-model="item.unitName" placeholder="请选择" style="width:30%">
										    <el-option v-for="item in caseArr" :key="item"  :label="item"  :value="item">
										    </el-option>
										</el-select>
									</div>
								</div>
								<div class="form-row charter-row">
									<label class="control-label add-label">装货区域</label>
									<div class="controls add-controls">
										<el-input v-model="item.loadPort" placeholder="请输入内容"></el-input>
									</div>
								</div>
							</div>
							<div class="description clearfix">
								<a href="javascript:;" class="shipping-ico" :class="index ? 'w-ico-Less': 'w-ico-plus' " @click="addTab(index,listTwo)"></a>
								<span v-if="more2 && !index">说明：装港有几个填几个，装港和装港区域、卸港和卸港区域不能同时为空</span>
							</div>
						</div>
						
						<div class="form-row charter-row" v-for="(zhi,index) in dataMore2" style="clear: both;">
							<label class="control-label charter-label">卸货区域</label>
							<div class="controls charter-controls">
								<el-input v-model="zhi.unloadPort" placeholder="请输入内容" ></el-input>
							</div>
							<a href="javascript:;" class="shipping-ico mtt3" :class="index ? 'w-ico-Less': 'w-ico-plus'"   @click="addTabDuo(index,dataMore2)"></a>
						</div>
						
						
						
					</div>
					
			
				
					
					<div class="form-row charter-row">
						<label class="control-label charter-label">装期laycan</label>
						<div class="controls charter-controls">
							
							<el-form-item label="" prop="time">
								<el-date-picker @change="getSTime"  v-model="data.time" style="width:100%" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
							    </el-date-picker>
							</el-form-item>
							
						</div>
						<p><i class="shipping-ico w-ico-note" @click="info=!info"></i><span v-if="info">只写第一装港的信息</span></p>
					</div>
					
		
				
					<div class="charter-blo"><span></span></div>
					<div class="form-row charter-row te-element">
						<label class="control-label charter-label" style="padding-top:10px">船型</label>
  						<el-form-item label="" prop="shipType">
						    <el-checkbox-group v-model="data.shipType"  @change="moldFn" >
								<el-checkbox v-for="item in moldArr" :label="item" :key="item">{{item}}</el-checkbox>
						    </el-checkbox-group>
						</el-form-item>
					</div>
					<div class="form-row charter-row"  v-if="otherOnOff1">
						<label class="control-label charter-label">&nbsp;</label>
						<div class="controls charter-controls">
							<el-form-item label="" prop="other1">
								<el-input v-model="data.other1" placeholder="请输入内容" ></el-input>
							</el-form-item>
						</div>
					</div>
					
					
					<div class="form-row charter-row te-element">
						<label class="control-label charter-label" style="padding-top:10px">船龄</label>

  						<el-form-item label="" prop="shipAge" inline-message="true">
						    <el-checkbox-group v-model="data.shipAge"  @change="moldFn2">
								<el-checkbox v-for="item in ageArr" :label="item" :key="item">{{item}}</el-checkbox>
						    </el-checkbox-group>
						</el-form-item>
						
					</div>
					<div class="form-row charter-row" v-if="otherOnOff2">
						<label class="control-label charter-label">&nbsp;</label>
						<div class="controls charter-controls">
							<el-form-item label="" prop="other2">
								<el-input v-model="data.other2" placeholder="请输入内容" ></el-input>
							</el-form-item>
						</div>
					</div>
					
					
					
					<div class="form-row charter-row">
						<label class="control-label charter-label">租船其他要求</label>
						<div class="controls charter-controls">
							<el-input
							  type="textarea"
							  :rows="4"
							  placeholder="请输入内容"
							  v-model="data.remark">
							</el-input>
						</div>
					</div>
					
					
					
					
					
					<div class="form-row charter-row">
						<label class="control-label charter-label">指定承运商</label>
						<div class="controls charter-controls">
							<el-form-item label="" prop="traderName" >
							    <el-select v-model="data.traderName" placeholder="请选择活动区域"  style="width:100%">
							        <el-option v-for="item in operator" :key="item"  :label="item"  :value="item">
							    	</el-option>
							    </el-select>
							</el-form-item>
						</div>
					</div>

			
					
					<div class="charter-blo"><span></span></div>
					<div class="form-row charter-row">
						<label class="control-label charter-label">公司</label>
						<div class="controls charter-controls">
							<el-form-item label="" prop="companyName">
								<el-input v-model="data.companyName" placeholder="请输入内容"></el-input>
							</el-form-item>
						</div>
					</div>
					<div class="form-row charter-row">
						<label class="control-label charter-label">联系人</label>
						<div class="controls charter-controls">
							<el-form-item label="" prop="contacts">
								<el-input v-model="data.contacts" placeholder="请输入内容" ></el-input>
							</el-form-item>
						</div>
					</div>
					<div class="form-row charter-row">
						<label class="control-label charter-label">邮箱</label>
						<div class="controls charter-controls">
							<el-form-item label=""  prop="email">
								<el-input v-model="data.email" placeholder="请输入内容"></el-input>
							</el-form-item>
						</div>
					</div>
					<div class="form-row charter-row">
						<label class="control-label charter-label">电话</label>
						<div class="controls charter-controls">
							<el-form-item label="" prop="tel">
								<el-input v-model="data.tel" placeholder="请输入内容" ></el-input>
							</el-form-item>
						</div>
					</div>
					

					
					
					<div class="form-row charter-row">
						<label class="control-label charter-label"></label>
						<div class="controls charter-btn">
							<el-button type="primary" @click="submitForm('form')">提交</el-button>
							<el-button  @click="resetForm('form')">取消</el-button>
						</div>
					</div>
					<div style="height:100px;"></div>
					
					</el-form>
					
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	
	import { start,saveForm,trader } from '../../api/ship';
	export default {
		data() {
			 var numberFn = (rule, value, callback) => {
		        if (!value) {
		          return callback(new Error('不能为空'));
		        }
	            if (!/(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/.test(value)){
	            	callback(new Error('请输入正确的电话号码'));
	            }else{
	            	callback();
	            }
		       
		    };
			return {
				more:false, //验证用
				more2:false, //验证用
				info:false,
				onoffTab:true,
				caseArr:['吨','桶'],   // 单位存
				loadingArr:[],    // 装港 存
				unloadingArr:[],
				list:[
					{
						quantity:'',
						unitName:'吨',
						loadPort:'',
						isShow:false,
						other:''
					}
				],
				listTwo:[
					{
						quantity:'',
						unitName:'吨',
						loadPort:''
					}
				],
				dataMore:[   //卸港1
					{
						unloadPort:'',
						isShow:false,
						other:''
					}
				],  
				dataMore2:[    //卸港2
					{
						unloadPort:''
					}
				], 
				moldArr:[],   // 船型
				ageArr:[],   //船龄
				otherOnOff1:false,
				otherOnOff2:false,
				operator:[],   // 指定承运商
				data:{
					xOther:'',
					time:[], 
					shipType:[],
					other1:'',
					shipAge:[],
					other2:'',
					remark:'',
					traderName:'',
					companyName:'',
					contacts:'',
					email:'',
					tel:''
				},
				rules: {
					time:[
						{type: 'array', required: true,  message: '请输选择时间',trigger: 'change'}
					],
					tel:[,
      					{ validator: numberFn, trigger: 'blur'}
					],
					email:[
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
					],
					contacts:{ required: true, message: '请输入联系人', trigger: 'blur' },
					companyName:{ required: true, message: '请输入公司', trigger: 'blur' },
					traderName:{ required: true, message: '请选择承运商', trigger: 'change' },
					shipAge:{ type: 'array', required: true, message: '请选年龄', trigger: 'change' },
					shipType:{ type: 'array', required: true, message: '请选船型', trigger: 'change' },
					other1:{ required: true, message: '选择其它必须填写', trigger: 'blur' },
					other2:{ required: true, message: '选择其它必须填写', trigger: 'blur' },
				}
			}
		},
		methods: {
			otherFn:function(str,obj){
				if(str=='其它'){
					obj.isShow=true;
				}else{
					obj.isShow=false;
				}
			},
			unOtherFn:function(str,obj){
				if(str=='其它'){
					obj.isShow=true;
				}else{
					obj.isShow=false;
				}
			},
			init:function(){
				var para={valueSetTypes:"4;5;9;13"};
				start(para).then((res) => {
					
					var listData=res.datas;
					for(var i=0; i<listData.length;i++){
						// 卸港
						if(listData[i].type=='4'){
							this.unloadingArr.push(listData[i].value);
						}
						//装港
						if(listData[i].type=='5'){
							this.loadingArr.push(listData[i].value);
						}
						//船型
						if(listData[i].type=='9'){
							this.moldArr.push(listData[i].value);
						}
						//船龄
						if(listData[i].type=='13'){
							this.ageArr.push(listData[i].value);
						}
					}
					
				});
				
				
				//指定承运商  初始化
				trader().then((res)=>{
					for(var i=0;i<res.datas.length;i++){
						this.operator.push(res.datas[i].traderName);
					}
				})
				
			},
			addTab:function(index,objData){
				if(!index){
					var data={
						quantity:'',
						unitName:['吨','桶'],
						loadPort:''
					}
					objData.push(data);
				}else{
					objData.splice(index,1);
				}
			},
			addTabDuo:function(index,objData){ //////////////////////////////////////////////////////////////////////////
				if(!index){
					var data={
						unloadPort:'',
						isShow:false
					};
					objData.push(data);
				}else{
					objData.splice(index,1);
				}
			},
			moldFn:function(val){
				for(var i=0;i<val.length;i++){
					if(val[i]=='其它'){
						this.otherOnOff1=true;
						return false;
					}
				}
				this.otherOnOff1=false;
			},
			moldFn2:function(val){
				for(var i=0;i<val.length;i++){
					if(val[i]=='其它'){
						this.otherOnOff2=true;
						return false;
					}
				}
				this.otherOnOff2=false;
			},
			valueFn:function(obj,obj2){    // 验证装货 ，卸货
				var quan=0;
        		for(var i=0;i<obj.length;i++){
        			if(obj[i].quantity!=''){
        				quan++;
        				break;
        			}
        		}
        		for(var i=0;i<obj.length;i++){
        			if(obj[i].loadPort!=''){
        				quan++;
        				break;
        			}
        		}
        		for(var i=0;i<obj2.length;i++){
        			if(obj2[i].unloadPort!=''){
        				quan++;
        				break;
        			}
        		}
        		return quan;
			},
			submitForm(formName){
				
	
				this.$refs[formName].validate((valid) => {
					
					//俩个其它验证
					var linOnff=false;
					$('.ry-input-error input').each(function(){
						if($(this).val()==''){
							$(this).parent().next().show();
						}else{
							$(this).parent().next().hide();
						}
						
					});
					
					
					
					
					//前部分定义验证
		        	if(this.onoffTab){        // tab1验证
		        		if(this.valueFn(this.list,this.dataMore)==3 && $('.ry-error:visible').length==0){
		        			this.more=false;
		        		}else{
		        			this.more=true;
		        			return false;
		        		}
		        	}else{                    // tab2验证
		        		if(this.valueFn(this.listTwo,this.dataMore2)==3){
		        			this.more2=false;
		        		}else{
		        			this.more2=true;
		        			return false;
		        		}
		        	}
					//form 表单验证
			        if (valid) {
			            this.saveFn();  
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
		          
		        });

		      },
		    resetForm(formName) {
		        this.$refs[formName].resetFields();
		    },
		    saveFn(){
				
				var para={
						list:[],
						unloadPort:[],
						shipAge:'',   //船龄
						shipType:'',   //船型
						remark:'',   //其他要求
						traderName:'',   //承运商
						companyName:'',  //公司
						contacts:'',   //联系人
						email:'',    //email
						tel:'',     //tel
						laycanBeg:'',   //开始装期
						laycanEnd:'',      //结束装期
						palletType:this.$own.getHref('palletType')
					};
					
				var cunData=$.extend(true,para,this.data);
				
				

				
				//头部 装卸港	
				if(this.onoffTab){
					
					// 装港 - 其它
					for(var i=0;i<this.list.length;i++){
						if(this.list[i].isShow){
							this.list[i].loadPort=this.list[i].other;
						}
					}
									
					// 卸港   -  其它
					for(var i=0;i<this.dataMore.length;i++){
						if(this.dataMore[i].isShow){
							this.dataMore[i].unloadPort=this.dataMore[i].other;
						}
					}
					
					
					para.list=this.list;
					para.unloadPort=this.dataMore;
				}else{
					para.list=this.listTwo;
					para.unloadPort=this.dataMore2;
				}
				

				// 船龄
				var strAge='';
				for(var i=0;i<cunData.shipAge.length;i++){
					if(cunData.shipAge[i]=='其它'){
						cunData.shipAge[i]=this.data.other2;
					}
					if(cunData.shipAge.length-1==i){
						strAge+=cunData.shipAge[i];
					}else{
						strAge+=cunData.shipAge[i]+';';
					}
				}
				cunData.shipAge=strAge;
				
				//船型
				var strType='';
				for(var i=0;i<cunData.shipType.length;i++){
					if(cunData.shipType[i]=='其它'){
						cunData.shipType[i]=this.data.other1;
					}
					console.log(cunData.shipType);
					if(cunData.shipType.length-1==i){
						console.log(cunData.shipType[i])
						strType+=cunData.shipType[i];
					}else{
						strType+=cunData.shipType[i]+';';
					}
				}
				cunData.shipType=strType;
				


				// 保存
				saveForm(cunData).then((res) => {
					window.location.href="/pallet/palletList.htm";
				});
		   },
		   getSTime(val) {
		   	
		   		Date.prototype.format = function(fmt) { 
				     var o = { 
				        "M+" : this.getMonth()+1,                 //月份 
				        "d+" : this.getDate(),                    //日 
				        "h+" : this.getHours(),                   //小时 
				        "m+" : this.getMinutes(),                 //分 
				        "s+" : this.getSeconds(),                 //秒 
				        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
				        "S"  : this.getMilliseconds()             //毫秒 
				    }; 
				    if(/(y+)/.test(fmt)) {
				            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
				    }
				     for(var k in o) {
				        if(new RegExp("("+ k +")").test(fmt)){
				             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				         }
				     }
				    return fmt; 
				}   

				this.data.laycanBeg = new Date(new Date(val[0]).format("yyyy-MM-dd hh:mm:ss"));
				this.data.laycanEnd = new Date(new Date(val[1]).format("yyyy-MM-dd hh:mm:ss"));
				
           }
		},
		created:function(){
			// 初始化
			this.init();
			

			

		},
		mounted:function(){
			//监听其它
			$('body').on('input propertychange','.ry-input-error input',function(){
				if($(this).val()!=''){
					$(this).parent().next().hide();
				}else{
					$(this).parent().next().show();
				}
			})
		},
		watch:{
			onoffTab(curVal){   
				if(curVal){
					
				}else{
					
				}
				this.resetForm('form');
			}
		}
	}

</script>
<style>
	.charter-blo{margin: 15px 0;}
	.te-element .el-form-item__error{left:217px; top:27px}
	.te-element .el-form-item{ margin-bottom: 0;}
	.mtt3{margin-top: 5px;}
	.description{margin-top:35px;}
	.ry-error {color:#f56c6c;display: none;}
</style>