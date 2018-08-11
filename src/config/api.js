export default{
    withMachineNumberSeekAllAlarm : 'towercraneAlarmInformation/toselectAlarmInformation',//根据设备编号查出该编号下所有的报警信息
    alarmReplay : 'towercraneAlarmInformation/toselectAlarmPlayback',//报警回放
    seekMachineNumberNewAlarm : 'towercraneAlarmInformation/toselectOneAlarmInformation',//查找该设备编号最新一条报警信息
    insertArchitectureData : 'architecture/toinsertArchitecture',//插入建筑数据
    seekArchitectureData : 'architecture/toselectArchitecture',//查询建筑数据
    seekNewsType : 'architecture/toselectNews',//查询最新动态
    withCMCNumberSeekAllConstruction : 'constructionsite/toselectAllConstructionSite',//根据管委会编号查找旗下所有工地
    withConstructionNumberSeekInfo : 'constructionsite/toselectOneConstructionSite',//get根据工地编号查找对应的工地信息
    seekEngineeringCategory : 'engineeringCategory/selectEngineeringCategory',//查找工程类别
    seekEnvironmentalMonitoringHistoryData : 'environmentalmonitoring/tohistorydate',//查找环境监控历史数据
    withMachineNumberHasDataDayPost : 'environmentalmonitoring/toselectDataExistDate',//根据设备编号查找有数据的日期
    seekDatesEnvironmentalMonitoringData : 'environmentalmonitoring/toselectHistoryFromTimeToTime2',//get根据设备编号查找时间到另一个时间的环境监控数据
    seekMachineNumberNewEnvironmentalData : 'environmentalmonitoring/toselectTempertureInformation',//查找该设备编号的最新一条的环境监控所有数据
    withMachineNumberResInfo : 'equimentController/toselectEquipment',//根据设备编号请求设备信息
    withConstructionNumberResInfo : 'equimentController/toselectWorkSiteOneEquipment',//根据工地编号请求设备信息
    seekAllGroup : 'crouping/selectGroupingName',//查找所有分组
    withMachineNumberHasDataDayGet : 'location/toselectDataExistDate',//根据设备编号查找有数据的日期
    withHatNumberResNewGpsInfo : 'location/toselectSafetyHatOneLocation',//根据安全帽编号请求最新的一条安全帽定位信息
    withHatNumberAndDatesHistory : 'location/toselectTimeSafetyHatLocation',//根据安全帽编号和两个时间查找安全帽历史记录
    withPermissionsSeek : 'power/toselectPower',//根据具体权限查找旗下所有工地或下一级权限
    withConstructionNumberSeekHat : 'safetyhat/toselecteOneSafetyHat',//根据工地编号查找旗下的安全帽
    withConstructionAndGroupSeekHat : 'safetyhat/toselecteOneSafetyHat',//根据工地编号和分组编号查找旗下的安全帽
    withConstructionAndNumberSeekHat : 'safetyhat/toselecteWorkSiteOneSafetyHat',//查找指定,工地指定编号的安全帽
    withHatNumberPutInfo : 'safetyhat/toupdateOneSafetyHat',//根据安全帽编号，更改安全帽所属人与分组信息
    withReplayIdSeekData : 'playback/toselectePlayback',//get根据回放id查找回放的数据
    seekNewTowerData : 'runningdata/toselectOneTowerCraneRunning_data',//get请求查找最新一条指定塔机设备的运行数据
    seekAppointTowerData : 'runningdata/toselectTowerCraneRunning_data',//get请求查找指定塔机设备的运行数据
    withMachineSeekAllCycleData : 'workingcycle/toselectAllTowerCraneWorkingCycle',//查找设备的所有塔机设备的工作循环数据
    withMachineNumberHasDataDayTC : 'workingcycle/toselectDataExistDate',//根据设备编号查找有数据的日期
    withTowerNumberAndDatesSeekInfo : 'workingcycle/toselectTowerCraneWorkingCycle',//根据塔机编号和开始时间结束时间查询塔机工作循环数据
    seekMachineTower : 'TowerCraneSensor/toselectTowerCraneSensor',//查找該工地下的塔机
    userInfo : 'userinfo/selectUserInFo',//登录接口
    revisepwd: 'userinfo/updateUserInFo',//修改用户信息
    seekAllVideo : 'videomonitor/toselectListVideoMonitor',//get请求所有视频监控设备
    seekConstructionsVideo : 'videomonitor/toselectVideoMonitor',//查找指定工地所属监控
}