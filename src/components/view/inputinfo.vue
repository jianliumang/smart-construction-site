<template>
    <div class="inputinfo">
        <el-row>
            <el-select v-model="selectvalue" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.equipmentTypeNumber"
                :label="item.equipmentName"
                :value="item.equipmentTypeNumber">
                </el-option>
            </el-select>
        </el-row>
        <!-- <el-row>
            <el-col :span="24">
                设备信息标牌
            </el-col>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                border
                :show-header="false"
                style="width: 94%">
                <el-table-column
                prop="name"
                width="100">
                </el-table-column>
                <el-table-column
                prop="value">
                </el-table-column>
            </el-table>
        </el-row> -->
        <el-row>
            <el-button @click="doPrint" v-show="components[0].qrdata!=null" type="primary">打印全部</el-button>
        </el-row>
        <inputsub v-show="selectvalue==1" v-for="com in components" :key="'1'+com.id" :content="com.qrdata" @inputvalue="showmsg"></inputsub>
        <inputsub2 v-show="selectvalue==2" v-for="com in components" :key="'2'+com.id" :content="com.qrdata" @inputvalue="showmsg"></inputsub2>
        <div v-show="components[0].qrdata==null" class="el-icon-plus" @click="addcomponent"></div>
        <el-button v-show="components[0].qrdata==null" @click="submitfn" type="primary">提交</el-button>
        <el-button @click="exitfn" type="primary">返回</el-button>
    </div>
    
</template>

<script>
import inputsub from './inputsub.vue'
import inputsub2 from './inputsub2.vue'
export default {
    data(){
        return{
            equipmentTypeNumber: '',
            equipmenttype: [],
            tableData: [{
                name: '安装位置',
                value: '8# 楼'
                }, {
                name: '设备名称',
                value: '塔式起重机'
                }, {
                name: '设备编号',
                value: '皖AA-T93213'
                }, {
                name: '备案编号',
                value: '皖AA-T93213'
                }, {
                name: '工地编号',
                value: '330111001'
                }, {
                name: '许可证',
                value: 'TS2400614--2012'
                }, {
                name: '塔机司机',
                value: '2013.8.20'
                }, {
                name: '制造商',
                value: '中联重科'
                }, {
                name: '资格证照片编号',
                value: 'QTZ12X'
                }, {
                name: '出厂编号',
                value: '1012TC013050XX'
                }, {
                name: '验收日期',
                value: '2017.11.07'
                }, {
                name: '安装日期',
                value: '2017.11.08'
                }, {
                name: '设备产权单位',
                value: 'XX特种设备检测有限公司'
                }
            ],
            inputs:[],
            components:[{
                id:1,
                qrdata:null
            }],
            options: [],
            selectvalue: ''
        }
    },
    mounted(){
        this.requesttype()
    },
    methods:{
        exitfn(){
            //返回
            this.$router.go(-1);
        },
        addcomponent(){
            //添加多个输入框
            this.components.push({
                id:this.components[this.components.length-1].id+1,
                qrdata:null
                })
        },
        showmsg(msg){
            this.inputs.push(msg)
            // console.log(msg);
        },
        submitfn(){
            //发送数据生成二维码
            let numbers = 0;
            //判断数据是否已存在
            this.inputs.forEach(element => {
                // console.log(element)
                numbers+=1;
                this.$api.withnumberandtypeinfo({
                    params:{
                            equipmentNumber : element.equipmentNumber,
                            equipmentTypeNumber : this.selectvalue
                        }
                }).then(res => {
                    console.log(res)
                    if(res.data.result==null && res.data.code==200){
                        if(numbers==this.inputs.length){
                            numbers+=1;
                            //发送数据生成二维码
                            if(this.components.length==1){
                                //生成单个二维码
                                let url;
                                if(this.selectvalue==1){
                                    url = this.$api.seektowerforqrcodeurl;
                                }else if(this.selectvalue==2){
                                    url = this.$api.seekElevatorForQrcodeurl;
                                }
                                this.$http({
                                    method: "post",
                                    url:url,
                                    data:this.inputs[0]
                                }).then(res => {
                                    console.log(res)
                                    this.components[0].qrdata = res.data.result
                                    if(res.data.code == 200){
                                        this.open2();
                                    }
                                });
                            }else{
                                //生成批量二维码
                                let url;
                                if(this.selectvalue==1){
                                    url = this.$api.seektowerforallqrcodeurl;
                                }else if(this.selectvalue==2){
                                    url = this.$api.seekElevatorForAllQrcodeurl;
                                }
                                this.$http({
                                    method: "post",
                                    url:url,
                                    data:this.inputs
                                }).then(res => {
                                   console.log(res)
                                   for(var i=0;i<res.data.result.length;i++){
                                       this.components[i].qrdata = res.data.result[i]
                                   }
                                    if(res.data.result == true){
                                        this.open2();
                                    }
                                });
                            }
                        }
                    }else{
                        this.$message({
                            message: '数据已存在，不能重复添加',
                            type: 'error'
                        });
                        return false;
                    }
                });
            })
        },
        doPrint() {
            //全部打印
            var para = document.createElement("div");
            this.components.forEach(element => {
                para.appendChild(document.getElementById(element.qrdata.equipmentNumber).cloneNode(true));
            })
            var printHtml = para.innerHTML;
            var wind = window.open("",'newwindow', 'top=10, left=10, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
            wind.document.body.innerHTML = printHtml;
            wind.print();
            return false;
        },
        open2() {
            this.$message({
                message: '恭喜你，创建成功',
                type: 'success'
            });
        },
        requesttype(){
            //请求获得下拉列表中的设备类型
            this.$api.seekequipmenttype().then(res => {
                console.log(res)
                this.options = res.data.result;
                this.selectvalue = res.data.result[0].equipmentTypeNumber
            });
        }
    },
    components:{
        inputsub,
        inputsub2
    }
}
</script>

<style>
.inputinfo{
    width: 23.4rem;
}
.inputinfo .el-col-24{
    font-size: 24px;
    height: 40px;
}
.inputinfo .el-col-15 input{
    border-radius: 0px;
    border-left: 0px;
    border-top: 0px;
    height: 45.56px;
    outline: none;
}
.inputinfo .el-col-15 .el-select{
    width: 100%;
}
.inputinfo .firstinput{
    border-top: 1px solid #ccc;
}
.inputinfo .el-row:nth-child(2) .el-table{
    margin-left: 3%;
}
</style>
