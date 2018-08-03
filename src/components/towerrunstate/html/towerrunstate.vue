<template>
    <div class="towerrunstate">
        <el-container class="aside-container">
                <div class="aside-parent">
                    <el-aside id="gpsaside" class="el-aside-nav" width="200px" style="overflow:hidden">
                        <el-menu
                        :default-openeds="['1']"
                        default-active="2"
                        class="el-menu-vertical-demo"
                        background-color="#293950"
                        text-color="#fff"
                        @open="handleOpen"
                        @close="handleClose"
                        active-text-color="#e45823">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i>
                                        <img src="@/assets/img/nav005.png" alt="">
                                    </i>
                                    <span>塔吊管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1">
                                        <router-link to="/towerrunstate/towerrrealtime" index="1-1">塔吊实时动画</router-link>
                                    </el-menu-item>
                                    <el-menu-item index="1-2">
                                        <router-link to="/towerrunstate/towerrhistoryanimation" index="1-2">塔吊历史动画</router-link>
                                    </el-menu-item>
                                    <el-menu-item index="1-3">
                                        <router-link to="/towerrunstate/towerrhistorydata" index="1-3">塔吊历史数据</router-link>
                                    </el-menu-item>
                                    <el-menu-item index="1-4">
                                        <router-link to="/towerrunstate/towerralarminformation" index="1-4">塔吊报警信息</router-link>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                </div>
                <el-container>
                    <el-main id="router-show">
                        <router-view></router-view>
                    </el-main>
                </el-container>
            </el-container>
    </div>
</template>

<script>
export default {
    data(){
        return{
            leftheight:''
        }
    },
    mounted(){
        // this.setheight();
    },
    methods: {
        setheight(){
            document.getElementById("gpsaside").style.height = document.getElementsByClassName("towerrunstate")[0].clientHeight+40+'px';
        },
        handleOpen(key, keyPath) {
            document.getElementById("gpsaside").classList.add('el-aside-nav');
            document.getElementById("gpsaside").classList.remove('el-aside-navchange');
        },
        handleClose(key, keyPath) {
            document.getElementById("gpsaside").classList.remove('el-aside-nav');
            document.getElementById("gpsaside").classList.add('el-aside-navchange')
        }
    }
}
</script>

<style>
.towerrunstate{
    height: 100%;
}
.towerrunstate .aside-container{
    height: 100%;
}
.el-aside-nav{
    position: relative;
    height: 100%;
    top: -40px;
    background: #293950;
    /* border-bottom: 40px solid #293950; */
}
.towerrunstate .aside-parent{
    background: #293950;
}
.towerrunstate .aside-parent img{
    padding-right: 10px;
}
.el-aside-navchange{
    position: absolute;
    height: 40px;
    top: 60px;
    background: #293950;
}
.towerrunstate li li{
    width: 100%;
    padding: 0px!important;
}
.towerrunstate .el-menu div{
    width: 200px;
    padding-top: 0px;
    padding-bottom: 0px;
}
.towerrunstate .el-submenu__title{
    height: 40px;
    line-height: 40px;
}
.towerrunstate .el-menu a{
    position: relative;
    display: inline-block;
    color: #fff;
    text-decoration: none;
    width: 100%;
    height: 50px;
}
</style>
