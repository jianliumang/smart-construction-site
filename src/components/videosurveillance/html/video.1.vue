<template>
    <div class="video">
		<el-container>
            <el-aside width="200px">
				<el-tree :data="data" node-key="id" :default-expanded-keys="openkey" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </el-aside>
            <el-main>
				<div class="videoplay">
					<div>{{szshowname}}</div>
					<div id="divPlugin" class="plugin"></div>
					<div class="video-block">
    					<button @mousedown="PTZZoomIn" @mouseup="PTZZoomStop">放大</button>
						<div></div>
						<button @mousedown="PTZZoomout" @mouseup="PTZZoomStop">缩小</button>
  					</div>
				</div>
				<div class="video-operate">
					<div class="roulette-shell">
						<div class="video-roulette">
							<span @mousedown="mouseDownPTZControl(5)" @mouseup="mouseUpPTZControl"></span><span @mousedown="mouseDownPTZControl(1)" @mouseup="mouseUpPTZControl" class="el-icon-arrow-up"></span><span @mousedown="mouseDownPTZControl(7)" @mouseup="mouseUpPTZControl"></span><span @mousedown="mouseDownPTZControl(3)" @mouseup="mouseUpPTZControl" class="el-icon-arrow-left"></span><span @click="mouseDownPTZControl(9)" class="el-icon-rank"></span><span @mousedown="mouseDownPTZControl(4)" @mouseup="mouseUpPTZControl" class="el-icon-arrow-right"></span><span @mousedown="mouseDownPTZControl(6)" @mouseup="mouseUpPTZControl"></span><span @mousedown="mouseDownPTZControl(2)" @mouseup="mouseUpPTZControl" class="el-icon-arrow-down"></span><span @mousedown="mouseDownPTZControl(8)" @mouseup="mouseUpPTZControl"></span>
						</div>
					</div>
					<el-input-number @change="numchange" size="mini" v-model="num" :min="1" :max="7"></el-input-number>
					<div><button @click="clickCapturePic">截取图片</button></div>
					<div><button @click="clickStartRecord">开始录制</button></div>
					<div><button @click="clickStopRecord">停止录制</button></div>
				</div>
				<div class="splitscreen">
					<button @click="iwndowtypefn(1)">一分屏</button>
					<button @click="iwndowtypefn(2)">四分屏</button>
					<button @click="iwndowtypefn(3)">九分屏</button>
					<button @click="clickStopRealPlay">停止预览</button>
					<button @click="clickLogout">退出</button>
				</div>
			</el-main>
        </el-container>
    </div>
