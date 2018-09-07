<template>
<div class="gprshistory">
    <div id="app" class="main">
        <div class="map">
            <el-container>
                <el-aside width="385px">
                    <div>
                        <p class="infotit"><span>信息</span></p>
                        <div id="select-gps-history">
                            <select @change="changegroup" v-model="grouped">
                                <option disabled value="">请选择分组信息</option>
                                <option v-for="(group,groupindex) in groups" :key="groupindex" :value="group.groupname">
                                    {{ group.groupname }}
                                </option>
                            </select>
                            <select @change="changehat" v-model="selected">
                                <option disabled value="">请选择员工编号</option>
                                <option v-for="(option,index) in options" :key="index" :value="option">
                                    {{ option }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <p class="infotit"><span>时间</span></p>
                    <div class="block">
                        <span class="demonstration">开始时间：</span>
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
                        <span class="demonstration">结束时间：</span>
                        <el-date-picker
                        v-model="endtimevlaue"
                        type="datetime"
                        placeholder="选择日期时间"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions0">
                        </el-date-picker>
                    </div>
                    <el-button @click="clickinfo" :disabled="starttimevalue==''||endtimevlaue==''||grouped==''||selected==''?true:false" type="primary" size="mini">查询</el-button>
                    <p class="infotit"><span>播放</span></p>
                    <div>
                        <el-button @click="startfn" id="start" :disabled="historydata.length==0?true:false" type="warning" size="mini">开始/重放</el-button>
                        <el-button @click="stopfn" id="pause" :disabled="historydata.length==0?true:false" type="warning" size="mini">暂停</el-button>
                        <el-button @click="restartfn" id="resume" :disabled="historydata.length==0?true:false" type="warning" size="mini">恢复</el-button>
                        <el-button @click="removefn" :disabled="historydata.length==0?true:false" type="warning" size="mini">清除轨迹</el-button>
                    </div>
                    <div class="block slide">
                        <el-slider v-model="value8" @change="sidefn" ></el-slider>
                    </div>
                    <p class="infotit"><span>状态</span></p>
                    <div class="showdata">
                        <el-row>
                            <el-col :span="7">
                                总里程路：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                终端名称：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                定位类型：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                当前速度：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                当前时间：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                里程数：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                轨迹时间：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                运动时间：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7">
                                停留时间：
                            </el-col>
                            <el-col :span="17">
                                - -
                            </el-col>
                        </el-row>
                    </div>
                </el-aside>
                <el-main id="showmap"><div id="container"></div></el-main>
            </el-container>
        </div>
    </div>
</div>
</template>
<script>
// import AMap from 'AMap'
// console.log(AMap)
import man from "@/assets/img/man.png"
import mass from "@/assets/img/mass0.png"
import { Loading } from 'element-ui';
export default {
    name: "gprshistory",
    data() {
        return {
            mass:mass,
            imgurl: man,
            regionid:Number,
            value8: 50,
            selected: '',
            grouped: '',
            groups:[],//{groupnumber:1,groupname:"第一组",groupdata:[1024001,1024002,1024003,1024004,1024006]//+'(士大夫)'}
            userlist : [],
            options:[],
            maplists : [],//[1024001,[116.390428, 39.90923]]
            maplist: [],
            pickerOptions3: this.timelist,
            dates:[],
            echData:[],
            mapindex:0,
            start:0,
            restart:0,
            rundate:1000,
            remove:1,
            userdata:1024001,
            usernumber:'',
            userdatalist:[],
            groupnumber:Number,
            hatnumber:Number,
            zoomtype: 0,
            markertype: 0,
            pickerOptions0: this.timetype,
            pickerOptions1: this.starttimelist,
            starttimevalue: '',
            endtimevlaue: '',
            havedate : [],
            historydata:[],
            southwestlng:null,
            southwestlat:null,
            northeastlng:null,
            northeastlat:null,
            zoom:null,
        };
    },
    created() {
        this.regionid = sessionStorage.getItem("regionid");
        },
    mounted() {
        this.starttimevalue = this.setPartTime() + " 00:00:00";
        this.endtimevlaue = this.setPartTime() ? this.setAllTime() : this.setPartTime() + " 23:59:59";
        this.askforgroup();
        this.beforeinit();

        this.requesthavetime();
    },
    methods: {
        askforgroup(){
            //查找所有分组信息
            this.$api.seekAllGroup().then(res => {
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
                }
            })
        },
        askforuser(){
            //查找每组下的人员信息
            this.$api.withConstructionAndGroupSeekHat("?regionid="+this.regionid+"&groupingnumber="+this.groupnumber).then(res => {
                if(res.data.code==200){
                    if(res.data.result.length == 0){return false};
                    res.data.result.forEach(element => {
                        this.groups.forEach(value => {
                            if(value.groupnumber == element.groupingnumber){
                                value.groupdata.push(element.hat_number + "(" + element.workman_name + ")");
                                this.userlist.push({
                                    name : element.hat_number + "(" + element.workman_name + ")",
                                    hatnumber : element.hat_number
                                })
                            }
                        })
                    })
                }
            })
        },
        startfn(){
            //开始/重放
            this.mapindex = 0;
            this.restart =this.restart+1;
            this.start = 1;
            this.rungps()
        },
        stopfn(){
            //暂停
            this.start = 0;
            this.clear();
        },
        restartfn(){
            //恢复
            this.mapindex = this.mapindex-1;
            this.start = 1;
            this.rungps();
        },
        removefn(){
            //清除轨迹
            this.selected="";
            this.grouped="";
            this.mapindex=0;
            this.start=0;
            this.restart=0;
            this.rundate=1000;
            this.remove=0;
            this.clear();
            this.maplist=[];
            this.beforeinit();
            this.clear();
        },
        sidefn(){
            //播放速度
            var value = 100-this.value8;
            if(value<50){
                value = (value-50)/2+50;
            }
            var onedate = value-50;
            var twodate = onedate/50;
            var threedate = twodate + 1;
            this.rundate = threedate*1000;
            this.clear();
            if(this.mapindex <= 0){
                this.mapindex = 0;
            }else{
                this.mapindex = this.mapindex-1;
            }
            this.rungps()
        },
        changegroup(){
            //根据选组展示组员信息
            this.groups.forEach(values =>{
                if(this.grouped==values.groupname){
                    let userlist = [];
                    values.groupdata.forEach(data => {
                        this.userdata = data;
                    })
                    this.options=values.groupdata
                }
            })
        },
        changehat() {
            // var listlist = [];//.......
            this.userlist.forEach(element => {
                if(element.name == this.selected){
                    this.hatnumber = element.hatnumber;
                } 
                // listlist.push(element.name);//........
            })
            // if(listlist.indexOf(this.selected)==-1){
            //     this.hatnumber = this.selected;
            //     this.mapindex = 0;
            // this.rundate = 1000;
            // this.restart =0;
            // this.maplist=[];
            // this.maplists.forEach((hatnumber) => {
            //      if(hatnumber[0]==this.selected){
            //          this.maplist.push(hatnumber[1])
            //      }
            //  });
            // this.init()
            //     return false
            // }//..............
            
        },
        clickinfo() {
            //根据安全帽编号与时间段查询历史数据
            // console.log(this.hatnumber);
            // console.log(this.endtimevlaue=='2018-06-28 20:00:00')
            this.loadinginstace = Loading.service({ fullscreen: true });
            this.mapindex = 0;
            this.rundate = 1000;
            this.restart =0;
            this.maplist=[];
            var stTime=this.starttimevalue;
            var enTime=this.endtimevalue;
            this.$api.withHatNumberAndDatesHistory({
                params:{
                    hatnumber:this.hatnumber,
                    starttime:this.starttimevalue,
                    endtime:this.endtimevlaue
                }
            }).then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.loadinginstace.close();
                    this.historydata=res.data.result;
                    if(res.data.result.length==0){
                        this.$message({
                            message: '本时间段没有数据',
                            type: 'warning'
                        });
                    }
                     res.data.result.forEach(element => {
                        this.maplist.push([element.east_longitude,element.north_latitude])
                    })
                    this.beforeinit();
                    this.init();
                }
            });
        },
        beforeinit(){
            //创建一个高德地图实列
            this.map = new AMap.Map("container", {
                center: [116.397428, 39.90923], //设置中心点
                // pitch: 60,
                // rotation: -35,
                resizeEnable: true, //是否监控地图容器尺寸变化
                features: ["bg", "road", "point"], //隐藏默认楼块
                mapStyle: "amap://styles/light", //设置地图的显示样式
                layers: [new AMap.TileLayer()], //地图图层（卫星图层）  new AMap.TileLayer.Satellite()
                zoom: 16 //地图显示的缩放级别
            });
        },
        rungps(){
            //位置移动
            // if(this.start==1){
            this.trajectory = setInterval(() => {
                this.map.setZoom(this.zoom);
                var nowsouthwestlng = this.maplist[this.mapindex].lng;
                var nowsouthwestlat = this.maplist[this.mapindex].lat;
                if (nowsouthwestlng < this.southwestlng || nowsouthwestlng > this.northeastlng || nowsouthwestlat < this.southwestlat || nowsouthwestlat > this.northeastlat
                ) {
                    this.map.setCenter(this.maplist[this.mapindex]);
                };
                this.marker1.setPosition(this.maplist[this.mapindex]);
                this.mapindex=this.mapindex+1;
                if (this.mapindex == this.maplist.length) {
                    clearInterval(this.trajectory);
                this.start = 0;
                };
            }, this.rundate);
            // }
        },
        onmap(){
            //监听地图变化
            var currentZoom = this.map.getBounds();
            this.zoom = this.map.getZoom();
            this.southwestlng = currentZoom.southwest.lng;
            this.southwestlat = currentZoom.southwest.lat;
            this.northeastlng = currentZoom.northeast.lng;
            this.northeastlat = currentZoom.northeast.lat;
        },
        init() {
            if(this.maplist.length==0){
                return false;
            }
            //对地图的右上角，左下角的东经，北纬进行监控，对地图的缩放级别进行监控
            
            //地图加载时进行监控
            this.map.on("complete", this.onmap);
            //地图缩放时进行监控
            this.map.on("zoomend", this.onmap);
            //地图平移时进行监控
            this.map.on("moveend", this.onmap);
            //线条轨迹
            var canvasDir = document.createElement('canvas')
            var width = 24;
            canvasDir.width = width;
            canvasDir.height = width;
            var context = canvasDir.getContext('2d');
            context.strokeStyle = '#fff';
            context.lineJoin = 'round';
            context.lineWidth = 8;
            context.moveTo(-4, width - 4);
            context.lineTo(width / 2, 6);
            context.lineTo(width + 4, width - 4);
            context.stroke();

            var polyline = new AMap.Polyline({
                path: this.maplist, //设置线覆盖物路径
                showDir:true,
                dirImg:canvasDir,
                strokeColor: "#00eb00", //线颜色3366FF
                strokeOpacity: 1, //线透明度
                strokeWeight: 5, //线宽
                strokeStyle: "solid", //线样式
                strokeDasharray: [10, 5] //补充线样式
            });
            polyline.setMap(this.map);
            //第一个点
            // if(this.markertype == 0){}
                var placedata = [this.maplist[this.mapindex]];
                this.marker1 = new AMap.Marker({
                    position: new AMap.LngLat(placedata[0].lng, placedata[0].lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    // offset: new AMap.Pixel(-17, -60),
                    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    // icon: new AMap.Icon({
                    //     image: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",  // Icon的图像
                    //     size: new AMap.Size(40,60),  // 图标尺寸
                    //     imageSize: new AMap.Size(40, 60) // 根据所设置的大小拉伸或压缩图片
                    // }), // 添加 Icon 图标 URL
                    // // content: content,
                    title: "北京"
                });
                this.map.add(this.marker1);
                this.markertype = 1;
            
            if (this.restart==0) {
                this.map.setCenter(this.maplist[0]);
            };
            //移动点下的说明
            this.marker1.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(-50, 60),//修改label相对于maker的位置
                content: this.selected
            });
            if(this.zoomtype == 0){
                this.map.setFitView();
            }
            this.zoomtype = 1;
            // 创建样式对象
            var styleObject = [{
                url: this.mass,
                anchor: new AMap.Pixel(5, 5),
                size: new AMap.Size(10, 10)
            }];
            var data = [];
            this.maplist.forEach(ele => {
                data.push({
                    lnglat: ele
                })
            });
            var massMarks = new AMap.MassMarks(data,{
                zIndex: 5,  // 海量点图层叠加的顺序120
                // zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
                style: styleObject  // 设置样式对象
            });
            // 将海量点添加至地图实例
            massMarks.setMap(this.map);
        },
        clear() {
                clearInterval(this.trajectory);
        },


        
        startdatachange(){
            var time = new Date(this.starttimevalue).getTime() + 86400000;
            this.endtimevlaue = this.timestampToTime(time);
        },
        datatype(com){
            // console.log(com,com.popperElm);
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
            url:"http://192.168.1.88:8080/RestIOTAPI/environmentalmonitoring/toselectDataExistDate?enviromentalid=2"
            })
            .then(res => {
                this.havedate = res.data.result;
            })
        }
    }
};
</script>
    
