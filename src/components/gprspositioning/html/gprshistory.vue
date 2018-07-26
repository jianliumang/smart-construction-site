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
                    <button @click="clickinfo">查询</button>
                    <p class="infotit"><span>播放</span></p>
                    <div>
                        <button @click="startfn" id="start">开始/重放</button>
                        <button @click="stopfn" id="pause">暂停</button>
                        <button @click="restartfn" id="resume">恢复</button>
                        <button @click="removefn">清除轨迹</button>
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
export default {
    name: "gprshistory",
    data() {
        return {
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
            list: ['1','2','3'],
            havedate : [],
            value4: ''
        };
    },
    created() {
        this.regionid = sessionStorage.getItem("regionid");
        },
    mounted() {
        console.log(document.getElementById("showmap"))
        var elebody = document.body;
        var elemap = document.getElementById("showmap");
        elemap.style.height = elebody.clientHeight-120+'px';
        elemap.style.width = elebody.clientWidth-600+'px';
        console.log(elebody.clientWidth-600)
        // console.log(this.imgurl)
        let startTime = this.setPartTime() + " 00:00:00";
        let endTime = this.setPartTime() ? this.setAllTime() : this.setPartTime() + " 23:59:59";
        this.dates = [startTime, endTime];
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
            this.init()
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
            this.init();
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
            this.init();
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
            this.init()
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
            console.log(this.hatnumber);
            console.log(this.endtimevlaue=='2018-06-28 20:00:00')
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
                     res.data.result.forEach(element => {
                        this.maplist.push([element.east_longitude,element.north_latitude])
                    })
                    this.init();
                }
            });
        },
        beforeinit(){
            //创建一个高德地图实列
            this.map = new AMap.Map("container", {
                center: [116.397428, 39.90923], //设置中心点
                // pitch: 60,
                rotation: -35,
                resizeEnable: true, //是否监控地图容器尺寸变化
                features: ["bg", "road", "point"], //隐藏默认楼块
                mapStyle: "amap://styles/light", //设置地图的显示样式
                layers: [new AMap.TileLayer.Satellite()], //地图图层（卫星图层）
                zoom: 16 //地图显示的缩放级别
            });
        },
        init() {
        
            if(this.maplist.length==0){
                return false;
            }
            //对地图的右上角，左下角的东经，北纬进行监控，对地图的缩放级别进行监控
            var southwestlng;
            var southwestlat;
            var northeastlng;
            var northeastlat;
            var zoom;
            //地图加载时进行监控
            this.map.on("complete", () => {
                var currentZoom = this.map.getBounds();
                zoom = this.map.getZoom();
                southwestlng = currentZoom.southwest.lng;
                southwestlat = currentZoom.southwest.lat;
                northeastlng = currentZoom.northeast.lng;
                northeastlat = currentZoom.northeast.lat;
            });
            //地图缩放时进行监控
            this.map.on("zoomend", () => {
                var currentZoom = this.map.getBounds();
                zoom = this.map.getZoom();
                this.map.setZoom(zoom);
                southwestlng = currentZoom.southwest.lng;
                southwestlat = currentZoom.southwest.lat;
                northeastlng = currentZoom.northeast.lng;
                northeastlat = currentZoom.northeast.lat;
            });
            //地图平移时进行监控
            this.map.on("moveend", () => {
                var currentZoom = this.map.getBounds();
                zoom = this.map.getZoom();
                southwestlng = currentZoom.southwest.lng;
                southwestlat = currentZoom.southwest.lat;
                northeastlng = currentZoom.northeast.lng;
                northeastlat = currentZoom.northeast.lat;
            });
            //线条轨迹
            var polyline = new AMap.Polyline({
                path: this.maplist, //设置线覆盖物路径
                strokeColor: "#3366FF", //线颜色
                strokeOpacity: 1, //线透明度
                strokeWeight: 5, //线宽
                strokeStyle: "solid", //线样式
                strokeDasharray: [10, 5] //补充线样式
            });
            polyline.setMap(this.map);
            var icon = new AMap.Icon({
                size: new AMap.Size(40, 50),    // 图标尺寸
                image: '/static/img/man.07ada0e.png',  // Icon的图像
                imageOffset: new AMap.Pixel(0, -60),  // 图像相对展示区域的偏移量，适于雪碧图等
                imageSize: new AMap.Size(40, 50)   // 根据所设置的大小拉伸或压缩图片
            });
            // console.log(icon)

            var content = '<img src="@/assets/img/man.png" alt="" />';
            //第一个点
            if(this.markertype == 0){
                var placedata = [this.maplist[this.mapindex]];
                this.marker1 = new AMap.Marker({
                    position: new AMap.LngLat(placedata[0].lng, placedata[0].lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    offset: new AMap.Pixel(-17, -60),
                    icon: new AMap.Icon({
                        image: this.imgurl,  // Icon的图像
                        size: new AMap.Size(40,60),  // 图标尺寸
                        imageSize: new AMap.Size(40, 60) // 根据所设置的大小拉伸或压缩图片
                    }), // 添加 Icon 图标 URL
                    // content: content,
                    title: "北京"
                });
                this.map.add(this.marker1);
                this.markertype = 1;
            }
            
            if (this.restart==0) {
                this.map.setCenter(this.maplist[0]);
            };
            //将创建的点标记添加到已有的地图实例：
            //位置移动
            if(this.start==1){
            this.trajectory = setInterval(() => {
                this.map.setZoom(zoom);
                var nowsouthwestlng = this.maplist[this.mapindex].lng;
                var nowsouthwestlat = this.maplist[this.mapindex].lat;
                if (nowsouthwestlng < southwestlng || nowsouthwestlng > northeastlng || nowsouthwestlat < southwestlat || nowsouthwestlat > northeastlat
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
            }
            //移动点下的说明
            this.marker1.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                offset: new AMap.Pixel(-50, 60),//修改label相对于maker的位置
                content: this.selected
            });
            if(this.zoomtype == 0){
                this.map.setFitView();
            }
            this.zoomtype = 1;
            //圆点轨迹
            for (var i = 0; i < this.maplist.length; i += 1) {
                var center = this.maplist[i];
                var circleMarker = new AMap.CircleMarker({
                center: center, // 中心位置
                radius: 5,
                // radius: 10 + Math.random() * 10,
                strokeColor: "white",
                strokeWeight: 2,
                strokeOpacity: 0.5,
                fillColor: "#f00", //rgba(0,0,255,1)
                fillOpacity: 1, //0.5
                zIndex: 10,
                bubble: true,
                cursor: "pointer",
                clickable: true
                });
                circleMarker.setMap(this.map);
            };
        },
        clear() {
                clearInterval(this.trajectory);
        },



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
    /* width: 1300px!important; */
    /* height: 800px!important; */
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
.infotit{
    padding: 20px 0px 0px 30px;
    margin: 0px 0px 35px 0px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}
.infotit span{
    display: inline-block;
    border-bottom: 3px solid #e45823;
    padding-bottom: 5px;
}
.gprshistory .el-date-picker{
    display: inline-block;
}
.gprshistory .demonstration{
    /* margin-left: 47%; */
    font-size: 18px;
    font-weight: 600
}
.gprshistory .block{
    margin-bottom: 10px;
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
    margin-top: 30px;
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
    padding: 10px 0px;
}
.showdata .el-row .el-col:nth-child(1){
    text-align: right;
}
.showdata .el-row .el-col:nth-child(2){
    text-align: left;
}
</style>
