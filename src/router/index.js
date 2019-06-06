/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index'
import personal from '@/page/personal/personal'// 个人中心
import member from '@/page/member/member'// 会员列表
import equipment from '@/page/equipment/equipment'// 设备列表
import programme from '@/page/programme/programme'// 方案列表
import account from '@/page/account/account'// 子账号
import empower from '@/page/empower/empower'// 已授权模块
import customer from '@/page/customer/customer'// 客服中心
import memberDetails from '@/page/member/memberDetails'// 会员详情
import equipmentDetails from '@/page/equipment/equipmentDetails'// 设备使用记录
import programmeDetails from '@/page/programme/programmeDetails'// 方案名称
import accountDetails from '@/page/account/accountDetails'// 子账号详情
import empowerDetails from '@/page/empower/empowerDetails'// 模块详情
import empowerStage from '@/page/empower/empowerStage'// 已授权模块课程列表
import empowerStageDetails from '@/page/empower/empowerStageDetails'// 课程详情

import login from '@/page/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/personal',
      meta: {
        title: '首页',
        requireAuth: true
      },
      children: [{
        path: '/personal',
        name: 'personal',
        component: personal
      },
      {
        path: '/member',
        name: 'member',
        component: member
      },
      {
        path: '/memberDetails',
        name: 'memberDetails',
        component: memberDetails
      },
      {
        path: '/equipment',
        name: 'equipment',
        component: equipment
      },
      {
        path: '/equipmentDetails',
        name: 'equipmentDetails',
        component: equipmentDetails
      },
      {
        path: '/programme',
        name: 'programme',
        component: programme
      },
      {
        path: '/programmeDetails',
        name: 'programmeDetails',
        component: programmeDetails
      },
      {
        path: '/account',
        name: 'account',
        component: account
      },
      {
        path: '/accountDetails',
        name: 'accountDetails',
        component: accountDetails
      },
      {
        path: '/empower',
        name: 'empower',
        component: empower
      },
      {
        path: '/empowerDetails',
        name: 'empowerDetails',
        component: empowerDetails
      },
      {
        path: '/empowerStage',
        name: 'empowerStage',
        component: empowerStage
      },
      {
        path: '/empowerStageDetails',
        name: 'empowerStageDetails',
        component: empowerStageDetails
      },
      {
        path: '/customer',
        name: 'customer',
        component: customer
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录',
        requireAuth: true
      }
    }
  ]
})
