<template>
  <div>
    <a-row>
      <a-col class="gutter-row" :span="24">
        <div class="inputPart">
          <a-col class="gutter-row" :span="4">
            <div class="inputName">模板下载：</div>
          </a-col>
          <a-col class="gutter-row" style="padding-top: 6px;" :span="20">
            <a target="_blank" href="http://106.12.61.239:8080/ERService/athletes/downImportAthletesTemp">运动员批量上传模板</a>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="24">
        <div class="inputPart">
          <a-col class="gutter-row" :span="4">
            <div class="inputName">模板上传：</div>
          </a-col>
          <a-col class="gutter-row" style="padding-top: 6px;" :span="20">
            <form action="http://106.12.61.239:8080/ERService/athletes/importAthletes" id="form1" method="post" enctype="multipart/form-data">
              <input type="file" name="file"/><br/>
              <input type="hidden" v-model="$store.state.userId" name="userId" >
              <input type="hidden" v-model="$store.state.token" name="token" >

              <input style="border: none;
    background: #1890ff;
    color: white;
    width: 178px;
    height: 35px;
    margin: 36px 0px 0px 0px;
    border-radius: 3px;" type="submit"   value="表格上传"/>
            </form>
          </a-col>
        </div>
      </a-col>
    </a-row>
  </div>

</template>

<script>
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'
    import 'jquery-form'
export default {

  name: 'HelloWorld',
  props: {
    msg: String
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