</template>
<script>
import $ from 'jquery'
import WebVideoCtrl from '../../../../codebase/webVideoCtrl.js'
// var WebVideoCtrl = window
export default {
	data() {
      return {
		regionid:Number,
        data: [{
			id:0,
          label: '设备列表',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
		},
		boxwidth: 600,
		boxheight: 400,
		g_iWndIndex:0,
		bZero:Boolean,
		num:1,
		videolist:[],
		listfirst:[],
		openkey:[],
		messagedata:'<strong>成功</strong>',
		iwndowtype: 1,
		videolistid:[],
		videolistname:[],
		labellist:[],
		szIP:'',
		szPort:'',
		szUsername:'',
		szPassword:'',
		szshowname:'',
		iChannelID:1,
      };
	},
	created() {
      this.regionid = sessionStorage.getItem("regionid");
    },
    mounted(){
		this.operatecenter();
		this.videorequest();
    },
    methods:{
		iwndowtypefn(num){
			//屏幕分割
			this.iwndowtype = num;
			this.clickpicturesegmentation();
		},
		open3() {
			//消息提示
        	this.$notify({
				title: '成功',
				dangerouslyUseHTMLString: true,
          		message: this.messagedata,
        	});
      	},
		numchange(){
			//摄像头旋转速率
			console.log(this.num)
		},
		videorequest(){
			//根据工地请求获取所有的摄像头
        	this.$http
                .get(
                    "http://192.168.1.88:8080/RestIOTAPI/videomonitor/toselectVideoMonitor?regionid=" + this.regionid
                )
                .then(res => {
					this.videolist = res.data.result;
					this.szIP=this.videolist[0].ip;
					this.szPort=this.videolist[0].port;
					this.szUsername=this.videolist[0].vuser_name;
					this.szPassword=this.videolist[0].vpassword;
					this.szshowname=this.videolist[0].alias;
					this.equipmentlist();
					this.init();
                }).catch((error) => {
                })
			},
		equipmentlist(){
			//创建设备列表
			var listid = 0;
			var listindex = 0;
			//一级列表
			this.videolist.forEach(element => {
				if(this.listfirst.indexOf(element.belong)==-1){
					listid++;
					this.data[0].children.splice(listindex,0,{
						id:listid,
						label:element.belong,
						children:[]
					});
					this.openkey.push(listid);
					listindex++;
				}
			})
			//二级列表
			this.data[0].children.forEach(namevalue => {
						var usernum = 0;
						var userindex = 0;
				this.videolist.forEach(elevalue => {
					if(elevalue.belong == namevalue.label){
						usernum++;
						var userid = namevalue.id + '.' + usernum;
						namevalue.children.splice(userindex,0,{
							id:userid,
							label:elevalue.alias,
							ip:elevalue.ip,
							children:[]
						})
						this.openkey.push(userid);
						userindex++;
						this.labellist.push(elevalue.ip);
					}
				})
				
			})
			
		},
		equipmentlistsub(){
			//三级列表
			this.data[0].children.forEach(element => {
				element.children.forEach(value => {
					var crossingnum = 0;
					var crossingindex = 0;
					value.children=[];
					if(this.szIP==value.ip){
						this.videolistname.forEach(crossing=>{
							crossingnum++;
							var crossingid = value.id + '.' + crossingnum
							value.children.splice(crossingindex,0,{
								id:crossingid,
								label:crossing,
								children:[],
								iChannelID:crossingnum
							});
							crossingindex++;
						})
						
					}
				})
			})
		},
		operatecenter(){
			//获取窗口父系尺寸
			this.boxwidth = $(".videoplay").width()-60
			this.boxheight = $(".videoplay").height()
		},
		handleNodeClick(data) {
			//点击设备名称，获取设备通道
			this.szshowname = data.label;
			if(this.labellist.indexOf(data.ip)==-1){
				if(this.videolistname.indexOf(data.label)==-1){return false;};
			}else{
				this.clickStopsub();
				this.clickLogout();
				this.szIP = data.ip;
				this.videolist.forEach(element => {
					if(element.ip==data.ip){
						this.szPort=element.port;
						this.szUsername=element.vuser_name;
						this.szPassword=element.vpassword;
					}
				})
				this.init();
				this.getChannelInfo();
			};
			//选择观看通道
			if(this.videolistname.indexOf(data.label)==-1){
				return false;
			}else{
				this.iChannelID = this.videolistid[this.videolistname.indexOf(data.label)];
				this.clickStartRealPlay();
			}
      	},
        init(){
            // 检查插件是否已经安装过
			var iRet = window.I_CheckPluginInstall();
			if (-2 == iRet) {
				alert("您的Chrome浏览器版本过高，不支持NPAPI插件！");
				return;
			} else if (-1 == iRet) {
    		    alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！");
				return;
    		}
			// this.boxwidth = $(".videoplay").width()-60;
			// this.boxheight = $(".videoplay").height();
			// $("#divPlugin").height() = this.boxheight;
			// 初始化插件参数及插入插件
			window.I_InitPlugin(this.boxwidth, this.boxheight, {
        		bWndFull: true,//是否支持单窗口双击全屏，默认支持 true:支持 false:不支持
        		iWndowType: 1,
				cbSelWnd: (xmlDoc) => {
						this.g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
						var szInfo = "当前选择的窗口编号：" + this.g_iWndIndex;
						// this.showCBInfo(szInfo);
				}
			});
			window.I_InsertOBJECTPlugin("divPlugin");
	
			//检查插件是否最新
			// if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
			// 	alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！");
			// 	return;
			// }
			// 登录设备
			window.I_Login(this.szIP, 1, this.szPort, this.szUsername, this.szPassword, {
				success: (xmlDoc) => {
					// 开始预览
					this.clickStartRealPlay();
					this.getChannelInfo();
					console.log("登录成功")
				},
				error: () => {
					console.log(this.szIP + "登录失败")
				}
			});
		},
		clickStartRealPlay() {
				// 开始预览
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex),
					iStreamType = 1,
					bZeroChannel = this.bZero == true ? true : false,
					szInfo = "";

				if ("" == this.szIP) {
					return;
				}

				if (oWndInfo != null) {// 已经在播放了，先停止
					window.I_Stop();
				}
				console.log(this.szIP)
				console.log(bZeroChannel)
				console.log('通道号'+this.iChannelID)
				var iRet = window.I_StartRealPlay(this.szIP, {
					iStreamType: iStreamType,
					iChannelID: this.iChannelID,
					bZeroChannel: bZeroChannel
				});
				console.log('成功'+iRet)
				if(iRet == -1){
					setTimeout(this.clickStartRealPlay,1000)
				}

				if (0 == iRet) {
					console.log("开始预览成功！");
				} else {
					szInfo = "开始预览失败！";
				}
		},
		clickStopRealPlay() {
				// 停止预览
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex),
					szInfo = "";

				if (oWndInfo != null) {
					var iRet = window.I_Stop();
					if (0 == iRet) {
						szInfo = "停止预览成功！";
					} else {
						szInfo = "停止预览失败！";
					}
					console.log(oWndInfo.szIP + " " + szInfo);
				}
		},
		clickStopsub(){
			//将所有窗口关闭
			for(var i=0;i<9;i++){
			var oWndInfo = window.I_GetWindowStatus(i);
			if (oWndInfo != null) {
				window.I_Stop(i);
			}
		}
		},
		clickLogout() {
				// 退出
				var szInfo = "";
				if (this.szIP == "") {
					return;
				}

				var iRet = window.I_Logout(this.szIP);
				if (0 == iRet) {
					szInfo = "退出成功！";
					// this.getChannelInfo();
				} else {
					szInfo = "退出失败！";
				}
				console.log(this.szIP + " " + szInfo);
		},
		clickpicturesegmentation(){
				//分屏
				var oWndInfo = window.I_ChangeWndNum(this.iwndowtype) 
		},
		clickCapturePic() {
				// 抓图
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex),
					szInfo = "";
				//获取抓图路径
				var local = window.I_GetLocalCfg();
				var localval = $(local).find("CapturePath").eq(0).text()

				if (oWndInfo != null) {
					var szPicName = oWndInfo.szIP + "_" + new Date().getTime(),
						iRet = window.I_CapturePic(szPicName);
					if (0 == iRet) {
						szInfo = "抓图成功！";
						this.messagedata = "抓图成功！图片路径 " + localval;
						this.open3()
					} else {
						szInfo = "抓图失败！";
					}
					console.log(oWndInfo.szIP + " " + szInfo);
				}
				
				
		},
		clickStartRecord() {
				// 开始录像
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex),
					szInfo = "";

				if (oWndInfo != null) {
					var szChannelID = $("#channels").val(),
						szFileName = oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
						iRet = window.I_StartRecord(szFileName);
					if (0 == iRet) {
						szInfo = "开始录像成功！";
					} else {
						szInfo = "开始录像失败！";
					}
					console.log(oWndInfo.szIP + " " + szInfo);
				}
		},
		clickStopRecord() {
				// 停止录像
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex),
					szInfo = "";

				//获取录像路径
				var local = window.I_GetLocalCfg();
				var localval = $(local).find("RecordPath").eq(0).text()

				if (oWndInfo != null) {
					var iRet = window.I_StopRecord();
					if (0 == iRet) {
						szInfo = "停止录像成功！";
						this.messagedata = "录像成功！录像路径 " + localval;
						this.open3()
					} else {
						szInfo = "停止录像失败！";
					}
					console.log(oWndInfo.szIP + " " + szInfo);
				}
				
		},
		getChannelInfo() {
				this.videolistid = [];
				this.videolistname = [];
				// 获取通道
				if ("" == this.szIP) {
					return;
				}
				// 模拟通道
				window.I_GetAnalogChannelInfo(this.szIP, {
					async: false,
					success: (xmlDoc) => {
						var iddata = [],
							namedata = [];
						var oChannels = $(xmlDoc).find("VideoInputChannel");
						$.each(oChannels,function (i) {
							var id = $(this).find("id").eq(0).text(),
								name = $(this).find("name").eq(0).text();
							if ("" == name) {
								name = "Camera " + (i < 9 ? "0" + (i + 1) : (i + 1));
							}
							iddata.push(id);
							namedata.push(name);
						});
						this.videolistid = this.videolistid.concat(iddata);
						this.videolistname = this.videolistname.concat(namedata);
						this.bZero=false;
						console.log(this.szIP + " 获取模拟通道成功！");
						this.equipmentlistsub();
					},
					error: () => {
						console.log(this.szIP + " 获取模拟通道失败！");
					}
				});
				// 数字通道
				window.I_GetDigitalChannelInfo(this.szIP, {
					async: false,
					success: (xmlDoc) => {
						var iddata = [],
							namedata = [];
						var oChannels = $(xmlDoc).find("InputProxyChannelStatus");
						$.each(oChannels, function (i) {
							var id = $(this).find("id").eq(0).text(),
								name = $(this).find("name").eq(0).text(),
								online = $(this).find("online").eq(0).text();
							if ("false" == online) {// 过滤禁用的数字通道
								return true;
							}
							if ("" == name) {
								name = "IPCamera " + (i < 9 ? "0" + (i + 1) : (i + 1));
							}
							iddata.push(id);
							namedata.push(name);
						});
						this.videolistid = this.videolistid.concat(iddata);
						this.videolistname = this.videolistname.concat(namedata);
						this.bZero=false;
						this.equipmentlistsub();
						console.log(this.szIP + " 获取数字通道成功！");
					},
					error: () => {
						console.log(this.szIP + " 获取数字通道失败！");
					}
				});
				// 零通道
				window.I_GetZeroChannelInfo(this.szIP, {
					async: false,
					success: (xmlDoc) => {
						var iddata = [],
							namedata = [];
						var oChannels = $(xmlDoc).find("ZeroVideoChannel");
						$.each(oChannels, function (i) {
							var id = $(this).find("id").eq(0).text(),
								name = $(this).find("name").eq(0).text();
							if ("" == name) {
								name = "Zero Channel " + (i < 9 ? "0" + (i + 1) : (i + 1));
							}
							if ("true" == $(this).find("enabled").eq(0).text()) {// 过滤禁用的零通道
								this.bZero=true;
							}
							iddata.push(id);
							namedata.push(name);
						});
						var iddatalist = [];
						var namedatalist = [];
						iddata.forEach(element => {
							if(this.videolistid.indexOf(element)==-1){
								namedatalist.push(namedata[iddata.indexOf(element)]);
								iddatalist.push(element);
							}
						})
						this.videolistid = this.videolistid.concat(iddatalist);
						this.videolistname = this.videolistname.concat(namedatalist);
						this.equipmentlistsub();
						console.log(this.szIP + " 获取零通道成功！");
					},
					error: () => {
						console.log(this.szIP + " 获取零通道失败！");
					}
				});
		},
		mouseDownPTZControl(iPTZIndex) {
				// PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex),
					bZeroChannel = this.bZero == true ? true : false,
					iPTZSpeed = this.num;//$("#ptzspeed").val()

				if (bZeroChannel) {// 零通道不支持云台
					return;
				}

				if (oWndInfo != null) {
					if (9 == iPTZIndex && this.g_bPTZAuto) {
						iPTZSpeed = 0;// 自动开启后，速度置为0可以关闭自动
					} else {
						this.g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
					}

					window.I_PTZControl(iPTZIndex, false, {
						iPTZSpeed: iPTZSpeed,
						success: (xmlDoc) => {
							if (9 == iPTZIndex) {
								this.g_bPTZAuto = !this.g_bPTZAuto;
							}
							console.log(oWndInfo.szIP + " 开启云台成功！");
						},
						error: () => {
							console.log(oWndInfo.szIP + " 开启云台失败！");
						}
					});
				}
		},
		mouseUpPTZControl() {
				// 方向PTZ停止
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex);

				if (oWndInfo != null) {
					window.I_PTZControl(1, true, {
						success: (xmlDoc) => {
							console.log(oWndInfo.szIP + " 停止云台成功！");
						},
						error: () => {
							console.log(oWndInfo.szIP + " 停止云台失败！");
						}
					});
				}
		},
		PTZZoomIn() {
			//放大
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex);

				if (oWndInfo != null) {
					window.I_PTZControl(10, false, {
						iWndIndex: this.g_iWndIndex,
						success: (xmlDoc) => {
							console.log(oWndInfo.szIP + " 调焦+成功！");
						},
						error: () => {
							console.log(oWndInfo.szIP + "  调焦+失败！");
						}
					});
				}
		},
		PTZZoomout() {
			//缩小
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex);

				if (oWndInfo != null) {
					window.I_PTZControl(11, false, {
						iWndIndex: this.g_iWndIndex,
						success: (xmlDoc) => {
							console.log(oWndInfo.szIP + " 调焦-成功！");
						},
						error: () => {
							console.log(oWndInfo.szIP + "  调焦-失败！");
						}
					});
				}
		},
		PTZZoomStop() {
			//调焦状态
				var oWndInfo = window.I_GetWindowStatus(this.g_iWndIndex);

				if (oWndInfo != null) {
					window.I_PTZControl(11, true, {
						iWndIndex: this.g_iWndIndex,
						success: (xmlDoc) => {
							console.log(oWndInfo.szIP + " 调焦停止成功！");
						},
						error: () => {
							console.log(oWndInfo.szIP + "  调焦停止失败！");
						}
					});
				}
		},
	}
}
</script>

<style>
.plugin{
	background: rgb(191, 202, 180);
	display: inline-block;
	height: 100%;
	vertical-align: top;
}
.video-block{
	width: 50px;
	height: 280px;
	opacity: 0.2;
	background: #ccc;
	display: inline-block;
	width: 50px;
	cursor:pointer;
	margin-top: 200px;
	padding: 10px 0;
}
.video-block button{
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: #fff;
	color: #000;
	outline: none;
}
.video-block div{
	height: 180px;
	border-right: 2px solid #000;
	position: relative;
	right: 24px;
}
.video .el-main{
	padding: 0px;
}
.splitscreen{
	margin-top: 50px;
}
.videoplay{
	width: 70%;
	min-width: 700px;
	display: inline-block;
	text-align: left;
	height: 700px;
	/* vertical-align: top; */
	/* line-height: 700px; */
}
.video-operate{
	display: inline-block;
	vertical-align: top;
}
.roulette-shell{
	border: 1px solid #ccc;
	background: rgb(235, 241, 235);
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
</style>
