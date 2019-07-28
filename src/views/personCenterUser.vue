<template>
  <div class="quotation">
    <a-row>
      <a-col class="gutter-row" :span="8">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">用户名 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input v-model="passData.userName" placeholder="请输入用户名"/>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="8">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">旧密码 ：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input v-model="passData.oldPassword" placeholder="请输入旧密码"/>
            </a-col>
          </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="8">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">新密码 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input v-model="passData.newPassword" placeholder="请输入新密码"/>
          </a-col>
        </div>
      </a-col>
    </a-row>


    <a-row>
      <a-col class="gutter-row" :span="8">
        <div class="inputPart">
          <a-col class="gutter-row" :offset="5" :span="6">
            <a-button type="primary" @click="changePassWord()">确定修改</a-button>
          </a-col>

        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
    import router from '../router';
    import store from '../store'


    export default {
        methods: {
            changePassWord(){
                this.$post('/user/updatePassword',this.passData).then((reData)=>{
                    if(reData.code==200){
                        this.$notification.open({
                            message: '密码修改成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }else {
                        this.$notification.open({
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })
            },

            handleChange(value) {
                console.log(`selected ${value}`);
            }
            , choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
            ,onChange(date, dateString) {
                console.log(date, dateString);
            }
        },
        mounted() {
            store.commit('changeStore',{key:'title',val:'修改密码'});
        },
        data() {
            return {
               passData:{
                   userName:'',
                   newPassword:'',
                   oldPassword:'',
               }
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
</style>