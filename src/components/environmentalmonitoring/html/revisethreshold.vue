<template>
    <div class="revisethreshold">
        <h2>环境数据阀值表</h2>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column label="设备编号">
                <template slot-scope="scope">
                    <!-- <el-input v-show="!scope.row.type" v-model="scope.row.enviromental_id" placeholder="请输入设备编号"></el-input> -->
                    <div>{{scope.row.enviromental_id}}</div>
                </template>
            </el-table-column>
            <el-table-column label="温度阀值">
                <template slot-scope="scope">
                    <el-input v-show="!scope.row.type" v-model="scope.row.temperature" placeholder="请输入温度阀值"></el-input>
                    <div v-show="scope.row.type">{{scope.row.temperature==35?scope.row.temperature+' (推荐)':scope.row.temperature}}</div>
                </template>
            </el-table-column>
            <el-table-column label="湿度阀值">
                <template slot-scope="scope">
                    <el-input v-show="!scope.row.type" v-model="scope.row.humidity" placeholder="请输入湿度阀值"></el-input>
                    <div v-show="scope.row.type">{{scope.row.humidity==65?scope.row.humidity+' (推荐)':scope.row.humidity}}</div>
                </template>
            </el-table-column>
           <el-table-column label="光照阀值">
                <template slot-scope="scope">
                    <el-input v-show="!scope.row.type" v-model="scope.row.illumination" placeholder="请输入光照阀值"></el-input>
                    <div v-show="scope.row.type">{{scope.row.illumination==50?scope.row.illumination+' (推荐)':scope.row.illumination}}</div>
                </template>
            </el-table-column>
            <el-table-column label="噪音阀值">
                <template slot-scope="scope">
                    <el-input v-show="!scope.row.type" v-model="scope.row.noise" placeholder="请输入噪音阀值"></el-input>
                    <div v-show="scope.row.type">{{scope.row.noise==55?scope.row.noise+' (推荐)':scope.row.noise}}</div>
                </template>
            </el-table-column>
            <el-table-column label="PM2.5阀值">
                <template slot-scope="scope">
                    <el-input v-show="!scope.row.type" v-model="scope.row.pm2" placeholder="请输入PM2.5阀值"></el-input>
                    <div v-show="scope.row.type">{{scope.row.pm2==100?scope.row.pm2+' (推荐)':scope.row.pm2}}</div>
                </template>
            </el-table-column>
            <el-table-column label="PM10阀值">
                <template slot-scope="scope">
                    <el-input v-show="!scope.row.type" v-model="scope.row.pm10" placeholder="请输入PM10阀值"></el-input>
                    <div v-show="scope.row.type">{{scope.row.pm10==50?scope.row.pm10+' (推荐)':scope.row.pm10}}</div>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button @click="handleClick(scope.row)" type="text" size="small">{{scope.row.type?'编辑':'保存'}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            regionid : sessionStorage.getItem("regionid")
        }
    },
    mounted(){
        this.selectThreshold()
    },
    methods: {
        hack(index){
            //修改临界值
            var obj = {
                "enviromental_id": 1,
                "humidity": this.weatherlist[1].critical,
                "illumination": this.weatherlist[2].critical,
                "noise": this.weatherlist[3].critical,
                "pm10": this.weatherlist[5].critical,
                "pm2": this.weatherlist[4].critical,
                "regionid": this.regionid,
                "temperature": this.weatherlist[0].critical
            }
            this.$api.updateEnvironmentalThreshold(obj).then(res => {
                // console.log(res)
            });
            this.weatherlist[index].criticaltype=!this.weatherlist[index].criticaltype;
        },
        selectThreshold(){
            //获取临界值数据
            this.$api.selectEnvironmentalThreshold({
                params:{
                    'enviromental_id':1,
                    'regionid':this.regionid
                }
            }).then(res => {
                console.log(res);
                res.data.result.type=true;
                this.tableData.push(res.data.result)
            })
        },
        handleClick(row) {
            console.log(row);
            row.type=!row.type
            if(row.type){
                var val =Object.assign({}, row);
                delete val.id;
                delete val.type;
                this.$api.updateEnvironmentalThreshold(val).then(res => {
                    console.log(res)
                });
            }
        }
    },

    
}
</script>

<style>
.revisethreshold th .cell{
    text-align: center;
    color: #000;
    font-size: 20px;
}
</style>
