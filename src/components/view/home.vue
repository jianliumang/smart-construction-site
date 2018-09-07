<template>
    <div class="home">
        <el-row id="title" class="titlecss">
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
                   
                </div>
                <div class="user-info">
                     <p>
                        <span>晴</span><span></span><span>31~35℃</span>
                    </p>
                    <el-dropdown trigger="hover" @command="handleCommand">
                        <span class="topimg"></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="modifypwd">修改密码</el-dropdown-item>
                            <el-dropdown-item command="siteinfo">工地信息</el-dropdown-item>
                            <el-dropdown-item command="exit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span class="el-dropdown-link">
                        {{username}}
                    </span>
                </div>
            </div>
        </el-row>
        <el-container>
            <div class="aside-nav">
                <div class="" v-show="fullscreen">
                    <el-radio-group :class="isCollapse?'nav-menu-change':'nav-menu'" v-model="isCollapse" v-show="nownavbg!='首页'">
                        <el-button @click="isCollapse=!isCollapse;" type="info" :class="isCollapse?'nav-button':''"></el-button>
                    </el-radio-group>
                    <el-menu :default-openeds="[nownav]" router :default-active="nownav" text-color="#fff" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handSelect" :collapse="isCollapse" background-color="#174566" active-text-color="#ffd04b" :style="{'border-top': nownavbg=='首页'?'46px solid #174566':'46px solid #4d6ad6'}">
                        <template v-for="route in $router.options.routes" router v-if="route.hidden">
                            <template  v-for="(xRoute,xIndex) in route.children" v-if="xRoute.hidden">
                                <el-menu-item @click="navbgstyle(xIndex)" :route="xRoute" :index="xRoute.name" v-if="!xRoute.children" :key="xIndex" :class="nownav==xRoute.name?'first-title is-active':'first-title'" :style="{'padding':isCollapse?'0px':'0px 20px','text-align':isCollapse?'center':'left'}">
                                    <span :style="{'display':navIndex==xIndex?'':'none'}" class="firstientification"></span><span :style="{'display':navIndex==xIndex?'none':''}" class="lastientification"></span>
                                    <img :src="xRoute.icon" alt="" :style="{'margin-right':isCollapse?'0px':'10px'}">
                                    <span class="title-text">{{xRoute.name}}</span>
                                </el-menu-item>
                                <el-submenu class="first-title" v-if="xRoute.children" :key="xIndex" :index="xRoute.name">
                                    <template @click="navbgstyle(xIndex)" slot="title">
                                        <span :style="{'display':navIndex==xIndex?'':'none'}" class="firstientification"></span><span :style="{'display':navIndex==xIndex?'none':''}" class="lastientification"></span>
                                        <img class="img-index" :src="xRoute.icon" alt="" :style="{'position':isCollapse?'relative':'','left':'0px','right':'0px','margin':isCollapse?'0px auto':'0px 10px 0px 0px'}">
                                        <span slot="title" class="title-text">{{xRoute.name}}</span>
                                    </template>
                                    <el-menu-item v-if="cRoute.hidden" v-for="(cRoute, cIndex) in xRoute.children"  :key="cIndex" :index="cRoute.name" :route="cRoute" :class="navsub==cRoute.name?'is-active':''">
                                        <span slot="title" >{{cRoute.name}}</span>
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                        </template>
                    </el-menu>
                </div>
            </div>
            <el-main :style="{'background':nownavbg=='首页'?'none':'#fff'}">
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

