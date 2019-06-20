import {post, get} from './http.js'

// let base = 'http://192.168.10.6:8088' // 本地接口IP
// let base = 'http://101.37.65.245'
let base = 'http://119.23.201.136:8088'

// 登录
export const sendCode = params => { return post(`${base}/gym/login/sendCode`, params) }// 验证码登录
export const login = params => { return post(`${base}/gym/login/phoneLogin`, params) }// 手机号登录
export const wxChat = params => { return get(`${base}/gym/login/wxLoginCheck`, params) }// 微信二维码登录
export const wxUserInfo = params => { return get(`${base}/gym/customer/selectCustomerByOpenid`, params) }// 查询用户信息
export const wxLoginPhone = params => { return post(`${base}/gym/login/wxLoginBindingPhone`, params) }// 绑定手机

// 个人信息
export const userUpdate = params => { return post(`${base}/gym/customer/updateCustomer`, params) }// 个人信息修改

// 会员列表
export const selectMember = params => { return get(`${base}/gym/customer/selectAllMember`, params) }// 会员信息列表

// 设备列表
export const selectEquipment = params => { return get(`${base}/gym/customer/selectAllEquipment`, params) }// 设备信息列表

// 方案列表
export const selectProgramme = params => { return get(`${base}/gym/customer/selectAllPlan`, params) }// 方案信息列表
export const selectProgrammeDetails = params => { return get(`${base}/gym/customer/selectModuleByIds`, params) }// 方案下所有模块信息列表

// 子账号
export const selectAccount = params => { return get(`${base}/gym/customer/selectAllSubAccount`, params) }// 子账号列表
export const addAccount = params => { return post(`${base}/gym/customer/insertSubAccount`, params) }// 添加子账号
export const selectAccountDetails = params => { return get(`${base}/gym/customer/selectSubAccountDetail`, params) }// 子账号详情模块列表
export const accountDel = params => { return post(`${base}/gym/customer/deleteSubAccount`, params) }// 删除子账号
export const accountUpdate = params => { return post(`${base}/gym/customer/updateSubAccountStatus`, params) }// 修改子账号状态
export const accountDetailsUpdate = params => { return post(`${base}/gym/customer/updateSubAccountModuleStatus`, params) }// 修改子账号模块状态

// 已授权模块
export const selectEmpower = params => { return get(`${base}/gym/customer/selectAllModule`, params) }// 已授权模块列表
export const selectEmpowerDetails = params => { return get(`${base}/gym/customer/selectStageByModelId`, params) }// 模块下所有阶段信息
export const selectEmpowerStage = params => { return get(`${base}/gym/customer/selectCourseByStageId`, params) }// 模块下所有课程信息
export const selectEmpowerStageDetails = params => { return get(`${base}/gym/customer/selectCourseDetail`, params) }// 课程详情

// 反馈信息
export const customer = params => { return post(`${base}/gym/customer/insertFeedback`, params) }// 已授权模块列表
