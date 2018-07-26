<template>
    <div class="addScreeners">
        <div class="respondata">
            <span>用户编号：</span><el-input v-model="input.userNumber" placeholder="请输入内容"></el-input>
        </div>
        <div class="respondata">
            <span>用户名：</span><el-input v-model="input.userName" placeholder="请输入内容"></el-input>
        </div>
        <div class="respondata">
            <span>密码：</span><el-input v-model="input.userPassword" placeholder="请输入内容"></el-input>
        </div>
        <div class="respondata">
            <span>联系方式：</span><el-input v-model="input.phone" placeholder="请输入内容"></el-input>
        </div>
        <!-- <div class="respondata">
            <span>权限等级：</span><el-input v-model="input.power_id" placeholder="请输入内容"></el-input>
        </div> -->
        <div>
            <el-select @change="province" v-model="countrysvalue" placeholder="请选择">
                <el-option
                v-for="item in countrys"
                :key="item.regionid"
                :label="item.regionname"
                :value="item.regionid">
                </el-option>
            </el-select>
            <el-select @change="city" v-model="provincesvalue" placeholder="请选择">
                <el-option
                v-for="item in provinces"
                :key="item.regionid"
                :label="item.regionname"
                :value="item.regionid">
                </el-option>
            </el-select>
            <el-select @change="area" v-model="cityvalue" placeholder="请选择">
                <el-option
                v-for="item in citys"
                :key="item.regionid"
                :label="item.regionname"
                :value="item.regionid">
                </el-option>
            </el-select>
            <el-select @change="cmc" v-model="areavalue" placeholder="请选择">
                <el-option
                v-for="item in areas"
                :key="item.regionid"
                :label="item.regionname"
                :value="item.regionid">
                </el-option>
            </el-select>
            <el-select @change="construction" v-model="cmcvalue" placeholder="请选择">
                <el-option
                v-for="item in cmcs"
                :key="item.regionid"
                :label="item.regionname"
                :value="item.regionid">
                </el-option>
            </el-select>
            <el-select v-model="input.power_id" placeholder="请选择">
                <el-option
                v-for="item in constructions"
                :key="item.regionid"
                :label="item.regionname"
                :value="item.regionid">
                </el-option>
            </el-select>
        </div>
        <el-button @click="add" type="primary">主要按钮</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            input:{
                userNumber:'',
                userName:'',
                userPassword:'',
                phone:'',
                power_id:'',
            },
            countrys: [],
            provinces: [],
            citys: [],
            areas: [],
            cmcs: [],
            constructions: [],
            countrysvalue: '',
            provincesvalue: '',
            cityvalue: '',
            areavalue: '',
            cmcvalue: '',
            // constructionvalue: '',
        }
    },
    mounted(){
        this.country()
    },
    methods:{
        add(){
            console.log(this.input.power_id)
            this.$api.addScreeners('?userNumber='+Number(this.input.userNumber)+
            '&userName='+this.input.userName+
            '&userPassword='+this.input.userPassword+
            '&phone='+Number(this.input.phone)+
            '&power_id='+Number(this.input.power_id)).then(res=>{
                console.log(res)
            })
        },
        country(){
            this.$api.seekAllCountry().then(res => {
                // console.log(res);
                this.countrys=res.data.result;
            })
        },
        province(){
            // console.log(this.countrys)
            this.$api.withCountrySeekProvince({
                params:{
                    regionid:this.countrysvalue
                }
            }).then(res => {
                // console.log(res)
                this.provinces=res.data.result;
            })
        },
        city(){
            this.$api.withProvinceSeekCity({
                params:{
                    regionid:this.provincesvalue
                }
            }).then(res => {
                // console.log(res)
                this.citys=res.data.result;
            })
        },
        area(){
            this.$api.withCitySeekArea({
                params:{
                    regionid:this.cityvalue
                }
            }).then(res => {
                // console.log(res)
                this.areas=res.data.result;
            })
        },
        cmc(){
            this.$api.withAreaSeekCMC({
                params:{
                    regionid:this.areavalue
                }
            }).then(res => {
                console.log(res)
                this.cmcs=res.data.result;
            })
        },
        construction(){
            this.$api.withCMCSeekConstruction({
                params:{
                    regionid:this.cmcvalue
                }
            }).then(res => {
                // console.log(res)
                this.constructions=res.data.result;
            })
        }
    }
}
</script>

<style>
.addScreeners .respondata span{
    display: inline-block;
    width: 200px;
    text-align: right;
}
.addScreeners .respondata .el-input{
    width: 400px;
}
.addScreeners .el-select{
    width: 200px;
    line-height: 100%;
}
/* .addScreeners .el-select .el-input{
    width: 200px;
    line-height: 100%;
} */
</style>
