<template>
    <div class="management">
        <el-row>
            <el-col :span="20">
                <el-select @change="requestequipment" v-model="selectvalue" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.equipmentTypeNumber"
                    :label="item.equipmentName"
                    :value="item.equipmentTypeNumber">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-button @click="addequipment" type="primary" size="small" icon="el-icon-circle-plus-outline">添加</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                :data="tableData4"
                style="width: 100%">
                <!-- <el-table-column
                prop="installationPosition"
                label="安装位置">
                </el-table-column>
                <el-table-column
                prop="towercraneName"
                label="设备名称">
                </el-table-column> -->
                <el-table-column
                prop="name"
                label="设备类型">
                </el-table-column>
                <el-table-column
                prop="equipmentNumber"
                label="设备编号">
                </el-table-column>
                <!-- <el-table-column
                prop="recordNumber"
                label="备案编号">
                </el-table-column>
                <el-table-column
                prop="licence"
                label="许可证">
                </el-table-column>
                <el-table-column
                prop="towerDriver"
                label="塔机司机">
                </el-table-column>
                <el-table-column
                prop="manufacturer"
                label="制造商">
                </el-table-column>
                <el-table-column
                prop="qualificationCertificateNumber"
                label="资格证照片编号">
                </el-table-column>
                <el-table-column
                prop="factoryNumber"
                label="出厂编号">
                </el-table-column>
                <el-table-column
                prop="acceptanceDate"
                label="验收日期">
                </el-table-column>
                <el-table-column
                prop="installDate"
                label="安装日期">
                </el-table-column>
                <el-table-column
                prop="propertyRightSunit"
                label="设备产权单位">
                </el-table-column> -->
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">
                    <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData4)"
                    type="danger"
                    size="small">
                    删除
                    </el-button>
                    <el-button @click="editfn(scope.row)" type="primary" size="small">编辑</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [],
            selectvalue: '',
            tableData4: []
        }
    },
    mounted(){
        this.requesttype()
        // console.log(this.tableData4)
    },
    methods:{
        editfn(row){
            //编辑跳转
            console.log(row)
            this.$router.push('/addinfo?id='+row.id+'&equipmentTypeNumber='+this.selectvalue);
        },
        requestequipment(){
            //根据设备类型编号查询设备
            this.options.forEach(ele => {
                if(ele.equipmentTypeNumber==this.selectvalue){
                    this.typename = ele.equipmentName;
                }
            })
            this.$api.withTypeNumberSeekMachine({
                params:{
                        equipmentTypeNumber : this.selectvalue
                    }
            }).then(res => {
                console.log(res);
                this.tableData4 = res.data.result;
                this.tableData4.forEach(ele => {
                    ele.name = this.typename
                })
                // console.log(this.tableData4)
            });
        },
        deleteRow(index, rows) {
            // console.log(index,rows)
            // rows.splice(index, 1);
            //根据设备类型编号和设备编号删除设备
            this.$api.withMachineTypeNumberDelete({
                params:{
                        equipmentTypeNumber : rows[index].equipmentTypeNumber,
                        equimentNumber : rows[index].equipmentNumber
                    }
            }).then(res => {

                this.requestequipment();
            });
        },
        addequipment(){
            //添加跳转
            this.$router.push('/inputinfo');
        },
        requesttype(){
            //请求获得下拉列表中的设备类型
            this.$api.seekequipmenttype().then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.options = res.data.result;
                    this.selectvalue = res.data.result[0].equipmentTypeNumber;//默认下拉列表为第一个
                    this.typename = res.data.result[0].equipmentName
                    this.requestequipment();
                }
            });
        },

    }
}
</script>

<style>

</style>
