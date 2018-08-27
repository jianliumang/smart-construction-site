<template>
    <div class="page page-front">
      <div class="page-content">
        <div class="input-row">
          <label class="delay1">用户名:</label>
          <el-input class="username" autofocus="true" id="username" v-model="usernameinput" placeholder="请输入用户名"></el-input>
        </div>
        <div class="input-row">
          <label class="delay2">密&nbsp;&nbsp;&nbsp;码:</label>
          <el-input type="password" class="password" id="password" v-model="userpasswinput" placeholder="请输入密码"></el-input>
        </div>
        <div class="input-row">
            <el-button @click="login" @keyup.enter="login" class="button" id="submit" type="primary" round>
                <span class="default">登录</span>
            </el-button>
        </div>
      </div>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
    data() {
        return {
            usernameinput: '',
            userpasswinput: '',
            usermessage:[],
            loadinginstace:null
        }
    },
    created(){
        document.onkeydown=e=>{
            var key = e.keyCode || window.event.keyCode;
            if(key==13){
                this.login();
            }
        }
    },
    mounted(){
    },
    methods: {
        login(){
            if(this.usernameinput==''||this.userpasswinput==''){
                return false
            }
            this.loadinginstace = Loading.service({ fullscreen: true });
            // console.log(11111)
            this.$api.userInfo({
                    "username": this.usernameinput,
                    "userpassword": this.userpasswinput
            }).then(res => {
                // console.log(res.data)
                if(res.data.code==200){
                    this.usermessage = res.data.result;
                    this.addinfo();
                    // this.powerrequest();
                    // setTimeout(() => {
                    //     this.$router.push('/index');
                    // },1000)
                }
            })
        },
        addinfo(){
            sessionStorage.setItem("address",this.usermessage.address);
            sessionStorage.setItem("email",this.usermessage.email);
            sessionStorage.setItem("power_id",this.usermessage.power_id);
            sessionStorage.setItem("sex",this.usermessage.sex);
            sessionStorage.setItem("userid",this.usermessage.userid);
            sessionStorage.setItem("username",this.usermessage.username);
            localStorage.setItem("token",this.usermessage.token);
            this.powerrequest();
        },
        powerrequest(){
            //根据管理权限获取工地
            this.$api.withPermissionsSeek({
                params:{
                    powerid : this.usermessage.power_id
                }
            }).then(res => {
                if(res.data.code==200){
                    sessionStorage.setItem("regionid",res.data.result[0].regionid);
                    this.loadinginstace.close()
                    this.$router.push('/index');
                }
                // this.addinfo();
            })
        },
    }
}
</script>

<style>
.input-row{
    margin-top: 30px;
}
.input-row label{
    display: inline-block;
    width: 70px;
}
.button{
    width: 200px;
}
.page-front .el-input{
    width: 200px;
}
.page-front .el-input .el-input__inner{
    width: 168px!important;
}
</style>
