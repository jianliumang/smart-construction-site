<template>
    <div class="gprspositioning">
        <el-container class="aside-container">
            <!-- <div class="aside-parent">
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
                                    <img src="@/assets/img/nav004.png" alt="">
                                </i>
                                <span>GPRS定位</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1">
                                    <router-link to="/gprspositioning/gprsaddress" index="1-1">实时定位系统</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                    <router-link to="/gprspositioning/gprshistory" index="1-2">历史路径回放</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-3">
                                    <router-link to="/gprspositioning/gprshatdata" index="1-3">人员信息表</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
            </div> -->
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
    methods: {
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
.gprspositioning{
    height: 100%;
    color: #000000;
}
.gprspositioning .aside-parent{
    background: #293950;
}
.gprspositioning .aside-parent img{
    padding: 0px 12px 0px 8px;
}
.el-aside-nav{
    position: relative;
    height: 100%;
    top: -40px;
    background: #293950;
}
.el-aside-navchange{
    position: absolute;
    height: 40px;
    top: 60px;
    background: #293950;
}
.gprspositioning .aside-container{
    height: 100%;
}
.gprspositioning li li{
    width: 100%;
    padding: 0px!important;
}
.gprspositioning .el-menu div{
    width: 200px;
    padding-top: 0px;
    padding-bottom: 0px;
}
.gprspositioning .el-submenu__title{
    height: 40px;
    line-height: 40px;
}
.gprspositioning .el-menu a{
    position: relative;
    display: inline-block;
    color: #fff;
    text-decoration: none;
    width: 140px;
    height: 50px;
    padding-left: 60px;
    text-align: left;
}
</style>
