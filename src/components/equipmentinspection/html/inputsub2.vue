<template>
    <div class="inputsub2">
        <el-row>
            <el-col :span="24">
                设备信息标牌
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="9">
                <el-table
                    :data="tableData"
                    border
                    :highlight-current-row="false"
                    :show-header="false"
                    style="width: 100%">
                    <el-table-column
                    prop="name">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="15">
                <el-input @change="inputchange" class="firstinput" v-model="input.equipmentName" placeholder="请输入设备名称"></el-input>
                <el-input @change="inputchange" v-model="input.equipmentNumber" placeholder="请输入设备编号 "></el-input>
            </el-col>
            <div class="qrimage">
                 <a  v-if="content!=null" :id="content.equipmentNumber" href="#">
                    <img :src="content.qrimages" alt="...">
                    <p>{{content.equipmentNumber}}</p>
                </a>
                <el-button v-if="content!=null" @click="doPrint(content.equipmentNumber)" type="primary">打印</el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    props:['content'],
    data(){
        return {
            equipmentTypeNumber: '',
            equipmenttype: [],
            tableData: [{
                name: '设备名称',
                value: '塔式起重机'
                }, {
                name: '设备编号',
                value: '皖AA-T93213'
                }
            ],
            input:{
                "equipmentName": "",
                "equipmentNumber": ""
            },
            textvalue:''
        }
    },
    mounted(){
         
    },
    methods:{
        inputchange(){
            //将参数传给父组件
            var num = 0;
            Object.keys(this.input).forEach((key) => {
                if(this.input[key]!=""){
                    num+=1;
                }
            });
            if(num==Object.keys(this.input).length){
                this.$emit('inputvalue',this.input)
            }
        },
        doPrint(id) {
            var printHtml = document.getElementById(id).innerHTML;
            var wind = window.open("",'newwindow', 'top=10, left=10, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
            wind.document.body.innerHTML = printHtml;
            wind.print();
            return false;
        }
    }
}
</script>

<style>
/* .inputsub tr{
    margin-bottom: 10px
} */
.qrimage{
    position: absolute;
    left: 120%;
}
.qrimage a{
    text-decoration: none;
}
.qrimage img{
    width: 50px;
    height: 50px;
}
.qrimage p{
    padding: 0px;
    margin: 0px;
}
</style>
