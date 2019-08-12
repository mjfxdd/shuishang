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
              报名状态：
              <a-checkbox-group @change="onChange">
                <a-row>
                  <a-checkbox value="1">草稿</a-checkbox>
                  <a-checkbox value="2">已提交(待审核)</a-checkbox>
                  <a-checkbox value="3">审核通过</a-checkbox>
                  <a-checkbox value="4">审核拒绝</a-checkbox>
                </a-row>
              </a-checkbox-group>
            </template>
          </a-col>
        </div>
      </a-col>
      <a-col class="gutter-row"  :span="4" :offset="8">
        <a-button type="primary" @click="search()">返回赛事列表</a-button>
      </a-col>
    </a-row>

    
    <div class="hrLine"></div>
    <a-table :columns="columns" :dataSource="productListData" :pagination="pagination"  :loading="loading"  @change="handleTableChange" >
       <span slot="action" slot-scope="text, record">
                      <a @click="passGo(text.id)">通过</a>
                      <a-divider type="vertical" />
                      <a @click="notPass(text.id)">拒绝</a>
                      <a-divider type="vertical" />
                      <a @click="seeMore(text.id)">查看</a>
       </span>
      <span slot="status" slot-scope="text, record">
                    <span v-if="text.status==1">草稿</span>
                    <span v-if="text.status==2">已提交(待审核)</span>
                    <span v-if="text.status==3">审核通过</span>
                    <span v-if="text.status==4">审核拒绝</span>
      </span>
    </a-table>

    <!--参加赛事报名基本信息查看-->
    <!--<a-modal-->
            <!--title="查看信息"-->
            <!--v-model="visible5"-->
            <!--footer=''-->
            <!--destroyOnClose="true"-->
            <!--@ok="handleOk"-->
            <!--width="800px"-->
    <!--&gt;-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">参赛队名：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.teamName" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">领队姓名：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.teamLeaderName" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">领队联系方式：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.leaderPhone" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">教练员：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.coach" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">医生：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.doctor" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">工作人员：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.personnel" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">填报人：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.operator" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">单位电话：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.workPhone" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">单位传真：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.workFax" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">男子人数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.manNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">男轻人数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.lManNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">女子人数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.womenNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">女轻人数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.lWomanNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">男领队数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.mLeaderNum" disabled placeholder=""/>-->
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
              <!--<a-input v-model="addGame.wLeaderNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">男教练数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.mCoachNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">女教练数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.wCoachNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">男医生数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.mDoctorNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">女医生数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.wDoctorNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">男工作人员数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.mPersonnelNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <!--<a-row>-->
        <!--<a-col class="gutter-row" :span="24">-->
          <!--<div class="inputPart">-->
            <!--<a-col class="gutter-row" :span="4">-->
              <!--<div class="inputName">女工作人员数：</div>-->
            <!--</a-col>-->
            <!--<a-col class="gutter-row" :span="20">-->
              <!--<a-input v-model="addGame.wPersonnelNum" disabled placeholder=""/>-->
            <!--</a-col>-->
          <!--</div>-->
        <!--</a-col>-->
      <!--</a-row>-->

      <!--<a-collapse v-model="activeKey">-->
        <!--<a-collapse-panel v-for="(item,index) in projectList" :header="item.projectName" :key="index">-->
          <!--<p v-for="item2 in item.peopleApplicantDTOList">{{item2.positionName}} : {{item2.athletesName}}</p>-->
        <!--</a-collapse-panel>-->
      <!--</a-collapse>-->
    <!--</a-modal>-->
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
            :visible="visible6"
            @ok="notPassOk"
            @cancel="handleCancel"
    >
      <a-row>
        <a-col class="gutter-row" :span="24">
          <div class="inputPart">
            <a-col class="gutter-row" :span="4">
              <div class="inputName">被拒原因：</div>
            </a-col>
            <a-col class="gutter-row" :span="20">
              <a-input v-model="reasion"  placeholder=""/>
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
    const columns = [
        {
            title: '操作',
            key: 'action',
            fixed: 'left',
            scopedSlots: { customRender: 'action' },
        },

        { title: '赛事名称', dataIndex: 'matchName', key: 'matchName'},
        { title: '参赛队名称', dataIndex: 'teamName', key: 'teamName'},
        { title: '报名艇数', dataIndex: 'signUpBoatNum', key: 'signUpBoatNum'},
        { title: '报项数', dataIndex: 'signUpProjectNum', key: 'signUpProjectNum'},
        { title: '领队姓名', dataIndex: 'teamLeaderName', key: 'teamLeaderName'},
        { title: '领队电话', dataIndex: 'leaderPhone', key: 'leaderPhone'},
        {
            title: '审核状态',
            key: 'status',
            scopedSlots: { customRender: 'status' },
        },
    ];

    const productListData = [];
    export default {
        methods: {
            onChange (checkedValues) {
                console.log('checked = ', checkedValues)
                this.checked=checkedValues
                if(this.checked.length ==0){
                    this.checked=[1,2,3,4]
                }
                console.log(this.checked)
                this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})

            },
            notPass(id){
               this.visible6 =true
                this.formId= id
            },
            notPassOk(){
                this.$fetch('/register/auditRefuseRegisterForm',{id:this.formId,auditInfo:this.reasion}).then((reData)=>{
                    if(reData.code==200){
                        this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})
                        this.visible6=false
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
            passGo(id){
                this.$fetch('/register/auditPassRegisterForm',{id:id}).then((reData)=>{
                    if(reData.code==200){
                        this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})
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
            seeMore(id){
                this.$fetch('/register/loadRegisterFormById',{id:id}).then((reData)=>{
                    this.addGame = reData.data
                    this.loading = false
                    this.visible5= true

                })
                this.$fetch('/register/findApplicantProjectByRegisterFormId',{id:id}).then((reData)=>{
                    this.projectList = reData.data
                    this.loading = false
                })
            },
            search(){
                router.push('/gameList')
            },
            deleteUser(id,name){
                this.visibleDel=true
                this.del.id=id
                this.del.name=name
            },
            edit(id,name){
                this.visibleEdit=true
                this.editData.userId=id
                this.editData.userName=name
            },

            handleChangeSelect(value) {
                console.log(`selected ${value}`);
                this.addData.roleId= value
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
                this.getList({page:pagination.current,page_size:pagination.defaultPageSize,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})
            }
            ,addAccount(){
                this.visible=true
                this.addData.userName=''
                this.addData.roleId=this.roleListData[0].id



            },
            handleOkDel(){
                this.$fetch('/user/deleteUserById',{id:this.del.id}).then((reData)=>{
                   if(reData.code==200){
                       this.$notification.open({
                           message: '您已成功删除 '+this.del.name,
                           onClick: () => {
                               console.log('Notification Clicked!');
                           },
                       });
                       this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})
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
                if(this.addData.userName==''){
                    this.$message.info('请输入新增账户名称');
                }else {
                    this.$fetch('/user/addUser',this.addData).then((reData)=>{
                        this.visible = false
                        if(reData.code==200){
                            this.$notification.open({
                                duration:null,
                                message: '请记住新账号的密码：'+reData.data,
                                onClick: () => {
                                    console.log('Notification Clicked!');
                                },
                            });
                            this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})

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

                this.$fetch('/system/setUserRole',this.editData).then((reData)=>{
                    this.visible = false
                    if(reData.code==200){
                        this.visibleEdit=false
                        this.$notification.open({
                            message: '修改成功',
                            onClick: () => {
                                console.log('Notification Clicked!');
                            },
                        });
                        this.getList({page:this.nowPage,page_size:this.pagination.defaultPageSize,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})

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
                this.visible5=false
                this.visible6=false



            }

    },
        mounted() {
            var vm = this
            store.commit('changeStore',{key:'title',val:'报名表管理'});
            this.getList({page:1,page_size:10,matchId:this.$store.state.matchId,statusJson:JSON.stringify(this.checked)})

        },
        data() {
            return {
                checked:[1,2,3,4,5],
                plainOptions:['男', '女'],
                reasion:'',
                activeKey: ['1'],
                visible6:false,
                formId:'',
                projectList:[],
                addGame:{},
                visible5:false,
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