<template>
    <div>
        <div class="headBg"></div>
        <div class="contentBody">
            <div class="head">
                <img src="../assets/logoC.jpg" width="250" alt="">
                <span class="login" v-if="$store.state.userName==''" @click="login">登录</span>
                <span class="login" v-if="$store.state.userName!=''" @click="goPersonCenter()">{{$store.state.userName}}</span>
            </div>
            <div style="height: 92px"></div>
            <a-carousel >
                <div><img src="http://xhimg.sports.cn/Image/181120/16-1Q120134914432.jpg" width="100%" alt=""></div>
                <div><img src="http://xhimg.sports.cn/Image/181120/16-1Q120134914432.jpg" width="100%" alt=""></div>
                <div><img src="http://xhimg.sports.cn/Image/181120/16-1Q120134914432.jpg" width="100%" alt=""></div>
                <div><img src="http://xhimg.sports.cn/Image/181120/16-1Q120134914432.jpg" width="100%" alt=""></div>
            </a-carousel>
            <template>
                <a-card title="赛事列表">
                    <a href="#" slot="extra">more</a>
                    <div>
                        <a-row v-for="(item,index) in gameList">
                            <a-col :span="22">
                                <div class="gameName">{{index+1}}、{{item.matchName}}</div>
                            </a-col>

                            <a-col :span="2" >
                                <a-button @click="joinGame(item.id,item.matchName)" type="primary">报名参加</a-button>
                            </a-col>
                        </a-row>
                    </div>
                </a-card>
                <div style="padding: 18px 0px;text-align: right;">
                    <a-pagination  @change="change" :defaultPageSize="pagination.defaultPageSize" :total="pagination.total" />

                </div>

            </template>
            <foot></foot>
        </div>
        <!--参加赛事报名基本信息填写-->
        <a-modal
                :title="alertTitle"
                v-model="visible"
                destroyOnClose="true"
                @ok="handleOk"
                width="800px"
        >
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">参赛队名：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.teamName" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">领队姓名：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.teamLeaderName" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">领队联系方式：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.leaderPhone" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">教练员：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.coach" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">医生：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.doctor" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">工作人员：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.personnel" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">填报人：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.operator" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">单位电话：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.workPhone" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">单位传真：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.workFax" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">男子人数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.manNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">男轻人数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.lManNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">女子人数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.womenNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">女轻人数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.lWomanNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">男领队数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.mLeaderNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">女领队数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.wLeaderNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">男教练数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.mCoachNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">女教练数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.wCoachNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">男医生数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.mDoctorNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">女医生数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.wDoctorNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">男工作人员数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.mPersonnelNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col class="gutter-row" :span="24">
                        <div class="inputPart">
                            <a-col class="gutter-row" :span="4">
                                <div class="inputName">女工作人员数：</div>
                            </a-col>
                            <a-col class="gutter-row" :span="20">
                                <a-input v-model="addGame.wPersonnelNum" placeholder=""/>
                            </a-col>
                        </div>
                    </a-col>
                </a-row>
        </a-modal>
        <!--参加赛事报名项目填写-->
        <a-modal
                :title="alertTitle2"
                v-model="visible2"
                @ok="handleOk2"
                zIndex="8"
                width="800px"
        >
            <!--<template>-->
                <!--<a-card title="赛事项目列表">-->
                    <!--<div>-->
                        <!--<a-row v-for="(item,index) in projectList">-->
                            <!--<a-col :span="20">-->
                                <!--<div class="gameName">{{index+1}}、{{item.projectName}}</div>-->
                            <!--</a-col>-->

                            <!--<a-col :span="4" >-->
                                <!--<a-button @click="joinProject(item.id)" type="primary">运动员报名</a-button>-->
                            <!--</a-col>-->
                        <!--</a-row>-->
                    <!--</div>-->
                <!--</a-card>-->
            <!--</template>-->
            您已成功报名，请到个人中心添加具体比赛项目。
        </a-modal>
        <!--项目添加运动员-->
        <a-modal
                :title="alertTitle3"
                v-model="visible3"
                @ok="handleOk3"
                zIndex="9"
                width="800px"
        >
            <template>
                <a-card title="位置">
                    <div>
                        <a-row v-for="(item,index) in postionList">
                            <a-col :span="10">
                                <div class="gameName">{{index+1}}、{{item.val}}</div>
                            </a-col>
                            <a-col :offset="2" :span="2" style="line-height: 30px"> 运动员：</a-col>
                            <a-col :span="10" >
                                <template>
                                    <a-select
                                            showSearch
                                            :value="postionList[index].athletesName"
                                            placeholder="input search text"
                                            style="width: 100%"
                                            :defaultActiveFirstOption="false"
                                            :showArrow="false"
                                            :filterOption="false"
                                            @search="handleSearch"
                                            @change="value => handleChange(value, index)"
                                            :notFoundContent="null"
                                    >
                                        <a-select-option v-for="d in data" :key="d.value">{{d.text}} </a-select-option>
                                    </a-select>
                                </template>
                            </a-col>
                        </a-row>
                    </div>
                </a-card>
            </template>
        </a-modal>
    </div>
