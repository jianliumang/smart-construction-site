<template>
    <div class="home">
      <!--创建一个echarts的容器-->
      <div id="myChart" :style="{width: '900px', height: '300px'}"></div>
      <!-- <input type="button" value="查询" @click="drawLine"> -->
      <!-- <div id="myhistoryChart" :style="{width: '900px', height: '300px'}"></div> -->
    </div>
  </template>
  
  <script>
export default {
  name: "noise",
  data() {
    return {
      weathtime: [],
      weathdata: [],
      stTime: "",
      enTime: ""
    };
  },
  mounted() {
    let startTime = "2018-06-08 00:00:00";//this.setPartTime() + " 00:00:00"
    let endTime = "2018-06-08 23:59:59";//this.setAllTime()
    this.dates = [startTime, endTime];
    this.noise();
  },
  methods: {
    noise() {
      var stTime = this.dates[0];
      var enTime = this.dates[1];
      this.$http
        .get(
          this.HOST+"/environmentalmonitoring/toHistoryFromTimeToTime2?startTime=" +
            stTime +
            "&endTime=" +
            enTime + "&enviromental_id=2"
        )
        .then(res => {
          res.data.result.forEach(element => {
            this.weathtime.push(element.sendtime);
            this.weathdata.push(element.noise);
          });
          myChart.setOption({
            xAxis: [
              {
                data: this.weathtime
              }
            ],
            series: [
              {
                data: this.weathdata
              }
            ]
          });
        });
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "今日噪音变化" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            axis: "x"
          }
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: "温度",
            type: "line",
            data: []
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
</style>
  