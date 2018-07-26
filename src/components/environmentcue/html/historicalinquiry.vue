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
                    :picker-options="pickerOptions2">
            </el-date-picker>
                </el-form-item>
                <el-form-item><el-button  @click="query">查询</el-button></el-form-item>
            </el-form>
        </div>
        <div  id="main" class="temperature"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一小时",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      dates: [],
      echData: []
    };
  },
  mounted() {
    let startTime = this.getTime() + " 00:00:00";
    let endTime =
      this.getTime() == this.setPartTime() ? this.setAllTime() : this.getTime() + " 23:59:59";
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
      var myChart = this.$echarts.init(document.getElementById("main"));
      var times = [];
      var tem = [];
      var stTime = this.dates[0];
      var enTime = this.dates[1];
      this.$http({
        method: "get",
        url:
          this.HOST+"/environmentalmonitoring/toHistoryFromTimeToTime2?startTime=" +
          stTime +
          "&endTime=" +
          enTime + "&enviromental_id=2",
        responsetype: "json"
      })
        .then(function(response) {
          times=[];
          tem=[];
          if (response) {
            for (var i = 0; i < response.data.result.length; i++) {
              times.push(response.data.result[i].sendtime); //挨个取出时间并填入时间数组

              tem.push(response.data.result[i].temperature); //挨个取出温度并填入温度数组
            }
          }
          myChart.setOption({
            title: {
              text: "历史温度变化曲线"
            },
            tooltip: {
              trigger: "axis",
              axisPointer: {
                axis: "x"
              }
            },
            legend: {
              data: ["温度"]
            },
            dataZoom: {
              show: true,
              realtime: true,
              showDetail: true,
              y: 36,
              height: 20,
              start: 10,
              end: 20,
              top: "bottom"
            },
            xAxis: {
              data: times,
              axisLabel: {
                show: true
              }
            },
            yAxis: {},
            series: [
              {
                // 根据名字对应到相应的系列
                name: "温度",
                type: "line",
                data: tem
              }
            ]
          });
        })
        .catch(function(error) {
          console.log(error);
          alert("图表请求数据失败!");
          myChart.hideLoading();
        });
    }
  }
};
</script>

<style>
.main{
    width: 100%;
}
.temperature{
    width: 90%;
    height: 600px;
    border:1px solid salmon;
    margin-left: 50px;
}
.el-picker-panel{
  left: 25%!important;
}
/* .available{
    color: #f00;
} */
</style>
