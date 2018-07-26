<template>
    <div  id="app" class="main">
        <div class="block">
            <span class="demonstration">温度历史查询</span>
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker
                    v-model="dates"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    align="right"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    >
            </el-date-picker>
                </el-form-item>
                <el-form-item><el-button  @click="query">查询</el-button></el-form-item>
            </el-form>
        </div>
<div class="data-table">
    <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            style="width: 100%"

    >





<el-menu :default-openeds="['2','3','4']">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>环境监控</template>
                            <el-submenu index="1-1">
                                <template slot="title">温度</template>
                                <router-link to="/temperature" class="el-menu-item" index="1-1-1">今日温度变化</router-link>
                                <router-link to="/temperatureinstantly" class="el-menu-item" index="1-1-2">实时温度变化</router-link>
                                <router-link to="/historicalinquiry" class="el-menu-item" index="1-1-3">温度历史查询</router-link>
                            </el-submenu>
                            <el-submenu index="1-2">
                                <template slot="title">湿度</template>
                                <router-link to="/humidity" class="el-menu-item" index="1-2-1">今日湿度变化</router-link>                                
                                <router-link to="/temperatureinstantly" class="el-menu-item" index="1-1-2">实时湿度变化</router-link>
                                <router-link to="/historicalinquiry" class="el-menu-item" index="1-1-3">湿度历史查询</router-link>
                            </el-submenu>
                            <el-submenu index="1-3">
                                <template slot="title">光照</template>
                                <router-link to="/illumination" class="el-menu-item" index="1-3-1">今日光照变化</router-link>
                                <router-link to="/temperatureinstantly" class="el-menu-item" index="1-1-2">实时光照变化</router-link>
                                <router-link to="/historicalinquiry" class="el-menu-item" index="1-1-3">光照历史查询</router-link>
                            </el-submenu>
                            <el-submenu index="1-4">
                                <template slot="title">噪音</template>
                                <router-link to="/noise" class="el-menu-item" index="1-4-1">今日噪音变化</router-link>
                                <router-link to="/temperatureinstantly" class="el-menu-item" index="1-1-2">实时噪音变化</router-link>
                                <router-link to="/historicalinquiry" class="el-menu-item" index="1-1-3">噪音历史查询</router-link>
                            </el-submenu>
                            <el-submenu index="1-5">
                                <template slot="title">PM2.5</template>
                                <router-link to="/PM2" class="el-menu-item" index="1-5-1">今日PM2.5变化</router-link>
                                <router-link to="/temperatureinstantly" class="el-menu-item" index="1-1-2">实时PM2.5变化</router-link>
                                <router-link to="/historicalinquiry" class="el-menu-item" index="1-1-3">PM2.5历史查询</router-link>
                            </el-submenu>
                            <el-submenu index="1-6">
                                <template slot="title">PM10</template>
                                <router-link to="/PM10" class="el-menu-item" index="1-6-1">今日PM10变化</router-link>
                                <router-link to="/temperatureinstantly" class="el-menu-item" index="1-1-2">实时PM10变化</router-link>
                                <router-link to="/historicalinquiry" class="el-menu-item" index="1-1-3">PM10历史查询</router-link>
                            </el-submenu>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-menu"></i>gprs定位&nbsp;&nbsp;&nbsp;&nbsp;</template>
                            <el-menu-item-group>
                                <router-link to="/gprsaddress" class="el-menu-item" index="2-1">实时定位系统</router-link>
                                <router-link to="/gprshistory" class="el-menu-item" index="2-2">历史路径回放</router-link>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-setting"></i>塔吊运行状态</template>
                            <el-menu-item-group>
                                <router-link to="/animation" class="el-menu-item" index="2-1">实时数据-动画</router-link>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-setting"></i>视频监控&nbsp;&nbsp;&nbsp;&nbsp;</template>
                            <el-menu-item-group>
                                <router-link to="/video" class="el-menu-item" index="4-1">视频监控</router-link>

                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-setting"></i>劳务实名制</template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="3-1">选项1</el-menu-item>
                                <el-menu-item index="3-2">选项2</el-menu-item>
                                <el-menu-item index="3-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="3-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                    </el-menu>








    
        <el-table-column prop="temperature"  label="数据"
                         width="400"></el-table-column>
        <el-table-column prop="sendtime"  label="更新时间"
        ></el-table-column>
    </el-table>
</div>
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 50, 100, 200]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
<div>
    <span class="demonstration" @click="queryEquipment">传感器信息</span>

    <span>设备名称：{{ enname}}</span>
    <span >设备编号：{{enid}}</span>
    <span >当前状态：{{online}}</span>
    <span >更新时间：{{dstime}}</span>
    <span >设备等级：{{powerid}}</span>
    <span > 序列号：{{serialnum}}</span>
</div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      dates: [],
      echData: [],
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dstime: "",
      enid: "",
      enname: "",
      powerid: "",
      serialnum: "",
      online: ""
    };
  },
  mounted() {
    let startTime = this.getTime() + " 00:00:00";
    let endTime = this.getTime() + " 23:59:59";
    this.dates = [startTime, endTime];
    this.query();
  },
  methods: {
    getTime() {
      let date = new Date();
      let connect = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + connect + month + connect + strDate;
      return currentdate;
    },
    query() {
      var self = this;
      var times = [];
      var tem = [];
      var stTime = this.dates[0];
      var enTime = this.dates[1];
      this.$http({
        method: "get",
        url:
          "http://60.191.29.210:9090/RestIOTAPI/environmentalmonitoring/toHistoryFromTimeToTime2?startTime=" +
          stTime +
          "&endTime=" +
          enTime + "&enviromental_id=2",
        responsetype: "json"
      })
        .then(function(response) {
          console.log(response);
          if (response) {
            for (var i = 0; i < response.data.result.length; i++) {
              times.push(response.data.result[i].sendtime); //挨个取出时间并填入时间数组
              tem.push(response.data.result[i].temperature); //挨个取出温度并填入温度数组
            }
            self.tableData = response.data;
            self.total = response.data.length;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      // console.log(`当前页: ${val}`);
    },
    queryEquipment() {
      var _this = this;
      axios({
        method: "get",
        url:
          "http://60.191.29.210:9090/RestIOTAPI/equipment/toselectequipment?enviromental_id=2",
        responsetype: "json"
      }).then(function(response) {
        if (response) {
          console.log(response);
          //                        dstime.push(response.datesendtime)
          //                        enid.push(response.enviromental_id)
          //                        enname.push(response.equipment_name)
          //                        powerid.push(response.power_id)
          //                        serialnum.push(response.serial_number)
          _this.dstime = response.data.result.datesendtime;
          _this.enid = response.data.result.enviromental_id;
          _this.enname = response.data.result.equipment_name;
          _this.powerid = response.data.result.power_id;
          _this.serialnum = response.data.result.serial_number;
          _this.online = response.data.result.online;
        }
      });
    }
  }
};
</script>

<style>
.main {
  width: 1800px;
  height: 800px;
  border: 1px solid salmon;
}
.data-table{
width: 80%;
height: 600px;
overflow: auto
}
</style>
