<template>
    <div class="producetAdd">
            <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    参赛人数统计报表生成：
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
                <a-col class="gutter-row" :span="6">
                    <div class="inputPart">
                        <a-col class="gutter-row" :span="8">
                            <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择赛事：</div>
                        </a-col>
                        <a-col class="gutter-row" :span="16">
                            <a-select  style="width: 100%" defaultValue="选择赛事" @change="handleChangeSelect1">
                                <a-select-option v-for="item in gameListData" :value="item.id">{{item.matchName}}</a-select-option>
                            </a-select>
                        </a-col>
                    </div>
                </a-col>
            </a-row>

<div style="height: 80px;"></div>

        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                参赛舟艇统计表生成：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="6" :span="18">
                        <input type="submit" v-if="!ready2" @click="readTodown2()"  class="subForm" value="下载">
                        <input type="submit" v-if="ready2" class="subForm" value="正在下载中请稍等">
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-row class="gutter-row">
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择赛事：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-select  style="width: 100%" defaultValue="选择赛事" @change="handleChangeSelect2">
                            <a-select-option v-for="item in gameListData" :value="item.id">{{item.matchName}}</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <div style="height: 80px;"></div>

        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                参赛队报名表生成：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="6" :span="18">
                        <input type="submit" v-if="!ready3" @click="readTodown3()"  class="subForm" value="下载">
                        <input type="submit" v-if="ready3" class="subForm" value="正在下载中请稍等">
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-row class="gutter-row">
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择赛事：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-select  style="width: 100%" defaultValue="选择赛事" @change="handleChangeSelect3">
                            <a-select-option v-for="item in gameListData" :value="item.id">{{item.matchName}}</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <div style="height: 80px;"></div>

        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                分项报名一览表生成：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="6" :span="18">
                        <input type="submit" v-if="!ready4" @click="readTodown4()"  class="subForm" value="下载">
                        <input type="submit" v-if="ready4" class="subForm" value="正在下载中请稍等">
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-row class="gutter-row">
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择赛事：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-select  style="width: 100%" defaultValue="选择赛事" @change="handleChangeSelect4">
                            <a-select-option v-for="item in gameListData" :value="item.id">{{item.matchName}}</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <div style="height: 80px;"></div>
        <div class="secondTitle">
            <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                单项报名汇总表生成：
            </a-col>
            <a-col class="gutter-row" :span="3">
                <a-row>
                    <a-col class="gutter-row" :offset="6" :span="18">
                        <input type="submit" v-if="!ready5" @click="readTodown5()"  class="subForm" value="下载">
                        <input type="submit" v-if="ready5" class="subForm" value="正在下载中请稍等">
                    </a-col>
                </a-row>
            </a-col>
        </div>
        <a-row class="gutter-row">
            <a-col class="gutter-row" :span="6">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="8">
                        <div class="inputName"><span style="color: red;margin-right: 5px;">*</span>选择赛事：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="16">
                        <a-select  style="width: 100%" defaultValue="选择赛事" @change="handleChangeSelect5">
                            <a-select-option v-for="item in gameListData" :value="item.id">{{item.matchName}}</a-select-option>
                        </a-select>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <div style="height: 80px;"></div>



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
            handleChangeSelect1(value){
                this.matchId1 = value
            },
            handleChangeSelect2(value){
                this.matchId2 = value
            },
            handleChangeSelect3(value){
                this.matchId3 = value
            },
            handleChangeSelect4(value){
                this.matchId4 = value
            },
            handleChangeSelect5(value){
                this.matchId5 = value
            },
            getGameList(data){
                this.$fetch('/match/findMatchByStatusAndPage',data).then((reData)=>{
                    this.gameListData=reData.data.dataList

                })
            }
            ,readTodown1(){
                if(this.matchId1==''){
                    this.$notification.open({
                        duration:2,
                        message: '请先选择赛事再下载',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.ready1 = true
                    this.$fetch('/statistics/generateAttendPeopleNumReportForm',{matchId:this.matchId1}).then((reData)=>{
                        if(reData.code==200){
                            this.ready1 = false

                            window.location.href = 'http://106.12.61.239:8080/ERService/statistics/downReport?fileName='+reData.data+'&token='+sessionStorage.getItem("token")
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

            ,readTodown2(){
                if(this.matchId2==''){
                    this.$notification.open({
                        duration:2,
                        message: '请先选择赛事再下载',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.ready2 = true
                    this.$fetch('/statistics/generateAttendBoatNumReportForm',{matchId:this.matchId2}).then((reData)=>{
                        if(reData.code==200){
                            this.ready2 = false
                            window.location.href = 'http://106.12.61.239:8080/ERService/statistics/downReport?fileName='+reData.data+'&token='+sessionStorage.getItem("token")
                        }else {
                            this.ready2 = false

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

            ,readTodown3(){
                if(this.matchId3==''){
                    this.$notification.open({
                        duration:2,
                        message: '请先选择赛事再下载',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.ready3 = true
                    this.$fetch('/statistics/generateAttendTeamReportForm',{matchId:this.matchId3}).then((reData)=>{
                        if(reData.code==200){
                            this.ready3 = false
                            window.location.href = 'http://106.12.61.239:8080/ERService/statistics/downReport?fileName='+reData.data+'&token='+sessionStorage.getItem("token")
                        }else {
                            this.ready3 = false

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

            ,readTodown4(){
                if(this.matchId4==''){
                    this.$notification.open({
                        duration:2,
                        message: '请先选择赛事再下载',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.ready4 = true
                    this.$fetch('/statistics/generateProjectOverallReportForm',{matchId:this.matchId4}).then((reData)=>{
                        if(reData.code==200){
                            this.ready4 = false

                            window.location.href = 'http://106.12.61.239:8080/ERService/statistics/downReport?fileName='+reData.data+'&token='+sessionStorage.getItem("token")
                        }else {
                            this.ready4 = false

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

            ,readTodown5(){
                if(this.matchId5==''){
                    this.$notification.open({
                        duration:2,
                        message: '请先选择赛事再下载',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.ready5 = true
                    this.$fetch('/statistics/generateProjectSummaryReportForm',{matchId:this.matchId5}).then((reData)=>{
                        if(reData.code==200){
                            this.ready5 = false

                            window.location.href = 'http://106.12.61.239:8080/ERService/statistics/downReport?fileName='+reData.data+'&token='+sessionStorage.getItem("token")
                        }else {
                            this.ready5 = false

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

            this.getGameList({page:1,page_size:100000})


        },
        data() {
            return {
                gameListData:[],
                matchId1:'',
                matchId2:'',
                matchId3:'',
                matchId4:'',
                matchId5:'',
                ready1:false,
                ready2:false,
                ready3:false,
                ready4:false,
                ready5:false,
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