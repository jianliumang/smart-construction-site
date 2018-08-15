<template>
    <div class="newvideo">
        <!-- <div class="aside-parent">
            <el-aside id="videoaside" class="el-aside-nav" width="200px" style="overflow:hidden">
                <el-menu
                :default-openeds="['1']"
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#293950"
                text-color="#fff"
                active-text-color="#e45823">
                    <el-submenu index="1">
                        <template slot="title">
                            <i>
                                <img src="@/assets/img/nav006.png" alt="">
                            </i>
                            <span>视频监控</span>
                        </template>
                        <el-tree :data="data" node-key="id" :default-expanded-keys="[1,'1.1']" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </el-submenu>
                </el-menu>
            </el-aside>
        </div> -->
        <el-tree :data="data" node-key="id" :default-expanded-keys="[1,'1.1']" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <div class="video-main">
            <div class="video-center">
                <div class="video-container" style="width: 904px;height: 604px;">
                    <div>
                        <subvideo index='1' :content="showval" :numdata="shownum"></subvideo>
                        <subvideo v-show="this.shownum.num==2" index='2' :content="showval" :numdata="shownum"></subvideo>
                    </div>
                    <div>
                        <subvideo v-show="this.shownum.num==2" index='3' :content="showval" :numdata="shownum"></subvideo>
                        <subvideo v-show="this.shownum.num==2" index='4' :content="showval" :numdata="shownum"></subvideo>
                    </div>
                </div>
                <div >
                    <button @click="videonum(1)">一分屏</button>
                    <button @click="videonum(2)">四分屏</button>
                    <button @click="capture">抓拍</button>
                    <!-- <button @mouseup="up">1111</button> -->
                    <!-- <button @click="equipmentinfo">设备信息</button>
                    <button @click="equipmentlist">设备列表</button>
                    <button @click="equipmenchannel">设备通道</button>
                    <button @click="videolist">视频列表</button>
                    <button @click="openvideo('C33749283',2)">开通直播</button>
                    <button @click="downvideo">关闭</button> -->
                    <!-- <button @click="deletelist">关闭</button> -->
                    <!-- <button @click="videoshow('C33749283',7)">开通直播</button>
                    <button @click="deletes">删除</button>
                    <button @click="add">添加</button> -->
                </div>
                <div>
                </div>
            </div>
            <div class="contranl">
                <p>云台控制:</p>
                <div class="video-roulette" title="操纵摄像头方向">
                    <span @mousedown="pztstart(4)" @mouseup="pztstop(4)"></span><span @mousedown="pztstart(0)" @mouseup="pztstop(0)" class="el-icon-arrow-up"></span><span @mousedown="pztstart(6)" @mouseup="pztstop(6)"></span><span @mousedown="pztstart(2)" @mouseup="pztstop(2)" class="el-icon-arrow-left"></span><span></span><span @mousedown="pztstart(3)" @mouseup="pztstop(3)" class="el-icon-arrow-right"></span><span @mousedown="pztstart(5)" @mouseup="pztstop(5)"></span><span @mousedown="pztstart(1)" @mouseup="pztstop(1)" class="el-icon-arrow-down"></span><span @mousedown="pztstart(7)" @mouseup="pztstop(7)"></span>
                </div>
                <div class="video-span"><el-button type="primary" icon="el-icon-zoom-out" @mousedown.native="pztstart(9)" @mouseup.native="pztstop(9)">缩小</el-button><el-button type="primary" icon="el-icon-zoom-in" @mousedown.native="pztstart(8)" @mouseup.native="pztstop(8)">放大</el-button></div>
                <div class="video-span"><el-button type="primary" icon="el-icon-d-arrow-left" @mousedown.native="pztstart(10)" @mouseup.native="pztstop(10)">近焦距</el-button><el-button type="primary" icon="el-icon-d-arrow-right" @mousedown.native="pztstart(11)" @mouseup.native="pztstop(11)">远焦距</el-button></div>
                <div class="video-span"><el-button :class="buttonbg==0?'button-bg':''" type="primary" icon="el-icon-remove" @click="speedclick(0)">慢</el-button><el-button :class="buttonbg==1?'button-bg':''" type="primary" icon="el-icon-share" @click="speedclick(1)">适中</el-button><el-button :class="buttonbg==2?'button-bg':''" type="primary" icon="el-icon-circle-plus"  @click="speedclick(2)">快</el-button></div>
            </div>
        </div>
    </div>
