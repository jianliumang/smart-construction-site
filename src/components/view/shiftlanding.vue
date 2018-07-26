<template>
    <div class="page page-front">
        <div>请登录</div>
      <div class="page-content">
        <div class="input-row">
          <label class="delay1">用户名:</label>
          <el-input class="username" id="username" v-model="usernameinput" placeholder="请输入用户名"></el-input>
        </div>
        <div class="input-row">
          <label class="delay2">密&nbsp;&nbsp;&nbsp;码:</label>
          <el-input type="password" class="password" id="password" v-model="userpasswinput" placeholder="请输入密码"></el-input>
        </div>
        <div class="input-row">
            <el-button @click="login" @keyup.enter="login" class="button" id="submit" type="primary" round>
                <span class="default">登录</span>
            </el-button>
            <el-button @click="register" class="button" id="submit" type="primary" round>
                <span class="default">注册</span>
            </el-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            usernameinput: '',
            userpasswinput: '',
            usermessage:[]
        }
    },
    created(){
        document.onkeydown=e=>{
            var key = window.event.keyCode;
            if(key==13){
                this.login();
            }
        }
    },
    mounted(){
    },
    methods: {
        login(){
            this.$http({
                method: "post",
                url:"http://60.191.29.210:9090/EquipmentInspection/SecurityInspector/selectUser",
                data:{
                    "username": this.usernameinput,
                    "userpassword": this.userpasswinput
                }
            })
            .then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.usermessage = res.data.result;
                    this.addinfo();
                    setTimeout(() => {
                        this.$router.push('/qrcode?equipmentNumber='+sessionStorage.getItem("equipmentNumber")+'&equipmentTypeNumber='+sessionStorage.getItem("equipmentTypeNumber"));
                    },1000)
                }
            })
        },
        addinfo(){
            sessionStorage.setItem("address",this.usermessage.address);
            sessionStorage.setItem("email",this.usermessage.email);
            sessionStorage.setItem("power_id",this.usermessage.power_id);
            sessionStorage.setItem("sex",this.usermessage.sex);
            sessionStorage.setItem("staffmembername",this.usermessage.username);
            localStorage.setItem("token",this.usermessage.token);
        },
        register(){
            //注册
            this.$router.push('/addScreeners')
        }
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
