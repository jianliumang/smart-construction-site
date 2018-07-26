<template>
    <div class="towerralarminformation">
        <!-- <select @change="changedevicesn" v-model="deviceed">
            <option disabled value="">请选择设备SN</option>
            <option v-for="(device,snindex) in devicesn" :key="snindex" :value="device">
                {{ device }}
            </option>
        </select> -->
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <!-- <el-table-column
                prop="workingid"
                label="序号"
                width="50">
            </el-table-column> -->
            <el-table-column
                prop="devicesn"
                label="设备SN">
            </el-table-column>
            <el-table-column
                prop="name"
                label="项目名称">
            </el-table-column>
            <el-table-column
                prop="towerrname"
                label="塔机名称">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开始时间">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">回放</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            :title="'塔吊预警回放：'+typename"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
            <span>
                <button @click="startfn">开始</button>
                <el-row class="alarm-center">
                    <el-col :span="12">
                        <div class="grid-content alarm-crosswise">
                            <div class="alarm-round">
                                <div class="round-top-center">270</div>
                                <div class="round-right-top">315</div>
                                <div class="round-right-center">360/0</div>
                                <div class="round-right-bottom">45</div>
                                <div class="round-bottom-center">90</div>
                                <div class="round-left-bottom">135</div>
                                <div class="round-left-center">180</div>
                                <div class="round-left-top">225</div>
                                <div class="round-crosswise" :style="{ transform: rotatevalue,transition: 'transform ' + showtime + 's linear!important' }">
                                    <div class="round-center"></div>
                                    <div class="round-goods" :style="{ left: leftvalue + 'px',transition: 'left ' + showtime + 's linear!important' }"></div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content alarm-lengthwise">
                            <div class="alarm-shell">
                                <img src="@/assets/img/ta.png" alt="">
                                <div class="alarm-demonstrate" :style="{ left:crossdata + 'px',transition: 'left ' + showtime + 's linear!important' }">
                                    <div><img src="@/assets/img/shang.png" alt=""></div>
                                    <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="alarm-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                                    <div><img src="@/assets/img/xia.png" alt=""></div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">退 出</el-button>
            </span>
        </el-dialog>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="backData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [],
        backData:[],
        devicesn:10301229,
        currentPage:1,
        sizeval:10,
        currentval:1,
        dialogVisible: false,
        rotatevalue:'rotate(0deg)',//横截面角度
        leftvalue:50,               //横截面幅度
        crossdata:240,              //纵向面幅度
        verticaldata:20,            //纵向面高度
        showtime: 1,
        alarmStarttime:'',
        alarmEndtime:'',
        typename:'',
        playbackdata:[]
      }
    },
    mounted(){
        this.towerrrequest(); 
    },
    methods:{
        handleClick(row) {
            //点击回放
            this.dialogVisible = true;
            this.devicesn = row.devicesn;
            this.alarmStarttime = this.timestampToTime(new Date(row.startTime).getTime());
            this.alarmEndtime = this.timestampToTime(new Date(row.endTime).getTime());
            this.typename = row.type;
            this.replayfn()
        },
        startfn(){
            var firstdata = this.playbackdata[0];
            var lastdata = this.playbackdata[this.playbackdata.length-1];
            this.showtime = 5;
            // this.showtime = (new Date(lastdata.monitoring_time).getTime()-new Date(firstdata.monitoring_time).getTime())/1000;
            // console.log(this.showtime)
            this.rotatevalue = 'rotate('+lastdata.rotation+'deg)';
            this.leftvalue=50 + 2.7*lastdata.tower_range;
            this.crossdata=240 + 4.2*lastdata.tower_range;
            this.verticaldata=20 + 5.2*lastdata.height;
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        replayfn(){
            this.$api.alarmReplay({
                params:{
                    deviceSN:this.devicesn,
                    alarmStarttime:this.alarmStarttime,
                    alarmEndtime:this.alarmEndtime
                }
            }).then(res => {
                if(res.data.result.length==0){
                    return false;
                }
                this.playbackdata = res.data.result;
                var firstdata = this.playbackdata[0];
                this.showtime = 0;
                this.rotatevalue = 'rotate('+firstdata.rotation+'deg)';
                this.leftvalue=50 + 2.7*firstdata.tower_range;
                this.crossdata=240 + 4.2*firstdata.tower_range;
                this.verticaldata=20 + 5.2*firstdata.height;
            })
        },
        datashow(){
            //根据页面条数size值与页面数值展现数据
            for(var i=this.sizeval*this.currentval-this.sizeval;i<this.sizeval*this.currentval;i++){
                if(i>=this.backData.length){
                    return false;
                }
                this.tableData.push(this.backData[i])
            }
        },
        handleSizeChange(val) {
            //点击页面条数size，传入值
            this.sizeval = val;
            this.tableData = [];
            this.datashow();
        },
        handleCurrentChange(val) {
            //点击页数传入页数值
            this.currentval = val;
            this.tableData = [];
            this.datashow();
        },
        towerrrequest(){
            this.$api.withMachineNumberSeekAllAlarm({
                params:{
                    device_sn:this.devicesn
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    res.data.result.reverse().forEach(element => {
                        this.backData.push({
                            devicesn: element.device_sn,
                            name: '',
                            towerrname: '',
                            startTime: element.alarm_starttime,
                            endTime: element.alarm_endtime,
                            type: element.alarm_type,
                        })
                    });
                    this.datashow();
                }
            })
        }
    }
}
</script>

