<template>
    <section>
        <div class="inner">
            <div class="title">{{this.infos.name}}船盘详情</div>
            <div class="container">
                <div class="sub_title">船盘信息
                    <a style="margin-left:10%" @click="dliaogo()">船舶档案</a>
                    <a style="margin-left:2%" @click="shipGo()">船舶动态</a>
                </div>
                <div class="row">
                    <div class="name">船名:</div>
                    <div class="text text2">
                        {{this.infos.name}}
                        <text>Power D</text>
                    </div>
                    <div class="name">船型：</div>
                    <div class="text">{{this.infos.type}}</div>
                    <div class="name">建造年份：</div>
                    <div class="text">{{this.infos.completeDate}}（船龄{{this.infos.shipAge}}年）</div>
                </div>
                <div class="row">
                    <div class="name">载重吨：</div>
                    <div class="text text2">{{this.infos.loadQuantity}}</div>
                    <div class="name">船位：</div>
                    <div class="text">{{this.infos.position}}</div>
                    <div class="name">OPEN：</div>
                    <div class="text">{{this.infos.open}}</div>
                </div>
                <div class="row">
                    <div class="name">EAT Fujairah：</div>
                    <div class="text text2">{{this.infos.eta}}</div>
                    <div class="name">EAT Cabinda：</div>
                    <div class="text">{{this.infos.etaCabinda}}</div>
                </div>
            </div>
            <div class="container people_info" v-for="tableInfos in tableInfo">
                <div class="sub_title">联系人信息</div>
                <div class="row">
                    <div class="name">船盘发布人：</div>
                    <div class="text text2">{{tableInfos.publishName}}</div>
                    <div class="name">联系电话：</div>
                    <div class="text">{{tableInfos.mobile}}</div>
                    <div class="name">邮箱：</div>
                    <div class="text">{{tableInfos.email}}</div>
                </div>
                <div class="row">
                    <div class="name">船东：</div>
                    <div class="text text2">{{tableInfos.shipOwnerName}}</div>
                    <div class="name">剩余时间：</div>
                    <div class="text">{{tableInfos.time}}</div>
                </div>
                <div class="btn_group">
                    <div class="item item1" v-if="isShow" @click="getBoot()">申请租船</div>
                    <div class="item" @click="goback()">返回</div>
                </div>
            </div>
        </div>

        <!-- 劳氏档案 -->
        <div class="pannel_body" style='display:none'>
            <!-- 劳氏档案 -->
            <div class="pannel_three pannel_10">
                <div class="pannel_title">
                    <span class="name">船舶档案</span>
                    <a class="close" @click="close">×</a>
                </div>
                <div class="pannel_content">
                    <div class="column_container">
                        <div class="sub_title">基本信息</div>
                        <div class="column_three">
                            <div class="name">船舶名称：</div>
                            <div class="text ellipsis_line_1" :title="daliao.basic.shipName">{{daliao.basic.shipName}}
                            </div>
                            <div class="name">IMO：</div>
                            <div class="text">{{daliao.basic.imo}}</div>
                            <div class="name">MMSI：</div>
                            <div class="text">{{daliao.basic.mmsi}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">呼号：</div>
                            <div class="text">{{daliao.basic.callsign}}</div>
                            <div class="name">船舶类型：</div>
                            <div class="text">{{daliao.basic.shipType}}</div>
                            <div class="name">船籍：</div>
                            <div class="text" v-if="daliao.basic.flag">{{daliao.basic.flag}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">总吨：</div>
                            <div class="text">{{this.daliao.basic.grossTonnage}}Mt</div>
                            <div class="name">载重吨：</div>
                            <div class="text">{{daliao.basic.deadWeight}}Mt</div>
                            <div class="name">营运状态：</div>
                            <div class="text ellipsis_line_1" :title="daliao.basic.serviceStatus">
                                {{daliao.basic.serviceStatus}}
                            </div>
                        </div>
                        <div class="column_three">
                            <div class="name">经济船速：</div>
                            <div class="text">{{daliao.basic.serviceSpeed}} Knots</div>
                        </div>
                    </div>
                    <div class="column_container">
                        <div class="sub_title">船级社</div>
                        <div class="column_three">
                            <div class="name">船籍：</div>
                            <div class="text">{{flag}}</div>
                            <div class="name">船籍港：</div>
                            <div class="text">{{portOfRegisttry}}</div>
                            <div class="name">船东保护协会：</div>
                            <div class="text ellipsis_line_1" :title="pi">{{pi}}</div>
                        </div>
                    </div>
                    <div class="column_container">
                        <div class="sub_title">船舶尺寸</div>
                        <div class="column_three">
                            <div class="name">型长：</div>
                            <div class="text">{{daliao.dimension.lpb}}m</div>
                            <div class="name">总长：</div>
                            <div class="text">{{daliao.dimension.loa}}m</div>
                            <div class="name">最大船宽：</div>
                            <div class="text">{{daliao.dimension.breadthRxtreme}}m</div>
                        </div>
                        <div class="column_three">
                            <div class="name">型宽：</div>
                            <div class="text">{{daliao.dimension.breadthMoulded}}m</div>
                            <div class="name">型深：</div>
                            <div class="text">{{daliao.dimension.depthMoulded}}m</div>
                            <div class="name">吃水：</div>
                            <div class="text">{{daliao.dimension.draught}}m</div>
                        </div>
                    </div>
                    <!-- <div class="column_container">
                      <div class="sub_title">动力设备</div>
                      <div class="column_three">
                        <div class="name">主机：</div>
                        <div class="text text2">MAN B / W6S70MC-C</div>
                        <div class="name">主机马力：</div>
                        <div class="text text2">18660马力</div>
                      </div>
                      <div class="column_three">
                        <div class="name">主机功率：</div>
                        <div class="text text2">*kw</div>
                        <div class="name">主机建造日期：</div>
                        <div class="text text2">*</div>
                      </div>
                      <div class="column_three">
                        <div class="name">主机型号：</div>
                        <div class="text text2">6S70MC-C</div>
                        <div class="name">特许制造商：</div>
                        <div class="text text2">*</div>
                      </div>
                      <div class="column_three">
                        <div class="name">主机数量：</div>
                        <div class="text text2">*</div>
                        <div class="name">主机轴马力：</div>
                        <div class="text text2">*马力</div>
                      </div>
                      <div class="column_three">
                        <div class="name">主机最大转速：</div>
                        <div class="text text2">*转</div>
                        <div class="name">主机类型：</div>
                        <div class="text text2">DIESEL</div>
                      </div>
                      <div class="column_three">
                        <div class="name">主机建造商：</div>
                        <div class="text text3">Hyundai Heavy Industries Co.Ltd</div>
                      </div>
                    </div> -->
                    <div class="column_container">
                        <div class="sub_title">船舶建造</div>
                        <div class="column_three">
                            <div class="name">建造公司：</div>
                            <div class="text text2 ellipsis_line_1" :title="daliao.built.builder">
                                {{daliao.built.builder}}
                            </div>
                            <div class="name">建造年份：</div>
                            <div class="text text2">{{daliao.built.yearOfBuilt}}</div>
                        </div>
                        <!-- <div class="column_three">
                          <div class="name">改造时间：</div>
                          <div class="text text2">{{daliao.built.gzsj}}</div>
                          <div class="name">变动时间：</div>
                          <div class="text text2">{{daliao.built.bdsj}}</div>
                        </div> -->
                    </div>
                    <div class="column_container">
                        <div class="sub_title">船舶公司</div>
                        <!-- <div class="column_three">
                          <div class="name">公司名称：</div>
                          <div class="text text2"></div>
                          <div class="name">公司IMO：</div>
                          <div class="text text2"></div>
                        </div>
                        <div class="column_three">
                          <div class="name">公司类型：</div>
                          <div class="text text2"></div>
                          <div class="name">地址：</div>
                          <div class="text text2"></div>
                        </div>
                        <div class="column_three">
                          <div class="name">生效日期：</div>
                          <div class="text text2"></div>
                        </div> -->
                        <div class="column_three">
                            <div class="name">所有公司：</div>
                            <div class="text text2">{{daliao.companyname.own}}</div>
                            <div class="name">管理公司：</div>
                            <div class="text text2">{{daliao.companyname.run}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">经营公司：</div>
                            <div class="text text2">{{daliao.companyname.manage}}</div>
                            <div class="name">船舶租家：</div>
                            <div class="text text2">{{daliao.companyname.rent}}</div>
                        </div>
                    </div>
                    <div class="column_container">
                        <div class="sub_title">检验记录</div>
                        <div class="column_three" v-for="classfication in daliao.classfications">
                            <div class="text text4">{{classfication.content}}</div>

                        </div>
                    </div>
                    <div class="column_container">
                        <div class="sub_title">PSC</div>
                        <div class="PSC_item" v-for="psc in daliao.pscs">
                            <div class="column_three">
                                <div class="name">PSC组织：</div>
                                <div class="text text2">{{psc.pscOrganization}}</div>
                                <div class="name">PSC检察机关：</div>
                                <div class="text text2">{{psc.authority}}</div>
                            </div>
                            <div class="column_three">
                                <div class="name">检查港口：</div>
                                <div class="text text2">{{psc.portOfInspection}}</div>
                                <div class="name">检查类型：</div>
                                <div class="text text2">{{psc.typeOfInspection}}</div>
                            </div>
                            <div class="column_three">
                                <div class="name">是否滞留：</div>
                                <div class="text text2">{{psc.detention}}</div>
                                <div class="name">滞留时间：</div>
                                <div class="text text2">{{psc.durationDays}}</div>
                            </div>
                            <div class="column_three">
                                <div class="name">缺陷数目：</div>
                                <div class="text text2">{{psc.numberOfDeficiencies}}</div>
                                <div class="name">报告时间：</div>
                                <div class="text text2">{{psc.dateOfReport}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import {bootsInfo, userLoad, ShipPlateDetail, Lloydsfile} from '../../api/ship';
    // import '../../../static/css/f_chuanwu.css'
    export default {
        data() {
            return {
                infos: {},
                tableInfo: [],
                str: '',
                isShow: false,
                imo: '',
                mmsi: '',
                type: '',//判断从那个页面来
                flag: '',
                portOfRegisttry: '',
                pi: "",
                daliao: {
                    basic: {},
                    // pis:{},
                    dimension: {},
                    built: {},
                    companyname: {},
                    pscs: [],
                    classfications: []
                },//劳氏档案数据
            }
        },
        methods: {
            //页面详情
            ShipPlateDetail() {
                var para = {"imo": this.imo, "mmsi": this.mmsi, "uuid": this.str};
                //var para = {"imo":"9513141","mmsi":"538006201","uuid":this.str};

                ShipPlateDetail(para).then(res => {
                    if (res.datas) {
                        this.tableInfo = res.datas.contactList;
                        this.imo = res.datas.imo,
                            this.mmsi = res.datas.mmsi
                        this.infos = res.datas
                    }

                })

            },
            goback() {
                if (this.type != '') {
                    if (this.type == '3') {
                        this.$router.push({"path": "/routemap?imo=" + this.imo})

                    }
                } else {
                    this.$router.go(-1)
                }

            },
            getBoot() {
                var id = this.str;
                window.open(configURL.shipUrl + '/pallet/palletEdit.htm?palletType=1&shipPlateUuid=' + id, "_self");
            },
// 			infosFn:function(){
// //				var str = this.$route.query.id;
// 				var para = {"uuid":this.str};
// 				// bootsInfo(para).then(res => {
// 				// 	if(res.datas.ship == null){
// 				// 		this.infos = {}
// 				// 		this.tableInfo = {}
// 				// 	}else{
// 				// 		this.tableInfo = res.datas.ship
// 				// 		this.infos = res.datas
// 				// 	}

// 				// })
// 			},
            //劳氏档案弹窗
            dliaogo() {
                // basic:{},
                // pis:[],
                // dimension:{},
                // built:{},
                // companyname:{},
                // pscs:[]
                var para = {"imo": this.imo, "mmsi": this.mmsi};
                Lloydsfile(para).then(res => {
                    if (res.datas) {
                        this.daliao.basic = res.datas.basic;
                        if (res.datas.pis.length > 0) {
                            this.flag = res.datas.pis[0].flag
                            this.portOfRegisttry = res.datas.pis[0].portOfRegisttry
                            this.pi = res.datas.pis[0].pi
                        }

                        this.daliao.dimension = res.datas.dimension;
                        this.daliao.built = res.datas.built;
                        this.daliao.companyname = res.datas.companyname;
                        this.daliao.pscs = res.datas.pscs;
                        this.daliao.classfications = res.datas.classfications;
                    }


                })
                $('.pannel_body').css("display", 'block')

            },
            //劳氏档案弹窗关闭
            close() {
                $('.pannel_body').css("display", 'none')
            },
            //船舶轨迹
            shipGo() {
                this.$router.push({"path": "/routemap?imo=" + this.imo})
            },
            content() {
                if (this.$own.getHref('uuid')) {
                    this.str = decodeURIComponent(this.$own.getHref('uuid'));
                } else if (this.$own.getHref('imo')) {
                    //this.str=window.localStorage.getItem('uuidd');
                    this.imo = this.$own.getHref('imo');
                    this.mmsi = this.$own.getHref('mmsi')
                    this.type = this.$own.getHref('type')
                }
            },
            userdata() {
                userLoad().then((res) => {
                    if (res.status == 0) {
                        var userData = res.datas;
                        if (userData) {
                            var flag = false;
                            if (userData.roles != null) {
                                for (var i = 0; i < userData.roles.length; i++) {
                                    var role = userData.roles[i];
                                    if (role == 'sales_trader' || role == 'buy_trader' || role == 'charterer' || role == 'trade_executor') {
                                        flag = true
                                        this.isShow = true
                                    }
                                }
                            }
                        }
                    }
                })
            }
        },
        mounted() {
            // this.infosFn()
            this.ShipPlateDetail()
        },
        created() {
            this.userdata()
            this.content();
        }
    }
</script>

<style>
    /* 船盘详情 */
    .title {
        font-size: 32px;
        color: #2A2A2A;
        text-align: center;
        padding: 20px 0;
    }

    .container {
    }

    .container .sub_title {
        font-size: 20px;
        color: #2A2A2A;
        padding: 15px 0;
    }

    .container .row {
        font-size: 16px;
    }

    .container .row .name {
        display: inline-block;
        width: 12%;
        height: 30px;
        color: #363636;
    }

    .container .row .text {
        display: inline-block;
        width: 16%;
        height: 25px;
        color: #676767;
    }

    .container .row .text2 {
        width: 28%;
    }

    .container .row .text:before {
        content: ".";
        visibility: hidden;
    }

    .container a {
        color: #459EFC;
        padding: 0 10px;
    }

    .container a:hover {
        text-decoration: underline;
    }

    .container .btn_group {
        text-align: center;
        padding: 20px 0;
    }

    .container .btn_group .item {
        display: inline-block;
        font-size: 20px;
        color: #56A7FC;
        width: 178px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        border: 1px solid #56A7FC;
        border-radius: 5px;
        cursor: pointer;
    }

    .container .btn_group .item1 {
        background-color: #56A7FC;
        color: #FFFFFF;
    }

    .container .btn_group .item1:hover {
        box-shadow: 0 3px 4px 1px rgba(149, 149, 152, 0.17);
    }

    .container .btn_group .item:hover {
        box-shadow: 0 3px 4px 1px rgba(166, 166, 169, 0.17);
    }

    .container .btn_group .item + .item {
        margin-left: 100px;
    }

    .people_info {
        border-bottom: 1px solid #E6E6E6;
        margin-bottom: 20px;
    }

    /*文字超出显示省略号*/
    .ellipsis_line_1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
    }

    .ellipsis_line_2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    /* 前台自己 */
    .jianyanjilu {
        display: inline-block;
        padding-left: 40px;
        width: 674px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
    }

    .pannel_10 {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 700px;
    }
</style>