import bus from '../../assets/js/event.js'
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
            nownavbg:'首页',
            navsub:'首页',
            navIndex:1,
            fullscreen:true,
        }
    },
    created(){
        this.username = sessionStorage.getItem("username");
        this.regionid = sessionStorage.getItem("regionid");
        this.powerid = sessionStorage.getItem("power_id");
        this.navIndex = sessionStorage.getItem("navIndex")||1;
        this.nownav = localStorage.getItem("nownav")||'首页';
        this.navsub = sessionStorage.getItem("navsub")||'首页';
        this.nownavbg = sessionStorage.getItem("nownavbg")||'首页';
        if(location.href.substr(-5,5)=='index'){
            this.isCollapse=false;
        }else{
            this.isCollapse=true
        }
        //页面刚进入时开启长连接
        this.initWebSocket()
    },
    mounted(){
        this.powerrequest();
        // this.rective()
    },
    methods: {
        rective(val){
            bus.$emit('infodata',val)
        },
        initWebSocket(){ //初始化weosocket
            this.websock = new WebSocket("ws://192.168.1.88:8080/RestIOTAPI/websocket");
            this.websock.onopen = this.websocketonopen;
            // this.websock.onerror = this.websocketonerror;
            this.websock.onmessage = this.websocketonmessage; 
            this.websock.onclose = this.websocketclose;
            
        },
        websocketonopen(){
            console.log('连接成功')
        },
        websocketonmessage(e){ //数据接收
            console.log(e);
            // console.log('数据接收')
            this.rective(e);
        },
        websocketclose(e){
            console.log('断开连接')
        },
        handSelect(index,path){
            // console.log(index,path);
            var arr = [];
            this.$router.options.routes.forEach(element => {
                if(element.hidden){
                    element.children.forEach(ele => {
                        if(ele.hidden){
                            arr.push(ele.name);
                        }
                    })
                }
            });
            this.nownav=path[0];
            localStorage.setItem("nownav",path[0]);
            var index=arr.indexOf(path[0]);
            this.navbgstyle(index+1)
            // console.log(arr)
            if(path.length==1){
                this.nownavbg==index;
            }
            this.navsub=path[1];
            sessionStorage.setItem('navsub',path[1])
        },
        navbgstyle(index){
            // console.log(index)
            var firstspanele=document.getElementsByClassName('firstientification');
            var lastspanele=document.getElementsByClassName('lastientification');
            var liele=document.getElementsByClassName('el-menu')[0].getElementsByClassName('first-title');
            this.navIndex=index
            sessionStorage.setItem('navIndex',index)
            for(var i=0;i<firstspanele.length;i++){
                firstspanele[i].style.display='none';
                lastspanele[i].style.display='';
            }
            if(index-1<2){
                this.nownav=liele[index-1].children[3].innerHTML;
                localStorage.setItem("nownav",liele[index-1].children[3].innerHTML);
            }else{

            }
            firstspanele[index-1].style.display='';
            lastspanele[index-1].style.display='none';
        },
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
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
            // console.log(key, keyPath);
        },
        handleCommand(command) {
            if(command=='exit'){
                localStorage.removeItem('token')
                localStorage.removeItem('nownav')
                sessionStorage.removeItem('nownavbg')
                sessionStorage.removeItem('navIndex')
                sessionStorage.removeItem('navsub')
                this.$router.push('/login')
            }else if(command=='siteinfo'){
                this.$router.push('/siteinfo');
            }else{
                this.$router.push('/revisepwd');
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
                // console.log(res)
                if(res.data.code==200){
                    this.selectdata = res.data.result;
                    this.selectvalue = this.regionid;
                    // this.showname();
                    // console.log(this.selectdata)
                }
            })
        },
    },
    watch:{
    //监听路由
        $route: {
            handler: function (val, oldVal) {
                // console.log(val,oldVal)
                this.nownavbg=val.name;
                sessionStorage.setItem("nownavbg",val.name)
                if(val.name=='首页'){
                    this.isCollapse=false;
                }
            },
            //深度观察监听
            deep: true
        }
    },
    beforeDestroy(){
        // sessionStorage.removeItem('navIndex');
        this.websock.close();
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 30px
}
#title{
    text-align: right;
}
.title-cneter .logo span:nth-child(1){
    display: inline-block;
    width: 35px;
    height: 35px;
    background: url('~@/assets/img/logo.png') no-repeat;
    background-size: 100% 100%;
    margin: 12px 10px 0px 0px;
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
.title-cneter div:nth-child(3) p{
    display: flex;
    align-items: center;
}
.title-cneter div:nth-child(3) p span{
    padding: 0 10px;
}
.title-cneter div:nth-child(3) p span:nth-child(2){
    display: inline-block;
    width: 40px;
    height: 30px;
    background: url('~@/assets/img/weather.png') no-repeat 0 center;
    background-size: 100% 100%;
}
.title-cneter div:nth-child(3) img{
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
    margin-right: 10px;
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
    background: url('~@/assets/img/indexbg.png') no-repeat;
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
   color: #ffd04b!important;
}

.aside-nav .is-opened .el-submenu__title{
    font-weight: 700;
    color: #fff!important;
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
    padding: 0px 0px 0px 0px!important;
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
    padding-left: 67px!important;
}
.aside-nav img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.aside-nav .firstientification,.aside-nav .lastientification{
    display: inline-block;
    height: 100%;
    width: 5px;
}
.aside-nav .firstientification{
    background: #4571ec
}
.aside-nav .el-radio-group{
    /* position: absolute; */
    position: absolute;
    z-index: 100;
    width: 25px;
    height: 25px;
    background: #4d6ad6;
    /* transition: right 5s linear; */
    /* right: 10px; */
    top: 10px;
    right: 12px;
}
.aside-nav .el-radio-group .el-button{
    background: url('~@/assets/img/navtit1.png') no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    padding: 0px;
    border-radius: 0px;
    border: 1px solid #fff;
}
.nav-button{
    background-size: 25px 25px!important;
    border: none!important;
}
.img-index{
    padding: 4px;
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
    right: -12px!important;
    
}
.nav-menu-change{
    width: 50px!important;
    height: 46px!important;
    top: 0px!important;
    right: 0px!important;
}
.home .el-main{
    padding: 10px;
    overflow: visible;
    height: 100%;
    flex: 1;
    /* min-height: 640px; */
}
.home .aside-nav+.el-main{
    /* background: #fff; */
    border-radius: 5px 5px 0px 0px;
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
