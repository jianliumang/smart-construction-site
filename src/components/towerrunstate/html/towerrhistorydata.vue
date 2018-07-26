<template>
    <div class="towerrhistorydata">
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
                prop="workingid"
                label="序号"
                width="50">
            </el-table-column>
            <el-table-column
                prop="playbackid"
                label="回放ID"
                width="60">
            </el-table-column>
            <el-table-column
                prop="devicesn"
                label="设备SN"
                width="80">
            </el-table-column>
            <el-table-column
                prop="name"
                label="设备名称"
                width="80">
            </el-table-column>
            <el-table-column
                prop="startRange"
                label="起吊幅度"
                width="80">
            </el-table-column>
            <el-table-column
                prop="endRange"
                label="落吊幅度"
                width="80">
            </el-table-column>
            <el-table-column
                prop="startAngle"
                label="起吊角度"
                width="80">
            </el-table-column>
            <el-table-column
                prop="endAngle"
                label="落吊角度"
                width="80">
            </el-table-column>
            <el-table-column
                prop="startHeight"
                label="起吊高度"
                width="80">
            </el-table-column>
            <el-table-column
                prop="endHeight"
                label="落吊高度"
                width="80">
            </el-table-column>
            <el-table-column
                prop="startWindspeed"
                label="起吊风速"
                width="80">
            </el-table-column>
            <el-table-column
                prop="endWindspeed"
                label="落吊风速"
                width="80">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="起吊时间">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="落吊时间">
            </el-table-column>
            <el-table-column
                prop="maxRange"
                label="最大幅度"
                width="80">
            </el-table-column>
            <el-table-column
                prop="maxPayload"
                label="最大载重"
                width="80">
            </el-table-column>
            <el-table-column
                prop="maxTorqu"
                label="最大力矩"
                width="80">
            </el-table-column>
            <el-table-column
                prop="maxTorquRatio"
                label="最大力矩比"
                width="80">
            </el-table-column>
        </el-table>
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
      }
    },
    mounted(){
        this.towerrrequest();
    },
    methods:{
        datashow(){
            for(var i=this.sizeval*this.currentval-this.sizeval;i<this.sizeval*this.currentval;i++){
                if(i>=this.backData.length){
                    return false;
                }
                this.tableData.push(this.backData[i])
            }
        },
        handleSizeChange(val) {
            this.sizeval = val;
            this.tableData = [];
            this.datashow();
        },
        handleCurrentChange(val) {
            this.currentval = val;
            this.tableData = [];
            this.datashow();
        },
        towerrrequest(){
            this.$http({
                method: "get",
                url:"http://60.191.29.210:9090/RestIOTAPI/workingcycle/toselectAllTowerCraneWorkingCycle?devicesn=" + this.devicesn
            })
            .then(res => {
                res.data.result.reverse().forEach(element => {
                    this.backData.push({
                        workingid: element.working_id,
                        playbackid: element.playbackid,
                        devicesn: element.device_sn,
                        name: element.towercrance_name,
                        startRange: element.lifting_range + ' m',
                        endRange: element.drop_amplitude + ' m',
                        startAngle: element.lifting_angle + ' °',
                        endAngle: element.drop_angle + ' °',
                        startHeight: element.lifting_height + ' m',
                        endHeight: element.drop_height + ' m',
                        startWindspeed: element.lifting_windspeed + ' m/s',
                        endWindspeed: element.drop_windspeed + ' m/s',
                        startTime: element.lifting_time,
                        endTime: element.drop_time,
                        maxRange: element.max_range + ' m',
                        maxPayload: element.maximum_payload + ' kg',
                        maxTorqu: element.maximum_torque + ' t.m',
                        maxTorquRatio: element.maximum_torque_ratio,
                    })
                });
                this.datashow();
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
/* tr th:nth-child(1){
    width: 
} */
</style>
