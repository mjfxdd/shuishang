import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/login.vue'
import productList from './views/productList.vue'
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
import homeIndex from './views/homeIndex'
import homeIndexC from './views/homeIndexC'
import downEX from './views/downEX'


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
              //欢迎
              path: '/',
              name: 'homeIndex',
              component: homeIndex
          },
            {
                path: '/userList',
                name: 'productList',
                component: productList
            },{
              //
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
          },
          {
              //报表下载
              path: '/downEX',
              name: 'downEX',
              component: downEX
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
          children: [  {
              //欢迎
                      path: '/',
                      name: 'homeIndexC',
                      component: homeIndexC
                  },
              {
                  //
                  path: '/registerFormC',
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
