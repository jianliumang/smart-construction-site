<template>
<div id="animation" class="towerrani">
    <div class="ani-animation">
        <el-row class="ani-center">
            <el-col class="ta">
                <div class="ani-css">
                <div class="gouzi" :style="{transformOrigin: '-' + content.oring + 'px 0% 0', transform: 'translateZ(-12px) ' + 'rotateY('+content.rotatevalue+'deg)',left:content.crossdata + 'px',transition: 'all ' + content.showtime + 's linear!important' }">
                    <!-- <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                    <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div> -->
                    <div class="leftgou1">
                        <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                        <div :style="{ height:content.verticaldata + 'px',transition: 'height ' + content.showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:content.verticaldata + 'px',transition: 'height ' + content.showtime + 's linear!important' }"></div>
                        <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                    </div>
                    <div class="leftgou2">
                        <div><img src="@/assets/img/shang.png" alt="" class="ani-on"></div>
                        <div :style="{ height:content.verticaldata + 'px',transition: 'height ' + content.showtime + 's linear!important' }"><img src="@/assets/img/line.png" alt="" class="ani-line" :style="{ height:content.verticaldata + 'px',transition: 'height ' + content.showtime + 's linear!important' }"></div>
                        <div><img src="@/assets/img/xia.png" alt="" class="ani-down"></div>
                    </div>
                    <!-- <div class="leftgou3">
                        <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/ta/line_02.png" alt="" class="ani-line-side" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    </div> -->
                    <!-- <div class="leftgou4">
                        <div :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"><img src="@/assets/ta/line_02.jpg" alt="" class="ani-line-side" :style="{ height:verticaldata + 'px',transition: 'height ' + showtime + 's linear!important' }"></div>
                    </div> -->
                </div>
                <div class="ta-xia6" :style="{transform:'rotateY('+content.rotatevalue+'deg)',transition: 'transform ' + content.showtime + 's linear!important'}">
                    <img id="img61" src="@/assets/ta/ta_01.png" alt="">
                    <img id="img62" src="@/assets/ta/ta_01.png" alt="">
                    <img id="img63" src="@/assets/ta/ta_01_05.png" alt="">
                    <img id="img64" src="@/assets/ta/ta_01_07.png" alt="">
                    <img id="img65" src="@/assets/ta/ta_01_07.png" alt="">
                    <img id="img66" src="@/assets/ta/ta_01_02.png" alt="">
                    <img id="img67" src="@/assets/ta/ta_01_02.png" alt="">
                </div>
                </div>
                <div class="ta-below">
                    <img id="imgbow" src="@/assets/ta/ta_below.png" alt="">
                </div>
            </el-col>
        </el-row>
        <!-- <button id="but" @click="ddd">++++</button> -->
    </div>
</div>
</template>

