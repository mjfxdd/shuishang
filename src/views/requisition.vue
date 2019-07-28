<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">请购单号：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input placeholder="输入请购单号"/>
            </a-col>
          </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">CP号 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入CP号"/>
          </a-col>
        </div>
      </a-col>
    </a-row>

    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">SKU：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-input placeholder="请输入SKU"/>
          </a-col>
        </div>
      </a-col>
    </a-row>

    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">预计收货日期：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-range-picker @change="onChange" />
          </a-col>
        </div>
      </a-col>
    </a-row>

    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">供应商 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%" @change="handleChange">
              <a-select-option value="南京卡佩西有限公司">南京卡佩西有限公司</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">提交人：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
              <a-select-option value="jack">张晓雅</a-select-option>
              <a-select-option value="lucy">吴玉环</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">状态：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
              <a-select-option value="jack">已审核</a-select-option>
              <a-select-option value="lucy">未审核</a-select-option>

            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-row>
              <a-col class="gutter-row" :span="6">
                <a-button type="primary">搜索</a-button>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <a-button type="primary" @click="choseWhich('/requisitionAdd','新增请购单')">新增</a-button>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <a-button type="primary">审核</a-button>
              </a-col>
              <a-col class="gutter-row" :span="6">
                <a-button type="primary">导出</a-button>
              </a-col>
            </a-row>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="data" :scroll="{ x: 2500 }">
       <span slot="action" slot-scope="text, record">
                      <a href="javascript:;">查看</a>
                      <a-divider type="vertical" />
                      <a href="javascript:;">编辑</a>
                      <a-divider type="vertical" />
                      <a href="javascript:;">审核</a>
                      <a-divider type="vertical" />
                      <a href="javascript:;">确认</a>
          </span>
    </a-table>


  </div>
</template>
<script>
    import router from '../router';
    import store from '../store'

    const columns = [
        {
            title: '操作',
            key: 'operation',
            fixed: 'left',
            scopedSlots: { customRender: 'action' },
        },
        { title: '请购单号', dataIndex: 'address', key: '1'},
        { title: '状态', dataIndex: 'address', key: '2'},
        { title: '备注', dataIndex: 'address', key: '3'},
        { title: '商品名称', dataIndex: 'address', key: '4'},
        { title: '供应商', dataIndex: 'address', key: '5'},
        { title: '总件数', dataIndex: 'address', key: '6'},
        { title: '总金额', dataIndex: 'address', key: '7'},
        { title: '货币', dataIndex: 'address', key: '8'},
        { title: '采购类型', dataIndex: 'address', key: '9'},
        { title: '请购日期', dataIndex: 'address', key: '10'},
        { title: '预计收货日期', dataIndex: 'address', key: '11'},
        { title: '申请人', dataIndex: 'address', key: '12'},
        { title: '是否质检', dataIndex: 'address', key: '13'},
        { title: '发货时间', dataIndex: 'address', key: '14'},
        { title: '采购状态', dataIndex: 'address', key: '15'},
        { title: '创建日期', dataIndex: 'address', key: '16'},

    ];

    const data = [];

    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }
    export default {
        methods: {
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            }
            ,choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
        },
        mounted() {
            store.commit('changeStore',{key:'title',val:'请购单'});
        },
        data() {
            return {
                data,
                columns,

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