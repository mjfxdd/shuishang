<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">账号名称：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input v-model="searchName" placeholder="请输入账号名称"/>
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row"  :span="4" :offset="14">
        <a-button type="primary" @click="addAccount()">新增</a-button>
        <a-button type="primary" @click="search()">搜索</a-button>
      </a-col>
    </a-row>

    
    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="productListData" :pagination="pagination"  :loading="loading"  @change="handleTableChange" >
       <span slot="action" slot-scope="text, record">
                      <a @click="deleteUser(text.id,text.userName)">删除</a>
                      <a-divider type="vertical" />
                      <a @click="reSetPassworld(text.id,text.userName)">重置密码</a>
                      <a-divider type="vertical" />
                      <a @click="edit(text.id,text.userName)">编辑</a>
          </span>
    </a-table>


    <a-modal
            title="新增账户"
            v-model="visible"
            @ok="handleOk"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">账号名称：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.userName" placeholder="请输入账号名称"/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">选择角色：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select :defaultValue="roleListData[0].id" style="width: 100%" @change="handleChangeSelect">
                <a-select-option v-for="item in roleListData" :value="item.id">{{item.roleName}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>




    </a-modal>
    <a-modal
            title="修改账户"
            v-model="visibleEdit"
            @ok="handleEditOk"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">账号名称：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.userName" placeholder="请输入账号名称"/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">选择角色：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select :defaultValue="roleListData[0].id" style="width: 100%" @change="handleEditChangeSelect">
                <a-select-option v-for="item in roleListData" :value="item.id">{{item.roleName}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
    </a-modal>



        <a-modal
                title="警告"
                :visible="visibleDel"
                @ok="handleOkDel"
                @cancel="handleCancel"
        >
          <p>确认要删除 {{del.name}}？</p>
        </a-modal>
    <a-modal
            title="警告"
            :visible="visibleRes"
            @ok="handleOkRes"
            @cancel="handleCancel"
    >
      <p>确认要重置密码 ？</p>
    </a-modal>

  </div>
</template>
<script>
    import router from '../router';
    import store from '../store'
    const columns = [
        {
            title: '操作',
            key: 'action',
            fixed: 'left',
            scopedSlots: { customRender: 'action' },
        },
        { title: '账户名称', dataIndex: 'userName', key: 'userName'},
        { title: '账户角色', dataIndex: 'roleName', key: 'roleName'},


    ];

    const productListData = [];
    export default {
        methods: {
            reSetPassworld(id,name){
                this.visibleRes=true
                this.resetPassworld = name
            },

            deleteUser(id,name){
                this.visibleDel=true
                this.del.id=id
                this.del.name=name


            },
            edit(id,name){
                this.visibleEdit=true
                this.editData.userId=id
                this.editData.userName=name
            },
            search(){
                if(this.searchName!=''){
                    this.$fetch('/user/loadUserByUserName',{userName:this.searchName}).then((reData)=>{
                        if(reData.data==null){
                            this.$message.info('未查询到此用户');
                        }else {
                            this.productListData=[]
                            this.pagination.total=1
                            this.productListData.push(reData.data)
                        }

                    })
                }else {
                    this.$message.info('请输入增账户名称');
                }

            },
            handleChangeSelect(value) {
                console.log(`selected ${value}`);
                this.addData.roleId= value
            },
            handleEditChangeSelect(value) {
                // console.log(`selected ${value}`);
                this.editData.roleId= value
            }
            , choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
            ,getList(data){
                this.loading = true
                this.$fetch('/user/findUserByPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.count
                    this.loading = false
                })
            }
            ,getRole(){
                this.$fetch('/system/findRoleByPage?page=1&&page_size=200').then((reData)=>{
                    this.roleListData=reData.data.dataList
                    this.addData.roleId=this.roleListData[0].id
                    this.editData.roleId=this.roleListData[0].id

                })
            }
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.nowPage = pagination.current
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize})
            }
            ,addAccount(){
                this.visible=true
                this.addData.userName=''
                this.addData.roleId=this.roleListData[0].id



            },
            handleOkRes(){
                this.$fetch('/user/resetPassword',{userName:this.resetPassworld}).then((reData)=>{
                    this.visible = false
                    if(reData.code==200){
                        this.$notification.open({
                            duration:null,
                            message: '请记住新账号的密码：'+reData.data,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize})

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



            },
            handleOkDel(){
                this.$fetch('/user/deleteUserById',{id:this.del.id}).then((reData)=>{
                   if(reData.code==200){
                       this.$notification.open({
                           message: '您已成功删除 '+this.del.name,
                           onClick: () => {
                               console.log('Notification Clicked!');
                           },
                       });
                       this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize})
                       this.visibleDel=false
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
            ,handleOk(e) {
                if(this.addData.userName==''){
                    this.$message.info('请输入新增账户名称');
                }else {
                    this.$fetch('/user/addUser',this.addData).then((reData)=>{
                        this.visible = false
                        if(reData.code==200){
                            this.$notification.open({
                                duration:null,
                                message: '请记住新账号的密码：'+reData.data,
                                onClick: () => {
                                    console.log('Notification Clicked!');
                                },
                            });
                            this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize})

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
            handleEditOk(e) {

                this.$fetch('/system/setUserRole',this.editData).then((reData)=>{
                    this.visible = false
                    if(reData.code==200){
                        this.visibleEdit=false
                        this.$notification.open({
                            message: '修改成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize})

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

        },
            handleCancel(){
                this.visible=false
                this.visibleEdit=false
                this.visibleDel=false
                this.visibleRes = false
            }

    },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'账户管理'});
            this.getList({page:0,page_size:10})
            this.getRole()

        },
        data() {
            return {
                resetPassworld:'',
                del:{
                    name:'',
                    id:''
                },
                nowPage:1,
                searchName:'',
                visible: false,
                visibleEdit:false,
                visibleDel:false,
                visibleRes:false,
                productListData,
                columns,
                addData:{
                    userName:'',
                    roleId:''
                },
                editData:{
                    userName:'',
                    userId:'',
                    roleId:''
                },
                loading: false,
                pagination:{
                    defaultPageSize:8,
                    total:1,
                }
                ,roleListData:[]
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