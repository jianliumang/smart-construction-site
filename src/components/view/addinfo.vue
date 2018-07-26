<template>
    <div class="addinfo">
        <el-row>
            <el-col :span="24">
                添加设备信息标牌
            </el-col>
        </el-row>
        <el-row v-if="this.equipmentTypeNumber==1">
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
                <el-input @keyup.native="checkfn('installationPosition',/^[\u4e00-\u9fa5]{0,10}$/,'请输入十个字以内的汉字')" class="firstinput" v-model="input.installationPosition" placeholder="请输入安装位置（楼层)"></el-input>
                <el-input @keyup.native="checkfn('towercraneName',/^[\u4e00-\u9fa5]{0,10}$/,'请输入十个字以内的汉字')" v-model="input.towercraneName" placeholder="请输入设备名称"></el-input>
                <el-input @keyup.native="checkfn('equipmentNumber',/^\d{0,15}$/,'请输入十五个字以内的数字')" v-model="input.equipmentNumber" placeholder="请输入设备编号 "></el-input>
                <el-input @keyup.native="checkfn('recordNumber',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" v-model="input.recordNumber" placeholder="请输入备案编号"></el-input>
                <el-input @keyup.native="checkfn('regionid',/^\d{0,15}$/,'请输入十五个字以内的数字')" v-model="input.regionid" placeholder="请输入工地编号"></el-input>
                <el-input @keyup.native="checkfn('licence',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" v-model="input.licence" placeholder="请输入许可证 "></el-input>
                <el-input @keyup.native="checkfn('towerDriver',/^[\u4e00-\u9fa5]{0,5}$/,'请输入五个字以内的汉字')" v-model="input.towerDriver" placeholder="请输入塔机司机"></el-input>
                <el-input @keyup.native="checkfn('manufacturer',/^[\u4e00-\u9fa5]{0,20}$/,'请输入二十个字以内的汉字')" v-model="input.manufacturer" placeholder="请输入制造商"></el-input>
                <el-input @keyup.native="checkfn('qualificationCertificateNumber',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" v-model="input.qualificationCertificateNumber" placeholder="请输入资格证照片编号"></el-input>
                <el-input @keyup.native="checkfn('factoryNumber',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" v-model="input.factoryNumber" placeholder="请输入出厂编号"></el-input>
                <el-input @blur="checkfn('acceptanceDate',/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,'日期格式:yyyy-mm-dd hh:mm:ss')" v-model="input.acceptanceDate" placeholder="请输入验收日期 "></el-input>
                <el-input @blur="checkfn('installDate',/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,'日期格式:yyyy-mm-dd hh:mm:ss')" v-model="input.installDate" placeholder="请输入安装日期"></el-input>
                <el-input @keyup.native="checkfn('propertyRightSunit',/^[\u4e00-\u9fa5]{0,20}$/,'请输入二十个字以内的汉字')" v-model="input.propertyRightSunit" placeholder="请输入设备产权单位"></el-input>
            </el-col>
        </el-row>
        <el-row v-if="this.equipmentTypeNumber==2">
            <el-col :span="9">
                <el-table
                    :data="tableData2"
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
                <el-input class="firstinput" v-model="input2.equipmentName" placeholder="请输入设备名称"></el-input>
                <el-input v-model="input2.equipmentNumber" placeholder="请输入设备编号 "></el-input>
            </el-col>
        </el-row>
        <el-button @click="exitfn" type="danger">取消</el-button>
        <el-button @click="successfn" type="success">修改</el-button>
    </div>
    
</template>

<script>

