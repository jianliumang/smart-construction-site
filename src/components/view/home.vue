<template>
    <div class="home pagecss1">
        <el-row id="title">
            <el-col :span="6">
                <span></span>
                <span>大境筑智慧物联</span>
            </el-col>
            <el-col :span="12">
                <p>
                    {{regionname}}
                    <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <el-select @change="handleChange" v-model="selectvalue" placeholder="请选择">
                        <el-option
                        v-for="item in selectdata"
                        :key="item.regionid"
                        :label="item.regionname"
                        :value="item.regionid">
                        </el-option>
                    </el-select>
                    <img slot="reference" src="@/assets/img/change.png" alt="">
                    </el-popover>
                </p>
            </el-col>
            <el-col :span="6">
                <span>

                </span>
                <span>
                    admin
                </span>
            </el-col>
        </el-row>
        <el-row id="nav">
            <div class="home-nav">
                <el-menu :default-active="activeIndex" mode="horizontal">
                    <router-link class="subnav" to="/index" index="1"><span @click="backgroundset(1)">首页</span></router-link>
                    <router-link class="subnav" to="/servicesrealname" index="2"><span @click="backgroundset(2)">考勤管理</span></router-link>
                    <router-link class="subnav" to="/environmentcue" index="3"><span @click="backgroundset(3)">环境监控</span></router-link>
                    <router-link class="subnav" to="/gprspositioning" index="4"><span @click="backgroundset(4)">GPRS定位</span></router-link>
                    <router-link class="subnav" to="/towerrunstate" index="5"><span @click="backgroundset(5)">塔吊管理</span></router-link>
                    <router-link class="subnav" to="/videosurveillance" index="6"><span @click="backgroundset(6)">视频监控</span></router-link>
                    <router-link class="subnav" to="/equipmentinspection" index="7"><span @click="backgroundset(7)">设备巡检</span></router-link>
                </el-menu>
            </div>
        </el-row>
        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import indexbg from '@/assets/img/indexbg.png'
import nav001 from '@/assets/img/nav001.png'
import nav002 from '@/assets/img/nav002.png'
import nav003 from '@/assets/img/nav003.png'
import nav004 from '@/assets/img/nav004.png'
import nav005 from '@/assets/img/nav005.png'
import nav006 from '@/assets/img/nav006.png'
import nav007 from '@/assets/img/nav007.png'
import nav0001 from '@/assets/img/nav0001.png'
import nav0002 from '@/assets/img/nav0002.png'
import nav0003 from '@/assets/img/nav0003.png'
import nav0004 from '@/assets/img/nav0004.png'
import nav0005 from '@/assets/img/nav0005.png'
import nav0006 from '@/assets/img/nav0006.png'
import nav0007 from '@/assets/img/nav0007.png'
import nav3 from '@/assets/img/nav3.png'
import nav4 from '@/assets/img/nav4.png'
export default {
    data() {
        return {
            information:null,//初始值
            powerid:Number,
            activeIndex: '1',
            selectvalue:'',//选择框的值
            selectdata:[],//权限下的工地数据
            regionname:'',//工地名
            regionid: Number,
            datas:0,
            imgurl:{
                nav0001:nav0001,
                nav0002:nav0002,
                nav0003:nav0003,
                nav0004:nav0004,
                nav0005:nav0005,
                nav0006:nav0006,
                nav0007:nav0007,
            },
            imgchangeurl:{
                nav001:nav001,
                nav002:nav002,
                nav003:nav003,
                nav004:nav004,
                nav005:nav005,
                nav006:nav006,
                nav007:nav007,
            },
            clickimgurl:{
                'nav3':nav3,
                'nav4':nav4,
            },
            indexbg:indexbg,
            bgid:1,
            viewheight:''
        }
    },
    created(){
        // this.information={
        //     "address" : sessionStorage.getItem("address"),
        //     "email" : sessionStorage.getItem("email"),
        //     "power_id" : sessionStorage.getItem("power_id"),
        //     "sex" : sessionStorage.getItem("sex"),
        //     "username" : sessionStorage.getItem("username")
        // }
        this.regionid = sessionStorage.getItem("regionid");
        this.powerid = sessionStorage.getItem("power_id");
        this.bgid = sessionStorage.getItem("id") || 1;
    },
    mounted(){
        this.powerrequest();
        this.backgroundchang();
        // console.log(this.regionname)
    },
    methods: {
        backgroundset(id){
            sessionStorage.setItem("id",id);
            this.bgid = id;
            this.backgroundchang();
        },
        backgroundchang(){
            //背景切换
            // sessionStorage.setItem("colorid",id);
            // console.log(id)
            console.log(this.bgid)
            var homeele = document.getElementsByClassName("home");
            var titleele = document.getElementById("title");
            var aele = document.getElementsByClassName("subnav");
            if(this.bgid!=1){
                homeele[0].classList.remove('pagecss1');
                homeele[0].style.background="none"
                homeele[0].classList.add('pagecss2');
                titleele.classList.add('titlecss');
                var num = 0;
                for(var element in this.imgurl){
                    aele[num].style.background="url("+this.imgurl[element]+") no-repeat 0 center";
                    aele[num].style.color="#000";
                    num+=1;
                };
                if(this.bgid!=3 || this.bgid!=4){return false};
                aele[id-1].style.background="url("+this.clickimgurl['nav'+id]+") no-repeat 0 center";
            }else{
                homeele[0].classList.remove('pagecss2');
                
                homeele[0].classList.add('pagecss1');
                homeele[0].style.background="url("+this.indexbg+") no-repeat";
                titleele.classList.remove('titlecss');
                var num = 0;
                for(var element in this.imgchangeurl){
                    aele[num].style.background="url("+this.imgchangeurl[element]+") no-repeat 0 center";
                    aele[num].style.color="#fff";
                    num+=1;
                };
            }
        },
        handleChange() {
            //选择工地
            sessionStorage.setItem("regionid",this.selectvalue);
            location.reload();
        },
        powerrequest(){
            //根据管理权限获取工地
            this.$api.withPermissionsSeek({
                params:{
                    powerid : this.powerid
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.selectdata = res.data.result;
                    this.selectvalue = this.regionid;
                    this.showname();
                    console.log(this.selectdata)
                }
            })
        },
        showname(){
            //展示工地名
            this.selectdata.forEach(element => {
                if(element.regionid==this.regionid){
                    this.regionname = element.regionname;
                }
            })
        },
    }
}
</script>

