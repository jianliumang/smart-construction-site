<template>
    <div class="seitinfo">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="建筑面积">
                <el-row>
                    <el-col :span="12"><el-input v-model="form.area"></el-input></el-col><span class="unit-span">㎡</span>
                </el-row>
            </el-form-item>
            <el-form-item label="施工时间">
                <div class="block">
                    <el-date-picker
                        v-model="valuetime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        value-format="yyyy-MM-dd"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
            </el-form-item>
            <el-form-item label="建筑类型">
                <el-select v-model="form.region" placeholder="请选择建筑类型">
                    <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.number">
                                
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">设置</el-button>
                <el-button @click="cancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            regionid:Number,
            form: {
                area: '',
                region: ''
            },
            valuetime: [],
            options: [],
            constructiondata: null,
            openvalue:'',
        }
    },
    created(){
        this.regionid = sessionStorage.getItem("regionid");
    },
    mounted(){
        this.toselectArchitecture();//根据工地查询是否有设置工地数据
        this.engineeringcategoryrequest();//设置功能中的工程类别分组下拉列表
    },
    methods:{
        cancel() {
            this.$router.go(-1);
        },
        toselectArchitecture(){
            //根据工地查询是否有设置工地数据*
            // console.log(55555555555)
            this.$api.seekArchitectureData({
                params:{
                    regionid : this.regionid
                }
            }).then(res => {
                // console.log(res)
                if(res.data.code==200){
                    this.constructiondata = res.data.result;
                    this.form.area = this.constructiondata.coveredArea;
                    this.form.region = this.constructiondata.engineeringCategoryNumber;
                    this.valuetime = [this.constructiondata.contractStarttime,this.constructiondata.contractEndtime]
                }
            })
        },
        onSubmit(){
            //设置工地数据*
            if(this.valuetime==[] || this.form.area == '' || this.form.region == ''){
                alert("请填写完整")
                return false;
            }
            this.$api.insertArchitectureData({
                "contractEndtime": this.valuetime[1],
                "contractStarttime": this.valuetime[0],
                "coveredArea": this.form.area,
                "engineeringCategoryNumber":  this.form.region,
                "regionid": this.regionid
            }).then(res => {
                if(res.data.result){
                    this.toselectArchitecture();
                    this.openvalue = '设置成功';
                    this.open();
                }
            })
        },
        open() {
            //消息提示
            const h = this.$createElement;
            this.$notify({
            title: '标题名称',
            message: h('i', { style: 'color: teal'}, this.openvalue)
        });
        },
        engineeringcategoryrequest(){
            //设置功能中的工程类别分组下拉列表
            this.options = [];
            this.$api.seekEngineeringCategory().then(res => {
                // console.log(res)
                if(res.data.code==200){
                    // console.log(res.data.result)
                    res.data.result.forEach(element => {
                        this.options.push({
                            value: element.engineeringCategoryId,
                            label: element.engineeringCategoryname,
                            number: element.engineeringCategoryNumber
                        })
                    });
                }
            })
        },
    },
}
</script>

<style>
/* .seitinfo{
    display: flex;
    justify-content: center;
    align-items: center;
} */
.seitinfo .el-form{
    width: 500px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: 100px auto;
    /* border: 2px solid #999; */
}
.seitinfo .unit-span{
    float: left;
    margin-left: 10px
}
.seitinfo .block,.seitinfo .el-select{
    float: left;
}
.seitinfo .el-form-item:nth-child(4) div{
    margin: 0px!important;
}
</style>
