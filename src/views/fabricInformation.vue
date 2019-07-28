<template>
  <div class="quotationAdd">
    <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    信息列表：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :offset="12" :span="12">
                            <a-button type="primary" @click="showModal()">新建</a-button>
                        </a-col>
                    </a-row>
                </a-col>
    </div>


      <a-row>
          <a-table :columns="columns"     :pagination="pagination"
                   :dataSource="data"  :scroll="{ x: 1500 }">
                 <span slot="action" slot-scope="text, record">
                      <a href="javascript:;">编辑</a>
                </span>

          </a-table>

      </a-row>



      <a-modal
              title="新建面料信息"
              v-model="visible"
              @ok="handleOk"
              width="50%"
      >

          <a-row>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">*品名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">编号：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">成分：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">克重：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">价格：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">厂家：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">地址：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
              <a-col class="gutter-row" :span="12">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="6">
                          <div class="inputName">电话：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="18">
                          <a-input placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

      </a-modal>




  </div>
</template>
<script>
    import router from '../router';
    import store from '../store'
    import $ from 'jquery'
    const columns = [
        {
            title: '操作',
            key: 'operation',
            fixed: 'left',
            scopedSlots: { customRender: 'action' },
        },
        { title: '品名', dataIndex: 'address', key: 'name'},
        { title: '编号', dataIndex: 'address', key: '1' },
        { title: '成分', dataIndex: 'address', key: '2' },
        { title: '克重', dataIndex: 'address', key: '3' },
        { title: '价格', dataIndex: 'address', key: '4' },
        { title: '厂家', dataIndex: 'address', key: '5' },
        { title: '地址', dataIndex: 'address', key: '6' },
        { title: '电话', dataIndex: 'address', key: '7' },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `test ${i}`,
            age: 32,
            address: `test${i}`,
        });
    }
    export default {
        methods: {


            onChange(date, dateString) {
                console.log(date, dateString);
            }
            ,showModal() {
                this.visible = true
            },
            handleOk(e) {
                console.log(e);
                this.visible = false
            },
        } ,
        mounted() {
            store.commit('changeStore',{key:'title',val:'面料信息'});
        },
        data() {
            return {
                data,
                columns,
                visible: false,
                pagination:{defaultPageSize:12},
                rowSelection
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
    width: 100%;
    height: 30px;
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
</style>