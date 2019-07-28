<template>
  <div class="proofingAdd">
    <div class="secondTitle">
                <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
                    基础信息：
                </a-col>
                <a-col class="gutter-row" :span="3">
                    <a-row>
                        <a-col class="gutter-row" :span="12">
                            <a-button type="primary">保存</a-button>
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
              <div class="inputName">*CP号：</div>
            </a-col>
            <a-col class="gutter-row" :span="12">
              <a-input placeholder="请输入产品名称"/>
            </a-col>
              <a-col class="gutter-row" :span="6">
                  <a-button type="primary" @click="showProductModal()">选择商品</a-button>
              </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                  <div class="inputName">制版员：</div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                  <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                      <a-select-option value="件">张三</a-select-option>
                      <a-select-option value="件">李四</a-select-option>

                  </a-select>
              </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
              <a-col class="gutter-row" :span="6">
                  <div class="inputName">寄送时间：</div>
              </a-col>
              <a-col class="gutter-row" :span="18">
                <a-date-picker @change="onChange" :style="{width: '100%'}"/>
              </a-col>
          </div>
      </a-col>
        <a-col class="gutter-row" :span="6">
            <div class="inputPart">
                <a-col class="gutter-row" :span="6">
                    <div class="inputName">打样员：</div>
                </a-col>
                <a-col class="gutter-row" :span="18">
                    <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                        <a-select-option value="100%纯棉">张三</a-select-option>
                        <a-select-option value="棉麻混合">李四</a-select-option>
                    </a-select>
                </a-col>
            </div>
        </a-col>

    </a-row>

      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">图片 ：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <img @click="showModal()"  class="picIco" height="80" width="100" src="http://static1.kapeixi.cn/static1/2019/03/04/20190304135742_20190304135742.png" alt="">
                  </a-col>
              </div>
          </a-col>

          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">回样时间：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-date-picker @change="onChange" :style="{width: '100%'}"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">设计师：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder="请输入产品名称"/>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">物流信息：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder=""/>
                  </a-col>
              </div>
          </a-col>
      </a-row>


      <a-row>
          <!--<a-col class="gutter-row" :span="6">-->
              <!--<div class="inputPart">-->
                  <!--<a-col class="gutter-row" :span="6">-->
                      <!--<div class="inputName">研发报价：</div>-->
                  <!--</a-col>-->
                  <!--<a-col class="gutter-row" :span="18">-->
                      <!--<a-input placeholder="请输入研发报价"/>-->
                  <!--</a-col>-->
              <!--</div>-->
          <!--</a-col>-->
          <a-col class="gutter-row" :span="6" :offset="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">供应商：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                          <a-select-option value="100%纯棉">卡佩西</a-select-option>
                          <a-select-option value="80%纯棉">圣罗兰</a-select-option>
                          <a-select-option value="棉麻混合">zare</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">工艺员：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                          <a-select-option value="100%纯棉">张三</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">打样类型：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-select defaultValue="请选择" style="width: 100%" @change="handleChangeSelect">
                          <a-select-option value="100%纯棉">样板房打样</a-select-option>
                          <a-select-option value="80%纯棉">供应商打样</a-select-option>
                      </a-select>
                  </a-col>
              </div>
          </a-col>
      </a-row>



      <a-row>
          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">打样申请时间：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-date-picker @change="onChange" :style="{width: '100%'}"/>
                  </a-col>
              </div>
          </a-col>

          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">第几次打样：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input placeholder=""/>
                  </a-col>
              </div>
          </a-col>

          <a-col class="gutter-row" :span="6">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="6">
                      <div class="inputName">是否合格：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="18">
                      <a-input  placeholder=""/>
                  </a-col>
              </div>
          </a-col>
      </a-row>


      <div class="secondTitle">
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
              产品意见：
          </a-col>
      </div>


      <a-row>
          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">产品意见：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="20">
                       <a-textarea placeholder="Basic usage" :rows="4"/>
                  </a-col>
              </div>
          </a-col>

          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">反馈图片：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="20">
                      <div class="clearfix">
                          <a-upload
                                  action="//jsonplaceholder.typicode.com/posts/"
                                  listType="picture-card"
                                  :fileList="fileList"
                                  @preview="handlePreview"
                                  @change="handleChange"
                          >
                              <div v-if="fileList.length < 3">
                                  <a-icon type="plus" />
                                  <div class="ant-upload-text">Upload</div>
                              </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                              <img alt="example" style="width: 100%" :src="previewImage" />
                          </a-modal>
                      </div>
                  </a-col>
              </div>
          </a-col>
      </a-row>


      <div class="secondTitle">
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
              板房意见：
          </a-col>
      </div>


      <a-row>
          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">板房意见：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="20">
                      <a-textarea placeholder="Basic usage" :rows="4"/>
                  </a-col>
              </div>
          </a-col>

          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">反馈图片：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="20">
                      <div class="clearfix">
                          <a-upload
                                  action="//jsonplaceholder.typicode.com/posts/"
                                  listType="picture-card"
                                  :fileList="fileList"
                                  @preview="handlePreview"
                                  @change="handleChange"
                          >
                              <div v-if="fileList.length < 3">
                                  <a-icon type="plus" />
                                  <div class="ant-upload-text">Upload</div>
                              </div>
                          </a-upload>
                          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                              <img alt="example" style="width: 100%" :src="previewImage" />
                          </a-modal>
                      </div>
                  </a-col>
              </div>
          </a-col>
      </a-row>


      <div class="secondTitle">
          <a-col class="gutter-row" :span="21" style="padding-top: 13px;">
              样板尺寸：
          </a-col>
      </div>

      <a-row>
          <a-col class="gutter-row" :span="8">
              <div class="inputPart">
                  <a-col class="gutter-row" :span="4">
                      <div class="inputName">尺寸表：</div>
                  </a-col>
                  <a-col class="gutter-row" :span="12">
                      <a-input placeholder=""/>
                  </a-col>
                  <a-col class="gutter-row" :span="6">
                      <a-button type="primary">下载/预览</a-button>
                  </a-col>
              </div>
          </a-col>
      </a-row>

      <a-row>
          <a-col class="gutter-row" :span="8">
              <div class="inputPart">

                  <a-col class="gutter-row" :offset="4" :span="4" >
                      <template>
                          <a-upload name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/" :headers="headers" @change="handleChangeZip">
                              <a-button>
                                  <a-icon type="upload" /> Click to Upload
                              </a-button>
                          </a-upload>
                      </template>
                  </a-col>
              </div>
          </a-col>
      </a-row>



      <a-modal
              title="图片预览"
              v-model="visible"
              :footer="null"
              width="70%"
              :style="{'text-align':'center'}"
      >

          <img   src="http://static1.kapeixi.cn/static1/2019/03/04/20190304135742_20190304135742.png" alt="">


      </a-modal>


      <a-modal
              title="选择产品"
              v-model="visible2"
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
    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `test ${i}`,
            age: 32,
            address: `test${i}`,
        });
    }

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
    export default {
        methods: {
            handleChangeSelect(value) {
                console.log(`selected ${value}`);
            },
            handleCancel () {
                this.previewVisible = false
            },
            handlePreview (file) {
                this.previewImage = file.url || file.thumbUrl
                this.previewVisible = true
            },
            handleChange ({ fileList }) {
                this.fileList = fileList
            },
            handleChangeZip(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },
            onChange(date, dateString) {
                console.log(date, dateString);
            }
            ,showModal() {
                this.visible = true
            }
            ,showProductModal() {
                this.visible2 = true
            },
            handleOk(e) {
                console.log(e);
                this.visible = false
            },

        } ,
        mounted() {
            store.commit('changeStore',{key:'title',val:'新增打样'});
        },
        data() {
            return {
                previewVisible: false,
                previewImage: '',
                fileList: [],
                headers: {
                    authorization: 'authorization-text',
                },
                visible: false,
                visible2:false,
                data,
                columns2,
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
    .picIco{
        position: absolute;
        left: 0;
    }
</style>