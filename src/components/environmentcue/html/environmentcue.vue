<template>
    <div class="environmentcue">
        <el-container>
            <div class="aside-parent">
                <el-aside id="gpsaside" class="el-aside-nav" width="200px" style="overflow:hidden">
                    <el-menu
                    :default-openeds="['1']"
                    default-active="1-0"
                    class="el-menu-vertical-demo"
                    background-color="#293950"
                    text-color="#fff"
                    active-text-color="#e45823">
                        <el-submenu index="1">
                            <template slot="title">
                                <i>
                                    <img src="@/assets/img/nav003.png" alt="">
                                </i>
                                <span>塔吊管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item @click="constructioncfn(construc.equipment_name)" :index="'1-'+cindex" v-for="(construc,cindex) in constructioncdata" :key="cindex">
                                    {{ construc.equipment_name }}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </div>
            <!-- <el-header>
              <div>
                <select @change="constructioncfn" v-model="constructionc">
                    <option disabled value="">请选择设备</option>
                    <option v-for="(construc,cindex) in constructioncdata" :key="cindex" :value="construc.equipment_name">
                        {{ construc.equipment_name }}
                    </option>
                </select>
                  {{constructionc}}
              </div>
            </el-header> -->
            <el-main>
                <el-row>
                    <el-col :span="4"><img src="@/assets/img/environment_weath.png" alt=""></el-col>
                    <el-col class="el-type" :span="8">
                        <div>温度</div>
                        <div><span>当前状态：</span><span :style="{color:linktype?'green':'#f00'}">{{linktype?"已连接":"未连接"}}</span></div>
                        <div><span>更新时间：</span><span>{{defauldata==null?"":defauldata.sendtime}}</span></div>
                    </el-col>
                    <el-col :span="4" v-if="defauldata==null?false:true"><span class="el-temperature">{{defauldata==null?"":defauldata.temperature}}</span><span>℃</span></el-col>
                    <el-col class="el-data" :span="8"><span @click="realtimeline(1)">实时曲线</span><span @click="hostroitimeline(1)">历史查询</span></el-col>
                </el-row>
                <transition v-if="linktype" name="fade">
                    <el-row class="datashow" v-show="show1">
                        <div id="myChart1" class="echarts"></div>
                    </el-row>
                </transition>
                <el-dialog
                    title="历史曲线"
                    :visible.sync="dialogVisible"
                    width="70%"
                    :before-close="handleClose">
                    <div class="main">
                        <div class="block">
                            <span class="demonstration">{{hostroiname}}历史查询：</span>
                            <el-form :inline="true">
                                <el-form-item>
                                    <el-date-picker
                                        v-model="dates"
                                        type="datetimerange"
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                        :default-time="['00:00:00', '23:59:59']"
                                        align="right"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        :picker-options="pickerOptions2"
                                        @change="query"
                                        @focus="datatype">
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div id="histrori" class="temperature"></div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">退 出</el-button>
                    </span>
                </el-dialog>
                <el-row>
                    <el-col :span="4"><img src="@/assets/img/environment_humidity.png" alt=""></el-col>
                    <el-col class="el-type" :span="8">
                        <div>湿度</div>
                        <div><span>当前状态：</span><span :style="{color:linktype?'green':'#f00'}">{{linktype?"已连接":"未连接"}}</span></div>
                        <div><span>更新时间：</span><span>{{defauldata==null?"":defauldata.sendtime}}</span></div>
                    </el-col>
                    <el-col :span="4" v-if="defauldata==null?false:true"><span class="el-temperature">{{defauldata==null?"":defauldata.humidity}}</span><span>RH</span></el-col>
                    <el-col class="el-data" :span="8"><span @click="realtimeline(2)">实时曲线</span><span @click="hostroitimeline(2)">历史查询</span></el-col>
                </el-row>
                <transition v-if="linktype" name="fade">
                    <el-row class="datashow" v-show="show2">
                        <div id="myChart2" class="echarts"></div>
                    </el-row>
                </transition>
                <el-row>
                    <el-col :span="4"><img src="@/assets/img/environment_illumination.png" alt=""></el-col>
                    <el-col class="el-type" :span="8">
                        <div>光照</div>
                        <div><span>当前状态：</span><span :style="{color:linktype?'green':'#f00'}">{{linktype?"已连接":"未连接"}}</span></div>
                        <div><span>更新时间：</span><span>{{defauldata==null?"":defauldata.sendtime}}</span></div>
                    </el-col>
                    <el-col :span="4" v-if="defauldata==null?false:true"><span class="el-temperature">{{defauldata==null?"":defauldata.illumination}}</span><span>LUX</span></el-col>
                    <el-col class="el-data" :span="8"><span @click="realtimeline(3)">实时曲线</span><span @click="hostroitimeline(3)">历史查询</span></el-col>
                </el-row>
                <transition v-if="linktype" name="fade">
                    <el-row class="datashow" v-show="show3">
                        <div id="myChart3" class="echarts"></div>
                    </el-row>
                </transition>
                <el-row>
                    <el-col :span="4"><img src="@/assets/img/environment_noised.png" alt=""></el-col>
                    <el-col class="el-type" :span="8">
                        <div>噪音</div>
                        <div><span>当前状态：</span><span :style="{color:linktype?'green':'#f00'}">{{linktype?"已连接":"未连接"}}</span></div>
                        <div><span>更新时间：</span><span>{{defauldata==null?"":defauldata.sendtime}}</span></div>
                    </el-col>
                    <el-col :span="4" v-if="defauldata==null?false:true"><span class="el-temperature">{{defauldata==null?"":defauldata.noise}}</span><span>db</span></el-col>
                    <el-col class="el-data" :span="8"><span @click="realtimeline(4)">实时曲线</span><span @click="hostroitimeline(4)">历史查询</span></el-col>
                </el-row>
                <transition v-if="linktype" name="fade">
                    <el-row class="datashow" v-show="show4">
                        <div id="myChart4" class="echarts"></div>
                    </el-row>
                </transition>
                <el-row>
                    <el-col :span="4"><img src="@/assets/img/environment_pm2.5.png" alt=""></el-col>
                    <el-col class="el-type" :span="8">
                        <div>PM2.5</div>
                        <div><span>当前状态：</span><span :style="{color:linktype?'green':'#f00'}">{{linktype?"已连接":"未连接"}}</span></div>
                        <div><span>更新时间：</span><span>{{defauldata==null?"":defauldata.sendtime}}</span></div>
                    </el-col>
                    <el-col :span="4" v-if="defauldata==null?false:true"><span class="el-temperature">{{defauldata==null?"":defauldata.pm2}}</span><span>ug/m3</span></el-col>
                    <el-col class="el-data" :span="8"><span @click="realtimeline(5)">实时曲线</span><span @click="hostroitimeline(5)">历史查询</span></el-col>
                </el-row>
                <transition v-if="linktype" name="fade">
                    <el-row class="datashow" v-show="show5">
                        <div id="myChart5" class="echarts"></div>
                    </el-row>
                </transition>
                <el-row>
                    <el-col :span="4"><img src="@/assets/img/dustproof.png" alt=""></el-col>
                    <el-col class="el-type" :span="8">
                        <div>PM10</div>
                        <div><span>当前状态：</span><span :style="{color:linktype?'green':'#f00'}">{{linktype?"已连接":"未连接"}}</span></div>
                        <div><span>更新时间：</span><span>{{defauldata==null?"":defauldata.sendtime}}</span></div>
                    </el-col>
                    <el-col :span="4" v-if="defauldata==null?false:true"><span class="el-temperature">{{defauldata==null?"":defauldata.pm10}}</span><span>ug/m3</span></el-col>
                    <el-col class="el-data" :span="8"><span @click="realtimeline(6)">实时曲线</span><span @click="hostroitimeline(6)">历史查询</span></el-col>
                </el-row>
                <transition v-if="linktype" name="fade">
                    <el-row class="datashow" v-show="show6">
                        <div id="myChart6" class="echarts"></div>
                    </el-row>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            regionid:Number,
            linktype:false,
            temperatureshow: false,
            show1:false,
            show2:false,
            show3:false,
            show4:false,
            show5:false,
            show6:false,
            dialogVisible: false,
            hostroiname:'',
            weathtime: [],
            weathdata: [],
            humiditydata: [],
            illuminationdata: [],
            noisedata: [],
            pm2_5data: [],
            pm10data: [],
            humiditytime: [],
            illuminationtime: [],
            noisetime: [],
            pm2_5time: [],
            pm10time: [],
            defauldata:null,
            stTime: "",
            enTime: "",
            pickerOptions2: this.timelist,
            dates: [],
            constructioncid:1,
            constructioncdata:[],
            enviromentalid: Number,
            //有数据的日期颜色
            starttimevalue: '',
            endtimevlaue: '',
            havedate : [],
        };
    },
    created() {
        this.regionid = sessionStorage.getItem("regionid");
    },
    mounted() {
        this.constructionfn();     //根据选择的工地去查找设备，并显示
        this.echartsinfo();
        let startTime = this.setPartTime() + " 00:00:00";
        let endTime = this.setPartTime() ? this.setAllTime() : this.setPartTime() + " 23:59:59";
        this.dates = [startTime, endTime];
        // setTimeout(()=>{
        //     this.temperature();
        // },1000)
        // this.realdata = setInterval(()=>{
        //     this.temperature();
        // },3000)
        

        this.requesthavetime();
    },
    methods: {
        constructioncfn(val){
            //通过下拉列表的change事件去请求选中的设备数据
            console.log(val)
            this.constructioncdata.forEach(element => {
                if(element.equipment_name == val){
                this.weathtime=[];
                this.weathdata=[];
                this.humiditydata=[];
                this.illuminationdata=[];
                this.noisedata=[];
                this.pm2_5data=[];
                this.pm10data=[];
                this.humiditytime=[];
                this.illuminationtime=[];
                this.noisetime=[];
                this.pm2_5time=[];
                this.pm10time=[];
                this.enviromentalid = element.enviromental_id;
                this.temperature();
                }
            })
        },
        constructionfn(){
            //根据选择的工地去查找设备，并显示
            this.$api.withConstructionNumberResInfo({
                params:{
                    regionid:this.regionid
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.constructioncdata = res.data.result;
                    this.enviromentalid = res.data.result[0].enviromental_id;
                    console.log(this.enviromentalid)
                    this.temperature();
                }   
                // console.log(res.data.result)
                })
        },
        realtimeline(num){
            //实时曲线的显示状态与隐藏状态
            if(num==1){
                    this.show1 = !this.show1;
                    this.weathtime = [];
                    this.weathdata = [];
                }else if(num==2){
                    this.show2 = !this.show2;
                    this.humiditydata = [];
                    this.humiditytime = [];
                }else if(num==3){
                    this.show3 = !this.show3;
                    this.illuminationdata =[];
                    this.illuminationtime =[];
                }else if(num==4){
                    this.show4 = !this.show4;
                    this.noisedata = [];
                    this.noisetime = [];
                }else if(num==5){
                    this.show5 = !this.show5;
                    this.pm2_5data = [];
                    this.pm2_5time = [];
                }else if(num==6){
                    this.show6 = !this.show6;
                    this.pm10data = [];
                    this.pm10time = [];
                }
            },
        hostroitimeline(num){
            //历史查询的显示状态
                if(num==1){
                    this.hostroiname = '温度';
                }else if(num==2){
                    this.hostroiname = '湿度';
                }else if(num==3){
                    this.hostroiname = '光照';
                }else if(num==4){
                    this.hostroiname = '噪音';
                }else if(num==5){
                    this.hostroiname = 'PM2.5';
                }else if(num==6){
                    this.hostroiname = 'PM10';
                }
                this.dialogVisible = true;
                setTimeout(this.query,1);
            },
        datashow() {
            this.temperatureshow=!this.temperatureshow;
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        temperature() {
            //根据设备编号请求最新一条信息
            console.log('启用定时器')
            if(this.show1 == false){
                this.weathtime=[];
                this.weathdata=[];
            };
            if(this.show2 == false){
                this.humiditydata = [];
                this.humiditytime = [];
            };
            if(this.show3 == false){
                this.illuminationdata =[];
                this.illuminationtime =[];
            };
            if(this.show4 == false){
                this.noisedata = [];
                this.noisetime = [];
            };
            if(this.show5 == false){
                this.pm2_5data = [];
                this.pm2_5time = [];
            };
            if(this.show6 == false){
                this.pm10data = [];
                this.pm10time = [];
            };
            console.log(this.enviromentalid)
            //查找该设备编号的最新一条的环境监控所有数据
            this.$api.seekMachineNumberNewEnvironmentalData({
                params:{
                    enviromental_id:this.enviromentalid
                }
            }).then(res => {
                console.log(res.data.result)
                if(res.data.code==200){
                    if(res.data.result == null){
                        this.linktype = false;
                        // clearInterval(this.realdata);
                        return false;
                    };
                    this.linktype = true;
                    this.defauldata = res.data.result;
                    this.weathtime.push(this.defauldata.sendtime);
                    this.weathdata.push(this.defauldata.temperature);
                    this.humiditydata.push(this.defauldata.humidity);
                    this.illuminationdata.push(this.defauldata.illumination);
                    this.noisedata.push(this.defauldata.noise);
                    this.pm2_5data.push(this.defauldata.pm2);
                    this.pm10data.push(this.defauldata.pm10);
                    this.humiditytime.push(this.defauldata.sendtime);
                    this.illuminationtime.push(this.defauldata.sendtime);
                    this.noisetime.push(this.defauldata.sendtime);
                    this.pm2_5time.push(this.defauldata.sendtime);
                    this.pm10time.push(this.defauldata.sendtime);
                    this.myChart1.setOption({
                        xAxis: [{data: this.weathtime}],
                        series: [{data: this.weathdata}]
                    });
                    this.myChart2.setOption({
                        xAxis: [{data: this.humiditytime}],
                        series: [{data: this.humiditydata}]
                    });
                    this.myChart3.setOption({
                        xAxis: [{data: this.illuminationtime}],
                        series: [{data: this.illuminationdata}]
                    });
                    this.myChart4.setOption({
                        xAxis: [{data: this.noisetime}],
                        series: [{data: this.noisedata}]
                    });
                    this.myChart5.setOption({
                        xAxis: [{data: this.pm2_5time}],
                        series: [{data: this.pm2_5data}]
                    });
                    this.myChart6.setOption({
                        xAxis: [{data: this.pm10time}],
                        series: [{data: this.pm10data}]
                    });
                }      
            })
        },
        echartsinfo(){
            // 基于准备好的dom，初始化echarts实例
            this.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
            this.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
            this.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
            this.myChart4 = this.$echarts.init(document.getElementById("myChart4"));
            this.myChart5 = this.$echarts.init(document.getElementById("myChart5"));
            this.myChart6 = this.$echarts.init(document.getElementById("myChart6"));
            // 绘制图表
            this.myChart1.setOption({
                title: { text: "今日温度变化" },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        axis: "x"
                    }
                },
                xAxis: {
                data: []
                },
                yAxis: {},
                series: [{
                    name: "温度",
                    type: "line",
                    data: []
                }]
            });
            this.myChart2.setOption({
                title: { text: "今日湿度变化" },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        axis: "x"
                    }
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: "湿度",
                    type: "line",
                    data: []
                }]
            });
            this.myChart3.setOption({
                title: { text: "今日光照变化" },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        axis: "x"
                    }
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: "光照",
                    type: "line",
                    data: []
                }]
            });
            this.myChart4.setOption({
                title: { text: "今日噪音变化" },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        axis: "x"
                    }
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: "噪音",
                    type: "line",
                    data: []
                }]
            });
            this.myChart5.setOption({
                title: { text: "今日PM2.5变化" },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        axis: "x"
                    }
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: "PM2.5",
                    type: "line",
                    data: []
                }]
            });
            this.myChart6.setOption({
                title: { text: "今日PM10变化" },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        axis: "x"
                    }
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: "PM10",
                    type: "line",
                    data: []
                }]
            });
        },
        query() {
            //历史查询数据请求
            let myChart = this.$echarts.init(document.getElementById("histrori"));
            var times = [];
            var temperature = [];
            var humidity = [];
            var illumination = [];
            var noise = [];
            var pm2_5 = [];
            var pm10 = [];
            var stTime = this.dates[0];
            var enTime = this.dates[1];
            //get根据设备编号查找时间到另一个时间的环境监控数据
            console.log(stTime,enTime,this.enviromentalid)
            this.$api.seekDatesEnvironmentalMonitoringData("?startTime="+stTime+"&endTime="+enTime+"&enviromental_id=" + this.enviromentalid).then((response) => {
                // console.log(response)
                console.log(response)
                if(response.data.result.length==0){
                    this.$message({
                        message: '本时间段没有数据',
                        type: 'warning'
                    });
                }
                if(response.data.code==200){
                    times=[];
                    temperature=[];
                    humidity=[];
                    illumination=[];
                    noise=[];
                    pm2_5=[];
                    pm10=[];
                    if(response.data.result!=null){
                        response.data.result.forEach(element => {
                            times.push(element.sendtime);
                            temperature.push(element.temperature);
                            humidity.push(element.humidity);
                            illumination.push(element.illumination);
                            noise.push(element.noise);
                            pm2_5.push(element.pm2);
                            pm10.push(element.pm10);
                        });
                    }
                    
                    var modeldata,
                    dataname;
                    if(this.hostroiname=='温度'){
                        modeldata = temperature;
                        dataname = '℃';
                    }else if(this.hostroiname=='湿度'){
                        modeldata = humidity;
                        dataname = 'RH';
                    }else if(this.hostroiname=='光照'){
                        modeldata = illumination;
                        dataname = 'LUX';
                    }else if(this.hostroiname=='噪音'){
                        modeldata = noise;
                        dataname = 'db';
                    }else if(this.hostroiname=='PM2.5'){
                        modeldata = pm2_5;
                        dataname = 'ug/m3';
                    }else if(this.hostroiname=='PM10'){
                        modeldata = pm10;
                        dataname = 'ug/m3';
                    }
                    myChart.setOption({
                        title: {
                            text: "历史" + this.hostroiname + "变化曲线"
                        },
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                axis: "x"
                            },
                            // formatter:(params) => {
                            //     console.log(params)
                            // }
                        },
                        legend: {
                            data: [this.hostroiname]
                        },
                        dataZoom: {
                            show: true,
                            realtime: true,
                            showDetail: true,
                            y: 36,
                            height: 20,
                            start: 10,
                            end: 20,
                            top: "bottom"
                        },
                        xAxis: {
                            data: times,
                            axisLabel: {
                                show: true
                            }
                        },
                        yAxis: {
                            type:'value',
                            axisLabel:{formatter:'{value}'+dataname}
                        },
                        series: [{
                            // 根据名字对应到相应的系列
                            name: this.hostroiname,
                            type: "line",
                            data: modeldata
                        }]
                    });
                }
                
            }).catch(function(error) {
                console.log(error);
                alert("图表请求数据失败!");
                myChart.hideLoading();
            });
        },

        datatype(){
            setTimeout(() =>{
                console.log(5555555555)
                var buttonelement = document.getElementsByClassName("el-picker-panel__icon-btn");
                for(let i=0;i<buttonelement.length;i++){
                    buttonelement[i].onclick = () => {
                        setTimeout(() => {this.changeredfn()},10);
                    }
                };
                this.changeredfn();
            },10)
        },
        changeredfn(){
            //将有数据的天数变为红色
            //获取页面的年月
            // var dateelement = document.getElementsByClassName("el-date-range-picker__header");
            // console.log(dateelement)
            // for(let o=0;o<dateelement.length;o++){
            //     var year = dateelement[o].getElementsByTagName("div")[0].innerHTML.substring(0,4);
            //     var months = dateelement[o].getElementsByTagName("div")[0].innerHTML.substring(7,8);
            //     console.log(dateelement[o].nextSbiling.spanelement[i])



                // this.havedate.forEach(element => {
                //     if(year == element.substring(0,4) && months == element.substring(6,7)){
                //         var day = element.substring(8,10);
                //         if(day<10){
                //             day = element.substring(8,10).substring(1);
                //         };
                //         var spanelement = document.getElementsByClassName("available");
                //         for(let i=0;i<spanelement.length-10;i++){
                //             dateelement[o].nextSbiling.spanelement[i].children[0].children[0].style.color="#000";
                //         };
                //         setTimeout(() => {
                //             for(let i=0;i<spanelement.length-10;i++){
                //             if(spanelement[i].children[0].children[0].innerText==day){
                //                 dateelement[o].nextSbiling.spanelement[i].children[0].children[0].style.color="#f00";
                //             }
                //         }
                //         },10)
                        
                //     }else{
                //         var spanelement = document.getElementsByClassName("available");
                //         for(let i=0;i<spanelement.length-10;i++){
                //             dateelement[o].nextSbiling.spanelement[i].children[0].children[0].style.color="#000";
                //         };
                //         var spanelement2 = document.getElementsByClassName("normal");
                //         for(let i=0;i<spanelement2.length;i++){
                //             dateelement[o].nextSbiling.spanelement2[i].children[0].children[0].style.color="#ccc";
                //         };
                //         var spanelement3 = document.getElementsByClassName("prev-month");
                //         for(let i=0;i<spanelement3.length;i++){
                //             dateelement[o].nextSbiling.spanelement3[i].children[0].children[0].style.color="#ccc";
                //         };
                //     }
                // });
                // // console.log(document.getElementsByClassName("today")[0].children[0].children[0])
                // if(document.getElementsByClassName("today")[0].children[0].children[0]!=undefined){
                //     document.getElementsByClassName("today")[0].children[0].children[0].style.color="blue"
                // }

            // }
        },
        requesthavetime(){
            this.$api.withMachineNumberHasDataDayPost("?enviromentalid=2").then(res => {
                console.log(res)
                this.havedate = res.data.result;
            })
        }
    },
    beforeDestroy() {
      clearInterval(this.realdata);
    },
}
</script>

