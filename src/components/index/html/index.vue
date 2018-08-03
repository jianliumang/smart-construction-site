<template>
    <div class="index">
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
                    <div class="el-center">
                        <button class="setupbutton" @click="menushow = !menushow">设置</button>
                        <div class="el-setup" v-show="menushow">
                            <el-form ref="form" :model="form" label-width="80px">
                                <el-form-item label="建筑面积">
                                    <el-row>
                                        <el-col :span="12"><el-input v-model="form.area"></el-input></el-col>
                                        <el-col class="el-text-type" :span="12"><span>㎡</span></el-col>
                                    </el-row>
                                </el-form-item>
                                <el-form-item label="活动时间">
                                    <div class="block">
                                        <el-date-picker
                                            v-model="valuetime"
                                            type="daterange"
                                            range-separator="至"
                                            start-placeholder="开始日期"
                                            value-format="yyyy-MM-dd"
                                            end-placeholder="结束日期">
                                        </el-date-picker>
                                    </div>
                                </el-form-item>
                                <el-form-item label="建筑类型">
                                    <el-select v-model="form.region" placeholder="请选择建筑类型">
                                        <el-option v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.number">
                            
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">设置</el-button>
                                    <el-button @click="cancel">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
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
                    <div class="onstruction-date">剩余<span>{{constructiondata==null? 100:constructiondata.distanceEnddate}}</span>天</div>
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
</template>

<script>
export default {
    data(){
        return{
            regionid:Number,
            form: {
                area: '',
                region: ''
            },
            valuetime: [],
            menushow: false,
            devicesn:10301229,
            tableData: [],
            enviromentalid: 2,
            defauldata: null,
            nowdate: this.setAllTime(),
            options: [],
            constructiondata: null,
            openvalue:''
        }
    },
    created(){
        this.regionid = sessionStorage.getItem("regionid");
        console.log(this.regionid)
    },
    mounted(){
        this.bordercss();
        this.toselectArchitecture();//根据工地查询是否有设置工地数据
        this.towerrrequest();//000000000//右上角的数据展示
        this.defaultrequest();//根据设备编号请求最新一条坏境信息
        this.engineeringcategoryrequest();//设置功能中的工程类别分组下拉列表
        this.realdata = setInterval(()=>{
          this.towerrrequest();
        },60000)
    },
    methods:{
        cancel() {
            this.menushow = !this.menushow
        },
        constructionfn(){
        //根据选择的工地去查找设备
            this.$api.withConstructionNumberResInfo({
                params:{
                    regionid : this.regionid
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.enviromentalid = res.data.result[0].enviromental_id;
                }
            })
        },
        toselectArchitecture(){
            //根据工地查询是否有设置工地数据*
            console.log(55555555555)
            this.$api.seekArchitectureData({
                params:{
                    regionid : this.regionid
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    
                    this.constructiondata = res.data.result;
                    this.form.area = this.constructiondata.coveredArea;
                    this.form.region = this.constructiondata.engineeringCategoryNumber;
                    this.valuetime = [this.constructiondata.contractStarttime,this.constructiondata.contractEndtime]
                }
            })
        },
        onSubmit(){
            //设置工地数据*
            if(this.valuetime==[] || this.form.area == '' || this.form.region == ''){
                alert("请填写完整")
                return false;
            }
            this.$api.insertArchitectureData({
                "contractEndtime": this.valuetime[1],
                "contractStarttime": this.valuetime[0],
                "coveredArea": this.form.area,
                "engineeringCategoryNumber":  this.form.region,
                "regionid": this.regionid
            }).then(res => {
                if(res.data.result){
                    this.toselectArchitecture();
                    this.menushow=false;
                    this.openvalue = '设置成功';
                    this.open();
                }
            })
        },
        open() {
            //消息提示
            const h = this.$createElement;
            this.$notify({
            title: '标题名称',
            message: h('i', { style: 'color: teal'}, this.openvalue)
        });
        },
        engineeringcategoryrequest(){
            //设置功能中的工程类别分组下拉列表
            this.options = [];
            this.$api.seekEngineeringCategory().then(res => {
                console.log(res)
                if(res.data.code==200){
                    console.log(res.data.result)
                    res.data.result.forEach(element => {
                        this.options.push({
                            value: element.engineeringCategoryId,
                            label: element.engineeringCategoryname,
                            number: element.engineeringCategoryNumber
                        })
                    });
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
            this.$api.seekNewsType({
                params:{
                    'strip' : 1
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.tableData = [];
                    this.tableData = res.data.result;
                }
            })
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
    beforeDestroy() {
      clearInterval(this.realdata);
    },
}
</script>

<style>
@import "../css/boeder.css";
.index{
    /* min-height: 1000; */
    height: 100%;
    padding: 0px 50px;
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
/* ---------数据统计设置按钮------- */
.el-center{
    position: absolute;
    top:4px;
    right: 16px;
    height: 20px;
    background: #ccc;
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
}
.el-setup{
    position: relative;
    background: #ccc;
    vertical-align: top;
}
.el-form{
    clear: both;
}
.el-text-type{
    text-align: left;
    padding-left: 10px;
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
    width: 48px;
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
    width: 75px;
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
/* ----------------天气管理----------------- */
.showimg{
    width: 100%;
    height: 95%;
}
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
}
#workmanage .el-progress+div div,#safemanage .el-progress+div div{
    /* display: flex;
    flex-direction: column;
    justify-content: center; */
    height: 20%;
}
#workmanage .el-progress+div span:nth-of-type(odd),#safemanage .el-progress+div span:nth-of-type(odd){
    display: inline-block;
    width: 80px;
    text-align: right;
    /* margin-bottom: 25px; */
}
#workmanage .el-progress+div span:nth-of-type(even),#safemanage .el-progress+div span:nth-of-type(even){
    display: inline-block;
    width: 60px;
    text-align: left
}
#workmanage .work-container+p,#safemanage .safe-center+p{
    position: absolute;
    top: 64%;
    left: 24%;
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
