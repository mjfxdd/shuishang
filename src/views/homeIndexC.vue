<template>
    <div style="background: url('../assets/timg.jpg');background-size: 100% 100%">

        <h1 style="    line-height: 129px;">欢迎来到水尚赛事管理系统</h1>
        <img src="../assets/bg8.jpg" width="100%" alt="">
        <!--<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2379162234,2963853238&fm=26&gp=0.jpg" width="100%" alt="">-->
    </div>

</template>
<script>
    import router from '../router';
    import store from '../store'
    import moment from 'moment';
    import jsonp from 'fetch-jsonp';
    import querystring from 'querystring';





    export default {
        methods: {



    },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:''});

        },
        data() {
            return {

            }
        }
    }
</script>
<style scoped>
  .inputName{
    text-align: right;
    line-height: 34px;
  }
  .ant-row{
    margin: 10px 0;
  }
  .hrLine{
    width: 120%;
    height: 30px;
    margin-left: -30px;
    background: #f0f2f5;
  }

  .gameName{
      height: 40px;
      background: rgba(0, 255, 210, 0.16);
      line-height: 40px;
      padding-left: 18px;
      font-size: 18px;
      font-weight: 500;
      border-radius: 4px;
  }




</style>