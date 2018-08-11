<template>
    <div class="equipmentinspection">
        <el-container class="aside-container">
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
    height: 100%;
    color: #000000;
}
.equipmentinspection .aside-parent{
    background: #293950;
}
.equipmentinspection .aside-parent img{
    padding-right: 20px;
}
.el-aside-nav{
    position: relative;
    height: 100%;
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
.equipmentinspection .el-main{
    overflow: auto;
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
