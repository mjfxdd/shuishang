<template>
  <a-locale-provider :locale="zh_CN">

  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo">
        <img src="../assets/logoF.jpg" width="100%" alt="">
      </div>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['']" :style="{ textAlign: 'left' }">
        <a-menu-item key="1" @click="choseWhich('/','首页')"><a-icon type="rocket" />首页</a-menu-item>
        <a-sub-menu
                key="1"
        >
          <span slot="title"><a-icon type="rocket" /><span>基础功能</span></span>
          <a-menu-item key="11" @click="choseWhich('/userList','账号管理')">账号管理</a-menu-item>
          <a-menu-item key="12" @click="choseWhich('/roleList','角色管理')">角色管理</a-menu-item>
          <a-menu-item key="13" @click="choseWhich('/gameList','赛事管理')">赛事管理</a-menu-item>
          <a-menu-item key="14" @click="choseWhich('/playerList','运动员管理')">运动员管理</a-menu-item>
          <a-menu-item key="15" @click="choseWhich('/downEX','报表下载')">报表下载</a-menu-item>

        </a-sub-menu>

        <a-menu-item key="3" @click="loginOut()"><a-icon type="rocket" />退出登录</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <div class="modelName">{{$store.state.title}}</div>
      <!--<a-layout-header :style="{ background: '#fff', padding: 0 }" />-->
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div class="conRoom" :style="{ padding: '24px', background: '#fff', textAlign: 'center' }" >
          <router-view/>
        </div>
        <loading v-if="$store.state.loading"></loading>
        <a-modal
                title="温馨提示"
                :visible="$store.state.alertTip"
                @ok="handleOkDel"
                @cancel="handleCancel"
        >
          <p>{{this.$store.state.tipText}}</p>
        </a-modal>
      </a-layout-content>
      <!--<a-layout-footer :style="{ textAlign: 'center' }">-->
       <!--CUPSHE ERP ©2019 Created by Technology Department-->

      <!--</a-layout-footer>-->
    </a-layout>
  </a-layout>


  </a-locale-provider>

</template>

<script>
    import $ from 'jquery'
    import router from '../router';
    import store from '../store'
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');

    export default {
        name: "",
        components: {
        },
        data() {
            return {
                zh_CN,
            }
        },
        methods: {
            handleOkDel() {
                store.commit('changeStore',{key:'alertTip',val:false});
                router.push('/index')
            },
            handleCancel () {
                store.commit('changeStore',{key:'alertTip',val:false});
                router.push('/index')
            },
            choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
            ,loginOut(){
                sessionStorage.setItem("token",'');
                sessionStorage.setItem("userId",'');
                sessionStorage.setItem("userName",'');
                sessionStorage.setItem("categoryId",'')
                store.commit('changeStore',{key:'userName',val:''});
                router.push("/")
            }
        },
        mounted() {
            store.commit('changeStore',{key:'userId',val:sessionStorage.getItem("userId")});
            store.commit('changeStore',{key:'token',val:sessionStorage.getItem("token")});

            $(".conRoom").css('min-height',$(window).height()-60)
            if(sessionStorage.getItem("categoryId") == 1){
                router.push('/')
            }
        }
    }
</script>
<style scoped>
  #components-layout-demo-fixed-sider .logo[data-v-fae5bece] {
    height: 68px;
    background: rgb(255, 255, 255);
    margin: 16px;
    padding: 6px;
  }
  .modelName{
    font-size: 22px;
    width: 100%;
    text-align: left;
    text-indent: 20px;
    padding: 15px 4px;
    height: 36px;
  }
</style>
