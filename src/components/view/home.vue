<template>
    <div class="home">
        <el-row id="title" class="titlecss" v-show="fullscreen">
            <div class="title-cneter">
                <div class="logo">
                    <span></span>
                    <span>大境筑智慧物联</span>
                </div>
                <div>
                    <p>
                        <el-select @change="handleChange" v-model="selectvalue" placeholder="请选择">
                            <el-option
                            v-for="item in selectdata"
                            :key="item.regionid"
                            :label="item.regionname"
                            :value="item.regionid">
                            </el-option>
                        </el-select>
                    </p>
                    <p>
                        <span>晴</span><span></span><span>31~35℃</span>
                    </p>
                </div>
                <div class="user-info">
                    <el-dropdown trigger="hover" @command="handleCommand">
                        <span class="topimg"></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="modifypwd">修改密码</el-dropdown-item>
                            <el-dropdown-item command="exit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span class="el-dropdown-link">
                        {{username}}
                        <!-- {{true?`<span>1111</span>`:"22222"}} -->
                    </span>
                </div>
            </div>
        </el-row>
        <el-container>
            <div class="aside-nav">
                <div class="" v-show="fullscreen">
                    <el-radio-group :class="isCollapse?'':'nav-menu'" v-model="isCollapse" style="margin-bottom: 20px;">
                        <el-button @click="isCollapse=!isCollapse;" type="info" circle></el-button>
                    </el-radio-group>
                    <el-menu :default-openeds="[nownav]" router :default-active="nownav" text-color="#fff" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#174566" active-text-color="#ffd04b">
                        <template v-for="route in $router.options.routes" router v-if="route.hidden">
                            <template  v-for="(xRoute,xIndex) in route.children" v-if="xRoute.hidden">
                                <el-menu-item @click="navbgstyle(xIndex)" :route="xRoute" :index="xRoute.name" v-if="!xRoute.children" :key="xIndex" :class="nownav==xRoute.name?'first-title is-active':'first-title'">
                                    <!-- {{navIndex}} -->
                                    <span :style="{'display':navIndex==xIndex?'':'none'}" class="firstientification"></span><span :style="{'display':navIndex==xIndex?'none':''}" class="lastientification"></span>
                                    <img v-show="!isCollapse" :src="xRoute.icon" alt="">
                                    <span slot="title" class="title-text">{{xRoute.name}}</span>
                                </el-menu-item>
                                <el-submenu class="first-title" v-if="xRoute.children" :key="xIndex" :index="xRoute.name">
                                    <template @click="navbgstyle(xIndex)" slot="title">
                                        <!-- {{navIndex}} -->
                                        <span :style="{'display':navIndex==xIndex?'':'none'}" class="firstientification"></span><span :style="{'display':navIndex==xIndex?'none':''}" class="lastientification"></span>
                                        <img v-show="!isCollapse" :src="xRoute.icon" alt="">
                                        <span slot="title" class="title-text">{{xRoute.name}}</span>
                                    </template>
                                    <el-menu-item v-if="xRoute.children" v-for="(cRoute, cIndex) in xRoute.children"  :key="cIndex" :index="cRoute.name" :route="cRoute">
                                        <span slot="title" >{{cRoute.name}}</span>
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                        </template>
                    </el-menu>
                </div>
            </div>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-button v-if="nownav=='首页'" class="fullscreensty" :style="{'background':fullscreen?'url('+fullscreen2+') no-repeat center center':'url('+fullscreen1+') no-repeat center center'}" @click="fullscreen=!fullscreen;" type="info" circle></el-button>
        </el-container>
    </div>
</template>

<script>
import indexbg from '@/assets/img/indexbg.png'
import fullscreen1 from '@/assets/img/fullscreen1.png'
import fullscreen2 from '@/assets/img/fullscreen2.png'
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
            indexbg:indexbg,
            fullscreen1:fullscreen1,
            fullscreen2:fullscreen2,
            isCollapse: true,//左侧导航栏显示
            icon:'el-icon-d-arrow-right',//显示按钮的图标
            username:'admin',
            nownav:'首页',
            navIndex:1,
            fullscreen:true,
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
        this.username = sessionStorage.getItem("username");
        this.regionid = sessionStorage.getItem("regionid");
        this.powerid = sessionStorage.getItem("power_id");
        this.navIndex = sessionStorage.getItem("navIndex")||1;
        console.log(this.navIndex)
        this.nownav = localStorage.getItem("nownav")||'首页';
    },
    mounted(){
        this.powerrequest();
        console.log(this.nownav,localStorage.getItem("navIndex"))
    },
    methods: {
        navbgstyle(index){
            console.log(index)
            // ev.$el.style.background='#ccc'
            var firstspanele=document.getElementsByClassName('firstientification');
            var lastspanele=document.getElementsByClassName('lastientification');
            var liele=document.getElementsByClassName('el-menu')[0].getElementsByClassName('first-title');
            var tit = document.getElementsByClassName('el-menu')[0].getElementsByClassName('is-active')
            this.navIndex=index
            sessionStorage.setItem('navIndex',index)
            console.log(liele);
            console.log(tit);
            for(var i=0;i<firstspanele.length;i++){
                console.log(firstspanele[i])
                firstspanele[i].style.display='none';
                lastspanele[i].style.display='';
                
            }
            // liele[index-1].style.background='green';
            if(index-1<3){
                this.nownav=liele[index-1].children[3].innerHTML;
                localStorage.setItem("nownav",liele[index-1].children[3].innerHTML);
            }else{

            }
            
            firstspanele[index-1].style.display='';
            lastspanele[index-1].style.display='none';
        },
        handleOpen(key, keyPath) {
            console.log(666666666666666)
            console.log(key, keyPath);
            this.nownav=key;
            localStorage.setItem("nownav",key);
            var index;
            var textele = document.getElementsByClassName('title-text');
            for(var i=0;i<textele.length;i++){
                if(key==textele[i].innerHTML){
                    index=i;
                }
            }
            this.navbgstyle(index+1)
        },
      handleClose(key, keyPath) {
        console.log(key, keyPath);

      },
        handleCommand(command) {
            if(command=='exit'){
                localStorage.removeItem('token')
                this.$router.push('/landing')
            }else{
                this.$router.push('/revisepwd');
            }
        },
        clicktype(){
            console.log(44444444444444)
            console.log(this.clickshow)
            this.clickshow=!this.clickshow;
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
                    // this.showname();
                    console.log(this.selectdata)
                }
            })
        },
    },
    beforeDestroy(){
        sessionStorage.removeItem('navIndex')
    }
}
</script>

