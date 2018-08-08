<template>
    <div class="servicesrealname">
        该模块暂未上线
        <!-- <a href="#" download="CmFngltpZK6AebJBAAP-F1NpwkA791.jpg">xiazai</a>
        <div>
        <canvas  id="cavasimg" width="607" height="367"  ></canvas>
        <input type="button" id="btnsavaImg" value="保存图片到本地" @click="Download()"/>



        <iframe id="saveImg" src="#" style="display:none;"></iframe>

<a href="#" @click="saveImg.document.execCommand('saveAs');">下载</a>


<button type="button" class="btn btn-primary" @click="download('#')" >下载</button>
    </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
           topval:100 
        }
        
    },
    methods:{
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
            Download(){
                    window.open("#")
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
        mounted () {
            // $loading.hide()

            //canvas 绘制图片    支持手机端
//            var canvas = document.getElementById('cavasimg');
//            var ctx = canvas.getContext('2d');
//            ctx.fillRect(0, 0, canvas.width, canvas.height);
//            ctx.fillStyle = "red";
//            ctx.font = 'italic bold 30px Helvetica ';
//            ctx.fillText('楷体', 50, 50); 
            // canvas 插入图片   手机端点击没反应
            //获取canvas元素
            var cvs = document.getElementById("cavasimg");
            //创建image对象
            var imgObj = new Image();
            imgObj.src = "#";
            imgObj.setAttribute("crossOrigin",'Anonymous')
            //待图片加载完后，将其显示在canvas上
            imgObj.onload = function(){
                var ctx = cvs.getContext('2d');
                ctx.drawImage(this, 0, 0);//this即是imgObj,保持图片的原始大小：470*480
                //ctx.drawImage(this, 0, 0,1024,768);//改变图片的大小到1024*768
            } 
 
        }

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
