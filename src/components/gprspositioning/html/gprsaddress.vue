<template>
<div class="gprsddress">
    <div class="map">
        <el-container>
                <el-aside width="300px">
                    <div id="select">
                        <el-row class="block-col-2">
                            <el-col class="el-group" :span="20" v-for="(group,index) in groups" :key="index">
                                <div class="intogroup" @click="intogroup(index)">
                                    <span class="demonstration">{{group.groupname}} &nbsp;&nbsp;&nbsp;成员列表<i class="el-icon-arrow-down el-icon--right"></i></span>
                                </div>
                                <transition name="fadegps">
                                    <div class="groupshow" v-show="groupshow[index]">
                                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll[index]" @change="handleCheckAllChange(index)">全选</el-checkbox>
                                        <div style="margin: 15px 0;"></div>
                                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange(index)">
                                            <el-checkbox v-for="city in group.groupdata" :label="city" :key="city">{{city}}</el-checkbox>
                                        </el-checkbox-group>
                                    </div>
                                </transition>
                            </el-col>
                        </el-row>
                        
                    </div>
                </el-aside>
                <el-main id="showmap"><div id="container"></div></el-main>
            </el-container>
    </div>
</div>
</template>
<script>
export default {
    name: "gprshistory",
    data() {
        return {
            regionid:Number,
            groupshow:[],
            hatdata : new Set([1024001,1024002,1024003,1024004,1024006]),
            maplist : new Map([
                [1024001,[116.390428, 39.90923]],
                [1024002,[116.391428, 39.93128]],
                [1024003,[116.392428, 39.90923]],
                [1024004,[116.393428, 39.90923]],
                [1024006,[116.395428, 39.90923]]
            ]),
            userdata : [],
            checkAll: [false,false],
            checkedCities: [],
            cities: [],
            isIndeterminate: true,
            groups:[
                {
                    groupnumber:1,
                    groupname:"第一组",
                    groupdata:[1024001,1024002,1024003,1024004,1024006]//+'(士大夫)'
                }
            ],
            groupnumber:Number,
            hatnumber:Number,
            hatname:String
        };
    },
    created() {
        this.regionid = sessionStorage.getItem("regionid");
    },
    mounted() {
        var elebody = document.body;
        var elemap = document.getElementById("showmap");
        elemap.style.height = elebody.clientHeight-120+'px';
        elemap.style.width = elebody.clientWidth-500+'px';

        this.cities=Array.from(this.hatdata)
        this.init();
        this.askforgroup()
    },
    methods: {
        askforgroup(){
            //查找所有分组信息
            this.$api.seekAllGroup().then(res => {
                console.log(res);
                if(res.data.code==200){
                    res.data.result.forEach(element => {
                        this.groups.push({
                            groupnumber : element.groupingnumber,
                            groupname : element.groupingname,
                            groupdata : []
                            });
                        this.groupnumber = element.groupingnumber;
                        this.askforuser()
                    });
                    this.groupshow = [];
                    for(var i=0;i<this.groups.length;i++){
                        if(i==0){
                            this.groupshow.splice(0,0,true);
                        }else{
                            this.groupshow.splice(i,0,false);
                        };
                    };
                }
            })
        },
        askforuser(){
            //查找每组下的人员信息
            this.$api.withConstructionAndGroupSeekHat("?regionid="+this.regionid+"&groupingnumber="+this.groupnumber).then(res => {
                console.log(res)
                if(res.data.code==200){
                    if(res.data.result.length == 0){return false};
                    res.data.result.forEach(element => {
                        this.groups.forEach(value => {
                            if(value.groupnumber == element.groupingnumber){
                                value.groupdata.push(element.hat_number + "(" + element.workman_name + ")");
                                this.hatdata.add(element.hat_number + "(" + element.workman_name + ")");
                                this.userdata.push({
                                    name : element.hat_number + "(" + element.workman_name + ")",
                                    hatnumber : element.hat_number
                                })
                            }
                        })
                    })
                }
            })
        },
        intogroup(num){
            //点击打开分组信息
            console.log(num);
            if(this.groupshow[num] == true){
                
                this.groupshow.splice(num,1,!this.groupshow[num]);
                return false;
                };
            this.groups[num].groupdata.forEach(element => {
                this.userdata.forEach(value => {
                if(element == value.name){
                    console.log(value.name)
                    console.log(value.hatnumber)
                    this.$api.withHatNumberResNewGpsInfo({
                        params:{
                            hatnumber:value.hatnumber
                        }
                    }).then(res => {
                        if(res.data.code==200){
                            if(res.data.result==null){
                                let doc = document.getElementsByClassName('el-checkbox__label');
                                for(var i=0;i<doc.length;i++){
                                    if(doc[i].innerText == value.name){
                                        var para = document.createElement("input");
                                        para.setAttribute("disabled","disabled")
                                        para.className="el-append";
                                        para.style.width = doc[i].parentNode.offsetWidth + "px";
                                        para.style.height = doc[i].parentNode.offsetHeight + "px";
                                        doc[i].parentNode.appendChild(para);
                                        doc[i].style.color = "#ccc";
                                    }
                                }
                                return false;
                            }
                            this.maplist.set(value.name,[res.data.result.east_longitude,res.data.result.north_latitude]);
                            // this.init();
                        }
                    })
                }
            })
            })
            this.groupshow.splice(num,1,!this.groupshow[num]);
        },
        handleCheckAllChange(num) {
            this.groups[num].groupdata.forEach(data => {
                if(this.checkedCities.indexOf(data)==-1){
                    this.checkedCities.push(data)
                }
            })
            this.checkedCities.concat(this.checkAll[num] ? this.groups[num].groupdata : []);
            if(!this.checkAll[num]){
                this.groups[num].groupdata.forEach(data => {
                var numindex = this.checkedCities.indexOf(data)
                    this.checkedCities.splice(numindex,1)
                
            })
            }
            this.checkedCities = Array.from(new Set(this.checkedCities))
            this.isIndeterminate = false;
            this.init()
        },
        handleCheckedCitiesChange(num) {
            console.log(num)
            //根据点击人员名称确定安全帽编号
            //   console.log(111)
            //   console.log(this.userdata)
            //   console.log(this.checkedCities)
            // this.userdata.forEach(element => {
            //     console.log(222)
            //     if(this.checkedCities[this.checkedCities.length-1] == element.name){
            //         this.hatnumber = element.hatnumber;
            //         this.hatname = element.name;
            //         console.log(this.hatnumber)
            //     }
            // })
            // console.log(4444)
            let checkedCount = this.groups[num].groupdata.length;
            this.checkAll[num] = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            this.init();
        },
        init() {
        //创建一个高德地图实列
            var map = new AMap.Map("container", {
                center: [116.397428, 39.90923], //设置中心点
                // pitch: 60,
                rotation: -35,
                // resizeEnable: true, //是否监控地图容器尺寸变化
                features: ["bg", "road", "point"], //隐藏默认楼块
                mapStyle: "amap://styles/light", //设置地图的显示样式
                layers: [new AMap.TileLayer.Satellite()], //地图图层（卫星图层）
                zoom: 16 //地图显示的缩放级别
            });
            //gps定位点
            if(this.checkedCities.length==0){
                return false;
            }
            this.checkedCities.forEach((value,index) => {
                var placedata = this.maplist.get(value);
                var marker1 = new AMap.Marker({
                    position: new AMap.LngLat(placedata[0], placedata[1]), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: "北京"
                });
                //移动点下的说明
                marker1.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(-16, 32),//修改label相对于maker的位置
                    content: value
                });
                //将创建的点标记添加到已有的地图实例：
                var markerList = marker1;
                map.add(markerList);
                })
            //根据所有的定位点调整视野
            map.setFitView();
        }
    }
};
</script>
    
