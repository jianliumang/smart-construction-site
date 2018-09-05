<template>
<div class="gprsddress">
    <div class="map">
        <el-container>
            <el-aside>
                    <el-tree
                    :data="data"
                    show-checkbox
                    default-expand-all
                    ref="tree"
                    node-key="id"
                    highlight-current
                    @node-click="nodeClick"
                    @check-change="checkChange"
                    @current-change="currentChange"
                    :props="defaultProps">
                    </el-tree>
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
            maplist : new Map(),
            cities: [],
            isIndeterminate: true,
            groupnumber:Number,
            hatnumber:Number,
            hatname:String,
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created() {
        this.regionid = sessionStorage.getItem("regionid");
    },
    mounted() {
        var elebody = document.body;
        var elemap = document.getElementById("showmap");
        elemap.style.height = elebody.clientHeight-120+'px';
        elemap.style.width = elebody.clientWidth-500+'px';
        this.init();
        this.askforgroup()
    },
    methods: {
        checkChange(obj,self,sub){
            //节点选中触发
            // console.log(obj.hat_number,obj,self,sub)
            if(obj.hat_number!=undefined&&self==true){
                // console.log()
                this.$api.withHatNumberResNewGpsInfo({
                    params:{
                        hatnumber:obj.hat_number
                    }
                }).then(res => {
                        if(res.data.code==200){
                            // console.log(res)
                            if(res.data.result==null){
                                obj.disabled=true;
                                this.$refs.tree.setChecked(obj.id,false);
                                this.$message({
                                    message: obj.workman_name+'没有定位信息',
                                    type: 'warning'
                                });
                            }else{
                                obj=Object.assign({},obj,res.data.result);
                                this.maplist.set(obj.hat_number,obj)
                                this.init();
                            }
                        }
                    })
            }else if(obj.hat_number!=undefined&&self==false){
                if(this.maplist.has(obj.hat_number)){
                    this.maplist.delete(obj.hat_number);
                    this.init();
                }
            }
        },
        currentChange(obj,node){
            //节点点击触发
            // console.log(obj,node)
        },
        nodeClick(obj,node,self){
            // console.log(obj,node,self)
            // this.groupnumber = obj.groupingnumber;
            // this.askforuser()
        },
        askforgroup(){
            //查找所有分组信息
            this.$api.seekAllGroup().then(res => {
                if(res.data.code==200){
                    res.data.result.forEach(ele => {
                        ele.id=res.data.result.indexOf(ele)+1;
                        ele.label=ele.groupingname;
                        ele.children=[];
                    })
                    this.data=res.data.result;
                    res.data.result.forEach(element => {
                        this.groupnumber = element.groupingnumber;
                        this.askforuser()
                    });
                }
            })
        },
        askforuser(){
            //查找每组下的人员信息
            this.$api.withConstructionAndGroupSeekHat("?regionid="+this.regionid+"&groupingnumber="+this.groupnumber).then(res => {
                // console.log(res.data.result)
                if(res.data.code==200&&res.data.result.length!=0){
                    res.data.result.forEach(element => {
                        element.id=element.hat_number;
                        element.label = element.workman_name;
                    })
                    this.data.forEach(ele => {
                        if(ele.groupingnumber==res.data.result[0].groupingnumber){
                            ele.children=res.data.result;
                        };
                    });
                }
            })
        },
        init() {
        //创建一个高德地图实列
            var map = new AMap.Map("container", {
                center: [116.397428, 39.90923], //设置中心点
                // pitch: 60,
                rotation: -35,
                resizeEnable: true, //是否监控地图容器尺寸变化
                features: ["bg", "road", "point"], //隐藏默认楼块
                mapStyle: "amap://styles/light", //设置地图的显示样式
                layers: [new AMap.TileLayer()], //地图图层（卫星图层） new AMap.TileLayer.Satellite()
                zoom: 16 //地图显示的缩放级别
            });
            //gps定位点
            if(this.maplist.size==0){
                return false;
            };
            var infoWindow = new AMap.InfoWindow({
                // content: info.join("<br/>"),
                offset: new AMap.Pixel(0, -30)
            });
            this.maplist.forEach((value,key,self) => {
                 var info = [];
                 console.log(value)
                // info.push("<div><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
                info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>员工信息</b>");
                info.push("编号 : 1024005");
                info.push("人员名称 : 方大傻子");
                info.push("所属分组 :良渚管委会</div></div>");    
                var marker1 = new AMap.Marker({
                    position: new AMap.LngLat(value.east_longitude, value.north_latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: "北京"
                });
                //移动点下的说明
                marker1.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
                    offset: new AMap.Pixel(-16, 32),//修改label相对于maker的位置
                    content: value.label
                });
                //将创建的点标记添加到已有的地图实例：
                var markerList = marker1;
                map.add(markerList);
                marker1.content = info.join("<br/>");
                marker1.on('click', markerClick);
                marker1.emit('click', {target: marker1});
                // infoWindow.close();
            });
            
            function markerClick(e) {
                infoWindow.setContent(e.target.content);
                infoWindow.open(map, e.target.getPosition());
            }
            
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
/* .gprsddress .amap-info-content img,.gprsddress .amap-info-content b{
    display: none;
} */
/* .gprsddress .amap-info-content>div>br,.gprsddress .amap-info-content>div div:nth-child(1),.gprsddress .amap-info-content b,.gprsddress .amap-info-content b+br{
    display: none;
} */
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
    margin-left: 20%!important;
    width: 80%!important;
    display: flex;
    justify-content: space-between;
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