</template>
<script>
// import offlights from '../../../../static/js/offlights.js'
// import ckplayer from '../../../../static/ckplayer/ckplayer.js'
import subvideo from './subvideo.vue'
export default {
    data(){
        return{
            equipmentinfoval:null,
            equipmentlistval:[],
            equipmenchannelval:[],
            showrdata:[],
            showval:'rtmp://rtmp.open.ys7.com/openlive/86f5f44023994805b6bdad9015bcbf31',
            videolistdata:[],
            arr:[],
            speed:1,
            accessToken:'at.10j588251u2x04t41qecj53kd7nlfxrd-7p140r9vhz-0c72qw2-1bzzsrnxy',
            deviceSerial:'C23418950',
            data: [{
                id:1,
                label: '设备列表',
                children: []
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            shownum:{
                num:1,
                width:'900',
                height:'600'
            },
            buttonbg:1,
            pztclicktype:true
            // swf:require('')
        }
    },
    mounted(){
        // this.open();
        this.equipmentlist();
        console.log(this.timestampToTime(new Date().getTime()),this.setAllTime().replace(/-|:/gi, "").replace(/\s/gi, "-"))
        // this.equipmenchannel()
    },
    methods:{
        videonum(num){
            this.shownum={
                num:num,
                width:'900'/num,
                height:'600'/num
            };
            console.log('分屏',num)
        },
        handleNodeClick(data) {
            console.log(data);
        },
        open(){
            var flashvars={
                f:'rtmp://rtmp.open.ys7.com/openlive/86f5f44023994805b6bdad9015bcbf31',//视频地址
                a:'',//调用时的参数，只有当s>0的时候有效
                s:'0',//调用方式，0=普通方法（f=视频地址），1=网址形式,2=xml形式，3=swf形式(s>0时f=网址，配合a来完成对地址的组装)
                c:'0',//是否读取文本配置,0不是，1是
                x:'',//调用配置文件路径，只有在c=1时使用。默认为空调用的是ckplayer.xml
                i:'',//初始图片地址
                d:'',//暂停时播放的广告，swf/图片,多个用竖线隔开，图片要加链接地址，没有的时候留空就行
                u:'',//暂停时如果是图片的话，加个链接地址
                l:'',//前置广告，swf/图片/视频，多个用竖线隔开，图片和视频要加链接地址http://www.ckplayer.com/down/adv6.1_1.swf|http://www.ckplayer.com/down/adv6.1_2.swf
                r:'',//前置广告的链接地址，多个用竖线隔开，没有的留空
                t:'10|10',//视频开始前播放swf/图片时的时间，多个用竖线隔开
                y:'',//这里是使用网址形式调用广告地址时使用，前提是要设置l的值为空
                z:'',//缓冲广告，只能放一个，swf格式
                e:'3',//视频结束后的动作，0是调用js函数，1是循环播放，2是暂停播放并且不调用广告，3是调用视频推荐列表的插件，4是清除视频流并调用js功能和1差不多，5是暂停播放并且调用暂停广告
                v:'80',//默认音量，0-100之间
                p:'1',//视频默认0是暂停，1是播放，2是不加载视频
                h:'0',//播放http视频流时采用何种拖动方法，=0不使用任意拖动，=1是使用按关键帧，=2是按时间点，=3是自动判断按什么(如果视频格式是.mp4就按关键帧，.flv就按关键时间)，=4也是自动判断(只要包含字符mp4就按mp4来，只要包含字符flv就按flv来)
                q:'',//视频流拖动时参考函数，默认是start
                m:'',//让该参数为一个链接地址时，单击播放器将跳转到该地址
                o:'',//当p=2时，可以设置视频的时间，单位，秒
                w:'',//当p=2时，可以设置视频的总字节数
                g:'',//视频直接g秒开始播放
                j:'',//跳过片尾功能，j>0则从播放多少时间后跳到结束，<0则总总时间-该值的绝对值时跳到结束
                k:'30|60',//提示点时间，如 30|60鼠标经过进度栏30秒，60秒会提示n指定的相应的文字
                n:'这是提示点的功能，如果不需要删除k和n的值|提示点测试60秒',//提示点文字，跟k配合使用，如 提示点1|提示点2
                wh:'',//宽高比，可以自己定义视频的宽高或宽高比如：wh:'4:3',或wh:'1080:720'
                lv:'0',//是否是直播流，=1则锁定进度栏
                loaded:'loadedHandler',//当播放器加载完成后发送该js函数loaded
                //调用播放器的所有参数列表结束
                //以下为自定义的播放器参数用来在插件里引用的
                my_url:encodeURIComponent(window.location.href)//本页面地址
                //调用自定义播放器参数结束
            };
            var params = {bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent'};
		    CKobject.embedSWF('./static/ckplayer/ckplayer.swf','a1','ckplayer_a1','900','600',flashvars,params);;
        },
        requestToken(){
            //获取accessToken
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/getToken",
				params:{
					"APPSECRET":"at.axnqm5l96zjtlahkdcowerv436kxtwa1-1vw5gfdzd9-1kjqxqb-eqmbsxeqw",
					"APPKEY":"C33749283",
				}
			}).then(res => {
                console.log(res)
            });
        },
        capture(){
            //抓拍
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/capture?deviceSerial=C23418950&channelNo=1&accesstoken="+this.accessToken,
				// params:{
				// 	"deviceSerial":this.deviceSerial,
                //     "channelNo":1,
                //     "accessToken":this.accessToken,
				// }
			}).then(res => {
                console.log(res);
                if(res.data.code==200){
                    var imgurl=res.data.result.data.picUrl;
                    this.download(imgurl);
                };
            });
        },
        equipmentinfo(){
            //设备信息:查询用户下指定设备的基本信息
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/selectEquipmentInFo",
				params:{
					"accessToken":this.accessToken,
					"deviceSerial":this.deviceSerial,
				}
			}).then(res => {
                // console.log(res)
                this.equipmentinfoval=res.data.data
                console.log(this.equipmentinfoval)
            });
        },
        equipmentlist(){
            //设备列表:查询用户下设备基本信息列表
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/toselectAllEquipemnt?token="+this.accessToken,
			}).then(res => {
                console.log(res);
                this.equipmentlistval=res.data.result.data;
                console.log(this.equipmentlistval);
                //设备列表二级：设备名
                res.data.result.data.forEach(ele => {
                    this.data[0].children.push({
                        id: this.data[0].id+'.'+1,
                        label: ele.deviceName,
                        children: []
                    })
                })
                this.equipmenchannel()
            });
        },
        equipmenchannel(){
            //获取指定设备的通道信息
            // this.axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
            console.log(222222)
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/passageway?accesstoken="+this.accessToken+
					"&deviceSerial="+this.deviceSerial,
			}).then(res => {
                console.log(res)
                this.equipmenchannelval=res.data.result.data;
                console.log(this.equipmenchannelval)
                //设备列表二级：通道
                res.data.result.data.forEach(ele => {
                    console.log(this.data)
                    this.data[0].children.forEach(element => {
                        if(ele.deviceName==element.label){
                            element.children.push({
                                label: '通道'+ele.channelNo+':'+ele.channelName,
                                children: []
                            })
                        }
                    })
                    
                })
            });
        },
        videolist(){
            //该接口适用于已经绑定过直播地址的用户，用以获取账号下的视频地址列表
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/selectVoideList",
				params:{
					"accessToken":this.accessToken,
					"pageStart":0,
					"pageSize":50,
				}
			}).then(res => {
                // console.log(res);
                this.videolistdata=res.data.data;
                console.log(this.videolistdata)
                this.arr = []
                this.videolistdata.forEach(ele => {
                    if(ele.status==1){
                        this.arr.push(ele)
                    }
                })
                console.log(this.arr)
            });
        },
        openvideo(deviceSerial,channelNo){
            //该接口用于根据序列号和通道号批量开通直播功能（只支持可观看视频的设备）。
            var source = deviceSerial+":"+channelNo;
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/openVoidel",
				params:{
					"accessToken":this.accessToken,
					"source":source,
				}
			}).then(res => {
                console.log(res)
                if(res.data.data[0].ret=='200'){
                    this.videoshow(deviceSerial,channelNo);
                }
            });
        },
        downvideo(){
            //该接口用于根据序列号和通道号批量关闭直播功能（只支持可观看视频的设备）。
            var source="";
            console.log(this.arr)
            this.arr.forEach(ele => {
                source = source+ele.deviceSerial+":"+ele.channelNo+",";
                // console.log(source)
            })
            console.log(source)
            // var source = deviceSerial+":"+channelNo;
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/closeVoidel",
				params:{
					"accessToken":this.accessToken,
					"source":source,
				}
			}).then(res => {
                console.log(res)
                if(res.data.data[0].ret=='200'){
                }
            });
        },
        videoshow(deviceSerial,channelNo){
            //该接口用于根据序列号和通道号批量获取设备的直播地址信息
            var source = deviceSerial+":"+channelNo;
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/live/address/get",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				params:{
					"accessToken":this.accessToken,
					"source":source,
				}
			}).then(res => {
                console.log(res)
                if(res.data.data[0].ret=='60060'){
                    this.openvideo(res.data.data[0].deviceSerial,res.data.data[0].channelNo);
                    return false;
                }
                this.showrdata=res.data.data;
                this.showval=res.data.data[0].rtmp;
                this.open();
                this.videolist();
                // this.videolist.
            });
        },
        pztclick(direction){
            this.pztstart(direction);
        },
        speedclick(speed){
            this.buttonbg=speed;
            this.speed=speed;
        },
        pztstart(direction){
            if(this.pztclicktype){
                this.pztclicktype=false;
                this.axios({
                    method:"get",
                    url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/startControlPTZ?direction="+direction+
                    "&speed="+this.speed+
                    "&deviceSerial="+this.deviceSerial+
                    "&channelNo=1&accesstoken="+this.accessToken,
                }).then(res => {
                    console.log('开启云台',res)
                    // setTimeout(this.pztstop(direction),500);
                    setTimeout(()=>{this.pztclicktype=true},1000)
                });
            }else{
                this.$message({
                    message: '点击太频繁了,请间隔1秒',
                    type: 'warning'
                });
            }
            
        },
        pztstop(direction){
            this.axios({
                method:"get",
                url:"http://60.191.29.210:9090/RestIOTAPI/yingshiyun/stopControlPTZ?direction="+direction+"&deviceSerial="+this.deviceSerial+"&channelNo=1&accesstoken="+this.accessToken,
			}).then(res => {
                console.log('关闭云台',res)
            });
        },
        deletes(){
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/delete",
                params:{
					"accessToken":this.accessToken,
					"deviceSerial":this.deviceSerial
				}
			}).then(res => {
                console.log(res)
            });
        },
        add(){
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/add",
                params:{
					"accessToken":this.accessToken,
                    "deviceSerial":this.deviceSerial,
                    "validateCode":"GSHZIH"
				}
			}).then(res => {
                console.log(res)
            });
        },
        download(src) {
            //下载图片
            var name = "抓拍图片"+this.setAllTime().replace(/-|:/gi, "").replace(/\s/gi, "-")+Math.floor(Math.random()*100)+1;
			var $a = document.createElement('a');
			$a.setAttribute("href", src);
			$a.setAttribute("download", name);
			var evObj = document.createEvent('MouseEvents');
			evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
			$a.dispatchEvent(evObj);
		}
    },
    components:{
        subvideo
    }
}
</script>

