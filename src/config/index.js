import qrcodeapi from './qrcodeapi'
import api from './api'
import axios from '../common/axiosbreak/axiosbreak.js'
const baseUrl = 'http://60.191.29.210:9090/EquipmentInspection/'
const comurl = 'http://60.191.29.210:9090/RestIOTAPI/'
for (const key in qrcodeapi) {
    // if(key==pictureupload){
    //     qrcodeapi[key] = baseUrl + qrcodeapi[key];
    // }else{
        
    // }
    qrcodeapi[key] = comurl + qrcodeapi[key];
}
for (const key in api) {
    api[key] = comurl + api[key];
}

//根据设备类型编号和设备编号删除设备--management
export const withMachineTypeNumberDelete = (data) =>{
    return axios.delete(qrcodeapi.withMachineTypeNumberDelete,data)
}

//根据设备类型编号查询设备--management
export const withTypeNumberSeekMachine = (data) =>{
    return axios.get(qrcodeapi.withTypeNumberSeekMachine,data)
}

//根据塔机id查询设备详细信息--addinfo
export const withTowerIdSeekInfo = (data) =>{
    return axios.get(qrcodeapi.withTowerIdSeekInfo,data)
}

//修改塔机,升降机设备--addinfo
export const reviseMachineInfo = (num,parms,data) =>{
    if(num==1){
        return axios.put(qrcodeapi.revisetowerinfo+parms,data);
    }else if(num==2){
        return axios.put(qrcodeapi.reviseElevatorInfo+parms,data)
    }
}

//图片上传接口--inspection
export const pictureupload = (data,config) =>{
    return axios.post(qrcodeapi.pictureupload,data,config)
}

//图片下载接口--inspectionrecord
export const imageurl = qrcodeapi.pictureDownload

//查看当前日期是否巡检--qrcode
export const judgementTodayInspectionType = (data) =>{
    return axios.get(qrcodeapi.judgementTodayInspectionType,data)
}

//根据设备类型获取异常列表接口--inspection,inspectionrecord
export const withmachinetyperesquestabnormal = (data) =>{
    return axios.get(qrcodeapi.withmachinetyperesquestabnormal,data)
}

//机器异常上传信息接口--inspection
export const machineabnormaluploadinfo = (data) =>{
    return axios.post(qrcodeapi.machineabnormaluploadinfo,data)
}

//机器正常上传信息接口--inspection
export const machinenormaluploadinfo = (data) =>{
    return axios.get(qrcodeapi.machinenormaluploadinfo,data)
}

//查询简单机器巡检记录--inspectionrecord
export const seekMachineInspectionRecord = (data) =>{
    return axios.get(qrcodeapi.seekMachineInspectionRecord,data)
}

//根据id查询巡检记录详细信息--addinfo,inspectionrecord
export const withidseekdetailedinfo = (data) =>{
    return axios.get(qrcodeapi.withidseekdetailedinfo,data)
}

//改变设备维修状态--inspectionrecord
export const reviseMachineType = (data) =>{
    return axios.put(qrcodeapi.reviseMachineType+data)
}

//根据塔机设备批量生成二维码--addinfo,inputinfo
export const seektowerforallqrcode = (data) =>{
    return axios.post(qrcodeapi.seektowerforallqrcode,data)
}

//根据塔机设备生成二维码--addinfo,inputinfo
export const seektowerforqrcode = (data) =>{
    return axios.post(qrcodeapi.seektowerforqrcode,data)
}

//根据塔机设备批量生成二维码url
export const seektowerforallqrcodeurl = qrcodeapi.seektowerforallqrcode;

//根据塔机设备生成二维码url
export const seektowerforqrcodeurl = qrcodeapi.seektowerforqrcode;

//根据升降机设备批量生成二维码url
export const seekElevatorForAllQrcodeurl = qrcodeapi.seekElevatorForAllQrcode;

//根据升降机设备生成二维码url
export const seekElevatorForQrcodeurl = qrcodeapi.seekElevatorForQrcode;

//查找所有的设备类型--inputsub
export const seekequipmenttype = () =>{
    return axios.get(qrcodeapi.seekequipmenttype)
}

//查找所有的设备所生成的二维码--jump
export const seekequipmentqrcode = (data) =>{
    return axios.get(qrcodeapi.seekequipmentqrcode,data)
}

//查找设备编号和设备类型编号查询设备信息--addinfo,inputinfo
export const withnumberandtypeinfo = (data) =>{
    return axios.get(qrcodeapi.withnumberandtypeinfo,data)
}

//添加安检员
export const addScreeners = (data) =>{
    return axios.post(qrcodeapi.addScreeners+data)
}

//查找所有国家
export const seekAllCountry = () =>{
    return axios.get(qrcodeapi.seekAllCountry)
}

//根据国家查找省份
export const withCountrySeekProvince = (data) =>{
    return axios.get(qrcodeapi.withCountrySeekProvince,data)
}

//根据省查找市
export const withProvinceSeekCity = (data) =>{
    return axios.get(qrcodeapi.withProvinceSeekCity,data)
}

//根据市查找区
export const withCitySeekArea = (data) =>{
    return axios.get(qrcodeapi.withCitySeekArea,data)
}

//根据区查找管委会
export const withAreaSeekCMC = (data) =>{
    return axios.get(qrcodeapi.withAreaSeekCMC,data)
}

//根据管委会查找工地
export const withCMCSeekConstruction = (data) =>{
    return axios.get(qrcodeapi.withCMCSeekConstruction,data)
}





