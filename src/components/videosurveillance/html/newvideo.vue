<template>
    <div class="newvideo">
        <div>
            <div>
                设备通道
                <div v-for="(equipmenchannel,index) in equipmenchannelval" :key="'设备通道'+index">
                    <!-- <div>通道号：{{equipmenchannel.channelNo}}</div> -->
                    <!-- <div>设备序列号：{{equipmenchannel.deviceSerial}}</div>
                    <div>IPC序列号：{{equipmenchannel.ipcSerial}}</div> -->
                    
                    <!-- <div>设备名：{{equipmenchannel.deviceName}}</div> -->
                    <div @click="videoshow(equipmenchannel.deviceSerial,equipmenchannel.channelNo)">通道号：{{equipmenchannel.channelNo}}通道名：{{equipmenchannel.channelName}}</div>
                   
                </div>
            </div>
        </div>
        <div>
            <div class="video-container">
                <div id="a1" @mousemove="mousemove($event)" style="width: 600px;height: 400px;"></div>
            </div>
            <div class="video-container">
            </div>
            <div >
                <button @click="cloudStorage">开启云储存</button>
                <button @click="capture">抓拍</button>
                <button @click="equipmentinfo">设备信息</button>
                <button @click="equipmentlist">设备列表</button>
                <button @click="equipmenchannel">设备通道</button>
                <button @click="videolist">视频列表</button>
                <button @click="openvideo('C33749283',2)">开通直播</button>
                <button @click="downvideo">关闭</button>
                <!-- <button @click="deletelist">关闭</button> -->
                <button @click="videoshow('C33749283',7)">开通直播</button>
                <button @click="deletes">删除</button>
                <button @click="add">添加</button>
            </div>
            <div>
            </div>
        </div>
        <div>
            <div><span @click="pztclick(4)">左上</span><span @click="pztclick(0)">上</span><span @click="pztclick(6)">右上</span></div>
            <div><span @click="pztclick(2)">左</span><span @click="pztclick(4)">中</span><span @click="pztclick(3)">右</span></div>
            <div><span @click="pztclick(5)">左下</span><span @click="pztclick(1)">下</span><span @click="pztclick(7)">右下</span></div>
            <div><span @click="pztclick(8)">放大</span><span @click="pztclick(9)">缩小</span></div>
            <div><span @click="pztclick(10)">近焦距</span><span @click="pztclick(11)">远焦距</span></div>
            <div><span @click="speedclick(0)">慢</span><span @click="speedclick(1)">适中</span><span @click="speedclick(2)">块</span></div>
        </div>
        <!-- <button @click="width">1111</button> -->
    </div>
    
