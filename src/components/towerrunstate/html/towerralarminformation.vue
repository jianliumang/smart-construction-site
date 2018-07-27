<template>
    <div class="towerralarminformation">
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
                <tiaoshi :content="contentdata"></tiaoshi>
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
import tiaoshi from './tiaoshi.vue'
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
        alarmStarttime:'',
        alarmEndtime:'',
        typename:'',
        playbackdata:[],
        contentdata:{
                    showtime:0,
                    rotatevalue:0,
                    crossdata:455,
                    verticaldata:20,
                    oring:47,
                },
      }
    },
    mounted(){
        this.towerrrequest(); 
    },
    methods:{
        handleClick(row) {
            //点击回放
            console.log(this.timestampToTime(Date.parse(row.startTime.replace(/-/g,"/"))),this.timestampToTime(Date.parse(row.endTime.replace(/-/g,"/"))))
            this.dialogVisible = true;
            this.devicesn = row.devicesn;
            if(!!window.ActiveXObject || "ActiveXObject" in window){ 
                // alert("这是IE浏览器！"); 
                this.alarmStarttime = this.timestampToTime(Date.parse(row.startTime.replace(/-/g,"/")));
                this.alarmEndtime = this.timestampToTime(Date.parse(row.endTime.replace(/-/g,"/")));
            }else{ 
                // alert("这不是IE浏览器！"); 
                this.alarmStarttime = this.timestampToTime(new Date(row.startTime).getTime());
                this.alarmEndtime = this.timestampToTime(new Date(row.endTime).getTime());
            } 
            // this.alarmStarttime = this.timestampToTime(new Date(row.startTime).getTime());
            // this.alarmEndtime = this.timestampToTime(new Date(row.endTime).getTime());
            this.typename = row.type;
            this.replayfn()
        },
        startfn(){
            var firstdata = this.playbackdata[0];
            var lastdata = this.playbackdata[this.playbackdata.length-1];
            this.contentdata={
                showtime:5,
                rotatevalue:45,
                crossdata:455 + 4.2*lastdata.tower_range,
                verticaldata:20 + 5*lastdata.height,
                oring:47 + 4.2*lastdata.tower_range,
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        replayfn(){
            console.log(this.alarmStarttime,this.alarmEndtime)
            this.$api.alarmReplay({
                params:{
                    deviceSN:this.devicesn,
                    alarmStarttime:this.alarmStarttime,
                    alarmEndtime:this.alarmEndtime
                }
            }).then(res => {
                console.log(res)
                if(res.data.result.length==0){
                    return false;
                }
                this.playbackdata = res.data.result;
                var firstdata = this.playbackdata[0];
                this.contentdata={
                    showtime:0,
                    rotatevalue:firstdata.rotation,
                    crossdata:455 + 4.2*firstdata.tower_range,
                    verticaldata:20 + 5*firstdata.height,
                    oring:47 + 4.2*firstdata.tower_range,
                }
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
    },
    components:{
        tiaoshi
    }
}
</script>

<style>
.cell{
    padding: 0px!important;
    text-align: center;
}
.towerralarminformation{
    /* min-width: 1344px; */
    width: 98%;
    padding: 0px 1%;
}        
.towerralarminformation .el-table td:nth-child(6){
    color: #f00;
}
.towerralarminformation .el-dialog{
    width: 1000px!important;
    /* float: left; */
    margin-top: 100px!important;
    height: 90%;
    /* overflow: hidden; */
}
.towerralarminformation .el-dialog__wrapper{
    overflow: hidden;
}
.towerralarminformation .el-dialog__body{
    width: 100%;
    height: 100%;
    padding: 0px;
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