// -------------------------------------------------------
//根据设备编号查出该编号下所有的报警信息
export const withMachineNumberSeekAllAlarm = (data) =>{
    return axios.get(api.withMachineNumberSeekAllAlarm,data)
}

//报警回放
export const alarmReplay = (data) =>{
    return axios.get(api.alarmReplay,data)
}

//查找该设备编号最新一条报警信息
export const seekMachineNumberNewAlarm = (data) =>{
    return axios.get(api.seekMachineNumberNewAlarm,data)
}

//插入建筑数据
export const insertArchitectureData = (data) =>{
    return axios.post(api.insertArchitectureData,data)
}

//查询建筑数据
export const seekArchitectureData = (data) =>{
    return axios.get(api.seekArchitectureData,data)
}

//根据管委会编号查找旗下所有工地
export const withCMCNumberSeekAllConstruction = (data) =>{
    return axios.get(api.withCMCNumberSeekAllConstruction,data)
}

//get根据工地编号查找对应的工地信息
export const withConstructionNumberSeekInfo = (data) =>{
    return axios.get(api.withConstructionNumberSeekInfo,data)
}

//查找工程类别
export const seekEngineeringCategory = () =>{
    return axios.post(api.seekEngineeringCategory)
}

//查找环境监控历史数据
export const seekEnvironmentalMonitoringHistoryData = (data) =>{
    return axios.get(api.seekEnvironmentalMonitoringHistoryData,data)
}

//根据设备编号查找有数据的日期
export const withMachineNumberHasDataDayPost = (data) =>{
    return axios.post(api.withMachineNumberHasDataDayPost+data)
}

//get根据设备编号查找时间到另一个时间的环境监控数据
export const seekDatesEnvironmentalMonitoringData = (data) =>{
    return axios.post(api.seekDatesEnvironmentalMonitoringData+data)
}

//查找该设备编号的最新一条的环境监控所有数据
export const seekMachineNumberNewEnvironmentalData = (data) =>{
    return axios.get(api.seekMachineNumberNewEnvironmentalData,data)
}

//根据设备编号请求设备信息
export const withMachineNumberResInfo = (data) =>{
    return axios.get(api.withMachineNumberResInfo,data)
}

//根据工地编号请求设备信息
export const withConstructionNumberResInfo = (data) =>{
    return axios.get(api.withConstructionNumberResInfo,data)
}

//查找所有分组
export const seekAllGroup = () =>{
    return axios.get(api.seekAllGroup)
}

//根据设备编号查找有数据的日期
export const withMachineNumberHasDataDayGet = (data) =>{
    return axios.get(api.withMachineNumberHasDataDayGet,data)
}

//根据安全帽编号请求最新的一条安全帽定位信息
export const withHatNumberResNewGpsInfo = (data) =>{
    return axios.get(api.withHatNumberResNewGpsInfo,data)
}

//根据安全帽编号和两个时间查找安全帽历史记录
export const withHatNumberAndDatesHistory = (data) =>{
    return axios.get(api.withHatNumberAndDatesHistory,data)
}

//根据具体权限查找旗下所有工地或下一级权限
export const withPermissionsSeek = (data) =>{
    return axios.get(api.withPermissionsSeek,data)
}

//根据工地编号查找旗下的安全帽
export const withConstructionNumberSeekHat = (data) =>{
    return axios.get(api.withConstructionNumberSeekHat,data)
}

//根据工地编号和分组编号查找旗下的安全帽
export const withConstructionAndGroupSeekHat = (data) =>{
    return axios.post(api.withConstructionAndGroupSeekHat+data)
}

//查找指定,工地指定编号的安全帽
export const withConstructionAndNumberSeekHat = (data) =>{
    return axios.get(api.withConstructionAndNumberSeekHat,data)
}

//根据安全帽编号，更改安全帽所属人与分组信息
export const withHatNumberPutInfo = (data) =>{
    return axios.post(api.withHatNumberPutInfo,data)
}

//get根据回放id查找回放的数据
export const withReplayIdSeekData = (data) =>{
    return axios.get(api.withReplayIdSeekData,data)
}

//get请求查找最新一条指定塔机设备的运行数据
export const seekNewTowerData = (data) =>{
    return axios.get(api.seekNewTowerData,data)
}

//get请求查找指定塔机设备的运行数据
export const seekAppointTowerData = (data) =>{
    return axios.get(api.seekAppointTowerData,data)
}

//查找设备的所有塔机设备的工作循环数据
export const withMachineSeekAllCycleData = (data) =>{
    return axios.get(api.withMachineSeekAllCycleData,data)
}

//根据设备编号查找有数据的日期
export const withMachineNumberHasDataDayTC = (data) =>{
    return axios.get(api.withMachineNumberHasDataDayTC,data)
}

//根据塔机编号和开始时间结束时间查询塔机工作循环数据
export const withTowerNumberAndDatesSeekInfo = (data) =>{
    return axios.post(api.withTowerNumberAndDatesSeekInfo,data)
}

//查找該工地下的塔机
export const seekMachineTower = (data) =>{
    return axios.get(api.seekMachineTower,data)
}

//登录接口
export const userInfo = (data) =>{
    return axios.post(api.userInfo,data)
}

//get请求所有视频监控设备
export const seekAllVideo = () =>{
    return axios.get(api.seekAllVideo)
}

//查找指定工地所属监控
export const seekConstructionsVideo = (data) =>{
    return axios.get(api.seekConstructionsVideo,data)
}