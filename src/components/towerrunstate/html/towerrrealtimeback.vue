<template>
<div id="towerrrealtime">
    <div class="tower-towerrrealtime">
        <div class="tower-center">
            <div class="tower-datashow">
                <el-row class="tower-headers">
                    <div id="tower-select">
                        <select @change="changedevicesn" v-model="deviceed">
                            <option disabled value="">请选择设备SN</option>
                            <option v-for="(device,snindex) in devicesn" :key="snindex" :value="device">
                                {{ device }}
                            </option>
                        </select>
                    </div>
                </el-row>
                <div class="tower-type">
                    <span class="tower-type-left"><span>力矩</span><span>t.m</span><span>1</span></span><span class="tower-type-right"><span>载重</span><span>kg</span><span>5</span></span>
                </div>
                <div class="tower-type">
                    <span class="tower-type-left"><span>风速</span><span>m/s</span><span>4</span></span><span class="tower-type-right"><span>幅度</span><span>m</span><span>2</span></span>
                </div>
                <div class="tower-type">
                    <span class="tower-type-left"><span>高度</span><span>m</span><span>4</span></span><span class="tower-type-right"><span>角度</span><span>。</span><span>3</span></span>
                </div>
                <button @click="num=num+20">++++</button>
            </div>
            <div class="tower-transfrom">
                <tiaoshi :content="num"></tiaoshi>
            </div>
            
            <!-- <el-col :span="12">
                <div class="grid-content tower-crosswise">
                    <div class="tower-round">
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
                <div class="grid-content tower-lengthwise">
                    <div class="tower-shell">
                        <img src="@/assets/img/ta.png" alt="">
                        <div class="tower-demonstrate" :style="{ left:crossdata + 'px',transition: 'left ' + showtime + 's linear!important' }">
                            <div><img src="@/assets/img/shang.png" alt="" class="tower-on"></div>
                            <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="tower-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                            <div><img src="@/assets/img/xia.png" alt="" class="tower-down"></div>
                        </div>
                    </div>
                </div>
            </el-col> -->
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
            dates:[],
            echData:[],
            anitype:false,
            requesttype:true,
            contentdata:null,
            num:50
        };
    },
    created() {
      this.regionid = sessionStorage.getItem("regionid");
    },
    mounted() {
        this.alldata();
        this.realdata = setInterval(()=>{
            if(this.requesttype == false){
                console.log(111)
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
            this.$http({
                method: "get",
                url:"http://60.191.29.210:9090/RestIOTAPI/runningdata/toselectOneTowerCraneRunning_data?device_sn=" + this.deviceed
            })
            .then(res => {
                this.contentdata = res.data.result
                this.showtime = this.requesttype?0:10;
                this.rotatevalue = 'rotate(' +res.data.result.rotation + 'deg)';
                this.leftvalue = 50 + 2.7*res.data.result.tower_range;
                this.crossdata = 280 + 4.2*res.data.result.tower_range;
                this.verticaldata = 20 + 4.75*res.data.result.height;
                this.anitype = true;
            })
        },
        alldata(){
            //根据工地查询塔吊设备的sn编号
            this.$http({
                method: "get",
                url:"http://60.191.29.210:9090/RestIOTAPI/TowerCraneSensor/toselectTowerCraneSensor?regionid=" + this.regionid
            })
            .then(res => {
                console.log(res)
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
                this.deviceed = this.devicesn[0];
                this.changedevicesn();
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
.tower-towerrrealtime{
    min-width: 1344px;
    /* overflow: hidden; */
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
    background: cadetblue;
}
.tower-type-left span:nth-child(3),.tower-type-right span:nth-child(3){
    border: 1px solid #000;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
}
.tower-transfrom{
    display: inline-block;
}
/* .tower-crosswise{
    height: 500px;
    border-right: 5px solid #ccc;
} */
/* .tower-lengthwise{
    height: 500px;
}
.tower-round{
    width: 400px;
    height: 400px;
    border: 3px dashed orangered;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 50px;
    font-size: 24px;
    color: orangered;
}
.tower-round div{
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
} */
/* .tower-demonstrate{
    width: 17px;
    position: relative;
    top: -483px;
    left: -4px;
}
.tower-shell{
    height: 650px;
}
.tower-demonstrate div{
    width: 17px;
}
.tower-demonstrate div:nth-child(1){
    height: 4px;
    overflow: hidden;
}
.tower-demonstrate div:nth-child(1) img{
    vertical-align:top;
}
.tower-demonstrate div:nth-child(2){
    height: 20px;
}
.tower-demonstrate div:nth-child(3){
    height: 32px;
    vertical-align:top;
}
.tower-line{
    width: 17px;
    height: 20px;
} */
#tower-select{
    height: 42px;
    line-height: 42px;
    padding-left: 50px;
}
#tower-select select{
    width: 150px;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    border: 3px solid #000;
    font-size: 12px;
    float: left;
    appearance:none;  
    -moz-appearance:none;  
    -webkit-appearance:none;
    background: url('~@/assets/img/gps_select.png') no-repeat scroll right center transparent;
    padding: 0px 14px 0px 7px;
}
#tower-select select option{
    text-align: center;
}
</style>
