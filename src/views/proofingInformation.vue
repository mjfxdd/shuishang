<template>
  <div class="proofingInformation">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">CP号：</div>
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
            <div class="inputName">制版员 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%" @change="handleChange">
              <a-select-option value="100%纯棉">张三</a-select-option>
              <a-select-option value="80%纯棉">李四</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">工艺员 ：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%" @change="handleChange">
              <a-select-option value="100%纯棉">张三</a-select-option>
              <a-select-option value="80%纯棉">李四</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">供应商：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
              <a-select-option value="jack">南京卡佩西</a-select-option>
              <a-select-option value="lucy">zara</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">审核状态：</div>
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
            <div class="inputName">是否确认：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select defaultValue="请选择" style="width: 100%"  @change="handleChange">
              <a-select-option value="jack">待确认</a-select-option>
              <a-select-option value="lucy">已确认</a-select-option>
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
                <a-button type="primary" @click="choseWhich('/proofingAdd','新增打样')">新增</a-button>
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
        { title: '产品名称', dataIndex: 'address', key: '1'},
        { title: '产品CP', dataIndex: 'address', key: '2'},
        { title: '产品图片', dataIndex: 'address', key: '3'},
        { title: '供应商', dataIndex: 'address', key: '4'},
        { title: '设计师', dataIndex: 'address', key: '5'},
        { title: '制版师', dataIndex: 'address', key: '6'},
        { title: '打样员', dataIndex: 'address', key: '7'},
        { title: '工艺员', dataIndex: 'address', key: '8'},
        { title: '次数', dataIndex: 'address', key: '9'},
        { title: '提交人', dataIndex: 'address', key: '10'},
        { title: '确认状态', dataIndex: 'address', key: '11'},
        { title: '寄送时间', dataIndex: 'address', key: '12'},
        { title: '回样时间', dataIndex: 'address', key: '13'},
        { title: '物流信息', dataIndex: 'address', key: '14'},
        { title: '创建时间', dataIndex: 'address', key: '15'},
        { title: '是否合格', dataIndex: 'address', key: '16'},
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
            }
            , choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
        },
        mounted() {
            store.commit('changeStore',{key:'title',val:'打样信息'});
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