<template>
    <div class="index">
        <div class="index-main">
            <div class="index-left">
                <div class="fillet-left datashow" id="datastatistics">
                    <div class="data-title">
                        <p>
                            数据统计
                        </p>
                        <div>
                            <span></span>
                        </div>
                    </div>
                    <div class="datashow-center">
                        <div class="el-indexdata-left">
                            <div>
                                <span class="onstruction-condition-type">建筑面积<br /><span><span>{{constructiondata==null? 1000:constructiondata.coveredArea}}</span>㎡</span></span>
                                <span class="onstruction-condition-type">合同工期<br /><span><span>{{constructiondata==null? 600:constructiondata.contractPeriod}}</span>天</span></span>
                            </div>
                            <div>
                                <span class="onstruction-condition-type">施工状态<br /><span><span>{{constructiondata==null? '正在施工':constructiondata.engineeringState }}</span></span></span>
                                <span class="onstruction-condition-type">工程类别<br /><span><span>{{constructiondata==null? '房建类':constructiondata.engineeringCategoryname }}</span></span></span>
                            </div>
                        </div>
                        <div class="onstruction-date" v-show="this.remaindays>=0">剩余<span>{{constructiondata==null? 100:constructiondata.distanceEnddate}}</span>天</div>
                        <div class="onstruction-percentage">
                            <div class="onstruction-percentage-progress">
                                <el-progress :text-inside="true" :stroke-width="16" :percentage="constructiondata==null? 80.12:constructiondata.constructionPercentage" color="#0066ad"></el-progress>
                            </div>
                        </div>
                        <div class="onstruction-percentage">
                            <span>{{constructiondata==null? '2017-09-30':constructiondata.contractStarttime }}</span>
                            <span>{{constructiondata==null? '2018-12-31':constructiondata.contractEndtime }}</span>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div class="fillet-left datashow" id="weathermanage">
                    <div class="data-title">
                        <p>天气管理</p>
                        <div>
                            <span></span>
                        </div>
                    </div>
                    <div class="datashow-center">
                        <div class="weather">
                            <span>杭州<br>晴</span>
                            <span></span>
                            <span>31~35℃</span>
                        </div>
                        <div>
                            明天天气预报：<span>31~38℃</span><span>  晴天</span>
                        </div> 
                    </div>
                    <div></div>
                </div>
                <div class="fillet-left datashow" id="workmanage">
                    <div class="data-title">
                        <p>考勤管理</p>
                        <div>
                            <span></span>
                        </div>
                    </div>
                    <div class="work-container">
                        <el-progress type="circle" show-text :width="160" :stroke-width="23" :percentage="88" color="#3d74c2"></el-progress>
                        <div>
                            <div>
                                <span>考勤总数：</span><span>128</span>
                            </div>
                            <div>
                                <span>合格数：</span><span>103</span>
                            </div>
                            <div>
                                <span>已通过：</span><span>15</span>
                            </div>
                            <div>
                                <span>未通过：</span><span>15</span>
                            </div>
                        </div>
                    </div>
                    <p>考勤率</p>    
                    <div></div>
                </div>
            </div>
            <div class="index-center">
                <img class="showimg" src="@/assets/img/index_center.png" alt="">
            </div>
            <div class="index-right">
                <div class="fillet-left datashow" id="newdynamic">
                    <div class="data-title">
                        <p>最新动态</p>
                        <div>
                            <span></span>
                        </div>
                    </div>
                    <el-table
                        :data="tableData"
                        :show-header="false"
                        style="width: 90%">
                            <el-table-column
                                prop="news"
                                label="设备SN">
                            </el-table-column>
                    </el-table>
                </div>
                <div class="fillet-left datashow" id="datastatistics">
                    <div class="data-title">
                        <p>环境监测</p>
                        <div>
                            <span></span>
                        </div>
                    </div> 
                    <div class="datashow-center">
                        <div class="onstruction-environment">
                            <div><span>温度：</span><span>{{defauldata==null?"0":defauldata.temperature}} ℃</span><span>湿度：</span><span>{{defauldata==null?"0":defauldata.humidity}} RH</span></div>
                            <div><span>光照：</span><span>{{defauldata==null?"0":defauldata.illumination}} LUX</span><span>噪音：</span><span>{{defauldata==null?"0":defauldata.noise}} db</span></div>
                            <div><span>PM2.5：</span><span>{{defauldata==null?"0":defauldata.pm2}} ug/m3</span><span>PM10：</span><span>{{defauldata==null?"0":defauldata.pm10}} ug/m3</span></div>
                            <div><span>更新时间：</span><span>{{defauldata==null?'2018-07-02 14:53:08':defauldata.sendtime}}</span></div>
                        </div>  
                    </div>
                    <div></div>
                </div>
                <div class="fillet-left datashow" id="safemanage">
                    <div class="data-title">
                        <p>安全管理</p>
                        <div>
                            <span></span>
                        </div>
                    </div> 
                    <div class="safe-center">
                        <el-progress type="circle" show-text :width="160" :stroke-width="23" :percentage="88" color="#3d74c2"></el-progress>
                        <div>
                            <div>
                                <span>考勤总数：</span><span>128</span>
                            </div>
                            <div>
                                <span>合格数：</span><span>103</span>
                            </div>
                            <div>
                                <span>已通过：</span><span>15</span>
                            </div>
                            <div>
                                <span>未通过：</span><span>15</span>
                            </div>
                        </div>
                    </div>
                    <p>考勤率</p> 
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import indexbg from '@/assets/img/indexbg.png'
export default {
    data(){
        return{
            regionid:Number,
            tableData: [],
            enviromentalid: 2,
            defauldata: null,
            constructiondata: null,
            remaindays:0,
            indexbg:indexbg,
        }
    },
    created(){
        this.regionid = sessionStorage.getItem("regionid");
        //页面刚进入时开启长连接
        this.initWebSocket()
    },
    mounted(){
        this.bordercss();
        this.toselectArchitecture();//根据工地查询是否有设置工地数据
        this.towerrrequest();//000000000//右上角的数据展示
        this.defaultrequest();//根据设备编号请求最新一条坏境信息
        this.realdata = setInterval(()=>{
          this.towerrrequest();
        },60000);
    },
    methods:{
        initWebSocket(){ //初始化weosocket
            this.websock = new WebSocket("ws://60.191.29.210:9090/RestIOTAPI/websocket");
            // this.websock.onopen = this.websocketonopen;
            // this.websock.onerror = this.websocketonerror;
            this.websock.onmessage = this.websocketonmessage; 
            this.websock.onclose = this.websocketclose;
        },
        websocketonmessage(e){ //数据接收
            // console.log(e.data)
            this.tableData.push({"news":e.data})
            // console.log(this.tableData)
            // const redata = JSON.parse(e.data);
            // console.log(redata.value);
        },
        websocketclose(e){

        },
        constructionfn(){
        //根据选择的工地去查找设备
            this.$api.withConstructionNumberResInfo({
                params:{
                    regionid : this.regionid
                }
            }).then(res => {
                // console.log(res)
                if(res.data.code==200){
                    this.enviromentalid = res.data.result[0].enviromental_id;
                }
            })
        },
        toselectArchitecture(){
            //根据工地查询是否有设置工地数据*
            // console.log(55555555555)
            this.$api.seekArchitectureData({
                params:{
                    regionid : this.regionid
                }
            }).then(res => {
                // console.log(res)
                if(res.data.code==200){
                    this.constructiondata = res.data.result;
                    this.remaindays = res.data.result.distanceEnddate;
                }
            })
        },
        defaultrequest(){
        //根据设备编号请求最新一条坏境信息
            this.$api.seekMachineNumberNewEnvironmentalData({
                params:{
                    enviromental_id:this.enviromentalid
                }
            }).then(res => {
                if(res.data.code==200){
                    this.defauldata = res.data.result;
                }
            })
        },
        towerrrequest(){
            //右上角的数据展示
            // this.$api.seekNewsType({
            //     params:{
            //         'strip' : 3
            //     }
            // }).then(res => {
            //     console.log(res)
            //     if(res.data.code==200){
            //         this.tableData = [];
            //         this.tableData = res.data.result;
            //     }
            // })
        },
        bordercss(){
            //边框右边角
            var fillet = document.getElementsByClassName('fillet-left');
            for (let i = 0; i < fillet.length; i++) {
                var odiv = document.createElement('div');
                odiv.className = 'fillet-right';
                fillet[i].appendChild(odiv);
            }
            //监控数据框的间距
            // var bodyheight = document.body.offsetHeight-122;
            // var filletheight = document.getElementsByClassName("fillet-left")[0].offsetHeight;
            // document.getElementsByClassName("index")[0].style.height=bodyheight+'px';
            // for (var i=0;i<document.getElementsByClassName("fillet-left").length;i++){
            //     document.getElementsByClassName("fillet-left")[i].style.marginBottom=(bodyheight-3*filletheight)/3+'px';
            // }
            // document.getElementsByClassName("showimg")[0].style.height=bodyheight-60+'px';//中间图片高度
        }
    },
    beforeCreate () {
        document.querySelector('body').className="bg";
    },
    beforeUpdate () {
        document.querySelector('body').className="bg";
    },
    beforeDestroy() {
        document.querySelector('body').removeAttribute('class');
        clearInterval(this.realdata);
        //页面销毁时关闭长连接
        this.websocketclose();
    },
}
</script>