<style>
.environmentcue{
    height: 100%;
    padding-right: 240px;
    color: #000000;
}
.environmentcue .el-header{
    height: 65px!important;
    border-bottom: 1px solid #ccc;
    text-align: left;
    padding: 10px 0 0 0;
}
.environmentcue .el-container{
    height: 100%;
    display: flex
}
.environmentcue .el-menu{
    border: none;
}
.el-aside-navchange{
    position: absolute;
    height: 40px;
    top: 60px;
    background: #293950;
}
.environmentcue li li{
    width: 100%;
    padding: 0px!important;
}
.environmentcue .el-menu div{
    width: 200px;
    padding-top: 0px;
    padding-bottom: 0px;
}
.environmentcue .el-submenu__title{
    height: 40px;
    line-height: 40px;
}
.el-aside-nav{
    position: relative;
    height: 100%;
    top: -40px;
    background: #293950;
    /* border-bottom: 40px solid #293950; */
}
.environmentcue .aside-parent{
    background: #293950;
}
.environmentcue .aside-parent img{
    padding-right: 20px;
}
.environmentcue .aside-parent+.el-main{
    height: 100%;
    overflow:auto;
}
.environmentcue .aside-parent+.el-main::-webkit-scrollbar{
    display: none;
}
.environmentcue .el-header select{
    width: 180px;
    height: 42px;
    border: 3px solid #000;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    padding-left: 10px;
    outline: none;  
    border: solid 1px #000;    
    appearance:none;  
    -moz-appearance:none;  
    -webkit-appearance:none;
    background: url('~@/assets/img/environment_select.png') no-repeat scroll right center transparent;   
    padding-right: 14px;  
}  
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/  
.environmentcue .el-header select::-ms-expand { 
    display: none; 
}
.environmentcue .el-row{
    height: 16.4%;
    border-bottom: 1px solid #999;
    /* line-height: 100px; */
    padding: 10px 0px;
}
.environmentcue img{
    /* width: 100px; */
    height: 100%;
    
}
.environmentcue .el-col{
    height: 100%;
}
.environmentcue .el-col-4 span:nth-child(1){
    display: inline-block;
    font-size: 32px;
}
.environmentcue .el-col-4 span:nth-child(2){
    display: inline-block;
    font-size: 18px;
    margin-left: 10px;
}
.environmentcue .el-type{
    height: 100%;
    /* line-height: 33%; */
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* align-items: center; */
}
.environmentcue .el-type div:nth-child(1){
    
    font-size: 20px;
    height: 30%;
    vertical-align: top;
    /* flex: 5; */
    /* line-height: 25px; */
    /* margin: 5px 0 10px 0; */
}
.environmentcue .el-type div:nth-child(2){
    font-size: 14px;
    color: #999894;
    height: 40%;
    /* line-height: 100%; */
    /* flex:7; */
}
.el-type div:nth-child(2) span:nth-child(2){
    font-size: 14px;
    
    /* color: #f00; */
}
.environmentcue .el-type div:nth-child(3){
    font-size: 14px;
    color: #999894;
    height: 40%;
    /* line-height: 100%; */
    /* flex:7; */
}
.environmentcue .el-data{
    display: flex;
}
.environmentcue .el-data span{
    display: inline-block;
    font-size: 18px;
    margin-left: 10px;
    color: cadetblue;
    cursor: pointer;
    display: flex;
    height: 100%;
    /* width: 50%; */
    align-items: center;
}
.environmentcue .echarts{
    width: 900px;
    height: 350px;
    padding:10px 0px 0px 10%;
}
.environmentcue .datashow{
    /* background: #999; */
    height: 400px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
}
/* -------------历史曲线------------- */
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
.fade-enter, .fade-leave-to{
    opacity:0;
  height: 0;
}
.environmentcue .el-dialog__wrapper{
    overflow: hidden;
}
.environmentcue .el-dialog{
    /* width: 1000px!important; */
    margin: auto;
    height: 100%;
    top: -70px;
}
.environmentcue .el-dialog__title{
    font-size: 24px;
    font-weight: 700;
}
.environmentcue .el-form{
    display: inline-block;
    vertical-align: top;
}
.environmentcue .block{
    text-align: left;
    padding-left: 50px;
}
.environmentcue .block .demonstration{
    display: inline-block;
    font-size: 20px;
    margin-top: 10px;
}
.environmentcue .main{
    width: 100%;
}
.environmentcue .temperature{
    width: 90%;
    height: 600px;
    /* border:1px solid salmon; */
    margin-left: 50px;
}
.environmentcue .el-picker-panel{
  left: 25%!important;
}
.environmentcue .el-data{
  float: right;
}
</style>
