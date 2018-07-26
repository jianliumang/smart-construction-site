import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import VueAMap from 'vue-amap'
Vue.use(Router)
// Vue.use(VueAMap)
export default new Router({
  routes: [
    { path:'/', redirect:'/landing'},
    { path:'/towerrunstate', redirect:'/towerrunstate/towerrrealtime'},
    { path:'/videosurveillance', redirect:'/videosurveillance/video'},
    { path:'/gprspositioning', redirect:'/gprspositioning/gprsaddress'},
    { path:'/equipmentinspection', redirect:'/equipmentinspection/management'},
    {
      path: '/landing',
      name: 'landing',
      component: (resolve) => require(['@/components/view/landing.vue'],resolve),
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/components/view/login.vue'],resolve),
      hidden: true
    },
    {
      path: '/login2',
      name: 'login2',
      component: (resolve) => require(['@/components/view/login2.vue'],resolve),
      hidden: true
    },
    {
      path: '/addScreeners',
      name: 'addScreeners',
      component: (resolve) => require(['@/components/view/addScreeners.vue'],resolve),
      hidden: true
    },
    {
      path: '/shiftlanding',
      name: 'shiftlanding',
      component: (resolve) => require(['@/components/view/shiftlanding.vue'],resolve),
      hidden: true
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: (resolve) => require(['@/components/view/qrcode.vue'],resolve),
      hidden: true
    },
    {
      path: '/new',
      name: 'new',
      component: (resolve) => require(['@/components/view/new.vue'],resolve),
      hidden: true
    },
    {
      path: '/inspectionrecord',
      name: 'inspectionrecord',
      component: (resolve) => require(['@/components/view/inspectionrecord.vue'],resolve),
      hidden: true
    },
    {
      path: '/management',
      name: 'management',
      component: (resolve) => require(['@/components/view/management.vue'],resolve),
      hidden: true
    },
    {
      path: '/inputinfo',
      name: 'inputinfo',
      component: (resolve) => require(['@/components/view/inputinfo.vue'],resolve),
      hidden: true
    },
    {
      path: '/addinfo',
      name: 'addinfo',
      component: (resolve) => require(['@/components/view/addinfo.vue'],resolve),
      hidden: true
    },
    {
      path: '/jump',
      name: 'jump',
      component: (resolve) => require(['@/components/view/jump.vue'],resolve),
      hidden: true
    },
    {
      path: '/inspection',
      name: 'inspection',
      component: (resolve) => require(['@/components/view/inspection.vue'],resolve),
      hidden: true
    },
    {
      path: '/photograph',
      name: 'photograph',
      component: (resolve) => require(['@/components/view/photograph.vue'],resolve),
      hidden: true
    },
    {
      path: '/home',
      name: 'home',
      component: (resolve) => require(['@/components/view/home.vue'],resolve),
      children:[
        {
          path: '/index',
          name: '首页',
          component: (resolve) => require(['@/components/index/html/index.vue'],resolve),
          hidden:true
        },
        {
          path: '/getindex',
          name: 'getindex',
          component: (resolve) => require(['@/components/index/html/tiaoshi.vue'],resolve),
          hidden:true
        },
        {
          path: '/environmentcue',
          name: '环境监控',
          component: (resolve) => require(['@/components/environmentcue/html/environmentcue.vue'],resolve),
          hidden:false
        },
        {
          path: '/videosurveillance',
          name: '视频监控',
          component: (resolve) => require(['@/components/videosurveillance/html/videosurveillance.vue'],resolve),
          children:[
            {
              path: '/videosurveillance/video',
              name: 'video',
              component: (resolve) => require(['@/components/videosurveillance/html/video.vue'],resolve),
              hidden:false
            },
          ]
        },
        {
          path: '/gprspositioning',
          name: 'gprs定位',
          component: (resolve) => require(['@/components/gprspositioning/html/gprspositioning.vue'],resolve),
          children:[
            {
              path: '/gprspositioning/gprsaddress',
              name: 'gprsaddress',
              component: (resolve) => require(['@/components/gprspositioning/html/gprsaddress.vue'],resolve),
              hidden:false
            },
            {
              path: '/gprspositioning/gprshistory',
              name: 'gprshistory',
              component: (resolve) => require(['@/components/gprspositioning/html/gprshistory.vue'],resolve),
              hidden:false
            },
            {
              path: '/gprspositioning/gprshatdata',
              name: 'gprshatdata',
              component: (resolve) => require(['@/components/gprspositioning/html/gprshatdata.vue'],resolve),
              hidden:false
            }
          ]
        },
        {
          path: '/servicesrealname',
          name: '劳务实名制',
          component: (resolve) => require(['@/components/servicesrealname/html/servicesrealname.vue'],resolve),
          hidden:false
        },
        {
          path: '/equipmentinspection',
          name: '设备巡检',
          component: (resolve) => require(['@/components/equipmentinspection/html/equipmentinspection.vue'],resolve),
          children:[
            {
              path: '/equipmentinspection/inputinfo',
              name: 'inputinfo',
              component: (resolve) => require(['@/components/view/inputinfo.vue'],resolve),
              hidden:false
            },
            {
              path: '/equipmentinspection/jump',
              name: 'jump',
              component: (resolve) => require(['@/components/view/jump.vue'],resolve),
              hidden:false
            },
            {
              path: '/equipmentinspection/management',
              name: 'management',
              component: (resolve) => require(['@/components/view/management.vue'],resolve),
              hidden:false
            },
            {
              path: '/equipmentinspection/inspectionrecord',
              name: 'inspectionrecord',
              component: (resolve) => require(['@/components/view/inspectionrecord.vue'],resolve),
              hidden:false
            },
            {
              path: '/equipmentinspection/qrcode',
              name: 'qrcode',
              component: (resolve) => require(['@/components/view/qrcode.vue'],resolve),
              hidden:false
            },
          ]
        },
        {
          path: '/towerrunstate',
          name: '塔吊运行状态',
          component: (resolve) => require(['@/components/towerrunstate/html/towerrunstate.vue'],resolve),
          children:[
            {
              path: '/towerrunstate/towerrhistoryanimation',
              name: 'towerrhistoryanimation',
              component: (resolve) => require(['@/components/towerrunstate/html/towerrhistoryanimation.vue'],resolve),
              hidden:false
            },
            {
              path: '/towerrunstate/towerrhistorydata',
              name: 'towerrhistorydata',
              component: (resolve) => require(['@/components/towerrunstate/html/towerrhistorydata.vue'],resolve),
              hidden:false
            },
            {
              path: '/towerrunstate/towerrrealtime',
              name: 'towerrrealtime',
              component: (resolve) => require(['@/components/towerrunstate/html/towerrrealtime.vue'],resolve),
              hidden:false
            },
            {
              path: '/towerrunstate/towerralarminformation',
              name: 'towerralarminformation',
              component: (resolve) => require(['@/components/towerrunstate/html/towerralarminformation.vue'],resolve),
              hidden:false
            }
          ]
        }
      ]
    }
  ]
})

