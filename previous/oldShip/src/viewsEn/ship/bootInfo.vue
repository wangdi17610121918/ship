<template>
    <section>
        <div class="inner">
            <div class="title">{{this.infos.name}} Vessel Details</div>
            <div class="container">
                <div class="sub_title"> Vessel Information
                    <a style="margin-left:10% ;color:#459EFC" @click="dliaogo()">Vessel File</a>
                    <a style="margin-left:2%;color:#459EFC" @click="shipGo()">Ship Dynamics</a></div>

                <div class="row">
                    <div class="name">Vessel Name:</div>
                    <div class="text text2 ">
                        <text>Power D</text>
                        {{this.infos.name}}
                    </div>
                    <div class="name">Vessel Type：</div>
                    <div class="text">{{this.infos.type}}</div>
                    <div class="name">Built：</div>
                    <div class="text" style="width:18%">{{this.infos.completeDate}}（Vessel
                        Age{{this.infos.shipAge}}years）
                    </div>
                </div>
                <div class="row">
                    <div class="name">SDWT：</div>
                    <div class="text text2">{{this.infos.loadQuantity}}</div>
                    <div class="name">Position：</div>
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
                <div class="sub_title">Contact Information</div>
                <div class="row">
                    <div class="name">Publisher：</div>
                    <div class="text text2">{{tableInfos.publishName}}</div>
                    <div class="name">Tel：</div>
                    <div class="text">{{tableInfos.mobile}}</div>
                    <div class="name">Email：</div>
                    <div class="text">{{tableInfos.email}}</div>
                </div>
                <div class="row">
                    <div class="name">Ship Owner：</div>
                    <div class="text text2">{{tableInfos.shipOwnerName}}</div>
                    <div class="name">Remaining Time：</div>
                    <div class="text">{{tableInfos.time}}</div>
                </div>
                <div class="btn_group">
                    <div class="item item1" v-if="isShow" @click="getBoot()">Chartering</div>
                    <div class="item" @click="goback()">Back</div>
                </div>
            </div>
        </div>

        <!-- 劳氏档案 -->
        <div class="pannel_body" style="display:none">
            <!-- 劳氏档案 -->
            <div class="pannel_three pannel_10">
                <div class="pannel_title">
                    <span class="name">Vessel File</span>
                    <a class="close" @click="close">×</a>
                </div>
                <div class="pannel_content">
                    <div class="column_container basic_information">
                        <div class="sub_title">Basic Information</div>
                        <div class="column_three">
                            <div class="name">Ship Name:</div>
                            <div class="text ellipsis_line_1" :title="daliao.basic.shipName">{{daliao.basic.shipName}}
                            </div>
                            <div class="name">IMO:</div>
                            <div class="text">{{daliao.basic.imo}}</div>
                            <div class="name">MMSI:</div>
                            <div class="text">{{daliao.basic.mmsi}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">Callsign:</div>
                            <div class="text">{{daliao.basic.callsign}}</div>
                            <div class="name">Ship Type:</div>
                            <div class="text ellipsis_line_1" :title="daliao.basic.shipType">{{daliao.basic.shipType}}
                            </div>
                            <div class="name">Flag:</div>
                            <div class="text">{{daliao.basic.flag}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">Gross Tonnage:</div>
                            <div class="text">{{daliao.basic.grossTonnage}}Mt</div>
                            <div class="name">DWT:</div>
                            <div class="text">{{daliao.basic.deadWeight}}Mt</div>
                            <div class="name">Service Status:</div>
                            <div class="text ellipsis_line_1" :title="daliao.basic.serviceStatus">
                                {{daliao.basic.serviceStatus}}
                            </div>
                        </div>
                        <div class="column_three">
                            <div class="name">Service Speed:</div>
                            <div class="text">{{daliao.basic.serviceSpeed}} Knots</div>
                        </div>
                    </div>
                    <div class="column_container classification_society">
                        <div class="sub_title">Classification Society</div>
                        <div class="column_three">
                            <div class="name">Flag:</div>
                            <div class="text">{{flag}}</div>
                            <div class="name">Port of Registry:</div>
                            <div class="text">{{portOfRegisttry}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">P_l:</div>
                            <div class="text" style="width:500px">{{pi}}</div>
                        </div>
                    </div>
                    <div class="column_container _dimension">
                        <div class="sub_title">Dimension</div>
                        <div class="column_three">
                            <div class="name">Lpb:</div>
                            <div class="text">{{daliao.dimension.lpb}}m</div>
                            <div class="name">Loa:</div>
                            <div class="text">{{daliao.dimension.loa}}m</div>
                            <div class="name">Breadth Extreme:</div>
                            <div class="text">{{daliao.dimension.breadthRxtreme}}m</div>
                        </div>
                        <div class="column_three">
                            <div class="name">Breadth:</div>
                            <div class="text">{{daliao.dimension.breadthMoulded}}m</div>
                            <div class="name">Depth Moulded:</div>
                            <div class="text">{{daliao.dimension.depthMoulded}}m</div>
                            <div class="name">Draught:</div>
                            <div class="text">{{daliao.dimension.draught}}m</div>
                        </div>
                    </div>
                    <!-- <div class="column_container power_equipment">
                      <div class="sub_title">Power Equipment</div>
                      <div class="column_three">
                        <div class="name">Main Engine:</div>
                        <div class="text">MAN B / W6S70MC-C</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Power:</div>
                        <div class="text">*kw</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Model:</div>
                        <div class="text">6S70MC-C</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Quantity:</div>
                        <div class="text">*</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Max Eevolution:</div>
                        <div class="text"></div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Manufacturer:</div>
                        <div class="text">*Hyundai Heavy Industries Co.Ltd</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine hp:</div>
                        <div class="text">18660hp</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Construction Time:</div>
                        <div class="text">*</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Chartered Manufacturer:</div>
                        <div class="text">*</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Shaft Power:</div>
                        <div class="text">*</div>
                      </div>
                      <div class="column_three">
                        <div class="name">Main Engine Type:</div>
                        <div class="text">DIESEL</div>
                      </div>
                    </div> -->
                    <div class="column_container _built">
                        <div class="sub_title">Built</div>
                        <div class="column_three">
                            <div class="name">Builder:</div>
                            <div class="text ellipsis_line_1">{{daliao.built.builder}}</div>
                            <div class="name">Year of Built:</div>
                            <div class="text">{{daliao.built.yearOfBuilt}}</div>
                        </div>
                        <!-- <div class="column_three">
                          <div class="name">Bonstruction Time:</div>
                          <div class="text">{{daliao.built.gzsj}}</div>
                          <div class="name">Maintain Time:</div>
                          <div class="text">{{daliao.built.bdsj}}</div>
                        </div> -->
                    </div>
                    <div class="column_container _company">
                        <div class="sub_title">Company</div>
                        <!-- <div class="column_three">
                          <div class="name">Company Name:</div>
                          <div class="text"></div>
                        </div>
                        <div class="column_three">
                          <div class="name">Role:</div>
                          <div class="text"></div>
                        </div>
                        <div class="column_three">
                          <div class="name">Date of Effect:</div>
                          <div class="text"></div>
                        </div>
                        <div class="column_three">
                          <div class="name">Company IMO:</div>
                          <div class="text"></div>
                        </div>
                        <div class="column_three">
                          <div class="name">Address:</div>
                          <div class="text"></div>
                        </div> -->
                        <div class="column_three">
                            <div class="name">Group Owner:</div>
                            <div class="text">{{daliao.companyname.own}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">Operator:</div>
                            <div class="text">{{daliao.companyname.run}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">Shipmanager:</div>
                            <div class="text">{{daliao.companyname.manage}}</div>
                        </div>
                        <div class="column_three">
                            <div class="name">Charterer:</div>
                            <div class="text">{{daliao.companyname.rent}}</div>
                        </div>
                    </div>
                    <div class="column_container survey_records">
                        <div class="sub_title">Survey Records</div>
                        <div class="column_three" v-for="classfication in daliao.classfications">
                            <div class="text">{{classfication.content}}</div>

                        </div>
                    </div>
                    <div class="column_container _PSC">
                        <div class="sub_title">PSC</div>
                        <div class="PSC_item" v-for="psc in daliao.pscs">
                            <div class="column_three">
                                <div class="name">PSC Orgnizition:</div>
                                <div class="text">{{psc.pscOrganization}}</div>
                                <div class="name">Authority:</div>
                                <div class="text">{{psc.authority}}</div>
                            </div>
                            <div class="column_three">
                                <div class="name">Port of Inspection:</div>
                                <div class="text">{{psc.portOfInspection}}</div>
                                <div class="name">Type of Inspection:</div>
                                <div class="text">{{psc.typeOfInspection}}</div>
                            </div>
                            <div class="column_three">
                                <div class="name">Detention:</div>
                                <div class="text">{{psc.detention}}</div>
                                <div class="name">Duration Days:</div>
                                <div class="text">{{psc.durationDays}}</div>
                            </div>
                            <div class="column_three">
                                <div class="name">Number of Deficiencies:</div>
                                <div class="text">{{psc.numberOfDeficiencies}}</div>
                                <div class="name">Date of Report:</div>
                                <div class="text">{{psc.dateOfReport}}</div>
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
                type: '',//判断从那个页面来
                flag: '',
                portOfRegisttry: '',
                pi: "",
                mmsi: '',
                daliao: {
                    basic: {},

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
                        this.tableInfo = res.datas.contactList
                        this.imo = res.datas.imo
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
                $('.pannel_body').css("display", 'block');
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
                    this.mmsi = this.$own.getHref('mmsi');
                    this.type = this.$own.getHref('type')
                }
            },
            userdata() {
                userLoad().then((res) => {
                    if (res.status == 0) {
                        var userData = res.datas;
                        if (userData) {
                            var flag1 = false;
                            if (userData.roles != null) {
                                for (var i = 0; i < userData.roles.length; i++) {
                                    var role = userData.roles[i];
                                    if (role == 'sales_trader' || role == 'buy_trader' || role == 'charterer' || role == 'trade_executor') {
                                        flag1 = true
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
    .pannel_10 {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 700px;
    }
</style>
