<template>
    <div class="time-component">

  <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="value4"
      type="month"
      placeholder="选择月">
    </el-date-picker>
  </div>

<div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="starttimevalue"
      type="datetime"
      placeholder="选择日期时间"
      align="right"
      :picker-options="pickerOptions1"
      value-format="yyyy-MM-dd HH:mm:ss"
      @change="startdatachange"
      @focus="datatype">
    </el-date-picker>
  </div>


<div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="endtimevlaue"
      type="datetime"
      placeholder="选择日期时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      :picker-options="pickerOptions0">
    </el-date-picker>
  </div>
  
    </div>
</template>

<script>
export default {
    data() {
      return {
        pickerOptions0: this.timetype,
        pickerOptions1: this.starttimelist,
        starttimevalue: '',
        endtimevlaue: '',
        list: ['1','2','3'],
        havedate : [],
        value4: ''
      };
    },
    mounted(){
        this.requesthavetime();
    },
    methods: {
        startdatachange(){
            var time = new Date(this.starttimevalue).getTime() + 86400000;
            this.endtimevlaue = this.timestampToTime(time);
        },
        datatype(){
            setTimeout(() =>{
                var buttonelement = document.getElementsByClassName("el-picker-panel__icon-btn");
                for(let i=0;i<buttonelement.length;i++){
                    buttonelement[i].onclick = () => {
                        setTimeout(() => {this.changeredfn()},10);
                    }
                };
                this.changeredfn();
            },10)
        },
        changeredfn(){
            //将有数据的天数变为红色
            //获取页面的年月
            var dateelement = document.getElementsByClassName("el-date-picker__header-label");
            var year = dateelement[0].innerHTML.substring(0,4);
            var months = dateelement[1].innerHTML.substring(0,1);
            this.havedate.forEach(element => {
                if(year == element.substring(0,4) && months == element.substring(6,7)){
                    var day = element.substring(8,10);
                    if(day<10){
                        day = element.substring(8,10).substring(1);
                    };
                    var spanelement = document.getElementsByClassName("available");
                    for(let i=0;i<spanelement.length-10;i++){
                        spanelement[i].children[0].children[0].style.color="#000";
                    };
                    setTimeout(() => {
                        for(let i=0;i<spanelement.length-10;i++){
                        if(spanelement[i].children[0].children[0].innerText==day){
                            spanelement[i].children[0].children[0].style.color="#f00";
                        }
                    }
                    },10)
                    
                }else{
                    var spanelement = document.getElementsByClassName("available");
                    for(let i=0;i<spanelement.length-10;i++){
                        spanelement[i].children[0].children[0].style.color="#000";
                    };
                    var spanelement2 = document.getElementsByClassName("normal");
                    for(let i=0;i<spanelement2.length;i++){
                        spanelement2[i].children[0].children[0].style.color="#ccc";
                    };
                    var spanelement3 = document.getElementsByClassName("prev-month");
                    for(let i=0;i<spanelement3.length;i++){
                        spanelement3[i].children[0].children[0].style.color="#ccc";
                    };
                }
            });
            // console.log(document.getElementsByClassName("today")[0].children[0].children[0])
            if(document.getElementsByClassName("today")[0].children[0].children[0]!=undefined){
                document.getElementsByClassName("today")[0].children[0].children[0].style.color="blue"
            }
            
        },
        requesthavetime(){
            this.$http({
            method: "post",
            url:"http://60.191.29.210:9090/RestIOTAPI/environmentalmonitoring/toselectDataExistDate?enviromentalid=2"
            })
            .then(res => {
                this.havedate = res.data.result;
            })
        }
    }
}
</script>

<style>
</style>