<style>
.newvideo{
    display: flex;
    height: 100%;
}
.newvideo .aside-parent{
    /* background: #293950; */
}
.newvideo .aside-parent img{
    padding: 0px 12px 0px 8px;
}
.newvideo .el-menu{
    border: none;
    /* padding-left: 20px; */
}
.video-main{
    display: flex;
    height: 100%;
    flex: 1;
    justify-content: space-around;
    align-items: center;
}
.button-bg{
    background: cadetblue!important;
}
.el-aside-nav{
    position: relative;
    height: 100%;
    top: -40px;
    /* background: #293950; */
}
.el-aside-navchange{
    position: absolute;
    height: 40px;
    top: 60px;
    /* background: #293950; */
}
.newvideo .el-tree{
    width: 200px;
    /* background: #293950; */
    color: #000;
    padding-left: 20px;
}
/* .newvideo .el-tree-node__content:hover{
    background-color: rgb(33, 46, 64)
} */
.newvideo .video-span{
    display: flex;
    justify-content: space-around;
    padding: 10px 0px;
}
/* .newvideo .video-span button{
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
} */
.roulette-shell{
	border: 1px solid #ccc;
	background: rgb(235, 241, 235);
}
.contranl{
	display: flex;
    flex-direction: column;
    align-items: center;
}
.video-roulette{
    width: 210px;
	height: 210px;
	border-radius: 50%;
	border: 1px solid rgb(37, 36, 36);
}
.video-roulette span{
	display: inline-block;
	width: 70px;
	height: 70px;
	/* background: lawngreen; */
	margin: 0px;
	vertical-align: top;
	text-align: center;
	line-height: 70px;
	cursor:pointer;
	font-size: 40px;
	font-weight: bolder;
}
.video-center{
    padding: 10px;
}
.video-container{
    display: flex;
    border: 1px solid #ccc;
}
/* .video-container div{
    border: 1px solid #ccc;
} */
</style>
