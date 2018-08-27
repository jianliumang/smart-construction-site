<template>
    <div class="inspectionrecord">
        <el-button @click="normalfn" type="primary" plain>返回</el-button>
        <el-row>
            <el-col :span="4">
                工程名称
            </el-col>
            <el-col :span="20">
                {{regionname}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                设备编号
            </el-col>
            <el-col :span="8">
                {{equipmentNumber}}
            </el-col>
            <el-col :span="4">
                维保日期
            </el-col>
            <el-col :span="8">
                {{inspectionDate}}
            </el-col>
        </el-row>
        <el-row>
             <el-table
                ref="singleTable"
                :data="tableData"
                border
                highlight-current-row
                default-expand-all
                @current-change="handleCurrent"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="验收要求:">
                                <span>{{ props.row.acceptancecheckrequirement }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                prop="id"
                label="序号"
                width="50">
                </el-table-column>
                <el-table-column
                prop="acceptancecheckproject"
                label="验收项目">
                </el-table-column>
                <!-- <el-table-column
                prop="acceptancecheckrequirement"
                label="验收要求">
                </el-table-column> -->
                <el-table-column
                fixed="right"
                label="检查结果"
                width="140">
                <template slot-scope="scope">
                    <el-button :class="scope.row.acceptancechecknumber+'success'" @click="handleClick(scope.row)" type="success" size="small" plain>正常</el-button>
                    <el-popover
                        placement="right"
                        width="375"
                        trigger="click">
                        <div>上传图片：</div>
                        <div class="showimage">
                            <img @click="amplify" :src="imgurl" alt="">
                        </div>
                        <el-dialog :visible.sync="dialogVisible" @open="openfn">
                            <img width="100%" :src="imgurl" alt="">
                        </el-dialog>
                        <div>故障描述：</div>
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="textareavlaue">
                        </el-input>
                        <el-button :class="scope.row.acceptancechecknumber+'error'" @click="breakdownfn(scope.row)" type="danger" size="small" slot="reference" plain>故障</el-button>
                    </el-popover>
                    <el-button :class="scope.row.acceptancechecknumber+'warning'" @click="warningClick(scope.row)" type="warning" size="small" plain>已维修</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button @click="setCurrent(tableData[2])">选中第二行</el-button>
                <el-button @click="setCurrent()">取消选择</el-button>
            </div>
        </el-row>
        <el-row>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-count="arrs.length"
                @current-change="handleCurrentChange">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            equipmentNumber: '',
            equipmentTypeNumber: '',
            regionname:'',
            inspectionDate:'',
            tableData: [],
            dialogVisible: false,
            abnormaldata: [],
            imgurl:'',
            textareavlaue: '',
            arrs:[],
            arrsindex:0,
            currentRow: null
        }
    },
    created(){
        var str = location.hash;
        var p1 = str.indexOf("=")
        var p2 = str.indexOf("&")
        var p3 = str.indexOf("=",p1+1);
        this.equipmentNumber = sessionStorage.getItem("equipmentNumber") || str.substring(p1+1,p2);
        this.equipmentTypeNumber = sessionStorage.getItem("equipmentTypeNumber") || str.substring(p3+1,p3+2);
    },
    mounted(){
        this.responselist();
    },
    methods: {
        setCurrent(row) {
            console.log(this.$refs.singleTable)
            this.$refs.singleTable.setCurrentRow(row);
        },
        handleCurrent(val) {
            console.log(val)
            this.currentRow = val;
        },
        abnormalfn(){
            //请求总体异常信息
            console.log(1111)
            this.$api.seekMachineInspectionRecord({
                params:{
                        equipmentNumber : this.equipmentNumber
                    }
            }).then(res => {
                // console.log(res.data.result)
                if(res.data.result == null){
                    return false;
                }
                this.arrs = [];
                this.abnormaldata = res.data.result;
                //根据日期进行分页,
                var arrsub = [];
                for(var i=0;i<this.abnormaldata.length;i++){
                    if(i==this.abnormaldata.length-1){
                        arrsub.push(this.abnormaldata[i]);
                        this.arrs.push(arrsub);
                        arrsub = [];
                        break;
                    };
                    if(this.abnormaldata[i].inspectionDate.substring(0,10)==this.abnormaldata[i+1].inspectionDate.substring(0,10)){
                        arrsub.push(this.abnormaldata[i]);
                    }else{
                        arrsub.push(this.abnormaldata[i]);
                        this.arrs.push(arrsub);
                        arrsub = [];
                    };
                };
                this.dividegroup();
            });
        },
        dividegroup(){
            //正常、故障、已维修按钮的初始状态
            this.regionname = this.arrs[this.arrsindex][0].regionname;//工地名
            this.inspectionDate = this.arrs[this.arrsindex][0].inspectionDate.substring(0,10);//维保日期
            //正常、故障、已维修按钮是否显示
            this.tableData.forEach(table => {
                var warning = document.getElementsByClassName(table.acceptancechecknumber+"warning");
                var error = document.getElementsByClassName(table.acceptancechecknumber+"error");
                var success = document.getElementsByClassName(table.acceptancechecknumber+"success");
                this.elementnone(warning);
                this.elementnone(error);
                this.elementcolor(warning,"");
                this.elementcolor(success,"");
                this.arrs[this.arrsindex].forEach(element => {
                    if(element.inspectionStateNumber == table.acceptancechecknumber){
                        this.elementshow(warning);
                        if(element.maintenanceState==1){
                            this.elementshow(error);
                            this.elementnone(success); 
                            this.elementcolor(warning,"#f00");
                        }else if(element.maintenanceState==2){
                            this.elementshow(success);
                            this.elementnone(error); 
                            this.elementcolor(success,"#ccc");
                        }
                        table.errorid = element.id;
                    }   
                })
            })
        },
        warningClick(row){
            // console.log(row)
            this.$api.reviseMachineType("?id=" + row.errorid).then(res => {
                this.abnormalfn();
            });
        },
        elementshow(ele){
            //显示按钮
            ele[0].style.display="";
            ele[1].style.display="";
        },
        elementnone(ele){
            //隐藏按钮
            ele[0].style.display="none";
            ele[1].style.display="none";
        },
        elementcolor(ele,color){
            //改变颜色
            ele[0].parentNode.parentNode.parentNode.style.background=color;
            ele[1].parentNode.parentNode.parentNode.style.background=color;
        },
        handleCurrentChange(val) {
            //点击分页
            console.log(val)
            this.arrsindex = val-1
            this.dividegroup();
        },
        amplify() {
            //图片放大
            this.dialogVisible = true;
        },
        openfn(){
            setTimeout(()=>{
                var element = document.getElementsByClassName("v-modal")[0];
                element.style.zIndex = "1999";
            },10)
        },
        breakdownfn(row) {
            //异常展示
            // console.log(row);
            this.imgurl = '';
            this.textareavlaue = '';
            this.$api.withidseekdetailedinfo({
                params:{
                        id : row.id
                    }
            }).then(res => {
                this.imgurl = this.$api.imageurl + '?fileUUID='+res.data.result.abnormalPictureNumber;
                this.textareavlaue = res.data.result.information;
            });
        },
        responselist(){
            //表格数据展示
            this.$api.withmachinetyperesquestabnormal({
                params:{
                        equipmentTypeNumber : this.equipmentTypeNumber
                    }
            }).then(res => {
                this.tableData = res.data.result;
                this.abnormalfn()
            });
        },
        handleClick(row) {
            console.log(row);
        },
        normalfn(){
            this.$router.push('/equipmentinspection/qrcode?equipmentNumber='+this.equipmentNumber+'&equipmentTypeNumber='+this.equipmentTypeNumber);
        }
    },
    
}
</script>

<style>
.inspectionrecord .el-col{
    border: 1px solid #ccc
}
/* .inspectionrecord .el-dialog:nth-child(2){
    width: 500px;
    height: 700px;
} */
.inspectionrecord .el-row:nth-child(2) .el-col,.inspectionrecord .el-row:nth-child(3) .el-col{
    height: 50px;
    line-height: 50px;
}
.cell button{
    padding: 0px;
    width: 50px;
    height: 30px;
}
.showimage img{
    width: 148px;
    height: 148px;
    border: 1px solid #ccc;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.inspectionrecord .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.inspectionrecord .el-form-item{
    text-align: left;
    width: 100%!important;
}
</style>
