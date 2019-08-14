import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'

import productList from './views/productList.vue'
import productAdd from './views/productAdd.vue'
import requisition from './views/requisition.vue'
import requisitionAdd from './views/requisitionAdd.vue'
import proofingInformation from './views/proofingInformation.vue'
import proofingAdd from './views/proofingAdd.vue'
import quotation from './views/quotation.vue'
import quotationAdd from './views/quotationAdd.vue'
import fabricInformation from './views/fabricInformation.vue'


import roleList from './views/roleList.vue'
import gameList from './views/gameList.vue'
import playerList from './views/playerList.vue'
import index from './views/index.vue'
import personCenter from './views/personCenter.vue'

import userHome from './views/userHome.vue'
import registerForm from './views/registerForm'
import personCenterUser from './views/personCenterUser'

import tableAllPlayer from './views/tableAllPlayer'
import playerListToC from './views/playerListToC'


import ceshi from './views/ceshi.vue'
Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/index',
      name: 'home',
      component: Home,
      children: [
            {
                //产品列表
                path: '/',
                name: 'productList',
                component: productList
            },{
              //产品列表-新增产品
              path: '/productAdd',
              name: 'productAdd',
              component: productAdd
          },{
              //请购单
              path: '/requisition',
              name: 'requisition',
              component: requisition
          },{
              //新增请购单
              path: '/requisitionAdd',
              name: 'requisitionAdd',
              component: requisitionAdd
          },{
              //打样信息
              path: '/proofingInformation',
              name: 'proofingInformation',
              component: proofingInformation
          },{
              //新增打样
              path: '/proofingAdd',
              name: 'proofingAdd',
              component: proofingAdd
          },{
              //报价单
              path: '/quotation',
              name: 'quotation',
              component: quotation
          },{
              //新增报价单
              path: '/quotationAdd',
              name: 'quotationAdd',
              component: quotationAdd
          },{
              //面料信息
              path: '/fabricInformation',
              name: 'fabricInformation',
              component: fabricInformation
          },{
              //面料信息
              path: '/ceshi',
              name: 'ceshi',
              component: ceshi
          },{
              //角色列表
              path: '/roleList',
              name: 'roleList',
              component: roleList
          },{
              //赛事列表
              path: '/gameList',
              name: 'gameList',
              component: gameList
          },{
              //运动员列表
              path: '/playerList',
              name: 'playerList',
              component: playerList
          },
          {
              //报名表管理
              path: '/registerForm',
              name: 'registerForm',
              component: registerForm
          },
          {
              //赛参赛人员统计表
              path: '/tableAllPlayer',
              name: 'tableAllPlayer',
              component: tableAllPlayer
          }

      ]
    },{
          //登陆
          path: '/login',
          name: 'login',
          component: login
      },{
          //首页
          path: '/',
          name: 'index',
          component: index
      },{
          //用户中心
          path: '/userHome',
          name: 'userHome',
          component: userHome,
          children: [
              {
                  //个人中心
                  path: '/',
                  name: 'personCenter',
                  component: personCenter
              },{
                  //个人中心
                  path: '/personCenterUser',
                  name: 'personCenterUser',
                  component: personCenterUser

              },{
                  //运动员管理
                  path: '/playerListToC',
                  name: 'playerListToC',
                  component: playerListToC

              }

          ]
      }
  ]
})
