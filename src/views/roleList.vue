<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <!--<div class="inputName">角色名称：</div>-->
            </a-col>
            <a-col class="gutter-row" :span="18">
              <!--<a-input v-model="searchName" placeholder="请输入角色名称"/>-->
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row"  :span="4" :offset="14">
        <a-button type="primary" @click="addAccount()">新增</a-button>
      </a-col>
    </a-row>

    
    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="productListData" :pagination="pagination"  :loading="loading"  @change="handleTableChange" >
       <span slot="action" slot-scope="text, record">
                      <a @click="deleteUser(text.id,text.roleName)">删除</a>
                      <a-divider type="vertical" />
                      <a @click="edit(text.id,text.roleName,text.roleDesc)">编辑</a>
          </span>
    </a-table>


    <a-modal
            title="新增角色"
            v-model="visible"
            @ok="handleOk"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">角色名称：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.roleName" placeholder="请输入角色名称"/>
            </a-col>


          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">角色描述：</div>
            </a-col>

            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.roleDesc" placeholder="请输入角色描述"/>
            </a-col>

          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">选择权限：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <!--<a-select :defaultValue="roleListData[0].id" style="width: 100%" @change="handleChangeSelect">-->
                <!--<a-select-option v-for="item in roleListData" :value="item.id">{{item.roleName}}</a-select-option>-->
              <!--</a-select>-->
              <a-select :defaultValue="roleListData[0].id" style="width: 100%" @change="handleChangeSelect">
                <a-select-option v-for="item in roleListData" :value="item.id">{{item.authorityName}}({{item.authorityDesc}})</a-select-option>

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
              <div class="inputName">角色名称：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.roleName" placeholder="请输入角色名称"/>
            </a-col>


          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">角色描述：</div>
            </a-col>

            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.roleDesc" placeholder="请输入角色描述"/>
            </a-col>

          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">选择权限：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select :defaultValue="roleListData[0].id" style="width: 100%" @change="handleEditChangeSelect">
                <a-select-option v-for="item in roleListData" :value="item.id">{{item.authorityName}}({{item.authorityDesc}})</a-select-option>

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
        { title: '角色名称', dataIndex: 'roleName', key: 'roleName'},
        { title: '角色描述', dataIndex: 'roleDesc', key: 'roleDesc'},
        { title: '角色权限', dataIndex: 'authorityName', key: 'authorityName'},




    ];

    const productListData = [];
    export default {
        methods: {
            deleteUser(id,name){
                this.visibleDel=true
                this.del.id=id
                this.del.name=name


            },
            edit(id,name,des){
                this.visibleEdit=true
                this.editData.authorityId=this.roleListData[0].id
                this.editData.roleId=id
                this.editData.roleName=name
                this.editData.roleDesc=des

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
                this.addData.authorityId= value
            },
            handleEditChangeSelect(value) {
                // console.log(`selected ${value}`);
                this.editData.authorityId= value
            }
            , choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
            ,getList(){
                this.loading = true
                this.$fetch('/system/findRoleByPage?page=1&&page_size=200').then((reData)=>{
                    this.loading = false
                    this.productListData=reData.data.dataList
                })

            }
            ,getRole(){
                this.$fetch('/system/findAuthorityByPage?page=1&&page_size=200').then((reData)=>{
                    this.roleListData=reData.data.dataList
                    this.addData.authorityId=this.roleListData[0].id
                    this.editData.authorityId=this.roleListData[0].id
                })
            }
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize})
                this.nowPage = pagination.current

            }
            ,addAccount(){
                this.visible=true
                this.addData.roleName=''
                this.addData.roleDesc=''
                this.addData.authorityId=this.roleListData[0].id

            }
            ,handleOk(e) {
                if(this.addData.roleName==''||this.addData.roleDesc==''){
                    this.$message.info('请输入完整信息后再保存');
                }else {
                    this.$fetch('/system/addRole',this.addData).then((reData)=>{
                        this.visible = false
                        if(reData.code==200){
                            this.$notification.open({
                                message: '角色添加成功',
                                onClick: () => {
                                    console.log('Notification Clicked!');
                                },
                            });
                            this.getList()
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

                this.$fetch('/system/updateRole',this.editData).then((reData)=>{
                    this.visible = false
                    if(reData.code==200){
                        this.visibleEdit=false
                        this.$notification.open({
                            message: '修改成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.getList()

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
            },
            handleOkDel(){
                this.$fetch('/system/deleteRoleById',{roleId:this.del.id}).then((reData)=>{
                    if(reData.code==200){
                        this.$notification.open({
                            message: '您已成功删除 '+this.del.name,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.getList()
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
        },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'角色管理'});
            this.getList()
            this.getRole()
        },
        data() {
            return {
                del:{
                    name:'',
                    id:''
                },
                nowPage:1,
                searchName:'',
                visible: false,
                visibleEdit:false,
                visibleDel:false,
                productListData,
                columns,
                addData:{
                    roleName:'',
                    roleDesc:'',
                    authorityId:''
                },
                editData:{
                    roleId:'',
                    roleName:'',
                    roleDesc:'',
                    authorityId:''
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