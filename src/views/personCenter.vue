<template>
  <div class="producetList">
    <!--<a-row>-->
      <!--<a-col class="gutter-row" :span="12">-->
          <!--<div class="inputPart">-->
            <!--&lt;!&ndash;<a-col class="gutter-row" :span="2">&ndash;&gt;-->
              <!--&lt;!&ndash;<div class="inputName">赛事状态：</div>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-col>&ndash;&gt;-->
            <!--<a-col class="gutter-row" style="text-align: left" :span="24">-->
              <!--<template>-->
                <!--赛事状态：-->
                <!--<a-checkbox-group @change="onChange">-->
                  <!--<a-row>-->
                    <!--<a-checkbox value="1">草稿</a-checkbox>-->
                    <!--<a-checkbox value="2">已提交</a-checkbox>-->
                    <!--<a-checkbox value="3">报名未开始</a-checkbox>-->
                    <!--<a-checkbox value="4">报名中</a-checkbox>-->
                    <!--<a-checkbox value="5">报名已结束</a-checkbox>-->
                  <!--</a-row>-->
                <!--</a-checkbox-group>-->
              <!--</template>-->
            <!--</a-col>-->
          <!--</div>-->
      <!--</a-col>-->
      <!--<a-col class="gutter-row"  :span="4" :offset="8">-->
        <!--<a-button type="primary" @click="addAccount()">新增</a-button>-->
        <!--<a-button type="primary" @click="search()">搜索</a-button>-->
      <!--</a-col>-->
    <!--</a-row>-->

    
    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="productListData" :pagination="pagination"  :loading="loading"  @change="handleTableChange" >
       <span slot="action" slot-scope="text, record">
                      <div v-if="text.status==1||text.status==4">
                        <a @click="deleteUser(text.id,text.matchName)">删除</a>
                        <a-divider type="vertical" />
                        <a @click="editGame(text.id,text.matchId)">编辑</a>
                        <a-divider type="vertical" />
                        <a @click="editCompetitionEvents(text.id,text.matchId)">项目报名</a>
                            <a-divider type="vertical" />
                        <a  @click="seeGame(text.id)" style="text-decoration: underline;cursor: pointer">查看</a>
                        <a-divider type="vertical" />
                        <a @click="submitMatch(text.id)">提交报名表</a>
                      </div>
                      <div v-if="text.status!=1 &&text.status!=4" @click="seeGame(text.id)" style="text-decoration: underline;cursor: pointer">查看</div>

          </span>
       <span slot="status" slot-scope="text, record">
                    <span v-if="text.status==1">草稿</span>
                    <span v-if="text.status==2">已提交(待审核)</span>
                    <span v-if="text.status==3">审核通过</span>
                    <span v-if="text.status==4">
                        <template>
                          <a-popover placement="left" title="被拒原因">
                            <template slot="content">
                              <p>{{text.auditInfo}}</p>
                            </template>
                            <a>审核拒绝</a>
                          </a-popover>
                        </template>
                    </span>
      </span>
    </a-table>
      <!--参加赛事报名项目填写-->
      <a-modal
              v-model="visible2"
              footer=''
              zIndex="8"
              destroyOnClose="true"
              width="800px"
      >
          <div style="height: 30px;"></div>
          <template>
              <a-card title="赛事项目列表">
                  <div>
                      <!--<a-row v-for="(item,index) in projectList">-->
                          <!--<a-col :span="20">-->
                              <!--<div class="gameName">{{index+1}}、{{item.projectName}}</div>-->
                          <!--</a-col>-->

                          <!--<a-col :span="4" >-->
                              <!--<a-button @click="joinProject(item.id)" type="primary">运动员报名</a-button>-->
                          <!--</a-col>-->
                      <!--</a-row>-->
                      <a-row>
                          <a-col :span="20">
                              <a-select defaultValue="请选择报名项目" style="width: 100%" @change="handleChangeSelectPro">
                                  <a-select-option  v-for="(item,index) in projectList" :value="item.id">{{item.projectName}}</a-select-option>
                              </a-select>
                          </a-col>

                          <a-col :span="4" >
                              <a-button @click="joinProject()" type="primary">填报运动员</a-button>
                          </a-col>
                      </a-row>
                      <a-row v-for="(item,index) in projectReList">
                          <a-col :span="20">
                            {{index+1}}、{{item.projectName}}
                          </a-col>

                          <a-col :span="4" >
                              <a @click="editPlayer(item.attendProjectId)">更改运动员</a>
                              <a-divider type="vertical" />
                              <a @click="delPlayer(item.attendProjectId)">删除</a>
                          </a-col>
                      </a-row>

                  </div>
              </a-card>
          </template>
      </a-modal>



      <!--参加赛事报名基本信息查看-->
      <a-modal
              title="查看信息"
              v-model="visible5"
              footer=''
              :destroyOnClose="true"
              @ok="handleOk"
              width="800px"
      >
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">参赛队全名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.teamName" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">参赛队简称：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.simpleName" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">领队姓名：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="14">
                          <a-input v-model="addGame.teamLeaderName" disabled placeholder=""/>
                      </a-col>
                      <a-col class="gutter-row" :offset="1" :span="4">
                          <a-radio-group :options="plainOptions" disabled @change="onChange1" :defaultValue="addGame.teamLeaderSex" />
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">领队联系方式：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.leaderPhone" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">领队微信：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.leaderWechat" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">教练员：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.coach" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">男教练数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.mCoachNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">女教练数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.wCoachNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">填报人：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.operator" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">单位电话：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.workPhone" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">单位传真：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.workFax" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">男子人数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.manNum"  disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">男轻人数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.lManNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">女子人数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.womenNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">女轻人数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.lWomanNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">医生：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.doctor" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">男医生数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.mDoctorNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">女医生数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.wDoctorNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">工作人员：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.personnel" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">男工作人员数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.mPersonnelNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>
          <a-row>
              <a-col class="gutter-row" :span="24">
                  <div class="inputPart">
                      <a-col class="gutter-row" :span="4">
                          <div class="inputName">女工作人员数：</div>
                      </a-col>
                      <a-col class="gutter-row" :span="20">
                          <a-input v-model="addGame.wPersonnelNum" disabled placeholder=""/>
                      </a-col>
                  </div>
              </a-col>
          </a-row>

          <a-collapse v-model="activeKey">
              <a-collapse-panel v-for="(item,index) in projectList" :header="item.projectName" :key="index">
                  <p v-for="item2 in item.peopleApplicantDTOList">{{item2.positionName}} : {{item2.athletesName}}</p>
              </a-collapse-panel>
          </a-collapse>
      </a-modal>




      <!--项目添加运动员-->
      <a-modal
              :title="alertTitle3"
              v-model="visible3"
              @ok="handleOk3"
              width="800px"
      >
          <template>
              <a-card title="位置">
                  <div>
                      <a-row v-for="(item,index) in postionList">
                          <a-col :span="10">
                              <div class="gameName">{{item.val}}</div>
                          </a-col>
                          <a-col :offset="2" :span="2" style="line-height: 30px"> 运动员：</a-col>
                          <a-col :span="10" >
                              <template>
                                  <a-select
                                          showSearch
                                          :value="postionList[index].athletesName"
                                          placeholder="input search text"
                                          style="width: 100%"
                                          :defaultActiveFirstOption="false"
                                          :showArrow="false"
                                          :filterOption="false"
                                          @search="handleSearch"
                                          @change="value => handleChange(value, index)"
                                          :notFoundContent="null"
                                  >
                                      <a-select-option v-for="d in data" :key="d.value">{{d.text}} </a-select-option>
                                  </a-select>
                              </template>
                          </a-col>
                      </a-row>
                  </div>
              </a-card>
          </template>
      </a-modal>
      <!--项目修改运动员-->
      <a-modal
              title="修改"
              v-model="visible4"
              @ok="handleOk4"
              width="800px"
      >
          <template>
              <a-card title="位置">
                  <div>
                      <a-row v-for="(item,index) in postionEditList">
                          <a-col :span="10">
                              <div class="gameName">{{item.positionName}}</div>
                          </a-col>
                          <a-col :offset="2" :span="2" style="line-height: 30px"> 运动员：</a-col>
                          <a-col :span="10" >
                              <template>
                                  <a-select
                                          showSearch
                                          :value="postionEditList[index].athletesName"
                                          placeholder="input search text"
                                          style="width: 100%"
                                          :defaultActiveFirstOption="false"
                                          :showArrow="false"
                                          :filterOption="false"
                                          @search="handleSearch"
                                          @change="value => handleEditChange(value, index)"
                                          :notFoundContent="null"
                                  >
                                      <a-select-option v-for="d in data" :key="d.value">{{d.text}} </a-select-option>
                                  </a-select>
                              </template>
                          </a-col>
                      </a-row>
                  </div>
              </a-card>
          </template>
      </a-modal>
      <!--报名表修改-->
    <a-modal
            title="报名表修改"
            v-model="visible"
            @ok="handleOk"
            width="800px"
    >
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">参赛队全名：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.teamName" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">参赛队简称：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.simpleName" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">领队姓名：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="14">
                        <a-input v-model="addGame.teamLeaderName" placeholder=""/>
                    </a-col>
                    <a-col class="gutter-row" :offset="1" :span="4">
                        <a-radio-group :options="plainOptions" @change="onChange1" :defaultValue="addGame.teamLeaderSex" />
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">领队联系方式：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.leaderPhone" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">领队微信：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.leaderWechat" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">教练员：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.coach" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">男教练数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.mCoachNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">女教练数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.wCoachNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">填报人：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.operator" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">单位电话：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.workPhone" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">单位传真：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.workFax" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">男子人数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.manNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">男轻人数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.lManNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">女子人数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.womenNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">女轻人数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.lWomanNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
        <!--<div class="inputPart">-->
        <!--<a-col class="gutter-row" :span="4">-->
        <!--<div class="inputName">男领队数：</div>-->
        <!--</a-col>-->
        <!--<a-col class="gutter-row" :span="20">-->
        <!--<a-input v-model="addGame.mLeaderNum" placeholder=""/>-->
        <!--</a-col>-->
        <!--</div>-->
        <!--</a-col>-->
        <!--</a-row>-->
        <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
        <!--<div class="inputPart">-->
        <!--<a-col class="gutter-row" :span="4">-->
        <!--<div class="inputName">女领队数：</div>-->
        <!--</a-col>-->
        <!--<a-col class="gutter-row" :span="20">-->
        <!--<a-input v-model="addGame.wLeaderNum" placeholder=""/>-->
        <!--</a-col>-->
        <!--</div>-->
        <!--</a-col>-->
        <!--</a-row>-->
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">医生：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.doctor" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">男医生数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.mDoctorNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>

        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">女医生数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.wDoctorNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">工作人员：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.personnel" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">男工作人员数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.mPersonnelNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
        <a-row>
            <a-col class="gutter-row" :span="24">
                <div class="inputPart">
                    <a-col class="gutter-row" :span="4">
                        <div class="inputName">女工作人员数：</div>
                    </a-col>
                    <a-col class="gutter-row" :span="20">
                        <a-input v-model="addGame.wPersonnelNum" placeholder=""/>
                    </a-col>
                </div>
            </a-col>
        </a-row>
    </a-modal>

      <a-modal
              title="赛事查看"
              v-model="visibleSee"
              :destroyOnClose="true"

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
                          <a-select :value="addGame.competitionEventId" style="width: 100%" @change="handleChangeSelect">
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
                          <div class="inputName"> 报名要求：</div>
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
      <p>提交进入待审核阶段将无法修改，是否确认提交？</p>
    </a-modal>

  </div>
