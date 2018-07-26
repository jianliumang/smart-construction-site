<template>
    <div class="equipmentinspection">
        <el-container class="aside-container">
            <el-aside id="gpsaside" class="el-aside-nav" width="200px" style="overflow:hidden">
                <el-menu
                :default-openeds="['1']"
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#293950"
                text-color="#fff"
                active-text-color="#e45823">
                    <el-submenu index="1">
                        <template slot="title">
                            <i>
                                <img src="@/assets/img/nav007.png" alt="">
                            </i>
                            <span>设备巡检</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link to="/equipmentinspection/inputinfo" index="1-1">生成二维码</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/equipmentinspection/jump" index="1-2">二维码展示</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <router-link to="/equipmentinspection/management" index="1-3">设备管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-4">
                                <router-link to="/equipmentinspection/inspectionrecord?equipmentNumber=10301229&equipmentTypeNumber=1" index="4">巡检记录</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-5">
                                <router-link to="/equipmentinspection/qrcode?equipmentNumber=10301229&equipmentTypeNumber=1" index="5">巡检</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
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

}
</script>

<style>
.equipmentinspection{
    height: 1000px;
}
.el-aside-nav{
    position: relative;
    height: 1040px;
    top: -40px;
    background: #293950;
}
/* .el-icon-location{
    background: url('~@/assets/img/nav007.png') no-repeat;
    background-size: 100% 100%;
} */
.el-aside-navchange{
    position: absolute;
    height: 40px;
    top: 80px;
    background: #293950;
}
.equipmentinspection .aside-container{
    height: 100%;
}
.equipmentinspection li li{
    width: 100%;
    padding: 0px!important;
}
.equipmentinspection .el-menu div{
    width: 200px;
    padding-top: 0px;
    padding-bottom: 0px;
}
.equipmentinspection .el-submenu__title{
    height: 40px;
    line-height: 40px;
}
.equipmentinspection .el-menu a{
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
