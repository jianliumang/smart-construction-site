<template>
    <!-- <div>
        <input @change="inputchange" v-model="textvalue" type="text" name="" id="">
        <div>{{content}}</div>
    </div> -->
    <div class="inputsub">
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
                <el-input @keyup.native="checkfn('installationPosition',/^[\u4e00-\u9fa5]{0,10}$/,'请输入十个字以内的汉字')" @change="inputchange" class="firstinput" v-model="input.installationPosition" placeholder="请输入安装位置（楼层)"></el-input>
                <el-input @keyup.native="checkfn('towercraneName',/^[\u4e00-\u9fa5]{0,10}$/,'请输入十个字以内的汉字')" @change="inputchange" v-model="input.towercraneName" placeholder="请输入设备名称"></el-input>
                <el-input @keyup.native="checkfn('equipmentNumber',/^\d{0,15}$/,'请输入十五个字以内的数字')" @change="inputchange" v-model="input.equipmentNumber" placeholder="请输入设备编号 "></el-input>
                <el-input @keyup.native="checkfn('recordNumber',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" @change="inputchange" v-model="input.recordNumber" placeholder="请输入备案编号"></el-input>
                <el-input @keyup.native="checkfn('regionid',/^\d{0,15}$/,'请输入十五个字以内的数字')" @change="inputchange" v-model="input.regionid" placeholder="请输入工地编号"></el-input>
                <el-input @keyup.native="checkfn('licence',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" @change="inputchange" v-model="input.licence" placeholder="请输入许可证 "></el-input>
                <el-input @keyup.native="checkfn('towerDriver',/^[\u4e00-\u9fa5]{0,5}$/,'请输入五个字以内的汉字')" @change="inputchange" v-model="input.towerDriver" placeholder="请输入塔机司机"></el-input>
                <el-input @keyup.native="checkfn('manufacturer',/^[\u4e00-\u9fa5]{0,20}$/,'请输入二十个字以内的汉字')" @change="inputchange" v-model="input.manufacturer" placeholder="请输入制造商"></el-input>
                <el-input @keyup.native="checkfn('qualificationCertificateNumber',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" @change="inputchange" v-model="input.qualificationCertificateNumber" placeholder="请输入资格证照片编号"></el-input>
                <el-input @keyup.native="checkfn('factoryNumber',/^.{3,20}$/,'请输入长度为三到二十个字以内的字符')" @change="inputchange" v-model="input.factoryNumber" placeholder="请输入出厂编号"></el-input>
                <el-input @blur="checkfn('acceptanceDate',/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,'日期格式:yyyy-mm-dd hh:mm:ss')" @change="inputchange" v-model="input.acceptanceDate" placeholder="请输入验收日期 "></el-input>
                <el-input @blur="checkfn('installDate',/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/,'日期格式:yyyy-mm-dd hh:mm:ss')" @change="inputchange" v-model="input.installDate" placeholder="请输入安装日期"></el-input>
                <el-input @keyup.native="checkfn('propertyRightSunit',/^[\u4e00-\u9fa5]{0,20}$/,'请输入二十个字以内的汉字')" @change="inputchange" v-model="input.propertyRightSunit" placeholder="请输入设备产权单位"></el-input>
            </el-col>
            <div class="qrimage">
                 <a v-if="content!=null" :id="content.equipmentNumber" href="#">
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
            textvalue:''
        }
    },
    mounted(){
        // this.requesttype();  
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
            // this.$emit('inputvalue',this.input)
        },
        doPrint(id) {
            var printHtml = document.getElementById(id).innerHTML;
            var wind = window.open("",'newwindow', 'top=10, left=10, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no');
            wind.document.body.innerHTML = printHtml;
            wind.print();
            return false;
            // let subOutputRankPrint = document.getElementById(id);
            // let newContent = subOutputRankPrint.innerHTML;
            // let oldContent = document.body.innerHTML;
            // document.body.innerHTML = newContent;
            // var hkey_root, hkey_path, hkey_key;
            // hkey_root = "HKEY_CURRENT_USER";
            // hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
            // try {
            //         var RegWsh = new ActiveXObject("WScript.Shell");
            //         hkey_key = "header";
            //         RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
            //         hkey_key = "footer";
            //         RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
            //     } catch (e) {
            //     }
            // window.print();
            // window.location.reload();
            // document.body.innerHTML = oldContent;
            // return false;
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
.inputsub td{
    padding: 0px!important;
}
.inputsub td .cell{
    line-height: 45px!important;
}
</style>