</template>
<script>
    import router from '../router';
    import store from '../store'
    import moment from 'moment';
    import jsonp from 'fetch-jsonp';
    import querystring from 'querystring';
    const columns = [
        {
            title: '操作',
            key: 'action',
            fixed: 'left',
            scopedSlots: { customRender: 'action' },
        },
        { title: '赛事名称', dataIndex: 'matchName', key: 'matchName'},
        { title: '参赛队名', dataIndex: 'teamName', key: 'teamName'},
        { title: '领队姓名', dataIndex: 'teamLeaderName', key: 'teamLeaderName'},
        {
            title: '报名状态',
            key: 'status',
            scopedSlots: { customRender: 'status' },
        },




    ];



    const productListData = [];

    let timeout;
    let currentValue;

    function fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        function fake() {
            const str = querystring.encode({
                nameKeyword: value,
                token:sessionStorage.getItem("token")

        });
            jsonp(`http://106.12.61.239:8080/ERService/athletes/findAthletesByNameKeyword?${str}`)
                .then(response => response.json())
                .then((d) => {
                    if (currentValue === value) {
                        const result = d.data;
                        const data = [];
                        result.forEach((r) => {
                            data.push({
                                // value: r.id,
                                value:{id:r.id,name:r.name},
                                text: r.name+'-'+r.registrantOrg+'-'+r.idCardTail,
                            });
                        });
                        callback(data);
                    }
                });
        }

        timeout = setTimeout(fake, 300);
    }

    export default {
        methods: {
            onChange1 (e) {
                this.addGame.teamLeaderSex = e.target.value
            },
            editPlayer(id){
                this.$fetch('/register/loadApplicantProjectById',{id:id}).then((reData)=>{
                    this.attendProjectId = id
                    if(reData.code==200) {
                        // this.loadProjectRe()
                        this.postionEditList = reData.data.peopleApplicantDTOList
                        this.visible4=true
                    }else {
                        this.$notification.open({
                            duration:2,
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })
            },
            delPlayer(id){
                this.$fetch('/register/deleteRegisterFormProject',{id:id,registerFormId:this.registerFormId,userId:this.$store.state.userId}).then((reData)=>{
                    if(reData.code==200) {
                        this.loadProjectRe()
                    }else {
                        this.$notification.open({
                            duration:2,
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })
            },
            loadProjectRe(){
                this.$fetch('/register/findApplicantProjectByRegisterFormId',{id:this.registerFormId}).then((reData)=>{
                    if(reData.code==200) {
                        this.projectReList= reData.data
                    }
                })
            },
            handleChangeSelectPro(value){
                this.formId = value
            },
            handleOk4(){
                this.$fetch('/register/updateApplicantProjectById',{userId:this.$store.state.userId,id:this.attendProjectId,projectRegisterJson:JSON.stringify(this.postionEditList)}).then((reData)=>{
                    if(reData.code==200){
                        this.visible4=false
                        this.loadProjectRe()
                    }else {
                        this.$notification.open({
                            duration:2,
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })
            },
            handleOk3(){
                this.$fetch('/register/addRegisterFormProject',{registerFormId:this.registerFormId,userId:this.$store.state.userId,projectId:this.projectId,projectRegisterJson:JSON.stringify(this.postionList)}).then((reData)=>{
                    if(reData.code==200){
                        this.visible3=false
                        this.loadProjectRe()
                    }else {
                        this.$notification.open({
                            duration:2,
                            message: reData.msg,
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                    }
                })


            },
            handleSearch (value) {
                fetch(value, data => this.data = data);
            },
            handleChange (value,index) {
                this.postionList[index].positionAthletesId = value.id
                this.postionList[index].athletesName = value.name
                fetch(value, data => this.data = data);
            },
            handleEditChange (value,index) {
                this.postionEditList[index].positionAthletesId = value.id
                this.postionEditList[index].athletesName = value.name
                fetch(value, data => this.data = data);
            },
            loadProject(id){
                this.$fetch('/project/loadProjectById',{id:id}).then((reData)=>{
                    if(reData.code==200){
                        this.alertTitle3 = reData.data.projectName
                        let positionMap = reData.data.positionMap
                        let rightData=[]
                        for(let key  in positionMap ){
                            rightData.push({ "positionId":key, val:positionMap[key],"positionAthletesId":"", "athletesName":""})
                        }
                        this.postionList = rightData

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
            joinProject(){
                this.visible3 = true
                this.projectId = this.formId
                this.loadProject(this.formId)
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
                this.$fetch('/register/submitRegisterForm',{id:this.submitMatchId,userId:this.$store.state.userId}).then((reData)=>{
                    if(reData.code==200){
                        this.$notification.open({
                            message: '操作成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.visibleSubmitMatch=false
                        this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,userId:this.$store.state.userId})
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
            editCompetitionEvents(id,matchId){
                this.registerFormId = id
                this.matchId = matchId
                this.visible2 = true
                this.getProjectList()
                this.loadProjectRe()
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
                    this.getList({page:1,page_size:this.pagination.defaultPageSize,statusJson:JSON.stringify(this.checked),userId:this.$store.state.userId})

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
                this.$fetch('/register/findRegisterFormByQueryAndPage',data).then((reData)=>{
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
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize,statusJson:JSON.stringify(this.checked),userId:this.$store.state.userId})
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

                this.projectList = []
                this.$fetch('/register/loadRegisterFormById',{id:id}).then((reData)=>{
                    this.addGame = reData.data
                    this.loading = false
                })
                this.$fetch('/register/findApplicantProjectByRegisterFormId',{id:id}).then((reData)=>{
                    this.projectList = reData.data
                    this.loading = false
                })
                this.visible5= true
                this.competitionList=[]
            },
            editGame(id,matchId){
                this.editId = id
                this.matchId= matchId
                this.$fetch('/register/loadRegisterFormById',{id:id}).then((reData)=>{
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
                this.$fetch('/register/deleteRegisterFormById',{id:this.del.id,userId:this.$store.state.userId}).then((reData)=>{
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
                    this.addGame.id = this.editId
                    this.addGame.matchId = this.matchId


                        this.$fetch('/register/updateRegisterForm',this.addGame).then((reData)=>{
                            this.visible = false
                            if(reData.code==200){
                                this.$notification.open({
                                    message: '成功修改报名表',
                                    onClick: () => {
                                        console.log('Notification Clicked!');
                                    },
                                });
                                this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,statusJson:JSON.stringify(this.checked),userId:this.$store.state.userId})

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

            },
            getProjectList(){
                this.$fetch('/project/findProjectsByMatchIdAndPage',{matchId:this.matchId,page:1,page_size:100}).then((reData)=>{
                    if(reData.code==200){
                        this.projectList=reData.data.dataList
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

    },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'报名列表'});
            this.getList({page:1,page_size:10,statusJson:JSON.stringify(this.checked),userId:this.$store.state.userId})
            this.getRole()
            this.getCompetitionEvents()
            // this.loadProject()
        },
        data() {
            return {
                plainOptions:['男', '女'],
                attendProjectId:'',
                alertTitle4:'修改项目',
                projectReList:'',
                formId:'',
                data: [],
                value: undefined,
                registerFormId:'',
                alertTitle3:'',
                projectId:'',
                visible4:false,
                visible5:false,
                visible3:false,
                visible2:false,
                matchId:'',
                projectList:[],
                postionList:[],
                postionEditList:[],
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

  .gameName{
      height: 40px;
      background: rgba(0, 255, 210, 0.16);
      line-height: 40px;
      padding-left: 18px;
      font-size: 18px;
      font-weight: 500;
      border-radius: 4px;
  }




</style>