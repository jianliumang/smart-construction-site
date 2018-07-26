<template>
    <div class="qrcode">
      
      <!-- <el-table
        :data="tableData"
        stripe
        style="width: 100%">
          <el-table-column
            prop="deviceSN"
            label="设备SN">
          </el-table-column>
          <el-table-column
            prop="belong"
            label="所属工地">
          </el-table-column>
          <el-table-column
            prop="floor"
            label="楼层">
          </el-table-column>
      </el-table> -->
      <el-table
        :data="tableData"
        border
        :show-header="false"
        style="width: 94%">
        <el-table-column
        prop="name"
        width="100">
        </el-table-column>
        <el-table-column
        prop="value">
        </el-table-column>
      </el-table>
      <div>
        <el-row>
            <div class="inspectiontype" :style="{color:inspectiontype?'green':'#f00'}">{{inspectiontype?'已巡检':'未巡检'}}</div>
            <div class="addlist">
              <button @click="addfn">巡检</button>
            </div>
            <div class="findlist">
              <button @click="inspectionrecord">巡检记录</button>
            </div>
            <div>
            </div>
        </el-row>
      </div>
    </div>
</template>

<script>
 export default {
    data() {
      return {
        tableData: [{
                name: '安装位置',
                value: '8# 楼'
                }, {
                name: '设备名称',
                value: '塔式起重机'
                }, {
                name: '设备编号',
                value: '皖AA-T93213'
                }, {
                name: '备案编号',
                value: '皖AA-T93213'
                }, {
                name: '许可证',
                value: 'TS2400614--2012'
                }, {
                name: '塔机司机',
                value: '2013.8.20'
                }, {
                name: '制造商',
                value: '中联重科'
                }, {
                name: '资格证照片编号',
                value: 'QTZ12X'
                }, {
                name: '出厂编号',
                value: '1012TC013050XX'
                }, {
                name: '验收日期',
                value: '2017.11.07'
                }, {
                name: '安装日期',
                value: '2017.11.08'
                }, {
                name: '设备产权单位',
                value: 'XX特种设备检测有限公司'
                }],
        inspectiontype:false
      }
    },
    mounted(){
      this.showdata()
    },
    methods:{
      judgeinspection(){
        //判断是否已巡检
        // console.log(this.setPartTime())
        if(sessionStorage.getItem("equipmentNumber")==null){
          this.inspectiontype = false;
          return false;
        }
        this.$api.judgementTodayInspectionType({
          params:{
              inspectionDate : this.setPartTime(),
              equipmentNumber : sessionStorage.getItem("equipmentNumber")
            }
        }).then(res => {
          if(res.data.result == true){
            this.inspectiontype = true;
          }
        });
      },
      addfn(){
        //判断是否登录，做出反应
        // if(sessionStorage.getItem("staffmembername") == null){
        //   this.$router.push('/shiftlanding');
        //   return false;
        // }
          this.$router.push('/inspection');
      },
      showdata(){
        //获取由url带来的信息进行请求
        var str = location.hash;
        var p1 = str.indexOf("=")
        var p2 = str.indexOf("&")
        var p3 = str.indexOf("=",p1+1);
        var equipmentNumber = str.substring(p1+1,p2);
        var equipmentTypeNumber = str.substring(p3+1,p3+2);
        sessionStorage.setItem("equipmentNumber",equipmentNumber);
        sessionStorage.setItem("equipmentTypeNumber",equipmentTypeNumber);
        this.$api.withnumberandtypeinfo({
          params:{
              equipmentNumber : equipmentNumber,
              equipmentTypeNumber : equipmentTypeNumber
            }
        }).then(res => {
                if(res.data.result == null){
                  document.write("该数据为空");
                  return false;
                }
                // this.tableData =[res.data.result];
                console.log(res)
                sessionStorage.setItem("regionid",res.data.result.regionid);
                this.judgeinspection();
            });
      },
      inspectionrecord(){
        this.$router.push('/inspectionrecord');
      }
    }
}
</script>

<style>
.qrcode{
  width: 375px;
}
.qrcode .cell{
  text-align: center;
}
.addlist,.findlist{
  height: 200px;
  line-height: 200px;
}
.addlist button,.findlist button{
  width: 100px;
  height: 50px;
  border-radius: 5px;
  outline: none;
  border: 3px solid green;
  font-size: 24px;
}
.findlist button{
  width: 200px;
}
.inspectiontype{
    width: 200px;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 200px;
    font-size: 50px;
    position: relative;
    margin: auto;
}
/* .addlist button{
  float: left;
} */
/* .addcenter{
  width: 800px;
  height: 500px;
  top: 50px;
  position: absolute;
  z-index: 10;
  background: brown
} */
</style>
