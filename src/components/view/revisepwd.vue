<template>
    <div class="revisepwd">
        <div class="demo-input-suffix">
            <div class="input-text">
                <span class="usertit">用户名：</span> 
                <el-input
                    placeholder="请输入用户名"
                    v-model="userName"
                    autofocus="true">
                    <i slot="prefix" class="">
                        <img src="@/assets/img/username.png" alt="">
                    </i>
                </el-input>
            </div>
            <div class="prompt"></div>
            <div class="input-text">
                <span class="usertit">密码：</span> 
                <el-input
                    placeholder="请输入密码"
                    v-model="userOldPwd"
                    type="password"
                    autofocus="true">
                    <i slot="prefix" class="">
                        <img src="@/assets/img/userpwd.png" alt="">
                    </i>
                </el-input>
            </div>
            <div class="prompt"></div>
            <div class="input-text">
                <span class="usertit"></span> 
                <el-input
                    placeholder="请输入新密码"
                    v-model="userNewPwd"
                    type="password"
                    autofocus="true">
                    <i slot="prefix" class="">
                        <img src="@/assets/img/userpwd.png" alt="">
                    </i>
                </el-input>
            </div>
            <div class="prompt"></div>
            <div class="input-text">
                <span class="usertit"></span> 
                <el-input
                    placeholder="请重新输入新密码"
                    v-model="repeatPwd"
                    type="password"
                    autofocus="true">
                    <i slot="prefix" class="">
                        <img src="@/assets/img/userpwd.png" alt="">
                    </i>
                </el-input>
            </div>
            <div class="prompt"><span v-show="!this.userNewPwd==this.repeatPwd">两次输入密码不一样</span></div>
        </div>
        <el-button type="primary" @click="revisepassword">确认修改</el-button>
        <el-button type="primary" @click="exit">退出</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            userName:'',
            userOldPwd:'',
            userNewPwd:'',
            repeatPwd:''
        }
    },
    mounted(){

    },
    methods:{
        revisepassword(){
            if(this.userNewPwd==this.repeatPwd){
                this.$api.revisepwd({
                    'userpassword':this.userNewPwd,
                    'userid':sessionStorage.getItem('userid')
                }).then(res=>{
                    console.log(res)
                    if(res.data.code==200){
                        this.$message({
                            message: '恭喜你，修改成功',
                            type: 'success'
                        });
                    }
                })
            }
        },
        exit(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>
.revisepwd .el-input{
    width: 300px;
}
.revisepwd .el-input input{
    padding-left: 45px;
}
/* .input-text{
    padding-top: 20px;
} */
.prompt{
    height: 20px;
    color: #f00;
}
.revisepwd .usertit{
    display: inline-block;
    width: 100px;
    text-align: right;
}
.revisepwd .el-input i{
    display: inline-block;
    padding: 0px 8px 0px 6px;
    width: 20px;
    height: 20px;
    line-height: 100%;
    /* background: url('~@/assets/img/username.png'); */
}
.revisepwd .el-input img{
    width: 100%;
    height: 100%;
}
.revisepwd .el-input__prefix{
    border-right: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
}
</style>
