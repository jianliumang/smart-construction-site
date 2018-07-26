<template>
    <div class="inspiction">

        <el-row>
            <el-col :span="4">
                工程名称
            </el-col>
            <el-col :span="20">
                良渚街道杜甫农名高层公寓三期项目II标段
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
                {{this.setAllTime()}}
            </el-col>
        </el-row>
        <el-row>
             <el-table
                :data="tableData"
                border
                default-expand-all
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
                    <el-button @click="handleClick(scope.row)" type="text" size="small">正常</el-button>
                    <el-popover
                        placement="right"
                        width="375"
                        trigger="click">
                        <div>上传图片：</div>
                        <el-upload
                            action="http://60.191.29.210:9090/EquipmentInspection/mongoDBController/PictureUploading"
                            list-type="picture-card"
                            show-file-list
                            :limit="1"
                            :http-request="upload"
                            accept="image/*"
                            :on-preview="handlePictureCardPreview">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" @open="openfn">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                        <div>故障描述：</div>
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="textareavlaue"
                            @change="textareachagne">
                        </el-input>
                        <el-button @click="breakdownfn(scope.row)" type="text" size="small" slot="reference">故障</el-button>
                    </el-popover>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-button type="success" plain @click="allsubmit">提交</el-button>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            equipmentNumber: '',
            equipmentTypeNumber: '',
            regionid:'',
            dialogVisibleqr: false,
            dialogVisible2: false,
            tableData: [],
            dialogImageUrl: '',
            dialogVisible: false,
            textareavlaue: '',
            rowdata:null,
            phonename:'',
            imguuid:''
        }
    },
    created(){
        this.equipmentNumber = sessionStorage.getItem("equipmentNumber");
        this.equipmentTypeNumber = sessionStorage.getItem("equipmentTypeNumber");
        this.regionid = sessionStorage.getItem("regionid");
    },
    mounted(){
        this.responselist();
    },
    methods: {
        allsubmit(){
            //将异常信息从table里遍历成数组传给后台
            var arr = [];
            var successtype = true;
            this.tableData.forEach(element => {
                if(element.hasOwnProperty('imguuid')){
                    arr.push({
                        "abnormalPictureNumber": element.imguuid,
                        "equipmentNumber": this.equipmentNumber,
                        "equipmentTypeNumber": this.equipmentTypeNumber,
                        "information": element.information,
                        "inspectionDate": this.setAllTime(),
                        "inspectionStateNumber": element.acceptancechecknumber,
                        "regionid": this.regionid
                    })
                    successtype = false;
                }
            })
            console.log(successtype)
            if(successtype){
                this.$api.machinenormaluploadinfo({
                    params:{
                            equipmentNumber : this.equipmentNumber,
                            equipmentTypeNumber : '0',
                            inspectionDate : this.setAllTime(),
                            regionid : this.regionid,
                            equipmentTypeNumber : this.equipmentTypeNumber
                        }
                }).then(res => {
                    if(res.data.result == true){
                        // console.log("全部正常")
                        this.$router.push('/qrcode?equipmentNumber='+this.equipmentNumber+'&equipmentTypeNumber='+this.equipmentTypeNumber) 
                    }
                });
            }else{
                this.$api.machineabnormaluploadinfo(arr).then(res => {
                    console.log(res)
                    if(res.data.result == true){
                        setTimeout(() => {
                            this.$router.push('/qrcode?equipmentNumber='+this.equipmentNumber+'&equipmentTypeNumber='+this.equipmentTypeNumber);
                        },100)
                    }
                });
            }
        },
        upload(param){
            //自定义交互
            var fileobj = param.file;
            var postfix = fileobj.name.substring(fileobj.name.indexOf("."));
            var num = Math.floor(Math.random() * 100) + 1;
            var datastring1 = this.setPartTime().substring(0,4);
            var datastring2 = this.setPartTime().substring(5,7);
            var datastring3 = this.setPartTime().substring(8);
            this.phonename = datastring1+datastring2+datastring3+'-'+this.rowdata.acceptancechecknumber+'-'+num+postfix;
            var files = new File([fileobj], this.phonename, {type:"image/jpeg"});
            var formData = new FormData();
            formData.append("file", files);
            let config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            this.$api.pictureupload(formData,config).then(res => {
                this.imguuid = res.data.result;
                console.log(res.data.result)
                // console.log(this.tableData)
                //将图片的uuid加入表格tableDate
                this.tableData.forEach(element => {
                    if(element.acceptancechecknumber==this.rowdata.acceptancechecknumber){
                        element.imguuid = res.data.result;
                    }
                })
            });
        },
        textareachagne(){
            //将详细说明加入表格tableDate
            this.tableData.forEach(element => {
                if(element.acceptancechecknumber==this.rowdata.acceptancechecknumber){
                   element.information = this.textareavlaue;
                }
            })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        openfn(){
            setTimeout(()=>{
                var element = document.getElementsByClassName("v-modal")[0];
                element.style.zIndex = "1999";
            },10)
        },
        breakdownfn(row) {
            //对详细说明的输入框进行初始化
            // console.log(row);
            this.rowdata = row;
            this.tableData.forEach(element => {
                if(element.acceptancechecknumber==this.rowdata.acceptancechecknumber){
                   this.textareavlaue = element.information;
                }
            })
        },
        responselist(){
            //表格数据展示
            this.$api.withmachinetyperesquestabnormal({
                params:{
                            equipmentTypeNumber : this.equipmentTypeNumber,
                        }
            }).then(res => {
                this.tableData = res.data.result;
            });
        },
        handleClick(row) {
            console.log(row);
        }
    },
    
}
</script>

<style>
/* .type{
    width: 200px;
    height: 200px;
    background: greenyellow;
    border-radius: 50%;
    text-align: center;
    line-height: 200px;
    font-size: 50px;
    position: relative;
    margin: auto;
    cursor: pointer;
} */
.inspiction .el-col{
    border: 1px solid #ccc
}
.bad{
    background: #f00;
}
.inspiction .el-row:nth-child(1) .el-col,.inspiction .el-row:nth-child(2) .el-col{
    height: 50px;
    line-height: 50px;
}
.cell button{
    padding: 0px;
    width: 50px;
    height: 30px;
}
.cell .el-button--text:nth-child(1){
    color: green;
    border: 1px solid green;
}
.cell .el-button--text:nth-child(2){
    color: red;
    border: 1px solid red;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.el-form-item{
    text-align: left;
    width: 100%!important;
}
</style>