<style>
.cell{
    padding: 0px!important;
    text-align: center;
}
.towerralarminformation{
    min-width: 1344px;
}        
.towerralarminformation .el-table td:nth-child(6){
    color: #f00;
}
.towerralarminformation .el-dialog{
    width: 1200px!important;
    float: left;
    margin: 0px!important;
    height: 90%;
}
.towerralarminformation .el-dialog__body{
    width: 1200px;
    height: 700px;
}
.alarm-center{
    height: 700px;
}
.alarm-crosswise{
    height: 500px;
    border-right: 5px solid #ccc;
}
.alarm-lengthwise{
    height: 500px;
}
.alarm-round{
    width: 400px;
    height: 400px;
    border: 3px dashed orangered;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 50px;
    font-size: 24px;
    color: orangered;
}
.alarm-round div{
    position: relative;
}
.round-top-center{
    top: -35px;
}
.round-right-top{
    top: 0px;
    left: 165px;
}
.round-right-center{
    top: 130px;
    left: 245px;
}
.round-right-bottom{
    top: 260px;
    left: 165px;
}
.round-bottom-center{
    top: 300px;
}
.round-left-bottom{
    top: 210px;
    left: -170px;
}
.round-left-center{
    top: 17px;
    left: -237px;
}
.round-left-top{
    top: -170px;
    left: -170px;
}
.round-crosswise{
    background: orangered;
    width: 230px;
    height: 5px;
    top: -29px;
    left: 160px;
    transform: rotate(0deg);
    transform-origin:17% center;
}
.round-center{
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 3px solid orangered;
    background: #fff;
    top: -7px;
    left: 30px;
}
.round-goods{
    width: 11px;
    height: 11px;
    background: #ccc;
    top: -22px;
    left: 50px;
}
.alarm-demonstrate{
    width: 17px;
    position: relative;
    top: -483px;
    left: -4px;
}
.alarm-shell{
    height: 650px;
}
.alarm-demonstrate div{
    width: 17px;
}
.alarm-demonstrate div:nth-child(1){
    height: 4px;
    /* overflow: hidden; */
}
.alarm-demonstrate div:nth-child(1) img{
    vertical-align:top;
}
.alarm-demonstrate div:nth-child(2){
    height: 20px;
}
.alarm-demonstrate div:nth-child(3){
    height: 32px;
    vertical-align:top;
}
.alarm-line{
    width: 17px;
    height: 20px;
}

/* tr th:nth-child(1){
    width: 
} */
</style>
