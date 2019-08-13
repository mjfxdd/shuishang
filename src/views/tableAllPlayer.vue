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
        <a-button type="primary" @click="goBack()">返回</a-button>
      </a-col>
    </a-row>

    
    <div class="hrLine"></div>
    <a-table bordered :columns="columns" 	:dataSource="productListData" :pagination="false" :loading="loading"  @change="handleTableChange" ></a-table>







  </div>
</template>
<script>
    import router from '../router';
    import store from '../store'
    const columns = [

        { title: '序号',align:'center', dataIndex: 'userName', key: 'userName'},
        { title: '单  位',align:'center', dataIndex: 'userName', key: 'userName'},
        { title: '运动员',align:'center', children:[
                { title: '男',align:'center', dataIndex: 'userName', key: 'userName'},
                { title: '女',align:'center', dataIndex: 'userName', key: 'userName'},
                { title: '男轻',align:'center', dataIndex: 'userName', key: 'userName'},
                { title: '女轻',align:'center', dataIndex: 'userName', key: 'userName'}
                ]},
        { title: '领队', children:[
                { title: '男',align:'center', dataIndex: 'userName', key: 'userName'},
                { title: '女',align:'center', dataIndex: 'userName', key: 'userName'},
            ]},
        { title: '教练员', children:[
                { title: '男',align:'center', dataIndex: 'userName', key: 'userName'},
                { title: '女',align:'center', dataIndex: 'userName', key: 'userName'},

            ]},
        { title: '工作人员', children:[
                { title: '男',align:'center', dataIndex: 'userName', key: 'userName'},
                { title: '女',align:'center', dataIndex: 'userName', key: 'userName'},
            ]},
        { title: '合 计',align:'center', dataIndex: 'userName', key: 'userName'},





    ];

    const productListData = [];
    export default {
        methods: {
            goBack(){
                router.push('/gameList')
            },
            getList(data){
                this.loading = true
                this.$fetch('/statistics/loadAttendPeopleNumReportForm',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.count
                    this.loading = false
                })

                this.$fetch('/system/loadOrganization').then((reData)=>{
                    this.loadOrganization=reData.data
                })
            }



    },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'赛参赛人员统计表'});
            this.getList({matchId:50})

        },
        data() {
            return {
                isShow:false,
                loadOrganization:[],
                showPassWorld:false,
                newPassword:'',
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