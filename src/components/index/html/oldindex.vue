<template>
    <div class="index">
        <el-row>
            <el-col :span="8">
                <div class="onstruction-condition el-indexdata-left">
                    <div>
                        <span class="onstruction-condition-type">建筑面积：<br /><span>{{constructiondata==null? 1000:constructiondata.coveredArea}}</span>㎡</span>
                        <span class="onstruction-condition-type">合同工期：<br /><span>{{constructiondata==null? 600:constructiondata.contractPeriod}}</span>天</span>
                    </div>
                    <div>
                        <span class="onstruction-condition-type">施工状态：<br /><span>{{constructiondata==null? '正在施工':constructiondata.engineeringState }}</span></span>
                        <span class="onstruction-condition-type">工程类别：<br /><span>{{constructiondata==null? '房建类':constructiondata.engineeringCategoryname }}</span></span>
                    </div>
                </div>
                <div class="onstruction-date">剩余天数：<span>{{constructiondata==null? 100:constructiondata.distanceEnddate}}</span>天</div>
                <div class="onstruction-percentage">
                    <div class="onstruction-percentage-text">施工百分比</div>
                    <div class="onstruction-percentage-progress">
                        <el-progress :text-inside="true" :stroke-width="30" :percentage="constructiondata==null? 80.12:constructiondata.constructionPercentage" color="rgba(142, 113, 199, 0.7)"></el-progress>
                    </div>
                </div>
                <div class="onstruction-environment el-indexdata-left">
                    <div>温度：<span>{{defauldata==null?"0":defauldata.temperature}}</span> ℃</div>
                    <div>湿度：<span>{{defauldata==null?"0":defauldata.humidity}}</span> RH</div>
                    <div>光照：<span>{{defauldata==null?"0":defauldata.illumination}}</span> LUX</div>
                    <div>噪音：<span>{{defauldata==null?"0":defauldata.noise}}</span> db</div>
                    <div>PM2.5：<span>{{defauldata==null?"0":defauldata.pm2}}</span> ug/m3</div>
                    <div>PM10：<span>{{defauldata==null?"0":defauldata.pm10}}</span> ug/m3</div>
                    <div>更新时间：<span>{{defauldata==null?nowdate:defauldata.sendtime}}</span></div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="constructionpicture">
                    <img src="@/assets/img/gongdi.jpg" alt="">
                </div>
            </el-col>
            <el-col :span="8">
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
                <div class="el-indexdata-right el-right-top">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                            <el-table-column
                                prop="devicesn"
                                label="设备SN"
                                width="85">
                            </el-table-column>
                            <el-table-column
                                prop="starttime"
                                label="开始时间">
                            </el-table-column>
                            <el-table-column
                                prop="endtime"
                                label="结束时间">
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类型"
                                width="100">
                            </el-table-column>
                    </el-table>
                </div>
                <div class="el-indexdata-right">
                    考勤待定
                </div>
            </el-col>
        </el-row>
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
    },
    mounted(){
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
              this.$http
                .get(
                    "http://60.191.29.210:9090/RestIOTAPI/equipment/toselectWorkSiteOneEquipment?regionid=" + this.regionid
                )
                .then(res => {
                    this.enviromentalid = res.data.result[0].enviromental_id;
                }).catch((error) => {

                })
        },
        toselectArchitecture(){
            //根据工地查询是否有设置工地数据
            this.$http
                .get(
                    "http://60.191.29.210:9090/RestIOTAPI/architecture/toselectArchitecture?regionid=" + this.regionid
                )
                .then(res => {
                    this.constructiondata = res.data.result;
                    this.form.area = this.constructiondata.coveredArea;
                    this.form.region = this.constructiondata.engineeringCategoryNumber;
                    this.valuetime = [this.constructiondata.contractStarttime,this.constructiondata.contractEndtime]
                }).catch((error) => {

                })
        },
        onSubmit(){
            //设置工地数据
            if(this.valuetime==[] || this.form.area == '' || this.form.region == ''){
                alert("请填写完整")
                return false;
            }
            this.$http({
            method: "post",
            url:"http://60.191.29.210:9090/RestIOTAPI/architecture/toinsertArchitecture",
            data:{
                "contractEndtime": this.valuetime[1],
                "contractStarttime": this.valuetime[0],
                "coveredArea": this.form.area,
                "engineeringCategoryNumber":  this.form.region,
                "regionid": this.regionid
            }
            })
            .then(res => {
                this.toselectArchitecture();
                this.menushow=false;
               this.openvalue = '设置成功';
               this.open();
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
            this.$http({
            method: "post",
            url:"http://60.191.29.210:9090/RestIOTAPI/engineeringCategory/selectEngineeringCategory"
            })
            .then(res => {
                console.log(res)
                res.data.result.forEach(element => {
                    this.options.push({
                        value: element.engineeringCategoryId,
                        label: element.engineeringCategoryname,
                        number: element.engineeringCategoryNumber
                    })
                });
            })
        },
        defaultrequest(){
        //根据设备编号请求最新一条坏境信息
          this.$http
                .get(
                    "http://60.191.29.210:9090/RestIOTAPI/environmentalmonitoring/toselectTempertureInformation?enviromental_id=" + this.enviromentalid
                )
                .then(res => {
                    this.defauldata = res.data.result;
                }).catch((error) => {
                })
        },
        towerrrequest(){
            console.log(111111)
            //右上角的数据展示
            this.$http({
                method: "get",
                url:"http://60.191.29.210:9090/RestIOTAPI/alarmInformation/toselectAlarmInformation?device_sn=" + this.devicesn
            })
            .then(res => {
                // console.log(res)
                this.tableData = [];
                var datalist = res.data.result.reverse()
                for(var i=0;i<5;i++){
                    this.tableData.push({
                        devicesn: datalist[i].device_sn,
                        starttime: datalist[i].alarm_starttime,
                        endtime: datalist[i].alarm_endtime,
                        type: datalist[i].alarm_type,
                    })
                };
            })
        }
    },
    beforeDestroy() {
      clearInterval(this.realdata);
    },
}
</script>

<style>
.index{
    font-size: 16px;
}
.el-center{
    position: absolute;
    border: 1px solid #000;
    right: 0px;
    height: 20px;
    background: #ccc;
    z-index: 100;
}
.setupbutton{
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
.el-indexdata-left{
    border: 1px solid #000;
    width: 500px;
    height: 280px;
    position: relative;
    margin:40px auto;
    padding: 10px;
}
.onstruction-condition-type{
    display: inline-block;
    width: 140px;
    height: 50px;
    line-height: 25px;
    border: 1px solid #000;
    margin: 0px 20px 80px 50px;
}
.onstruction-date{
    text-align: right;
    padding-right: 80px;
}
.onstruction-percentage-text{
    text-align: left;
    padding-left: 200px;
    margin: 30px 0 20px 0;
}
.onstruction-percentage-progress{
    width: 500px;
    position: relative;
    margin: auto;
}
.onstruction-environment div{
    width: 100%;
    text-align: left;
    padding: 10px 20px;
}
.constructionpicture{
    width: 600px;
    height: 700px;
    border: 1px solid #000;
    position: relative;
    margin:100px auto 0 auto;
}
.constructionpicture img{
    width: 100%;
    height: 100%;
}
.el-indexdata-right{
    border: 1px solid #000;
    width: 500px;
    height: 300px;
    position: relative;
    margin:40px auto;
    padding: 10px;
}
.el-right-top{
    margin: 40px auto 120px auto;
}
.el-right-top td{
    padding: 0px;
    height: 50px;
}
.el-right-top td:nth-child(4){
    color: #f00;
}
</style>
