<template>
    <div class="login">
        <div class="login-top">
            <div>
                <span></span>
                <p>MAX-BIM项目画板录入系统</p>
            </div>
        </div>
        <div class="login-center">

        </div>
        <div class="login-from">
            <div class="demo-input-suffix">
                <el-input
                    placeholder="请输入登录账号"
                    v-model="inputname">
                    <i slot="prefix" class="el-input__icon">
                        <img src="@/assets/img/loginname.png" alt="">
                    </i>
                </el-input>
                <el-input
                    placeholder="请输入密码"
                    v-model="inputpass">
                    <i slot="prefix" class="el-input__icon">
                        <img src="@/assets/img/loginpass.png" alt="">
                    </i>
                </el-input>
                <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
            <button class="login-button" type="primary">登录</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            inputname : '',
            inputpass : '',
            checked : ''
        }
    }
}
</script>

<style>
html,body{
    margin: 0px;
    padding: 0px;
}
.login{
    width: 100%;
    height: 100%;
    background: #41cac0;
}
.login-top{
    width: 100%;
    height: 34%;
    background: url('~@/assets/img/loginbg_top.png') no-repeat;
    background-size: 100% 100%;
}
.login-top div{
    float: left;
    margin-left: 214px;
    margin-top: 242px;
}
.login-top span{
	display: inline-block;
    width: 63px;
    height: 63px;
    background: url('~@/assets/img/login_03.png') no-repeat;
    background-size: 100% 101%;
}
.login-top p{
    display: inline-block;
	font-family: MicrosoftYaHei;
	font-size: 45px;
	letter-spacing: 0px;
	color: #ffffff;
    margin: 0px 0px 0px 31px;
    padding-top: 5px;
    vertical-align: top;
}
.login-center{
    width: 100%;
    height: 34%;
    background-image: url('~@/assets/img/loginbg_center.png');
    background-size: 100% 101%;
    background-color: #fff;
    background-repeat: no-repeat;
    

}
.login-from{
    width: 464px;
	height: 440px;
    padding: 35px 42px 0px 42px;
	background-color: #ffffff;
	box-shadow: 0px 3px 18px 0px 
		rgba(0, 0, 0, 0.27);
	border-radius: 10px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 6%;
}
i img{
    width: 30px;
    height: 30px;
}
.el-input__inner{
    margin: 25px 0px;
    width: 468px;
    height: 61px;
    font-size: 22px;
    color: #666666;
    padding-left: 60px!important;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #ccc;
}
.el-input__icon{
    display: inline-block;
    position: relative;
    padding: 5px 8px 0px 0px;
    top: 38px;
    left: 5px;
    width: 30px;
    height: 31px;
    border-right: 1px solid #ccc;
    clear: both;
}
.el-checkbox{
    float: left;
}
.el-checkbox span:nth-child(1){
    display: inline-block;
    width: 20px;
    height: 20px;
}
.el-checkbox span:nth-child(2){
    font-size: 16px;
    color: #666666;
}
.login-button{
    margin-top:50px;
    width: 462px;
    height: 56px;
    background-color: #41cac0;
	border-radius: 6px;
    outline: none;
    margin-right: 84px;
    font-family: MicrosoftYaHei;
	font-size: 30px;
    color: #ffffff;
}
</style>