<style>
.gprshistory{
    height: 100%;
}
.gprshistory .amap-marker-label {
    border-radius: 5px;
}
.gprshistory .map{
    width: 100%;
    height: 100%;
}
.gprshistory .map .el-main{
    width: 100%!important;
    height: 100%!important;
    padding: 0;
    /* padding-right: 50px; */
}
.gprshistory .map div button{
    outline: none;
    border-radius: 5px;
    border: 1px solid #e45823;
    background: #e45823;
    color: #fff;
    font-size: 18px;
    padding: 3px 10px;
    cursor:pointer;
}
.gprshistory .map .amap-drags{
    transform: rotate(0deg)!important;
}
.gprshistory #container{
    transition: all 3000s ease;
    width: 100%!important;
    height: 100%!important;
    position: relative;
}
.gprshistory .el-container{
    height: 100%;
}
.gprshistory .el-aside{
    margin-right: 15px;
    border: 1px solid #ccc;
    box-shadow: 0px 0px 1px 1px #ccc;
}
.gprshistory .el-aside::-webkit-scrollbar{
    display: none;
}
.infotit{
    padding: 10px 0px 0px 15px;
    margin: 0px 0px 14px 0px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}
.infotit span{
    display: inline-block;
    border-bottom: 3px solid #e45823;
    padding-bottom: 5px;
}
.infotit+.block+.block{
    margin: 3px 0px;
}
.gprshistory .el-date-picker{
    display: inline-block;
}
.gprshistory .demonstration{
    /* margin-left: 47%; */
    font-size: 18px;
    font-weight: 600
}
#select-gps-history{
    /* float: right; */
    display: inline-block;
    width: 100%;
}
#select-gps-history span{
    text-align: left;
    display: inline-block;
    width: 200px;
}
#select-gps-history select{
    width: 150px;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    border: 3px solid #000;
    font-size: 12px;
    appearance:none;  
    -moz-appearance:none;  
    -webkit-appearance:none;
    background: url('~@/assets/img/gps_select.png') no-repeat scroll right center transparent;   
    padding: 0px 14px 0px 5px;
    margin: 0px 15px 5px 0px;
}
#select-gps-history select option{
    text-align: center;
}
.gprshistory .el-slider__input{
    display: inline!important;
    position: static;
}
.gprshistory .el-slider{
    margin-top: 10px;
    width: 320px;
    padding: 0 30px;
}
.gprshistory .el-slider__runway{
    height: 11px;
}
.gprshistory .el-slider__bar{
    height: 11px;
}
.gprshistory .el-slider__button-wrapper{
    top: -12px;
}
.showdata {
    padding: 0px 30px;
}
.showdata .el-row{
    padding: 9px 0px;
}
.showdata .el-row .el-col:nth-child(1){
    text-align: right;
}
.showdata .el-row .el-col:nth-child(2){
    text-align: left;
}
</style>
