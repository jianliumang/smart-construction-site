<template>
    <div id="app" class="home">
        <el-container class="container-center">
            <el-header class="container-header">
                <div class="header-name">
                    <button @click="gradingshow">选择工地：{{defaultregionname}}</button>
                    <div v-show="gradingtype" class="header-grading">
                        <div class="block">
                            <el-cascader
                                :options="options"
                                v-model="selectedOptions"
                                @change="handleChange">
                            </el-cascader>
                        </div>
                    </div>
                    <span>杜甫三期智慧工地</span>
                    <span class="username">{{information.username}}</span>
                </div>
                <div>
                    <el-menu :default-active="activeIndex" class="el-menu-demo el-menu-header" mode="horizontal">
                        <router-link to="/index" class="el-menu-item" index="1">首页</router-link>
                        <router-link to="/getindex" class="el-menu-item" index="2">考勤管理</router-link>
                        <router-link to="/environmentcue" class="el-menu-item" index="3">环境监控</router-link>
                        <router-link to="/gprspositioning" class="el-menu-item" index="4">GPRS定位</router-link>
                        <router-link to="/towerrunstate" class="el-menu-item" index="5">塔吊管理</router-link>
                        <router-link to="/videosurveillance" class="el-menu-item" index="6">视频监控</router-link>
                        <router-link to="/equipmentinspection" class="el-menu-item" index="7">设备巡检</router-link>
                    </el-menu>
                </div>
            </el-header>
            <el-container class="aside-container">
                <el-main id="router-show">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            information:null,
            defaultregionid:Number,
            powerid:6,
            activeIndex: '1',
            gradingtype: false,
            options: [],
            selectedOptions: [],
            selectdata:[],
            childrenfirst:[],
            defaultregionname: '',
            regionid: Number,
            datas:0
        }
    },
    created(){
        // if(sessionStorage.getItem("username") == null){
        //     this.$router.push('/landing');
        // }
        this.information={
            "address" : sessionStorage.getItem("address"),
            "email" : sessionStorage.getItem("email"),
            "power_id" : sessionStorage.getItem("power_id"),
            "sex" : sessionStorage.getItem("sex"),
            "username" : sessionStorage.getItem("username")
        }
        this.powerid = sessionStorage.getItem("power_id");
    },
    mounted(){
        this.powerrequest();
    },
    methods: {
      gradingshow(){
          this.gradingtype = !this.gradingtype;
      },
      handleChange(value) {
            //选择工地
            this.datas++;
            sessionStorage.setItem("regionid",value[value.length-1]);
            location.reload();
      },
      powerrequest(){
          //根据管理权限获取工地
          this.$http({
                method: "get",
                url:"http://60.191.29.210:9090/RestIOTAPI/power/toselectPower?powerid=" + this.powerid,
            })
            .then(res => {
                this.selectdata = res.data.result;
                this.selectfirst();
                this.achievename();
            })
      },
      selectfirst(){
          //一级的工地列表
          this.selectdata.forEach(element => {
              this.childrenfirst.push({
                  id:element.c_id,
                  value:element.regionid,
                  label:element.regionname
              })
          });
          this.defaultregionid = this.childrenfirst[0].value;
          if(this.powerid==6 || this.powerid==7){
              this.options = this.childrenfirst;
          }
      },
      achievename(){
          //展示工地名字
            this.selectdata.forEach(element => {
                if(sessionStorage.getItem("regionid")==element.regionid){
                    this.defaultregionname = element.regionname;
                }
            })
      }
    }
};
</script>

<style>
/* *{
    padding: 0;
    margin: 0;
} */
html,
body {
  height: 100%;
    overflow-x:hidden ;
    overflow-y: hidden;
}
.home{
  height: 100%;
}
a{
    text-decoration: none;
}
#app{
    height: 100%;
    margin-top: 0px;
}
.el-menu-header{
    position: static;
    padding-left: 16%;
}
.el-menu-header div:nth-child(1){
    height: 60px;
}
.el-menu-header a{
    width: 11%;
    height: 40px!important;
    border-top: 1px solid #000!important;
    border-bottom: 1px solid #000!important;
    border-right: 1px solid #000!important;
    line-height: 40px!important;
}
.el-menu-header a:nth-child(1){
    border-left: 1px solid #000!important;
}
.header-name button{
    height: 60px;
    border: none;
    /* width: 200px; */
    float: left;
    font-size: 24px;
    outline: none;
}
.home .username{
    float: right;
}
.header-grading{
    position: absolute;
    top: 60px;
    z-index: 100;
    background: #333;
}
.header-grading .block{
    height: 40px;
    vertical-align: top;
}
.container-center{
    height: 100%;
}
.container-header{
    height: 100px!important;
    padding: 0px;        
}
.aside-container{
    height: 100%;
    border: 1px solid #eee
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  height: auto;
}

.el-aside {
  color: #333;
}
.el-menu-item-group .el-menu-item-group__title{
    display: none;
}
.el-main-title{
    width: 100%;
    height: 60px;
    background: #ccc;
    padding: 0 20px;
    line-height: 60px;
    text-align: right; 
    font-size: 12px
}
#router-show{
    padding: 0px;
}
</style>
