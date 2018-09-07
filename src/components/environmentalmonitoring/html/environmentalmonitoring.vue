<template>
    <div class="environmentalmonitoring">
        <el-container class="aside-container">
            <el-main id="router-show">
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.environmentalmonitoring{
    height: 100%;
    color: #000000;
}
.environmentalmonitoring .el-container{
    height: 100%;
}
.environmentalmonitoring .el-menu{
    height: 100%;
}
</style>
