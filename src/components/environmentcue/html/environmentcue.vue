<template>
    <div class="environmentcue">
        <el-container>
            <!-- <div class="aside-parent">
                <el-aside id="gpsaside" width="200px" style="overflow:hidden">
                    <el-menu v-show="fasle"
                    :default-openeds="['1']"
                    default-active="1-0"
                    class="el-menu-vertical-demo"
                    background-color="#fff"
                    text-color="#000"
                    active-text-color="#e45823">
                        <el-submenu index="1">
                            <template slot="title">
                                <span>环境jian'ce设备</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item @click="constructioncfn(construc.equipment_name)" :index="'1-'+cindex" v-for="(construc,cindex) in constructioncdata" :key="cindex">
                                    {{ construc.equipment_name }}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </div> -->
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
                <template v-for="(weather,index) in weatherlist">
                    <div class="env-show-main"  :key="weather+index">
                        <div class="env-icon-bock">
                            <img :src="weather.imgsrc" alt="">
                            <div>ID:{{id}}</div>
                        </div>
                        <div class="env-type-bock">
                            <div>{{weather.name}}</div>
                            <div><span>当前状态：</span><span :style="{color:linktype?'green':'#f00'}">{{linktype?"已连接":"未连接"}}</span></div>
                            <div><span>更新时间：</span><span>{{defauldata==null?"":defauldata.sendtime}}</span></div>
                        </div>
                        <div class="env-data-bock" v-if="defauldata==null?false:true">
                            <span class="el-temperature">{{defauldata==null?"111":weather.newdata}}</span><span>{{weather.unit}}</span>
                        </div>
                        <div class="env-event-bock">
                            <!-- <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                <el-button type="text" @click="realtimeline(index)" :disabled="!linktype" >
                                    实时曲线<span :class="weatherlist[index].showtype?'el-icon-arrow-down nav-menu':'el-icon-arrow-down'"></span>
                                </el-button>
                            </el-tooltip> -->
                            <el-button type="text" @click="realtimeline(index)" :disabled="!linktype" >
                                实时曲线<span :class="weatherlist[index].showtype?'el-icon-arrow-down nav-menu':'el-icon-arrow-down'"></span>
                            </el-button>
                            <el-button type="text" @click="hostroitimeline(index)">历史查询</el-button>
                        </div>
                    </div>
                    <transition name="fade" :key="weather+index">
                        <el-row class="datashow" v-show="weatherlist[index].showtype">
                            <div :id="'myChart'+index" class="echarts"></div>
                        </el-row>
                    </transition>
                </template>
                <el-dialog
                    :title="weatherlist[historynum].name+'历史曲线'"
                    :visible.sync="dialogVisible"
                    width="70%">
                    <div class="main">
                        <div class="block">
                            <span class="demonstration">{{weatherlist[historynum].name}}历史查询：</span>
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
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            regionid:Number,
            weatherlist:[
                {
                    'name':'温度',
                    'unit':'℃',
                    'imgsrc':require('@/assets/img/temperature.png'),
                    'time': [],
                    'data': [],
                    'showtype':false,
                },
                {
                    'name':'湿度',
                    'unit':'RH',
                    'imgsrc':require('@/assets/img/humidity.png'),
                    'time': [],
                    'data': [],
                    'showtype':false,
                },
                {
                    'name':'光照',
                    'unit':'LUX',
                    'imgsrc':require('@/assets/img/value.png'),
                    'time': [],
                    'data': [],
                    'showtype':false,
                },
                {
                    'name':'噪音',
                    'unit':'db',
                    'imgsrc':require('@/assets/img/value.png'),
                    'time': [],
                    'data': [],
                    'showtype':false,
                },
                {
                    'name':'PM2.5',
                    'unit':'ug/m3',
                    'imgsrc':require('@/assets/img/dustproof.png'),
                    'time': [],
                    'data': [],
                    'showtype':false,
                },
                {
                    'name':'PM10',
                    'unit':'ug/m3',
                    'imgsrc':require('@/assets/img/dustproof.png'),
                    'time': [],
                    'data': [],
                    'showtype':false,
                }],
            historynum:0,
            linktype:false,
            dialogVisible: false,
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
            id:''
        };
    },
    created() {
        this.regionid = sessionStorage.getItem("regionid");
    },
    mounted() {
        this.echartsinfo();
        this.constructionfn();     //根据选择的工地去查找设备，并显示
        let startTime = this.setPartTime() + " 00:00:00";
        let endTime = this.setPartTime() ? this.setAllTime() : this.setPartTime() + " 23:59:59";
        this.dates = [startTime, endTime];
        this.realdata = setInterval(()=>{
            this.temperature();
        },3000)
        this.requesthavetime();
    },
    methods: {
        constructioncfn(val){
            //通过下拉列表的change事件去请求选中的设备数据
            // console.log(val)
            this.constructioncdata.forEach(element => {
                if(element.equipment_name == val){
                    this.weatherlist.forEach(echart=>{
                        echart.time=[],
                        echart.data=[]
                    })
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
                // console.log(res)
                if(res.data.code==200){
                    this.constructioncdata = res.data.result;
                    this.enviromentalid = res.data.result[0].enviromental_id;
                    this.id = this.constructioncdata[0].serial_number.substring(0,8);
                    this.temperature();
                }   
                // console.log(res.data.result)
            })
        },
        realtimeline(num){
            //实时曲线的显示状态与隐藏状态
            var value = this.weatherlist[num];
            value.showtype=!value.showtype;
            value.data=[];
            value.time=[];
        },
        hostroitimeline(num){
            //历史查询的显示状态
            if(num){
                this.historynum = num;
            };
            this.dialogVisible = true;
            setTimeout(this.query,1);
        },
        temperature() {
            //根据设备编号请求最新一条信息
            this.weatherlist.forEach(value => {
                if(value.showtype == false){
                    value.time=[];
                    value.data=[];
                }
            });
            // console.log(this.enviromentalid)
            //查找该设备编号的最新一条的环境监控所有数据
            this.$api.seekMachineNumberNewEnvironmentalData({
                params:{
                    enviromental_id:this.enviromentalid
                }
            }).then(res => {
                // console.log(res)
                if(res.data.result == null&&res.data.code==500){
                    this.linktype = false;
                }else if(res.data.code==200){
                    this.linktype = true;
                    this.defauldata = res.data.result;
                    this.weatherlist[0].data.push(this.defauldata.temperature);
                    this.weatherlist[1].data.push(this.defauldata.humidity);
                    this.weatherlist[2].data.push(this.defauldata.illumination);
                    this.weatherlist[3].data.push(this.defauldata.noise);
                    this.weatherlist[4].data.push(this.defauldata.pm2);
                    this.weatherlist[5].data.push(this.defauldata.pm10);
                    this.weatherlist.forEach(value => {
                        value.time.push(this.defauldata.sendtime);
                        value.newdata=value.data[value.data.length-1];
                    });
                };
                this.weatherlist.forEach(echert=>{
                    echert.myCharts.setOption({
                        xAxis: [{data: echert.time}],
                        series: [{data: echert.data}]
                    });
                })
            })
        },
        echartsinfo(){
            // 基于准备好的dom，初始化echarts实例
            this.weatherlist.forEach((echert,index)=>{
                echert.myCharts = this.$echarts.init(document.getElementById('myChart'+index));
                echert.myCharts.setOption({
                    title: { text: "今日"+echert.name+"变化" },
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
                        name: echert.name,
                        type: "line",
                        data: []
                    }]
                });
            })
        },
        query() {
            //历史查询数据请求
            let myChart = this.$echarts.init(document.getElementById("histrori"));
            var times = [];
            this.weatherlist.forEach(value => {
                value.historydata=[];
            });
            var stTime = this.dates[0];
            var enTime = this.dates[1];
            //get根据设备编号查找时间到另一个时间的环境监控数据
            this.$api.seekDatesEnvironmentalMonitoringData("?startTime="+stTime+"&endTime="+enTime+"&enviromental_id=" + this.enviromentalid).then((response) => {
                // console.log(response)
                if(response.data.result.length==0){
                    this.$message({
                        message: '本时间段没有数据',
                        type: 'warning'
                    });
                }
                if(response.data.code==200){
                    if(response.data.result!=null){
                        response.data.result.forEach(element => {
                            times.push(element.sendtime);
                            this.weatherlist[0].historydata.push(element.temperature);
                            this.weatherlist[1].historydata.push(element.humidity);
                            this.weatherlist[2].historydata.push(element.illumination);
                            this.weatherlist[3].historydata.push(element.noise);
                            this.weatherlist[4].historydata.push(element.pm2);
                            this.weatherlist[5].historydata.push(element.pm10);
                        });
                    };
                    this.weatherlist.forEach((value,index) => {
                        if(this.historynum==index){
                            myChart.setOption({
                                title: {
                                    text: "历史" + value.name + "变化曲线"
                                },
                                tooltip: {
                                    trigger: "axis",
                                    axisPointer: {
                                        axis: "x"
                                    }
                                },
                                legend: {
                                    data: [value.name]
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
                                    axisLabel:{formatter:'{value}'+value.unit}
                                },
                                series: [{
                                    // 根据名字对应到相应的系列
                                    name: value.name,
                                    type: "line",
                                    data:  value.historydata
                                }]
                            });
                        }
                    })
                    
                }
                
            }).catch(function(error) {
                // console.log(error);
                this.$message({
                    message: '图表请求数据失败!',
                    type: 'warning'
                })
                myChart.hideLoading();
            });
        },

        datatype(){
            setTimeout(() =>{
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
            // }
        },
        requesthavetime(){
            this.$api.withMachineNumberHasDataDayPost("?enviromentalid=2").then(res => {
                // console.log(res)
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
    /* padding-right: 240px; */
    padding: 0px 5px;
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
/* .el-aside-navchange{
    position: absolute;
    height: 40px;
    top: 60px;
    background: #293950;
} */
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
/* .environmentcue .aside-parent{
    background: #293950;
} */
.environmentcue .aside-parent img{
    padding-right: 20px;
}
.environmentcue .el-main{
    height: 100%;
    overflow:auto;
}
.environmentcue .el-main::-webkit-scrollbar{
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
    border-bottom: 2px solid #f5f5f5;
    /* line-height: 100px; */
    padding: 10px 0px;
}
.environmentcue img{
    height: 85%;
    
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
/* ---------------循环样式------------ */
.env-cycle{
    
}
.env-show-main{
    height: 14%;
    border-bottom: 2px solid #f5f5f5;
    padding: 9px 0px;
    display: flex;
    justify-content: space-between;
}
.env-icon-bock{
    color: #999999;
    text-align: left;
}
.env-type-bock{
    height: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.env-type-bock div:nth-child(1){
    font-size: 20px;
    height: 30%;
    vertical-align: top;
}
.env-type-bock div:nth-child(2){
    font-size: 14px;
    color: #999894;
    height: 40%;
}
.env-type-bock div:nth-child(3){
    font-size: 14px;
    color: #999894;
    height: 40%;
}
.env-data-bock{
    display: flex;
    align-items: center;
    justify-content: center;
}
.env-data-bock span:nth-child(1){
    display: inline-block;
    font-size: 32px;
    width: 80px;
}
.env-data-bock span:nth-child(2){
    display: inline-block;
    margin-left: 10px;
    font-size: 24px;
    width: 80px;
    text-align: left;
}
.env-event-bock{
    display: flex;
    justify-content: flex-end;
}
.env-event-bock button{
    font-size: 18px;
    margin-left: 10px;
    color: cadetblue;
    cursor: pointer;
    display: flex;
    height: 100%;
    align-items: center;
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
    margin-left: 50px;
}
.environmentcue .el-picker-panel{
  left: 25%!important;
}
</style>
