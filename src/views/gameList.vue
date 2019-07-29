<template>
  <div class="producetList">
    <a-row>
      <a-col class="gutter-row" :span="12">
          <div class="inputPart">
            <!--<a-col class="gutter-row" :span="2">-->
              <!--<div class="inputName">赛事状态：</div>-->
            <!--</a-col>-->
            <a-col class="gutter-row" style="text-align: left" :span="24">
              <template>
                赛事状态：
                <a-checkbox-group @change="onChange">
                  <a-row>
                    <a-checkbox value="1">草稿</a-checkbox>
                    <a-checkbox value="2">已提交</a-checkbox>
                    <a-checkbox value="3">报名未开始</a-checkbox>
                    <a-checkbox value="4">报名中</a-checkbox>
                    <a-checkbox value="5">报名已结束</a-checkbox>
                  </a-row>
                </a-checkbox-group>
              </template>
            </a-col>
          </div>
      </a-col>
      <a-col class="gutter-row"  :span="4" :offset="8">
        <a-button type="primary" @click="addAccount()">新增</a-button>
        <a-button type="primary" @click="search()">搜索</a-button>
      </a-col>
    </a-row>

    
    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="productListData" :pagination="pagination"  :loading="loading"  @change="handleTableChange" >
       <span slot="action" slot-scope="text, record">
                      <div v-if="text.status==1">
                        <a @click="deleteUser(text.id,text.matchName)">删除</a>
                        <a-divider type="vertical" />
                        <a @click="editGame(text.id)">编辑</a>
                        <a-divider type="vertical" />
                        <a @click="editCompetitionEvents(text.id,text.competitionEventId)">项目管理</a>
                        <a-divider type="vertical" />
                        <a @click="submitMatch(text.id)">提交赛事</a>
                         <a-divider type="vertical" />
                          <a @click="seeTable(text.id)">报名表审核</a>
                      </div>
                        <div v-if="text.status!=1">
                              <span  @click="seeGame(text.id)" style="text-decoration: underline;cursor: pointer">查看</span>
                              <a-divider type="vertical" />
                               <a @click="seeTable(text.id)">报名表审核</a>
                        </div>



          </span>
      <span slot="status" slot-scope="text, record">
                    <span v-if="text.status==1">草稿</span>
                    <span v-if="text.status==2">已提交</span>
                    <span v-if="text.status==3">报名未开始</span>
                    <span v-if="text.status==4">报名中</span>
                    <span v-if="text.status==5">报名已结束</span>
      </span>
    </a-table>

    <a-modal
            title="赛事信息"
            v-model="visible"
            destroyOnClose="true"
            @ok="handleOk"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">赛事名称：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.matchName" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">竞赛项目：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select :defaultValue="addGame.competitionEventId" style="width: 100%" @change="handleChangeSelect">
                <a-select-option v-for="item in competitionEvents" :value="item.id">{{item.name}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">开始时间：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
                <a-date-picker  v-if="!isEdit"  @change="onChangeStartTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>
                <a-date-picker  v-if="isEdit" :defaultValue="moment(addGame.startTime, dateFormat)" :format="dateFormat" @change="onChangeStartTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">结束时间：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
                <a-date-picker v-if="!isEdit"  @change="onChangeEndTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>

                <a-date-picker  v-if="isEdit" :defaultValue="moment(addGame.endTime, dateFormat)" :format="dateFormat"  @change="onChangeEndTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>
            </a-col>
          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">举办省名：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.province" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">举办市名：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.city" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">赛事简介：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.matchIntroduction" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">赛事规则：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-textarea v-model="addGame.matchRule" :rows="4"/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">参赛规则：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-textarea v-model="addGame.qualification" :rows="4"/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">报名时间：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
                <a-date-picker v-if="!isEdit" @change="onChangeSignUpStartTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>

                <a-date-picker v-if="isEdit" :defaultValue="moment(addGame.signUpStartTime, dateFormat)" :format="dateFormat" @change="onChangeSignUpStartTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">截止时间：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
                <a-date-picker v-if="!isEdit"   @change="onChangeSignUpEndTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>

                <a-date-picker v-if="isEdit"   :defaultValue="moment(addGame.signUpEndTime, dateFormat)" :format="dateFormat" @change="onChangeSignUpEndTime" showTime="true" format="YYYY-MM-DD HH:mm" :style="{width: '100%'}"/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">主办单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.organizers" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">承办单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.contractor" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>

      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">协办单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.coSponsors" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">赞助单位：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.sponsor" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">技术支持：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="addGame.technicalSupport" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
    </a-modal>
    <a-modal
            title="赛事项目管理"
            v-model="visibleEdit"
            destroyOnClose="true"
            @ok="handleEditOk"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">赛事类型：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select defaultValue="请选择赛事类型" style="width: 90%" @change="handleChangeMatchType">
                <a-select-option :value="item.id" v-for="item in editCompetitionEventData.matchTypeList">{{item.matchTypeName}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">赛项组别：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select defaultValue="请选择赛项组别" :value="editCompetitionSend.itemGroupId" style="width: 90%" @change="handleChangeGroup">
                <a-select-option :value="item.id" v-for="item in editCompetitionEventData.GroupByCompetitionEventList">{{item.groupName}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">赛艇种类：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">


              <a-select defaultValue="请选择赛艇种类" :value="editCompetitionSend.rowingTypeId" style="width: 90%" @change="handleChangeRowingType">
                <a-select-option :value="item.id" v-for="item in editCompetitionEventData.RowingTypeList">{{item.name}}</a-select-option>
              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">性别选择：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-select :defaultValue="editCompetitionSend.attributeJson[0].attributeValue" :value="editCompetitionSend.attributeJson[0].attributeValue" style="width: 90%" @change="handleChangeSex">
                <a-select-option value="男子">男子</a-select-option>
                <a-select-option value="女子">女子</a-select-option>
                <a-select-option value="混合">混合</a-select-option>

              </a-select>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">比赛距离：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input style="width: 90%" v-model="editCompetitionSend.attributeJson[1].attributeValue" placeholder=""/>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">项目列表：</div>
            </a-col>
          </div>
        </a-col>
      </a-row>
      <a-row v-for="(item,index) in competitionList">
        <a-col :span="20">   {{index+1}}.{{item.projectName}}</a-col>
        <a-col :span="4"><a-icon @click="delCompetition(item.id)" type="close" /></a-col>
      </a-row>





    </a-modal>

      <a-modal
              title="赛事查看"
              v-model="visibleSee"
              destroyOnClose="true"
              footer=''

      >
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">赛事名称：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.matchName" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">竞赛项目：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-select :value="addGame.competitionEventId" style="width: 100%" disabled @change="handleChangeSelect">
                              <a-select-option v-for="item in competitionEvents" :value="item.id">{{item.name}}</a-select-option>
                          </a-select>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">开始时间：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.startTime" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">结束时间：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.endTime" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">举办省名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.province" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">举办市名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.city" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">赛事简介：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.matchIntroduction" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">赛事规则：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-textarea disabled="true" v-model="addGame.matchRule" :rows="4"/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">参赛规则：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-textarea disabled="true" v-model="addGame.qualification" :rows="4"/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">报名时间：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.signUpStartTime" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">截止时间：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.signUpEndTime" placeholder=""/>

                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">主办单位：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.organizers" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">承办单位：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.contractor" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">协办单位：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.coSponsors" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">赞助单位：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.sponsor" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">技术支持：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input disabled="true" v-model="addGame.technicalSupport" placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">项目列表：</div>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row v-for="(item,index) in competitionList">
              <a-col :span="20">   {{index+1}}.{{item.projectName}}</a-col>
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
            :visible="visibleSubmitMatch"
            @ok="handleOkSubmitMatch"
            @cancel="handleCancel"
    >
      <p>一旦提交将无法修改，是否确认提交？</p>
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
        { title: '赛事名称', dataIndex: 'matchName', key: 'matchName'},
        { title: '赛事地点', dataIndex: 'city', key: 'city'},
        { title: '赛事开始时间', dataIndex: 'startTime', key: 'startTime'},
        { title: '赛事结束时间', dataIndex: 'endTime', key: 'endTime'},
        {
            title: '赛事状态',
            key: 'status',
            scopedSlots: { customRender: 'status' },
        },




    ];

    const productListData = [];
    export default {
        methods: {
            moment,
            seeTable(id){
                store.commit('changeStore',{key:'matchId',val:id});
                router.push('/registerForm')

            },
            delCompetition(id){
                this.$fetch('/project/deleteProjectById',{id:id}).then((reData)=>{
                    if(reData.code==200){
                        this.getCompetitionList()
                        this.$notification.open({
                            message: '删除成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
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
            handleChangeSex(value){
                this.editCompetitionSend.attributeJson[0].attributeValue = value
            },
            getCompetitionList() {
                this.$fetch('/project/findProjectsByMatchIdAndPage',{matchId:this.editCompetitionSend.matchId,page:1,page_size:100}).then((reData)=>{
                    if(reData.code==200){
                        this.competitionList=reData.data.dataList
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
            handleChangeMatchType(value) {
                this.editCompetitionSend.matchTypeId = value
                this.$fetch('/project/findItemGroupByCompetitionEventIdAndMatchTypeId',{competitionEventId:this.editCompetitionEventData.competitionEventId,matchTypeId:value,page:1,page_size:100}).then((reData)=>{
                    if(reData.code==200){
                        this.editCompetitionEventData.GroupByCompetitionEventList=reData.data.dataList
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
            handleChangeGroup(value) {
                this.editCompetitionSend.itemGroupId = value
                this.$fetch('/project/findRowingTypeByCompetitionEventId',{competitionEventId:this.editCompetitionEventData.competitionEventId,page:1,page_size:100}).then((reData)=>{
                    if(reData.code==200){
                        this.editCompetitionEventData.RowingTypeList=reData.data.dataList
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
            handleChangeRowingType(value) {
                this.editCompetitionSend.rowingTypeId = value

            },
            handleOkSubmitMatch(){
                this.$fetch('/match/submitMatchById',{id:this.submitMatchId}).then((reData)=>{
                    if(reData.code==200){
                        this.$notification.open({
                            message: '操作成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.visibleSubmitMatch=false

                        this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize})
                        this.visibleDel=false
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
            submitMatch(id){
                this.visibleSubmitMatch=true
                this.submitMatchId=id
            },
            editCompetitionEvents(id,competitionEventId){


                this.editCompetitionEventData={
                        id:'',
                        competitionEventId:'',
                        matchTypeList:[],
                        GroupByCompetitionEventList:[],
                        RowingTypeList:[],
                        findAttributeSetList:[]
                }
                this.editCompetitionSend={
                        matchId:'',
                        competitionEventId:'',
                        matchTypeId:'',
                        itemGroupId:'请依次选择',
                        rowingTypeId:'请依次选择',
                        attributeJson:[{
                        attributeId:3,
                        attributeValue:"男子"
                    },
                        {
                            attributeId:4,
                            attributeValue:""
                        }
                    ],
                }



                this.editCompetitionEventData.id=id
                this.editCompetitionSend.competitionEventId = competitionEventId
                this.editCompetitionSend.matchId = id
                this.editCompetitionEventData.competitionEventId=competitionEventId
                this.$fetch('/project/findMatchTypeByCompetitionEventId',{id:competitionEventId,page:1,page_size:100}).then((reData)=>{
                    if(reData.code==200){
                        this.editCompetitionEventData.matchTypeList=reData.data.dataList
                        this.visibleEdit=true
                    }else {
                        this.$notification.open({
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })
                this.getCompetitionList()
            },
            onChange (checkedValues) {
                console.log('checked = ', checkedValues)
                this.checked=checkedValues
            },
            onChangeStartTime (date, dateString) {
                console.log(dateString)
                this.addGame.startTime=dateString
            },
            onChangeEndTime (date, dateString) {
                console.log(dateString)
                this.addGame.endTime=dateString
            },
            onChangeSignUpStartTime (date, dateString) {
                console.log(dateString)
                this.addGame.signUpStartTime=dateString
            },
            onChangeSignUpEndTime (date, dateString) {
                console.log(dateString)
                this.addGame.signUpEndTime=dateString
            },
            deleteUser(id,name){
                this.visibleDel=true
                this.del.id=id
                this.del.name=name
            },
            getCompetitionEvents(){
                this.$fetch('/competitionEvents/findByPage',{page:1,page_size:200}).then((reData)=>{
                    this.competitionEvents=reData.data.dataList
                    this.addGame.competitionEventId=reData.data.dataList[0].id
                })
            },
            edit(id,name){
                this.visibleEdit=true
                this.editData.userId=id
                this.editData.userName=name
            },
            search(){
                if(this.checked.length==0){
                    this.$notification.open({
                        message: '请选择查找状态后再点击 ',
                        onClick: () => {
                            console.log('Notification Clicked!');
                        },
                    });
                }else {
                    this.getList({page:1,page_size:this.pagination.defaultPageSize,statusJson:JSON.stringify(this.checked)})

                }
            },
            handleChangeSelect(value) {
                console.log(`selected ${value}`);
                this.addGame.competitionEventId= value
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
                this.$fetch('/match/findMatchByStatusAndPage',data).then((reData)=>{
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
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize,statusJson:JSON.stringify(this.checked)})
            }
            ,addAccount(){
                this.isEdit=false
                this.visible=true
                this.addGame = {
                    matchName:"",
                    competitionEventId:this.competitionEvents[0].id,
                    startTime:"",
                    endTime:"",
                    province:"",
                    city:"",
                    matchIntroduction:"",
                    matchRule:"",
                    qualification:"",
                    signUpStartTime:"",
                    signUpEndTime:"",
                    organizers:"",
                    contractor:"",
                    coSponsors:"",
                    sponsor:"",
                    technicalSupport:""
                }
            },
            seeGame(id){
                this.editId = id
                this.addGame={
                    matchName:"",
                        competitionEventId:this.competitionEvents[0].id,
                        startTime:"",
                        endTime:"",
                        province:"",
                        city:"",
                        matchIntroduction:"",
                        matchRule:"",
                        qualification:"",
                        signUpStartTime:"",
                        signUpEndTime:"",
                        organizers:"",
                        contractor:"",
                        coSponsors:"",
                        sponsor:"",
                        technicalSupport:""
                }
                this.competitionList = []
                this.$fetch('/match/loadMatchById',{id:id}).then((reData)=>{
                    if(reData.code==200){
                        this.addGame = reData.data
                        this.visibleSee=true
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
                this.$fetch('/project/findProjectsByMatchIdAndPage',{matchId:id,page:1,page_size:100}).then((reData)=>{
                    if(reData.code==200){
                        this.competitionList=reData.data.dataList
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
            editGame(id){
                this.isEdit=true
                this.editId = id
                this.$fetch('/match/loadMatchById',{id:id}).then((reData)=>{
                    if(reData.code==200){
                        this.addGame = reData.data
                        this.visible=true
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
                this.$fetch('/match/deleteMatchById',{id:this.del.id}).then((reData)=>{
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
                    this.visible = true
                    if(this.isEdit){
                        this.$fetch('/match/updateMatch',{matchBeanJson:this.addGame,id:this.editId}).then((reData)=>{
                            this.visible = false
                            if(reData.code==200){
                                this.$notification.open({
                                    message: '成功修改赛事',
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
                    }else {
                        this.$fetch('/match/addMatch',{matchBeanJson:this.addGame}).then((reData)=>{
                            this.visible = false
                            if(reData.code==200){
                                this.$notification.open({
                                    message: '成功添加赛事',
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
                this.editCompetitionSend.competitionEventId = this.editCompetitionEventData.competitionEventId
                var passData = this.editCompetitionSend
                passData.attributeJson= JSON.stringify(this.editCompetitionSend.attributeJson)

                this.$fetch('/match/addMatchProject',passData).then((reData)=>{
                    if(reData.code==200){
                        // this.visibleEdit=false
                        this.$notification.open({
                            message: '修改成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.editCompetitionEventData.GroupByCompetitionEventList=[]
                        this.editCompetitionEventData.RowingTypeList=[]
                        this.editCompetitionSend.itemGroupId='请依次选择'
                        this.editCompetitionSend.rowingTypeId='请依次选择'
                        this.editCompetitionSend.attributeJson=[
                            {
                                attributeId:3,
                                attributeValue:"男子"
                            },
                            {
                                attributeId:4,
                                attributeValue:""
                            }]

                        this.getCompetitionList()

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
                this.visibleSubmitMatch=false
                this.visibleSee=false

            }

    },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'赛事管理'});
            this.getList({page:1,page_size:10,statusJson:this.checked})
            this.getRole()
            this.getCompetitionEvents()

        },
        data() {
            return {
                dateFormat: 'YYYY-MM-DD',
                competitionList:[],
                editCompetitionEventData:{
                    id:'',
                    competitionEventId:'',
                    matchTypeList:[],
                    GroupByCompetitionEventList:[],
                    RowingTypeList:[],
                    findAttributeSetList:[]
                },
                editCompetitionSend:{
                    matchId:'',
                    competitionEventId:'',
                    matchTypeId:'',
                    itemGroupId:'请依次选择',
                    rowingTypeId:'请依次选择',
                    attributeJson:[{
                            attributeId:3,
                            attributeValue:"男子"
                        },
                        {
                            attributeId:4,
                            attributeValue:""
                        }
                    ],
                },
                editId:'',
                isEdit:false,
                submitMatchId:'',
                competitionEvents:[],
                dateFormat: 'YYYY/MM/DD',
                addGame:{
                    matchName:"",
                    competitionEventId:"",
                    startTime:"",
                    endTime:"",
                    province:"",
                    city:"",
                    matchIntroduction:"",
                    matchRule:"",
                    qualification:"",
                    signUpStartTime:"",
                    signUpEndTime:"",
                    organizers:"",
                    contractor:"",
                    coSponsors:"",
                    sponsor:"",
                    technicalSupport:""
                },
                checked:[1,2,3,4,5],
                del:{
                    name:'',
                    id:''
                },
                nowPage:1,
                searchName:'',
                visible: false,
                visibleEdit:false,
                visibleDel:false,
                visibleSubmitMatch:false,
                visibleSee:false,
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