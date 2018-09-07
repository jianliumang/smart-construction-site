import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import VueAMap from 'vue-amap'
Vue.use(Router)
// Vue.use(VueAMap)
export default new Router({
  routes: [
    { 
      path:'/', 
      redirect:'/login',
      hidden:false
    },
    { 
      path:'/towerrunstate', 
      redirect:'/towerrunstate/towerrrealtime',
      hidden:false
    },
    { 
      path:'/videosurveillance', 
      redirect:'/videosurveillance/video',
      hidden:false
    },
    { 
      path:'/gprspositioning', 
      redirect:'/gprspositioning/gprsaddress',
      hidden:false
    },
    { 
      path:'/environmentalmonitoring', 
      redirect:'/environmentalmonitoring/environmentcue',
      hidden:false
    },
    { 
      path:'/equipmentinspection', 
      redirect:'/equipmentinspection/management',
      hidden:false
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/components/view/login.vue'],resolve),
      hidden: false
    },
    {
      path: '/revisepwd',
      name: 'revisepwd',
      component: (resolve) => require(['@/components/view/revisepwd.vue'],resolve),
      hidden: false
    },
    {
      path: '/siteinfo',
      name: 'siteinfo',
      component: (resolve) => require(['@/components/view/siteinfo.vue'],resolve),
      hidden: false
    },
    {
      path: '/addScreeners',
      name: 'addScreeners',
      component: (resolve) => require(['@/components/equipmentinspection/html/addScreeners.vue'],resolve),
      hidden: false
    },
    {
      path: '/shiftlanding',
      name: 'shiftlanding',
      component: (resolve) => require(['@/components/equipmentinspection/html/shiftlanding.vue'],resolve),
      hidden: false
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: (resolve) => require(['@/components/equipmentinspection/html/qrcode.vue'],resolve),
      hidden: false
    },
    {
      path: '/inspectionrecord',
      name: 'inspectionrecord',
      component: (resolve) => require(['@/components/equipmentinspection/html/inspectionrecord.vue'],resolve),
      hidden: false
    },
    {
      path: '/management',
      name: 'management',
      component: (resolve) => require(['@/components/equipmentinspection/html/management.vue'],resolve),
      hidden: false
    },
    {
      path: '/inputinfo',
      name: 'inputinfo',
      component: (resolve) => require(['@/components/equipmentinspection/html/inputinfo.vue'],resolve),
      hidden: false
    },
    {
      path: '/addinfo',
      name: 'addinfo',
      component: (resolve) => require(['@/components/equipmentinspection/html/addinfo.vue'],resolve),
      hidden: false
    },
    {
      path: '/jump',
      name: 'jump',
      component: (resolve) => require(['@/components/equipmentinspection/html/jump.vue'],resolve),
      hidden: false
    },
    {
      path: '/photograph',
      name: 'photograph',
      component: (resolve) => require(['@/components/equipmentinspection/html/photograph.vue'],resolve),
      hidden: false
    },
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true
      },
      component: (resolve) => require(['@/components/view/home.vue'],resolve),
      hidden:true,
      children:[
        {
          path: '/getindex',
          name: 'getindex',
          component: (resolve) => require(['@/components/index/html/tiaoshi.vue'],resolve),
          hidden:false
        },
        {
          path: '/index',
          name: '首页',
          icon:require('@/assets/img/nav00001.png'),
          component: (resolve) => require(['@/components/index/html/index.vue'],resolve),
          hidden:true
        },
        {
          path: '/servicesrealname',
          name: '考勤管理',
          icon:require('@/assets/img/nav00002.png'),
          component: (resolve) => require(['@/components/servicesrealname/html/servicesrealname.vue'],resolve),
          hidden:true
        },
        {
          path: '/environmentalmonitoring',
          name: '环境监控',
          icon:require('@/assets/img/nav00003.png'),
          component: (resolve) => require(['@/components/environmentalmonitoring/html/environmentalmonitoring.vue'],resolve),
          hidden:true,
          children:[
            {
              path: '/environmentalmonitoring/environmentcue',
              name: '环境数据监控',
              component: (resolve) => require(['@/components/environmentalmonitoring/html/environmentcue.vue'],resolve),
              hidden:true
            },
            {
              path: '/environmentalmonitoring/revisethreshold',
              name: '修改阀值',
              component: (resolve) => require(['@/components/environmentalmonitoring/html/revisethreshold.vue'],resolve),
              hidden:true
            }
          ]
        },
        {
          path: '/gprspositioning',
          name: 'GPRS定位',
          hidden:true,
          icon:require('@/assets/img/nav00004.png'),
          component: (resolve) => require(['@/components/gprspositioning/html/gprspositioning.vue'],resolve),
          children:[
            {
              path: '/gprspositioning/gprsaddress',
              name: '实时定位系统',
              component: (resolve) => require(['@/components/gprspositioning/html/gprsaddress.vue'],resolve),
              hidden:true
            },
            {
              path: '/gprspositioning/gprshistory',
              name: '历史路径回放',
              component: (resolve) => require(['@/components/gprspositioning/html/gprshistory.vue'],resolve),
              hidden:true
            },
            {
              path: '/gprspositioning/gprshatdata',
              name: '人员信息表',
              component: (resolve) => require(['@/components/gprspositioning/html/gprshatdata.vue'],resolve),
              hidden:true
            }
          ]
        },
        {
          path: '/towerrunstate',
          name: '塔吊管理',
          hidden:true,
          icon:require('@/assets/img/nav00005.png'),
          component: (resolve) => require(['@/components/towerrunstate/html/towerrunstate.vue'],resolve),
          children:[
            {
              path: '/towerrunstate/towerrrealtime',
              name: '塔吊实时动画',
              component: (resolve) => require(['@/components/towerrunstate/html/towerrrealtime.vue'],resolve),
              hidden:true
            },
            {
              path: '/towerrunstate/towerrhistoryanimation',
              name: '塔吊历史动画',
              component: (resolve) => require(['@/components/towerrunstate/html/towerrhistoryanimation.vue'],resolve),
              hidden:true
            },
            {
              path: '/towerrunstate/towerrhistorydata',
              name: '塔吊历史数据',
              component: (resolve) => require(['@/components/towerrunstate/html/towerrhistorydata.vue'],resolve),
              hidden:true
            },
            {
              path: '/towerrunstate/towerralarminformation',
              name: '塔吊报警信息',
              component: (resolve) => require(['@/components/towerrunstate/html/towerralarminformation.vue'],resolve),
              hidden:true
            }
          ]
        },
        {
          path: '/videosurveillance',
          name: '视频监控',
          hidden:true,
          icon:require('@/assets/img/nav00006.png'),
          component: (resolve) => require(['@/components/videosurveillance/html/videosurveillance.vue'],resolve),
          children:[
            {
              path: '/videosurveillance/video',
              name: '视频监控设备',
              component: (resolve) => require(['@/components/videosurveillance/html/newvideo.vue'],resolve),
              hidden:true
            },
          ]
        },
        {
          path: '/equipmentinspection',
          name: '设备巡检',
          hidden:true,
          icon:require('@/assets/img/nav00007.png'),
          component: (resolve) => require(['@/components/equipmentinspection/html/equipmentinspection.vue'],resolve),
          children:[
            {
              path: '/equipmentinspection/inputinfo',
              name: '生成二维码',
              component: (resolve) => require(['@/components/equipmentinspection/html/inputinfo.vue'],resolve),
              hidden:true
            },
            {
              path: '/equipmentinspection/jump',
              name: '二维码展示',
              component: (resolve) => require(['@/components/equipmentinspection/html/jump.vue'],resolve),
              hidden:true
            },
            {
              path: '/equipmentinspection/management',
              name: '设备管理',
              component: (resolve) => require(['@/components/equipmentinspection/html/management.vue'],resolve),
              hidden:true
            },
            {
              path: '/equipmentinspection/inspectionrecord?equipmentNumber=10301229&equipmentTypeNumber=1',
              name: '巡检记录',
              component: (resolve) => require(['@/components/equipmentinspection/html/inspectionrecord.vue'],resolve),
              hidden:true
            },
            {
              path: '/equipmentinspection/qrcode?equipmentNumber=10301229&equipmentTypeNumber=1',
              name: '巡检',
              component: (resolve) => require(['@/components/equipmentinspection/html/qrcode.vue'],resolve),
              hidden:true
            },
            {
              path: '/equipmentinspection/inspection',
              name: 'inspection',
              component: (resolve) => require(['@/components/equipmentinspection/html/inspection.vue'],resolve),
              hidden: false
            },
          ]
        },
        
      ]
    }
  ]
})

