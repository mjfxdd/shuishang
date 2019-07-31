<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="6">
          <div class="inputPart">
            <a-col class="gutter-row" :span="6">
              <div class="inputName">姓名：</div>
            </a-col>
            <a-col class="gutter-row" :span="18">
              <a-input v-model="searchName" placeholder="请输入运动员姓名"/>
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row" :span="6">
        <div class="inputPart">
          <a-col class="gutter-row" :span="6">
            <div class="inputName">注册单位：</div>
          </a-col>
          <a-col class="gutter-row" :span="18">
            <a-select  style="width: 100%"  v-model="registrant" @change="sexEditSelect">
              <a-select-option value="">所有单位</a-select-option>
              <a-select-option v-for = "item in registrantList" :value="item">{{item}}</a-select-option>
            </a-select>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row"  :span="4" :offset="8">
        <a-button type="primary" @click="addAccount()">新增</a-button>
        <a-button type="primary" @click="search()">搜索</a-button>
      </a-col>
    </a-row>



    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="productListData" :pagination="pagination"  :loading="loading" :scroll="{ x:3000}" @change="handleTableChange" >
       <span slot="action" slot-scope="text, record">
                      <a @click="deleteUser(text.id)">删除</a>
                      <a-divider type="vertical" />
                      <a @click="edit(text.id)">编辑</a>
          </span>
    </a-table>


    <a-modal
            title="新增运动员"
            v-model="visible"
            destroyOnClose="true"
            @ok="handleOk"
            width="980px"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">姓名：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.name" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">选择性别：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select  style="width: 100%" :value="addData.sex" @change="sexSelect">
                <a-select-option v-for = "item in sexList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">名族：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.nation" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">出生日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker style="width: 100%" @change="onChangeAddBirthday" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">身份证：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.idCard" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.registrantOrg" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">双重注册单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.registrantOrg2" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册类型：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select  style="width: 100%" :value="addData.registrantType" @change="typeSelect">
                <a-select-option v-for = "item in playsTypeList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">协议起始日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker style="width: 100%" @change="onChangeAddProtocolStartTime" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">协议结束日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker style="width: 100%" @change="onChangeAddProtocolEndTime" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">文化程度：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select   style="width: 100%" :value="addData.educationLevel"  @change="schoolSelect">
                <a-select-option v-for = "item in schoolList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">运动员等级：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select   style="width: 100%" :value="addData.level" @change="levelSelect">
                <a-select-option v-for = "item in levelList" :value="item">{{item}}</a-select-option>

              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">户籍所在地：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.domicile" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册年份：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.registrantYear" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册项目：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select   style="width: 100%" :value="addData.registrantProject" @change="typeProSelect">
                <a-select-option v-for = "item in typeList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">训练单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.trainDepart" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">双重注册协议起始日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker   style="width: 100%"  @change="onChangeAddProtocolStartTime2" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">双重注册协议结束日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker style="width: 100%"   @change="onChangeAddProtocolEndTime2" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">输送单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addData.outputDepart" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>




    </a-modal>
    <a-modal
            title="修改运动员信息"
            destroyOnClose="true"
            v-model="visibleEdit"
            @ok="handleEditOk"
            width="980px"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">姓名：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.name" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">选择性别：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select  style="width: 100%" :value="editData.sex" @change="sexEditSelect">
                <a-select-option v-for = "item in sexList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">名族：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.nation" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">出生日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker v-if="editData.birthday!=''" style="width: 100%" :defaultValue="moment(editData.birthday)"  @change="onChangeEditBirthday" />

              <a-date-picker v-else style="width: 100%" format="YYYY-MM-DD"     @change="onChangeEditBirthday" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">身份证：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.idCard" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.registrantOrg" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">双重注册单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.registrantOrg2" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册类型：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select  style="width: 100%" :value="editData.registrantType" @change="typeEditSelect">
                <a-select-option v-for = "item in playsTypeList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">协议起始日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker v-if="editData.protocolStartTime!=''" style="width: 100%" :defaultValue="moment(editData.protocolStartTime)"  @change="onChangeEditProtocolStartTime" />

              <a-date-picker v-else style="width: 100%"  @change="onChangeEditProtocolStartTime" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">协议结束日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker v-if="editData.protocolEndTime!=''" style="width: 100%" :defaultValue="moment(editData.protocolEndTime)"  @change="onChangeEditProtocolEndTime" />

              <a-date-picker v-else style="width: 100%" @change="onChangeEditProtocolEndTime" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">文化程度：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select   style="width: 100%" :value="editData.educationLevel"  @change="schoolEditSelect">
                <a-select-option v-for = "item in schoolList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">运动员等级：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select   style="width: 100%" :value="editData.level" @change="levelEditSelect">
                <a-select-option v-for = "item in levelList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">户籍所在地：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.domicile" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册年份：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.registrantYear"  placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">注册项目：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">

              <a-select   style="width: 100%" :value="editData.registrantProject" @change="typeEditProSelect">
                <a-select-option v-for = "item in typeList" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">训练单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.trainDepart" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">双重注册协议起始日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker v-if="editData.protocolStartTime2!=''" style="width: 100%" :defaultValue="moment(editData.protocolStartTime2)"  @change="onChangeEditProtocolStartTime2" />

              <a-date-picker  v-else  style="width: 100%" @change="onChangeEditProtocolStartTime2" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">双重注册协议结束日期：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-date-picker v-if="editData.protocolEndTime2!=''" style="width: 100%" :defaultValue="moment(editData.protocolEndTime2)"  @change="onChangeEditProtocolEndTime2" />

              <a-date-picker v-else style="width: 100%"  @change="onChangeEditProtocolEndTime2" />
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">输送单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="editData.outputDepart" placeholder=""/>
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
    import moment from 'moment';

    const columns = [
        {
            title: '操作',
            key: 'action',
            fixed: 'left',
            scopedSlots: { customRender: 'action' },
        },
        { title: '姓名', dataIndex: 'name', key: 'name'},
        { title: '性别', dataIndex: 'sex', key: 'sex'},
        { title: '民族', dataIndex: 'nation', key: 'nation'},
        { title: '出身日期', dataIndex: 'birthday', key: 'birthday'},
        { title: '身份证后4位', dataIndex: 'idCardTail', key: 'idCardTail'},
        { title: '注册单位', dataIndex: 'registrantOrg', key: 'registrantOrg'},
        { title: '双重注册单位', dataIndex: 'registrantOrg2', key: 'registrantOrg2'},
        { title: '注册类型', dataIndex: 'registrantType', key: 'registrantType'},
        { title: '协议起始日期', dataIndex: 'protocolStartTime', key: 'protocolStartTime'},
        { title: '协议结束日期', dataIndex: 'protocolEndTime', key: 'protocolEndTime'},
        { title: '文化程度', dataIndex: 'educationLevel', key: 'educationLevel'},
        { title: '运动员等级', dataIndex: 'level', key: 'level'},
        { title: '户籍所在地', dataIndex: 'domicile', key: 'domicile'},
        { title: '注册年份', dataIndex: 'registrantYear', key: 'registrantYear'},
        { title: '注册项目', dataIndex: 'registrantProject', key: 'registrantProject'},
        { title: '训练单位', dataIndex: 'trainDepart', key: 'trainDepart'},
        { title: '双重注册协议起始日期', dataIndex: 'protocolStartTime2', key: 'protocolStartTime2'},
        { title: '双重注册协议结束日期', dataIndex: 'protocolEndTime2',key:'protocolEndTime2'},
        { title: '输送单位', dataIndex: 'outputDepart', key: 'outputDepart'},
    ];

    const productListData = [];
    export default {
        methods: {
            moment,
            onChangeAddBirthday(date, dateString) {
                console.log(date, dateString);
                this.addData.birthday = dateString
            },
            onChangeAddProtocolStartTime(date, dateString) {
                this.addData.protocolStartTime = dateString

            },
            onChangeAddProtocolEndTime(date, dateString) {
                this.addData.protocolEndTime = dateString

            },
            onChangeAddProtocolStartTime2(date, dateString) {
                this.addData.protocolStartTime2 = dateString

            },
            onChangeAddProtocolEndTime2(date, dateString) {
                this.addData.protocolEndTime2 = dateString
            },
            onChangeEditBirthday(date, dateString) {
                console.log(date, dateString);
                this.editData.birthday = dateString
            },
            onChangeEditProtocolStartTime(date, dateString) {
                this.editData.protocolStartTime = dateString

            },
            onChangeEditProtocolEndTime(date, dateString) {
                this.editData.protocolEndTime = dateString

            },
            onChangeEditProtocolStartTime2(date, dateString) {
                this.editData.protocolStartTime2 = dateString

            },
            onChangeEditProtocolEndTime2(date, dateString) {
                this.editData.protocolEndTime2 = dateString
            },

            getOptionList(){
                this.$fetch('/athletes/loadAthletesEnum',{enumType:1}).then((reData)=>{
                    this.sexList=reData.data
                })
                this.$fetch('/athletes/loadAthletesEnum',{enumType:2}).then((reData)=>{
                    this.typeList=reData.data
                })
                this.$fetch('/athletes/loadAthletesEnum',{enumType:3}).then((reData)=>{
                    this.levelList=reData.data
                })
                this.$fetch('/athletes/loadAthletesEnum',{enumType:4}).then((reData)=>{
                    this.schoolList=reData.data
                })
                this.$fetch('/athletes/loadAthletesEnum',{enumType:5}).then((reData)=>{
                    this.playsTypeList=reData.data
                })

            },
            downFile(){
                window.open('http://ip:8080/ERService/excel/downImportAthletesTemp');
            },
            deleteUser(id){
                this.visibleDel=true
                this.del.id=id


            },
            edit(id){
                this.$fetch('/athletes/loadAthletesById',{id:id}).then((reData)=>{
                    this.editData=reData.data
                    this.visibleEdit=true
                    this.editData.id=id
                })



            },
            search(){
                if(this.searchName!=''){
                    this.$fetch('/athletes/findAthletesByQueryAndPage',{nameKeyword:this.searchName,registrantOrg:this.registrant}).then((reData)=>{
                        if(reData.data==null){
                            this.$message.info('未查询到此用户');
                        }else {
                            this.productListData=reData.data.dataList
                            this.pagination.total=1

                        }

                    })
                }else {
                    this.getList({page:1,page_size:10,nameKeyword:this.searchName,registrantOrg:this.registrant})

                }

            },
            handleChangeSelect(value) {
                console.log(`selected ${value}`);
                this.addData.roleId= value
            },
            sexSelect(value) {
                // console.log(`selected ${value}`);
                this.addData.sex= value
            },
            levelSelect(value) {
                // console.log(`selected ${value}`);
                this.addData.level= value
            },
            schoolSelect(value) {
                // console.log(`selected ${value}`);

                this.addData.educationLevel= value
            },
            typeSelect(value) {
                // console.log(`selected ${value}`);

                this.addData.registrantType= value

            },
            typeProSelect(value) {
                // console.log(`selected ${value}`);

                this.addData.registrantProject= value

            },
            typeEditProSelect(value) {
                // console.log(`selected ${value}`);

                this.editData.registrantProject= value

            },
            sexEditSelect(value) {
                // console.log(`selected ${value}`);
                this.editData.sex= value
            },
            levelEditSelect(value) {
                // console.log(`selected ${value}`);
                this.editData.level= value
            },
            schoolEditSelect(value) {
                // console.log(`selected ${value}`);

                this.editData.educationLevel= value
            },
            typeEditSelect(value) {
                // console.log(`selected ${value}`);

                this.editData.registrantType= value

            }
            , choseWhich(url,title){
                router.push(url)
                store.commit('changeStore',{key:'title',val:title});
            }
            ,getList(data){
                this.loading = true
                this.$fetch('/athletes/findAthletesByQueryAndPage',data).then((reData)=>{
                    this.productListData=reData.data.dataList
                    this.pagination.total=reData.data.count
                    this.loading = false
                })
            }
            ,getRole(){
                this.$fetch('/system/findRoleByPage?page=1&&page_size=200').then((reData)=>{
                    this.roleListData=reData.data.dataList
                    // this.addData.roleId=this.roleListData[0].id
                    // this.editData.roleId=this.roleListData[0].id

                })
            }
            ,getregistrantList(){
                this.$fetch('athletes/findRegistrantOrg').then((reData)=>{
                    this.registrantList=reData.data
                    // this.addData.roleId=this.roleListData[0].id
                    // this.editData.roleId=this.roleListData[0].id

                })
            }
            ,handleTableChange(pagination){
                console.log(pagination.defaultPageSize)
                this.nowPage = pagination.current
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize,nameKeyword:this.searchName,registrantOrg:this.registrant})
            }
            ,addAccount(){
                this.visible=true



            },
            handleOkDel(){
                this.$fetch('/athletes/deleteAthletesById',{id:this.del.id}).then((reData)=>{
                   if(reData.code==200){
                       this.$notification.open({
                           message: '成功删除',
                           onClick: () => {
                               console.log('Notification Clicked!');
                           },
                       });
                       this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,nameKeyword:this.searchName,registrantOrg:this.registrant})
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

                    this.$fetch('/athletes/addAthletes',this.addData).then((reData)=>{
                        if(reData.code==200){
                            this.$notification.open({
                                message: '成功添加运动员',
                                onClick: () => {
                                    console.log('Notification Clicked!');
                                },
                            });
                            this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,nameKeyword:this.searchName,registrantOrg:this.registrant})
                           this.addData = {
                                name:'',
                                    sex:'',
                                nation:'',
                                birthday:'',
                                idCard:'',
                                level:'',
                                registrantOrg:'',
                                registrantOrg2:'',
                                protocolStartTime:'',
                                protocolEndTime:'',
                                protocolStartTime2:'',
                                protocolEndTime2:'',
                                registrantProject:'',
                                registrantType:'',
                                educationLevel:'',
                                domicile:'',
                                registrantYear:'',
                                trainDepart:'',
                                outputDepart:'',
                            }
                            this.visible = false

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
            handleEditOk(e) {

                this.$fetch('/athletes/updateAthletes',this.editData).then((reData)=>{
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
            }

    },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'运动员管理'});
            this.getList({page:1,page_size:10,nameKeyword:this.searchName,registrantOrg:this.registrant})
            this.getRole()
            this.getOptionList()
            this.getregistrantList()
        },
        data() {
            return {
                registrant:'',
                registrantList:[],
                sexList:[],
                typeList:[],
                levelList:[],
                schoolList:[],
                playsTypeList:[],

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
                    name:'',
                    sex:'',
                    nation:'',
                    birthday:'',
                    idCard:'',
                    level:'',
                    registrantOrg:'',
                    registrantOrg2:'',
                    protocolStartTime:'',
                    protocolEndTime:'',
                    protocolStartTime2:'',
                    protocolEndTime2:'',
                    registrantProject:'',
                    registrantType:'',
                    educationLevel:'',
                    domicile:'',
                    registrantYear:'',
                    trainDepart:'',
                    outputDepart:'',
                },
                editData:{
                    id:'',
                    name:'',
                    sex:1,
                    nation:'',
                    birthday:'',
                    idCard:'',
                    level:1,
                    registrantOrg:'',
                    registrantOrg2:'',
                    protocolStartTime:'',
                    protocolEndTime:'',
                    protocolStartTime2:'',
                    protocolEndTime2:'',
                    registrantProject:'',
                    registrantType:'',
                    educationLevel:'',
                    domicile:'',
                    registrantYear:'',
                    trainDepart:'',
                    outputDepart:'',
                },
                loading: false,
                pagination:{
                    defaultPageSize:10,
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