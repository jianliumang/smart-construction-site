<template>
    <div class="gprshatdata">
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%">
            <el-table-column
                prop="hatnumber"
                label="安全帽编号">
            </el-table-column>
            <el-table-column
                prop="name"
                label="人员名称">
            </el-table-column>
            <el-table-column
                prop="worksite"
                label="所属分组">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="修改信息"
            :visible.sync="dialogVisible"
            width="1200px"
            :before-close="handleClose">
            <div>
                <div class="res-info">
                    <span>安全帽编号：</span><span>{{revisehatnumber}}</span>
                </div>
                <div class="res-info">
                    <span>人员名称：</span>
                    <el-input type="text" v-model="revisehatname"></el-input>
                </div>
                <div class="res-info">
                    <span>所属分组：</span>
                    <el-select v-model="groupvalue">
                        <el-option v-for="item in options"
                            :key="item.groupingnumber"
                            :label="item.groupingname"
                            :value="item.groupingnumber">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="finish">确 定</el-button>
            </span>
        </el-dialog>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="backData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        regionid:Number,
        tableData: [],
        backData:[],
        currentPage:1,
        sizeval:10,
        currentval:1,
        dialogVisible: false,
        revisehatnumber:Number,
        revisehatname:'',
        revisehatworksite: '',
        groupvalue:'',
        options: [],
        openvalue:''
      }
    },
    created() {
      this.regionid = sessionStorage.getItem("regionid");
    },
    mounted(){
         this.hatinforequest();
         this.groupinforequest()
    },
    methods:{
        handleClick(row) {
            //点击修改
            console.log(row)
            // console.log(this.revisehatworksite)
            this.revisehatnumber = row.hatnumber;
            this.revisehatname = row.name;
            this.revisehatworksite = row.worksite;
            this.dialogVisible = true;
            this.groupvalue = row.groupingnumber;
        },
        handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        },
        datashow(){
            //根据页面条数size值与页面数值展现数据
            this.tableData = [];
            for(var i=this.sizeval*this.currentval-this.sizeval;i<this.sizeval*this.currentval;i++){
                if(i>=this.backData.length){
                    return false;
                }
                this.tableData.push(this.backData[i])
            }
        },
        handleSizeChange(val) {
            //点击页面条数size，传入值
            this.sizeval = val;
            this.tableData = [];
            this.datashow();
        },
        handleCurrentChange(val) {
            //点击页数传入页数值
            this.currentval = val;
            this.tableData = [];
            this.datashow();
        },
        hatinforequest(){
            //将数据在页面中展示
            this.backData = [];
            this.$api.withConstructionNumberSeekHat({
                params:{
                    regionid:this.regionid
                }
            }).then(res => {
                console.log(res);
                if(res.data.code==200){
                    res.data.result.forEach(element => {
                        this.backData.push({
                            hatnumber: element.hat_number,
                            name: element.workman_name,
                            worksite: element.groupingname,
                            groupingnumber: element.groupingnumber
                        })
                    });
                    this.datashow();
                }
            })
            
        },
        groupinforequest(){
            //修改功能中的分组下拉列表
            console.log(7777777)
            this.options = [];
            this.$api.seekAllGroup().then(res => {
                console.log(res)
                if(res.data.code==200){
                    this.options=res.data.result
                    // this.groupvalue = res.data.result[0].groupingnumber;
                    // console.log(11111111111111,this.groupvalue)
                }
            })
        },
        finish(){
            //完成修改
            // console.log(55555)
            // console.log(this.revisehatname)
            this.$api.withHatNumberPutInfo({
                "groupingnumber": this.groupvalue,
                "hatnumber": this.revisehatnumber,
                "workman_name": this.revisehatname
            }).then(res => {
                if(res.data.code==200){
                    this.hatinforequest();
                    if(res.data.result == true){
                        this.openvalue = '修改成功'
                    }else{
                        this.openvalue = '修改失败'
                    }
                    this.open()
                }
            })
            this.dialogVisible = false;
        },
        open() {
            //消息提示
            const h = this.$createElement;
            this.$notify({
            title: '标题名称',
            message: h('i', { style: 'color: teal'}, this.openvalue),
            customClass:'infoshow'
        });
        }
    },
    watch: {
        revisehatname(val){
            // console.log(val)
            // console.log(/^[\u4e00-\u9fa5]{0,}$/.test(val));
            if(!/^[\u4e00-\u9fa5]{0,5}$/.test(val)){
                this.revisehatname=val.replace(/[^\u4e00-\u9fa5]/,'');
                this.openvalue = '请输入五个字以内的汉字',
                this.open();
            }
            
        }
    }
}
</script>

<style>
.gprshatdata{
    width: 98%;
    padding: 0px 1%;
}
.cell{
    padding: 0px!important;
    text-align: center;
}
.infoshow{
    z-index: 3000;
}
.gprshatdata .el-dialog{
    width: 500px!important;
}
.gprshatdata .dialog-footer{
    display: flex;
    justify-content: center;
}
.res-info{
    height: 50px;
    line-height: 50px;
    /* display: flex;
    align-items: center; */
}
.res-info span{
    display: inline-block;
}
.res-info .el-input{
    width: 200px;
}
.res-info span:first-child{
    text-align: right;
    width: 100px;
}
.res-info span:last-child{
    width: 200px;
    text-align: left;
}
</style>
