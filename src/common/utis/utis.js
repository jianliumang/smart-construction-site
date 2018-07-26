exports.install = (Vue, options) => {
  Vue.prototype.setAllTime = function(sdata = 0) {
    let nowDate = new Date;
    let nowDateyear = nowDate.getFullYear();
    let nowDatemonth = nowDate.getMonth() + 1;
    let nowDatestrDate = nowDate.getDate();
    let nowDatehours = nowDate.getHours();
    let nowDateminutes = nowDate.getMinutes();
    let nowDateseconds = nowDate.getSeconds()-sdata;
    if(nowDateminutes<0){
      nowDateminutes = nowDateminutes+60;
      nowDatehours = nowDatehours-1;
    };
    if(nowDateseconds<0){
      nowDateseconds = nowDateseconds+60;
      nowDateminutes = nowDateminutes-1;
    };
    nowDatemonth = nowDatemonth >= 1 && nowDatemonth <= 9 ? "0" + nowDatemonth : nowDatemonth;
    nowDatestrDate = nowDatestrDate >= 1 && nowDatestrDate <= 9 ? "0" + nowDatestrDate : nowDatestrDate;
    nowDatehours = nowDatehours >= 0 && nowDatehours <= 9 ? "0" + nowDatehours : nowDatehours;
    nowDateminutes = nowDateminutes >= 0 && nowDateminutes <= 9 ? "0" + nowDateminutes : nowDateminutes;
    nowDateseconds = nowDateseconds >= 0 && nowDateseconds <= 9 ? "0" + nowDateseconds : nowDateseconds;
    var nowDateTime = nowDateyear + "-" + nowDatemonth + "-" + nowDatestrDate + " " + nowDatehours + ":" + nowDateminutes + ":" + nowDateseconds;
    return nowDateTime
  };
Vue.prototype.setPartTime = function(partDate = new Date) {
    let partDateyear = partDate.getFullYear();
    let partDatemonth = partDate.getMonth() + 1;
    partDatemonth = partDatemonth >= 1 && partDatemonth <= 9 ? "0" + partDatemonth : partDatemonth;
    let partDatestrDate = partDate.getDate();
    partDatestrDate = partDatestrDate >= 1 && partDatestrDate <= 9 ? "0" + partDatestrDate : partDatestrDate;
    var partDateTime = partDateyear + "-" + partDatemonth + "-" + partDatestrDate;
    return partDateTime;
  };
Vue.prototype.timestampToTime = function(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
};
Vue.prototype.timelist = {
  shortcuts: [{
    text: '最近一小时',
    onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000);
        picker.$emit('pick', [start, end]);
    }
},{
    text: '最近一天',
    onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24);
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近一周',
    onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近一个月',
    onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
    }
}, {
    text: '最近三个月',
    onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
    }
}]
},
Vue.prototype.starttimelist = {
    disabledDate(time) {
    return time.getTime() > Date.now();
  },
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      picker.$emit('pick', new Date());
    }
  }, {
    text: '昨天',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', date);
    }
  }, {
    text: '一周前',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', date);
    }
  }]
},
Vue.prototype.timetype = {
    disabledDate(time) {
    return time.getTime() > Date.now();
  },
}
};
