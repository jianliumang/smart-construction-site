<template>
    <div class="login">
        <div class="title">余杭区BIM数字联审平台—后台管理系统</div>
        <div class="login-from">
            <p>欢迎登录</p>
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
body,html{
    padding: 0px;
    margin:0px;
    height: 100%;
}
.login{
    width: 100%;
    height: 100%;
    background:url('~@/assets/img/loginbg.png') no-repeat;
}
.title{
    float: left;
    font-family: MicrosoftYaHei;
	font-size: 42px;
    letter-spacing: 0px;
	color: #ffffff;
    padding: 30px 0px 0px 33px;
}
.login-from{
    width: 636px;
	height: 529px;
    padding-top: 82px;
	background-color: #ffffff;
	box-shadow: 0px 3px 18px 0px 
		rgba(0, 0, 0, 0.27);
	border-radius: 10px;
    position: absolute;
    top: 225px;
    right: 6%;
}
.login-from p{
    width: 144px;
	height: 35px;
	font-family: MicrosoftYaHei;
	font-size: 36px;
	letter-spacing: 0px;
	color: #191a1a;
    margin: 0 auto;
    margin-bottom: 87px;
}
i img{
    width: 30px;
    height: 30px;
}
.el-input__inner{
    margin-bottom: 32px;
    width: 468px;
    height: 61px;
    padding-left: 50px!important;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #ccc;
}
.el-input__icon{
    display: inline-block;
    position: relative;
    padding: 5px 8px 0px 0px;
    top: 13px;
    left: 80px;
    width: 30px;
    height: 31px;
    border-right: 1px solid #ccc;
    clear: both;
}
.el-checkbox{
    float: left;
    left: 84px;
    top: -15px;
}
.login-button{
    margin-top:50px;
    width: 468px;
    height: 80px;
    background-color: #1e8cc3;
	border-radius: 6px;
    outline: none;
    margin-right: 84px;
    font-family: MicrosoftYaHei;
	font-size: 30px;
    color: #ffffff;
}
</style>
