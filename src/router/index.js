import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/page/index'),
      redirect: '/personal',
      meta: {
        title: '首页',
        requireAuth: true
      },
      children: [{
        path: '/personal',
        name: 'personal',
        component: () => import('@/page/personal/personal')// 个人中心
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('@/page/member/member')// 会员列表
      },
      {
        path: '/memberDetails',
        name: 'memberDetails',
        component: () => import('@/page/member/memberDetails')// 会员详情
      },
      {
        path: '/equipment',
        name: 'equipment',
        component: () => import('@/page/equipment/equipment')// 设备列表
      },
      {
        path: '/equipmentDetails',
        name: 'equipmentDetails',
        component: () => import('@/page/equipment/equipmentDetails')// 设备使用记录
      },
      {
        path: '/programmeDetails',
        name: 'programmeDetails',
        component: () => import('@/page/programme/programmeDetails')// 方案名称
      },
      {
        path: '/account',
        name: 'account',
        component: () => import('@/page/account/account')// 子账号
      },
      {
        path: '/accountDetails',
        name: 'accountDetails',
        component: () => import('@/page/account/accountDetails')// 子账号详情
      },
      {
        path: '/empower',
        name: 'empower',
        component: () => import('@/page/empower/empower')// 已授权模块
      },
      {
        path: '/empowerDetails',
        name: 'empowerDetails',
        component: () => import('@/page/empower/empowerDetails')// 模块详情
      },
      {
        path: '/empowerStage',
        name: 'empowerStage',
        component: () => import('@/page/empower/empowerStage')// 已授权模块课程列表
      },
      {
        path: '/empowerStageDetails',
        name: 'empowerStageDetails',
        component: () => import('@/page/empower/empowerStageDetails')// 课程详情
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import('@/page/customer/customer')// 客服中心
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/page/login'),
      meta: {
        title: '登录',
        requireAuth: true
      }
    },
    {
      path: '/wxPhone',
      name: 'wxPhone',
      component: () => import('@/page/wxPhone'),
      meta: {
        title: '绑定手机号',
        requireAuth: true
      }
    }
  ]
})