<style>
.home{
    width: 100%;
    min-width: 1620px;
    height: 100%!important;
    /* overflow: hidden; */
}
.pagecss1{
    /* background: url('~@/assets/img/indexbg.png') no-repeat; */
    background-size: 100% 100%!important;
    color: #ffffff;
}
.pagecss2{
    background: #fff;
    color: #000000;
}
.titlecss{
    background: #374760;
    color: #fff;
}
.subnav span{
    display: inline-block;
    position: relative;
    width: 100px;
    left: -50px;
    padding-left: 50px;
}
#title{
    height: 80px;
    line-height: 80px;
}
#title{
    text-align: right;
}
#title .el-col-6:nth-child(1) span:nth-child(1){
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url('~@/assets/img/logo.png') no-repeat;
    background-size: 100% 100%;
    margin: 20px 10px 0px 0px;
    vertical-align: top;
}
#title .el-col-6:nth-child(1) span:nth-child(2){
    display: inline-block;
	vertical-align: top;
	font-size: 30px;
	letter-spacing: 0px;
}
#title .el-col-12{
    text-align: center;
}
#title .el-col-12 p{
	font-size: 36px;
    letter-spacing: 0px;
    margin: 0px;
}
#title .el-col-12 img{
    margin: 20px 0px 0px 10px;
    vertical-align: top;
    cursor: pointer;
}
#title .el-col-6:nth-child(3){
    text-align: left;
}
#title .el-col-6:nth-child(3) span:nth-child(1){
    display: inline-block;
    width: 38px;
	height: 38px;
    background-color: #0066ad;
    border-radius: 50%;
    vertical-align: top;
    margin-top: 20px; 
}
#title .el-col-6:nth-child(3) span:nth-child(2){
    display: inline-block;
	font-size: 18px;
	letter-spacing: 0px;
    color: #f4f4f4;
    vertical-align: top;
}
#nav{
    height: 40px;
    line-height: 40px;
}
.home-nav{
    width: 1344px;
    height: 40px;
    position: relative;
    margin: auto;
}
.home-nav .el-menu{
    border: none;
    background: none;
}
.home-nav a{
    display: inline-block;
    width: 100px;
    height: 40px;
    padding-left: 50px;
    text-align: left;
    text-decoration: none;
    color: #f4f4f4;
    font-size: 18px;
    margin-right: 3.2%;
    outline: none;
}
.home-nav a:nth-child(1){
    background: url('~@/assets/img/nav001.png') no-repeat 0 center;
}
.home-nav a:nth-child(2){
    background: url('~@/assets/img/nav002.png') no-repeat 0 center;
}
.home-nav a:nth-child(3){
    background: url('~@/assets/img/nav003.png') no-repeat 0 center;
}
.home-nav a:nth-child(4){
    background: url('~@/assets/img/nav004.png') no-repeat 0 center;
}
.home-nav a:nth-child(5){
    background: url('~@/assets/img/nav005.png') no-repeat 0 center;
}
.home-nav a:nth-child(6){
    background: url('~@/assets/img/nav006.png') no-repeat 0 center;
}
.home-nav a:nth-child(7){
    background: url('~@/assets/img/nav007.png') no-repeat 0 center;
    margin: 0px;
}
/* .home .el-container{
    height: 100%;
} */
.home .el-main{
    padding: 0px;
    overflow: visible;
    /* height: 100%; */
}
</style>
