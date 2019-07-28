<template>
  <div class="requisitionAdd">
    <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    基础信息：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :span="12">
                            <a-button type="primary">拆单</a-button>
                        </a-col>
                        <a-col class="gutter-row" :span="12">
                            <a-button >取消</a-button>
                        </a-col>
                    </a-row>
                </a-col>
    </div>
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">*申请人：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input placeholder=""/>
            </a-col>
          </div>
      </a-col>
        <a-col class="gutter-row" :span="6">
            <div class="inputPart">
                <a-col class="gutter-row" :span="6">
                    <div class="inputName">请购日期：</div>
                </a-col>
                <a-col class="gutter-row" :span="18">
                    <a-date-picker @change="onChange" :style="{width: '100%'}"/>
                </a-col>
            </div>
        </a-col>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                  <div class="inputName">采购类型：</div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                  <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                      <a-select-option value="首选">首选</a-select-option>
                      <a-select-option value="翻单">翻单</a-select-option>
                  </a-select>
              </a-col>
          </div>
      </a-col>

        <a-col class="gutter-row" :span="6">
            <div class="inputPart">
                <a-col class="gutter-row" :span="6">
                    <div class="inputName">预计收货日期：</div>
                </a-col>
                <a-col class="gutter-row" :span="18">
                    <a-date-picker @change="onChange" :style="{width: '100%'}"/>
                </a-col>
            </div>
        </a-col>
    </a-row>




      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">备注：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-textarea placeholder="Basic usage" :rows="4"/>
                  </a-col>
              </div>
          </a-col>
      </a-row>


      <div class="secondTitle">
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
              商品：
          </a-col>
      </div>
      <a-row>
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
          </a-col>
          <a-col class="gutter-row" :span="3">
              <a-row>
                  <a-col class="gutter-row" :span="12">
                      <a-button type="primary">批量导入</a-button>
                  </a-col>
                  <a-col class="gutter-row" :span="12">
                      <a-button type="primary" @click="showModal()">选择商品</a-button>
                  </a-col>
              </a-row>
          </a-col>
      </a-row>


      <a-row>
          <a-table :columns="columns"     :pagination="pagination"
                   :dataSource="data"  :scroll="{ x: 2500 }">
                 <span slot="action" slot-scope="text, record">
                      <a href="javascript:;">删除</a>
                </span>

          </a-table>

      </a-row>



      <a-modal
              title="选择产品"
              v-model="visible"
              @ok="handleOk"
              width="70%"
      >
          <div style="height: 50px;">
              <a-col class="gutter-row" :offset="5" :span="14">
                  <a-col class="gutter-row" :span="3">
                      <div class="inputName">SKU：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="5">
                      <a-input placeholder=""/>
                  </a-col>
                  <a-col class="gutter-row"  :offset="2" :span="3">
                      <div class="inputName">商品编号：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="5">
                      <a-input placeholder=""/>
                  </a-col>
                  <a-col class="gutter-row"  :offset="2" :span="4">
                      <a-button type="primary">搜索</a-button>
                  </a-col>
              </a-col>
          </div>

          <a-row>
              <a-table :columns="columns2" :pagination="pagination"	 :dataSource="data"  :rowSelection="rowSelection"  :scroll="{ x: 2500 }">
                 <span slot="action2" slot-scope="text, record">

                </span>
              </a-table>
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
        { title: '产品名称', dataIndex: 'address', key: 'name'},
        { title: '产品编码', dataIndex: 'address', key: '1' },
        { title: '物料编码', dataIndex: 'address', key: '2' },
        { title: '供应商', dataIndex: 'address', key: '3' },
        { title: '是否启用', dataIndex: 'address', key: '4' },
        { title: '采购数量', dataIndex: 'address', key: '5' },
        { title: '单位', dataIndex: 'address', key: '6' },
        { title: '说明', dataIndex: 'address', key: '7' },
        { title: '单价', dataIndex: 'address', key: '8'},
        { title: '总金额', dataIndex: 'address', key: '9'},
        { title: '所属仓库', dataIndex: 'address', key: '10' },
        { title: '备注', dataIndex: 'address', key: '11' },
        { title: '面料类型', dataIndex: 'address', key: '12' },
        { title: '研发报价', dataIndex: 'address', key: '13' },

    ];

    const columns2 = [

        { title: '产品名称', dataIndex: 'address', key: 'name'},
        { title: '产品编码', dataIndex: 'address', key: '1' },
        { title: '物料编码', dataIndex: 'address', key: '2' },
        { title: '供应商', dataIndex: 'address', key: '3' },
        { title: '是否启用', dataIndex: 'address', key: '4' },
        { title: '采购数量', dataIndex: 'address', key: '5' },
        { title: '单位', dataIndex: 'address', key: '6' },
        { title: '说明', dataIndex: 'address', key: '7' },
        { title: '单价', dataIndex: 'address', key: '8'},
        { title: '总金额', dataIndex: 'address', key: '9'},
        { title: '所属仓库', dataIndex: 'address', key: '10' },
        { title: '备注', dataIndex: 'address', key: '11' },
        { title: '面料类型', dataIndex: 'address', key: '12' },
        { title: '研发报价', dataIndex: 'address', key: '13' },

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
            handleChangeSelect(value) {
                console.log(`selected ${value}`);
            },

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
            store.commit('changeStore',{key:'title',val:'新增请购单'});
        },
        data() {
            return {
                data,
                columns,
                columns2,
                visible: false,
                pagination:{defaultPageSize:5},
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