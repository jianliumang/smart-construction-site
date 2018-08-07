<template>
    <div class="servicesrealname">
        该模块暂未上线
        <!-- <div class="div"></div> -->
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
}
}
</script>

<style>
.servicesrealname{
    padding-top: 50px;
    font-size: 32px;
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