</template>
<script>
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'
    import foot from '../components/foot'
    import jsonp from 'fetch-jsonp';
    import querystring from 'querystring';

    let timeout;
    let currentValue;

    function fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            const str = querystring.encode({
                nameKeyword: value,
            });
            jsonp(`http://106.12.61.239:8080/ERService/athletes/findAthletesByNameKeyword?${str}`)
                .then(response => response.json())
                .then((d) => {
                    if (currentValue === value) {
                        const result = d.data;
                        const data = [];
                        console.log(result)
                        result.forEach((r) => {
                            data.push({
                                // value: r.id,
                                value:{id:r.id,name:r.name} ,
                                text: r.name+'-'+r.registrantOrg+'-'+r.idCardTail,
                            });
                        });
                        callback(data);
                    }
                });
        }

        timeout = setTimeout(fake, 300);
    }
    export default {
        components:{
            foot
        },
        methods: {
            handleOk2(){
                router.push('/userHome')

            },
            handleSearch (value) {
                fetch(value, data => this.data = data);
            },
            handleChange (value,index) {
                console.log(value,index)
                this.postionList[index].positionAthletesId = value.id
                this.postionList[index].athletesName = value.name
                fetch(value, data => this.data = data);
            },
            loadProject(id){
                this.$fetch('/project/loadProjectById',{id:id}).then((reData)=>{
                    if(reData.code==200){
                        this.alertTitle3 = reData.data.projectName
                        let positionMap = reData.data.positionMap
                        let rightData=[]
                        for(let key  in positionMap ){
                         rightData.push({ "positionId":key, val:positionMap[key],"positionAthletesId":"", "athletesName":""})
                        }
                        this.postionList = rightData

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
            getProjectList(){
                this.$fetch('/project/findProjectsByMatchIdAndPage',{matchId:this.addGame.matchId,page:1,page_size:100}).then((reData)=>{
                    if(reData.code==200){
                        this.projectList=reData.data.dataList
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
            joinProject(id){
                this.visible3 = true
                this.projectId = id
                this.loadProject(id)
            },
            handleOk(){
                this.$fetch('/register/addRegisterForm',this.addGame).then((reData)=>{
                    if(reData.code==200){
                        this.visible=false
                        this.visible2= true
                        this.registerFormId = reData.data
                        this.getProjectList()
                    }else {
                        this.$notification.open({
                            duration:2,
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })


            },
            handleOk3(){
                this.$fetch('/register/addRegisterFormProject',{registerFormId:this.registerFormId,userId:this.$store.state.userId,projectId:this.projectId,projectRegisterJson:JSON.stringify(this.postionList)}).then((reData)=>{
                    if(reData.code==200){
                        this.visible3=false
                    }else {
                        this.$notification.open({
                            duration:2,
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })


            },
            joinGame(id,name){
                if(this.$store.state.userId==''){
                    this.$notification.open({
                        duration:2,
                        message: '请先登录在进行报名',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.visible=true
                    this.alertTitle = "报名赛事："+name
                    this.addGame.matchId = id
                    this.addGame.userId = this.$store.state.userId
                }


            },
            change(page,pageSize){
                this.getList({page:page,page_size:this.pagination.defaultPageSize
                    // ,statusJson:JSON.stringify(["4"])
                })
            },
            login(){
                router.push('/login')
            },
            goPersonCenter(){
                router.push('/userHome')
            },
            getList(data){
                this.$fetch('/match/findMatchByStatusAndPage',data).then((reData)=>{
                    this.gameList=reData.data.dataList
                    this.pagination.total=reData.data.count
                })
            }
        } ,
        beforeCreate: function() {

            document.getElementsByTagName("body")[0].className="add_bg";

        },

        beforeDestroy: function() {

            document.body.removeAttribute("class","add_bg");

        },
        mounted() {
            if(sessionStorage.getItem("userName")){
                store.commit('changeStore',{key:'userName',val:sessionStorage.getItem("userName")});
            }

            // store.commit('changeStore',{key:'title',val:'新增产品'});
            // this.getList({page:1,page_size:this.pagination.defaultPageSize,statusJson:JSON.stringify(["4"])})
            this.getList({page:1,page_size:this.pagination.defaultPageSize})
            var name=[]
            const obj = {
                1:1,
                2:'zhangsan',
                3:18
            }

            for(let key  in obj){
                name.push(key)
                console.log(key + '---' + obj[key])
            }


        },
        data() {

            return {
                matchId:'',
                projectId:'',
                registerFormId:'',
                data: [],
                value: undefined,
                addGame:{
                    userId:'',
                    matchId:'',
                    teamName:'',
                    teamLeaderName:'',
                    leaderPhone:'',
                    coach:'',
                    doctor:'',
                    personnel:'',
                    operator:'',
                    workPhone:'',
                    workFax:'',
                    manNum:'',
                    lManNum:'',
                    womenNum:'',
                    lWomanNum:'',
                    mLeaderNum:'',
                    wLeaderNum:'',
                    mCoachNum:'',
                    wCoachNum:'',
                    mDoctorNum:'',
                    wDoctorNum:'',
                    mPersonnelNum:'',
                    wPersonnelNum:'',


                },
                visible:false,
                alertTitle:'',
                visible2:false,
                alertTitle2:'赛事项目添加',
                visible3:false,
                alertTitle3:'运动员选择',
                pagination:{
                    defaultPageSize:10,
                    total:1,
                },
                gameList:[]
                ,projectList:[]
                ,postionList:[]
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
    /* For demo */
    .ant-carousel >>> .slick-slide {
        text-align: center;
        /*line-height: 160px;*/
        /*background: #364d79;*/
        overflow: hidden;
    }

    .ant-carousel >>> .slick-slide h3 {
        color: #fff;
    }
    .contentBody{
        max-width: 1400px;
        margin: 0px auto;
    }
    .head{
        text-align: left;
        position: fixed;
        z-index: 9;
        background: white;
        width: 100%;
        max-width: 1400px;
        padding: 0px 20px;
    }

    .headBg{
        height: 92px;
        width: 100%;
        background: white;
        position: fixed;
    }
    .login{
        float: right;
        font-size: 16px;
        padding: 42px 38px 6px 24px;
        text-decoration: underline;
        font-weight: 600;
        cursor: pointer;
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