<style>

.el-menu-item:focus, .el-menu-item:hover{
    background: none;
}
.home{
    width: 100%;
    min-width: 1344px;
    height: 100%!important;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: #ffffff;
}
.titlecss{
    background:url('~@/assets/img/indexbg.png');
    color: #fff;
}
.subnav span{
    display: inline-block;
    position: relative;
    width: 100%;
    left: -35px;
    padding-left: 40px;
}
#title{
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: center;
}
.title-cneter{
    width: 1400px;
    display: flex;
    justify-content: space-between;
}
#title{
    text-align: right;
}
.title-cneter .logo span:nth-child(1){
    display: inline-block;
    width: 45px;
    height: 45px;
    background: url('~@/assets/img/logo.png') no-repeat;
    background-size: 100% 100%;
    margin: 10px 10px 0px 0px;
    vertical-align: top;
}
.title-cneter .logo+div input{
    width: auto;
    background: none;
    border: none;
    color: #fff;
    font-size: 32px;
    background: url('~@/assets/img/change.png') no-repeat right center;
}
.title-cneter .logo+div .el-input__suffix{
    display: none!important;
}
.title-cneter div:nth-child(1) span:nth-child(2){
    display: inline-block;
	vertical-align: top;
	font-size: 30px;
	letter-spacing: 0px;
}
.title-cneter div:nth-child(2){
    text-align: center;
    display: flex;
}
.title-cneter div:nth-child(2) p:nth-child(1){
	font-size: 36px;
    letter-spacing: 0px;
    margin: 0px;
    height: 100%;
}
.title-cneter div:nth-child(2) p:nth-child(2){
    display: flex;
    align-items: center;
}
.title-cneter div:nth-child(2) p:nth-child(2) span{
    padding: 0 10px;
}
.title-cneter div:nth-child(2) p:nth-child(2) span:nth-child(2){
    display: inline-block;
    width: 40px;
    height: 30px;
    background: url('~@/assets/img/weather.png') no-repeat 0 center;
    background-size: 100% 100%;
}
.title-cneter div:nth-child(2) img{
    margin: 10px 0px 0px 10px;
    vertical-align: top;
    cursor: pointer;
}
.title-cneter div:nth-child(3){
    text-align: left;
}
.user-info{
    display: flex;
}
.title-cneter .topimg{
    display: inline-block;
    width: 38px;
	height: 38px;
    background-color: #0066ad;
    border-radius: 50%;
    vertical-align: top;
    margin-top: 10px; 
}
.title-cneter .el-dropdown{
    display: inline-block;
    height: 40px;
	font-size: 18px;
	letter-spacing: 0px;
    color: #f4f4f4;
    vertical-align: top;
    margin-left: 20px;
}
.home #title+.el-container{
    flex: 1;
    height: 100%;
    display: flex;
}
/* ------------左侧导航栏------------------ */
.aside-nav{
    /* min-width: 200px; */
    /* width: 200px; */
    position: relative;
    height: 100%;
    /* overflow: hidden; */
    background: url('~@/assets/img/indexbg.png') no-repeat;
    background-size: 100% 100%;
}
.aside-nav .is-active,.aside-nav .is-opened .el-submenu__title{
   background-color: rgb(18,55,82) !important;
}
.aside-nav .is-opened .el-submenu__title{
    font-weight: 700;
    color: #ffd04b!important;
}
.aside-nav .is-active .firstientification{
    background: #4571ec!important;
}
.aside-nav a{
    color: #fff;
    text-decoration: none;
}
.aside-nav ul{
    background: none;
    border: none;
    color: #fff;
}
.aside-nav ul div{
    padding: 0px 20px 0px 0px!important;
    display: flex;
    /* justify-content: space-between; */
    overflow: hidden;
    align-items: center;
}
.aside-nav ul div li{
    padding: 0px!important;
    text-align: left;
}
.aside-nav .el-menu-item{
    text-align: left;
    padding-left: 0px!important;
}
.aside-nav li .el-menu-item{
    padding-left: 60px!important;
}
.aside-nav img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.aside-nav .firstientification,.aside-nav .lastientification{
    display: inline-block;
    height: 100%;
    width: 10px;
}
.aside-nav .firstientification{
    background: #4571ec
}
.aside-nav .el-radio-group{
    position: absolute;
    z-index: 100;
    width: 30px;
    right: 0px;
    top: 10px;
}
.aside-nav .el-radio-group .el-button{
    background: url('~@/assets/img/navtit1.png');
    background-size: 100% 100%;
}
.el-menu--collapse{
    width: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    height: 100%;
  }
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}
.nav-menu{
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
}
.home .el-main{
    padding: 10px;
    overflow: visible;
    height: 100%;
    flex: 1;
    /* min-height: 640px; */
}
.fullscreensty{
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-size: 20px 20px!important;
}
</style>
