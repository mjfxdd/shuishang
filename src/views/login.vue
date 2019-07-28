<template>
<div class="login">
  <div class="wrap" id="wrap">
    <div class="logGet">
      <!-- 头部提示信息 -->
      <div class="logD logDtip">
        <p class="p1">登录</p>
      </div>
      <!-- 输入框 -->
      <div class="lgD">
        <!--<img src="img/logName.png" width="20" height="20" alt=""/>-->
        <input v-model="postData.userName" type="text"
               placeholder="输入用户名" />
      </div>
      <div class="lgD">
        <!--<img src="img/logPwd.png" idth="20" height="20" alt=""/>-->
        <input type="password" v-model="postData.password"
               placeholder="输入用户密码" />
      </div>
      <div class="logC">
        <a><button @click="login()">登 录</button></a>
      </div>
    </div>
  </div>

  <div class="footer" id="foot">
    <div class="copyright">
      <p>Copyright © 2018  Inc. All Rights Reserved.</p>
      <div class="img">
        <i class="icon"></i><span>联系邮箱：1021252@qq.com</span>
      </div>

      <div class="img">
        <i class="icon1"></i><span>联系地址：江苏南京</span>
      </div>

      <div class="img">
        <i class="icon2"></i><span>联系电话：1526550519</span>
      </div>


    </div>

  </div>


</div>
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
                postData:{
                    password:'',
                    userName:''
                }
            }
        },
        methods: {
            choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});

            }
            ,login(){
                this.$post('/user/login',{password:this.postData.password,userName:this.postData.userName}).then((reData)=>{
                    if(reData.code==200){
                        store.commit('changeStore',{key:'userId',val:reData.data.userId});
                        store.commit('changeStore',{key:'token',val:reData.data.token});
                        sessionStorage.setItem("token", reData.data.token);
                        store.commit('changeStore',{key:'userName',val:this.postData.userName});
                        if(reData.data.categoryId==2){
                            router.push('/')
                        }else {
                            router.push('/index')
                        }



                    }else {
                        this.$notification.open({
                            duration:3,
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })
            }
        },
        mounted() {
            $("#wrap").css('min-height',$(window).height()-60)
        }
    }
</script>
<style scoped>

  *{
    margin: 0;
    padding: 0;
  }
  #wrap {
    height: 719px;
    width: 100%;
    background-image: url('../assets/bg.jpeg');
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    background-size:100% 100% ;
  }
  #head {
    height: 120px;
    width: 100%;
    background-color: #66CCCC;
    text-align: center;
    position: relative;
  }
  #foot {
    height: 126px;
    background-color: #CC9933;
    position: sticky;
    bottom: 0;
  }
  #wrap .logGet {
    height: 408px;
    width: 368px;
    position: absolute;
    background-color: #FFFFFF;
    top: 20%;
    right: 15%;
  }
  .logC a button {
    width: 100%;
    height: 45px;
    background-color: #ee7700;
    border: none;
    color: white;
    font-size: 18px;
  }
  .logGet .logD.logDtip .p1 {
    display: inline-block;
    font-size: 28px;
    margin-top: 30px;
    width: 86%;
  }
  #wrap .logGet .logD.logDtip {
    width: 86%;
    border-bottom: 1px solid #ee7700;
    margin-bottom: 60px;
    margin-top: 0px;
    margin-right: auto;
    margin-left: auto;
  }
  .logGet .lgD img {
    position: absolute;
    top: 12px;
    left: 8px;
  }
  .logGet .lgD input {
    width: 100%;
    height: 42px;
    text-indent: 2.5rem;
  }
  #wrap .logGet .lgD {
    width: 86%;
    position: relative;
    margin-bottom: 30px;
    margin-top: 30px;
    margin-right: auto;
    margin-left: auto;
  }
  #wrap .logGet .logC {
    width: 86%;
    margin-top: 0px;
    margin-right: auto;
    margin-bottom: 0px;
    margin-left: auto;
  }


  .title {
    font-family: "宋体";
    color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  /* 使用css3的transform来实现 */
    font-size: 36px;
    height: 40px;
    width: 30%;
  }

  .copyright {
    font-family: "宋体";
    color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  /* 使用css3的transform来实现 */
    height: 60px;
    width: 40%;
    text-align:center;
  }


  #foot .copyright .img {
    width: 100%;
    height: 24px;
    position: relative;
  }
  .copyright .img .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 22px;
    vertical-align: middle;
    background-image: url(%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 5px;
  }

  .copyright .img .icon1 {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 22px;
    vertical-align: middle;
    background-image: url(%E5%9C%B0%E5%9D%80.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 5px;
  }
  .copyright .img .icon2 {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-left: 22px;
    vertical-align: middle;
    background-image: url(%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 5px;
  }
  #foot .copyright p {
    height: 24px;
    width: 100%;
  }

</style>
