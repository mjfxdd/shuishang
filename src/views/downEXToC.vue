<template>
    <div class="producetAdd">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    报名统计报表生成：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="6" :span="18">
                            <input type="submit" v-if="!ready1" @click="readTodown1()"  class="subForm" value="下载">
                            <input type="submit" v-if="ready1" class="subForm" value="正在下载中请稍等">
                        </a-col>
                    </a-row>
                </a-col>
            </div>
            <a-row class="gutter-row">
                <a-col class="gutter-row" :span="12">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="6">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择报名表：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="18">
                            <a-select  style="width: 100%" defaultValue="选择报名表" @change="handleChangeSelect1">
                                <a-select-option v-for="item in gameListData" :value="item.id" :matchId="item.matchId">{{item.matchName}}-{{item.teamName}}-{{item.coach}}-{{item.operator}} </a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>




    </div>
</template>
<script>
    import router from '../router';
    import store from '../store'
    import moment from 'moment';
    import $ from 'jquery'
    import 'jquery-form'

    export default {
        components: {

        },
        methods: {
            handleChangeSelect1(value,matchId){
                this.matchId1 = matchId.data.attrs.matchId
                this.registerFormId = value
            },

            getGameList(data){
                this.loading = true
                this.$fetch('/register/findRegisterFormByQueryAndPage',data).then((reData)=>{
                    this.gameListData=reData.data.dataList
                })
            }
            ,readTodown1(){
                if(this.matchId1==''){
                    this.$notification.open({
                        duration:2,
                        message: '请先选择报名表再下载',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.ready1 = true
                    this.$fetch('statistics/generateAttendTeamReportFormByRegisterFormId',{matchId:this.matchId1,registerFormId:this.registerFormId}).then((reData)=>{
                        if(reData.code==200){
                            this.ready1 = false

                            window.location.href = 'http://47.105.137.32:8080/ERService/statistics/downReport?fileName='+reData.data+'&token='+sessionStorage.getItem("token")
                        }else {
                            this.ready1 = false

                            this.$notification.open({
                                duration:2,
                                message:reData.msg,
                                onClick: () => {
                                    console.log('Notification Clicked!');
                                },
                            });
                        }
                    })
                }

            }


        },
        mounted() {

            var vm = this

            this.getGameList({page:1,page_size:100000,statusJson:JSON.stringify(this.checked),userId:sessionStorage.getItem("userId")})


        },
        data() {
            return {
                gameListData:[],
                matchId1:'',
                registerFormId:'',
                ready1:false,
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
    .secondTitle{
        text-align: left;
        font-size: 16px;
        font-weight: bold;
        width: 100%;
        border-bottom: 1px solid #999;
        margin-bottom: 24px;
        padding-bottom: 12px;
        box-shadow: 0 0 black;
        height: 50px;
    }
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
    .subForm{
        line-height: 1.499;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        padding: 0 15px;
        font-size: 14px;
        border-radius: 4px;
        height: 32px;
        user-select: none;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        position: relative;
        background-color: #1890ff;
        border-color: #1890ff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
        color: white;
    }

</style>