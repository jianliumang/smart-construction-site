<template>
<div id="animation" class="towerrhistoryani">
    <div class="ani-animation">
        <el-row class="ani-headers">
            <div id="ani-select">
                <select @change="changedevicesn" v-model="deviceed">
                    <option disabled value="">请选择设备SN</option>
                    <option v-for="(device,snindex) in devicesn" :key="snindex" :value="device">
                        {{ device }}
                    </option>
                </select>
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
                            :picker-options="pickerOptions3">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item><el-button @click="maketime">查询</el-button></el-form-item>
                    </el-form>
                </div>
                <select class="select-footer" @change="changetime" v-model="selected">
                    <option disabled value="">该时间段完成的工作</option>
                    <option v-for="(play,index) in playback" :key="index" :value="play.playbackid+'----'+'时间：'+play.lifting_time+'--'+play.drop_time">
                        <!-- {{ play.showtime play.playbackid+"-"+'时间：'+play.lifting_time+'-'+play.drop_time}} -->
                        {{play.playbackid}}----时间：{{play.lifting_time}}--{{play.drop_time}}
                    </option>
                </select>
                <el-input-number @change="speedchange" :min="1" size="mini" v-model="speed"></el-input-number>
                <button @click="oldani">开始</button>
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
            devicesn:new Array(),
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
                    crossdata:455,
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
                    console.log(element)
                    this.towerdata = element
                    this.contentdata = {
                        showtime:0,
                        rotatevalue:element.lifting_angle,
                        crossdata:455 + 4.2*element.lifting_range,
                        verticaldata:20 + 4.75*element.lifting_height,
                        oring:47 + element.lifting_range,
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
                        crossdata:455 + 4.2*element.drop_amplitude,
                        verticaldata:20 + 4.75*element.drop_height,
                        oring:47 + element.drop_angle,
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
                console.log(res)
                if(res.data.code==200){
                    res.data.result.forEach(element => {
                        if(this.devicesn.indexOf(element.deviceSN)==-1){
                            if(this.devicesn.length==0){this.devicesn.splice(0,0,element.deviceSN);}
                            for(let i=0;i<this.devicesn.length;i++){
                                if(this.devicesn[i]>element.deviceSN){
                                    this.devicesn.splice(i,0,element.deviceSN);
                                    return false;
                                }; 
                            };
                        }
                    });
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
                    console.log(res)
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
    height: 100px;
    padding-top: 10px;
}
.ani-center{
    height: 700px;
}
.ani-timebox{
    display: inline-block;
    width: 550px;
    height: 42px;
}
.ani-timebox form,.towerrhistoryani .el-form-item{
    height: 42px;
    margin-bottom: 0px;
}

.tower-center{
    height: 700px;
    text-align: left;
}
.tower-datashow{
    width: 570px;
    height: 800px;
    display: inline-block;
    vertical-align: top;
    border-right: 1px solid #ccc;
}
.tower-type{
    padding-left: 100px;
    margin-bottom: 40px;
    display: flex;
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
.tower-type-left{
    padding-right: 130px;
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



.ani-crosswise{
    height: 500px;
    border-right: 5px solid #ccc;
}
.ani-lengthwise{
    height: 500px;
}
.ani-round{
    width: 400px;
    height: 400px;
    border: 3px dashed orangered;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 50px;
    font-size: 24px;
    color: orangered;
}
.ani-round div{
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
.ani-demonstrate{
    width: 17px;
    position: relative;
    top: -483px;
    left: -4px;
}
.ani-shell{
    height: 650px;
}
.ani-demonstrate div{
    width: 17px;
}
.ani-demonstrate div:nth-child(1){
    height: 4px;
    /* overflow: hidden; */
}
.ani-demonstrate div:nth-child(1) img{
    vertical-align:top;
}
.ani-demonstrate div:nth-child(2){
    height: 20px;
}
.ani-demonstrate div:nth-child(3){
    height: 32px;
    vertical-align:top;
}
/* .ani-on{
    position: relative;
    top: -436px;
    left: -100px;
    transition: left 1s linear!important;
} */
.ani-line{
    width: 17px;
    height: 20px;
}
/* .ani-down{
    position: relative;
    top: 65px;
    left: -43px;
    width: 17px;
    height: 32px;
    transition: left 1s linear!important;
} */
#ani-select{
    height: 42px;
    line-height: 42px;
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
