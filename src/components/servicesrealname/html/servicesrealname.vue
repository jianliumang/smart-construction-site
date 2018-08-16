<template>
    <div class="servicesrealname">
        该模块暂未上线
    <!-- <div>{{input1}}</div> 
    <input type="text" v-model="input2">
    <button @click="websocketsend(input2)">发送</button> -->
    <button @click="exportfn3">导出</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
           topval:100,
           websock: null,
           input1:'',
           input2:''
        }
        
    },
    created(){
        //页面刚进入时开启长连接
        // this.initWebSocket()
    },
　　destroyed: function() {
　　　　//页面销毁时关闭长连接
// 　　　　　this.websocketclose();
　　},
    mounted () {
    },
    methods:{
        exportfn3(){
            this.axios({
                method:"post",
                url:"http://60.191.29.210:9090/JavaExportExcel/excel/java",
				data:[{
                    "agentName": "谷隐",
                    "commission": 1000000,
                    "commissionRate": 0.25,
                    "consignor": "刘建",
                    "customerName": "方俊",
                    "customerPaymentMethod": "支付宝",
                    "deliverGoodsDate": "2018-08-16 14:43:00",
                    "deliverMode": "快递",
                    "destinationCountry": "爪洼国",
                    "destinationPort": "顺风",
                    "edition": "111111",
                    "fillingTime": "2018-08-16 14:43:00",
                    "fineness": "11111",
                    "freight": 100000,
                    "goodsNumber": 1000,
                    "insurancePremium": 10000,
                    "latestRevisionTime": "2018-08-16 14:43:00",
                    "listBatchNumber": [
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                    ],
                    "monthExchangeRate": 1110,
                    "orderNumber": "61495684652164",
                    "receivablesdate": "2018-08-16 14:43:00",
                    "shenzhouContractNumber": "dasfasfag-s958f4",
                    "specialRequirements": "服务",
                    "totalPrice": 10010,
                    "unitPrice": 10010
                },{
                    "agentName": "谷隐",
                    "commission": 1000000,
                    "commissionRate": 0.25,
                    "consignor": "刘建",
                    "customerName": "方俊",
                    "customerPaymentMethod": "支付宝",
                    "deliverGoodsDate": "2018-08-16 14:43:00",
                    "deliverMode": "快递",
                    "destinationCountry": "爪洼国",
                    "destinationPort": "顺风",
                    "edition": "111111",
                    "fillingTime": "2018-08-16 14:43:00",
                    "fineness": "11111",
                    "freight": 100000,
                    "goodsNumber": 1000,
                    "insurancePremium": 10000,
                    "latestRevisionTime": "2018-08-16 14:43:00",
                    "listBatchNumber": [
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                    ],
                    "monthExchangeRate": 1110,
                    "orderNumber": "61495684652164",
                    "receivablesdate": "2018-08-16 14:43:00",
                    "shenzhouContractNumber": "dasfasfag-s958f4",
                    "specialRequirements": "服务",
                    "totalPrice": 10010,
                    "unitPrice": 10010
                },{
                    "agentName": "谷隐",
                    "commission": 1000000,
                    "commissionRate": 0.25,
                    "consignor": "刘建",
                    "customerName": "方俊",
                    "customerPaymentMethod": "支付宝",
                    "deliverGoodsDate": "2018-08-16 14:43:00",
                    "deliverMode": "快递",
                    "destinationCountry": "爪洼国",
                    "destinationPort": "顺风",
                    "edition": "111111",
                    "fillingTime": "2018-08-16 14:43:00",
                    "fineness": "11111",
                    "freight": 100000,
                    "goodsNumber": 1000,
                    "insurancePremium": 10000,
                    "latestRevisionTime": "2018-08-16 14:43:00",
                    "listBatchNumber": [
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                        {
                        "batch": 110,
                        "productBatchNumber": "asff4654651sd64f4s",
                        "shenzhouContractNumber": "dasfasfag-s958f4"
                        },
                    ],
                    "monthExchangeRate": 1110,
                    "orderNumber": "61495684652164",
                    "receivablesdate": "2018-08-16 14:43:00",
                    "shenzhouContractNumber": "dasfasfag-s958f4",
                    "specialRequirements": "服务",
                    "totalPrice": 10010,
                    "unitPrice": 10010
                }],
                responseType: 'blob', // 表明返回服务器返回的数据类型
                headers: {
                    'Content-Type': 'application/json'
                }
			}).then(res => {
                console.log(res);
                console.log(typeof res.data)
                const blob = new Blob([res.data]);
                const fileName = '统计.xls';
                const elink = document.createElement('a');
                elink.download = fileName;
                elink.style.display = 'none';
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
            });
        },
        // threadPoxi(){  // 实际调用的方法
        //         //参数
        //         const agentData = "mymessage";
        //         //若是ws开启状态
        //         if (this.websock.readyState === this.websock.OPEN) {
        //             this.websocketsend(agentData)
        //         }
        //         // 若是 正在开启状态，则等待300毫秒
        //         else if (this.websock.readyState === this.websock.CONNECTING) {
        //             let that = this;//保存当前对象this
        //             setTimeout(function () {
        //                 that.websocketsend(agentData)
        //             }, 300);
        //         }
        //         // 若未开启 ，则等待500毫秒
        //         else {
        //             this.initWebSocket();
        //             let that = this;//保存当前对象this
        //             setTimeout(function () {
        //                 that.websocketsend(agentData)
        //             }, 500);
        //         }
        //     },
            initWebSocket(){ //初始化weosocket
                //ws地址
                //判断当前浏览器是否支持WebSocket
                this.websock = new WebSocket("ws://60.191.29.210:9090/RestIOTAPI/websocket");
                this.websock.onopen = this.websocketonopen;
    　　　　　　　this.websock.onerror = this.websocketonerror;
    　　　　　　　this.websock.onmessage = this.websocketonmessage; 
    　　　　　　　this.websock.onclose = this.websocketclose;
            },
            websocketonopen(){
                console.log("WebSocket连接成功");
            },
            websocketonerror(e){//错误
                console.log("WebSocket连接发生错误");
            },
            websocketonmessage(e){ //数据接收
                console.log(e)
                // const redata = JSON.parse(e.data);
                // console.log(redata.value);
            },
            websocketsend(agentData){//数据发送
                console.log(agentData)
                this.websock.send(agentData);
            },
            websocketclose(e){  //关闭
                console.log("connection closed (" + e.code + ")");
            },
        button(){
            const { href } = this.$router.resolve({
                path: 'equipmentinspection/qrcode'
            })
            window.open(href, '_blank')
            // window.open(this.$router.resolve({path: 'equipmentinspection/qrcode'}),'_blank');
        },
        datatype(){
                setTimeout(() =>{
                    var buttonelement = document.getElementsByClassName("el-picker-panel__icon-btn");
                    for(let i=0;i<buttonelement.length;i++){
                        buttonelement[i].onclick = () => {
                            setTimeout(() => {this.changeredfn()},10);
                        }
                    };
                    var dateelement = document.getElementsByClassName("el-date-picker__header-label");
                    var year = dateelement[0].innerHTML.substring(0,4);
                    var months = dateelement[1].innerHTML.substring(0,1);
                    
                    this.changeredfn();
                },10)
            },
            changeredfn(){
                //将有数据的天数变为红色
                var spanelement = document.getElementsByClassName("available");
                for(let i=0;i<spanelement.length-10;i++){
                    spanelement[i].children[0].children[0].style.color="#000";
                    if(this.list.indexOf(spanelement[i].children[0].children[0].innerText)!=-1){
                        spanelement[i].children[0].children[0].style.color="#f00";
                    }
                }
            },
            download(src) {
			    var $a = document.createElement('a');
			    $a.setAttribute("href", src);
			    $a.setAttribute("download", "");
 
 
			    var evObj = document.createEvent('MouseEvents');
			    evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
			    $a.dispatchEvent(evObj);
			}
        },


}
</script>

<style>
.servicesrealname{
    padding-top: 50px;
    font-size: 32px;
    color: #000000;
}
.div
{
width:100px;
height:100px;
background:red;
position: absolute;
top: 0px;
left: 0px;
animation:myfirst 5s;
-moz-animation:myfirst 5s; /* Firefox */
-webkit-animation:myfirst 5s; /* Safari and Chrome */
-o-animation:myfirst 5s; /* Opera */
}

@keyframes myfirst
{
from {top:0px;}
to {top:topval+px;}
}

@-moz-keyframes myfirst /* Firefox */
{
from {background:red;}
to {background:yellow;}
}

@-webkit-keyframes myfirst /* Safari and Chrome */
{
from {background:red;}
to {background:yellow;}
}

@-o-keyframes myfirst /* Opera */
{
from {background:red;}
to {background:yellow;}
}
</style>
