<template>
<div id="animation" class="towerbackani">
    <div class="ani-animation">
        <el-row class="ani-center">
            <el-col :span="12" class="ta">
                <div class="gouzi" :style="{transformOrigin: '-'+oring+'px 0% 0', transform: 'translateZ(-12px) ' + 'rotateY('+rotatevalue+'deg)',left:crossdata + 'px',transition: 'all ' + showtime + 's linear!important' }">
                    <!-- <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                    <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div> -->
                    <div class="leftgou1">
                        <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                        <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                        <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                    </div>
                    <div class="leftgou2">
                        <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                        <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                        <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                    </div>
                    <div class="leftgou3">
                        <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/ta/line_02.png" alt="" class="ani-line-side" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    </div>
                    <!-- <div class="leftgou4">
                        <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/ta/line_02.jpg" alt="" class="ani-line-side" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    </div> -->
                </div>
                <!-- <div class="gouzi" :style="{transformOrigin: '-'+oring+'px 0% 0', transform: 'translateZ(-13px) ' + 'rotateY('+rotatevalue+'deg)',left:crossdata + 'px',transition: 'all ' + showtime + 's linear!important' }">
                    <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                    <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                </div>
                <div class="gouzi" :style="{transformOrigin: '-'+oring+'px 0% 0', transform: 'translateZ(-14px) ' + 'rotateY('+rotatevalue+'deg)',left:crossdata + 'px',transition: 'all ' + showtime + 's linear!important' }">
                    <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                    <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                </div>
                <div class="gouzi" :style="{transformOrigin: '-'+oring+'px 0% 0', transform: 'translateZ(-11px) ' + 'rotateY('+rotatevalue+'deg)',left:crossdata + 'px',transition: 'all ' + showtime + 's linear!important' }">
                    <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                    <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                </div>
                <div class="gouzi" :style="{transformOrigin: '-'+oring+'px 0% 0', transform: 'translateZ(-10px) ' + 'rotateY('+rotatevalue+'deg)',left:crossdata + 'px',transition: 'all ' + showtime + 's linear!important' }">
                    <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                    <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                </div> -->
                <div class="ta-xia6" :style="{transform:'rotateY('+rotatevalue+'deg)',transition: 'transform ' + showtime + 's linear!important'}">
                    <img id="img61" src="@/assets/ta/ta_01.png" alt="">
                    <img id="img62" src="@/assets/ta/ta_01.png" alt="">
                    <img id="img63" src="@/assets/ta/ta_01_05.png" alt="">
                    <img id="img64" src="@/assets/ta/ta_01_07.png" alt="">
                    <img id="img65" src="@/assets/ta/ta_01_07.png" alt="">
                    <img id="img66" src="@/assets/ta/ta_01_02.png" alt="">
                    <img id="img67" src="@/assets/ta/ta_01_02.png" alt="">
                </div>
                <div class="ta-xia5">
                    <img id="img51" src="@/assets/ta/ta_03.png" alt="">
                    <img id="img52" src="@/assets/ta/ta_03.png" alt="">
                    <img id="img53" src="@/assets/ta/ta_03.png" alt="">
                    <img id="img54" src="@/assets/ta/ta_03.png" alt="">
                </div>
                <div class="ta-xia4">
                    <img id="img41" src="@/assets/ta/ta_06.png" alt="">
                    <img id="img42" src="@/assets/ta/ta_06.png" alt="">
                    <img id="img43" src="@/assets/ta/ta_06.png" alt="">
                    <img id="img44" src="@/assets/ta/ta_06.png" alt="">
                </div>
                <div class="ta-xia3">
                    <img id="img31" src="@/assets/ta/ta_09.png" alt="">
                    <img id="img32" src="@/assets/ta/ta_09.png" alt="">
                    <img id="img33" src="@/assets/ta/ta_09.png" alt="">
                    <img id="img34" src="@/assets/ta/ta_09.png" alt="">
                </div>
                <div class="ta-xia2">
                    <img id="img21" src="@/assets/ta/ta_11.png" alt="">
                    <img id="img22" src="@/assets/ta/ta_11.png" alt="">
                    <img id="img23" src="@/assets/ta/ta_11.png" alt="">
                    <img id="img24" src="@/assets/ta/ta_11.png" alt="">
                </div>
                <div class="ta-xia">
                    <img id="img1" src="@/assets/ta/ta_13.png" alt="">
                    <img id="img2" src="@/assets/ta/ta_13.png" alt="">
                    <img id="img3" src="@/assets/ta/ta_13.png" alt="">
                    <img id="img4" src="@/assets/ta/ta_13.png" alt="">
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content ani-lengthwise">
                    <div class="ani-shell" :style="{transform:'rotateY('+rotatevalue+'deg)',transition: 'transform ' + showtime + 's linear!important'}">
                        <img src="@/assets/img/ta.png" alt="">
                        <div class="ani-demonstrate" :style="{ left:crossdata + 'px',transition: 'left ' + showtime + 's linear!important' }">
                            <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                            <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                            <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <button @click="ddd">++++</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            regionid:Number,
            rotatevalue:0,//横截面角度
            leftvalue:50,               //横截面幅度
            crossdata:455,              //纵向面幅度
            verticaldata:440,            //纵向面高度
            translatex: 0,
            oring: 47,
            selected: '',
            deviceed: '',
            showtime: 5,
            devicesn:new Array(),
            playback:[],
            options:[],
            pickerOptions3: this.timelist,
            dates:[],
            echData:[],
            anitype:false,
            speed:1
        };
    },
    created() {
      this.regionid = sessionStorage.getItem("regionid");
    },
    mounted() {
        // this.alldata()
    },
    methods:{
        ddd(){
            this.rotatevalue = this.rotatevalue + 30;
            this.crossdata = this.crossdata + 50;
            if(this.crossdata>705){
                this.crossdata = 455;
            }
            // this.verticaldata = this.verticaldata + 50;
            // if(this.verticaldata>440){
            //     this.verticaldata = 20;
            // }
            this.translatex = this.translatex + 20;
            this.oring = this.oring + 50;
            if(this.oring>297){
                this.oring = 47;
            }
            console.log(this.rotatevalue)
        },
    }

}
</script>

