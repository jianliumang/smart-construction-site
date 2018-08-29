<template>
<div id="animation" class="towerrhistoryani">
    <div class="ani-animation">
        <el-row class="ani-headers">
            <div id="ani-select">
                <div>
                    <span>请选择设备:&nbsp;&nbsp;</span>
                    <el-select @change="changedevicesn" v-model="deviceed">
                        <el-option
                        v-for="item in devicesn"
                        :key="item.id"
                        :label="item.deviceSN"
                        :value="item.deviceSN">
                        </el-option>
                    </el-select>
                </div>
                <div class="ani-timebox">
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
                            @blur="maketime"	
                            :disabled="deviceed==''"
                            :picker-options="pickerOptions3">
                            </el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item><el-button @click="maketime">查询</el-button></el-form-item> -->
                    </el-form>
                </div>
                <el-select class="select-footer" v-model="selected" @change="changetime" placeholder="该时间段完成的工作">
                    <el-option
                    v-for="(play,index) in playback"
                    :key="index"
                    :label="play.playbackid+'----'+'时间：'+play.lifting_time+'--'+play.drop_time"
                    :value="play.playbackid+'----'+'时间：'+play.lifting_time+'--'+play.drop_time">
                    </el-option>
                </el-select>
                <el-input-number @change="speedchange" :min="1" size="mini" v-model="speed"></el-input-number>
                <el-button @click="oldani" size="mini" type="info" plain>开始</el-button>
            </div>
        </el-row>
        <div class="tower-center">
            <div class="tower-datashow">
                 <div class="tower-type">
                    <span class="tower-type-left"><span>力矩</span><span>t.m</span><span>{{towerdata==null?0:towerdata.maximum_torque}}</span></span><span class="tower-type-right"><span>载重</span><span>kg</span><span>{{towerdata==null?0:towerdata.maximum_payload}}</span></span>
                </div>
                <div class="tower-type">
                    <span class="tower-type-left"><span>风速</span><span>m/s</span><span>{{towerdata==null?0:towerdata.lifting_windspeed}}</span></span><span class="tower-type-right"><span>幅度</span><span>m</span><span>{{towerdata==null?0:towerdata.lifting_range}}</span></span>
                </div>
                <div class="tower-type">
                    <span class="tower-type-left"><span>高度</span><span>m</span><span>{{towerdata==null?0:towerdata.lifting_height}}</span></span><span class="tower-type-right"><span>角度</span><span>。</span><span>{{towerdata==null?0:towerdata.lifting_angle}}</span></span>
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
            pickerOptions3: this.timelist,
            dates:[],
            echData:[],
            anitype:false,
            speed:1,
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
        this.alldata()
    },
    methods:{
        speedchange(){
            //播放速度切换
            this.changetime();
        },
        maketime(){
            this.playback = [];
            this.windata();
        },
        changedevicesn(){
            // this.windata()
        },
        changetime(){
            //选择时间段生成模拟动画
            this.playback.forEach(element=>{
                var playvalue = element.playbackid+'----'+'时间：'+element.lifting_time+'--'+element.drop_time;
                if(this.selected == playvalue){
                    // console.log(element)
                    this.towerdata = element
                    this.contentdata = {
                        showtime:0,
                        rotatevalue:element.lifting_angle,
                        crossdata:490 + 4.2*element.lifting_range,
                        verticaldata:20 + 4.4*element.lifting_height,
                        oring:47 + 4.2*element.lifting_range,
                    }
                    this.anitype = true;
                }
            })
        },
        oldani(){
            if(this.anitype == false){return false};
            this.playback.forEach(element=>{
                var playvalue = element.playbackid+'----'+'时间：'+element.lifting_time+'--'+element.drop_time;
                if(this.selected == playvalue){
                    var t1 = new Date(element.drop_time.replace(/-/g, "/"));
                    var t2 = new Date(element.lifting_time.replace(/-/g, "/"));
                    this.contentdata = {
                        showtime:(t1.getTime() - t2.getTime())/1000/this.speed,
                        rotatevalue:element.drop_angle,
                        crossdata:490 + 4.2*element.drop_amplitude,
                        verticaldata:20 + 4.4*element.drop_height,
                        oring:47 + 4.2*element.drop_amplitude,
                    }
                    this.anitype = false;
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
                // console.log(res)
                if(res.data.code==200){
                    this.devicesn=res.data.result;
                    this.deviceed=res.data.result[0].deviceSN;
                    // res.data.result.forEach(element => {
                    //     if(this.devicesn.indexOf(element.deviceSN)==-1){
                    //         if(this.devicesn.length==0){this.devicesn.splice(0,0,element.deviceSN);}
                    //         for(let i=0;i<this.devicesn.length;i++){
                    //             if(this.devicesn[i]>element.deviceSN){
                    //                 this.devicesn.splice(i,0,element.deviceSN);
                    //                 return false;
                    //             }; 
                    //         };
                    //     }
                    // });
                }
            })
        },
        windata() {
            // 根据设备sn编号与一段时间段的开始时间和结束时间查找回放数据
            this.$api.withTowerNumberAndDatesSeekInfo({
                    "device_sn":this.deviceed,
                    "endtime":this.dates[1],
                    "starttime":this.dates[0]
                }).then(res => {
                    // console.log(res)
                    if(res.data.code==200){
                        this.playback = res.data.result;
                    }
            });
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
.towerrhistoryani .ani-animation{
    min-width: 1344px;
    overflow: hidden;
}
.towerrhistoryani .ani-headers{
    padding: 10px 0px;
}
.ani-center{
    height: 700px;
}
.towerrhistoryani .ani-timebox{
    display: inline-block;
    /* width: 550px; */
    height: 42px;
}
.towerrhistoryani .ani-timebox form,.towerrhistoryani .el-form-item{
    height: 42px;
    margin-bottom: 0px;
}

.tower-center{
    height: 700px;
    text-align: left;
    display: flex;
}
.tower-datashow{
    flex: 1;
    max-width: 530px;
    height: 800px;
    display: inline-block;
    vertical-align: top;
    border-right: 1px solid #ccc;
}
.tower-type{
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
.ani-animation .tower-type:nth-child(1) .tower-type-left span:nth-child(1){
    background: url('~@/assets/img/tower_type01.png') no-repeat scroll right center transparent
}
.ani-animation .tower-type:nth-child(1) .tower-type-right span:nth-child(1){
    background: url('~@/assets/img/tower_type02.png') no-repeat scroll right center transparent
}
.ani-animation .tower-type:nth-child(2) .tower-type-left span:nth-child(1){
    background: url('~@/assets/img/tower_type03.png') no-repeat scroll right center transparent
}
.ani-animation .tower-type:nth-child(2) .tower-type-right span:nth-child(1){
    background: url('~@/assets/img/tower_type04.png') no-repeat scroll right center transparent
}
.ani-animation .tower-type:nth-child(3) .tower-type-left span:nth-child(1){
    background: url('~@/assets/img/tower_type05.png') no-repeat scroll right center transparent
}
.ani-animation .tower-type:nth-child(3) .tower-type-right span:nth-child(1){
    background: url('~@/assets/img/tower_type06.png') no-repeat scroll right center transparent
}
.tower-transfrom{
    display: inline-block;
    width: 800px;
    overflow: hidden;
}
#ani-select{
    height: 42px;
    line-height: 42px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
#ani-select select{
    width: 120px;
    height: 30px;
    border-radius: 5px;
    outline: 0;
    vertical-align: top;
    margin-top: 5px;
}
#ani-select .select-footer{
    width: 400px;
}
#ani-select select option{
    text-align: center;
}
</style>