<style>
@import "../css/boeder.css";
.bg{
    background: url('~@/assets/img/indexbg.png') no-repeat;
    background-size: 100% 100%;
}
.index{
    /* min-height: 1000; */
    height: 100%;
    padding-right:50px;
    display: flex;
    justify-content: space-between;
}
.index-left,.index-right{
    width: 27%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.index-center{
    width: 40%;
    height: 100%;
}
.index-main{
    flex: 1;
    display: flex;
    justify-content: space-between;
}
/* ---------数据统计设置按钮------- */
.el-center{
    position: absolute;
    width: 100%;
    top:0px;
    right: 0px;
    height: 20px;
    /* background: #ccc; */
    border-radius: 5px;
    z-index: 100;
}
.setupbutton{
    width: 60px;
    height: 30px;
    border-radius: 5px;
    outline: none;
    vertical-align: top;
    float: right;
    background: steelblue;
    border: 1px solid #68b1ef;
    color: #fff;
    margin-right: 16px;
}
.el-setup{
    width: 100%;
    position: relative;
    background: #68b1ef;
    vertical-align: top;
    top: 0px;
    left: 0px;
    border-radius: 5px;
}
.el-form{
    clear: both;
}
.el-text-type{
    text-align: left;
    padding-left: 10px;
}
.el-setup label{
    color: #fff;
    width: 20%!important;
}
.el-form-item__content{
    margin-left: 20%!important;
}
.el-setup .el-select{
    float: left;
}
.unit-span{
    float: left;
    padding-left: 10px;
}
.el-form-item__content .block{
    float: left;
    width: 90%;
    text-align: left;
}
.el-form-item__content .block .el-input__inner{
    width: 100%!important;
}
/* ------------数据展示框共同样式-------- */
.index .datashow{
    width: 94%;
    height: 29%;
    padding: 5px 0px 5px 6%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* margin-bottom: 40px; */
}
.datashow-center{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between
}
.data-title p{
    text-align: left;
	height: 24px;
	font-size: 24px;
    letter-spacing: 0px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: 700;
}
.data-title div{
    text-align: left;
    width: 90%;
    height: 5px;
    line-height: 0px;
    border-bottom: 1px solid #949494;
    padding-top: 3px;
}
.data-title div span:nth-child(1){
    display: inline-block;
    width: 100px;
	height: 5px;
    background-color: #1795ed;
}
/* ----------------数据统计----------------- */
.el-indexdata-left{
    padding-top: 7px;
    height: 55%;
}
.el-indexdata-left div{
    height: 49%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 1%;
}
.onstruction-condition-type{
    display: inline-block;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* width: 75px; */
    width: 25%;
    height: 100%;
    /* line-height: 100%; */
    /* margin: 0px 25px 8px 25px; */
    font-size: 16px;
    letter-spacing: 0px;
    text-align: left;
    padding-left: 65px;
}
.el-indexdata-left div:nth-child(1) .onstruction-condition-type:nth-child(1){
    background: url('~@/assets/img/index11.png') no-repeat 0 center;
    background-size: 30%;
}
.el-indexdata-left div:nth-child(1) .onstruction-condition-type:nth-child(2){
    background: url('~@/assets/img/index12.png') no-repeat 0 center;
    background-size: 30%;
}
.el-indexdata-left div:nth-child(2) .onstruction-condition-type:nth-child(1){
    background: url('~@/assets/img/index13.png') no-repeat 0 center;
    background-size: 27%;
}
.el-indexdata-left div:nth-child(2) .onstruction-condition-type:nth-child(2){
    background: url('~@/assets/img/index14.png') no-repeat 0 center;
    background-size: 30%;
}
.onstruction-percentage{
    clear: both;
    width: 90%;
    display: flex;
    justify-content: space-between;
}
.onstruction-percentage span{
    display: inline-block;
    /* width: 38%; */
    text-align: left;
    /* margin-right: 44px */
}
.onstruction-percentage span:nth-child(3){
    text-align: right;
}
.onstruction-date{
    text-align: right;
    padding-right: 80px;
    font-size: 14px;
}
.onstruction-percentage-progress{
    width: 100%;
    float: left;
    /* padding-right: 20px; */
    /* position: relative; */
    margin: 3px 0px;
}
/* ----------------中间图片----------------- */
.showimg{
    width: 100%;
    height: 100%;
    border-radius: 13px;
}
/* ----------------天气管理----------------- */
.weather{
    height: 50%;
    width: 95%;
    margin-top: 5%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.weather span:nth-child(1){
    /* width: 105px; */
    line-height: 30px;
    display: inline-block;
    /* padding: 20px 80px 0px 0px; */
}
.weather span:nth-child(2){
    width: 25%;
    height: 100%;
    display: inline-block;
    background: url('~@/assets/img/weather.png') no-repeat 0 center;
    background-size: 100% 100%;
    vertical-align: top;
    padding-right: 55px;
}
.weather span:nth-child(3){
    display: inline-block;
    line-height: 80px;
    vertical-align: top;
}
.weather + div{
    text-align: left;
    padding-bottom: 3px;
}
.weather + div span{
    margin-right: 10px;
}
/* ----------------考勤管理/安全管理----------------- */
#workmanage,#safemanage{
    display: flex;
    flex-direction: column;
}
#workmanage .el-progress,#safemanage .el-progress{
    padding-top: 10px;
    
}
#workmanage .el-progress+div,#safemanage .el-progress+div{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 50%;
}
#workmanage .el-progress+div div,#safemanage .el-progress+div div{
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    height: 20%;
}
#workmanage .el-progress+div span:nth-of-type(odd),#safemanage .el-progress+div span:nth-of-type(odd){
    display: inline-block;
    width: 60%;
    text-align: right;
    /* margin-bottom: 25px; */
}
#workmanage .el-progress+div span:nth-of-type(even),#safemanage .el-progress+div span:nth-of-type(even){
    display: inline-block;
    width: 40%;
    text-align: left
}
#workmanage .work-container+p,#safemanage .safe-center+p{
    position: absolute;
    top: 64%;
    left: 22%;
}
.work-container,.safe-center{
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.el-progress__text{
    color:#fff;
}
/* ----------------最新动态----------------- */
#newdynamic .el-table{
    background: none;
    border: none;
}
#newdynamic .el-table td,#newdynamic .el-table tr{
    background: none;
    border: none;
}
#newdynamic .el-table td div{
    color: #fff;
    text-align: left;
}
/* ----------------环境监测----------------- */
.onstruction-environment{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.onstruction-environment span:nth-of-type(odd){
    display: inline-block;
    width: 20%;
    text-align: left;
    font-size: 15px;
}
.onstruction-environment span:nth-of-type(even){
    display: inline-block;
    width: 28%;
    text-align: left;
    font-size: 15px;
}
.onstruction-environment div{
    display: flex;
}
.onstruction-environment div:nth-child(4) span:nth-child(2){
    flex: 1;
    text-align: left;
}
.onstruction-environment div:nth-child(4) span:nth-child(1){
    min-width: 100px;
}
</style>