<style>
*{
    margin: 0px;
    padding: 0px;
}
.ta{
    text-align: center;
    width: 800px;
    height: 800px;
    /* border: 1px solid #f00 */
}
.ta img{
    position: absolute;
}
.ani-line-side{
    width: 1px;
}
.gouzi{
    width: 17px;
    position: absolute;
    top: 140px;
    /* left: 255px!important; */
     /* -moz-transform-origin: -47px 0% 0;
    -ms-transform-origin: -47px 0% 0; */
    /* transform-origin: -47px 0% 0; */
    /* -webkit-transform: translateZ(-12px);
    -moz-transform: translateZ(-12px);
    transform: translateZ(-12px); */
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
     /* -moz-transform-origin: -47px 0% 0;
    -ms-transform-origin: -47px 0% 0;
    transform-origin: -47px 0% 0!important; */
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
}
.leftgou1{
    width: 17px;
    position: absolute;
    top: 0px;
    /* backface-visibility: hidden; */
    -webkit-transform: translateZ(6px);
    -moz-transform: translateZ(6px);
    transform: translateZ(1px);
}
.leftgou2{
    width: 17px;
    position: absolute;
    top: 0px;
    -webkit-transform: translateZ(-5px);
    -moz-transform: translateZ(-5px);
    transform: translateZ(0px);
}
.leftgou3{
    width: 5px;
    position: absolute;
    top: 0px;
    /* backface-visibility: hidden; */
    -webkit-transform: rotateY(90deg) translateZ(9px);
    -moz-transform: rotateY(90deg) translateZ(9px);
    transform: rotateY(90deg) translateZ(12px) translateX(-1px);
}
.leftgou4{
    width: 5px;
    position: absolute;
    top: 0px;
    -webkit-transform: rotateY(90deg) translateZ(-9px);
    -moz-transform: rotateY(90deg) translateZ(-9px);
    transform: rotateY(90deg) translateZ(22px) translateX(-1x);
}
.ta-xia{
    height: 10px;
    width: 109px;
    margin-left: 300px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -moz-transform-origin: 100% 0% 0;
    -ms-transform-origin: 100% 0% 0;
    transform-origin: 100% 0% 0;
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
    
}
.ta-xia2{
    height: 14px;
    width: 76px;
    margin-left:333px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -moz-transform-origin: 100% 0% 0;
    -ms-transform-origin: 100% 0% 0;
    transform-origin: 100% 0% 0;
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
}
.ta-xia3{
    height: 294px;
    width: 42px;
    margin-left: 368px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -moz-transform-origin: 100% 0% 0;
    -ms-transform-origin: 100% 0% 0;
    transform-origin: 100% 0% 0;
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
    
}
.ta-xia4{
    height: 30px;
    width: 76px;
    margin-left: 333px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -moz-transform-origin: 100% 0% 0;
    -ms-transform-origin: 100% 0% 0;
    transform-origin: 100% 0% 0;
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
    
}
.ta-xia5{
    height: 83px;
    width: 42px;
    margin-left: 368px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -moz-transform-origin: 100% 0% 0;
    -ms-transform-origin: 100% 0% 0;
    transform-origin: 100% 0% 0;
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
    
}
.ta-xia6{
    height: 186px;
    width: 480px;
    margin-left: 40px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -moz-transform-origin: 77% 0% 0;
    -ms-transform-origin: 77% 0% 0;
    transform-origin: 77% 0% 0;
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
    
}
@-webkit-keyframes change {
    0% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(0deg);
    }
    33% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(240deg);
    }
    66% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(480deg);
    }
    100% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(720deg);
    }
}
@-moz-keyframes change {
    0% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(0deg);
    }
    33% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(240deg);
    }
    66% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(480deg);
    }
    100% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(720deg);
    }
}
@keyframes change {
    0% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(0deg);
    }
    33% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(120deg);
    }
    66% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(240deg);
    }
    100% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(360deg);
    }
}
#img1{
    -webkit-transform: translateZ(55px);
    -moz-transform: translateZ(55px);
    transform: translateZ(55px);
}
#img2{
    -webkit-transform: translateZ(-55px);
    -moz-transform: translateZ(-55px);
    transform: translateZ(-55px);
}
#img3{
    -webkit-transform: rotateY(90deg) translateZ(55px);
    -moz-transform: rotateY(90deg) translateZ(55px);
    transform: rotateY(90deg) translateZ(55px);
}
#img4{
    -webkit-transform: rotateY(90deg) translateZ(-55px);
    -moz-transform: rotateY(90deg) translateZ(-55px);
    transform: rotateY(90deg) translateZ(-55px);
}
#img21{
    -webkit-transform: translateZ(35px);
    -moz-transform: translateZ(35px);
    transform: translateZ(35px);
}
#img22{
    -webkit-transform: translateZ(-35px);
    -moz-transform: translateZ(-35px);
    transform: translateZ(-35px);
}
#img23{
    -webkit-transform: rotateY(90deg) translateZ(21px);
    -moz-transform: rotateY(90deg) translateZ(21px);
    transform: rotateY(90deg) translateZ(21px);
}
#img24{
    -webkit-transform: rotateY(90deg) translateZ(-21px);
    -moz-transform: rotateY(90deg) translateZ(-21px);
    transform: rotateY(90deg) translateZ(-21px);
}
#img31{
    -webkit-transform: translateZ(21px);
    -moz-transform: translateZ(21px);
    transform: translateZ(21px);
}
#img32{
    -webkit-transform: translateZ(-21px);
    -moz-transform: translateZ(-21px);
    transform: translateZ(-21px);
}
#img33{
    -webkit-transform: rotateY(90deg) translateZ(21px);
    -moz-transform: rotateY(90deg) translateZ(21px);
    transform: rotateY(90deg) translateZ(21px);
}
#img34{
    -webkit-transform: rotateY(90deg) translateZ(-21px);
    -moz-transform: rotateY(90deg) translateZ(-21px);
    transform: rotateY(90deg) translateZ(-21px);
}
#img41{
    -webkit-transform: translateZ(38px);
    -moz-transform: translateZ(38px);
    transform: translateZ(38px);
}
#img42{
    -webkit-transform: translateZ(-38px);
    -moz-transform: translateZ(-38px);
    transform: translateZ(-38px);
}
#img43{
    -webkit-transform: rotateY(90deg) translateZ(38px);
    -moz-transform: rotateY(90deg) translateZ(38px);
    transform: rotateY(90deg) translateZ(38px);
}
#img44{
    -webkit-transform: rotateY(90deg) translateZ(-38px);
    -moz-transform: rotateY(90deg) translateZ(-38px);
    transform: rotateY(90deg) translateZ(-38px);
}
#img51{
    -webkit-transform: translateZ(21px);
    -moz-transform: translateZ(21px);
    transform: translateZ(21px);
}
#img52{
    -webkit-transform: translateZ(-21px);
    -moz-transform: translateZ(-21px);
    transform: translateZ(-21px);
}
#img53{
    -webkit-transform: rotateY(90deg) translateZ(21px);
    -moz-transform: rotateY(90deg) translateZ(21px);
    transform: rotateY(90deg) translateZ(21px);
}
#img54{
    -webkit-transform: rotateY(90deg) translateZ(-21px);
    -moz-transform: rotateY(90deg) translateZ(-21px);
    transform: rotateY(90deg) translateZ(-21px);
}
#img61{
    -webkit-transform: translateZ(21px);
    -moz-transform: translateZ(21px);
    transform: translateZ(21px);
}
#img62{
    -webkit-transform: translateZ(-21px);
    -moz-transform: translateZ(-21px);
    transform: translateZ(-21px);
}
#img63{
    -webkit-transform: rotateY(90deg) translateZ(21px);
    -moz-transform: rotateY(90deg) translateZ(21px);
    transform: rotateY(90deg) translateZ(68px) translateX(0px) translateY(143px);
}
#img64{
    -webkit-transform: rotateY(90deg) translateZ(-21px);
    -moz-transform: rotateY(90deg) translateZ(-21px);
    transform: rotateY(90deg) translateZ(45px) translateX(0px) translateY(120px);
}
#img65{
    -webkit-transform: rotateY(90deg) translateZ(-21px);
    -moz-transform: rotateY(90deg) translateZ(-21px);
    transform: rotateY(90deg) translateZ(-8px) translateX(0px) translateY(120px);
}
#img66{
    -moz-transform-origin: 50% 100% 0;
    -ms-transform-origin: 50% 100% 0;
    transform-origin: 50% 100% 0;
    /* backface-visibility: hidden; */
    -webkit-transform: rotateY(90deg) translateZ(-21px);
    -moz-transform: rotateY(90deg) translateZ(-21px);
    transform: rotateY(270deg) rotateX(8deg) translateZ(-80px) translateX(0px) translateY(-12px);
}
#img67{
    -moz-transform-origin: 50% 100% 0;
    -ms-transform-origin: 50% 100% 0;
    transform-origin: 50% 100% 0;
    /* backface-visibility: hidden; */
    -webkit-transform: rotateY(90deg) translateZ(-21px);
    -moz-transform: rotateY(90deg) translateZ(-21px);
    transform: rotateY(90deg) rotateX(8deg) translateZ(127px) translateX(0px) translateY(20px);
}
.towerbackani .ani-animation{
    width: 100%;
    overflow: hidden;
}
.towerbackani .ani-headers{
    height: 100px;
    padding-top: 10px;
}
.ani-center{
    height: 700px;
}
.towerbackani .ani-timebox{
    display: inline-block;
    width: 550px;
    height: 42px;
}
.towerbackani .ani-timebox form,.towerbackani .el-form-item{
    height: 42px;
    margin-bottom: 0px;
}
.ani-lengthwise{
    height: 500px;
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
</style>
