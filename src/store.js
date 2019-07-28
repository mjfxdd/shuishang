import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      title:'产品列表',
      token:'',
      userId:'',
      userName:'',
      formId:'',
      matchId:'',
      alertTip:false,
      tipText:''

  },
  mutations: {
       changeStore(state,data){
            state[data.key] = data.val
       }

  },
  actions: {

  }
})