</template>
<script>
// import offlights from '../../../../static/js/offlights.js'
// import ckplayer from '../../../../static/ckplayer/ckplayer.js'
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
            // swf:require('')
        }
    },
    mounted(){
        this.open();
        this.equipmentlist();
        this.equipmenchannel()
    },
    methods:{
        mousemove(ev){
            // ev.preventDefault()
            console.log(1111)
        },
        width(){
            CKobject.getObjectById('video').videoWAndH('200','100');
        },
        open(){
            var flashvars={
                f:'rtmp://rtmp.open.ys7.com/openlive/86f5f44023994805b6bdad9015bcbf31',//视频地址
                a:'',//调用时的参数，只有当s>0的时候有效
                s:'0',//调用方式，0=普通方法（f=视频地址），1=网址形式,2=xml形式，3=swf形式(s>0时f=网址，配合a来完成对地址的组装)
                c:'0',//是否读取文本配置,0不是，1是
                x:'',//调用配置文件路径，只有在c=1时使用。默认为空调用的是ckplayer.xml
                i:'http://www.ckplayer.com/images/loadimg3.jpg',//初始图片地址
                d:'http://www.ckplayer.com/down/pause6.1_1.swf|http://www.ckplayer.com/down/pause6.1_2.swf',//暂停时播放的广告，swf/图片,多个用竖线隔开，图片要加链接地址，没有的时候留空就行
                u:'',//暂停时如果是图片的话，加个链接地址
                l:'',//前置广告，swf/图片/视频，多个用竖线隔开，图片和视频要加链接地址http://www.ckplayer.com/down/adv6.1_1.swf|http://www.ckplayer.com/down/adv6.1_2.swf
                r:'',//前置广告的链接地址，多个用竖线隔开，没有的留空
                t:'10|10',//视频开始前播放swf/图片时的时间，多个用竖线隔开
                y:'',//这里是使用网址形式调用广告地址时使用，前提是要设置l的值为空
                z:'http://www.ckplayer.com/down/buffer.swf',//缓冲广告，只能放一个，swf格式
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
		    CKobject.embedSWF('./static/ckplayer/ckplayer.swf','a1','ckplayer_a1','600','400',flashvars,params);;
        },
        cloudStorage(){
            //云储存
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/cloud/storage/enable",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                }, 
				data:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
					"deviceSerial":"C33749283",
					"channelNo":1,
					"enable":1
				}
			}).then(res => {
                console.log(res)
            });
        },
        capture(){
            //抓拍
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/capture",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
					"deviceSerial":"C33749283",
					"channelNo":1,
				}
			}).then(res => {
                console.log(res)
            });
        },
        equipmentinfo(){
            //设备信息:查询用户下指定设备的基本信息
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/info",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
					"deviceSerial":"C33749283",
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
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/list",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
					"pageStart":0,
					"pageSize":50,
				}
			}).then(res => {
                // console.log(res)
                this.equipmentlistval=res.data.data;
                console.log(this.equipmentlistval)
            });
        },
        equipmenchannel(){
            //获取指定设备的通道信息
            // this.axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/camera/list",
                headers: {  
                    'Access-Control-Allow-Origin': '*',  
                    // 'Content-Type': 'application/x-www-form-urlencoded',  
                },  
                withCredentials: true,  
				params:{
					"accessToken":"at.axnqm5l96zjtlahkdcowerv436kxtwa1-1vw5gfdzd9-1kjqxqb-eqmbsxeqw",
					"deviceSerial":"C23418950"//C33749283
				}
			}).then(res => {
                console.log(res)
                this.equipmenchannelval=res.data.data;
                console.log(this.equipmenchannelval)
            });
        },
        videolist(){
            //该接口适用于已经绑定过直播地址的用户，用以获取账号下的视频地址列表
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/live/video/list",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
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
                method:"post",
                url:"https://open.ys7.com/api/lapp/live/video/open",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
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
            //该接口用于根据序列号和通道号批量开通直播功能（只支持可观看视频的设备）。
            var source="";
            console.log(this.arr)
            this.arr.forEach(ele => {
                source = source+ele.deviceSerial+":"+ele.channelNo+",";
                // console.log(source)
            })
            console.log(source)
            // var source = deviceSerial+":"+channelNo;
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/live/video/close",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
				params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
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
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
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
        // deletelist(){
        //     //该接口用于根据序列号和通道号批量获取设备的直播地址信息
        //     // var source = deviceSerial+":"+channelNo;
        //     this.axios({
        //         method:"post",
		// 		url:"https://open.ys7.com/api/lapp/live/video/close",
		// 	}).then(res => {
        //         console.log(res)
        //     });
        // },
        pztclick(direction){
            this.pztstart(direction);
            
            
        },
        speedclick(speed){
            this.speed=speed;
        },
        pztstart(direction){
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/ptz/start",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:{
					"accessToken":"at.axnqm5l96zjtlahkdcowerv436kxtwa1-1vw5gfdzd9-1kjqxqb-eqmbsxeqw",
					"deviceSerial":"C23418950",
                    "channelNo":1,
                    "direction":direction,
                    "speed":this.speed
				}
			}).then(res => {
                console.log('开启云台',res)
                setTimeout(this.pztstop(direction),500)
            });
        },
        pztstop(direction){
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/ptz/stop",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:{
					"accessToken":"at.axnqm5l96zjtlahkdcowerv436kxtwa1-1vw5gfdzd9-1kjqxqb-eqmbsxeqw",
					"deviceSerial":"C23418950",
                    "channelNo":1,
                    "direction":direction
				}
			}).then(res => {
                console.log('关闭云台',res)
            });
        },
        deletes(){
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/delete",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
					"deviceSerial":"C33749283"
				}
			}).then(res => {
                console.log(res)
            });
        },
        add(){
            this.axios({
                method:"post",
                url:"https://open.ys7.com/api/lapp/device/add",
                headers: {  
                    'Access-Control-Allow-Origin': '*', 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params:{
					"accessToken":"at.d2fkjurncazfqdvf0f2sy0pn6e258zmx-67uykpkmmu-19lybgx-zym1tredy",
                    "deviceSerial":"C33749283",
                    "validateCode":"GSHZIH"
				}
			}).then(res => {
                console.log(res)
            });
        },
    }
}
</script>

<style>
.newvideo{
    display: flex;
    overflow: auto;
    height: 100%;
}
.operation{
    vertical-align: top;
}
.newvideo span{
    display: inline-block;
    width: 50px;
    height: 50px;
    border:1px solid green;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
}
.video-container{
    display: flex;
}
.video-container div{
    border: 1px solid #ccc;
}
</style>