<style>
.el-append{
    color: #f00;
    position: absolute;
    top: 0px;
    left: 0px;
    background: #ccc;
    z-index: 200;
    outline: none;
    border: none;
    opacity: 0;
}
.gprsddress .amap-marker-label {
    border-radius: 5px;
}
.gprsddress .map{
    width: 100%;
    height: 100%;
}
.gprsddress .map .el-main{
    /* width: 1054px!important;
    height: 800px!important; */
    padding: 0;
    /* padding-right: 50px; */
}
.map div button{
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 3px 10px;
    cursor:pointer;
}
.gprsddress #container{
    transition: all 3000s ease;
    /* width: 1054px!important;
    height: 729!important; */
    position: relative;
}
.gprsddress #returnBtn{
    width: 60px;
    height: 30px;
    position: relative;
    z-index: 100;
    right: -47%;
    top: 200px;
    border-radius: 5px;
    outline: 0;
    border: none;
}
.gprsddress #select{
    padding-top: 10px;
}
.gprsddress .demonstration{
    margin-left: 20px!important;
    width: 250px!important;
}
.gprsddress .intogroup{
    cursor:pointer;
    margin-bottom: 10px;
    width: 250px;
    border: none;
}
.gprsddress .el-group{
    height: auto!important;
}
.gprsddress .el-checkbox{
    height: 20px;
    line-height: 20px;
}
.gprsddress .el-checkbox-group{
    height: auto!important;
}
.gprsddress .el-checkbox-group label{
    width: 100%;
    margin-left: 0px!important;
}
.gprsddress .el-checkbox__inner{
    width: 14px!important;
}
.gprsddress .el-checkbox__input{
    width: 14px!important;
}
/* .groupshow{

} */
.fadegps-enter-active, .fadegps-leave-active {
  transition: all 1s;
}
.fadegps-enter, .fadegps-leave-to{
    opacity:0;
  height: 0;
}
</style>
