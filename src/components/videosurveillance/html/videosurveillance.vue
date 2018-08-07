<template>
    <div class="videosurveillance">
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
.videosurveillance{
    height: 100%;
}
.videosurveillance .el-container{
    height: 100%;
}
.videosurveillance .el-menu{
    height: 100%;
}
</style>
