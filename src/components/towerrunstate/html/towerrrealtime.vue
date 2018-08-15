<template>
<div id="towerrrealtime">
    <div class="tower-towerrrealtime">
        <div class="tower-center">
            <div class="tower-datashow">
                <el-row class="tower-headers">
                    <div id="tower-select">
                        <span>塔吊编号:</span>
                        <!-- <select @change="changedevicesn" v-model="deviceed">
                            <option disabled value="">请选择设备SN</option>
                            <option v-for="(device,snindex) in devicesn" :key="snindex" :value="device">
                                <div class="option-div">{{ device }}</div>
                            </option>
                        </select> -->
                        <el-select @change="changedevicesn" v-model="deviceed">
                            <el-option
                            v-for="item in devicesn"
                            :key="item.id"
                            :label="item.deviceSN"
                            :value="item.deviceSN">
                            </el-option>
                        </el-select>
                    </div>
                </el-row>
                <div class="tower-type">
                    <span class="tower-type-left"><span>力矩</span><span>{{towerdata==null?0:2}} t.m</span></span><span class="tower-type-right"><span>载重</span><span>{{towerdata==null?0:towerdata.lifting_weight}} kg</span></span>
                </div>
                <div class="tower-type">
                    <span class="tower-type-left"><span>风速</span><span>{{towerdata==null?0:towerdata.wind_speed}} m/s</span></span><span class="tower-type-right"><span>幅度</span><span>{{towerdata==null?0:towerdata.tower_range}} m</span></span>
                </div>
                <div class="tower-type">
                    <span class="tower-type-left"><span>高度</span><span>{{towerdata==null?0:towerdata.height}} m</span></span><span class="tower-type-right"><span>角度</span><span>{{towerdata==null?0:towerdata.rotation}} 。</span></span>
                </div>
            </div>
            <div class="tower-transfrom">
                <tiaoshi :content="contentdata"></tiaoshi>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import tiaoshi from './tiaoshi.vue'
export default {
    data() {
        return {
            regionid:Number,
            rotatevalue:'rotate(0deg)',//横截面角度
            leftvalue:50,               //横截面幅度
            crossdata:280,              //纵向面幅度
            verticaldata:20,            //纵向面高度
            selected: '',
            deviceed: '',
            showtime: 1,
            devicesn:[],
            playback:[],
            options:[],
            dates:[],
            echData:[],
            anitype:false,
            requesttype:true,
            contentdata:{
                    showtime:0,
                    rotatevalue:0,
                    crossdata:490,
                    verticaldata:20,
                    oring:47,
                },
            towerdata:null
        };
    },
    created() {
      this.regionid = sessionStorage.getItem("regionid");
    },
    mounted() {
        this.alldata();
        this.realdata = setInterval(()=>{
            if(this.requesttype == false){
                this.snrequest();
            }
        },10000)
    },
    methods:{
        changedevicesn(){
            if(this.requesttype == false){
                clearInterval(this.realdata)
            }
            this.requesttype = true;
            this.snrequest();
            setTimeout(() => {
                this.requesttype = false;
            },1000)
        },
        snrequest(){
            console.log(this.deviceed)
            this.$api.seekNewTowerData({
                params:{
                    device_sn:this.deviceed
                }
            }).then(res => {
                if(res.data.code==200){
                    this.towerdata = res.data.result;
                    console.log(this.towerdata)
                    this.contentdata = {
                        showtime:this.requesttype?0:10,
                        rotatevalue:res.data.result.rotation,
                        crossdata:490 + 4.2*res.data.result.tower_range,
                        verticaldata:20 + 4.4*res.data.result.height,
                        oring:47 + 4.2*res.data.result.tower_range,
                    }
                    this.anitype = true;
                }
            })
        },
        alldata(){
            //根据工地查询塔吊设备的sn编号
            this.$api.seekMachineTower({
                params:{
                    regionid:this.regionid
                }
            }).then(res => {
                console.log(33333333)
                console.log(res)
                if(res.data.code==200){
                    // res.data.result.forEach(element => {
                    //     if(this.devicesn.indexOf(element.deviceSN)==-1){
                    //         if(this.devicesn.length==0){this.devicesn.splice(0,0,element.deviceSN);}
                    //         for(let i=0;i<this.devicesn.length;i++){
                    //             if(this.devicesn[i]>element.deviceSN){
                    //                 this.devicesn.splice(i,0,element.deviceSN);
                    //                 this.snrequest()
                    //                 return false;
                    //             }; 
                    //         };
                    //     }
                    // });
                    this.devicesn=res.data.result
                    console.log(this.devicesn)
                    this.deviceed = this.devicesn[0].deviceSN;
                    console.log(this.deviceed)
                    this.snrequest()
                    this.changedevicesn();
                }
            })
        },
    },
    beforeDestroy() {
        clearInterval(this.realdata);
  },
  components:{
        tiaoshi
    }

}
</script>

<style>
#towerrrealtime{
    height: 100%;
}
.tower-towerrrealtime{
    min-width: 1344px;
    height: 100%;
    overflow: hidden;
}
.tower-headers{
    height: 85px;
    padding-top: 10px;
}
.tower-center{
    height: 700px;
    text-align: left;
}
.tower-datashow{
    width: 530px;
    height: 800px;
    display: inline-block;
    vertical-align: top;
    border-right: 1px solid #ccc;
}
.tower-type{
    /* padding-left: 100px; */
    margin-bottom: 40px;
    display: flex;
    justify-content: space-around;
}
.tower-type-left,.tower-type-right{
    display: inline-block;
    width: 120px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
}
.tower-type-left span:nth-child(1),.tower-type-right span:nth-child(1){
    text-align: left;
    padding: 5px;
}
.tower-type-left span:nth-child(3),.tower-type-right span:nth-child(3){
    border: 1px solid #000;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
}
.tower-towerrrealtime .tower-type:nth-child(2) .tower-type-left span:nth-child(1){
    background: url('~@/assets/img/tower_type01.png') no-repeat scroll right center transparent
}
.tower-towerrrealtime .tower-type:nth-child(2) .tower-type-right span:nth-child(1){
    background: url('~@/assets/img/tower_type02.png') no-repeat scroll right center transparent
}
.tower-towerrrealtime .tower-type:nth-child(3) .tower-type-left span:nth-child(1){
    background: url('~@/assets/img/tower_type03.png') no-repeat scroll right center transparent
}
.tower-towerrrealtime .tower-type:nth-child(3) .tower-type-right span:nth-child(1){
    background: url('~@/assets/img/tower_type04.png') no-repeat scroll right center transparent
}
.tower-towerrrealtime .tower-type:nth-child(4) .tower-type-left span:nth-child(1){
    background: url('~@/assets/img/tower_type05.png') no-repeat scroll right center transparent
}
.tower-towerrrealtime .tower-type:nth-child(4) .tower-type-right span:nth-child(1){
    background: url('~@/assets/img/tower_type06.png') no-repeat scroll right center transparent
}
.tower-towerrrealtime .tower-transfrom{
    display: inline-block;
    width: 800px;
    overflow: hidden;
}
#tower-select{
    height: 42px;
    line-height: 42px;
    padding-left: 50px;
}
#tower-select span{
    float: left;
}
#tower-select .el-select{
    border: 3px solid #000; 
    border-radius: 5px;
    outline: 0;
}
#tower-select .el-select input{
    border: none; 
    outline: 0;
}
.el-select-dropdown__item.selected{
    color: #000!important;
}

</style>
