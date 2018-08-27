<template>
    <div>
        <div class="box">
            <el-select v-model="uservalue" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.inspectionStateNumber"
                :label="item.inspectionState"
                :value="item.inspectionStateNumber">
                </el-option>
            </el-select>
        </div>
        <div class="box">
            <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea">
            </el-input>
        </div>
        <div class="box">
            <input type="file" name="" id="form" @change="uploadIMG($event)" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        options: [],
        uservalue: '',
        textarea:'',
        url:'',
        picavalue: "",
        imgUrl: null,
        isEnlargeImage: false,
        changetype: false,
        resultdata:''
      }
    },
    mounted(){
        // this.requesterror();
    },
    methods:{
        uploadIMG(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.picavalue = files[0];
            // console.log(this.picavalue.size / 1024)
            if (this.picavalue.size / 1024 > 5000) {
                this.changetype = true
                this.imgPreview(this.picavalue);
            } else {
                this.changetype = false;
                this.imgPreview(this.picavalue);
            }
        },
        imgPreview(file, callback) {
            let self = this;
            //判断支不支持FileReader
            if (!file || !window.FileReader) return;
            if (/^image/.test(file.type)) {
                //创建一个reader
                let reader = new FileReader();
                //将图片转成base64格式
                reader.readAsDataURL(file);
                //读取成功后的回调
                reader.onloadend = () => {
                    // console.log()
                    let result = reader.result;
                    
                    let img = new Image();
                    img.src = result;
                    // console.log(result.length);
                    img.onload = () => {
                        let data = this.compress(img);
                        this.imgUrl = result;
                        let blob = this.dataURItoBlob(data);
                        // base64转blob对象
                        var formData = new FormData();
                        formData.append("file", blob);
                        if (formData.get("file").size / 1024 > 500) {
                            this.changetype = true;
                            this.imgPreview(formData.get("file"));
                            return false;
                        }
                        console.log(formData.get("file"))
                        //更改文件名
                        var filedata = formData.get("file"); //获取File对象
                        // 构造新File对象
                        var hackfile = new File([filedata], "aa.jpg", {type:"image/jpeg"});
                        formData.set("file",hackfile)
                        console.log(formData.get("file"))
                        // console.log(formData.get("file").size / 1024)
                        let reader2 = new FileReader();
                        //将图片转成base64格式
                        reader2.readAsDataURL(formData.get("file"));
                        reader2.onloadend = () => {
                            //  console.log(reader2.result)
                        }
                        // 将blob对象转成formData对象
                        let config = {
                        headers: { "Content-Type": "multipart/form-data" }
                        };
                        this.url="http://192.168.1.88:8080/EquipmentInspection/inspectionController/insertEquipmentAbnormal?equipmentNumber=" + sessionStorage.getItem("equipmentNumber") + 
                        "&inspectionStateNumber=" + '2' + 
                        "&inspectionDate=" + this.setAllTime() + 
                        "&regionid=" + sessionStorage.getItem("regionid") + 
                        "&information=" + this.textarea
                        self.axios.post(this.url, formData, config).then(res => {
                            self.successfn();
                            if (res.data.code == 200) {

                            } else {
                                self.$message({
                                message: "图片上传失败，请重试",
                                type: "warning"
                                });
                            }
                        });
                    };
                };
            }
        },
        // 压缩图片
        compress(img) {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            let initSize = img.src.length;
            let width = img.width;
            let height = img.height;
            canvas.width = width;
            canvas.height = height;
            // 铺底色
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
            //进行最小压缩
            let ndata;
            if(this.changetype){
                ndata = canvas.toDataURL("image/jpeg", 0.1);
            }else{
                ndata = canvas.toDataURL("image/jpeg", 0.5);
            }
            // console.log(ndata.length);
            return ndata;
        },
        // base64转成bolb对象
        dataURItoBlob(base64Data) {
            var byteString;
            if (base64Data.split(",")[0].indexOf("base64") >= 0)
            byteString = atob(base64Data.split(",")[1]);
            else byteString = unescape(base64Data.split(",")[1]);
            var mimeString = base64Data
            .split(",")[0]
            .split(":")[1]
            .split(";")[0];
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        },
        successfn(){
            this.$router.replace('/qrcode?equipmentNumber='+sessionStorage.getItem("equipmentNumber")+'&equipmentTypeNumber='+sessionStorage.getItem("equipmentTypeNumber"))
        },
        requesterror(){
            this.$http({
                method: "get",
                url:"http://192.168.1.88:8080/EquipmentInspection/inspectionController/selectInspectionState",
            })
            .then(res => {
                this.options = res.data.result;
            });
        }
    }
}
</script>

<style>
.box{
    width: 400px;
}
#phone{
    width: 200px;
    height: 200px;
    border: 1px solid green;
    margin-bottom: 20px;
}
.el-textarea{
    width: 300px;
}
</style>