export default {
    data(){
        return{
            equipmentTypeNumber: '',
            equipmenttype: [],
            tableData: [{
                name: '安装位置'
                }, {
                name: '设备名称'
                }, {
                name: '设备编号'
                }, {
                name: '备案编号'
                }, {
                name: '工地编号'
                }, {
                name: '许可证'
                }, {
                name: '塔机司机'
                }, {
                name: '制造商'
                }, {
                name: '资格证照片编号'
                }, {
                name: '出厂编号'
                }, {
                name: '验收日期'
                }, {
                name: '安装日期'
                }, {
                name: '设备产权单位'
                }
            ],
            tableData2: [{
                name: '设备名称'
                }, {
                name: '设备编号'
                }
            ],
            input:{
                "acceptanceDate": "",
                "equipmentNumber": "",
                "factoryNumber": "",
                "installDate": "",
                "installationPosition": "",
                "licence": "",
                "manufacturer": "",
                "propertyRightSunit": "",
                "qualificationCertificateNumber": "",
                "recordNumber": "",
                "regionid": "",
                "towerDriver": "",
                "towercraneName": ""
            },
            input2:{
                "equipmentName": "",
                "equipmentNumber": ""
            },
            id:'',
        }
    },
    mounted(){
        // this.requesttype()
        this.requestoldinfo();
    },
    methods:{
        requestoldinfo(){
            //根据url传过来的设备id展示详细信息并修改
            var str = location.hash;
            var p1 = str.indexOf("=")
            var p2 = str.indexOf("&")
            var p3 = str.indexOf("=",p1+1);
            var id = str.substring(p1+1,p2);
            this.equipmentTypeNumber = str.substring(p3+1);
            console.log(str)
            if(str.indexOf('?')==-1){
                return false;
            }else{
                this.id = id;
                this.$api.withTowerIdSeekInfo({
                    params:{
                        id : this.id,
                        equipmentTypeNumber : this.equipmentTypeNumber
                    }
                }).then(res => {
                    if(this.equipmentTypeNumber==1){
                        this.input = res.data.result;
                    }else if(this.equipmentTypeNumber==2){
                        this.input2 = res.data.result;
                    }
                    
                });
            };
        },
        exitfn(){
            //取消按钮跳转
            this.$router.go(-1);
        },
        successfn(){
            //修改信息
            var data;
            if(this.equipmentTypeNumber==1){
                data = this.input;
            }else if(this.equipmentTypeNumber==2){
                data = this.input2;
            }
             this.$api.reviseMachineInfo(this.equipmentTypeNumber,"?id="+this.id,data).then(res => {
                console.log(res.data.result)
                if(res.data.result == true){
                    this.open2();
                    setTimeout(() => {
                        this.$router.push('/equipmentinspection/management');
                    },1000)
                }
            });
        },
        open2() {
            this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
            });
        },
        checkfn(name,rule,info){
            //校验
            if(!rule.test(this.input[name])){
                this.input[name]="";
                this.$message({
                        message: info,
                        type: 'error'
                    });
            }
        }
        // requesttype(){
        //     //请求获得下拉列表中的设备类型
        //     this.$api.seekequipmenttype().then(res => {
        //         console.log(res.data.result)
        //         this.equipmenttype = res.data.result;
        //         this.requestoldinfo();
        //     });
        // }
    },
    watch:{
        // input: {
        //     handler(newValue, oldValue){
        //         // console.log(newValue,oldValue)
        //         var name = "towerDriver"
        //         console.log(this.input[name])
        //         if(!/^[\u4e00-\u9fa5]{0,5}$/.test(newValue.towerDriver)){
        //             console.log(11111111)
        //             this.input.towerDriver = '';
        //             console.log(this.input.towerDriver)
        //             this.$message({
        //                 message: '请输入五个字以内的汉字',
        //                 type: 'error'
        //             });
        //             // alert('请输入五个字以内的汉字')
        //         }
        //     },
        //     deep: true
        // }
    }
}
</script>

<style>
.addinfo{
    width: 23.4rem;
}
.addinfo .el-col-24{
    font-size: 24px;
    height: 40px;
}
.addinfo .el-col-15 input{
    border-radius: 0px;
    border-left: 0px;
    border-top: 0px;
    height: 45.56px;
    outline: none;
}
.addinfo .el-col-15 .el-select{
    width: 100%;
}
.addinfo .firstinput{
    border-top: 1px solid #ccc;
}
.addinfo .el-row:nth-child(2) .el-table{
    margin-left: 3%;
}
.addinfo td{
    padding: 0px!important;
}.addinfo td .cell{
    line-height: 45px!important;
}
</style>