<script>
export default {
    props:['content'],
    data() {
        return {
            regionid:Number,
            rotatevalue:0,//横截面角度
            leftvalue:70,               //横截面幅度
            crossdata:490,              //纵向面幅度
            verticaldata:100,            //纵向面高度
            translatex: 0,
            oring: 62,
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
        // console.log(this.content)
        // this.alldata()
        // console.log(document.styleSheets)
        // this.reuquecss()
    },
    methods:{
        ddd(){
            this.rotatevalue = this.rotatevalue + 30;
            // this.crossdata = this.crossdata + 50;
            // if(this.crossdata>705){
            //     this.crossdata = 455;
            // }
            // this.verticaldata = this.verticaldata + 50;
            // if(this.verticaldata>440){
            //     this.verticaldata = 20;
            // }
            // this.translatex = this.translatex + 20;
            // this.oring = this.oring + 50;
            // if(this.oring>297){
            //     this.oring = 47;
            // }
            // console.log(this.rotatevalue)
        },
        reuquecss(){
            var cssindex;
            var csslist = document.styleSheets;
            for(let i=0;i<csslist.length;i++){
                if(csslist[i].cssRules[0].selectorText=="#but"){
                    cssindex = i;
                };
            };
            var needcss = csslist[cssindex].cssRules;
            // console.log(needcss instanceof Array)
            for(var key in needcss){
                // console.log(needcss[key])
                if(needcss[key].name=="change"){
                    // console.log(needcss[key]);
                    var end = "100% { transform: translateZ(-10em) rotateX(0deg) rotateY("+this.rotatevalue+"deg); }";
                    needcss[key].deleteRule("100%");
                    needcss[key].appendRule(end)
                    // console.log(needcss[key].cssText)
                }
            };
        }
    }

}
</script>

<style>
#but{
    position: absolute;
}
*{
    margin: 0px;
    padding: 0px;
}
/* @-ms-keyframes change {
    0% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(0deg);
    }
    100% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(360deg);
    }
}
@-webkit-keyframes change {
    0% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(0deg);
    }
    100% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(360deg);
    }
}
@-moz-keyframes change {
    0% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(0deg);
    }
    100% {
        -webkit-transform: translateZ(-10em) rotateX(0deg) rotateY(360deg);
    }
}
@keyframes change {
    0% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(0deg);
    }
    33% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(270deg);
    }
    66% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(270deg);
    }
    100% {
        transform: translateZ(-10em) rotateX(0deg) rotateY(360deg);
    }
} */
.ta{
    text-align: left;
    width: 800px;
    height: 800px;
    /* border: 1px solid #f00 */
    /* -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
}
.ta img{
    position: absolute;
    /* perspective: 800px; */
}
.ani-css{
    /* -webkit-transform-style: preserve-3d; */
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    /* -webkit-animation: change 6s linear infinite; */
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
    animation-iteration-count:1;
    -webkit-animation-iteration-count:1;
    animation-fill-mode : forwards;
    /* transform: rotate(45deg); */
    /* transform-origin:53.6% 0px;
    -ms-transform-origin:53.6% 0px; 		IE 9
    -webkit-transform-origin:53.6% 0px;	Safari 和 Chrome
    -moz-transform-origin:53.6% 0px;		Firefox
    -o-transform-origin:53.6% 0px;		Opera */
}
.ani-line-side{
    width: 1px;
}
.gouzi{
    width: 17px;
    position: absolute;
    top: 140px;
    /* z-index: 200; */
    /* left: 255px!important; */
     /* -moz-transform-origin: -47px 0% 0;
    -ms-transform-origin: -47px 0% 0; */
    /* transform-origin: -47px 0% 0; */
    /* -webkit-transform: translateZ(-12px);
    -moz-transform: translateZ(-12px);
    transform: translateZ(-12px); */
    /* -ms-transform-style: preserve-3d; */
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
     /* -moz-transform-origin: -47px 0% 0;
    -ms-transform-origin: -47px 0% 0;
    transform-origin: -47px 0% 0!important; */
    backface-visibility: visible;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
}
.leftgou1{
    width: 17px;
    position: absolute;
    top: 0px;
    /* backface-visibility: hidden; */
    /* -ms-transform: translateZ(6px); */
    -webkit-transform: translateZ(6px);
    -moz-transform: translateZ(6px);
    transform: translateZ(11px);
}
.leftgou2{
    width: 17px;
    position: absolute;
    top: 0px;
    /* -webkit-transform: translateZ(-5px); */
    -webkit-transform: translateZ(-5px);
    -moz-transform: translateZ(-5px);
    transform: translateZ(10px);
}
.leftgou3{
    width: 1px;
    position: absolute;
    background: #f17d44;
    top: 0px;
    backface-visibility: visible;
    /* -webkit-transform: rotateY(90deg) translateZ(10px) translateX(-8px) translateY(4px); */
    -webkit-transform: rotateY(90deg) translateZ(10px) translateX(-8px) translateY(4px);
    -moz-transform: rotateY(90deg) translateZ(10px) translateX(-8px) translateY(4px);
    transform: rotateY(90deg) translateZ(10px) translateX(-8px) translateY(4px);
}
.leftgou4{
    width: 5px;
    position: absolute;
    top: 0px;
    /* -webkit-transform: rotateY(90deg) translateZ(22px) translateX(0px); */
    -webkit-transform: rotateY(90deg) translateZ(22px) translateX(0px);
    -moz-transform: rotateY(90deg) translateZ(22px) translateX(0px);
    transform: rotateY(90deg) translateZ(22px) translateX(0px);
}
.ta-below{
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    margin-left: 375px;
    vertical-align: top;
    backface-visibility: visible;
}
.ta-xia6{
    height: 186px;
    width: 480px;
    margin-left: 303px;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -moz-transform-origin: 26% 0% 0;
    -ms-transform-origin: 26% 0% 0;
    transform-origin: 26% 0% 0;
    backface-visibility: hidden;
    /* -webkit-animation: change 6s linear infinite;
    -moz--animation: change 6s linear infinite;
    animation: change 6s linear infinite; */
    
}
#imgbow{
    -webkit-transform: translateZ(-10px);
    -moz-transform: translateZ(-10px);
    transform: translateZ(-10px);
}
#img61{
    -ms-transform: translateZ(21px);
    -webkit-transform: translateZ(21px);
    -moz-transform: translateZ(21px);
    transform: translateZ(21px);
}
#img62{
    -ms-transform: translateZ(-21px);
    -webkit-transform: translateZ(-21px);
    -moz-transform: translateZ(-21px);
    transform: translateZ(-21px);
}
#img63{
    -webkit-transform: rotateY(90deg) translateZ(68px) translateX(0px) translateY(144px);
    -moz-transform: rotateY(90deg) translateZ(68px) translateX(0px) translateY(144px);
    transform: rotateY(90deg) translateZ(68px) translateX(0px) translateY(144px);
}
#img64{
    -webkit-transform: rotateY(90deg) translateZ(45px) translateX(0px) translateY(120px);
    -moz-transform: rotateY(90deg) translateZ(45px) translateX(0px) translateY(120px);
    transform: rotateY(90deg) translateZ(45px) translateX(0px) translateY(120px);
}
#img65{
    -webkit-transform: rotateY(90deg) translateZ(-8px) translateX(0px) translateY(120px);
    -moz-transform: rotateY(90deg) translateZ(-8px) translateX(0px) translateY(120px);
    transform: rotateY(90deg) translateZ(-8px) translateX(0px) translateY(120px);
}
#img66{
    -moz-transform-origin: 50% 100% 0;
    -ms-transform-origin: 50% 100% 0;
    transform-origin: 50% 100% 0;
    /* backface-visibility: hidden; */
    -webkit-transform: rotateY(270deg) rotateX(8deg) translateZ(-80px) translateX(0px) translateY(-12px);
    -moz-transform: rotateY(270deg) rotateX(8deg) translateZ(-80px) translateX(0px) translateY(-12px);
    transform: rotateY(270deg) rotateX(8deg) translateZ(-80px) translateX(0px) translateY(-12px);
}
#img67{
    -moz-transform-origin: 50% 100% 0;
    -ms-transform-origin: 50% 100% 0;
    transform-origin: 50% 100% 0;
    /* backface-visibility: hidden; */
    -webkit-transform: rotateY(90deg) rotateX(8deg) translateZ(127px) translateX(0px) translateY(20px);
    -moz-transform: rotateY(90deg) rotateX(8deg) translateZ(127px) translateX(0px) translateY(20px);
    transform: rotateY(90deg) rotateX(8deg) translateZ(127px) translateX(0px) translateY(20px);
}
.towerrani .ani-animation{
    width: 100%;
    overflow: hidden;
}
.towerrani .ani-headers{
    height: 100px;
    padding-top: 10px;
}
.ani-center{
    height: 700px;
}
.towerrani .ani-timebox{
    display: inline-block;
    width: 550px;
    height: 42px;
}
.towerrani .ani-timebox form,.towerrani .el-form-item{
    height: 42px;
    margin-bottom: 0px;
}
.ani-line{
    width: 17px;
    height: 20px;
}
</style>
