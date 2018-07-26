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
  name: "temperature",
  data() {
    return {
      weathtime: [],
      weathdata: [],
      stTime: "",
      enTime: "",
      dates: [],
      echData: []
    };
  },
  mounted() {
    this.realdata = setInterval(()=>{
        let startTime = this.setAllTime(9);//this.setPartTime() + " 00:00:00"
        let endTime = this.setAllTime(6);//this.setAllTime()
        this.dates = [startTime, endTime];
        // console.log(startTime);
        this.temperature();
    },1000)
  },
  methods: {
    temperature() {
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
            this.weathdata.push(element.temperature);
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
        title: { text: "实时温度变化" },
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
  },
  beforeDestroy() {
    clearInterval(this.realdata);
  },
};
</script>
<style scoped>
</style>
  