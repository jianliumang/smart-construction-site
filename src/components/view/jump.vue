<template>
<div class="jump">
    <el-row>
        <select @change="typechange" v-model="typedata" name="type" id="">
            <option v-for="types in alltype" :key="types.equipmentTypeNumber" :value="types.equipmentTypeNumber">{{types.equipmentName}}</option>
        </select>
    </el-row>
    <el-row v-for="qrcode in qrcodedata" :key="qrcode.equipmentNumber">
        <el-col :span="12">
            <div><span>编号：</span><span>{{qrcode.equipmentNumber}}</span></div>
            <div><span>名字：</span><span>{{qrcode.equipmentName}}</span></div>
        </el-col>
        <el-col :span="12">
            <div :id="qrcode.equipmentTypeNumber+'-'+qrcode.equipmentNumber">
                <img :src="qrcode.qrimages" alt="二维码">
                <div>
                    {{qrcode.equipmentName+qrcode.equipmentNumber}}
                </div>
            </div>
            <el-button @click="doPrint(qrcode.equipmentTypeNumber,qrcode.equipmentNumber)" type="primary">打印</el-button>
        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data(){
        return{
            qrcodedata:[],
            alltype:[],
            typedata:Number,
        }
    },
    mounted(){
        this.seektype();
        
    },
    methods:{
        typechange(){
            this.requestdata();
        },
        seektype(){
            this.$api.seekequipmenttype().then(res => {
                console.log(res)
                this.alltype = res.data.result;
                this.typedata = res.data.result[0].equipmentTypeNumber;
                this.requestdata();
            })
        },
        requestdata(){
            //查找所有的设备所生成的二维码
            this.$api.seekequipmentqrcode({
                params:{
                        EquipmentTypeNumber : this.typedata
                    }
            }).then(res => {
                console.log(res.data.result)
                this.qrcodedata = res.data.result;
                
            });
        },
        doPrint(equipmentTypeNumber,equipmentNumber) {
            let subOutputRankPrint = document.getElementById(equipmentTypeNumber+'-'+equipmentNumber);
            let newContent = subOutputRankPrint.innerHTML;
            let oldContent = document.body.innerHTML;
            document.body.innerHTML = newContent;
            var hkey_root, hkey_path, hkey_key;
            hkey_root = "HKEY_CURRENT_USER";
            hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
            try {
                    var RegWsh = new ActiveXObject("WScript.Shell");
                    hkey_key = "header";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
                    hkey_key = "footer";
                    RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
                } catch (e) {
                }
            window.print();
            window.location.reload();
            document.body.innerHTML = oldContent;
            return false;
        }

    }
}
</script>

<style>
.jump .el-col:nth-child(1){
    font-size: 40px;
}
.jump .el-col:nth-child(2) img{
    width: 300px;
    height: 300px;
}
</style>
